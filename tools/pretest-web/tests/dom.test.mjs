import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { JSDOM } = require("jsdom");
const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function bootPage(htmlFile, extraScript) {
  const html = fs.readFileSync(path.join(ROOT_DIR, htmlFile), "utf-8");
  const dom = new JSDOM(html, {
    url: "http://127.0.0.1:4173/" + htmlFile,
    runScripts: "outside-only",
  });

  const { window } = dom;
  window.scrollTo = () => {};
  window.requestAnimationFrame = (fn) => {
    fn();
    return 0;
  };
  window.confirm = () => true;

  const capturedDownloads = [];
  const blobTexts = new Map();
  let urlCounter = 0;

  window.URL.createObjectURL = (blob) => {
    urlCounter += 1;
    const u = "blob:test-" + urlCounter;
    blobTexts.set(u, blob);
    return u;
  };
  window.URL.revokeObjectURL = () => {};

  const origAnchorClick = window.HTMLAnchorElement.prototype.click;
  window.HTMLAnchorElement.prototype.click = function () {
    if (this.hasAttribute("download") && this.href.startsWith("blob:")) {
      capturedDownloads.push({
        filename: this.getAttribute("download"),
        blob: blobTexts.get(this.href),
      });
      return;
    }
    if (origAnchorClick) {
      origAnchorClick.call(this);
    }
  };

  const ctx = dom.getInternalVMContext();
  const scripts = ["js/data.js", "js/maxdiff.js", "js/export-l17.js", extraScript];
  for (const rel of scripts) {
    const code = fs.readFileSync(path.join(ROOT_DIR, rel), "utf-8");
    vm.runInContext(code, ctx, { filename: rel });
  }

  window.document.dispatchEvent(new window.Event("DOMContentLoaded"));
  return { dom, window, document: window.document, capturedDownloads };
}

function clickButtonByText(container, pattern) {
  const buttons = Array.from(container.querySelectorAll("button"));
  const target = buttons.find((b) => pattern.test(b.textContent || ""));
  assert.ok(target, `Bouton introuvable pour ${pattern}`);
  target.click();
  return target;
}

