import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Civic Explorer — Clarifier ses convictions",
  description:
    "Explorateur de convictions et comparateur documentaire pour le débat public, conçu sans recommandation ni profilage.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Aller au contenu principal
        </a>
        <div className="flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
