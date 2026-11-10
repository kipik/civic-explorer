(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.CivicPretestData = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const CATALOG_VERSION = "referentiel-v1-pretest-candidate";
  const PROTOCOL_VERSION = "L13-L21-2026-11-10";
  const SESSION_SCHEMA_VERSION = "pretest-session-v1";
  const ANALYSIS_SCHEMA_VERSION = "pretest-l17-analysis-v1";

  const PROHIBITED_PROFILE_KEYS = Object.freeze([
    "ideology",
    "leftRight",
    "partyAffinity",
    "voteIntent",
    "candidateScore",
    "proximityScore",
  ]);

  /**
   * Plan canonique N = 8, b = 8, k = 4, r = 4 (indices 0..7 issus de designs_N6_to_N13.json).
   */
  const CANONICAL_N8_BLOCKS = Object.freeze([
    Object.freeze([1, 2, 0, 4]),
    Object.freeze([7, 4, 3, 5]),
    Object.freeze([2, 6, 7, 0]),
    Object.freeze([5, 1, 2, 3]),
    Object.freeze([0, 5, 4, 6]),
    Object.freeze([3, 0, 1, 7]),
    Object.freeze([4, 3, 6, 2]),
    Object.freeze([6, 7, 5, 1]),
  ]);

  const DOMAINS = Object.freeze([
    {
      id: "DOM-01",
      title: "Santé et solidarités face aux risques de la vie",
      shortDescription:
        "L'accès aux soins et la prévention, ainsi que les aides et protections face aux retraites, à la perte d'autonomie, au handicap, au chômage, à la pauvreté et pour les familles.",
      covers:
        "Couvre l'organisation et le financement des soins, la santé publique et mentale, ainsi que les protections collectives face au grand âge, au handicap, au chômage, à la pauvreté et au soutien aux familles et aidants — sans privilégier ni gestion publique ou privée, ni aides universelles ou ciblées.",
      otherDomains: [
        "Impôts généraux, dette publique, salaires et règles du travail → Économie, travail et finances publiques.",
        "Adaptation physique des logements et des transports → Logement, territoires et mobilités.",
        "Instruction scolaire → Éducation, formation, recherche et culture.",
        "Politiques environnementales globales → Climat, énergie, environnement et agriculture.",
      ],
      priorityInDebrief: true,
      probes: [
        "En lisant le titre seul, à quoi pensiez-vous d'abord (soins médicaux, retraites, aides sociales…) ?",
        "Le mot « solidarités » vous paraît-il neutre ou plutôt associé à une idée politique particulière ?",
        "Avez-vous eu l'impression que cette carte réunissait des sujets trop différents (par exemple hôpital et retraites / chômage) ?",
      ],
    },
    {
      id: "DOM-02",
      title: "Économie, travail et finances publiques",
      shortDescription:
        "Le pouvoir d'achat et les salaires, l'organisation du travail et des activités non rémunérées, le temps de vie, les entreprises et les choix d'impôts et de budget.",
      covers:
        "Couvre le coût de la vie, les rémunérations, l'économie et les entreprises, l'impôt et la dette publique, ainsi que l'emploi, l'indépendance, le travail non rémunéré (soin aux proches, bénévolat) et le partage des temps de vie — sans privilégier ni hausse ni baisse d'impôts, ni modèle salarial unique.",
      otherDomains: [
        "Retraites, minima sociaux et indemnisation du chômage → Santé et solidarités face aux risques de la vie.",
        "Prix spécifiques du logement et des transports quotidiens → Logement, territoires et mobilités.",
        "Formation scolaire et continue → Éducation, formation, recherche et culture.",
        "Accords commerciaux extérieurs → Place de la France en Europe et dans le monde.",
      ],
      priorityInDebrief: true,
      probes: [
        "Quand vous lisez cette carte, qu'est-ce qui attire d'abord votre attention ?",
        "Que comprenez-vous par « finances publiques » et par « activités non rémunérées » ?",
        "Pensiez-vous que l'indemnisation du chômage ou les retraites étaient dans cette carte ou dans Santé et solidarités ?",
      ],
    },
    {
      id: "DOM-03",
      title: "Logement, territoires et mobilités",
      shortDescription:
        "L'accès au logement et ses coûts, les différentes manières d'habiter, les déplacements du quotidien et l'équilibre entre villes, campagnes et outre-mer.",
      covers:
        "Porte sur le logement (location, propriété, habitat social ou partagé, lutte contre le mal-logement), les transports du quotidien, les services de proximité et l'équilibre territorial — sans privilégier ni un statut d'occupation, ni un mode de transport, ni une gestion publique ou privée.",
      otherDomains: [
        "Politique climatique nationale, énergie et préservation globale des sols → Climat, énergie, environnement et agriculture.",
        "Pouvoir d'achat général hors habitat et transport → Économie, travail et finances publiques.",
        "Pouvoirs institutionnels des collectivités territoriales → Justice, libertés publiques et démocratie.",
      ],
      priorityInDebrief: false,
      probes: [
        "Où placeriez-vous l'isolation des logements ou les transports propres (ici ou dans Climat, énergie, environnement et agriculture) ?",
      ],
    },
    {
      id: "DOM-04",
      title: "Éducation, formation, recherche et culture",
      shortDescription:
        "L'école et les études supérieures, la formation professionnelle à tout âge, la recherche scientifique, ainsi que la vie culturelle et les médias.",
      covers:
        "Couvre l'enseignement scolaire (public, sous contrat ou indépendant), l'orientation, la formation professionnelle et continue des adultes, l'université, la recherche, la culture et l'information — sans présupposer de modèle pédagogique ni de partage public/privé.",
      otherDomains: [
        "Cadre juridique général de la laïcité et lutte contre les discriminations → Justice, libertés publiques et démocratie (les applications concrètes dans la vie scolaire y sont liées).",
        "Politique de l'emploi → Économie, travail et finances publiques.",
        "Garde matérielle de la petite enfance et soutien aux familles → Santé et solidarités face aux risques de la vie.",
      ],
      priorityInDebrief: false,
      probes: [
        "En voyant cette carte, avez-vous remarqué la formation des adultes, la recherche et les médias, ou surtout l'école ?",
      ],
    },
    {
      id: "DOM-05",
      title: "Climat, énergie, environnement et agriculture",
      shortDescription:
        "Le climat et les risques naturels, la production et le prix de l'énergie, la gestion de l'eau et de la nature, l'agriculture et l'alimentation.",
      covers:
        "Porte sur le changement climatique, les risques naturels, les choix énergétiques (nucléaire, renouvelables, sobriété, factures), l'eau, la biodiversité, les pollutions, l'agriculture et l'alimentation — sans préjuger des choix techniques, économiques ou agricoles.",
      otherDomains: [
        "Fiscalité générale et pouvoir d'achat global → Économie, travail et finances publiques.",
        "Logement et mobilités du quotidien → Logement, territoires et mobilités.",
        "Traités commerciaux et importations agricoles → Place de la France en Europe et dans le monde.",
      ],
      priorityInDebrief: false,
      probes: [
        "Qu'est-ce qui a le plus compté si vous avez choisi ou écarté cette carte (climat, prix de l'énergie / nucléaire, eau, agriculture) ?",
      ],
    },
    {
      id: "DOM-06",
      title: "Sécurité des personnes et tranquillité publique",
      shortDescription:
        "La prévention de la délinquance et des violences, la sûreté au quotidien, l'action et le contrôle des forces de sécurité et les sanctions pénales.",
      covers:
        "Porte sur la protection contre les atteintes aux personnes et aux biens, la prévention sociale et situationnelle, l'organisation et la déontologie des forces de sécurité intérieure, et les peines — hors justice civile/délais des tribunaux et hors libertés publiques (domaine Justice, libertés publiques et démocratie).",
      otherDomains: [
        "Justice civile, familiale, commerciale et fonctionnement ou délais généraux des tribunaux → Justice, libertés publiques et démocratie.",
        "Libertés publiques, vie privée et surveillance numérique → Justice, libertés publiques et démocratie.",
        "Défense militaire et gestion des frontières extérieures → Place de la France en Europe et dans le monde.",
      ],
      priorityInDebrief: true,
      probes: [
        "Où placeriez-vous le fonctionnement des tribunaux et la justice civile ? Dans cette carte ou dans Justice, libertés publiques et démocratie ?",
        "La mention « l'action et le contrôle des forces de sécurité » vous semble-t-elle équilibrée ?",
        "Quand cette carte était face à une carte très large comme Santé et solidarités ou Économie, travail et finances publiques, la comparaison vous a-t-elle paru équitable ou bizarre ?",
      ],
    },
    {
      id: "DOM-07",
      title: "Justice, libertés publiques et démocratie",
      shortDescription:
        "Le fonctionnement de la justice, la protection des droits et libertés (y compris numériques), la laïcité et l'égalité des droits, ainsi que les institutions et la participation citoyenne.",
      covers:
        "Regroupe quatre dimensions liées à l'État de droit : (1) délais, moyens et indépendance des tribunaux ; (2) libertés fondamentales, vie privée, encadrement de la surveillance et de l'IA/numérique ; (3) laïcité, pluralisme et lutte contre les discriminations ; (4) institutions, modes de scrutin, décentralisation et participation citoyenne.",
      otherDomains: [
        "Sécurité physique quotidienne, police et sanctions pénales → Sécurité des personnes et tranquillité publique.",
        "Traités européens et relations entre États → Place de la France en Europe et dans le monde.",
        "Politiques culturelles et pédagogie scolaire → Éducation, formation, recherche et culture.",
      ],
      priorityInDebrief: true,
      probes: [
        "Qu'est-ce que cette carte recouvre pour vous (pouvez-vous citer ce que vous y voyez) ?",
        "Si l'on évoque la laïcité ou la régulation de l'intelligence artificielle / réseaux sociaux, où les auriez-vous cherchées spontanément ?",
        "Cette carte vous a-t-elle paru plus abstraite ou plus difficile à comparer que les autres ?",
      ],
    },
    {
      id: "DOM-08",
      title: "Place de la France en Europe et dans le monde",
      shortDescription:
        "L'Union européenne et la souveraineté nationale, la défense et l'action diplomatique, les échanges commerciaux, ainsi que la gestion des frontières et des migrations.",
      covers:
        "Porte sur la construction européenne et la place du droit national, les armées et la défense, la diplomatie et la solidarité internationale, les accords commerciaux, et la gestion des frontières, de l'asile et de l'immigration — sans présupposer intégration ou souverainisme, libre-échange ou protectionnisme, accueil ou restriction migratoire.",
      otherDomains: [
        "Sécurité intérieure quotidienne → Sécurité des personnes et tranquillité publique.",
        "Institutions et élections nationales → Justice, libertés publiques et démocratie.",
        "Politique fiscale et industrielle purement intérieure → Économie, travail et finances publiques.",
      ],
      priorityInDebrief: true,
      probes: [
        "À la lecture de cette carte, quel sujet vous est venu en tête en premier (Union européenne, défense, commerce extérieur, frontières et migrations) ?",
        "Vous souvenez-vous si la carte parlait des échanges commerciaux et de la défense, ou un sujet a-t-il pris toute la place ?",
      ],
    },
  ]);

  const DOMAIN_MAP = Object.freeze(
    DOMAINS.reduce(function (acc, domain) {
      acc[domain.id] = domain;
      return acc;
    }, {}),
  );

  /**
   * Instances de dry run interne déjà pré-générées et vérifiées (dry-run/README.md).
   */
  const PRESET_INSTANCES = Object.freeze({
    "DR-INST-1": {
      id: "DR-INST-1",
      label: "Dry Run — Instance 1 (DR-INST-1)",
      seedDihedral: 101,
      seedRho: 201,
      rhoOrder: ["DOM-05", "DOM-07", "DOM-08", "DOM-01", "DOM-04", "DOM-03", "DOM-06", "DOM-02"],
      blocks: [
        ["DOM-03", "DOM-06", "DOM-01", "DOM-07"],
        ["DOM-06", "DOM-04", "DOM-02", "DOM-05"],
        ["DOM-04", "DOM-01", "DOM-03", "DOM-08"],
        ["DOM-07", "DOM-02", "DOM-08", "DOM-06"],
        ["DOM-05", "DOM-03", "DOM-07", "DOM-04"],
        ["DOM-08", "DOM-05", "DOM-06", "DOM-01"],
        ["DOM-01", "DOM-07", "DOM-04", "DOM-02"],
        ["DOM-02", "DOM-08", "DOM-05", "DOM-03"],
      ],
    },
    "DR-INST-2": {
      id: "DR-INST-2",
      label: "Dry Run — Instance 2 (DR-INST-2)",
      seedDihedral: 102,
      seedRho: 202,
      rhoOrder: ["DOM-03", "DOM-05", "DOM-01", "DOM-02", "DOM-08", "DOM-04", "DOM-06", "DOM-07"],
      blocks: [
        ["DOM-01", "DOM-04", "DOM-07", "DOM-08"],
        ["DOM-03", "DOM-02", "DOM-08", "DOM-05"],
        ["DOM-07", "DOM-03", "DOM-06", "DOM-04"],
        ["DOM-05", "DOM-07", "DOM-01", "DOM-02"],
        ["DOM-04", "DOM-08", "DOM-05", "DOM-06"],
        ["DOM-02", "DOM-01", "DOM-04", "DOM-03"],
        ["DOM-08", "DOM-06", "DOM-02", "DOM-07"],
        ["DOM-06", "DOM-05", "DOM-03", "DOM-01"],
      ],
    },
  });

  const STRATE_2_1_PROPOSALS = Object.freeze({
    "DOM-01": {
      domainId: "DOM-01",
      title: "Santé et solidarités face aux risques de la vie",
      subIssues: [
        "Accès territorial et délais des soins (ville, hôpital, urgences, professionnels)",
        "Coût des soins, remboursements et prévention/santé mentale",
        "Retraites et équilibre entre générations",
        "Vieillissement, perte d'autonomie et handicap",
        "Chômage, pauvreté et filets de sécurité matériels",
        "Soutien aux familles, petite enfance et proches aidants",
      ],
    },
    "DOM-02": {
      domainId: "DOM-02",
      title: "Économie, travail et finances publiques",
      subIssues: [
        "Organisation des activités rémunérées (salariat, indépendance, entrepreneuriat) et non rémunérées (soin, bénévolat, vie domestique)",
        "Conditions de travail, pénibilité et partage des temps de vie",
        "Salaires, pouvoir d'achat, prix et partage de la valeur",
        "Tissu productif, PME, réindustrialisation et compétitivité",
        "Fiscalité, dette publique et choix budgétaires de l'État",
      ],
    },
    "DOM-07": {
      domainId: "DOM-07",
      title: "Justice, libertés publiques et démocratie",
      subIssues: [
        "Moyens, délais et accessibilité de la justice civile, familiale et pénale",
        "Indépendance judiciaire, Conseil constitutionnel et État de droit",
        "Droits fondamentaux, vie privée, liberté d'expression et de manifestation",
        "Régulation des plateformes numériques, données et intelligence artificielle",
        "Laïcité, pluralisme et lutte contre les discriminations",
        "Institutions, modes de scrutin, décentralisation, outre-mer et participation citoyenne",
      ],
    },
    "DOM-08": {
      domainId: "DOM-08",
      title: "Place de la France en Europe et dans le monde",
      subIssues: [
        "Avenir, compétences et démocratie de l'Union européenne",
        "Souveraineté nationale et articulation avec le droit et le budget européens",
        "Défense nationale, armées, dissuasion et sécurité collective (UE/OTAN)",
        "Diplomatie, crises géopolitiques, multilatéralisme et aide au développement",
        "Commerce international, protectionnisme, libre-échange et dépendances stratégiques",
        "Frontières, politique migratoire, droit d'asile et intégration",
      ],
    },
  });

  const LEXICAL_PAIRS = Object.freeze([
    {
      pairId: "PAIR-01",
      domainId: "DOM-01",
      variantCode: "1B",
      reference: {
        title: "Santé et solidarités face aux risques de la vie",
        shortDescription:
          "L'accès aux soins et la prévention, ainsi que les aides et protections face aux retraites, à la perte d'autonomie, au handicap, au chômage, à la pauvreté et pour les familles.",
      },
      variant: {
        title: "Santé et protections sociales face aux aléas de la vie",
        shortDescription:
          "L'accès aux soins et la prévention, ainsi que les aides et protections face aux retraites, à la perte d'autonomie, au handicap, au chômage, à la pauvreté et pour les familles.",
      },
      analystNote:
        "Vérifier si « solidarités » paraît normatif/connoté et si « protections sociales / aléas de la vie » est plus neutre ou au contraire trop administratif.",
    },
    {
      pairId: "PAIR-02",
      domainId: "DOM-02",
      variantCode: "2B",
      reference: {
        title: "Économie, travail et finances publiques",
        shortDescription:
          "Le pouvoir d'achat et les salaires, l'organisation du travail et des activités non rémunérées, le temps de vie, les entreprises et les choix d'impôts et de budget.",
      },
      variant: {
        title: "Économie, travail, pouvoir d'achat et budget public",
        shortDescription:
          "Les prix et les salaires, le travail et les activités non rémunérées, l'équilibre des temps de vie, les entreprises et la politique fiscale et budgétaire.",
      },
      analystNote:
        "Vérifier si nommer « pouvoir d'achat » et « budget public » dans le titre améliore la clarté immédiate ou provoque une capture mono-composante écrasant le travail et les entreprises.",
    },
    {
      pairId: "PAIR-03",
      domainId: "DOM-07",
      variantCode: "7B",
      reference: {
        title: "Justice, libertés publiques et démocratie",
        shortDescription:
          "Le fonctionnement de la justice, la protection des droits et libertés (y compris numériques), la laïcité et l'égalité des droits, ainsi que les institutions et la participation citoyenne.",
      },
      variant: {
        title: "Justice, libertés, laïcité et démocratie",
        shortDescription:
          "Le fonctionnement des tribunaux, les droits et libertés (dont le numérique), les principes de laïcité et d'égalité, ainsi que les institutions et le vote des citoyens.",
      },
      analystNote:
        "Vérifier si nommer « laïcité » dans le titre évite son oubli (notamment en découverte progressive B) sans déclencher une focalisation disproportionnée sur ce seul enjeu.",
    },
    {
      pairId: "PAIR-04",
      domainId: "DOM-08",
      variantCode: "8B",
      reference: {
        title: "Place de la France en Europe et dans le monde",
        shortDescription:
          "L'Union européenne et la souveraineté nationale, la défense et l'action diplomatique, les échanges commerciaux, ainsi que la gestion des frontières et des migrations.",
      },
      variant: {
        title: "Europe, défense, commerce mondial et frontières",
        shortDescription:
          "Les choix relatifs à l'Union européenne et à la souveraineté, à la politique étrangère et de défense, aux échanges internationaux et à l'immigration.",
      },
      analystNote:
        "Vérifier si un titre à 4 termes empêche l'oubli du commerce et de la défense, ou si mentionner « frontières » dans le titre renforce une capture par l'immigration.",
    },
  ]);

  const NO_DISTINGUISHABLE_REASONS = Object.freeze([
    {
      id: "equally_prioritized",
      label: "Ces domaines me paraissent tout aussi prioritaires les uns que les autres",
    },
    {
      id: "not_comparable",
      label: "Ces domaines ne me semblent pas comparables entre eux",
    },
    {
      id: "none_should_take_precedence",
      label: "Aucun de ces domaines ne devrait passer en premier",
    },
    {
      id: "other",
      label: "Autre raison (préciser si souhaité)",
    },
  ]);

  const COMPREHENSION_FLAGS = Object.freeze([
    { id: "too_vague", label: "Formulation trop vague ou imprécise" },
    { id: "incomprehensible", label: "Mot ou phrase difficile à comprendre" },
    {
      id: "outside_collective_scope",
      label: "Ce sujet ne me paraît pas relever d'un choix collectif",
    },
    { id: "loaded_wording", label: "Formulation perçue comme orientée ou partisane" },
  ]);

  const DEMOGRAPHIC_FIELDS = Object.freeze({
    ageBracket: ["18–29 ans", "30–59 ans", "60 ans et +", "Je préfère ne pas répondre"],
    territoryType: [
      "Grande aire urbaine",
      "Ville moyenne / périurbain",
      "Commune rurale",
      "Outre-mer / sensibilité ultramarine",
      "Je préfère ne pas répondre",
    ],
    educationLevel: [
      "Sans diplôme du supérieur",
      "Bac+1/2",
      "Bac+3 et +",
      "Je préfère ne pas répondre",
    ],
    institutionalEase: ["Faible", "Moyenne", "Élevée", "Je préfère ne pas répondre"],
    politicalInterest: [
      "Peu intéressé",
      "Intérêt modéré",
      "Très intéressé",
      "Je préfère ne pas répondre",
    ],
  });

  const L17_ENUMS = Object.freeze({
    comprehension_statut: ["", "Fidele", "Partielle", "Erronee", "NA"],
    largeur_percue: ["", "Trop large", "Adaptee", "Trop etroite", "Non evoquee"],
    selection_mono_composante: ["", "Oui", "Non", "Incertain", "NA"],
    gravite: ["", "Aucune", "Mineure", "Importante", "Bloquante"],
  });

  return {
    CATALOG_VERSION,
    PROTOCOL_VERSION,
    SESSION_SCHEMA_VERSION,
    ANALYSIS_SCHEMA_VERSION,
    PROHIBITED_PROFILE_KEYS,
    CANONICAL_N8_BLOCKS,
    DOMAINS,
    DOMAIN_MAP,
    PRESET_INSTANCES,
    STRATE_2_1_PROPOSALS,
    LEXICAL_PAIRS,
    NO_DISTINGUISHABLE_REASONS,
    COMPREHENSION_FLAGS,
    DEMOGRAPHIC_FIELDS,
    L17_ENUMS,
  };
});
