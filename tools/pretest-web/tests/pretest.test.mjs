import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const Data = require(path.join(ROOT_DIR, "js", "data.js"));
globalThis.CivicPretestData = Data;
const MaxDiff = require(path.join(ROOT_DIR, "js", "maxdiff.js"));
globalThis.CivicPretestMaxDiff = MaxDiff;
const ExportL17 = require(path.join(ROOT_DIR, "js", "export-l17.js"));

test("Les instances prédéfinies DR-INST-1 et DR-INST-2 respectent tous les invariants combinatoires", () => {
  ["DR-INST-1", "DR-INST-2"].forEach((id) => {
    const inst = MaxDiff.getPresetInstance(id);
    assert.equal(inst.blocks.length, 8);
    assert.equal(inst.rhoOrder.length, 8);
    const inv = MaxDiff.evaluateDesignInvariants(inst.blocks);
    assert.equal(inv.allInvariantsValid, true, `Invariants échoués pour ${id}`);
    assert.equal(inv.uniformFrequencyR4, true);
    assert.equal(inv.positionBalanceExact, true);
    assert.equal(inv.duplicateBlockCount, 0);
    assert.equal(inv.zeroPairCount, 0);
    assert.deepEqual(inv.pairHistogram, { 1: 8, 2: 20 });
    assert.equal(inv.maxLinearOverlap, 1);
    assert.equal(inv.cyclicWrapOverlap, 1);
  });
});

test("DR-INST-1 correspond exactement aux séries S1..S8 du kit imprimable", () => {
  const inst = MaxDiff.getPresetInstance("DR-INST-1");
  assert.deepEqual(inst.rhoOrder, [
    "DOM-05",
    "DOM-07",
    "DOM-08",
    "DOM-01",
    "DOM-04",
    "DOM-03",
    "DOM-06",
    "DOM-02",
  ]);
  assert.deepEqual(inst.blocks[0], ["DOM-03", "DOM-06", "DOM-01", "DOM-07"]);
  assert.deepEqual(inst.blocks[7], ["DOM-02", "DOM-08", "DOM-05", "DOM-03"]);
});

test("generateDihedralInstance préserve tous les invariants sur 100 graines distinctes", () => {
  for (let i = 0; i < 100; i += 1) {
    const inst = MaxDiff.generateDihedralInstance({
      seedDihedral: 20261110 + i * 37,
      seedRho: 3000 + i,
    });
    const inv = MaxDiff.evaluateDesignInvariants(inst.blocks);
    assert.equal(inv.allInvariantsValid, true, `Échec graine index ${i}`);
    assert.equal(new Set(inst.rhoOrder).size, 8);
  }
});

test("computeDescriptiveCounts calcule uniquement des comptes factuels sans score B - W ni classement", () => {
  const inst = MaxDiff.getPresetInstance("DR-INST-1");
  const responses = inst.blocks.map((blk, idx) => {
    if (idx === 0) {
      return { status: "skipped", bestDomainId: null, worstDomainId: null };
    }
    return { status: "answered", bestDomainId: blk[0], worstDomainId: blk[3] };
  });

  const counts = MaxDiff.computeDescriptiveCounts(inst.blocks, responses);
  assert.equal(counts.statusCounts.answered, 7);
  assert.equal(counts.statusCounts.skipped, 1);
  assert.equal(counts.byDomain["DOM-03"].totalPresentedCount, 4);
  assert.equal(counts.byDomain["DOM-03"].answeredExposures, 3);
  assert.equal("bwScore" in counts.byDomain["DOM-03"], false);
  assert.equal("rank" in counts.byDomain["DOM-03"], false);
});

test("selectDebriefTargetCards retient 3 à 4 cartes choisies avec au moins une carte Pourrait attendre", () => {
  const inst = MaxDiff.getPresetInstance("DR-INST-1");
  const responses = inst.blocks.map((blk) => ({
    status: "answered",
    bestDomainId: blk[0],
    worstDomainId: blk[3],
  }));
  const targets = MaxDiff.selectDebriefTargetCards(inst.blocks, responses);
  assert.ok(targets.length >= 3 && targets.length <= 4);
  assert.ok(targets.some((t) => t.role === "worst"));
  assert.ok(targets.some((t) => t.role === "best"));
});

test("validateParticipantSession rejette les clés de profilage interdites et les versions invalides", () => {
  const inst = MaxDiff.getPresetInstance("DR-INST-1");
  const validPayload = {
    schemaVersion: Data.SESSION_SCHEMA_VERSION,
    variant: "A",
    studyMode: "dry_run_interne",
    participantCode: "DR-A1",
    instance: inst,
    maxdiffResponses: [],
  };

  assert.equal(ExportL17.validateParticipantSession(validPayload).ok, true);

  const badVersion = { ...validPayload, schemaVersion: "wrong-version" };
  assert.equal(ExportL17.validateParticipantSession(badVersion).ok, false);

  const withProhibited = {
    ...validPayload,
    debrief: { nested: { leftRight: "center" } },
  };
  const rejected = ExportL17.validateParticipantSession(withProhibited);
  assert.equal(rejected.ok, false);
  assert.match(rejected.error, /leftRight/);
});

