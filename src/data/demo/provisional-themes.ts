export interface ProvisionalTheme {
  id: string;
  label: string;
  description: string;
  isProvisionalDemo: true;
}

export const PROVISIONAL_THEMES_VERSION = "provisional-demo-0.1";

/**
 * Taxonomie provisoire et illustrative utilisée pendant la phase prototype.
 * Elle ne constitue pas une nomenclature éditoriale définitive et ne code aucune orientation politique.
 */
export const PROVISIONAL_THEMES: readonly ProvisionalTheme[] = [
  {
    id: "economy-purchasing-power",
    label: "Économie, emploi et pouvoir d'achat",
    description: "Coût de la vie, rémunérations, emploi, fiscalité et activité économique.",
    isProvisionalDemo: true,
  },
  {
    id: "health-social-protection",
    label: "Santé et protection sociale",
    description: "Accès aux soins, hôpital public, prévention, solidarité et retraites.",
    isProvisionalDemo: true,
  },
  {
    id: "education-youth-research",
    label: "Éducation, jeunesse et recherche",
    description: "École, formation professionnelle, enseignement supérieur et recherche.",
    isProvisionalDemo: true,
  },
  {
    id: "ecology-energy-climate",
    label: "Écologie, énergie et climat",
    description: "Transition énergétique, eau, biodiversité, agriculture et climat.",
    isProvisionalDemo: true,
  },
  {
    id: "public-services-territories",
    label: "Services publics et territoires",
    description: "Accès aux services publics, mobilités du quotidien et équilibre territorial.",
    isProvisionalDemo: true,
  },
  {
    id: "housing-living-conditions",
    label: "Logement et cadre de vie",
    description: "Accès au logement, loyers, rénovation énergétique et urbanisme.",
    isProvisionalDemo: true,
  },
  {
    id: "justice-security-freedoms",
    label: "Justice, sécurité et libertés publiques",
    description: "Fonctionnement de la justice, sûreté, droits fondamentaux et numérique.",
    isProvisionalDemo: true,
  },
  {
    id: "institutions-democracy",
    label: "Institutions et vie démocratique",
    description:
      "Fonctionnement démocratique, participation citoyenne, transparence et vie locale.",
    isProvisionalDemo: true,
  },
  {
    id: "europe-international",
    label: "Europe et affaires internationales",
    description: "Coopération européenne, relations internationales, défense et solidarités.",
    isProvisionalDemo: true,
  },
  {
    id: "culture-society",
    label: "Culture, cohésion et vie associative",
    description: "Accès à la culture, laïcité, égalité des droits et tissu associatif.",
    isProvisionalDemo: true,
  },
] as const;

export function getProvisionalThemeById(themeId: string): ProvisionalTheme | undefined {
  return PROVISIONAL_THEMES.find((theme) => theme.id === themeId);
}

export function isValidProvisionalThemeId(themeId: string): boolean {
  return PROVISIONAL_THEMES.some((theme) => theme.id === themeId);
}
