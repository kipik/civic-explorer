(function () {
  "use strict";

  const Data = window.CivicPretestData;
  const MaxDiff = window.CivicPretestMaxDiff;
  const ExportL17 = window.CivicPretestExportL17;

  const STEP_SEQUENCE = [
    { id: "setup", label: "Paramétrage" },
    { id: "intro", label: "1. Accueil" },
    { id: "pre_exercise", label: "2. Présentation" },
    { id: "maxdiff", label: "3. Séries (1–8)" },
    { id: "debrief_d1", label: "4. Raisons des choix" },
    { id: "debrief_d2", label: "5. Sens des cartes" },
    { id: "debrief_d3", label: "6. Vue d'ensemble" },
    { id: "debrief_e", label: "7. Formulations (E)" },
    { id: "debrief_f", label: "8. Clôture" },
    { id: "summary_export", label: "9. Export JSON" },
  ];

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        const val = attrs[key];
        if (val === null || val === undefined || val === false) {
          return;
        }
        if (key === "className") {
          node.className = val;
        } else if (key === "textContent") {
          node.textContent = val;
        } else if (key === "value") {
          node.value = String(val);
        } else if (key === "checked") {
          node.checked = Boolean(val);
        } else if (key === "selected") {
          node.selected = Boolean(val);
        } else if (key === "disabled") {
          node.disabled = Boolean(val);
        } else if (key.startsWith("on") && typeof val === "function") {
          node.addEventListener(key.slice(2).toLowerCase(), val);
        } else if (val === true) {
          node.setAttribute(key, "");
        } else {
          node.setAttribute(key, String(val));
        }
      });
    }
    if (children !== undefined && children !== null) {
      const list = Array.isArray(children) ? children : [children];
      list.forEach(function (child) {
        if (child === null || child === undefined || child === false) {
          return;
        }
        if (typeof child === "string" || typeof child === "number") {
          node.appendChild(document.createTextNode(String(child)));
        } else {
          node.appendChild(child);
        }
      });
    }
    return node;
  }

  function createEmptyMaxDiffResponses() {
    const list = [];
    for (let i = 0; i < 8; i += 1) {
      list.push({
        seriesIndex: i + 1,
        status: "incomplete",
        bestDomainId: null,
        worstDomainId: null,
        noDistinguishableReason: "",
        noDistinguishableOther: "",
        flagsByDomain: {},
      });
    }
    return list;
  }

  function createInitialState() {
    return {
      step: "setup",
      setup: {
        studyMode: "dry_run_interne",
        variant: "A",
        instanceMode: "DR-INST-1",
        customSeedDihedral: 20261110,
        customSeedRho: 20261210,
        participantCode: "DR-A1",
      },
      sessionStartedAtMs: null,
      sessionEndedAtMs: null,
      panoramaEnteredAtMs: null,
      seriesEnteredAtMs: null,
      currentSeriesIndex: 0,
      currentDebriefD2Index: 0,
      currentLexicalIndex: 0,
      lexicalUnlocked: false,
      retroactiveWarningAcknowledged: false,
      instance: null,
      maxdiffResponses: createEmptyMaxDiffResponses(),
      metrics: {
        panoramaDurationSec: null,
        seriesDurationsMs: [0, 0, 0, 0, 0, 0, 0, 0],
        backtrackCount: 0,
        perimeterOpens: [],
        panoramaFlagsByDomain: {},
      },
      debrief: {
        choiceReasons: [],
        domainReviews: [],
        transversal: {
          panoramaReadingMode: "",
          overviewReachedAtSeries: "",
          variantExperienceComment: "",
          couldWaitUnderstanding: "",
          choiceBasis: "",
          confusionsOrOverlaps: "",
          tooBroadDomains: "",
          hardestSeries: "",
          missingSpotted: "",
          flagToolNoticed: "",
        },
        level2Test: {
          domainId: "",
          selectedSubIssues: [],
          otherSubIssue: "",
          usefulness: "",
          comment: "",
        },
        lexicalPairs: Data.LEXICAL_PAIRS.map(function (p) {
          return {
            pairId: p.pairId,
            domainId: p.domainId,
            variantCode: p.variantCode,
            modifiesUnderstanding: "",
            modificationDetails: "",
            clearerChoice: "",
            clearerReason: "",
            meaningDifference: "",
            betterCoverageChoice: "",
            coverageReason: "",
            orientedChoice: "",
            orientedReason: "",
          };
        }),
        closure: {
          missingTopic: "",
          ergonomicFeedback: "",
        },
      },
      demographics: {
        ageBracket: "Je préfère ne pas répondre",
        territoryType: "Je préfère ne pas répondre",
        educationLevel: "Je préfère ne pas répondre",
        institutionalEase: "Je préfère ne pas répondre",
        politicalInterest: "Je préfère ne pas répondre",
      },
      validationBanner: "",
      exportMessage: "",
      expandedPanoramaDetails: {},
      expandedSeriesDetails: {},
      modalState: null,
    };
  }

  let state = createInitialState();

  function isSessionDirty() {
    return state.step !== "setup" && state.instance !== null;
  }

  window.addEventListener("beforeunload", function (event) {
    if (isSessionDirty() && !state.exportDownloaded) {
      event.preventDefault();
      event.returnValue = "";
    }
  });

  function commitSeriesElapsedTime() {
    if (state.step === "maxdiff" && state.seriesEnteredAtMs !== null) {
      const elapsed = Math.max(0, Date.now() - state.seriesEnteredAtMs);
      state.metrics.seriesDurationsMs[state.currentSeriesIndex] += elapsed;
      state.seriesEnteredAtMs = Date.now();
    }
  }

  function recordPerimeterOpen(stepTag, domainId) {
    state.metrics.perimeterOpens.push({
      step: stepTag,
      domainId: domainId || null,
      atSecFromStart: state.sessionStartedAtMs
        ? Math.round((Date.now() - state.sessionStartedAtMs) / 1000)
        : 0,
    });
  }

  function startSession() {
    let instance;
    if (state.setup.instanceMode === "DR-INST-1" || state.setup.instanceMode === "DR-INST-2") {
      instance = MaxDiff.getPresetInstance(state.setup.instanceMode);
    } else {
      instance = MaxDiff.generateDihedralInstance({
        instanceId: "CUSTOM-" + String(state.setup.customSeedDihedral),
        seedDihedral: state.setup.customSeedDihedral,
        seedRho: state.setup.customSeedRho,
      });
    }

    const inv = MaxDiff.evaluateDesignInvariants(instance.blocks);
    if (!inv.allInvariantsValid) {
      state.validationBanner =
        "Erreur interne : les invariants combinatoires MaxDiff ne sont pas satisfaits.";
      render();
      return;
    }

    state.instance = instance;
    state.sessionStartedAtMs = Date.now();
    state.sessionEndedAtMs = null;
    state.maxdiffResponses = createEmptyMaxDiffResponses();
    state.metrics = {
      panoramaDurationSec: null,
      seriesDurationsMs: [0, 0, 0, 0, 0, 0, 0, 0],
      backtrackCount: 0,
      perimeterOpens: [],
      panoramaFlagsByDomain: {},
    };
    state.debrief.domainReviews = instance.rhoOrder.map(function (domId) {
      return {
        domainId: domId,
        spontaneousReformulation: "",
        perceivedScope: "",
        lexicalDifficulty: "",
        probeAnswer: "",
      };
    });
    // Prioriser les 5 domaines cibles D.2 en tête de revue spontanée tout en gardant un ordre neutre
    state.debrief.domainReviews.sort(function (a, b) {
      const pa = Data.DOMAIN_MAP[a.domainId].priorityInDebrief ? 0 : 1;
      const pb = Data.DOMAIN_MAP[b.domainId].priorityInDebrief ? 0 : 1;
      return pa - pb;
    });
    state.lexicalUnlocked = false;
    state.exportDownloaded = false;
    state.validationBanner = "";
    state.step = "intro";
    render();
    focusMainHeading();
  }

  function focusMainHeading() {
    window.requestAnimationFrame(function () {
      const h1 = document.querySelector("#app-main h1");
      if (h1) {
        h1.setAttribute("tabindex", "-1");
        h1.focus();
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  }

  function buildSessionPayload() {
    const endMs = state.sessionEndedAtMs || Date.now();
    const totalDurationSec = state.sessionStartedAtMs
      ? Math.max(1, Math.round((endMs - state.sessionStartedAtMs) / 1000))
      : 0;

    return {
      schemaVersion: Data.SESSION_SCHEMA_VERSION,
      catalogVersion: Data.CATALOG_VERSION,
      protocolVersion: Data.PROTOCOL_VERSION,
      exportedAtIso: new Date().toISOString(),
      studyMode: state.setup.studyMode,
      excludedFromFutureSample: state.setup.studyMode === "dry_run_interne",
      variant: state.setup.variant,
      participantCode: state.setup.participantCode.trim() || "ANON",
      instance: state.instance,
      maxdiffResponses: state.maxdiffResponses,
      descriptiveCounts: MaxDiff.computeDescriptiveCounts(
        state.instance.blocks,
        state.maxdiffResponses,
      ),
      metrics: {
        totalDurationSec: totalDurationSec,
        panoramaDurationSec: state.metrics.panoramaDurationSec,
        seriesDurationsMs: state.metrics.seriesDurationsMs.slice(),
        backtrackCount: state.metrics.backtrackCount,
        perimeterOpens: state.metrics.perimeterOpens.slice(),
        panoramaFlagsByDomain: state.metrics.panoramaFlagsByDomain,
      },
      debrief: state.debrief,
      demographics: state.demographics,
    };
  }

  function prepareChoiceReasonsIfNeeded() {
    const targets = MaxDiff.selectDebriefTargetCards(state.instance.blocks, state.maxdiffResponses);
    const existingById = {};
    state.debrief.choiceReasons.forEach(function (item) {
      existingById[item.domainId] = item;
    });
    state.debrief.choiceReasons = targets.map(function (t) {
      const prev = existingById[t.domainId];
      return {
        domainId: t.domainId,
        role: t.role,
        seriesIndex: t.seriesIndex,
        mainSubject: prev ? prev.mainSubject : "",
        otherElements: prev ? prev.otherElements : "",
        lessPriorityOrRejected: prev ? prev.lessPriorityOrRejected : "",
      };
    });
  }

  function goToStep(nextStep) {
    commitSeriesElapsedTime();
    if (state.step === "pre_exercise" && state.setup.variant === "A" && state.panoramaEnteredAtMs) {
      const elapsedSec = Math.max(0, (Date.now() - state.panoramaEnteredAtMs) / 1000);
      state.metrics.panoramaDurationSec =
        (state.metrics.panoramaDurationSec || 0) + Math.round(elapsedSec * 10) / 10;
      state.panoramaEnteredAtMs = null;
    }

    state.validationBanner = "";
    state.step = nextStep;

    if (nextStep === "pre_exercise" && state.setup.variant === "A") {
      state.panoramaEnteredAtMs = Date.now();
    } else if (nextStep === "maxdiff") {
      state.seriesEnteredAtMs = Date.now();
    } else if (nextStep === "debrief_d1") {
      prepareChoiceReasonsIfNeeded();
    } else if (nextStep === "summary_export") {
      if (!state.sessionEndedAtMs) {
        state.sessionEndedAtMs = Date.now();
      }
    }

    render();
    focusMainHeading();
  }

  function openPerimeterModal(stepTag, focusDomainId) {
    recordPerimeterOpen(stepTag, focusDomainId || null);
    state.modalState = {
      type: "perimeter",
      stepTag: stepTag,
      focusDomainId: focusDomainId || null,
    };
    renderModal();
  }

  function openFlagModal(contextType, seriesIndex, domainId) {
    state.modalState = {
      type: "flag",
      contextType: contextType,
      seriesIndex: seriesIndex,
      domainId: domainId,
    };
    renderModal();
  }

  function closeModal() {
    state.modalState = null;
    renderModal();
  }

  function renderHeader() {
    const headerBadges = document.getElementById("header-badges");
    const headerActions = document.getElementById("header-actions");
    if (!headerBadges || !headerActions) {
      return;
    }
    headerBadges.textContent = "";
    headerActions.textContent = "";

    const isDryRun = state.setup.studyMode === "dry_run_interne";
    headerBadges.appendChild(
      el("span", {
        className: isDryRun ? "badge badge-warn" : "badge",
        textContent: isDryRun
          ? "DRY-RUN INTERNE — EXCLU DE TOUT ÉCHANTILLON"
          : "Prétest cognitif L13–L21",
      }),
    );

    headerBadges.appendChild(
      el("span", {
        className: "badge",
        textContent: "100 % local en mémoire",
      }),
    );

    if (state.step === "pre_exercise" || state.step === "maxdiff") {
      headerActions.appendChild(
        el("button", {
          type: "button",
          className: "btn btn-subtle",
          textContent: "Voir le périmètre complet des 8 domaines",
          onClick: function () {
            const tag =
              state.step === "pre_exercise"
                ? state.setup.variant === "A"
                  ? "2A"
                  : "2B"
                : "S" + (state.currentSeriesIndex + 1);
            openPerimeterModal(tag, null);
          },
        }),
      );
    }

    if (state.step !== "setup") {
      headerActions.appendChild(
        el("button", {
          type: "button",
          className: "btn btn-subtle btn-danger",
          textContent: "Effacer la session",
          onClick: function () {
            if (
              window.confirm(
                "Effacer toute la session en mémoire ? Les données non exportées seront définitivement perdues.",
              )
            ) {
              state = createInitialState();
              render();
              focusMainHeading();
            }
          },
        }),
      );
    }
  }

  function renderProgress() {
    const nav = document.getElementById("progress-nav");
    if (!nav) {
      return;
    }
    nav.textContent = "";
    if (state.step === "setup") {
      return;
    }
    const activeIdx = STEP_SEQUENCE.findIndex(function (s) {
      return s.id === state.step;
    });
    const list = el("div", { className: "progress-bar", role: "list" });
    STEP_SEQUENCE.slice(1).forEach(function (stepInfo, idx) {
      const realIdx = idx + 1;
      const cls =
        realIdx === activeIdx
          ? "step-pill is-active"
          : realIdx < activeIdx
            ? "step-pill is-done"
            : "step-pill";
      list.appendChild(
        el("span", {
          className: cls,
          role: "listitem",
          textContent: stepInfo.label,
          "aria-current": realIdx === activeIdx ? "step" : null,
        }),
      );
    });
    nav.appendChild(list);
  }

  function renderSetupStep(root) {
    const card = el("section", { className: "card" }, [
      el("h1", { textContent: "Passation autonome — Prétest & Dry Run (L13–L21)" }),
      el("p", {
        className: "muted",
        textContent:
          "Support web local hors ligne dédié au référentiel des 8 grands domaines (L11). Aucune donnée n'est envoyée sur un réseau ni conservée dans le navigateur : en fin de séance, vous téléchargez votre fichier JSON pour le transmettre à l'équipe.",
      }),
    ]);

    const notice = el("div", { className: "notice notice-warn" }, [
      el("strong", { textContent: "Confidentialité & séparation des protocoles : " }),
      "cet outil met en œuvre uniquement le protocole L13–L21 (distinct du futur parcours pilote P1.1 V0.3). Pendant toute la durée de la passation participant, aucun code technique interne (DOM-XX ou 1B/2B/7B/8B) n'est affiché.",
    ]);

    const formCard = el("section", { className: "card" });

    // Cadre
    const modeSelect = el(
      "select",
      {
        id: "setup-mode",
        className: "select",
        onChange: function (e) {
          state.setup.studyMode = e.target.value;
          if (state.setup.studyMode === "dry_run_interne") {
            state.setup.participantCode =
              "DR-" + state.setup.variant + (state.setup.instanceMode === "DR-INST-2" ? "2" : "1");
          } else if (state.setup.participantCode.startsWith("DR-")) {
            state.setup.participantCode = "P01";
          }
          render();
        },
      },
      [
        el("option", {
          value: "dry_run_interne",
          selected: state.setup.studyMode === "dry_run_interne",
          textContent: "Dry run interne (exclu de l'échantillon futur)",
        }),
        el("option", {
          value: "pretest_cognitif",
          selected: state.setup.studyMode === "pretest_cognitif",
          textContent: "Prétest cognitif L13 (après validations L20)",
        }),
      ],
    );

    // Variante
    const variantSelect = el(
      "select",
      {
        id: "setup-variant",
        className: "select",
        onChange: function (e) {
          state.setup.variant = e.target.value;
          if (state.setup.studyMode === "dry_run_interne") {
            state.setup.participantCode =
              "DR-" + state.setup.variant + (state.setup.instanceMode === "DR-INST-2" ? "2" : "1");
          }
          render();
        },
      },
      [
        el("option", {
          value: "A",
          selected: state.setup.variant === "A",
          textContent: "Variante A — Panorama préalable des 8 domaines",
        }),
        el("option", {
          value: "B",
          selected: state.setup.variant === "B",
          textContent: "Variante B — Découverte progressive (sans panorama)",
        }),
      ],
    );

    // Instance
    const instanceSelect = el(
      "select",
      {
        id: "setup-instance",
        className: "select",
        onChange: function (e) {
          state.setup.instanceMode = e.target.value;
          if (state.setup.studyMode === "dry_run_interne") {
            state.setup.participantCode =
              "DR-" + state.setup.variant + (state.setup.instanceMode === "DR-INST-2" ? "2" : "1");
          }
          render();
        },
      },
      [
        el("option", {
          value: "DR-INST-1",
          selected: state.setup.instanceMode === "DR-INST-1",
          textContent: "Instance DR-INST-1 (seed_dihedral=101, seed_rho=201)",
        }),
        el("option", {
          value: "DR-INST-2",
          selected: state.setup.instanceMode === "DR-INST-2",
          textContent: "Instance DR-INST-2 (seed_dihedral=102, seed_rho=202)",
        }),
        el("option", {
          value: "custom",
          selected: state.setup.instanceMode === "custom",
          textContent: "Tirage contrôlé par graine personnalisée (pi x tau x D8)",
        }),
      ],
    );

    const codeInput = el("input", {
      id: "setup-code",
      type: "text",
      className: "input",
      maxlength: "32",
      value: state.setup.participantCode,
      placeholder: "Ex. DR-A1 ou P01 (aucun nom réel)",
      onInput: function (e) {
        state.setup.participantCode = e.target.value;
      },
    });

    formCard.appendChild(
      el("div", { className: "grid-2" }, [
        el("div", { className: "field" }, [
          el("label", { for: "setup-mode", textContent: "Cadre de la passation" }),
          modeSelect,
        ]),
        el("div", { className: "field" }, [
          el("label", { for: "setup-variant", textContent: "Variante assignée" }),
          variantSelect,
        ]),
        el("div", { className: "field" }, [
          el("label", { for: "setup-instance", textContent: "Instance / randomisation D8" }),
          instanceSelect,
        ]),
        el("div", { className: "field" }, [
          el("label", {
            for: "setup-code",
            textContent: "Code séance anonyme (sans nom ni prénom)",
          }),
          codeInput,
        ]),
      ]),
    );

    if (state.setup.instanceMode === "custom") {
      formCard.appendChild(
        el("div", { className: "grid-2" }, [
          el("div", { className: "field" }, [
            el("label", { for: "setup-seed-d", textContent: "Graine MaxDiff (seed_dihedral)" }),
            el("input", {
              id: "setup-seed-d",
              type: "number",
              className: "input",
              value: String(state.setup.customSeedDihedral),
              onInput: function (e) {
                state.setup.customSeedDihedral = Number(e.target.value) || 20261110;
              },
            }),
          ]),
          el("div", { className: "field" }, [
            el("label", { for: "setup-seed-rho", textContent: "Graine ordre domaines (seed_rho)" }),
            el("input", {
              id: "setup-seed-rho",
              type: "number",
              className: "input",
              value: String(state.setup.customSeedRho),
              onInput: function (e) {
                state.setup.customSeedRho = Number(e.target.value) || 20261210;
              },
            }),
          ]),
        ]),
      );
      formCard.appendChild(
        el("button", {
          type: "button",
          className: "btn btn-subtle",
          textContent: "Tirer de nouvelles graines aléatoires",
          onClick: function () {
            const rand = new Uint32Array(2);
            if (window.crypto && window.crypto.getRandomValues) {
              window.crypto.getRandomValues(rand);
              state.setup.customSeedDihedral = (rand[0] % 900000) + 100000;
              state.setup.customSeedRho = (rand[1] % 900000) + 100000;
            } else {
              state.setup.customSeedDihedral = Math.floor(Math.random() * 900000) + 100000;
              state.setup.customSeedRho = Math.floor(Math.random() * 900000) + 100000;
            }
            render();
          },
        }),
      );
    }

    formCard.appendChild(
      el("div", { className: "btn-row" }, [
        el("a", {
          href: "./observations.html",
          className: "btn",
          textContent: "Ouvrir l'espace Analyste (import JSON & grille L17)",
        }),
        el("button", {
          type: "button",
          className: "btn btn-primary",
          textContent: "Démarrer la passation →",
          onClick: startSession,
        }),
      ]),
    );

    root.appendChild(card);
    root.appendChild(notice);
    root.appendChild(formCard);
  }

  function renderIntroStep(root) {
    const card = el("section", { className: "card" }, [
      el("h1", { textContent: "Avant de commencer" }),
      el("p", {
        textContent:
          "Cet exercice vous propose d'indiquer quels grands domaines de choix collectifs devraient, selon vous, recevoir le plus d'attention dans les décisions à venir pour le pays.",
      }),
      el("ul", null, [
        el("li", null, [
          el("strong", { textContent: "Ce que ce n'est pas : " }),
          "il ne s'agit ni d'un test de connaissances, ni d'une recommandation de vote ou de candidat, ni d'un classement personnel de vos opinions politiques. Il n'y a aucune bonne ou mauvaise réponse.",
        ]),
        el("li", null, [
          el("strong", { textContent: "Comment répondre : " }),
          "chaque série vous présente quatre grands domaines. Indiquez celui qui devrait recevoir le plus d'attention et celui qui pourrait attendre dans cette série.",
        ]),
        el("li", null, [
          el("strong", { textContent: "Ce que signifie « Pourrait attendre » : " }),
          "cela signifie uniquement que, parmi ces quatre cartes, d'autres domaines passent avant à vos yeux en ce moment — cela ne veut pas dire que ce sujet est sans importance, ni que vous êtes contre.",
        ]),
        el("li", null, [
          el("strong", { textContent: "Domaines larges : " }),
          "chaque carte regroupe plusieurs sujets liés. Vous pouvez choisir un domaine parce qu'un de ses grands sujets vous paraît prioritaire, sans avoir à approuver tout ce qu'il contient ni une politique particulière.",
        ]),
        el("li", null, [
          el("strong", { textContent: "Liberté de réponse et confidentialité : " }),
          "à tout moment, vous pouvez consulter le périmètre d'un domaine, signaler une formulation qui vous semble floue ou orientée, revenir à la série précédente, passer une série, indiquer « Je ne sais pas choisir » ou « Impossible de départager ». Vos réponses restent strictement locales en mémoire et ne sont associées à aucun nom.",
        ]),
      ]),
      el("p", {
        className: "small muted",
        textContent:
          "En fin de parcours, un court questionnaire de retour vous aidera à exprimer ce que vous avez compris des cartes, avant de télécharger votre fichier de séance (.json).",
      }),
      el("div", { className: "btn-row" }, [
        el("button", {
          type: "button",
          className: "btn",
          textContent: "← Retour au paramétrage",
          onClick: function () {
            goToStep("setup");
          },
        }),
        el("button", {
          type: "button",
          className: "btn btn-primary",
          textContent: "Continuer →",
          onClick: function () {
            goToStep("pre_exercise");
          },
        }),
      ]),
    ]);
    root.appendChild(card);
  }

  function renderPreExerciseStep(root) {
    if (state.setup.variant === "A") {
      const headerCard = el("section", { className: "card" }, [
        el("h1", { textContent: "Vue d'ensemble des huit domaines" }),
        el("p", {
          textContent:
            "Avant de commencer les séries de comparaison, prenez le temps de découvrir les huit grands domaines qui vous seront présentés quatre par quatre.",
        }),
      ]);

      const grid = el("div", { className: "grid-2" });
      state.instance.rhoOrder.forEach(function (domId) {
        const domain = Data.DOMAIN_MAP[domId];
        const isExpanded = Boolean(state.expandedPanoramaDetails[domId]);
        const flagEntry = state.metrics.panoramaFlagsByDomain[domId];
        const hasFlag = flagEntry && flagEntry.reasons && flagEntry.reasons.length > 0;

        const card = el("article", { className: "domain-card" }, [
          el("div", null, [
            el("h2", { className: "domain-card-title", textContent: domain.title }),
            el("p", { className: "domain-card-desc", textContent: domain.shortDescription }),
          ]),
          el("div", null, [
            el("div", { className: "card-tools" }, [
              el("button", {
                type: "button",
                className: "btn btn-subtle",
                "aria-expanded": isExpanded ? "true" : "false",
                textContent: isExpanded
                  ? "Masquer le périmètre résumé"
                  : "Consulter le périmètre résumé",
                onClick: function () {
                  state.expandedPanoramaDetails[domId] = !isExpanded;
                  if (!isExpanded) {
                    recordPerimeterOpen("Panorama", domId);
                  }
                  render();
                },
              }),
              el("button", {
                type: "button",
                className: "btn btn-subtle",
                textContent: hasFlag
                  ? "Formulation signalée (" + flagEntry.reasons.length + ")"
                  : "Signaler une formulation",
                onClick: function () {
                  openFlagModal("panorama", null, domId);
                },
              }),
            ]),
            isExpanded
              ? el("div", { className: "inline-details" }, [
                  el("p", null, [
                    el("strong", { textContent: "Ce que ce domaine couvre : " }),
                    domain.covers,
                  ]),
                  el("p", { className: "small", textContent: "Traité dans d'autres domaines :" }),
                  el(
                    "ul",
                    { className: "small" },
                    domain.otherDomains.map(function (line) {
                      return el("li", { textContent: line });
                    }),
                  ),
                ])
              : null,
          ]),
        ]);
        grid.appendChild(card);
      });

      const navCard = el("section", { className: "card" }, [
        el("div", { className: "btn-row" }, [
          el("button", {
            type: "button",
            className: "btn",
            textContent: "← Précédent",
            onClick: function () {
              goToStep("intro");
            },
          }),
          el("button", {
            type: "button",
            className: "btn btn-primary",
            textContent: "Commencer la série 1 sur 8 →",
            onClick: function () {
              state.currentSeriesIndex = 0;
              goToStep("maxdiff");
            },
          }),
        ]),
      ]);

      root.appendChild(headerCard);
      root.appendChild(grid);
      root.appendChild(navCard);
      return;
    }

    // Variante B — Découverte progressive (aucune liste préalable des 8 domaines)
    const cardB = el("section", { className: "card" }, [
      el("h1", { textContent: "Prêt à commencer ?" }),
      el("p", null, [
        "Vous allez maintenant découvrir ",
        el("strong", { textContent: "8 séries successives" }),
        " contenant chacune ",
        el("strong", { textContent: "4 cartes" }),
        " issues d'un ensemble de ",
        el("strong", { textContent: "8 grands domaines" }),
        ".",
      ]),
      el("p", { textContent: "Dans chaque série :" }),
      el("ul", null, [
        el("li", null, [
          "choisissez la carte qui ",
          el("strong", { textContent: "devrait recevoir le plus d'attention" }),
          " ;",
        ]),
        el("li", null, [
          "choisissez une autre carte qui ",
          el("strong", { textContent: "pourrait attendre" }),
          " (cela veut seulement dire que d'autres domaines passent avant dans cette série, pas que le sujet est sans importance ni que vous êtes contre).",
        ]),
      ]),
      el("p", null, [
        "À tout moment, si vous hésitez sur ce que recouvre un domaine ou si vous vous demandez où figure un sujet précis, vous pouvez ouvrir le bouton ",
        el("strong", { textContent: "« Voir le périmètre complet des 8 domaines »" }),
        " affiché en haut de l'écran.",
      ]),
      el("div", { className: "btn-row" }, [
        el("button", {
          type: "button",
          className: "btn",
          textContent: "← Précédent",
          onClick: function () {
            goToStep("intro");
          },
        }),
        el("button", {
          type: "button",
          className: "btn btn-primary",
          textContent: "Commencer la série 1 sur 8 →",
          onClick: function () {
            state.currentSeriesIndex = 0;
            goToStep("maxdiff");
          },
        }),
      ]),
    ]);
    root.appendChild(cardB);
  }

  function renderMaxDiffStep(root) {
    const idx = state.currentSeriesIndex;
    const block = state.instance.blocks[idx];
    const resp = state.maxdiffResponses[idx];

    const headerCard = el("section", { className: "card" }, [
      el("div", { className: "btn-row", style: "margin-top:0; margin-bottom:0.5rem;" }, [
        el("h1", { textContent: "Série " + (idx + 1) + " sur 8", style: "margin:0;" }),
        el("span", { className: "badge", textContent: "4 cartes à comparer" }),
      ]),
      el("p", {
        style: "font-weight:600;",
        textContent:
          "Quand plusieurs enjeux collectifs doivent être pris en compte, lesquels devraient recevoir le plus d'attention, et lesquels pourraient attendre ?",
      }),
      el("p", {
        className: "small muted",
        textContent:
          "Rappel : « Pourrait attendre » exprime uniquement une priorité relative dans cette série ; cela ne signifie ni que l'enjeu est négligeable, ni que vous vous y opposez.",
      }),
    ]);

    if (state.validationBanner) {
      headerCard.appendChild(
        el("div", {
          className: "notice notice-warn",
          role: "alert",
          textContent: state.validationBanner,
        }),
      );
    }

    const grid = el("div", { className: "maxdiff-grid" });

    block.forEach(function (domId) {
      const domain = Data.DOMAIN_MAP[domId];
      const isBest = resp.status === "answered" && resp.bestDomainId === domId;
      const isWorst = resp.status === "answered" && resp.worstDomainId === domId;
      const detailKey = "S" + (idx + 1) + "::" + domId;
      const isDetailOpen = Boolean(state.expandedSeriesDetails[detailKey]);
      const flagEntry = resp.flagsByDomain[domId];
      const hasFlag = flagEntry && flagEntry.reasons && flagEntry.reasons.length > 0;

      const cardClasses = ["domain-card"];
      if (isBest) {
        cardClasses.push("is-best");
      } else if (isWorst) {
        cardClasses.push("is-worst");
      }

      const card = el("article", { className: cardClasses.join(" ") }, [
        el("div", null, [
          el("h2", { className: "domain-card-title", textContent: domain.title }),
          el("p", { className: "domain-card-desc", textContent: domain.shortDescription }),
        ]),
        el("div", null, [
          el("div", { className: "choice-pair" }, [
            el(
              "button",
              {
                type: "button",
                className: "choice-btn choice-best",
                "aria-pressed": isBest ? "true" : "false",
                onClick: function () {
                  state.validationBanner = "";
                  if (isBest) {
                    resp.bestDomainId = null;
                    if (!resp.worstDomainId) {
                      resp.status = "incomplete";
                    }
                  } else {
                    resp.status = "answered";
                    resp.noDistinguishableReason = "";
                    resp.noDistinguishableOther = "";
                    resp.bestDomainId = domId;
                    if (resp.worstDomainId === domId) {
                      resp.worstDomainId = null;
                    }
                  }
                  render();
                },
              },
              [
                el("span", { textContent: "Devrait recevoir le plus d'attention" }),
                el("span", { textContent: isBest ? "✓ Sélectionné" : "" }),
              ],
            ),
            el(
              "button",
              {
                type: "button",
                className: "choice-btn choice-worst",
                "aria-pressed": isWorst ? "true" : "false",
                onClick: function () {
                  state.validationBanner = "";
                  if (isWorst) {
                    resp.worstDomainId = null;
                    if (!resp.bestDomainId) {
                      resp.status = "incomplete";
                    }
                  } else {
                    resp.status = "answered";
                    resp.noDistinguishableReason = "";
                    resp.noDistinguishableOther = "";
                    resp.worstDomainId = domId;
                    if (resp.bestDomainId === domId) {
                      resp.bestDomainId = null;
                    }
                  }
                  render();
                },
              },
              [
                el("span", { textContent: "Pourrait attendre" }),
                el("span", { textContent: isWorst ? "✓ Sélectionné" : "" }),
              ],
            ),
          ]),
          el("div", { className: "card-tools" }, [
            el("button", {
              type: "button",
              className: "btn btn-subtle",
              "aria-expanded": isDetailOpen ? "true" : "false",
              textContent: isDetailOpen ? "Masquer le périmètre" : "Périmètre résumé",
              onClick: function () {
                state.expandedSeriesDetails[detailKey] = !isDetailOpen;
                if (!isDetailOpen) {
                  recordPerimeterOpen("S" + (idx + 1), domId);
                }
                render();
              },
            }),
            el("button", {
              type: "button",
              className: "btn btn-subtle",
              textContent: hasFlag
                ? "Problème signalé (" + flagEntry.reasons.length + ")"
                : "Signaler un problème",
              onClick: function () {
                openFlagModal("series", idx, domId);
              },
            }),
          ]),
          isDetailOpen
            ? el("div", { className: "inline-details" }, [
                el("p", null, [
                  el("strong", { textContent: "Ce que ce domaine couvre : " }),
                  domain.covers,
                ]),
                el("p", { className: "small", textContent: "Traité dans d'autres domaines :" }),
                el(
                  "ul",
                  { className: "small" },
                  domain.otherDomains.map(function (line) {
                    return el("li", { textContent: line });
                  }),
                ),
              ])
            : null,
        ]),
      ]);
      grid.appendChild(card);
    });

    // Options de non-réponse distinctes
    const nonRespBox = el("section", { className: "non-response-box" }, [
      el("p", {
        className: "small",
        style: "font-weight:600;",
        textContent: "Si vous ne pouvez pas comparer ces quatre cartes :",
      }),
      el("div", { className: "btn-group" }, [
        el("button", {
          type: "button",
          className: "btn btn-subtle",
          "aria-pressed": resp.status === "dont_know" ? "true" : "false",
          style:
            resp.status === "dont_know"
              ? "background: var(--primary); color: #fff; border-color: var(--primary);"
              : null,
          textContent: "Je ne sais pas choisir",
          onClick: function () {
            state.validationBanner = "";
            if (resp.status === "dont_know") {
              resp.status = "incomplete";
            } else {
              resp.status = "dont_know";
              resp.bestDomainId = null;
              resp.worstDomainId = null;
              resp.noDistinguishableReason = "";
              resp.noDistinguishableOther = "";
            }
            render();
          },
        }),
        el("button", {
          type: "button",
          className: "btn btn-subtle",
          "aria-pressed": resp.status === "no_distinguishable_best_worst" ? "true" : "false",
          style:
            resp.status === "no_distinguishable_best_worst"
              ? "background: var(--primary); color: #fff; border-color: var(--primary);"
              : null,
          textContent: "Impossible de départager cette série",
          onClick: function () {
            state.validationBanner = "";
            if (resp.status === "no_distinguishable_best_worst") {
              resp.status = "incomplete";
              resp.noDistinguishableReason = "";
              resp.noDistinguishableOther = "";
            } else {
              resp.status = "no_distinguishable_best_worst";
              resp.bestDomainId = null;
              resp.worstDomainId = null;
            }
            render();
          },
        }),
        el("button", {
          type: "button",
          className: "btn btn-subtle",
          "aria-pressed": resp.status === "skipped" ? "true" : "false",
          style:
            resp.status === "skipped"
              ? "background: var(--primary); color: #fff; border-color: var(--primary);"
              : null,
          textContent: "Passer cette série",
          onClick: function () {
            state.validationBanner = "";
            if (resp.status === "skipped") {
              resp.status = "incomplete";
            } else {
              resp.status = "skipped";
              resp.bestDomainId = null;
              resp.worstDomainId = null;
              resp.noDistinguishableReason = "";
              resp.noDistinguishableOther = "";
            }
            render();
          },
        }),
      ]),
    ]);

    if (resp.status === "no_distinguishable_best_worst") {
      const reasonList = el("div", { className: "radio-list" });
      Data.NO_DISTINGUISHABLE_REASONS.forEach(function (reason) {
        reasonList.appendChild(
          el("label", { className: "option-row" }, [
            el("input", {
              type: "radio",
              name: "ndbw-reason-" + idx,
              value: reason.id,
              checked: resp.noDistinguishableReason === reason.id,
              onChange: function () {
                resp.noDistinguishableReason = reason.id;
                render();
              },
            }),
            el("span", { textContent: reason.label }),
          ]),
        );
      });
      nonRespBox.appendChild(
        el("div", { style: "margin-top:0.75rem;" }, [
          el("p", { className: "small", textContent: "Motif facultatif :" }),
          reasonList,
          el("div", { className: "field", style: "margin-top:0.5rem;" }, [
            el("label", {
              for: "ndbw-other-" + idx,
              className: "small",
              textContent: "Précision libre (facultative) :",
            }),
            el("input", {
              id: "ndbw-other-" + idx,
              type: "text",
              className: "input",
              value: resp.noDistinguishableOther,
              onInput: function (e) {
                resp.noDistinguishableOther = e.target.value;
              },
            }),
          ]),
        ]),
      );
    }

    const navCard = el("section", { className: "card" }, [
      el("div", { className: "btn-row", style: "margin-top:0;" }, [
        el("button", {
          type: "button",
          className: "btn",
          textContent: idx === 0 ? "← Revenir à la présentation" : "← Série précédente",
          onClick: function () {
            commitSeriesElapsedTime();
            state.validationBanner = "";
            if (idx === 0) {
              goToStep("pre_exercise");
            } else {
              state.metrics.backtrackCount += 1;
              state.currentSeriesIndex = idx - 1;
              state.seriesEnteredAtMs = Date.now();
              render();
              focusMainHeading();
            }
          },
        }),
        el("button", {
          type: "button",
          className: "btn btn-primary",
          textContent: idx === 7 ? "Terminer les 8 séries et poursuivre →" : "Série suivante →",
          onClick: function () {
            const isCompleteAnswered =
              resp.status === "answered" &&
              resp.bestDomainId &&
              resp.worstDomainId &&
              resp.bestDomainId !== resp.worstDomainId;
            const isNonResponse =
              resp.status === "skipped" ||
              resp.status === "dont_know" ||
              resp.status === "no_distinguishable_best_worst";

            if (!isCompleteAnswered && !isNonResponse) {
              state.validationBanner =
                "Pour continuer, sélectionnez une carte « Devrait recevoir le plus d'attention » et une carte « Pourrait attendre », ou choisissez l'une des options « Je ne sais pas choisir / Impossible de départager / Passer cette série ».";
              render();
              return;
            }
            commitSeriesElapsedTime();
            state.validationBanner = "";
            if (idx < 7) {
              state.currentSeriesIndex = idx + 1;
              state.seriesEnteredAtMs = Date.now();
              render();
              focusMainHeading();
            } else {
              goToStep("debrief_d1");
            }
          },
        }),
      ]),
    ]);

    root.appendChild(headerCard);
    root.appendChild(grid);
    root.appendChild(nonRespBox);
    root.appendChild(navCard);
  }

  function renderDebriefD1Step(root) {
    const card = el("section", { className: "card" }, [
      el("h1", { textContent: "Retour d'expérience — Vos raisons sur les cartes choisies" }),
      el("p", {
        textContent:
          "Merci d'avoir parcouru les 8 séries. Pour nous aider à vérifier ce que chacun met derrière ces cartes, précisez simplement ce à quoi vous pensiez pour les cartes ci-dessous (vous pouvez laisser un champ vide si besoin).",
      }),
    ]);

    if (state.debrief.choiceReasons.length === 0) {
      card.appendChild(
        el("p", {
          className: "muted",
          textContent:
            "Aucune carte n'a été sélectionnée en « Plus d'attention » ou « Pourrait attendre » pendant les séries. Vous pouvez passer directement à l'étape suivante.",
        }),
      );
    }

    root.appendChild(card);

    state.debrief.choiceReasons.forEach(function (item, i) {
      const domain = Data.DOMAIN_MAP[item.domainId];
      const roleText =
        item.role === "worst" ? "Pourrait attendre" : "Devrait recevoir le plus d'attention";
      const itemCard = el("section", { className: "card" }, [
        el("span", {
          className: "badge",
          textContent: "Série " + item.seriesIndex + " · Choix « " + roleText + " »",
        }),
        el("h2", { style: "margin-top:0.5rem;", textContent: domain.title }),
        el("p", { className: "small muted", textContent: domain.shortDescription }),
        el("div", { className: "field" }, [
          el("label", {
            for: "d1-main-" + i,
            textContent:
              "Lorsque vous avez choisi cette carte, à quel sujet pensiez-vous principalement ?",
          }),
          el("textarea", {
            id: "d1-main-" + i,
            className: "textarea",
            value: item.mainSubject,
            onInput: function (e) {
              item.mainSubject = e.target.value;
            },
          }),
        ]),
        el("div", { className: "grid-2" }, [
          el("div", { className: "field" }, [
            el("label", {
              for: "d1-other-" + i,
              textContent:
                "Y avait-il d'autres éléments dans cette carte qui comptaient aussi, ou seulement celui-là ?",
            }),
            el("input", {
              id: "d1-other-" + i,
              type: "text",
              className: "input",
              value: item.otherElements,
              onInput: function (e) {
                item.otherElements = e.target.value;
              },
            }),
          ]),
          el("div", { className: "field" }, [
            el("label", {
              for: "d1-less-" + i,
              textContent:
                "Y avait-il dans cette même carte un élément moins prioritaire, voire auquel vous n'adhérez pas ?",
            }),
            el("input", {
              id: "d1-less-" + i,
              type: "text",
              className: "input",
              value: item.lessPriorityOrRejected,
              onInput: function (e) {
                item.lessPriorityOrRejected = e.target.value;
              },
            }),
          ]),
        ]),
      ]);
      root.appendChild(itemCard);
    });

    root.appendChild(
      el("div", { className: "card btn-row" }, [
        el("button", {
          type: "button",
          className: "btn",
          textContent: "← Revenir aux séries",
          disabled: state.lexicalUnlocked,
          onClick: function () {
            state.currentSeriesIndex = 7;
            goToStep("maxdiff");
          },
        }),
        el("button", {
          type: "button",
          className: "btn btn-primary",
          textContent: "Continuer vers le sens des cartes →",
          onClick: function () {
            goToStep("debrief_d2");
          },
        }),
      ]),
    );
  }

  function renderDebriefD2Step(root) {
    const revIdx = state.currentDebriefD2Index;
    const rev = state.debrief.domainReviews[revIdx];
    const domain = Data.DOMAIN_MAP[rev.domainId];

    const headerCard = el("section", { className: "card" }, [
      el("div", { className: "btn-row", style: "margin-top:0; margin-bottom:0.5rem;" }, [
        el("h1", {
          textContent: "Compréhension des cartes (" + (revIdx + 1) + " sur 8)",
          style: "margin:0;",
        }),
        el("span", {
          className: "badge",
          textContent: domain.priorityInDebrief ? "Domaine approfondi" : "Contrôle systématique",
        }),
      ]),
      el("p", {
        className: "small muted",
        textContent:
          "Dites-nous spontanément ce que vous comprenez de cette carte. Vous pouvez passer ou n'indiquer que ce qui vous frappe.",
      }),
    ]);

    const card = el("section", { className: "card" }, [
      el("h2", { textContent: domain.title }),
      el("p", { textContent: domain.shortDescription }),
      el("div", { className: "field" }, [
        el("label", {
          for: "d2-reform",
          textContent:
            "Avec vos propres mots, de quoi parle cette carte ? Qu'est-ce que cela recouvre pour vous ?",
        }),
        el("textarea", {
          id: "d2-reform",
          className: "textarea",
          value: rev.spontaneousReformulation,
          onInput: function (e) {
            rev.spontaneousReformulation = e.target.value;
          },
        }),
      ]),
      el("div", { className: "field" }, [
        el("label", {
          for: "d2-scope",
          textContent:
            "Quels sujets pensez-vous inclus dans cette carte ? Y a-t-il des sujets proches que vous pensiez ailleurs ?",
        }),
        el("textarea", {
          id: "d2-scope",
          className: "textarea",
          value: rev.perceivedScope,
          onInput: function (e) {
            rev.perceivedScope = e.target.value;
          },
        }),
      ]),
      el("div", { className: "field" }, [
        el("label", {
          for: "d2-lex",
          textContent:
            "Y a-t-il des mots ou expressions flous, compliqués, administratifs ou orientés ? (laisser vide ou écrire « Aucune »)",
        }),
        el("input", {
          id: "d2-lex",
          type: "text",
          className: "input",
          value: rev.lexicalDifficulty,
          onInput: function (e) {
            rev.lexicalDifficulty = e.target.value;
          },
        }),
      ]),
      el("div", { className: "field" }, [
        el("label", {
          for: "d2-probe",
          textContent: "Questions complémentaires sur cette carte :",
        }),
        el(
          "ul",
          { className: "small muted" },
          domain.probes.map(function (p) {
            return el("li", { textContent: p });
          }),
        ),
        el("textarea", {
          id: "d2-probe",
          className: "textarea",
          value: rev.probeAnswer,
          onInput: function (e) {
            rev.probeAnswer = e.target.value;
          },
        }),
      ]),
      el("div", { className: "btn-row" }, [
        el("button", {
          type: "button",
          className: "btn",
          textContent: revIdx === 0 ? "← Étape précédente" : "← Carte précédente",
          onClick: function () {
            if (revIdx === 0) {
              goToStep("debrief_d1");
            } else {
              state.currentDebriefD2Index -= 1;
              render();
              focusMainHeading();
            }
          },
        }),
        el("div", { className: "btn-group" }, [
          el("button", {
            type: "button",
            className: "btn",
            textContent: "Passer directement à la vue d'ensemble →",
            onClick: function () {
              goToStep("debrief_d3");
            },
          }),
          el("button", {
            type: "button",
            className: "btn btn-primary",
            textContent: revIdx === 7 ? "Continuer vers la vue d'ensemble →" : "Carte suivante →",
            onClick: function () {
              if (revIdx < 7) {
                state.currentDebriefD2Index += 1;
                render();
                focusMainHeading();
              } else {
                goToStep("debrief_d3");
              }
            },
          }),
        ]),
      ]),
    ]);

    root.appendChild(headerCard);
    root.appendChild(card);
  }

  function renderDebriefD3Step(root) {
    const tr = state.debrief.transversal;
    const lv2 = state.debrief.level2Test;

    const card1 = el("section", { className: "card" }, [
      el("h1", { textContent: "Questions transversales et mode de présentation" }),
      el("div", { className: "field" }, [
        el("label", {
          for: "d3-couldwait",
          textContent:
            "Quand vous avez choisi « Pourrait attendre », qu'est-ce que cela signifiait exactement pour vous ?",
        }),
        el(
          "select",
          {
            id: "d3-couldwait",
            className: "select",
            onChange: function (e) {
              tr.couldWaitUnderstanding = e.target.value;
            },
          },
          [
            "",
            "Correct (priorité relative : d'autres passaient avant)",
            "Ambigu (hésitation entre moins prioritaire et pas important)",
            "Erroné (« sans importance » ou « je suis contre »)",
          ].map(function (opt) {
            return el("option", {
              value: opt,
              selected: tr.couldWaitUnderstanding === opt,
              textContent: opt || "— Choisir une réponse —",
            });
          }),
        ),
      ]),
      el("div", { className: "field" }, [
        el("label", {
          for: "d3-basis",
          textContent:
            "Quand vous avez mis une carte en « Devrait recevoir le plus d'attention », qu'est-ce qui a surtout guidé vos choix ?",
        }),
        el(
          "select",
          {
            id: "d3-basis",
            className: "select",
            onChange: function (e) {
              tr.choiceBasis = e.target.value;
            },
          },
          [
            "",
            "Urgence collective pour le pays",
            "Vécu ou préoccupation personnelle",
            "Volonté de réforme précise",
            "Mixte",
          ].map(function (opt) {
            return el("option", {
              value: opt,
              selected: tr.choiceBasis === opt,
              textContent: opt || "— Choisir une réponse —",
            });
          }),
        ),
      ]),
      el("div", { className: "grid-2" }, [
        el("div", { className: "field" }, [
          el("label", {
            for: "d3-conf",
            textContent:
              "Avez-vous cherché un sujet sans savoir où il était, ou trouvé que des cartes se chevauchaient ?",
          }),
          el("textarea", {
            id: "d3-conf",
            className: "textarea",
            value: tr.confusionsOrOverlaps,
            onInput: function (e) {
              tr.confusionsOrOverlaps = e.target.value;
            },
          }),
        ]),
        el("div", { className: "field" }, [
          el("label", {
            for: "d3-broad",
            textContent:
              "Certaines cartes vous ont-elles semblé réunir trop de choses différentes (comparaison difficile ou injuste) ?",
          }),
          el("textarea", {
            id: "d3-broad",
            className: "textarea",
            value: tr.tooBroadDomains,
            onInput: function (e) {
              tr.tooBroadDomains = e.target.value;
            },
          }),
        ]),
      ]),
      el("div", { className: "grid-2" }, [
        el("div", { className: "field" }, [
          el("label", {
            for: "d3-hardest",
            textContent: "À quelle série (1 à 8) la comparaison a-t-elle été la plus compliquée ?",
          }),
          el("input", {
            id: "d3-hardest",
            type: "text",
            className: "input",
            value: tr.hardestSeries,
            onInput: function (e) {
              tr.hardestSeries = e.target.value;
            },
          }),
        ]),
        state.setup.variant === "A"
          ? el("div", { className: "field" }, [
              el("label", {
                for: "d3-pano",
                textContent:
                  "Au panorama du début (les 8 domaines d'un coup), comment l'avez-vous lu ?",
              }),
              el(
                "select",
                {
                  id: "d3-pano",
                  className: "select",
                  onChange: function (e) {
                    tr.panoramaReadingMode = e.target.value;
                  },
                },
                ["", "Tout lu", "Titres surtout", "Décrochage visible"].map(function (opt) {
                  return el("option", {
                    value: opt,
                    selected: tr.panoramaReadingMode === opt,
                    textContent: opt || "— Choisir —",
                  });
                }),
              ),
            ])
          : el("div", { className: "field" }, [
              el("label", {
                for: "d3-ov-b",
                textContent:
                  "En découvrant les cartes 4 par 4, à partir de quelle série avez-vous eu une vue d'ensemble claire ?",
              }),
              el(
                "select",
                {
                  id: "d3-ov-b",
                  className: "select",
                  onChange: function (e) {
                    tr.overviewReachedAtSeries = e.target.value;
                  },
                },
                ["", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "Pas vraiment à la fin"].map(
                  function (opt) {
                    return el("option", {
                      value: opt,
                      selected: tr.overviewReachedAtSeries === opt,
                      textContent: opt || "— Choisir —",
                    });
                  },
                ),
              ),
            ]),
      ]),
      el("div", { className: "field" }, [
        el("label", {
          for: "d3-var-comment",
          textContent:
            state.setup.variant === "A"
              ? "Voir les 8 domaines avant de commencer vous a-t-il aidé ou paru long / orientant ?"
              : "Découvrir les cartes au fil des séries et accéder au bouton « Voir le périmètre complet » vous a-t-il convenu ?",
        }),
        el("textarea", {
          id: "d3-var-comment",
          className: "textarea",
          value: tr.variantExperienceComment,
          onInput: function (e) {
            tr.variantExperienceComment = e.target.value;
          },
        }),
      ]),
    ]);

    // Test court Niveau 2 (Strate 2.1)
    const lv2Card = el("section", { className: "card" }, [
      el("h2", { textContent: "Test court d'un second écran de précision (facultatif)" }),
      el("p", {
        className: "small muted",
        textContent:
          "Choisissez un domaine large ci-dessous pour voir à quoi ressemblerait un écran permettant de préciser quels sous-sujets précis vous aviez en tête. Ces choix ne modifient pas vos séries précédentes.",
      }),
      el("div", { className: "field" }, [
        el("label", { for: "lv2-dom", textContent: "Domaine à tester :" }),
        el(
          "select",
          {
            id: "lv2-dom",
            className: "select",
            onChange: function (e) {
              lv2.domainId = e.target.value;
              lv2.selectedSubIssues = [];
              render();
            },
          },
          [el("option", { value: "", textContent: "— Aucun / passer ce test —" })].concat(
            Object.keys(Data.STRATE_2_1_PROPOSALS).map(function (domId) {
              const prop = Data.STRATE_2_1_PROPOSALS[domId];
              return el("option", {
                value: domId,
                selected: lv2.domainId === domId,
                textContent: prop.title,
              });
            }),
          ),
        ),
      ]),
    ]);

    if (lv2.domainId && Data.STRATE_2_1_PROPOSALS[lv2.domainId]) {
      const prop = Data.STRATE_2_1_PROPOSALS[lv2.domainId];
      const checks = el("div", { className: "check-list" });
      prop.subIssues.forEach(function (sub) {
        const checked = lv2.selectedSubIssues.includes(sub);
        checks.appendChild(
          el("label", { className: "option-row" }, [
            el("input", {
              type: "checkbox",
              checked: checked,
              onChange: function () {
                if (checked) {
                  lv2.selectedSubIssues = lv2.selectedSubIssues.filter(function (s) {
                    return s !== sub;
                  });
                } else {
                  lv2.selectedSubIssues.push(sub);
                }
              },
            }),
            el("span", { textContent: sub }),
          ]),
        );
      });
      lv2Card.appendChild(checks);
      lv2Card.appendChild(
        el("div", { className: "field", style: "margin-top:0.75rem;" }, [
          el("label", { for: "lv2-other", textContent: "Autre sujet précis (facultatif) :" }),
          el("input", {
            id: "lv2-other",
            type: "text",
            className: "input",
            value: lv2.otherSubIssue,
            onInput: function (e) {
              lv2.otherSubIssue = e.target.value;
            },
          }),
        ]),
      );
      lv2Card.appendChild(
        el("div", { className: "field" }, [
          el("label", {
            for: "lv2-useful",
            textContent:
              "Si l'outil vous proposait cet écran juste après les séries, cela répondrait-il à un besoin ou à une frustration ressentie pendant le classement ?",
          }),
          el(
            "select",
            {
              id: "lv2-useful",
              className: "select",
              onChange: function (e) {
                lv2.usefulness = e.target.value;
              },
            },
            ["", "Répond au besoin de précision", "Neutre / redondant", "Trop détaillé"].map(
              function (opt) {
                return el("option", {
                  value: opt,
                  selected: lv2.usefulness === opt,
                  textContent: opt || "— Choisir —",
                });
              },
            ),
          ),
        ]),
      );
    }

    const lockNotice = el("div", { className: "notice notice-warn" }, [
      el("strong", { textContent: "Étape suivante — Comparaison de formulations alternatives : " }),
      "pour ne pas influencer vos réponses spontanées ci-dessus, le passage à l'étape suivante fige votre retour spontané avant d'afficher des formulations alternatives.",
    ]);

    const navCard = el("section", { className: "card btn-row" }, [
      el("button", {
        type: "button",
        className: "btn",
        textContent: "← Revenir au sens des cartes",
        onClick: function () {
          goToStep("debrief_d2");
        },
      }),
      el("button", {
        type: "button",
        className: "btn btn-primary",
        textContent: "Valider le retour spontané et comparer des formulations →",
        onClick: function () {
          state.lexicalUnlocked = true;
          state.currentLexicalIndex = 0;
          goToStep("debrief_e");
        },
      }),
    ]);

    root.appendChild(card1);
    root.appendChild(lv2Card);
    root.appendChild(lockNotice);
    root.appendChild(navCard);
  }

  function renderDebriefEStep(root) {
    const lIdx = state.currentLexicalIndex;
    const pair = Data.LEXICAL_PAIRS[lIdx];
    const sideSpec = state.instance.lexicalSideOrder[lIdx];
    const ans = state.debrief.lexicalPairs[lIdx];

    const f1 = sideSpec.formulation1Source === "variant" ? pair.variant : pair.reference;
    const f2 = sideSpec.formulation2Source === "variant" ? pair.variant : pair.reference;

    const headerCard = el("section", { className: "card" }, [
      el("h1", {
        textContent: "Comparaison de formulations alternatives (paire " + (lIdx + 1) + " sur 4)",
      }),
      el("p", {
        className: "muted",
        textContent:
          "Comparez attentivement ces deux formulations d'un même domaine, puis répondez aux cinq questions ci-dessous.",
      }),
    ]);

    const pairGrid = el("div", { className: "grid-2" }, [
      el("article", { className: "card" }, [
        el("span", { className: "badge", textContent: "Formulation 1" }),
        el("h2", { style: "margin-top:0.5rem;", textContent: f1.title }),
        el("p", { textContent: f1.shortDescription }),
      ]),
      el("article", { className: "card" }, [
        el("span", { className: "badge", textContent: "Formulation 2" }),
        el("h2", { style: "margin-top:0.5rem;", textContent: f2.title }),
        el("p", { textContent: f2.shortDescription }),
      ]),
    ]);

    const qCard = el("section", { className: "card" }, [
      el("div", { className: "field" }, [
        el("label", {
          for: "lex-mod",
          textContent:
            "1. Est-ce que cette formulation alternative modifie ce que vous aviez compris du domaine ou votre interprétation ?",
        }),
        el(
          "select",
          {
            id: "lex-mod",
            className: "select",
            onChange: function (e) {
              ans.modifiesUnderstanding = e.target.value;
            },
          },
          ["", "Oui", "Non", "Incertain"].map(function (opt) {
            return el("option", {
              value: opt,
              selected: ans.modifiesUnderstanding === opt,
              textContent: opt || "— Choisir —",
            });
          }),
        ),
      ]),
      el("div", { className: "field" }, [
        el("label", { for: "lex-mod-det", textContent: "Si oui ou incertain, comment ?" }),
        el("input", {
          id: "lex-mod-det",
          type: "text",
          className: "input",
          value: ans.modificationDetails,
          onInput: function (e) {
            ans.modificationDetails = e.target.value;
          },
        }),
      ]),
      el("div", { className: "grid-2" }, [
        el("div", { className: "field" }, [
          el("label", {
            for: "lex-clear",
            textContent: "2. Laquelle paraît la plus claire au premier regard ?",
          }),
          el(
            "select",
            {
              id: "lex-clear",
              className: "select",
              onChange: function (e) {
                ans.clearerChoice = e.target.value;
              },
            },
            ["", "Formulation 1", "Formulation 2", "Egal", "Incertain"].map(function (opt) {
              return el("option", {
                value: opt,
                selected: ans.clearerChoice === opt,
                textContent: opt || "— Choisir —",
              });
            }),
          ),
        ]),
        el("div", { className: "field" }, [
          el("label", { for: "lex-clear-why", textContent: "Pourquoi ?" }),
          el("input", {
            id: "lex-clear-why",
            type: "text",
            className: "input",
            value: ans.clearerReason,
            onInput: function (e) {
              ans.clearerReason = e.target.value;
            },
          }),
        ]),
      ]),
      el("div", { className: "field" }, [
        el("label", {
          for: "lex-diff",
          textContent:
            "3. Quelle différence de sens percevez-vous entre les deux ? Parlent-elles exactement de la même chose ou pas ?",
        }),
        el("input", {
          id: "lex-diff",
          type: "text",
          className: "input",
          value: ans.meaningDifference,
          onInput: function (e) {
            ans.meaningDifference = e.target.value;
          },
        }),
      ]),
      el("div", { className: "grid-2" }, [
        el("div", { className: "field" }, [
          el("label", {
            for: "lex-cov",
            textContent:
              "4. Laquelle semble couvrir le mieux l'ensemble du domaine sans mettre trop l'accent sur un seul sujet ?",
          }),
          el(
            "select",
            {
              id: "lex-cov",
              className: "select",
              onChange: function (e) {
                ans.betterCoverageChoice = e.target.value;
              },
            },
            ["", "Formulation 1", "Formulation 2", "Egal", "Incertain"].map(function (opt) {
              return el("option", {
                value: opt,
                selected: ans.betterCoverageChoice === opt,
                textContent: opt || "— Choisir —",
              });
            }),
          ),
        ]),
        el("div", { className: "field" }, [
          el("label", { for: "lex-cov-why", textContent: "Pourquoi ?" }),
          el("input", {
            id: "lex-cov-why",
            type: "text",
            className: "input",
            value: ans.coverageReason,
            onInput: function (e) {
              ans.coverageReason = e.target.value;
            },
          }),
        ]),
      ]),
      el("div", { className: "grid-2" }, [
        el("div", { className: "field" }, [
          el("label", {
            for: "lex-ori",
            textContent:
              "5. L'une des deux formulations paraît-elle orienter davantage la réponse ou suggérer une opinion politique ?",
          }),
          el(
            "select",
            {
              id: "lex-ori",
              className: "select",
              onChange: function (e) {
                ans.orientedChoice = e.target.value;
              },
            },
            ["", "Aucune", "Formulation 1", "Formulation 2", "Incertain"].map(function (opt) {
              return el("option", {
                value: opt,
                selected: ans.orientedChoice === opt,
                textContent: opt || "— Choisir —",
              });
            }),
          ),
        ]),
        el("div", { className: "field" }, [
          el("label", { for: "lex-ori-why", textContent: "Pourquoi ?" }),
          el("input", {
            id: "lex-ori-why",
            type: "text",
            className: "input",
            value: ans.orientedReason,
            onInput: function (e) {
              ans.orientedReason = e.target.value;
            },
          }),
        ]),
      ]),
      el("div", { className: "btn-row" }, [
        el("button", {
          type: "button",
          className: "btn",
          textContent:
            lIdx === 0 ? "← Retour verrouillé (voir vue d'ensemble)" : "← Paire précédente",
          disabled: lIdx === 0,
          onClick: function () {
            if (lIdx > 0) {
              state.currentLexicalIndex -= 1;
              render();
              focusMainHeading();
            }
          },
        }),
        el("button", {
          type: "button",
          className: "btn btn-primary",
          textContent: lIdx === 3 ? "Terminer les paires et conclure →" : "Paire suivante →",
          onClick: function () {
            if (lIdx < 3) {
              state.currentLexicalIndex += 1;
              render();
              focusMainHeading();
            } else {
              goToStep("debrief_f");
            }
          },
        }),
      ]),
    ]);

    root.appendChild(headerCard);
    root.appendChild(pairGrid);
    root.appendChild(qCard);
  }

  function renderDebriefFStep(root) {
    const cl = state.debrief.closure;
    const dm = state.demographics;

    const card = el("section", { className: "card" }, [
      el("h1", { textContent: "Clôture — Sujets manquants et contexte anonymisé" }),
      el("div", { className: "field" }, [
        el("label", {
          for: "cl-missing",
          textContent:
            "Y a-t-il un sujet important concernant les choix collectifs pour la France que vous auriez voulu voir apparaître et qui ne figure pas dans ces huit domaines ?",
        }),
        el("textarea", {
          id: "cl-missing",
          className: "textarea",
          value: cl.missingTopic,
          placeholder: "Réponse libre (ou « Aucun, tout y est »)",
          onInput: function (e) {
            cl.missingTopic = e.target.value;
          },
        }),
      ]),
      el("div", { className: "field" }, [
        el("label", {
          for: "cl-ergo",
          textContent:
            "Remarques sur la lisibilité, le fonctionnement de l'interface ou la durée de l'exercice (facultatif) :",
        }),
        el("textarea", {
          id: "cl-ergo",
          className: "textarea",
          value: cl.ergonomicFeedback,
          onInput: function (e) {
            cl.ergonomicFeedback = e.target.value;
          },
        }),
      ]),
    ]);

    const demoCard = el("section", { className: "card" }, [
      el("h2", { textContent: "Contexte anonymisé par grandes tranches (entièrement facultatif)" }),
      el("p", {
        className: "small muted",
        textContent:
          "Ces grandes tranches servent uniquement à vérifier la diversité des profils dans le prétest L13 (aucun nom, aucun email, aucune affiliation politique).",
      }),
      el("div", { className: "grid-2" }, [
        makeSelectField(
          "demo-age",
          "Tranche d'âge",
          Data.DEMOGRAPHIC_FIELDS.ageBracket,
          dm.ageBracket,
          function (v) {
            dm.ageBracket = v;
          },
        ),
        makeSelectField(
          "demo-terr",
          "Type de territoire",
          Data.DEMOGRAPHIC_FIELDS.territoryType,
          dm.territoryType,
          function (v) {
            dm.territoryType = v;
          },
        ),
        makeSelectField(
          "demo-edu",
          "Niveau de diplôme",
          Data.DEMOGRAPHIC_FIELDS.educationLevel,
          dm.educationLevel,
          function (v) {
            dm.educationLevel = v;
          },
        ),
        makeSelectField(
          "demo-ease",
          "Aisance avec le vocabulaire institutionnel",
          Data.DEMOGRAPHIC_FIELDS.institutionalEase,
          dm.institutionalEase,
          function (v) {
            dm.institutionalEase = v;
          },
        ),
        makeSelectField(
          "demo-pol",
          "Rapport déclaré à l'actualité politique",
          Data.DEMOGRAPHIC_FIELDS.politicalInterest,
          dm.politicalInterest,
          function (v) {
            dm.politicalInterest = v;
          },
        ),
      ]),
      el("div", { className: "btn-row" }, [
        el("button", {
          type: "button",
          className: "btn",
          textContent: "← Revenir aux comparaisons",
          onClick: function () {
            state.currentLexicalIndex = 3;
            goToStep("debrief_e");
          },
        }),
        el("button", {
          type: "button",
          className: "btn btn-primary",
          textContent: "Accéder au récapitulatif et à l'export JSON →",
          onClick: function () {
            goToStep("summary_export");
          },
        }),
      ]),
    ]);

    root.appendChild(card);
    root.appendChild(demoCard);
  }

  function makeSelectField(id, label, options, currentVal, onChange) {
    return el("div", { className: "field" }, [
      el("label", { for: id, textContent: label }),
      el(
        "select",
        {
          id: id,
          className: "select",
          onChange: function (e) {
            onChange(e.target.value);
          },
        },
        options.map(function (opt) {
          return el("option", {
            value: opt,
            selected: currentVal === opt,
            textContent: opt,
          });
        }),
      ),
    ]);
  }

  function renderSummaryExportStep(root) {
    const payload = buildSessionPayload();
    const validation = ExportL17.validateParticipantSession(payload);
    const jsonString = JSON.stringify(payload, null, 2);
    const counts = payload.descriptiveCounts;

    const warnBox = el("div", { className: "notice notice-warn" }, [
      el("strong", { textContent: "Sensibilité du fichier exporté : " }),
      "ce fichier reflète vos priorités et commentaires personnels. Aucune donnée n'a été envoyée à un serveur : conservez et transmettez ce fichier uniquement selon les modalités convenues pour l'étude.",
    ]);

    const summaryCard = el("section", { className: "card" }, [
      el("h1", { textContent: "Récapitulatif de passation et export JSON" }),
      el("p", {
        className: "muted",
        textContent:
          "Comptage strictement descriptif des séries parcourues (sans classement ni score global).",
      }),
      el("div", { className: "grid-3" }, [
        el("div", { className: "card card-muted" }, [
          el("strong", { textContent: "Code séance : " }),
          payload.participantCode,
          el("br"),
          el("strong", { textContent: "Variante : " }),
          payload.variant,
        ]),
        el("div", { className: "card card-muted" }, [
          el("strong", { textContent: "Séries complètes : " }),
          String(counts.statusCounts.answered) + " / 8",
          el("br"),
          el("strong", { textContent: "Passées / NSP / Indécis : " }),
          String(
            counts.statusCounts.skipped +
              counts.statusCounts.dont_know +
              counts.statusCounts.no_distinguishable_best_worst,
          ),
        ]),
        el("div", { className: "card card-muted" }, [
          el("strong", { textContent: "Durée mesurée : " }),
          String(Math.round((payload.metrics.totalDurationSec / 60) * 10) / 10) + " min",
          el("br"),
          el("strong", { textContent: "Ouvertures périmètre : " }),
          String(payload.metrics.perimeterOpens.length),
        ]),
      ]),
    ]);

    // Tableau descriptif factuel (aucun B-W ni classement)
    const tableWrap = el("div", { className: "table-wrap", style: "margin-top:0.75rem;" });
    const tbl = el("table", null, [
      el("thead", null, [
        el("tr", null, [
          el("th", { textContent: "Domaine" }),
          el("th", { textContent: "Présentations" }),
          el("th", { textContent: "Expositions répondues" }),
          el("th", { textContent: "Choisi « Plus d'attention »" }),
          el("th", { textContent: "Choisi « Pourrait attendre »" }),
          el("th", { textContent: "Non choisi comme extrême" }),
        ]),
      ]),
      el(
        "tbody",
        null,
        Data.DOMAINS.map(function (d) {
          const row = counts.byDomain[d.id];
          return el("tr", null, [
            el("td", { textContent: d.title }),
            el("td", { textContent: String(row.totalPresentedCount) }),
            el("td", { textContent: String(row.answeredExposures) }),
            el("td", { textContent: String(row.bestCount) }),
            el("td", { textContent: String(row.worstCount) }),
            el("td", { textContent: String(row.neitherBestNorWorstCount) }),
          ]);
        }),
      ),
    ]);
    tableWrap.appendChild(tbl);
    summaryCard.appendChild(tableWrap);

    const exportCard = el("section", { className: "card" }, [
      el("h2", { textContent: "Télécharger votre fichier de séance" }),
      validation.ok
        ? el("p", {
            className: "small muted",
            textContent:
              "Le schéma JSON est validé (aucune clé de profilage interdite). Cliquez ci-dessous pour télécharger le fichier à remettre à l'équipe.",
          })
        : el("div", {
            className: "notice notice-danger",
            textContent: "Erreur de validation : " + validation.error,
          }),
      state.exportMessage
        ? el("div", {
            className: "notice notice-ok",
            role: "status",
            textContent: state.exportMessage,
          })
        : null,
      el("div", { className: "btn-group", style: "margin-bottom:1rem;" }, [
        el("button", {
          type: "button",
          className: "btn btn-primary",
          disabled: !validation.ok,
          textContent: "Télécharger mon fichier de séance (.json)",
          onClick: function () {
            const safeCode = payload.participantCode.replace(/[^A-Za-z0-9_-]/g, "_");
            const filename =
              "civic-explorer-passation-" + safeCode + "-" + payload.variant + ".json";
            const blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = el("a", { href: url, download: filename });
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            state.exportDownloaded = true;
            state.exportMessage =
              "Fichier téléchargé : " +
              filename +
              ". Vous pouvez maintenant fermer l'onglet ou effacer la session.";
            render();
          },
        }),
        el("button", {
          type: "button",
          className: "btn",
          disabled: !validation.ok,
          textContent: "Copier le JSON",
          onClick: function () {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(jsonString).then(function () {
                state.exportMessage = "JSON copié dans le presse-papiers.";
                render();
              });
            }
          },
        }),
        el("button", {
          type: "button",
          className: "btn",
          textContent: "Modifier mes réponses de clôture",
          onClick: function () {
            goToStep("debrief_f");
          },
        }),
      ]),
      el("details", null, [
        el("summary", {
          style: "cursor:pointer; font-weight:600;",
          textContent: "Aperçu du contenu JSON qui sera exporté",
        }),
        el("pre", { className: "json-preview", textContent: jsonString }),
      ]),
    ]);

    root.appendChild(warnBox);
    root.appendChild(summaryCard);
    root.appendChild(exportCard);
  }

  function renderModal() {
    const backdrop = document.getElementById("modal-backdrop");
    const modalContent = document.getElementById("modal-content");
    if (!backdrop || !modalContent) {
      return;
    }
    if (!state.modalState) {
      backdrop.hidden = true;
      modalContent.textContent = "";
      return;
    }

    backdrop.hidden = false;
    modalContent.textContent = "";

    if (state.modalState.type === "perimeter") {
      modalContent.appendChild(
        el("div", { className: "modal-header" }, [
          el("div", null, [
            el("h2", {
              id: "modal-title",
              textContent: "Périmètre complet des 8 domaines",
            }),
            el("p", {
              className: "small muted",
              textContent:
                "Vous pouvez consulter librement ce livret à tout moment ; votre série en cours reste inchangée.",
            }),
          ]),
          el("button", {
            type: "button",
            className: "btn btn-subtle",
            textContent: "Fermer",
            onClick: closeModal,
          }),
        ]),
      );

      state.instance.rhoOrder.forEach(function (domId) {
        const d = Data.DOMAIN_MAP[domId];
        modalContent.appendChild(
          el("article", { className: "card" }, [
            el("h3", { textContent: d.title }),
            el("p", { className: "small", textContent: d.shortDescription }),
            el("p", { className: "small" }, [
              el("strong", { textContent: "Ce que ce domaine couvre : " }),
              d.covers,
            ]),
            el("p", { className: "small", textContent: "Traité dans d'autres domaines :" }),
            el(
              "ul",
              { className: "small" },
              d.otherDomains.map(function (line) {
                return el("li", { textContent: line });
              }),
            ),
          ]),
        );
      });
    } else if (state.modalState.type === "flag") {
      const m = state.modalState;
      const domain = Data.DOMAIN_MAP[m.domainId];
      let targetStore;
      if (m.contextType === "panorama") {
        targetStore = state.metrics.panoramaFlagsByDomain;
      } else {
        targetStore = state.maxdiffResponses[m.seriesIndex].flagsByDomain;
      }
      if (!targetStore[m.domainId]) {
        targetStore[m.domainId] = { reasons: [], note: "" };
      }
      const entry = targetStore[m.domainId];

      modalContent.appendChild(
        el("div", { className: "modal-header" }, [
          el("div", null, [
            el("h2", {
              id: "modal-title",
              textContent: "Signaler un problème sur cette carte",
            }),
            el("p", {
              className: "small muted",
              textContent: domain.title + " — Facultatif, la série reste inchangée.",
            }),
          ]),
          el("button", {
            type: "button",
            className: "btn btn-subtle",
            textContent: "Fermer",
            onClick: closeModal,
          }),
        ]),
      );

      const list = el("div", { className: "check-list" });
      Data.COMPREHENSION_FLAGS.forEach(function (flag) {
        const checked = entry.reasons.includes(flag.id);
        list.appendChild(
          el("label", { className: "option-row" }, [
            el("input", {
              type: "checkbox",
              checked: checked,
              onChange: function () {
                if (entry.reasons.includes(flag.id)) {
                  entry.reasons = entry.reasons.filter(function (r) {
                    return r !== flag.id;
                  });
                } else {
                  entry.reasons.push(flag.id);
                }
              },
            }),
            el("span", { textContent: flag.label }),
          ]),
        );
      });

      modalContent.appendChild(list);
      modalContent.appendChild(
        el("div", { className: "field", style: "margin-top:0.85rem;" }, [
          el("label", { for: "flag-note", textContent: "Précision libre (facultative) :" }),
          el("textarea", {
            id: "flag-note",
            className: "textarea",
            value: entry.note,
            onInput: function (e) {
              entry.note = e.target.value;
            },
          }),
        ]),
      );
      modalContent.appendChild(
        el("div", { className: "btn-row" }, [
          el("button", {
            type: "button",
            className: "btn",
            textContent: "Effacer le signalement",
            onClick: function () {
              delete targetStore[m.domainId];
              closeModal();
              render();
            },
          }),
          el("button", {
            type: "button",
            className: "btn btn-primary",
            textContent: "Enregistrer et fermer",
            onClick: function () {
              closeModal();
              render();
            },
          }),
        ]),
      );
    }

    const closeBtn = modalContent.querySelector("button");
    if (closeBtn) {
      closeBtn.focus();
    }
  }

  function render() {
    renderHeader();
    renderProgress();
    const main = document.getElementById("app-main");
    if (!main) {
      return;
    }
    main.textContent = "";

    if (state.step === "setup") {
      renderSetupStep(main);
    } else if (state.step === "intro") {
      renderIntroStep(main);
    } else if (state.step === "pre_exercise") {
      renderPreExerciseStep(main);
    } else if (state.step === "maxdiff") {
      renderMaxDiffStep(main);
    } else if (state.step === "debrief_d1") {
      renderDebriefD1Step(main);
    } else if (state.step === "debrief_d2") {
      renderDebriefD2Step(main);
    } else if (state.step === "debrief_d3") {
      renderDebriefD3Step(main);
    } else if (state.step === "debrief_e") {
      renderDebriefEStep(main);
    } else if (state.step === "debrief_f") {
      renderDebriefFStep(main);
    } else if (state.step === "summary_export") {
      renderSummaryExportStep(main);
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && state.modalState) {
      closeModal();
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const backdrop = document.getElementById("modal-backdrop");
    if (backdrop) {
      backdrop.addEventListener("click", function (event) {
        if (event.target === backdrop) {
          closeModal();
        }
      });
    }
    render();
  });
})();
