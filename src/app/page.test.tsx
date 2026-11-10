import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("HomePage (P0.2)", () => {
  it("affiche la présentation du prototype, les repères sémantiques et le lien vers le parcours", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /espace sobre pour clarifier vos convictions/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();

    const startLink = screen.getByRole("link", { name: /commencer l'exploration/i });
    expect(startLink).toHaveAttribute("href", "/parcours");

    expect(screen.getByText(/ne recommande, ne classe et ne note aucun candidat/i)).toBeVisible();
    expect(screen.getByText(/aucune donnée envoyée au serveur/i)).toBeVisible();
  });

  it("ne demande aucune saisie personnelle sur la page d'accueil statique", () => {
    render(<HomePage />);

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});
