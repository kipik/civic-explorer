(function (root, factory) {
  const api = factory(root.CivicPretestData);
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.CivicPretestMaxDiff = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (Data) {
  "use strict";

  const DOMAIN_IDS = Data.DOMAINS.map(function (domain) {
    return domain.id;
  });

  function createSeededRng(seedInput) {
    let state = Number(seedInput) >>> 0;
    return function nextFloat() {
      state = (state + 0x6d2b79f5) | 0;
      let t = Math.imul(state ^ (state >>> 15), 1 | state);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffleWithRng(array, rng) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  /**
   * Génère une instance MaxDiff N = 8, b = 8, k = 4, r = 4 selon pi x tau x D_8
   * et un ordre aléatoire rho dans S_8 pour le Panorama / Périmètre complet.
   */
  function generateDihedralInstance(options) {
    const opts = options || {};
    const seedDihedral = Number.isFinite(Number(opts.seedDihedral))
      ? Math.trunc(Number(opts.seedDihedral))
      : 20261110;
    const seedRho = Number.isFinite(Number(opts.seedRho))
      ? Math.trunc(Number(opts.seedRho))
      : seedDihedral + 100;

    const rngDihedral = createSeededRng(seedDihedral);
    const pi = shuffleWithRng(DOMAIN_IDS, rngDihedral);
    const tau = shuffleWithRng([0, 1, 2, 3], rngDihedral);
    const shift = Math.floor(rngDihedral() * 8);
    const reverse = rngDihedral() >= 0.5;

    const orderedBlockIndices = [];
    for (let idx = 0; idx < 8; idx += 1) {
      const blockIdx = reverse ? (shift - idx + 8) % 8 : (shift + idx) % 8;
      orderedBlockIndices.push(blockIdx);
    }

    const blocks = orderedBlockIndices.map(function (bIdx) {
      const baseBlock = Data.CANONICAL_N8_BLOCKS[bIdx];
      return tau.map(function (posIdx) {
        return pi[baseBlock[posIdx]];
      });
    });

    const rngRho = createSeededRng(seedRho);
    const rhoOrder = shuffleWithRng(DOMAIN_IDS, rngRho);
    const lexicalSideOrder = buildLexicalSideOrder(seedRho + 1000);

    return {
      instanceId: opts.instanceId || "SEED-" + String(seedDihedral >>> 0),
      seedDihedral: seedDihedral,
      seedRho: seedRho,
      rhoOrder: rhoOrder,
      blocks: blocks,
      lexicalSideOrder: lexicalSideOrder,
    };
  }

  function buildLexicalSideOrder(seed) {
    const rng = createSeededRng(seed);
    return Data.LEXICAL_PAIRS.map(function (pair) {
      const variantFirst = rng() >= 0.5;
      return {
        pairId: pair.pairId,
        domainId: pair.domainId,
        variantCode: pair.variantCode,
        formulation1Source: variantFirst ? "variant" : "reference",
        formulation2Source: variantFirst ? "reference" : "variant",
      };
    });
  }

  function getPresetInstance(presetId) {
    const preset = Data.PRESET_INSTANCES[presetId];
    if (!preset) {
      throw new Error("Instance prédéfinie inconnue : " + String(presetId));
    }
    return {
      instanceId: preset.id,
      seedDihedral: preset.seedDihedral,
      seedRho: preset.seedRho,
      rhoOrder: preset.rhoOrder.slice(),
      blocks: preset.blocks.map(function (blk) {
        return blk.slice();
      }),
      lexicalSideOrder: buildLexicalSideOrder(preset.seedRho + 1000),
    };
  }

  /**
   * Vérifie tous les invariants combinatoires du plan N = 8, b = 8, k = 4, r = 4.
   */
  function evaluateDesignInvariants(blocks) {
    if (!Array.isArray(blocks) || blocks.length !== 8) {
      throw new Error("Le plan doit contenir exactement 8 séries.");
    }

    const freq = {};
    const posCounts = {};
    const pairCounts = {};

    DOMAIN_IDS.forEach(function (id) {
      freq[id] = 0;
      posCounts[id] = [0, 0, 0, 0];
    });

    for (let i = 0; i < DOMAIN_IDS.length; i += 1) {
      for (let j = i + 1; j < DOMAIN_IDS.length; j += 1) {
        pairCounts[DOMAIN_IDS[i] + "|" + DOMAIN_IDS[j]] = 0;
      }
    }

    let intraBlockUnique = true;
    const blockSets = [];

    blocks.forEach(function (blk) {
      if (!Array.isArray(blk) || blk.length !== 4) {
        throw new Error("Chaque série doit contenir exactement 4 domaines.");
      }
      const unique = new Set(blk);
      if (unique.size !== 4) {
        intraBlockUnique = false;
      }
      blk.forEach(function (domainId, posIdx) {
        if (!Object.prototype.hasOwnProperty.call(freq, domainId)) {
          throw new Error("Domaine inconnu dans le plan : " + String(domainId));
        }
        freq[domainId] += 1;
        posCounts[domainId][posIdx] += 1;
      });
      const sorted = blk.slice().sort();
      blockSets.push(sorted.join("|"));
      for (let i = 0; i < sorted.length; i += 1) {
        for (let j = i + 1; j < sorted.length; j += 1) {
          const key = sorted[i] + "|" + sorted[j];
          pairCounts[key] += 1;
        }
      }
    });

    const duplicateBlockCount = blockSets.length - new Set(blockSets).size;

    const uniformFrequencyR4 = DOMAIN_IDS.every(function (id) {
      return freq[id] === 4;
    });

    const positionBalanceExact = DOMAIN_IDS.every(function (id) {
      return posCounts[id].every(function (count) {
        return count === 1;
      });
    });

    const pairHistogram = {};
    let zeroPairCount = 0;
    Object.keys(pairCounts).forEach(function (key) {
      const c = pairCounts[key];
      if (c === 0) {
        zeroPairCount += 1;
      }
      const k = String(c);
      pairHistogram[k] = (pairHistogram[k] || 0) + 1;
    });

    function overlapBetween(blkA, blkB) {
      const setA = new Set(blkA);
      let count = 0;
      blkB.forEach(function (id) {
        if (setA.has(id)) {
          count += 1;
        }
      });
      return count;
    }

    const linearOverlaps = [];
    for (let i = 0; i < blocks.length - 1; i += 1) {
      linearOverlaps.push(overlapBetween(blocks[i], blocks[i + 1]));
    }
    const cyclicWrapOverlap = overlapBetween(blocks[blocks.length - 1], blocks[0]);
    const maxLinearOverlap = Math.max.apply(null, linearOverlaps);
    const maxCyclicOverlap = Math.max(maxLinearOverlap, cyclicWrapOverlap);

    return {
      intraBlockUnique: intraBlockUnique,
      duplicateBlockCount: duplicateBlockCount,
      uniformFrequencyR4: uniformFrequencyR4,
      positionBalanceExact: positionBalanceExact,
      zeroPairCount: zeroPairCount,
      pairHistogram: pairHistogram,
      linearOverlaps: linearOverlaps,
      cyclicWrapOverlap: cyclicWrapOverlap,
      maxLinearOverlap: maxLinearOverlap,
      maxCyclicOverlap: maxCyclicOverlap,
      allInvariantsValid:
        intraBlockUnique &&
        duplicateBlockCount === 0 &&
        uniformFrequencyR4 &&
        positionBalanceExact &&
        zeroPairCount === 0 &&
        maxLinearOverlap === 1 &&
        cyclicWrapOverlap === 1,
    };
  }

  /**
   * Calcule uniquement les comptes descriptifs factuels (aucun score B - W ni classement).
   */
  function computeDescriptiveCounts(blocks, responses) {
    const byDomain = {};
    DOMAIN_IDS.forEach(function (id) {
      byDomain[id] = {
        domainId: id,
        totalPresentedCount: 0,
        answeredExposures: 0,
        bestCount: 0,
        worstCount: 0,
        neitherBestNorWorstCount: 0,
      };
    });

    const statusCounts = {
      answered: 0,
      skipped: 0,
      dont_know: 0,
      no_distinguishable_best_worst: 0,
      incomplete: 0,
    };

    blocks.forEach(function (blk, idx) {
      const resp = (responses && responses[idx]) || { status: "incomplete" };
      blk.forEach(function (id) {
        byDomain[id].totalPresentedCount += 1;
      });

      if (
        resp.status === "answered" &&
        resp.bestDomainId &&
        resp.worstDomainId &&
        resp.bestDomainId !== resp.worstDomainId &&
        blk.includes(resp.bestDomainId) &&
        blk.includes(resp.worstDomainId)
      ) {
        statusCounts.answered += 1;
        blk.forEach(function (id) {
          byDomain[id].answeredExposures += 1;
          if (id === resp.bestDomainId) {
            byDomain[id].bestCount += 1;
          } else if (id === resp.worstDomainId) {
            byDomain[id].worstCount += 1;
          } else {
            byDomain[id].neitherBestNorWorstCount += 1;
          }
        });
      } else if (
        resp.status === "skipped" ||
        resp.status === "dont_know" ||
        resp.status === "no_distinguishable_best_worst"
      ) {
        statusCounts[resp.status] += 1;
      } else {
        statusCounts.incomplete += 1;
      }
    });

    return {
      byDomain: byDomain,
      statusCounts: statusCounts,
    };
  }

  /**
   * Sélectionne 3 à 4 cartes effectivement choisies en MaxDiff pour le recueil
   * des raisons (Séquence 6 / D.1), en priorisant DOM-01, 02, 06, 07, 08 et au moins une carte « Pourrait attendre ».
   */
  function selectDebriefTargetCards(blocks, responses) {
    const bestCandidates = [];
    const worstCandidates = [];
    const seenBest = new Set();
    const seenWorst = new Set();

    blocks.forEach(function (blk, idx) {
      const resp = responses && responses[idx];
      if (!resp || resp.status !== "answered") {
        return;
      }
      if (
        resp.bestDomainId &&
        blk.includes(resp.bestDomainId) &&
        !seenBest.has(resp.bestDomainId)
      ) {
        seenBest.add(resp.bestDomainId);
        bestCandidates.push({
          domainId: resp.bestDomainId,
          role: "best",
          seriesIndex: idx + 1,
          priority: Data.DOMAIN_MAP[resp.bestDomainId].priorityInDebrief ? 0 : 1,
        });
      }
      if (
        resp.worstDomainId &&
        blk.includes(resp.worstDomainId) &&
        !seenWorst.has(resp.worstDomainId)
      ) {
        seenWorst.add(resp.worstDomainId);
        worstCandidates.push({
          domainId: resp.worstDomainId,
          role: "worst",
          seriesIndex: idx + 1,
          priority: Data.DOMAIN_MAP[resp.worstDomainId].priorityInDebrief ? 0 : 1,
        });
      }
    });

    bestCandidates.sort(function (a, b) {
      return a.priority - b.priority || a.seriesIndex - b.seriesIndex;
    });
    worstCandidates.sort(function (a, b) {
      return a.priority - b.priority || a.seriesIndex - b.seriesIndex;
    });

    const selected = [];
    const pickedDomainIds = new Set();

    bestCandidates.forEach(function (cand) {
      if (selected.length < 3 && !pickedDomainIds.has(cand.domainId)) {
        selected.push(cand);
        pickedDomainIds.add(cand.domainId);
      }
    });

    worstCandidates.forEach(function (cand) {
      if (selected.length < 4 && !pickedDomainIds.has(cand.domainId)) {
        selected.push(cand);
        pickedDomainIds.add(cand.domainId);
      }
    });

    // Complément si moins de 3 cartes uniques trouvées
    bestCandidates.concat(worstCandidates).forEach(function (cand) {
      if (selected.length < 3 && !pickedDomainIds.has(cand.domainId)) {
        selected.push(cand);
        pickedDomainIds.add(cand.domainId);
      }
    });

    return selected;
  }

  return {
    createSeededRng: createSeededRng,
    shuffleWithRng: shuffleWithRng,
    generateDihedralInstance: generateDihedralInstance,
    getPresetInstance: getPresetInstance,
    evaluateDesignInvariants: evaluateDesignInvariants,
    computeDescriptiveCounts: computeDescriptiveCounts,
    selectDebriefTargetCards: selectDebriefTargetCards,
  };
});
