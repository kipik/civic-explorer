(function () {
  "use strict";

  const Data = window.CivicPretestData;
  const MaxDiff = window.CivicPretestMaxDiff;
  const ExportL17 = window.CivicPretestExportL17;

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

  function createInitialState() {
    return {
      sessions: [],
      interpState: {
        observationInterps: {},
        participantInterps: {},
        lexicalInterps: {},
        domainDecisions: {},
        manualObservationRows: [],
      },
      activeTab: "tab1",
      filterParticipant: "",
      filterDomain: "",
      statusMessage: "",
      errorMessage: "",
      manualDraft: {
        participant_id: "",
        variante: "A",
        domaine: "DOM-01",
        serie: "Debriefing_D",
        comportement_passation_OBS: "",
        comprehension_spontanee_OBS: "",
        sujet_principal_evoque_OBS: "",
        perimetre_percu_OBS: "",
        difficulte_lexicale_OBS: "",
        verbatim_OBS: "",
      },
    };
  }

  let state = createInitialState();

  function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = el("a", { href: url, download: filename });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importJsonObjects(fileList) {
    if (!fileList || fileList.length === 0) {
      return;
    }
    state.errorMessage = "";
    state.statusMessage = "";

    const files = Array.from(fileList);
    let processed = 0;
    let addedSessions = 0;
    let restoredAnalysis = false;
    const errors = [];

    files.forEach(function (file) {
      const reader = new FileReader();
      reader.onload = function () {
        try {
          const parsed = JSON.parse(String(reader.result || ""));
          if (parsed && parsed.schemaVersion === Data.ANALYSIS_SCHEMA_VERSION) {
            // Restauration d'un paquet d'analyse consolidé local
            const incomingSessions = Array.isArray(parsed.sessions) ? parsed.sessions : [];
            incomingSessions.forEach(function (s) {
              const check = ExportL17.validateParticipantSession(s);
              if (check.ok) {
                upsertSession(check.session);
                addedSessions += 1;
              } else {
                errors.push(file.name + " : " + check.error);
              }
            });
            if (parsed.interpState && typeof parsed.interpState === "object") {
              Object.assign(
                state.interpState.observationInterps,
                parsed.interpState.observationInterps || {},
              );
              Object.assign(
                state.interpState.participantInterps,
                parsed.interpState.participantInterps || {},
              );
              Object.assign(
                state.interpState.lexicalInterps,
                parsed.interpState.lexicalInterps || {},
              );
              Object.assign(
                state.interpState.domainDecisions,
                parsed.interpState.domainDecisions || {},
              );
              if (Array.isArray(parsed.interpState.manualObservationRows)) {
                state.interpState.manualObservationRows =
                  state.interpState.manualObservationRows.concat(
                    parsed.interpState.manualObservationRows,
                  );
              }
            }
            restoredAnalysis = true;
          } else {
            const check = ExportL17.validateParticipantSession(parsed);
            if (check.ok) {
              upsertSession(check.session);
              addedSessions += 1;
            } else {
              errors.push(file.name + " : " + check.error);
            }
          }
        } catch (err) {
          errors.push(file.name + " : JSON invalide (" + err.message + ")");
        }

        processed += 1;
        if (processed === files.length) {
          if (addedSessions > 0 || restoredAnalysis) {
            state.statusMessage =
              String(addedSessions) +
              " session(s) importée(s) localement en mémoire." +
              (restoredAnalysis ? " Codages [INTERP] restaurés." : "");
          }
          if (errors.length > 0) {
            state.errorMessage = errors.join(" | ");
          }
          render();
        }
      };
      reader.readAsText(file, "utf-8");
    });
  }

  function upsertSession(session) {
    const existingIdx = state.sessions.findIndex(function (s) {
      return (
        s.participantCode === session.participantCode && s.exportedAtIso === session.exportedAtIso
      );
    });
    if (existingIdx >= 0) {
      state.sessions[existingIdx] = session;
    } else {
      state.sessions.push(session);
    }
  }

  function loadIllustrativeDemoSession() {
    const inst = MaxDiff.getPresetInstance("DR-INST-1");
    const demoResponses = inst.blocks.map(function (blk, idx) {
      if (idx === 4) {
        return {
          seriesIndex: 5,
          status: "no_distinguishable_best_worst",
          bestDomainId: null,
          worstDomainId: null,
          noDistinguishableReason: "not_comparable",
          noDistinguishableOther: "DEMO : thèmes trop éloignés dans la même série.",
          flagsByDomain: {},
        };
      }
      return {
        seriesIndex: idx + 1,
        status: "answered",
        bestDomainId: blk[0],
        worstDomainId: blk[3],
        noDistinguishableReason: "",
        noDistinguishableOther: "",
        flagsByDomain:
          idx === 0
            ? {
                "DOM-07": {
                  reasons: ["too_vague"],
                  note: "DEMO : beaucoup de thèmes différents dans la même carte.",
                },
              }
            : {},
      };
    });

    const demoSession = {
      schemaVersion: Data.SESSION_SCHEMA_VERSION,
      catalogVersion: Data.CATALOG_VERSION,
      protocolVersion: Data.PROTOCOL_VERSION,
      exportedAtIso: "2026-11-10T12:00:00.000Z",
      studyMode: "dry_run_interne",
      excludedFromFutureSample: true,
      variant: "B",
      participantCode: "DEMO-ILLUSTRATIF-B1",
      instance: inst,
      maxdiffResponses: demoResponses,
      descriptiveCounts: MaxDiff.computeDescriptiveCounts(inst.blocks, demoResponses),
      metrics: {
        totalDurationSec: 2820,
        panoramaDurationSec: null,
        seriesDurationsMs: [32000, 18000, 14000, 29000, 21000, 15000, 16000, 13000],
        backtrackCount: 1,
        perimeterOpens: [{ step: "S2", domainId: "DOM-02", atSecFromStart: 220 }],
        panoramaFlagsByDomain: {},
      },
      debrief: {
        choiceReasons: [
          {
            domainId: "DOM-01",
            role: "best",
            seriesIndex: 7,
            mainSubject: "DEMO : déserts médicaux et urgences hospitalières",
            otherElements: "Un peu les retraites",
            lessPriorityOrRejected: "Rien de particulier",
          },
        ],
        domainReviews: [
          {
            domainId: "DOM-07",
            spontaneousReformulation: "DEMO : les tribunaux et les droits sur internet",
            perceivedScope: "DEMO : pas sûr pour la laïcité",
            lexicalDifficulty: "solidarités (en DOM-01)",
            probeAnswer: "DEMO : pensé à l'école en premier pour la laïcité",
          },
        ],
        transversal: {
          panoramaReadingMode: "",
          overviewReachedAtSeries: "S3",
          variantExperienceComment: "DEMO : utile d'avoir le bouton périmètre en S2.",
          couldWaitUnderstanding: "Correct (priorité relative : d'autres passaient avant)",
          choiceBasis: "Urgence collective pour le pays",
          confusionsOrOverlaps: "DEMO : hésitation laïcité entre Éducation et Justice",
          tooBroadDomains: "DEMO : Économie et Justice assez chargées",
          hardestSeries: "S5",
        },
        level2Test: {
          domainId: "DOM-07",
          selectedSubIssues: [
            "Droits fondamentaux, vie privée, liberté d'expression et de manifestation",
          ],
          otherSubIssue: "",
          usefulness: "Répond au besoin de précision",
        },
        lexicalPairs: [
          {
            pairId: "PAIR-01",
            domainId: "DOM-01",
            variantCode: "1B",
            modifiesUnderstanding: "Non",
            modificationDetails: "",
            clearerChoice: "Formulation 1",
            clearerReason: "DEMO : plus simple à lire",
            meaningDifference: "Très proche",
            betterCoverageChoice: "Egal",
            coverageReason: "",
            orientedChoice: "Aucune",
            orientedReason: "",
          },
        ],
        closure: {
          missingTopic: "DEMO : aucun sujet manquant repéré",
          ergonomicFeedback: "DEMO : lecture claire sur écran 2x2",
        },
      },
      demographics: {
        ageBracket: "30–59 ans",
        territoryType: "Ville moyenne / périurbain",
        educationLevel: "Bac+1/2",
        institutionalEase: "Moyenne",
        politicalInterest: "Intérêt modéré",
      },
    };

    const check = ExportL17.validateParticipantSession(demoSession);
    if (check.ok) {
      upsertSession(check.session);
      state.statusMessage =
        "Exemple illustratif DEMO chargé en mémoire (marqué DEMO-ILLUSTRATIF-B1 — à ne pas mélanger aux séances réelles).";
      render();
    }
  }

  function makeSelectCell(options, value, onChange) {
    return el(
      "select",
      {
        className: "cell-select",
        onChange: function (e) {
          onChange(e.target.value);
        },
      },
      options.map(function (opt) {
        return el("option", {
          value: opt,
          selected: value === opt,
          textContent: opt || "—",
        });
      }),
    );
  }

  function makeInputCell(value, placeholder, onInput) {
    return el("input", {
      type: "text",
      className: "cell-input",
      value: value || "",
      placeholder: placeholder || "",
      onInput: function (e) {
        onInput(e.target.value);
      },
    });
  }

  function renderImportSection(root, dataset) {
    const card = el("section", { className: "card" }, [
      el("h1", { textContent: "Console locale de recueil & codage L17" }),
      el("p", {
        className: "muted",
        textContent:
          "Importez un ou plusieurs fichiers .json exportés en fin de passation pour générer automatiquement les 4 onglets CSV L17, séparer strictement les faits bruts [OBS] (verrouillés) de votre codage [INTERP], et exporter les tableurs hors ligne.",
      }),
    ]);

    const dropzone = el(
      "div",
      {
        className: "dropzone",
        onDragover: function (e) {
          e.preventDefault();
          dropzone.classList.add("is-dragover");
        },
        onDragleave: function () {
          dropzone.classList.remove("is-dragover");
        },
        onDrop: function (e) {
          e.preventDefault();
          dropzone.classList.remove("is-dragover");
          importJsonObjects(e.dataTransfer.files);
        },
      },
      [
        el("p", {
          style: "font-weight:600;",
          textContent: "Déposer ici vos fichiers JSON de passation (ou un fichier d'analyse L17)",
        }),
        el("div", { className: "btn-group", style: "justify-content:center;" }, [
          el("label", { className: "btn btn-primary", style: "cursor:pointer;" }, [
            "Sélectionner des fichiers (.json)",
            el("input", {
              type: "file",
              accept: ".json,application/json",
              multiple: true,
              className: "sr-only",
              onChange: function (e) {
                importJsonObjects(e.target.files);
                e.target.value = "";
              },
            }),
          ]),
          el("button", {
            type: "button",
            className: "btn",
            textContent: "Charger un exemple DEMO illustratif",
            onClick: loadIllustrativeDemoSession,
          }),
          el("a", {
            href: "./index.html",
            className: "btn",
            textContent: "← Ouvrir une passation participant",
          }),
        ]),
      ],
    );

    card.appendChild(dropzone);

    if (state.statusMessage) {
      card.appendChild(
        el("div", {
          className: "notice notice-ok",
          style: "margin-top:0.85rem;",
          role: "status",
          textContent: state.statusMessage,
        }),
      );
    }
    if (state.errorMessage) {
      card.appendChild(
        el("div", {
          className: "notice notice-danger",
          style: "margin-top:0.85rem;",
          role: "alert",
          textContent: state.errorMessage,
        }),
      );
    }

    if (state.sessions.length > 0) {
      const listWrap = el("div", { className: "table-wrap", style: "margin-top:1rem;" });
      listWrap.appendChild(
        el("table", null, [
          el("thead", null, [
            el("tr", null, [
              el("th", { textContent: "Code séance" }),
              el("th", { textContent: "Cadre" }),
              el("th", { textContent: "Variante" }),
              el("th", { textContent: "Instance" }),
              el("th", { textContent: "Durée (min)" }),
              el("th", { textContent: "Ouvertures périmètre" }),
              el("th", { textContent: "Hésitations >25s" }),
              el("th", { textContent: "Retours arrière" }),
              el("th", { textContent: "Action" }),
            ]),
          ]),
          el(
            "tbody",
            null,
            state.sessions.map(function (s, idx) {
              const sum = ExportL17.summarizeParticipantMetrics(s);
              return el("tr", null, [
                el("td", { textContent: s.participantCode }),
                el("td", {
                  textContent:
                    s.studyMode === "dry_run_interne" ? "DRY-RUN INTERNE" : "Prétest L13",
                }),
                el("td", { textContent: s.variant }),
                el("td", { textContent: s.instance.instanceId }),
                el("td", { textContent: String(sum.totalDurationMin) }),
                el("td", { textContent: String(sum.nbPerimeterOpens) }),
                el("td", { textContent: String(sum.nbHesitations) }),
                el("td", { textContent: String(sum.nbBacktracks) }),
                el("td", null, [
                  el("button", {
                    type: "button",
                    className: "btn btn-subtle btn-danger",
                    textContent: "Retirer",
                    onClick: function () {
                      state.sessions.splice(idx, 1);
                      render();
                    },
                  }),
                ]),
              ]);
            }),
          ),
        ]),
      );
      card.appendChild(listWrap);
    }

    // Barre d'exports CSV & JSON analyse
    const exportBar = el("div", { className: "card card-muted", style: "margin-top:1rem;" }, [
      el("h2", {
        textContent: "Exports manuels L17 (UTF-8, séparateur « ; » pour LibreOffice / Excel)",
      }),
      el("div", { className: "btn-group" }, [
        el("button", {
          type: "button",
          className: "btn btn-primary",
          disabled: dataset.tab1Rows.length === 0,
          textContent: "Télécharger 01_Observations.csv",
          onClick: function () {
            downloadFile(
              "01_Observations.csv",
              ExportL17.toCsv(ExportL17.TAB1_HEADERS, dataset.tab1Rows),
              "text/csv;charset=utf-8",
            );
          },
        }),
        el("button", {
          type: "button",
          className: "btn btn-primary",
          disabled: dataset.tab2Rows.length === 0,
          textContent: "Télécharger 02_Synthese_Participant.csv",
          onClick: function () {
            downloadFile(
              "02_Synthese_Participant.csv",
              ExportL17.toCsv(ExportL17.TAB2_HEADERS, dataset.tab2Rows),
              "text/csv;charset=utf-8",
            );
          },
        }),
        el("button", {
          type: "button",
          className: "btn btn-primary",
          disabled: dataset.tab3Rows.length === 0,
          textContent: "Télécharger 03_Debriefing_Lexical.csv",
          onClick: function () {
            downloadFile(
              "03_Debriefing_Lexical.csv",
              ExportL17.toCsv(ExportL17.TAB3_HEADERS, dataset.tab3Rows),
              "text/csv;charset=utf-8",
            );
          },
        }),
        el("button", {
          type: "button",
          className: "btn btn-primary",
          textContent: "Télécharger 04_Synthese_Domaine.csv",
          onClick: function () {
            downloadFile(
              "04_Synthese_Domaine.csv",
              ExportL17.toCsv(ExportL17.TAB4_HEADERS, dataset.tab4Rows),
              "text/csv;charset=utf-8",
            );
          },
        }),
        el("button", {
          type: "button",
          className: "btn",
          disabled:
            state.sessions.length === 0 && state.interpState.manualObservationRows.length === 0,
          textContent: "Sauvegarder le dossier d'analyse (.json)",
          onClick: function () {
            const bundle = {
              schemaVersion: Data.ANALYSIS_SCHEMA_VERSION,
              savedAtIso: new Date().toISOString(),
              sessions: state.sessions,
              interpState: state.interpState,
            };
            downloadFile(
              "civic-explorer-analyse-L17.json",
              JSON.stringify(bundle, null, 2),
              "application/json;charset=utf-8",
            );
          },
        }),
      ]),
    ]);
    card.appendChild(exportBar);

    root.appendChild(card);
  }

  function renderTabsSection(root, dataset) {
    const tabDefs = [
      { id: "tab1", label: "01_Observations (" + dataset.tab1Rows.length + ")" },
      { id: "tab2", label: "02_Synthese_Participant (" + dataset.tab2Rows.length + ")" },
      { id: "tab3", label: "03_Debriefing_Lexical (" + dataset.tab3Rows.length + ")" },
      { id: "tab4", label: "04_Synthese_Domaine (8)" },
    ];

    const tabBar = el(
      "div",
      { className: "tabs", role: "tablist" },
      tabDefs.map(function (t) {
        return el("button", {
          type: "button",
          role: "tab",
          className: "tab-btn",
          "aria-selected": state.activeTab === t.id ? "true" : "false",
          textContent: t.label,
          onClick: function () {
            state.activeTab = t.id;
            render();
          },
        });
      }),
    );

    const panel = el("section", { className: "card" });
    panel.appendChild(tabBar);

    if (state.activeTab === "tab1") {
      renderTab1(panel, dataset.tab1Rows);
    } else if (state.activeTab === "tab2") {
      renderTab2(panel, dataset.tab2Rows);
    } else if (state.activeTab === "tab3") {
      renderTab3(panel, dataset.tab3Rows);
    } else {
      renderTab4(panel, dataset.tab4Rows);
    }

    root.appendChild(panel);
  }

  function ensureObsInterpSlot(rowKey) {
    if (!state.interpState.observationInterps[rowKey]) {
      state.interpState.observationInterps[rowKey] = {
        comprehension_statut_INTERP: "",
        confusion_INTERP: "",
        largeur_percue_INTERP: "",
        selection_mono_composante_INTERP: "",
        gravite_INTERP: "",
        note_analytique_INTERP: "",
        proposition_correction_INTERP: "",
      };
    }
    return state.interpState.observationInterps[rowKey];
  }

  function renderTab1(panel, rows) {
    panel.appendChild(
      el("div", { className: "btn-group", style: "margin-bottom:0.85rem;" }, [
        el("span", { className: "badge badge-obs", textContent: "[OBS] Faits bruts verrouillés" }),
        el("span", {
          className: "badge badge-interp",
          textContent: "[INTERP] Codage analyste séparé",
        }),
      ]),
    );

    const participantOptions = Array.from(
      new Set(
        rows.map(function (r) {
          return r.participant_id;
        }),
      ),
    );

    panel.appendChild(
      el("div", { className: "grid-2", style: "margin-bottom:0.85rem;" }, [
        el("div", { className: "field" }, [
          el("label", { for: "flt-part", textContent: "Filtrer par participant" }),
          el(
            "select",
            {
              id: "flt-part",
              className: "select",
              onChange: function (e) {
                state.filterParticipant = e.target.value;
                render();
              },
            },
            [el("option", { value: "", textContent: "Tous les participants" })].concat(
              participantOptions.map(function (pid) {
                return el("option", {
                  value: pid,
                  selected: state.filterParticipant === pid,
                  textContent: pid,
                });
              }),
            ),
          ),
        ]),
        el("div", { className: "field" }, [
          el("label", { for: "flt-dom", textContent: "Filtrer par domaine" }),
          el(
            "select",
            {
              id: "flt-dom",
              className: "select",
              onChange: function (e) {
                state.filterDomain = e.target.value;
                render();
              },
            },
            [
              el("option", { value: "", textContent: "Tous les domaines" }),
              el("option", {
                value: "TRANS",
                selected: state.filterDomain === "TRANS",
                textContent: "TRANS (transversal)",
              }),
            ].concat(
              Data.DOMAINS.map(function (d) {
                return el("option", {
                  value: d.id,
                  selected: state.filterDomain === d.id,
                  textContent: d.id + " — " + d.title,
                });
              }),
            ),
          ),
        ]),
      ]),
    );

    const filtered = rows.filter(function (r) {
      if (state.filterParticipant && r.participant_id !== state.filterParticipant) {
        return false;
      }
      if (state.filterDomain && r.domaine !== state.filterDomain) {
        return false;
      }
      return true;
    });

    const wrap = el("div", { className: "table-wrap" });
    wrap.appendChild(
      el("table", null, [
        el("thead", null, [
          el("tr", null, [
            el("th", { className: "col-obs", textContent: "participant_id [OBS]" }),
            el("th", { className: "col-obs", textContent: "variante [OBS]" }),
            el("th", { className: "col-obs", textContent: "domaine [OBS]" }),
            el("th", { className: "col-obs", textContent: "serie [OBS]" }),
            el("th", { className: "col-obs", textContent: "comportement_passation [OBS]" }),
            el("th", { className: "col-obs", textContent: "comprehension_spontanee [OBS]" }),
            el("th", { className: "col-obs", textContent: "sujet_principal_evoque [OBS]" }),
            el("th", { className: "col-obs", textContent: "perimetre_percu [OBS]" }),
            el("th", { className: "col-obs", textContent: "difficulte_lexicale [OBS]" }),
            el("th", { className: "col-obs", textContent: "verbatim [OBS]" }),
            el("th", { className: "col-interp", textContent: "comprehension_statut [INTERP]" }),
            el("th", { className: "col-interp", textContent: "confusion [INTERP]" }),
            el("th", { className: "col-interp", textContent: "largeur_percue [INTERP]" }),
            el("th", { className: "col-interp", textContent: "mono_composante [INTERP]" }),
            el("th", { className: "col-interp", textContent: "gravite [INTERP]" }),
            el("th", { className: "col-interp", textContent: "note_analytique [INTERP]" }),
            el("th", { className: "col-interp", textContent: "proposition_correction [INTERP]" }),
          ]),
        ]),
        el(
          "tbody",
          null,
          filtered.length === 0
            ? [
                el("tr", null, [
                  el("td", {
                    colspan: "17",
                    className: "muted",
                    textContent:
                      "Aucune observation pour le moment. Importez un JSON ou ajoutez une note ci-dessous.",
                  }),
                ]),
              ]
            : filtered.map(function (r) {
                const slot = ensureObsInterpSlot(r.rowKey);
                return el("tr", null, [
                  el("td", { className: "col-obs", textContent: r.participant_id }),
                  el("td", { className: "col-obs", textContent: r.variante }),
                  el("td", { className: "col-obs", textContent: r.domaine }),
                  el("td", { className: "col-obs", textContent: r.serie }),
                  el("td", { className: "col-obs", textContent: r.comportement_passation_OBS }),
                  el("td", { className: "col-obs", textContent: r.comprehension_spontanee_OBS }),
                  el("td", { className: "col-obs", textContent: r.sujet_principal_evoque_OBS }),
                  el("td", { className: "col-obs", textContent: r.perimetre_percu_OBS }),
                  el("td", { className: "col-obs", textContent: r.difficulte_lexicale_OBS }),
                  el("td", { className: "col-obs", textContent: r.verbatim_OBS }),
                  el("td", { className: "col-interp" }, [
                    makeSelectCell(
                      Data.L17_ENUMS.comprehension_statut,
                      slot.comprehension_statut_INTERP,
                      function (v) {
                        slot.comprehension_statut_INTERP = v;
                      },
                    ),
                  ]),
                  el("td", { className: "col-interp" }, [
                    makeInputCell(slot.confusion_INTERP, "Aucune / DOM-XX -> DOM-YY", function (v) {
                      slot.confusion_INTERP = v;
                    }),
                  ]),
                  el("td", { className: "col-interp" }, [
                    makeSelectCell(
                      Data.L17_ENUMS.largeur_percue,
                      slot.largeur_percue_INTERP,
                      function (v) {
                        slot.largeur_percue_INTERP = v;
                      },
                    ),
                  ]),
                  el("td", { className: "col-interp" }, [
                    makeSelectCell(
                      Data.L17_ENUMS.selection_mono_composante,
                      slot.selection_mono_composante_INTERP,
                      function (v) {
                        slot.selection_mono_composante_INTERP = v;
                      },
                    ),
                  ]),
                  el("td", { className: "col-interp" }, [
                    makeSelectCell(Data.L17_ENUMS.gravite, slot.gravite_INTERP, function (v) {
                      slot.gravite_INTERP = v;
                    }),
                  ]),
                  el("td", { className: "col-interp" }, [
                    makeInputCell(
                      slot.note_analytique_INTERP,
                      "Hypothèse analytique",
                      function (v) {
                        slot.note_analytique_INTERP = v;
                      },
                    ),
                  ]),
                  el("td", { className: "col-interp" }, [
                    makeInputCell(
                      slot.proposition_correction_INTERP,
                      "Action / Aucune",
                      function (v) {
                        slot.proposition_correction_INTERP = v;
                      },
                    ),
                  ]),
                ]);
              }),
        ),
      ]),
    );
    panel.appendChild(wrap);

    // Formulaire d'ajout d'une ligne [OBS] manuelle (notes complémentaires d'entretien)
    const d = state.manualDraft;
    const addForm = el("details", { style: "margin-top:1rem;" }, [
      el("summary", {
        style: "cursor:pointer; font-weight:700;",
        textContent: "+ Ajouter une observation manuelle [OBS] (note complémentaire hors JSON)",
      }),
      el("div", { className: "card card-muted", style: "margin-top:0.75rem;" }, [
        el("div", { className: "grid-3" }, [
          el("div", { className: "field" }, [
            el("label", { for: "m-pid", textContent: "participant_id" }),
            el("input", {
              id: "m-pid",
              type: "text",
              className: "input",
              value: d.participant_id,
              placeholder: "Ex. P01 ou DR-A1",
              onInput: function (e) {
                d.participant_id = e.target.value;
              },
            }),
          ]),
          el("div", { className: "field" }, [
            el("label", { for: "m-var", textContent: "variante" }),
            el(
              "select",
              {
                id: "m-var",
                className: "select",
                onChange: function (e) {
                  d.variante = e.target.value;
                },
              },
              ["A", "B"].map(function (opt) {
                return el("option", { value: opt, selected: d.variante === opt, textContent: opt });
              }),
            ),
          ]),
          el("div", { className: "field" }, [
            el("label", { for: "m-dom", textContent: "domaine" }),
            el(
              "select",
              {
                id: "m-dom",
                className: "select",
                onChange: function (e) {
                  d.domaine = e.target.value;
                },
              },
              Data.DOMAINS.map(function (dom) {
                return el("option", {
                  value: dom.id,
                  selected: d.domaine === dom.id,
                  textContent: dom.id,
                });
              }).concat([
                el("option", {
                  value: "TRANS",
                  selected: d.domaine === "TRANS",
                  textContent: "TRANS",
                }),
              ]),
            ),
          ]),
          el("div", { className: "field" }, [
            el("label", { for: "m-ser", textContent: "serie / phase" }),
            el(
              "select",
              {
                id: "m-ser",
                className: "select",
                onChange: function (e) {
                  d.serie = e.target.value;
                },
              },
              [
                "Panorama",
                "S1",
                "S2",
                "S3",
                "S4",
                "S5",
                "S6",
                "S7",
                "S8",
                "Debriefing_D",
                "Lexical_E",
                "Cloture_F",
              ].map(function (opt) {
                return el("option", { value: opt, selected: d.serie === opt, textContent: opt });
              }),
            ),
          ]),
          el("div", { className: "field" }, [
            el("label", { for: "m-comp", textContent: "comportement_passation_OBS" }),
            el("input", {
              id: "m-comp",
              type: "text",
              className: "input",
              value: d.comportement_passation_OBS,
              onInput: function (e) {
                d.comportement_passation_OBS = e.target.value;
              },
            }),
          ]),
          el("div", { className: "field" }, [
            el("label", { for: "m-verb", textContent: "verbatim_OBS" }),
            el("input", {
              id: "m-verb",
              type: "text",
              className: "input",
              value: d.verbatim_OBS,
              onInput: function (e) {
                d.verbatim_OBS = e.target.value;
              },
            }),
          ]),
        ]),
        el("button", {
          type: "button",
          className: "btn btn-primary",
          textContent: "Ajouter cette ligne [OBS]",
          onClick: function () {
            if (!d.participant_id.trim()) {
              state.errorMessage = "Indiquez un participant_id pour ajouter une ligne manuelle.";
              render();
              return;
            }
            state.interpState.manualObservationRows.push({
              rowKey: "MANUAL::" + Date.now() + "::" + Math.random().toString(16).slice(2, 6),
              participant_id: d.participant_id.trim(),
              variante: d.variante,
              domaine: d.domaine,
              serie: d.serie,
              comportement_passation_OBS: d.comportement_passation_OBS,
              comprehension_spontanee_OBS: d.comprehension_spontanee_OBS,
              sujet_principal_evoque_OBS: d.sujet_principal_evoque_OBS,
              perimetre_percu_OBS: d.perimetre_percu_OBS,
              difficulte_lexicale_OBS: d.difficulte_lexicale_OBS,
              verbatim_OBS: d.verbatim_OBS,
            });
            d.comportement_passation_OBS = "";
            d.verbatim_OBS = "";
            state.errorMessage = "";
            render();
          },
        }),
      ]),
    ]);
    panel.appendChild(addForm);
  }

  function renderTab2(panel, rows) {
    const wrap = el("div", { className: "table-wrap" });
    wrap.appendChild(
      el("table", null, [
        el("thead", null, [
          el(
            "tr",
            null,
            ExportL17.TAB2_HEADERS.map(function (h) {
              return el("th", {
                className: h.endsWith("_INTERP") ? "col-interp" : "col-obs",
                textContent: h,
              });
            }),
          ),
        ]),
        el(
          "tbody",
          null,
          rows.length === 0
            ? [
                el("tr", null, [
                  el("td", {
                    colspan: String(ExportL17.TAB2_HEADERS.length),
                    className: "muted",
                    textContent: "Aucune session importée.",
                  }),
                ]),
              ]
            : rows.map(function (r) {
                if (!state.interpState.participantInterps[r.participant_id]) {
                  state.interpState.participantInterps[r.participant_id] = {
                    domaines_problematiques_INTERP: "",
                    notes_synthese_participant_INTERP: "",
                  };
                }
                const slot = state.interpState.participantInterps[r.participant_id];
                return el(
                  "tr",
                  null,
                  ExportL17.TAB2_HEADERS.map(function (h) {
                    if (h === "domaines_problematiques_INTERP") {
                      return el("td", { className: "col-interp" }, [
                        makeInputCell(slot.domaines_problematiques_INTERP, "DOM-XX", function (v) {
                          slot.domaines_problematiques_INTERP = v;
                        }),
                      ]);
                    }
                    if (h === "notes_synthese_participant_INTERP") {
                      return el("td", { className: "col-interp" }, [
                        makeInputCell(
                          slot.notes_synthese_participant_INTERP,
                          "Synthèse",
                          function (v) {
                            slot.notes_synthese_participant_INTERP = v;
                          },
                        ),
                      ]);
                    }
                    return el("td", { className: "col-obs", textContent: String(r[h] || "") });
                  }),
                );
              }),
        ),
      ]),
    );
    panel.appendChild(wrap);
  }

  function renderTab3(panel, rows) {
    const wrap = el("div", { className: "table-wrap" });
    wrap.appendChild(
      el("table", null, [
        el("thead", null, [
          el(
            "tr",
            null,
            ExportL17.TAB3_HEADERS.map(function (h) {
              return el("th", {
                className: h.endsWith("_INTERP") ? "col-interp" : "col-obs",
                textContent: h,
              });
            }),
          ),
        ]),
        el(
          "tbody",
          null,
          rows.length === 0
            ? [
                el("tr", null, [
                  el("td", {
                    colspan: String(ExportL17.TAB3_HEADERS.length),
                    className: "muted",
                    textContent: "Aucune session importée.",
                  }),
                ]),
              ]
            : rows.map(function (r) {
                if (!state.interpState.lexicalInterps[r.rowKey]) {
                  state.interpState.lexicalInterps[r.rowKey] = {
                    synthese_analytique_INTERP: "",
                  };
                }
                const slot = state.interpState.lexicalInterps[r.rowKey];
                return el(
                  "tr",
                  null,
                  ExportL17.TAB3_HEADERS.map(function (h) {
                    if (h === "synthese_analytique_INTERP") {
                      return el("td", { className: "col-interp" }, [
                        makeInputCell(
                          slot.synthese_analytique_INTERP,
                          "Synthèse lexicale",
                          function (v) {
                            slot.synthese_analytique_INTERP = v;
                          },
                        ),
                      ]);
                    }
                    return el("td", { className: "col-obs", textContent: String(r[h] || "") });
                  }),
                );
              }),
        ),
      ]),
    );
    panel.appendChild(wrap);
  }

  function renderTab4(panel, rows) {
    const wrap = el("div", { className: "table-wrap" });
    wrap.appendChild(
      el("table", null, [
        el("thead", null, [
          el(
            "tr",
            null,
            ExportL17.TAB4_HEADERS.map(function (h) {
              return el("th", {
                className: h.endsWith("_INTERP") ? "col-interp" : "col-obs",
                textContent: h,
              });
            }),
          ),
        ]),
        el(
          "tbody",
          null,
          rows.map(function (r) {
            return el(
              "tr",
              null,
              ExportL17.TAB4_HEADERS.map(function (h) {
                if (h === "decision_edito_proposee_INTERP") {
                  return el("td", { className: "col-interp" }, [
                    makeInputCell(
                      state.interpState.domainDecisions[r.domaine] || "",
                      "Décision éditoriale proposée",
                      function (v) {
                        state.interpState.domainDecisions[r.domaine] = v;
                      },
                    ),
                  ]);
                }
                return el("td", {
                  className: h.endsWith("_INTERP") ? "col-interp" : "col-obs",
                  textContent: String(r[h] !== undefined ? r[h] : ""),
                });
              }),
            );
          }),
        ),
      ]),
    );
    panel.appendChild(wrap);
  }

  function render() {
    const dataset = ExportL17.buildL17Dataset(state.sessions, state.interpState);
    const main = document.getElementById("analyst-main");
    if (!main) {
      return;
    }
    main.textContent = "";
    renderImportSection(main, dataset);
    renderTabsSection(main, dataset);

    const clearBtn = document.getElementById("analyst-clear-btn");
    if (clearBtn) {
      clearBtn.onclick = function () {
        if (window.confirm("Effacer toutes les sessions et annotations en mémoire ?")) {
          state = createInitialState();
          render();
        }
      };
    }
  }

  document.addEventListener("DOMContentLoaded", render);
})();
