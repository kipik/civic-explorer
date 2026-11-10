import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ExplorationJourney } from "@/features/exploration/components/ExplorationJourney";

describe("ExplorationJourney (P0.2 — 4 écrans)", () => {
  it("affiche la question principale sur l'écran 1 et signale une saisie vide sans bloquer le passage manuel", async () => {
    const user = userEvent.setup();
    render(<ExplorationJourney />);

    const textarea = screen.getByRole("textbox", {
      name: /Quelles sont les choses qui vous préoccupent le plus concernant l'avenir de la France \?/i,
    });
    expect(textarea).toBeVisible();

    await user.click(screen.getByRole("button", { name: /continuer vers la structuration/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/rien saisi/i);

    await user.click(screen.getByRole("button", { name: /passer à la saisie structurée/i }));
    expect(
      screen.getByRole("heading", { level: 1, name: /relisez et organisez vos éléments/i }),
    ).toBeVisible();
  });

  it("permet le parcours complet avec structuration manuelle, confirmation nuancée, cartographie par thème, correction et effacement", async () => {
    const user = userEvent.setup();
    render(<ExplorationJourney />);

    // Écran 1 : saisie libre
    const freeTextArea = screen.getByRole("textbox", {
      name: /Quelles sont les choses qui vous préoccupent le plus concernant l'avenir de la France \?/i,
    });
    await user.type(
      freeTextArea,
      "- L'accès aux soins en zone rurale\n- Le coût du logement\n- Point à supprimer",
    );
    await user.click(screen.getByRole("button", { name: /continuer vers la structuration/i }));

    // Écran 2 : structuration locale déterministe
    expect(
      screen.getByRole("heading", { level: 1, name: /relisez et organisez vos éléments/i }),
    ).toBeVisible();
    expect(screen.getByText(/sans intelligence artificielle ni appel réseau/i)).toBeVisible();

    const structList = screen.getByRole("list", { name: /éléments structurés/i });
    const cards = within(structList).getAllByRole("article");
    expect(cards).toHaveLength(3);

    // Modifier le premier élément et lui attribuer un thème provisoire
    const firstCard = cards[0]!;
    const firstTextInput = within(firstCard).getByLabelText(/formulation de la préoccupation/i);
    await user.clear(firstTextInput);
    await user.type(firstTextInput, "Améliorer l'accès aux soins partout en France");

    await user.click(
      within(firstCard).getByRole("button", { name: /choisir ou modifier le thème/i }),
    );
    await user.click(
      within(firstCard).getByRole("checkbox", { name: /santé et protection sociale/i }),
    );

    // Supprimer le 3e élément puis vérifier l'option d'annulation, puis re-supprimer
    await user.click(screen.getByRole("button", { name: /supprimer l'élément 3/i }));
    expect(screen.getByRole("status")).toHaveTextContent(/déclaration supprimée/i);
    await user.click(screen.getByRole("button", { name: /annuler la suppression/i }));
    expect(within(structList).getAllByRole("article")).toHaveLength(3);
    await user.click(screen.getByRole("button", { name: /supprimer l'élément 3/i }));

    await user.click(screen.getByRole("button", { name: /continuer vers la confirmation/i }));

    // Écran 3 : confirmation — rien n'est attribué tant que non confirmé
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /vérifiez et confirmez ce qui reflète votre pensée/i,
      }),
    ).toBeVisible();

    const confirmList = screen.getByRole("list", { name: /déclarations à confirmer/i });
    const confirmCards = within(confirmList).getAllByRole("article");
    expect(confirmCards).toHaveLength(2);
    expect(within(confirmCards[0]!).getByText(/brouillon non confirmé/i)).toBeVisible();

    // Compléter objectif + condition sur la 1ère déclaration et la confirmer
    await user.type(
      within(confirmCards[0]!).getByLabelText(/préciser l'objectif/i),
      "Réduire les déserts médicaux",
    );
    await user.type(
      within(confirmCards[0]!).getByLabelText(/conditions éventuelles/i),
      "À condition de maintenir la qualité des soins",
    );
    await user.click(
      within(confirmCards[0]!).getByRole("button", { name: /ajouter une condition/i }),
    );
    await user.click(
      within(confirmCards[0]!).getByRole("button", { name: /confirmer cette déclaration/i }),
    );
    expect(within(confirmCards[0]!).getByText(/confirmée par vous/i)).toBeVisible();

    // Laisser la 2e déclaration non confirmée (marquée incertaine)
    await user.click(
      within(confirmCards[1]!).getByRole("button", { name: /marquer comme incertaine/i }),
    );

    await user.click(screen.getByRole("button", { name: /voir la cartographie initiale/i }));

    // Écran 4 : cartographie initiale — seule la déclaration confirmée est affichée sous son thème
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /votre cartographie initiale de convictions confirmées/i,
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 2, name: /santé et protection sociale/i }),
    ).toBeVisible();
    expect(screen.getByText("Améliorer l'accès aux soins partout en France")).toBeVisible();
    expect(screen.getByText(/Réduire les déserts médicaux/)).toBeVisible();
    expect(screen.getByText(/À condition de maintenir la qualité des soins/)).toBeVisible();
    expect(screen.queryByText(/Le coût du logement/)).not.toBeInTheDocument();

    // Revenir modifier depuis la cartographie
    await user.click(screen.getByRole("button", { name: /modifier cette déclaration/i }));
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /vérifiez et confirmez ce qui reflète votre pensée/i,
      }),
    ).toBeVisible();

    // Effacer la session et vérifier réinitialisation complète sans stockage
    await user.click(screen.getByRole("button", { name: /effacer ma session/i }));
    await user.click(screen.getByRole("button", { name: /confirmer l'effacement/i }));

    expect(
      screen.getByRole("textbox", {
        name: /Quelles sont les choses qui vous préoccupent le plus concernant l'avenir de la France \?/i,
      }),
    ).toHaveValue("");
    expect(window.localStorage.length).toBe(0);
    expect(window.sessionStorage.length).toBe(0);
    expect(document.cookie).toBe("");
  });
});
