import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ExplorationJourney } from "@/features/exploration/components/ExplorationJourney";

export const metadata: Metadata = {
  title: "Parcours d'expression et de clarification — Civic Explorer",
  description:
    "Exprimez librement vos préoccupations, structurez et confirmez vos déclarations localement dans votre navigateur.",
};

export default function ParcoursPage() {
  return (
    <SiteShell badgeText="Parcours P0.2 — Mémoire locale" showHomeLink>
      <ExplorationJourney />
    </SiteShell>
  );
}