test("Parcours autonome complet Variante A -> export JSON sans fuite DOM-XX / 1B..8B -> import dans observations.html", async () => {
  const p = bootPage("index.html", "js/participant-app.js");
  const { document, capturedDownloads } = p;

  // Étape Setup (Variante A, DR-INST-1 par défaut)
  assert.match(document.body.textContent, /Paramétrage|Passation autonome/);
  clickButtonByText(document, /Démarrer la passation/);

  // Étape 1 : Accueil
  assert.match(document.querySelector("h1").textContent, /Avant de commencer/);
  clickButtonByText(document, /Continuer/);

  // Étape 2A : Panorama préalable des 8 domaines (aucun code DOM-XX visible)
  assert.match(document.querySelector("h1").textContent, /Vue d'ensemble des huit domaines/);
  assert.equal(/DOM-01|DOM-08|1B|2B|7B|8B/.test(document.body.textContent), false);
  clickButtonByText(document, /Commencer la série 1 sur 8/);

  // Étape 3 : 8 séries MaxDiff
  for (let s = 1; s <= 8; s += 1) {
    assert.match(document.querySelector("h1").textContent, new RegExp(`Série ${s} sur 8`));
    assert.equal(/DOM-01|DOM-08|1B|2B|7B|8B/.test(document.body.textContent), false);
    const bestButtons = document.querySelectorAll("button.choice-best");
    const worstButtons = document.querySelectorAll("button.choice-worst");
    assert.equal(bestButtons.length, 4);
    assert.equal(worstButtons.length, 4);

    if (s === 3) {
      clickButtonByText(document, /Je ne sais pas choisir/);
    } else {
      bestButtons[0].click();
      worstButtons[3].click();
    }

    if (s < 8) {
      clickButtonByText(document, /Série suivante/);
    } else {
      clickButtonByText(document, /Terminer les 8 séries/);
    }
  }

  // Étape 4 : Débriefing D.1
  assert.match(document.querySelector("h1").textContent, /Vos raisons sur les cartes choisies/);
  const d1Textarea = document.querySelector("#d1-main-0");
  assert.ok(d1Textarea);
  d1Textarea.value = "Accès aux soins de proximité";
  d1Textarea.dispatchEvent(new p.window.Event("input"));
  clickButtonByText(document, /Continuer vers le sens des cartes/);

  // Étape 5 : Débriefing D.2 (passer directement après 1ère fiche renseignée)
  assert.match(document.querySelector("h1").textContent, /Compréhension des cartes/);
  const d2Reform = document.querySelector("#d2-reform");
  d2Reform.value = "Soins et protections sociales";
  d2Reform.dispatchEvent(new p.window.Event("input"));
  clickButtonByText(document, /Passer directement à la vue d'ensemble/);

  // Étape 6 : Débriefing D.3 + Niveau 2
  assert.match(document.querySelector("h1").textContent, /Questions transversales/);
  clickButtonByText(document, /Valider le retour spontané/);

  // Étape 7 : Débriefing lexical E (4 paires, aucun code 1B/2B/7B/8B visible)
  for (let pair = 1; pair <= 4; pair += 1) {
    assert.match(document.querySelector("h1").textContent, new RegExp(`paire ${pair} sur 4`));
    assert.equal(/1B|2B|7B|8B|DOM-0/.test(document.body.textContent), false);
    const modSelect = document.querySelector("#lex-mod");
    modSelect.value = "Non";
    modSelect.dispatchEvent(new p.window.Event("change"));
    if (pair < 4) {
      clickButtonByText(document, /Paire suivante/);
    } else {
      clickButtonByText(document, /Terminer les paires et conclure/);
    }
  }

  // Étape 8 : Clôture F
  assert.match(document.querySelector("h1").textContent, /Clôture/);
  const missingInput = document.querySelector("#cl-missing");
  missingInput.value = "Rien de manquant";
  missingInput.dispatchEvent(new p.window.Event("input"));
  clickButtonByText(document, /Accéder au récapitulatif/);

  // Étape 9 : Export JSON
  assert.match(document.querySelector("h1").textContent, /Récapitulatif de passation/);
  clickButtonByText(document, /Télécharger mon fichier de séance/);
  assert.equal(capturedDownloads.length, 1);
  assert.match(capturedDownloads[0].filename, /^civic-explorer-passation-DR-A1-A\.json$/);
  const exportedJsonText = await capturedDownloads[0].blob.text();
  const exportedSession = JSON.parse(exportedJsonText);
  assert.equal(exportedSession.schemaVersion, "pretest-session-v1");
  assert.equal(exportedSession.variant, "A");
  assert.equal(exportedSession.debrief.closure.missingTopic, "Rien de manquant");

  // Import dans la console Analyste (observations.html)
  const a = bootPage("observations.html", "js/analyst-app.js");
  const fileInput = a.document.querySelector('input[type="file"]');
  const mockFile = new a.window.File([exportedJsonText], capturedDownloads[0].filename, {
    type: "application/json",
  });
  Object.defineProperty(fileInput, "files", { value: [mockFile] });
  fileInput.dispatchEvent(new a.window.Event("change"));

  // FileReader est asynchrone : attendre un tour d'event loop
  await new Promise((resolve) => setTimeout(resolve, 40));

  assert.match(a.document.body.textContent, /1 session\(s\) importée\(s\)/);
  assert.match(a.document.body.textContent, /Accès aux soins de proximité/);

  // Vérifier les 4 boutons d'export CSV
  clickButtonByText(a.document, /Télécharger 01_Observations\.csv/);
  clickButtonByText(a.document, /Télécharger 02_Synthese_Participant\.csv/);
  clickButtonByText(a.document, /Télécharger 03_Debriefing_Lexical\.csv/);
  clickButtonByText(a.document, /Télécharger 04_Synthese_Domaine\.csv/);
  assert.equal(a.capturedDownloads.length, 4);
  const csv1 = await a.capturedDownloads[0].blob.text();
  assert.match(csv1, /participant_id;variante;domaine;serie;/);
  assert.match(csv1, /Accès aux soins de proximité/);
});

test("Variante B : aucun panorama préalable, modale périmètre complet accessible et tracée, signalement orthogonal", async () => {
  const p = bootPage("index.html", "js/participant-app.js");
  const { document, capturedDownloads } = p;

  const variantSel = document.querySelector("#setup-variant");
  variantSel.value = "B";
  variantSel.dispatchEvent(new p.window.Event("change"));
  clickButtonByText(document, /Démarrer la passation/);

  clickButtonByText(document, /Continuer/);
  // En B : écran 2B sans liste des 8 domaines
  assert.match(document.querySelector("h1").textContent, /Prêt à commencer/);
  assert.equal(document.querySelectorAll(".domain-card").length, 0);

  // Ouvrir le volet périmètre complet
  clickButtonByText(document, /Voir le périmètre complet des 8 domaines/);
  const modal = document.querySelector("#modal-backdrop");
  assert.equal(modal.hidden, false);
  assert.equal(modal.querySelectorAll("article.card").length, 8);
  clickButtonByText(modal, /Fermer/);
  assert.equal(modal.hidden, true);

  clickButtonByText(document, /Commencer la série 1 sur 8/);

  // Signaler un problème sur la première carte de S1 sans modifier la série
  document.querySelectorAll(".card-tools button")[1].click();
  const flagModal = document.querySelector("#modal-backdrop");
  assert.equal(flagModal.hidden, false);
  flagModal.querySelector('input[type="checkbox"]').click();
  clickButtonByText(flagModal, /Enregistrer et fermer/);
  assert.match(document.body.textContent, /Problème signalé \(1\)/);

  // Remplir les 8 séries (dont Impossible de départager + motif en S2)
  for (let s = 1; s <= 8; s += 1) {
    if (s === 2) {
      clickButtonByText(document, /Impossible de départager cette série/);
      document.querySelector('input[type="radio"]').click();
    } else {
      document.querySelectorAll("button.choice-best")[0].click();
      document.querySelectorAll("button.choice-worst")[2].click();
    }
    if (s < 8) {
      clickButtonByText(document, /Série suivante/);
    } else {
      clickButtonByText(document, /Terminer les 8 séries/);
    }
  }

  clickButtonByText(document, /Continuer vers le sens des cartes/);
  clickButtonByText(document, /Passer directement à la vue d'ensemble/);
  clickButtonByText(document, /Valider le retour spontané/);
  for (let pair = 1; pair <= 4; pair += 1) {
    if (pair < 4) {
      clickButtonByText(document, /Paire suivante/);
    } else {
      clickButtonByText(document, /Terminer les paires et conclure/);
    }
  }
  clickButtonByText(document, /Accéder au récapitulatif/);
  clickButtonByText(document, /Télécharger mon fichier de séance/);

  const session = JSON.parse(await capturedDownloads[0].blob.text());
  assert.equal(session.variant, "B");
  assert.equal(session.metrics.perimeterOpens.length, 1);
  assert.equal(session.metrics.perimeterOpens[0].step, "2B");
  assert.equal(session.maxdiffResponses[1].status, "no_distinguishable_best_worst");
  assert.equal(session.maxdiffResponses[1].noDistinguishableReason, "equally_prioritized");
});