test("buildL17Dataset et toCsv génèrent les 4 onglets L17 avec séparation OBS/INTERP et protection formules", () => {
  const inst = MaxDiff.getPresetInstance("DR-INST-1");
  const session = {
    schemaVersion: Data.SESSION_SCHEMA_VERSION,
    variant: "A",
    studyMode: "dry_run_interne",
    participantCode: "DR-A1",
    exportedAtIso: "2026-11-10T10:00:00.000Z",
    instance: inst,
    maxdiffResponses: inst.blocks.map((blk, idx) => ({
      seriesIndex: idx + 1,
      status: idx === 2 ? "dont_know" : "answered",
      bestDomainId: idx === 2 ? null : blk[0],
      worstDomainId: idx === 2 ? null : blk[3],
      flagsByDomain:
        idx === 0
          ? { "DOM-03": { reasons: ["too_vague"], note: '=HYPERLINK("http://evil")' } }
          : {},
    })),
    metrics: {
      totalDurationSec: 3000,
      panoramaDurationSec: 45,
      seriesDurationsMs: [30000, 12000, 18000, 15000, 14000, 10000, 12000, 11000],
      backtrackCount: 2,
      perimeterOpens: [{ step: "S1", domainId: "DOM-03", atSecFromStart: 75 }],
      panoramaFlagsByDomain: {},
    },
    debrief: {
      choiceReasons: [
        {
          domainId: "DOM-01",
          role: "best",
          seriesIndex: 6,
          mainSubject: "Accès aux urgences",
          otherElements: "Retraites",
          lessPriorityOrRejected: "",
        },
      ],
      domainReviews: [
        {
          domainId: "DOM-01",
          spontaneousReformulation: "Soins et aides sociales",
          perceivedScope: "Hôpital et retraites",
          lexicalDifficulty: "solidarités",
          probeAnswer: "Pensé aux soins d'abord",
        },
      ],
      transversal: {
        panoramaReadingMode: "Tout lu",
        couldWaitUnderstanding: "Correct",
        choiceBasis: "Urgence collective",
      },
      level2Test: {
        domainId: "DOM-01",
        usefulness: "Répond au besoin de précision",
      },
      lexicalPairs: [
        {
          pairId: "PAIR-01",
          domainId: "DOM-01",
          variantCode: "1B",
          modifiesUnderstanding: "Oui",
          modificationDetails: "Moins orienté",
          clearerChoice: "Formulation 1",
          clearerReason: "Plus direct",
          meaningDifference: "Mot solidarités",
          betterCoverageChoice: "Formulation 2",
          coverageReason: "Plus complet",
          orientedChoice: "Aucune",
          orientedReason: "",
        },
      ],
      closure: {
        missingTopic: "Aucun",
      },
    },
    demographics: {
      ageBracket: "30–59 ans",
      territoryType: "Commune rurale",
      educationLevel: "Bac+1/2",
      institutionalEase: "Moyenne",
      politicalInterest: "Intérêt modéré",
    },
  };

  const interpState = {
    observationInterps: {
      "DR-A1::D2::DOM-01": {
        comprehension_statut_INTERP: "Fidele",
        confusion_INTERP: "Aucune",
        largeur_percue_INTERP: "Adaptee",
        selection_mono_composante_INTERP: "Oui",
        gravite_INTERP: "Mineure",
        note_analytique_INTERP: "Lecture centrée sur les soins",
        proposition_correction_INTERP: "Conserver",
      },
    },
  };

  const dataset = ExportL17.buildL17Dataset([session], interpState);

  assert.equal(ExportL17.TAB1_HEADERS.length, 17);
  assert.equal(ExportL17.TAB2_HEADERS.length, 21);
  assert.equal(ExportL17.TAB3_HEADERS.length, 14);
  assert.equal(ExportL17.TAB4_HEADERS.length, 20);

  assert.ok(dataset.tab1Rows.length >= 4);
  assert.equal(dataset.tab2Rows.length, 1);
  assert.equal(dataset.tab3Rows.length, 4);
  assert.equal(dataset.tab4Rows.length, 8);

  const dom01Row = dataset.tab4Rows.find((r) => r.domaine === "DOM-01");
  assert.equal(dom01Row.nb_participants_A_observes, 1);
  assert.equal(dom01Row.nb_comprehensions_fideles_INTERP, 1);
  assert.equal(dom01Row.gravite_max_observee, "Mineure");

  const csv1 = ExportL17.toCsv(ExportL17.TAB1_HEADERS, dataset.tab1Rows);
  assert.ok(csv1.startsWith("\uFEFF"));
  // Protection anti-injection de formule (=HYPERLINK doit être préfixé par ')
  assert.ok(csv1.includes("'=HYPERLINK"));
});

test("Garde-fous privacy : zéro stockage persistant, zéro appel réseau et zéro innerHTML dans pretest-web", () => {
  const jsDir = path.join(ROOT_DIR, "js");
  const files = fs.readdirSync(jsDir).filter((f) => f.endsWith(".js"));
  const forbiddenPatterns = [
    /\blocalStorage\b/,
    /\bsessionStorage\b/,
    /\bindexedDB\b/,
    /\bdocument\.cookie\b/,
    /\bfetch\s*\(/,
    /\bXMLHttpRequest\b/,
    /\bsendBeacon\b/,
    /\.innerHTML\b/,
    /\bdangerouslySetInnerHTML\b/,
  ];

  files.forEach((file) => {
    const content = fs.readFileSync(path.join(jsDir, file), "utf-8");
    forbiddenPatterns.forEach((pattern) => {
      assert.equal(pattern.test(content), false, `Motif interdit ${pattern} trouvé dans ${file}`);
    });
  });

  const indexHtml = fs.readFileSync(path.join(ROOT_DIR, "index.html"), "utf-8");
  assert.match(indexHtml, /connect-src 'none'/);
  assert.equal(/DOM-01|1B|2B|7B|8B/.test(indexHtml), false);
});
