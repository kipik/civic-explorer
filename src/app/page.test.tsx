import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("HomePage placeholder (P0.1)", () => {
  it("affiche le titre principal, les repères sémantiques et les engagements du prototype", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /espace sobre pour explorer ses priorités civiques/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();

    expect(screen.getByText(/ne recommande, ne classe et ne note aucun candidat/i)).toBeVisible();
    expect(screen.getByText(/aucune saisie personnelle n'est demandée/i)).toBeVisible();
  });

  it("ne demande aucune saisie personnelle dans la tranche bootstrap", () => {
    render(<HomePage />);

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
  });
});
