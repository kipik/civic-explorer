(function (root, factory) {
  const api = factory(root.CivicPretestData, root.CivicPretestMaxDiff);
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.CivicPretestExportL17 = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (Data, MaxDiff) {
  "use strict";

  const TAB1_HEADERS = Object.freeze([
    "participant_id",
    "variante",
    "domaine",
    "serie",
    "comportement_passation_OBS",
    "comprehension_spontanee_OBS",
    "sujet_principal_evoque_OBS",
    "perimetre_percu_OBS",
    "difficulte_lexicale_OBS",
    "verbatim_OBS",
    "comprehension_statut_INTERP",
    "confusion_INTERP",
    "largeur_percue_INTERP",
    "selection_mono_composante_INTERP",
    "gravite_INTERP",
    "note_analytique_INTERP",
    "proposition_correction_INTERP",
  ]);

  const TAB2_HEADERS = Object.freeze([
    "participant_id",
    "variante",
    "tranche_age",
    "type_territoire",
    "niveau_diplome_aisance",
    "rapport_politique_declare",
    "duree_totale_min",
    "duree_panorama_A_sec",
    "lecture_panorama_A",
    "serie_vue_ensemble_B",
    "nb_ouvertures_perimetre",
    "nb_hesitations_longues",
    "nb_retours_arriere",
    "etats_non_reponse_utilises",
    "signalements_utilises",
    "comprehension_pourrait_attendre",
    "confusion_priorite_vs_adhesion_ou_perso",
    "test_niveau2_strate2_1_utile",
    "sujets_absents_cloture_F_OBS",
    "domaines_problematiques_INTERP",
    "notes_synthese_participant_INTERP",
  ]);

  const TAB3_HEADERS = Object.freeze([
    "participant_id",
    "variante",
    "domaine",
    "variante_testee",
    "modifie_comprehension_ou_interpretation_OBS",
    "precision_modification_OBS",
    "plus_claire_OBS",
    "raison_clarte_OBS",
    "difference_sens_percue_OBS",
    "meilleure_couverture_OBS",
    "raison_couverture_OBS",
    "perception_orientation_OBS",
    "raison_orientation_OBS",
    "synthese_analytique_INTERP",
  ]);

  const TAB4_HEADERS = Object.freeze([
    "domaine",
    "intitule_L11",
    "nb_participants_A_observes",
    "nb_participants_B_observes",
    "nb_comprehensions_fideles_INTERP",
    "nb_comprehensions_partielles_ou_erronees_INTERP",
    "sujets_principaux_recurrents_OBS",
    "confusions_recurrentes_INTERP",
    "difficultes_lexicales_recurrentes_OBS",
    "largeur_trop_large_count",
    "largeur_adaptee_count",
    "largeur_trop_etroite_count",
    "mono_composante_oui_count",
    "mono_composante_incertain_count",
    "gravite_max_observee",
    "nb_mineure",
    "nb_importante",
    "nb_bloquante",
    "verbatims_cles_OBS",
    "decision_edito_proposee_INTERP",
  ]);

  function findProhibitedKeyRecursive(value, path) {
    if (!value || typeof value !== "object") {
      return null;
    }
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i += 1) {
        const hit = findProhibitedKeyRecursive(value[i], path + "[" + i + "]");
        if (hit) {
          return hit;
        }
      }
      return null;
    }
    const keys = Object.keys(value);
    for (let i = 0; i < keys.length; i += 1) {
      const k = keys[i];
      if (Data.PROHIBITED_PROFILE_KEYS.includes(k)) {
        return path ? path + "." + k : k;
      }
      const hit = findProhibitedKeyRecursive(value[k], path ? path + "." + k : k);
      if (hit) {
        return hit;
      }
    }
    return null;
  }

  function safeString(val) {
    if (val === null || val === undefined) {
      return "";
    }
    return String(val).trim();
  }

  function validateParticipantSession(raw) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      return { ok: false, error: "Le fichier JSON ne contient pas un objet de session valide." };
    }
    const prohibitedHit = findProhibitedKeyRecursive(raw, "");
    if (prohibitedHit) {
      return {
        ok: false,
        error: "Clé de profilage politique interdite détectée : " + prohibitedHit,
      };
    }
    if (raw.schemaVersion !== Data.SESSION_SCHEMA_VERSION) {
      return {
        ok: false,
        error:
          "Version de schéma non prise en charge (" +
          String(raw.schemaVersion || "absente") +
          "). Attendu : " +
          Data.SESSION_SCHEMA_VERSION,
      };
    }
    if (raw.variant !== "A" && raw.variant !== "B") {
      return { ok: false, error: "Variante invalide (attendu A ou B)." };
    }
    if (raw.studyMode !== "dry_run_interne" && raw.studyMode !== "pretest_cognitif") {
      return { ok: false, error: "Cadre de passation invalide." };
    }
    if (!raw.instance || !Array.isArray(raw.instance.blocks) || raw.instance.blocks.length !== 8) {
      return { ok: false, error: "Plan MaxDiff absent ou incomplet (8 séries attendues)." };
    }
    const validDomainSet = new Set(
      Data.DOMAINS.map(function (d) {
        return d.id;
      }),
    );
    for (let i = 0; i < raw.instance.blocks.length; i += 1) {
      const blk = raw.instance.blocks[i];
      if (!Array.isArray(blk) || blk.length !== 4) {
        return { ok: false, error: "La série " + (i + 1) + " doit contenir 4 domaines." };
      }
      for (let j = 0; j < blk.length; j += 1) {
        if (!validDomainSet.has(blk[j])) {
          return { ok: false, error: "Domaine inconnu dans le plan : " + String(blk[j]) };
        }
      }
    }
    const inv = MaxDiff.evaluateDesignInvariants(raw.instance.blocks);
    if (!inv.allInvariantsValid) {
      return {
        ok: false,
        error: "Les invariants combinatoires MaxDiff (D8 / r=4 / [1,1,1,1]) ne sont pas respectés.",
      };
    }

    const participantCode = safeString(raw.participantCode) || "SANS_CODE";
    return {
      ok: true,
      session: Object.assign({}, raw, {
        participantCode: participantCode,
      }),
    };
  }

  function sanitizeCsvCell(value) {
    const raw = value === null || value === undefined ? "" : String(value);
    const trimmedStart = raw.replace(/^[\u0000-\u0020]+/, "");
    const firstChar = trimmedStart.charAt(0);
    const needsFormulaGuard =
      firstChar === "=" ||
      firstChar === "+" ||
      firstChar === "-" ||
      firstChar === "@" ||
      raw.charAt(0) === "\t" ||
      raw.charAt(0) === "\r";
    const guarded = needsFormulaGuard ? "'" + raw : raw;
    const normalized = guarded.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    if (normalized.includes(";") || normalized.includes('"') || normalized.includes("\n")) {
      return '"' + normalized.replace(/"/g, '""') + '"';
    }
    return normalized;
  }

  function toCsv(headers, rows, withBom) {
    const lines = [
      headers
        .map(function (h) {
          return sanitizeCsvCell(h);
        })
        .join(";"),
    ];
    rows.forEach(function (row) {
      lines.push(
        headers
          .map(function (h) {
            return sanitizeCsvCell(row[h] !== undefined ? row[h] : "");
          })
          .join(";"),
      );
    });
    const body = lines.join("\r\n");
    return withBom === false ? body : "\uFEFF" + body;
  }

  function formatFlagList(flags) {
    if (!Array.isArray(flags) || flags.length === 0) {
      return "";
    }
    return flags
      .map(function (f) {
        const match = Data.COMPREHENSION_FLAGS.find(function (item) {
          return item.id === f;
        });
        return match ? match.label : f;
      })
      .join(" | ");
  }

  function resolveLexicalChoice(choiceRaw, sideSpec) {
    if (!choiceRaw || choiceRaw === "Aucune" || choiceRaw === "Egal" || choiceRaw === "Incertain") {
      return safeString(choiceRaw);
    }
    if (!sideSpec) {
      return safeString(choiceRaw);
    }
    if (choiceRaw === "Formulation 1") {
      return sideSpec.formulation1Source === "variant"
        ? "Variante " + sideSpec.variantCode
        : "Référence L11";
    }
    if (choiceRaw === "Formulation 2") {
      return sideSpec.formulation2Source === "variant"
        ? "Variante " + sideSpec.variantCode
        : "Référence L11";
    }
    return safeString(choiceRaw);
  }

  function summarizeParticipantMetrics(session) {
    const metrics = session.metrics || {};
    const responses = Array.isArray(session.maxdiffResponses) ? session.maxdiffResponses : [];
    const perimLogs = Array.isArray(metrics.perimeterOpens) ? metrics.perimeterOpens : [];
    const seriesDurations = Array.isArray(metrics.seriesDurationsMs)
      ? metrics.seriesDurationsMs
      : [];

    let nbHesitations = 0;
    seriesDurations.forEach(function (ms) {
      if (Number(ms) >= 25000) {
        nbHesitations += 1;
      }
    });

    const nonResponseSummary = [];
    const flagSummary = [];
    responses.forEach(function (resp, idx) {
      if (!resp) {
        return;
      }
      if (
        resp.status === "skipped" ||
        resp.status === "dont_know" ||
        resp.status === "no_distinguishable_best_worst"
      ) {
        nonResponseSummary.push("S" + (idx + 1) + ":" + resp.status);
      }
      if (resp.flagsByDomain && typeof resp.flagsByDomain === "object") {
        Object.keys(resp.flagsByDomain).forEach(function (domId) {
          const entry = resp.flagsByDomain[domId];
          if (entry && Array.isArray(entry.reasons) && entry.reasons.length > 0) {
            flagSummary.push("S" + (idx + 1) + ":" + domId + "(" + entry.reasons.join(",") + ")");
          }
        });
      }
    });

    const panoramaFlags =
      metrics.panoramaFlagsByDomain && typeof metrics.panoramaFlagsByDomain === "object"
        ? metrics.panoramaFlagsByDomain
        : {};
    Object.keys(panoramaFlags).forEach(function (domId) {
      const entry = panoramaFlags[domId];
      if (entry && Array.isArray(entry.reasons) && entry.reasons.length > 0) {
        flagSummary.push("Panorama:" + domId + "(" + entry.reasons.join(",") + ")");
      }
    });

    const totalDurationMin =
      Number.isFinite(Number(metrics.totalDurationSec)) && Number(metrics.totalDurationSec) > 0
        ? Math.round((Number(metrics.totalDurationSec) / 60) * 10) / 10
        : "";

    const panoramaSec =
      session.variant === "A" && Number.isFinite(Number(metrics.panoramaDurationSec))
        ? Math.round(Number(metrics.panoramaDurationSec))
        : "";

    const debrief = session.debrief || {};
    const demo = session.demographics || {};
    const transversal = debrief.transversal || {};
    const level2 = debrief.level2Test || {};
    const closure = debrief.closure || {};

    const diplomaEase = [safeString(demo.educationLevel), safeString(demo.institutionalEase)]
      .filter(Boolean)
      .join(" / ");

    return {
      totalDurationMin: totalDurationMin,
      panoramaSec: panoramaSec,
      nbPerimeterOpens: perimLogs.length,
      nbHesitations: nbHesitations,
      nbBacktracks: Number(metrics.backtrackCount || 0),
      nonResponseText: nonResponseSummary.length > 0 ? nonResponseSummary.join(" ; ") : "Aucun",
      flagsText: flagSummary.length > 0 ? flagSummary.join(" ; ") : "Aucun",
      diplomaEase: diplomaEase,
      transversal: transversal,
      level2: level2,
      closure: closure,
      demo: demo,
    };
  }

  /**
   * Construit les 4 jeux de lignes L17 à partir des sessions validées et du codage [INTERP] existant.
   */
  function buildL17Dataset(sessions, existingInterpState) {
    const interpStore = existingInterpState || {};
    const rowInterps = interpStore.observationInterps || {};
    const participantInterps = interpStore.participantInterps || {};
    const lexicalInterps = interpStore.lexicalInterps || {};
    const domainDecisions = interpStore.domainDecisions || {};
    const manualObsRows = Array.isArray(interpStore.manualObservationRows)
      ? interpStore.manualObservationRows
      : [];

    const tab1Rows = [];
    const tab2Rows = [];
    const tab3Rows = [];

    sessions.forEach(function (session) {
      const pid = session.participantCode;
      const variant = session.variant;
      const metrics = session.metrics || {};
      const responses = Array.isArray(session.maxdiffResponses) ? session.maxdiffResponses : [];
      const blocks = session.instance.blocks;
      const debrief = session.debrief || {};
      const summary = summarizeParticipantMetrics(session);

      function addAutoObsRow(rowKey, baseFields) {
        const savedInterp = rowInterps[rowKey] || {};
        tab1Rows.push({
          rowKey: rowKey,
          source: "auto_session",
          participant_id: pid,
          variante: variant,
          domaine: baseFields.domaine,
          serie: baseFields.serie,
          comportement_passation_OBS: safeString(baseFields.comportement_passation_OBS),
          comprehension_spontanee_OBS: safeString(baseFields.comprehension_spontanee_OBS),
          sujet_principal_evoque_OBS: safeString(baseFields.sujet_principal_evoque_OBS),
          perimetre_percu_OBS: safeString(baseFields.perimetre_percu_OBS),
          difficulte_lexicale_OBS: safeString(baseFields.difficulte_lexicale_OBS),
          verbatim_OBS: safeString(baseFields.verbatim_OBS),
          comprehension_statut_INTERP: safeString(savedInterp.comprehension_statut_INTERP),
          confusion_INTERP: safeString(savedInterp.confusion_INTERP),
          largeur_percue_INTERP: safeString(savedInterp.largeur_percue_INTERP),
          selection_mono_composante_INTERP: safeString(
            savedInterp.selection_mono_composante_INTERP,
          ),
          gravite_INTERP: safeString(savedInterp.gravite_INTERP),
          note_analytique_INTERP: safeString(savedInterp.note_analytique_INTERP),
          proposition_correction_INTERP: safeString(savedInterp.proposition_correction_INTERP),
        });
      }

      // 1a. Lignes MaxDiff par série ayant au moins un fait saillant (hésitation, ouverture, non-réponse, signalement)
      const perimOpens = Array.isArray(metrics.perimeterOpens) ? metrics.perimeterOpens : [];
      const seriesDurations = Array.isArray(metrics.seriesDurationsMs)
        ? metrics.seriesDurationsMs
        : [];
      const panoramaFlags = metrics.panoramaFlagsByDomain || {};

      Object.keys(panoramaFlags).forEach(function (domId) {
        const flagEntry = panoramaFlags[domId];
        if (flagEntry && Array.isArray(flagEntry.reasons) && flagEntry.reasons.length > 0) {
          addAutoObsRow(pid + "::PANORAMA::" + domId, {
            domaine: domId,
            serie: "Panorama",
            comportement_passation_OBS:
              "Signalement au Panorama A : " + formatFlagList(flagEntry.reasons),
            difficulte_lexicale_OBS: flagEntry.reasons.includes("loaded_wording")
              ? "Formulation signalée orientée"
              : "",
            verbatim_OBS: flagEntry.note || "",
          });
        }
      });

      blocks.forEach(function (blk, sIdx) {
        const resp = responses[sIdx] || {};
        const durMs = Number(seriesDurations[sIdx] || 0);
        const durSec = Math.round(durMs / 1000);
        const opensInSeries = perimOpens.filter(function (o) {
          return o.step === "S" + (sIdx + 1);
        });
        const flagsByDom = resp.flagsByDomain || {};
        const flaggedDoms = Object.keys(flagsByDom).filter(function (domId) {
          return (
            flagsByDom[domId] &&
            Array.isArray(flagsByDom[domId].reasons) &&
            flagsByDom[domId].reasons.length > 0
          );
        });

        flaggedDoms.forEach(function (domId) {
          const entry = flagsByDom[domId];
          addAutoObsRow(pid + "::S" + (sIdx + 1) + "::FLAG::" + domId, {
            domaine: domId,
            serie: "S" + (sIdx + 1),
            comportement_passation_OBS:
              "Signalement en S" +
              (sIdx + 1) +
              " (" +
              durSec +
              "s) : " +
              formatFlagList(entry.reasons),
            difficulte_lexicale_OBS: entry.reasons.join(", "),
            verbatim_OBS: entry.note || "",
          });
        });

        if (
          durMs >= 25000 ||
          opensInSeries.length > 0 ||
          (resp.status && resp.status !== "answered")
        ) {
          const parts = ["Durée " + durSec + "s", "État=" + (resp.status || "incomplete")];
          if (durMs >= 25000) {
            parts.push("Hésitation >25s");
          }
          if (opensInSeries.length > 0) {
            parts.push(
              "Périmètre ouvert (" +
                opensInSeries
                  .map(function (o) {
                    return o.domainId || "complet";
                  })
                  .join(", ") +
                ")",
            );
          }
          if (resp.noDistinguishableReason) {
            parts.push("Motif=" + resp.noDistinguishableReason);
          }
          if (resp.noDistinguishableOther) {
            parts.push("Précision=" + resp.noDistinguishableOther);
          }
          addAutoObsRow(pid + "::S" + (sIdx + 1) + "::BEHAVIOR", {
            domaine:
              opensInSeries.length === 1 && opensInSeries[0].domainId
                ? opensInSeries[0].domainId
                : "TRANS",
            serie: "S" + (sIdx + 1),
            comportement_passation_OBS: parts.join(" · "),
            verbatim_OBS: resp.noDistinguishableOther || "",
          });
        }
      });

      // 1b. Lignes Débriefing D.1 (raisons des choix)
      const reasonsCards = Array.isArray(debrief.choiceReasons) ? debrief.choiceReasons : [];
      reasonsCards.forEach(function (item) {
        if (
          !safeString(item.mainSubject) &&
          !safeString(item.otherElements) &&
          !safeString(item.lessPriorityOrRejected)
        ) {
          return;
        }
        const roleLabel =
          item.role === "worst" ? "Pourrait attendre" : "Devrait recevoir le plus d'attention";
        addAutoObsRow(pid + "::D1::" + item.domainId, {
          domaine: item.domainId,
          serie: "Debriefing_D",
          comportement_passation_OBS: "Séquence 6 (D.1) sur carte cochée « " + roleLabel + " »",
          sujet_principal_evoque_OBS:
            "[" +
            roleLabel +
            "] " +
            safeString(item.mainSubject) +
            (safeString(item.otherElements)
              ? " | Autres éléments : " + safeString(item.otherElements)
              : ""),
          perimetre_percu_OBS: safeString(item.lessPriorityOrRejected)
            ? "Moins prioritaire/rejeté dans la carte : " + safeString(item.lessPriorityOrRejected)
            : "",
          verbatim_OBS: safeString(item.mainSubject),
        });
      });

      // 1c. Lignes Revue spontanée des 8 domaines (D.2)
      const domainReviews = Array.isArray(debrief.domainReviews) ? debrief.domainReviews : [];
      domainReviews.forEach(function (rev) {
        if (
          !safeString(rev.spontaneousReformulation) &&
          !safeString(rev.perceivedScope) &&
          !safeString(rev.lexicalDifficulty) &&
          !safeString(rev.probeAnswer)
        ) {
          return;
        }
        addAutoObsRow(pid + "::D2::" + rev.domainId, {
          domaine: rev.domainId,
          serie: "Debriefing_D",
          comportement_passation_OBS: "Revue spontanée domaine (D.2)",
          comprehension_spontanee_OBS: safeString(rev.spontaneousReformulation),
          perimetre_percu_OBS: safeString(rev.perceivedScope),
          difficulte_lexicale_OBS: safeString(rev.lexicalDifficulty) || "Aucune",
          verbatim_OBS: safeString(rev.probeAnswer || rev.spontaneousReformulation),
        });
      });

      // 1d. Ligne transversale Clôture / Transversal
      if (
        safeString(summary.transversal.confusionsOrOverlaps) ||
        safeString(summary.transversal.tooBroadDomains) ||
        safeString(summary.closure.missingTopic)
      ) {
        addAutoObsRow(pid + "::CLOTURE::TRANS", {
          domaine: "TRANS",
          serie: "Cloture_F",
          comportement_passation_OBS:
            "Retours transversaux D.3/D.4 et clôture F (durée=" +
            String(summary.totalDurationMin || "?") +
            " min)",
          perimetre_percu_OBS: [
            summary.transversal.confusionsOrOverlaps
              ? "Confusions : " + summary.transversal.confusionsOrOverlaps
              : "",
            summary.transversal.tooBroadDomains
              ? "Trop larges : " + summary.transversal.tooBroadDomains
              : "",
          ]
            .filter(Boolean)
            .join(" | "),
          verbatim_OBS:
            safeString(summary.closure.missingTopic) ||
            safeString(summary.transversal.variantExperienceComment),
        });
      }

      // 2. Onglet 2 — Synthèse Participant
      const savedPartInterp = participantInterps[pid] || {};
      tab2Rows.push({
        participant_id: pid,
        variante: variant,
        tranche_age: safeString(summary.demo.ageBracket),
        type_territoire: safeString(summary.demo.territoryType),
        niveau_diplome_aisance: summary.diplomaEase,
        rapport_politique_declare: safeString(summary.demo.politicalInterest),
        duree_totale_min: summary.totalDurationMin,
        duree_panorama_A_sec: summary.panoramaSec,
        lecture_panorama_A:
          variant === "A" ? safeString(summary.transversal.panoramaReadingMode) : "NA",
        serie_vue_ensemble_B:
          variant === "B" ? safeString(summary.transversal.overviewReachedAtSeries) : "NA",
        nb_ouvertures_perimetre: summary.nbPerimeterOpens,
        nb_hesitations_longues: summary.nbHesitations,
        nb_retours_arriere: summary.nbBacktracks,
        etats_non_reponse_utilises: summary.nonResponseText,
        signalements_utilises: summary.flagsText,
        comprehension_pourrait_attendre: safeString(summary.transversal.couldWaitUnderstanding),
        confusion_priorite_vs_adhesion_ou_perso: safeString(summary.transversal.choiceBasis),
        test_niveau2_strate2_1_utile: summary.level2.domainId
          ? summary.level2.domainId + " : " + safeString(summary.level2.usefulness)
          : "",
        sujets_absents_cloture_F_OBS: safeString(summary.closure.missingTopic),
        domaines_problematiques_INTERP: safeString(savedPartInterp.domaines_problematiques_INTERP),
        notes_synthese_participant_INTERP: safeString(
          savedPartInterp.notes_synthese_participant_INTERP,
        ),
      });

      // 3. Onglet 3 — Débriefing Lexical (4 paires 1B, 2B, 7B, 8B)
      const lexicalAnswers = Array.isArray(debrief.lexicalPairs) ? debrief.lexicalPairs : [];
      const sideOrders = Array.isArray(session.instance.lexicalSideOrder)
        ? session.instance.lexicalSideOrder
        : [];

      Data.LEXICAL_PAIRS.forEach(function (pair) {
        const answer =
          lexicalAnswers.find(function (a) {
            return a.pairId === pair.pairId || a.variantCode === pair.variantCode;
          }) || {};
        const sideSpec = sideOrders.find(function (s) {
          return s.pairId === pair.pairId || s.variantCode === pair.variantCode;
        });
        const lexKey = pid + "::" + pair.variantCode;
        const savedLexInterp = lexicalInterps[lexKey] || {};

        tab3Rows.push({
          rowKey: lexKey,
          participant_id: pid,
          variante: variant,
          domaine: pair.domainId,
          variante_testee: pair.variantCode,
          modifie_comprehension_ou_interpretation_OBS: safeString(answer.modifiesUnderstanding),
          precision_modification_OBS: safeString(answer.modificationDetails),
          plus_claire_OBS: resolveLexicalChoice(answer.clearerChoice, sideSpec),
          raison_clarte_OBS: safeString(answer.clearerReason),
          difference_sens_percue_OBS: safeString(answer.meaningDifference),
          meilleure_couverture_OBS: resolveLexicalChoice(answer.betterCoverageChoice, sideSpec),
          raison_couverture_OBS: safeString(answer.coverageReason),
          perception_orientation_OBS: resolveLexicalChoice(answer.orientedChoice, sideSpec),
          raison_orientation_OBS: safeString(answer.orientedReason),
          synthese_analytique_INTERP: safeString(savedLexInterp.synthese_analytique_INTERP),
        });
      });
    });

    // Ajouter lignes manuelles [OBS] + [INTERP]
    manualObsRows.forEach(function (manual) {
      const savedInterp = rowInterps[manual.rowKey] || {};
      tab1Rows.push({
        rowKey: manual.rowKey,
        source: "analyst_manual",
        participant_id: safeString(manual.participant_id),
        variante: safeString(manual.variante),
        domaine: safeString(manual.domaine),
        serie: safeString(manual.serie),
        comportement_passation_OBS: safeString(manual.comportement_passation_OBS),
        comprehension_spontanee_OBS: safeString(manual.comprehension_spontanee_OBS),
        sujet_principal_evoque_OBS: safeString(manual.sujet_principal_evoque_OBS),
        perimetre_percu_OBS: safeString(manual.perimetre_percu_OBS),
        difficulte_lexicale_OBS: safeString(manual.difficulte_lexicale_OBS),
        verbatim_OBS: safeString(manual.verbatim_OBS),
        comprehension_statut_INTERP: safeString(savedInterp.comprehension_statut_INTERP),
        confusion_INTERP: safeString(savedInterp.confusion_INTERP),
        largeur_percue_INTERP: safeString(savedInterp.largeur_percue_INTERP),
        selection_mono_composante_INTERP: safeString(savedInterp.selection_mono_composante_INTERP),
        gravite_INTERP: safeString(savedInterp.gravite_INTERP),
        note_analytique_INTERP: safeString(savedInterp.note_analytique_INTERP),
        proposition_correction_INTERP: safeString(savedInterp.proposition_correction_INTERP),
      });
    });

    // 4. Onglet 4 — Synthèse par domaine (DOM-01..DOM-08)
    const gravityRank = {
      "": 0,
      Aucune: 1,
      Mineure: 2,
      Importante: 3,
      Bloquante: 4,
    };

    const tab4Rows = Data.DOMAINS.map(function (domain) {
      const domId = domain.id;
      const matchingObs = tab1Rows.filter(function (r) {
        return r.domaine === domId;
      });
      const participantsA = new Set();
      const participantsB = new Set();
      let fideles = 0;
      let partiellesOuErr = 0;
      let tropLarge = 0;
      let adaptee = 0;
      let tropEtroite = 0;
      let monoOui = 0;
      let monoIncertain = 0;
      let maxGrav = "";
      let nbMineure = 0;
      let nbImportante = 0;
      let nbBloquante = 0;

      const subjects = [];
      const confusions = [];
      const lexDiffs = [];
      const verbatims = [];

      matchingObs.forEach(function (r) {
        if (r.variante === "A" && r.participant_id) {
          participantsA.add(r.participant_id);
        } else if (r.variante === "B" && r.participant_id) {
          participantsB.add(r.participant_id);
        }
        if (r.comprehension_statut_INTERP === "Fidele") {
          fideles += 1;
        } else if (
          r.comprehension_statut_INTERP === "Partielle" ||
          r.comprehension_statut_INTERP === "Erronee"
        ) {
          partiellesOuErr += 1;
        }
        if (r.largeur_percue_INTERP === "Trop large") {
          tropLarge += 1;
        } else if (r.largeur_percue_INTERP === "Adaptee") {
          adaptee += 1;
        } else if (r.largeur_percue_INTERP === "Trop etroite") {
          tropEtroite += 1;
        }
        if (r.selection_mono_composante_INTERP === "Oui") {
          monoOui += 1;
        } else if (r.selection_mono_composante_INTERP === "Incertain") {
          monoIncertain += 1;
        }
        if ((gravityRank[r.gravite_INTERP] || 0) > (gravityRank[maxGrav] || 0)) {
          maxGrav = r.gravite_INTERP;
        }
        if (r.gravite_INTERP === "Mineure") {
          nbMineure += 1;
        } else if (r.gravite_INTERP === "Importante") {
          nbImportante += 1;
        } else if (r.gravite_INTERP === "Bloquante") {
          nbBloquante += 1;
        }

        if (r.sujet_principal_evoque_OBS) {
          subjects.push(r.participant_id + ": " + r.sujet_principal_evoque_OBS);
        }
        if (r.confusion_INTERP && r.confusion_INTERP !== "Aucune") {
          confusions.push(r.participant_id + ": " + r.confusion_INTERP);
        }
        if (r.difficulte_lexicale_OBS && r.difficulte_lexicale_OBS !== "Aucune") {
          lexDiffs.push(r.participant_id + ": " + r.difficulte_lexicale_OBS);
        }
        if (r.verbatim_OBS) {
          verbatims.push(r.participant_id + ": « " + r.verbatim_OBS + " »");
        }
      });

      return {
        domaine: domId,
        intitule_L11: domain.title,
        nb_participants_A_observes: participantsA.size,
        nb_participants_B_observes: participantsB.size,
        nb_comprehensions_fideles_INTERP: fideles,
        nb_comprehensions_partielles_ou_erronees_INTERP: partiellesOuErr,
        sujets_principaux_recurrents_OBS: subjects.join(" | "),
        confusions_recurrentes_INTERP: confusions.join(" | "),
        difficultes_lexicales_recurrentes_OBS: lexDiffs.join(" | "),
        largeur_trop_large_count: tropLarge,
        largeur_adaptee_count: adaptee,
        largeur_trop_etroite_count: tropEtroite,
        mono_composante_oui_count: monoOui,
        mono_composante_incertain_count: monoIncertain,
        gravite_max_observee: maxGrav || "Aucune",
        nb_mineure: nbMineure,
        nb_importante: nbImportante,
        nb_bloquante: nbBloquante,
        verbatims_cles_OBS: verbatims.slice(0, 6).join(" | "),
        decision_edito_proposee_INTERP: safeString(domainDecisions[domId]),
      };
    });

    return {
      tab1Rows: tab1Rows,
      tab2Rows: tab2Rows,
      tab3Rows: tab3Rows,
      tab4Rows: tab4Rows,
    };
  }

  return {
    TAB1_HEADERS: TAB1_HEADERS,
    TAB2_HEADERS: TAB2_HEADERS,
    TAB3_HEADERS: TAB3_HEADERS,
    TAB4_HEADERS: TAB4_HEADERS,
    validateParticipantSession: validateParticipantSession,
    sanitizeCsvCell: sanitizeCsvCell,
    toCsv: toCsv,
    buildL17Dataset: buildL17Dataset,
    summarizeParticipantMetrics: summarizeParticipantMetrics,
    resolveLexicalChoice: resolveLexicalChoice,
  };
});
