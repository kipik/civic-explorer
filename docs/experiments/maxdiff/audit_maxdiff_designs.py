#!/usr/bin/env python3
"""
Audit et génération reproductible des plans expérimentaux MaxDiff (Case 1)
pour N = 6 à 13 items, k = 4 items par bloc, b = N blocs, r = 4 présentations par item.

Vérifie :
- Faisabilité BIBD exacte pour b = N et borne minimale b_min pour un BIBD exact (k = 4) ;
- Constructions exactes (N = 7, 13) et quasi équilibrées optimales (N = 6, 8, 9, 10, 11, 12) ;
- Comparaison de fonctions objectif (Variance, Minimax, D-optimalité) et sensibilité ;
- Matrice des cooccurrences, connectivité du graphe, blocs dupliqués ;
- Décomposition exacte en 4 appariements parfaits pour l'équilibre [1,1,1,1] des positions ;
- Chevauchement entre blocs consécutifs ;
- Erreurs-types asymptotiques (Fisher Information sous H0 : beta = 0) pour r = 4 ;
- Test Monte Carlo (1 000 graines) : randomisation contrôlée vs randomisation naïve par bloc.

Usage:
    python docs/experiments/maxdiff/audit_maxdiff_designs.py

Dépendances : bibliothèque standard Python uniquement (aucune dépendance externe).
"""

from __future__ import annotations

import csv
import itertools
import json
import math
import random
from dataclasses import dataclass
from pathlib import Path
from typing import Sequence

OUTPUT_DIR = Path(__file__).resolve().parent
SEED_BASE = 20261110
K_BLOCK_SIZE = 4
R_REPS = 4


@dataclass(frozen=True)
class DesignMetrics:
    n_items: int
    n_blocks: int
    block_size: int
    reps_per_item: int
    bibd_lambda_ideal: float
    bibd_exact_feasible: bool
    bibd_feasibility_reason: str
    bibd_min_blocks_if_r_free: int
    bibd_min_reps_if_r_free: int
    item_frequencies: tuple[int, ...]
    item_freq_uniform: bool
    cooccurrence_matrix: tuple[tuple[int, ...], ...]
    pair_frequencies: tuple[int, ...]
    pair_histogram: dict[int, int]
    pair_min: int
    pair_max: int
    pair_range: int
    pair_mean: float
    pair_variance_pop: float
    pair_std_pop: float
    zero_pair_count: int
    theoretical_min_variance: float
    theoretical_min_range: int
    theoretical_min_zero_pairs: int
    is_globally_optimal_variance: bool
    connected_components: int
    is_connected: bool
    duplicate_block_count: int
    position_matrix: tuple[tuple[int, ...], ...]
    position_balance_exact: bool
    laplacian_positive_eigenvalues: tuple[float, ...]
    algebraic_connectivity: float
    d_efficiency_vs_ideal: float
    fisher_se_min: float
    fisher_se_mean: float
    fisher_se_max: float
    max_consecutive_overlap: int
    mean_consecutive_overlap: float
    cyclic_wrap_overlap: int
    max_cyclic_consecutive_overlap: int
    intra_block_unique: bool


def min_bibd_params_for_k4(n: int) -> tuple[int, int]:
    """
    Calcule le plus petit (b, r) satisfaisant les conditions arithmétiques nécessaires d'un BIBD
    à blocs de taille k = 4 sur n items :
      r * 3 = lambda * (n - 1)  et  b * 4 = n * r  (avec b >= n par inégalité de Fisher).
    """
    lam = 1
    while True:
        if (lam * (n - 1)) % 3 == 0:
            r = (lam * (n - 1)) // 3
            if (n * r) % 4 == 0:
                b = (n * r) // 4
                if b >= n:
                    return b, r
        lam += 1


def compute_theoretical_pair_bounds(n: int, b: int, k: int) -> tuple[float, int, int]:
    """Calcule les bornes inférieures théoriques (même si non réalisables) pour sum(lambda_ij) = b*C(k,2)."""
    num_pairs = n * (n - 1) // 2
    total_pair_hits = b * (k * (k - 1) // 2)
    low = total_pair_hits // num_pairs
    rem = total_pair_hits % num_pairs
    high = low + 1 if rem > 0 else low
    mean = total_pair_hits / num_pairs
    min_var = (
        (num_pairs - rem) * ((low - mean) ** 2) + rem * ((high - mean) ** 2)
    ) / num_pairs
    min_range = high - low
    min_zeros = (num_pairs - rem) if low == 0 else 0
    return min_var, min_range, min_zeros


def jacobi_symmetric_eigenvalues(
    matrix: Sequence[Sequence[float]], tol: float = 1e-11, max_iter: int = 5000
) -> list[float]:
    """Calcule toutes les valeurs propres d'une matrice symétrique réelle par rotations de Jacobi."""
    n = len(matrix)
    a = [[float(matrix[i][j]) for j in range(n)] for i in range(n)]
    for _ in range(max_iter):
        max_val = 0.0
        p, q = 0, 1
        for i in range(n):
            for j in range(i + 1, n):
                val = abs(a[i][j])
                if val > max_val:
                    max_val = val
                    p, q = i, j
        if max_val < tol:
            break
        app = a[p][p]
        aqq = a[q][q]
        apq = a[p][q]
        if abs(app - aqq) < 1e-15:
            theta = math.pi / 4.0
        else:
            theta = 0.5 * math.atan2(2.0 * apq, aqq - app)
        c = math.cos(theta)
        s = math.sin(theta)
        for i in range(n):
            if i != p and i != q:
                aip = a[i][p]
                aiq = a[i][q]
                a[i][p] = c * aip - s * aiq
                a[p][i] = a[i][p]
                a[i][q] = s * aip + c * aiq
                a[q][i] = a[i][q]
        a[p][p] = c * c * app - 2.0 * s * c * apq + s * s * aqq
        a[q][q] = s * s * app + 2.0 * s * c * apq + c * c * aqq
        a[p][q] = 0.0
        a[q][p] = 0.0
    return sorted(a[i][i] for i in range(n))


def invert_symmetric_matrix(mat: Sequence[Sequence[float]]) -> list[list[float]]:
    """Inverse une matrice symétrique définie positive par Gauss-Jordan."""
    n = len(mat)
    aug = [
        [float(mat[i][j]) for j in range(n)] + [1.0 if i == j else 0.0 for j in range(n)]
        for i in range(n)
    ]
    for col in range(n):
        pivot = max(range(col, n), key=lambda r: abs(aug[r][col]))
        if abs(aug[pivot][col]) < 1e-12:
            raise ValueError("Matrice singulière.")
        aug[col], aug[pivot] = aug[pivot], aug[col]
        div = aug[col][col]
        for j in range(2 * n):
            aug[col][j] /= div
        for r in range(n):
            if r != col and abs(aug[r][col]) > 1e-15:
                factor = aug[r][col]
                for j in range(2 * n):
                    aug[r][j] -= factor * aug[col][j]
    return [row[n:] for row in aug]


def compute_fisher_pairwise_se(laplacian: Sequence[Sequence[float]]) -> tuple[float, float, float]:
    """
    Pour le modèle logit conjoint BWS Case 1 (Marley & Louviere 2005) à beta = 0 :
      I(0) = (2 / (k * (k - 1))) * L_Lambda = (1 / 6) * L_Lambda (pour k = 4).
    En fixant beta_{N-1} = 0 (identifiabilité), calcule le min, la moyenne et le max
    des erreurs-types asymptotiques SE(beta_i - beta_j) sur toutes les paires (i < j).
    """
    n = len(laplacian)
    scale = 2.0 / (K_BLOCK_SIZE * (K_BLOCK_SIZE - 1))  # 1/6 pour k=4
    red = [[scale * laplacian[i][j] for j in range(n - 1)] for i in range(n - 1)]
    cov_red = invert_symmetric_matrix(red)
    cov_full = [[0.0] * n for _ in range(n)]
    for i in range(n - 1):
        for j in range(n - 1):
            cov_full[i][j] = cov_red[i][j]

    ses: list[float] = []
    for i in range(n):
        for j in range(i + 1, n):
            var_diff = cov_full[i][i] + cov_full[j][j] - 2.0 * cov_full[i][j]
            ses.append(math.sqrt(max(0.0, var_diff)))
    return min(ses), sum(ses) / len(ses), max(ses)


def find_perfect_matching(adj: dict[int, list[int]], left_nodes: list[int]) -> dict[int, int]:
    """Appariement maximum dans un graphe biparti par chemins augmentants (Kuhn)."""
    match_right: dict[int, int] = {}

    def dfs(u: int, visited: set[int]) -> bool:
        for v in adj[u]:
            if v in visited:
                continue
            visited.add(v)
            if v not in match_right or dfs(match_right[v], visited):
                match_right[v] = u
                return True
        return False

    for u in left_nodes:
        dfs(u, set())
    return {u: v for v, u in match_right.items()}


def decompose_positions_exact(blocks: Sequence[Sequence[int]], n: int) -> list[list[int]]:
    """
    Décompose le graphe biparti d'incidence (n items x n blocs, 4-régulier) en 4 appariements parfaits
    afin d'assigner chaque item exactement 1 fois à chacune des 4 positions.
    """
    remaining_adj: dict[int, list[int]] = {i: [] for i in range(n)}
    for b_idx, blk in enumerate(blocks):
        if len(blk) != K_BLOCK_SIZE or len(set(blk)) != K_BLOCK_SIZE:
            raise ValueError(f"Bloc invalide {b_idx}: {blk}")
        for item in blk:
            remaining_adj[item].append(b_idx)

    for item, blks in remaining_adj.items():
        if len(blks) != R_REPS:
            raise ValueError(f"Item {item} n'apparaît pas exactement {R_REPS} fois ({len(blks)}).")

    positioned_blocks: list[list[int]] = [[-1] * K_BLOCK_SIZE for _ in range(len(blocks))]
    items_list = list(range(n))

    for pos in range(K_BLOCK_SIZE):
        matching = find_perfect_matching(remaining_adj, items_list)
        if len(matching) != n:
            raise RuntimeError(f"Échec de décomposition en appariement parfait à la position {pos}.")
        for item, b_idx in matching.items():
            positioned_blocks[b_idx][pos] = item
            remaining_adj[item].remove(b_idx)

    return positioned_blocks


def optimize_block_order(positioned_blocks: Sequence[Sequence[int]]) -> list[list[int]]:
    """Ordonne les blocs pour minimiser le chevauchement maximal puis moyen entre blocs consécutifs."""
    n_blocks = len(positioned_blocks)
    sets = [set(blk) for blk in positioned_blocks]

    if n_blocks <= 8:
        best_order: list[int] | None = None
        best_score = (999, 999)
        used = [False] * n_blocks
        path: list[int] = []

        def backtrack(cur_max: int, cur_sum: int) -> None:
            nonlocal best_order, best_score
            if (cur_max, cur_sum) >= best_score:
                return
            if len(path) == n_blocks:
                best_score = (cur_max, cur_sum)
                best_order = path.copy()
                return
            last_set = sets[path[-1]] if path else None
            candidates = list(range(n_blocks))
            if last_set is not None:
                candidates.sort(key=lambda idx: len(last_set & sets[idx]))
            for nxt in candidates:
                if used[nxt]:
                    continue
                overlap = len(last_set & sets[nxt]) if last_set is not None else 0
                used[nxt] = True
                path.append(nxt)
                backtrack(max(cur_max, overlap), cur_sum + overlap)
                path.pop()
                used[nxt] = False

        backtrack(0, 0)
        assert best_order is not None
        return [list(positioned_blocks[i]) for i in best_order]

    rng = random.Random(SEED_BASE + n_blocks)
    best_order = list(range(n_blocks))

    def score_order(order: Sequence[int]) -> tuple[int, int, int]:
        overlaps = [len(sets[order[i]] & sets[order[i + 1]]) for i in range(len(order) - 1)]
        two_step = [len(sets[order[i]] & sets[order[i + 2]]) for i in range(len(order) - 2)]
        return (max(overlaps), sum(overlaps), sum(two_step))

    best_score = score_order(best_order)
    for start in range(n_blocks):
        rem = set(range(n_blocks)) - {start}
        order = [start]
        while rem:
            last = order[-1]
            nxt = min(rem, key=lambda c: (len(sets[last] & sets[c]), c))
            order.append(nxt)
            rem.remove(nxt)
        improved = True
        while improved:
            improved = False
            cur_s = score_order(order)
            for i in range(n_blocks):
                for j in range(i + 1, n_blocks):
                    cand = order.copy()
                    cand[i], cand[j] = cand[j], cand[i]
                    cs = score_order(cand)
                    if cs < cur_s:
                        order = cand
                        cur_s = cs
                        improved = True
        if cur_s < best_score:
            best_score = cur_s
            best_order = order

    for _ in range(200):
        order = list(range(n_blocks))
        rng.shuffle(order)
        cur_s = score_order(order)
        improved = True
        while improved:
            improved = False
            for i in range(n_blocks):
                for j in range(i + 1, n_blocks):
                    cand = order.copy()
                    cand[i], cand[j] = cand[j], cand[i]
                    cs = score_order(cand)
                    if cs < cur_s:
                        order = cand
                        cur_s = cs
                        improved = True
        if cur_s < best_score:
            best_score = cur_s
            best_order = order

    return [list(positioned_blocks[i]) for i in best_order]


def evaluate_design(blocks: Sequence[Sequence[int]], n: int) -> DesignMetrics:
    b = len(blocks)
    item_freqs = [0] * n
    cooc = [[0] * n for _ in range(n)]
    pos_matrix = [[0] * K_BLOCK_SIZE for _ in range(n)]
    canonical_blocks: list[tuple[int, ...]] = []

    for blk in blocks:
        canonical_blocks.append(tuple(sorted(blk)))
        for pos, item in enumerate(blk):
            item_freqs[item] += 1
            pos_matrix[item][pos] += 1
        for i, j in itertools.combinations(blk, 2):
            cooc[i][j] += 1
            cooc[j][i] += 1

    pair_freqs = [cooc[i][j] for i in range(n) for j in range(i + 1, n)]
    hist: dict[int, int] = {}
    for val in pair_freqs:
        hist[val] = hist.get(val, 0) + 1
    hist = dict(sorted(hist.items()))

    num_pairs = len(pair_freqs)
    pair_mean = sum(pair_freqs) / num_pairs
    pair_var = sum((x - pair_mean) ** 2 for x in pair_freqs) / num_pairs
    pair_std = math.sqrt(pair_var)
    zero_count = sum(1 for x in pair_freqs if x == 0)

    visited = [False] * n
    components = 0
    for start in range(n):
        if visited[start]:
            continue
        components += 1
        queue = [start]
        visited[start] = True
        while queue:
            u = queue.pop()
            for v in range(n):
                if u != v and cooc[u][v] > 0 and not visited[v]:
                    visited[v] = True
                    queue.append(v)

    dup_count = len(canonical_blocks) - len(set(canonical_blocks))

    laplacian = [[0.0] * n for _ in range(n)]
    for i in range(n):
        deg = sum(cooc[i][j] for j in range(n) if j != i)
        laplacian[i][i] = float(deg)
        for j in range(n):
            if i != j:
                laplacian[i][j] = float(-cooc[i][j])

    eigs = jacobi_symmetric_eigenvalues(laplacian)
    pos_eigs = [round(e, 8) for e in eigs[1:]]
    alg_conn = pos_eigs[0] if pos_eigs else 0.0

    ideal_eig = (R_REPS * (K_BLOCK_SIZE - 1) * n) / (n - 1)
    if components == 1 and all(e > 1e-9 for e in pos_eigs):
        geom_mean = math.exp(sum(math.log(e) for e in pos_eigs) / (n - 1))
        d_eff = geom_mean / ideal_eig
        se_min, se_mean, se_max = compute_fisher_pairwise_se(laplacian)
    else:
        d_eff = 0.0
        se_min, se_mean, se_max = float("inf"), float("inf"), float("inf")

    overlaps = [
        len(set(blocks[idx]) & set(blocks[idx + 1])) for idx in range(len(blocks) - 1)
    ]
    max_ov = max(overlaps) if overlaps else 0
    mean_ov = (sum(overlaps) / len(overlaps)) if overlaps else 0.0
    cyclic_wrap_ov = len(set(blocks[-1]) & set(blocks[0])) if len(blocks) > 1 else 0
    max_cyclic_ov = max(max_ov, cyclic_wrap_ov)
    intra_unique = all(len(blk) == K_BLOCK_SIZE and len(set(blk)) == K_BLOCK_SIZE for blk in blocks)

    bibd_lambda = (R_REPS * (K_BLOCK_SIZE - 1)) / (n - 1)
    bibd_feasible = n in (7, 13)
    if n == 7:
        reason = "12 / (7 - 1) = 2 entier ; existe comme complément du plan de Fano PG(2,2)."
    elif n == 13:
        reason = "12 / (13 - 1) = 1 entier ; existe comme plan projectif PG(2,3)."
    else:
        reason = (
            f"Impossible avec b=N, r=4 : lambda = 12 / ({n} - 1) = {bibd_lambda:.4f} n'est pas entier "
            f"(diviseurs de 12 >= 3 : 3, 4, 6, 12 => N in {{4, 5, 7, 13}})."
        )

    b_min_bibd, r_min_bibd = min_bibd_params_for_k4(n)
    th_var, th_range, th_zeros = compute_theoretical_pair_bounds(n, b, K_BLOCK_SIZE)
    is_opt_var = abs(pair_var - th_var) < 1e-12
    pos_exact = all(row == [1, 1, 1, 1] for row in pos_matrix)

    return DesignMetrics(
        n_items=n,
        n_blocks=b,
        block_size=K_BLOCK_SIZE,
        reps_per_item=R_REPS,
        bibd_lambda_ideal=bibd_lambda,
        bibd_exact_feasible=bibd_feasible,
        bibd_feasibility_reason=reason,
        bibd_min_blocks_if_r_free=b_min_bibd,
        bibd_min_reps_if_r_free=r_min_bibd,
        item_frequencies=tuple(item_freqs),
        item_freq_uniform=all(f == R_REPS for f in item_freqs),
        cooccurrence_matrix=tuple(tuple(row) for row in cooc),
        pair_frequencies=tuple(pair_freqs),
        pair_histogram=hist,
        pair_min=min(pair_freqs),
        pair_max=max(pair_freqs),
        pair_range=max(pair_freqs) - min(pair_freqs),
        pair_mean=pair_mean,
        pair_variance_pop=pair_var,
        pair_std_pop=pair_std,
        zero_pair_count=zero_count,
        theoretical_min_variance=th_var,
        theoretical_min_range=th_range,
        theoretical_min_zero_pairs=th_zeros,
        is_globally_optimal_variance=is_opt_var,
        connected_components=components,
        is_connected=(components == 1),
        duplicate_block_count=dup_count,
        position_matrix=tuple(tuple(row) for row in pos_matrix),
        position_balance_exact=pos_exact,
        laplacian_positive_eigenvalues=tuple(pos_eigs),
        algebraic_connectivity=alg_conn,
        d_efficiency_vs_ideal=d_eff,
        fisher_se_min=se_min,
        fisher_se_mean=se_mean,
        fisher_se_max=se_max,
        max_consecutive_overlap=max_ov,
        mean_consecutive_overlap=mean_ov,
        cyclic_wrap_overlap=cyclic_wrap_ov,
        max_cyclic_consecutive_overlap=max_cyclic_ov,
        intra_block_unique=intra_unique,
    )


def build_cyclic_blocks(n: int, base_block: Sequence[int]) -> list[list[int]]:
    return [[(x + shift) % n for x in base_block] for shift in range(n)]


def search_best_cyclic_design(n: int) -> list[list[int]] | None:
    """Teste exhaustivement tous les blocs de base cycliques {0, a, b, c} mod n."""
    best_blocks: list[list[int]] | None = None
    best_key: tuple[float, ...] | None = None

    for a, b, c in itertools.combinations(range(1, n), 3):
        blocks = build_cyclic_blocks(n, (0, a, b, c))
        metrics = evaluate_design(blocks, n)
        key = (
            float(metrics.duplicate_block_count),
            float(metrics.zero_pair_count),
            round(metrics.pair_variance_pop, 12),
            float(metrics.pair_range),
            -round(metrics.d_efficiency_vs_ideal, 12),
        )
        if best_key is None or key < best_key:
            best_key = key
            best_blocks = blocks
    return best_blocks


def search_general_design(
    n: int,
    objective_mode: str,
    seed: int,
    restarts: int = 30,
    steps_per_restart: int = 3500,
) -> list[list[int]]:
    """
    Recherche d'un plan (N blocs de taille 4, r_i = 4 contrainte dure) par échanges 2-swaps
    préservant strictement la régularité r_i = 4 et |B_t| = 4.
    """
    rng = random.Random(seed)
    num_pairs = n * (n - 1) // 2
    mean_lam = (n * 6) / num_pairs

    def make_initial_blocks() -> list[list[int]]:
        while True:
            pool = [i for i in range(n) for _ in range(R_REPS)]
            rng.shuffle(pool)
            blocks = [pool[t * K_BLOCK_SIZE : (t + 1) * K_BLOCK_SIZE] for t in range(n)]
            ok = True
            for _ in range(200):
                bad_b = -1
                for idx, blk in enumerate(blocks):
                    if len(set(blk)) < K_BLOCK_SIZE:
                        bad_b = idx
                        break
                if bad_b == -1:
                    break
                blk = blocks[bad_b]
                dup_pos = -1
                seen = set()
                for p, val in enumerate(blk):
                    if val in seen:
                        dup_pos = p
                        break
                    seen.add(val)
                val_a = blk[dup_pos]
                swapped = False
                other_indices = list(range(n))
                rng.shuffle(other_indices)
                for ob in other_indices:
                    if ob == bad_b:
                        continue
                    for op in range(K_BLOCK_SIZE):
                        val_b = blocks[ob][op]
                        if val_b not in blk and val_a not in blocks[ob]:
                            blocks[bad_b][dup_pos] = val_b
                            blocks[ob][op] = val_a
                            swapped = True
                            break
                    if swapped:
                        break
                if not swapped:
                    ok = False
                    break
            if ok and all(len(set(b)) == K_BLOCK_SIZE for b in blocks):
                return [sorted(b) for b in blocks]

    def score_state(blocks: list[list[int]]) -> tuple[float, ...]:
        cooc = [[0] * n for _ in range(n)]
        canon = set()
        for blk in blocks:
            canon.add(tuple(sorted(blk)))
            for i, j in itertools.combinations(blk, 2):
                cooc[i][j] += 1
                cooc[j][i] += 1
        dups = len(blocks) - len(canon)
        freqs = [cooc[i][j] for i in range(n) for j in range(i + 1, n)]
        zeros = sum(1 for x in freqs if x == 0)
        sq_dev = sum((x - mean_lam) ** 2 for x in freqs)
        rng_val = max(freqs) - min(freqs)

        if objective_mode == "variance":
            return (float(dups), float(zeros), round(sq_dev, 10), float(rng_val))
        if objective_mode == "minimax":
            return (float(dups), float(zeros), float(rng_val), round(sq_dev, 10))
        if objective_mode == "weighted_1_10_100":
            # Somme pondérée explicite : 100*dups + 10*zeros + 1*sq_dev
            return (round(100.0 * dups + 10.0 * zeros + 1.0 * sq_dev, 10), float(rng_val))
        if objective_mode == "d_opt":
            lap = [[0.0] * n for _ in range(n)]
            for i in range(n):
                lap[i][i] = float(sum(cooc[i]))
                for j in range(n):
                    if i != j:
                        lap[i][j] = float(-cooc[i][j])
            eigs = jacobi_symmetric_eigenvalues(lap, tol=1e-7, max_iter=250)
            pos_eigs = eigs[1:]
            if any(e <= 1e-6 for e in pos_eigs):
                return (float(dups + 10), 1e9, round(sq_dev, 10))
            neg_log_det = -sum(math.log(e) for e in pos_eigs)
            return (float(dups), float(zeros), round(neg_log_det, 10))
        raise ValueError(objective_mode)

    global_best_blocks: list[list[int]] | None = None
    global_best_score: tuple[float, ...] | None = None

    effective_restarts = restarts if objective_mode != "d_opt" else 10
    effective_steps = steps_per_restart if objective_mode != "d_opt" else 1000

    for _ in range(effective_restarts):
        blocks = make_initial_blocks()
        cur_score = score_state(blocks)
        best_local_blocks = [b.copy() for b in blocks]
        best_local_score = cur_score

        for step in range(effective_steps):
            b1, b2 = rng.sample(range(n), 2)
            p1 = rng.randrange(K_BLOCK_SIZE)
            p2 = rng.randrange(K_BLOCK_SIZE)
            v1 = blocks[b1][p1]
            v2 = blocks[b2][p2]
            if v1 == v2 or v2 in blocks[b1] or v1 in blocks[b2]:
                continue

            blocks[b1][p1] = v2
            blocks[b2][p2] = v1
            new_score = score_state(blocks)

            temp = max(0.001, 0.5 * (1.0 - step / effective_steps))
            accept = new_score <= cur_score
            if not accept and new_score[:-1] == cur_score[:-1]:
                delta = new_score[-1] - cur_score[-1]
                if delta < 2.0 and rng.random() < math.exp(-delta / temp):
                    accept = True

            if accept:
                cur_score = new_score
                if new_score < best_local_score:
                    best_local_score = new_score
                    best_local_blocks = [b.copy() for b in blocks]
            else:
                blocks[b1][p1] = v1
                blocks[b2][p2] = v2

        if global_best_score is None or best_local_score < global_best_score:
            global_best_score = best_local_score
            global_best_blocks = [b.copy() for b in best_local_blocks]

    assert global_best_blocks is not None
    return global_best_blocks


def randomize_design_controlled(
    base_blocks: Sequence[Sequence[int]], n: int, rng: random.Random
) -> list[list[int]]:
    """
    Randomisation exploratoire (pi x tau x sigma dans S_N) :
    - Bijection aléatoire pi sur les identifiants d'items (0..n-1) ;
    - Permutation globale tau sur les 4 positions d'affichage (0..3) ;
    - Permutation arbitraire sigma (rng.shuffle) de l'ordre des blocs.

    Différence explicite avec `randomize_pilot_n8_dihedral` :
    Cette fonction préserve les fréquences r_i = 4, la matrice de cooccurrences (à isomorphisme près),
    l'absence de doublons et l'équilibre exact des positions [1,1,1,1], mais NE préserve PAS
    le chevauchement consécutif (`max_consecutive_overlap`) ni le bouclage cyclique B_N -> B_1.
    """
    pi = list(range(n))
    rng.shuffle(pi)
    tau = list(range(K_BLOCK_SIZE))
    rng.shuffle(tau)
    block_indices = list(range(len(base_blocks)))
    rng.shuffle(block_indices)

    randomized: list[list[int]] = []
    for b_idx in block_indices:
        blk = base_blocks[b_idx]
        randomized.append([pi[blk[tau[p]]] for p in range(K_BLOCK_SIZE)])
    return randomized


def randomize_pilot_n8_dihedral(
    base_blocks: Sequence[Sequence[int]], rng: random.Random
) -> list[list[int]]:
    """
    Randomisation spécifique au pilote N = 8 appliquant pi x tau x D_8 :
      1. Bijection aléatoire pi dans S_8 sur les 8 situations (0..7) ;
      2. Permutation globale tau dans S_4 sur les 4 positions d'affichage (0..3) ;
      3. Action du groupe diédral D_8 sur la séquence des 8 blocs
         (décalage circulaire s dans 0..7 et sens direct ou inversé).

    Préserve tous les invariants combinatoires (positions [1,1,1,1], r_i = 4, cooccurrences,
    connectivité, zéro doublon) ET le chevauchement consécutif = 1 (linéaire et cyclique B8 -> B1).
    """
    n_pilot = 8
    if len(base_blocks) != n_pilot:
        raise ValueError(f"Le plan pilote N=8 attend 8 blocs, reçu {len(base_blocks)}.")
    pi = list(range(n_pilot))
    rng.shuffle(pi)
    tau = list(range(K_BLOCK_SIZE))
    rng.shuffle(tau)
    shift = rng.randrange(n_pilot)
    reverse = rng.choice((False, True))

    ordered_indices = [
        (shift - idx) % n_pilot if reverse else (shift + idx) % n_pilot for idx in range(n_pilot)
    ]
    return [[pi[base_blocks[b_idx][tau[p]]] for p in range(K_BLOCK_SIZE)] for b_idx in ordered_indices]


def randomize_design_naive(
    base_blocks: Sequence[Sequence[int]], rng: random.Random
) -> list[list[int]]:
    """Randomisation naïve : mélange les 4 items indépendamment dans chaque bloc."""
    out: list[list[int]] = []
    for blk in base_blocks:
        copy = list(blk)
        rng.shuffle(copy)
        out.append(copy)
    return out


def verify_randomization_monte_carlo(
    base_blocks: Sequence[Sequence[int]], n: int, trials: int = 1000
) -> dict[str, object]:
    """
    Exécute `trials` essais reproductibles avec graines distinctes par essai et vérifie
    explicitement tous les invariants, y compris `max_consecutive_overlap` et le bouclage B_N -> B_1.
    Ne déclare jamais qu'une méthode préserve tous les invariants si le chevauchement échoue.
    """
    base_m = evaluate_design(base_blocks, n)
    base_cooc_profile = tuple(sorted(tuple(sorted(row)) for row in base_m.cooccurrence_matrix))

    ctrl_exact_pos = 0
    ctrl_freq_uniform = 0
    ctrl_cooc_preserved = 0
    ctrl_no_duplicates = 0
    ctrl_linear_overlap_preserved = 0
    ctrl_cyclic_overlap_preserved = 0
    ctrl_order_agnostic_invariants = 0
    ctrl_all_including_overlap = 0
    ctrl_max_lin_ov_observed = 0
    ctrl_max_cyc_ov_observed = 0

    naive_exact_pos = 0

    for t_idx in range(trials):
        rng_ctrl = random.Random(SEED_BASE + n * 100_000 + t_idx)
        rng_naive = random.Random(SEED_BASE + n * 200_000 + t_idx)

        c_blks = randomize_design_controlled(base_blocks, n, rng_ctrl)
        cm = evaluate_design(c_blks, n)

        pos_ok = cm.position_balance_exact
        freq_ok = cm.item_freq_uniform
        cooc_ok = (
            cm.pair_histogram == base_m.pair_histogram
            and tuple(sorted(tuple(sorted(row)) for row in cm.cooccurrence_matrix)) == base_cooc_profile
            and cm.laplacian_positive_eigenvalues == base_m.laplacian_positive_eigenvalues
            and cm.is_connected
            and abs(cm.algebraic_connectivity - base_m.algebraic_connectivity) < 1e-6
        )
        nodup_ok = cm.duplicate_block_count == 0 and cm.intra_block_unique
        lin_ov_ok = cm.max_consecutive_overlap <= base_m.max_consecutive_overlap
        cyc_ov_ok = cm.max_cyclic_consecutive_overlap <= base_m.max_cyclic_consecutive_overlap

        ctrl_max_lin_ov_observed = max(ctrl_max_lin_ov_observed, cm.max_consecutive_overlap)
        ctrl_max_cyc_ov_observed = max(ctrl_max_cyc_ov_observed, cm.max_cyclic_consecutive_overlap)

        if pos_ok:
            ctrl_exact_pos += 1
        if freq_ok:
            ctrl_freq_uniform += 1
        if cooc_ok:
            ctrl_cooc_preserved += 1
        if nodup_ok:
            ctrl_no_duplicates += 1
        if lin_ov_ok:
            ctrl_linear_overlap_preserved += 1
        if cyc_ov_ok:
            ctrl_cyclic_overlap_preserved += 1

        order_agnostic_ok = pos_ok and freq_ok and cooc_ok and nodup_ok
        if order_agnostic_ok:
            ctrl_order_agnostic_invariants += 1
        if order_agnostic_ok and lin_ov_ok and cyc_ov_ok:
            ctrl_all_including_overlap += 1

        n_blks = randomize_design_naive(base_blocks, rng_naive)
        nm = evaluate_design(n_blks, n)
        if nm.position_balance_exact:
            naive_exact_pos += 1

    result: dict[str, object] = {
        "trials": trials,
        "seed_formula_exploratory": f"{SEED_BASE} + {n}*100000 + trial_index",
        "exploratory_sigma_SN": {
            "exact_position_balance_count": ctrl_exact_pos,
            "uniform_frequency_count": ctrl_freq_uniform,
            "cooccurrence_preserved_count": ctrl_cooc_preserved,
            "no_duplicates_and_intra_unique_count": ctrl_no_duplicates,
            "order_agnostic_invariants_count": ctrl_order_agnostic_invariants,
            "max_consecutive_overlap_preserved_count": ctrl_linear_overlap_preserved,
            "cyclic_overlap_including_wrap_preserved_count": ctrl_cyclic_overlap_preserved,
            "all_tested_invariants_including_overlap_count": ctrl_all_including_overlap,
            "max_consecutive_overlap_observed_across_trials": ctrl_max_lin_ov_observed,
            "max_cyclic_overlap_observed_across_trials": ctrl_max_cyc_ov_observed,
        },
        "naive_exact_position_rate": naive_exact_pos / trials,
        "naive_exact_position_count": naive_exact_pos,
    }

    if n == 8:
        d8_pos = 0
        d8_freq = 0
        d8_cooc = 0
        d8_nodup = 0
        d8_lin_ov = 0
        d8_wrap_ov = 0
        d8_cyc_ov = 0
        d8_all = 0
        d8_max_lin = 0
        d8_max_wrap = 0

        for t_idx in range(trials):
            rng_d8 = random.Random(SEED_BASE + 8_000_000 + t_idx)
            d8_blks = randomize_pilot_n8_dihedral(base_blocks, rng_d8)
            dm = evaluate_design(d8_blks, n)

            pos_ok = dm.position_balance_exact
            freq_ok = dm.item_freq_uniform
            cooc_ok = (
                dm.pair_histogram == base_m.pair_histogram
                and tuple(sorted(tuple(sorted(row)) for row in dm.cooccurrence_matrix)) == base_cooc_profile
                and dm.laplacian_positive_eigenvalues == base_m.laplacian_positive_eigenvalues
                and dm.is_connected
                and abs(dm.algebraic_connectivity - base_m.algebraic_connectivity) < 1e-6
            )
            nodup_ok = dm.duplicate_block_count == 0 and dm.intra_block_unique
            lin_ov_ok = dm.max_consecutive_overlap == 1
            wrap_ov_ok = dm.cyclic_wrap_overlap == 1
            cyc_ov_ok = dm.max_cyclic_consecutive_overlap == 1

            d8_max_lin = max(d8_max_lin, dm.max_consecutive_overlap)
            d8_max_wrap = max(d8_max_wrap, dm.cyclic_wrap_overlap)

            if pos_ok:
                d8_pos += 1
            if freq_ok:
                d8_freq += 1
            if cooc_ok:
                d8_cooc += 1
            if nodup_ok:
                d8_nodup += 1
            if lin_ov_ok:
                d8_lin_ov += 1
            if wrap_ov_ok:
                d8_wrap_ov += 1
            if cyc_ov_ok:
                d8_cyc_ov += 1
            if pos_ok and freq_ok and cooc_ok and nodup_ok and lin_ov_ok and wrap_ov_ok:
                d8_all += 1

        result["pilot_n8_dihedral_pi_tau_D8"] = {
            "trials": trials,
            "seed_formula": f"{SEED_BASE} + 8000000 + trial_index",
            "exact_position_balance_1111_count": d8_pos,
            "uniform_frequency_r4_count": d8_freq,
            "cooccurrence_and_connectivity_preserved_count": d8_cooc,
            "no_duplicates_and_intra_unique_count": d8_nodup,
            "linear_max_consecutive_overlap_eq_1_count": d8_lin_ov,
            "cyclic_wrap_B8_to_B1_overlap_eq_1_count": d8_wrap_ov,
            "cyclic_max_consecutive_overlap_eq_1_count": d8_cyc_ov,
            "all_tested_invariants_preserved_count": d8_all,
            "max_consecutive_overlap_observed": d8_max_lin,
            "max_cyclic_wrap_B8_to_B1_observed": d8_max_wrap,
        }

    return result


def format_matrix_markdown(matrix: Sequence[Sequence[int]]) -> str:
    n = len(matrix)
    header = "| Item | " + " | ".join(f"I{j+1}" for j in range(n)) + " |"
    sep = "|---|" + "|".join("---:" for _ in range(n)) + "|"
    rows = [header, sep]
    for i in range(n):
        vals = " | ".join(str(matrix[i][j]) if i != j else "—" for j in range(n))
        rows.append(f"| **I{i+1}** | {vals} |")
    return "\n".join(rows)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    exact_constructions: dict[int, list[tuple[str, list[list[int]]]]] = {
        6: [
            ("Complément de C6 {0,1,2,3} mod 6 (PBIBD optimal, D-eff max)", build_cyclic_blocks(6, (0, 1, 2, 3))),
            ("Complément de C3 U C3 {0,1,2,4} mod 6 (même variance, D-eff moindre)", build_cyclic_blocks(6, (0, 1, 2, 4))),
        ],
        7: [
            ("BIBD exact (7,4,2) — complément du plan de Fano PG(2,2)", build_cyclic_blocks(7, (0, 1, 2, 4))),
        ],
        12: [
            ("Plan circulant quasi équilibré {0,1,3,7} mod 12 (variance min)", build_cyclic_blocks(12, (0, 1, 3, 7))),
        ],
        13: [
            ("BIBD exact (13,4,1) — plan projectif PG(2,3) (Singer)", build_cyclic_blocks(13, (0, 1, 3, 9))),
        ],
    }

    all_results: dict[int, dict] = {}
    csv_rows: list[dict] = []
    report_sections: list[str] = [
        "# Rapport mathématique des plans expérimentaux MaxDiff (N = 6 à 13)",
        "",
        f"- **Paramètres évalués** : `k = {K_BLOCK_SIZE}` items par bloc, `b = N` blocs, `r = {R_REPS}` présentations par item.",
        f"- **Graine déterministe de base** : `{SEED_BASE}` (Python 3 stdlib uniquement).",
        "- **Script source** : `docs/experiments/maxdiff/audit_maxdiff_designs.py`.",
        "",
        "## Synthèse comparative par taille N",
        "",
        "| N | Blocs | BIBD exact (b=N) ? | b_min arithm. si BIBD (k=4) | Histogramme paires | Min/Max/Ét. | Paires à 0 | Variance (borne théor.) | D-eff | SE Fisher H0 (min / moy / max) | Éq. pos. [1,1,1,1] | Chevauch. conséc. lin. / bouclage |",
        "|---:|---:|---|---:|---|---|---:|---|---:|---|---|---|",
    ]

    detailed_sections: list[str] = []

    for n in range(6, 14):
        candidates: list[tuple[str, list[list[int]], DesignMetrics]] = []

        if n in exact_constructions:
            for label, raw_blks in exact_constructions[n]:
                pos_blks = decompose_positions_exact(raw_blks, n)
                ord_blks = optimize_block_order(pos_blks)
                candidates.append((label, ord_blks, evaluate_design(ord_blks, n)))

        cyc_blks = search_best_cyclic_design(n)
        if cyc_blks is not None:
            pos_cyc = decompose_positions_exact(cyc_blks, n)
            ord_cyc = optimize_block_order(pos_cyc)
            candidates.append(("Meilleur plan cyclique exhaustif", ord_cyc, evaluate_design(ord_cyc, n)))

        for obj_name, obj_label in [
            ("variance", "Recherche générale — Obj_A (Variance paires)"),
            ("minimax", "Recherche générale — Obj_B (Minimax + zéro-paires)"),
            ("d_opt", "Recherche générale — Obj_C (D-optimalité Laplacien)"),
            ("weighted_1_10_100", "Recherche générale — Obj_D (Pondérée 100·dup + 10·zero + sq)"),
        ]:
            gen_blks = search_general_design(n, obj_name, seed=SEED_BASE + n * 100)
            pos_gen = decompose_positions_exact(gen_blks, n)
            ord_gen = optimize_block_order(pos_gen)
            candidates.append((obj_label, ord_gen, evaluate_design(ord_gen, n)))

        def rank_key(entry: tuple[str, list[list[int]], DesignMetrics]) -> tuple:
            _, _, m = entry
            return (
                m.duplicate_block_count,
                0 if m.is_connected else 1,
                m.zero_pair_count,
                round(m.pair_variance_pop, 12),
                m.pair_range,
                -round(m.d_efficiency_vs_ideal, 12),
                m.max_consecutive_overlap,
                round(m.mean_consecutive_overlap, 6),
            )

        best_label, best_blocks, best_m = min(candidates, key=rank_key)
        mc_stats = verify_randomization_monte_carlo(best_blocks, n, trials=1000)

        hist_str = ", ".join(f"{k}:{v}" for k, v in best_m.pair_histogram.items())
        opt_tag = "global" if best_m.is_globally_optimal_variance else "quasi-opt"
        report_sections.append(
            f"| {n} | {best_m.n_blocks} | {'Oui' if best_m.bibd_exact_feasible else 'Non'} "
            f"| {best_m.bibd_min_blocks_if_r_free} (r={best_m.bibd_min_reps_if_r_free}) "
            f"| {hist_str} | {best_m.pair_min}/{best_m.pair_max}/{best_m.pair_range} "
            f"| {best_m.zero_pair_count} | {best_m.pair_variance_pop:.4f} ({best_m.theoretical_min_variance:.4f}, {opt_tag}) "
            f"| {best_m.d_efficiency_vs_ideal:.4f} "
            f"| {best_m.fisher_se_min:.3f} / {best_m.fisher_se_mean:.3f} / {best_m.fisher_se_max:.3f} "
            f"| {'Exact' if best_m.position_balance_exact else 'Non'} "
            f"| {best_m.max_consecutive_overlap} (moy {best_m.mean_consecutive_overlap:.2f}) / B{n}→B1:{best_m.cyclic_wrap_overlap} |"
        )

        all_results[n] = {
            "n_items": n,
            "selected_method": best_label,
            "blocks_1_indexed": [[x + 1 for x in blk] for blk in best_blocks],
            "metrics": {
                "n_items": best_m.n_items,
                "n_blocks": best_m.n_blocks,
                "block_size": best_m.block_size,
                "reps_per_item": best_m.reps_per_item,
                "bibd_lambda_ideal": best_m.bibd_lambda_ideal,
                "bibd_exact_feasible": best_m.bibd_exact_feasible,
                "bibd_feasibility_reason": best_m.bibd_feasibility_reason,
                "bibd_min_blocks_if_r_free": best_m.bibd_min_blocks_if_r_free,
                "bibd_min_reps_if_r_free": best_m.bibd_min_reps_if_r_free,
                "item_frequencies": list(best_m.item_frequencies),
                "item_freq_uniform": best_m.item_freq_uniform,
                "pair_histogram": best_m.pair_histogram,
                "pair_min": best_m.pair_min,
                "pair_max": best_m.pair_max,
                "pair_range": best_m.pair_range,
                "pair_mean": best_m.pair_mean,
                "pair_variance_pop": best_m.pair_variance_pop,
                "pair_std_pop": best_m.pair_std_pop,
                "zero_pair_count": best_m.zero_pair_count,
                "theoretical_min_variance": best_m.theoretical_min_variance,
                "theoretical_min_range": best_m.theoretical_min_range,
                "theoretical_min_zero_pairs": best_m.theoretical_min_zero_pairs,
                "is_globally_optimal_variance": best_m.is_globally_optimal_variance,
                "connected_components": best_m.connected_components,
                "is_connected": best_m.is_connected,
                "duplicate_block_count": best_m.duplicate_block_count,
                "intra_block_unique": best_m.intra_block_unique,
                "position_balance_exact": best_m.position_balance_exact,
                "position_matrix": [list(r) for r in best_m.position_matrix],
                "cooccurrence_matrix": [list(r) for r in best_m.cooccurrence_matrix],
                "laplacian_positive_eigenvalues": list(best_m.laplacian_positive_eigenvalues),
                "algebraic_connectivity": best_m.algebraic_connectivity,
                "d_efficiency_vs_ideal": best_m.d_efficiency_vs_ideal,
                "fisher_se_h0_min": best_m.fisher_se_min,
                "fisher_se_h0_mean": best_m.fisher_se_mean,
                "fisher_se_h0_max": best_m.fisher_se_max,
                "max_consecutive_overlap": best_m.max_consecutive_overlap,
                "mean_consecutive_overlap": best_m.mean_consecutive_overlap,
                "cyclic_wrap_overlap": best_m.cyclic_wrap_overlap,
                "max_cyclic_consecutive_overlap": best_m.max_cyclic_consecutive_overlap,
                "randomization_monte_carlo_1000": mc_stats,
            },
            "objective_comparison": [
                {
                    "candidate": lbl,
                    "pair_histogram": cm.pair_histogram,
                    "zero_pair_count": cm.zero_pair_count,
                    "pair_variance_pop": cm.pair_variance_pop,
                    "pair_range": cm.pair_range,
                    "d_efficiency_vs_ideal": cm.d_efficiency_vs_ideal,
                    "algebraic_connectivity": cm.algebraic_connectivity,
                    "fisher_se_h0_max": cm.fisher_se_max,
                    "duplicate_block_count": cm.duplicate_block_count,
                    "is_connected": cm.is_connected,
                    "position_balance_exact": cm.position_balance_exact,
                }
                for lbl, _, cm in candidates
            ],
        }

        for b_idx, blk in enumerate(best_blocks, start=1):
            csv_rows.append(
                {
                    "N": n,
                    "block_index": b_idx,
                    "pos_1_item": blk[0] + 1,
                    "pos_2_item": blk[1] + 1,
                    "pos_3_item": blk[2] + 1,
                    "pos_4_item": blk[3] + 1,
                    "design_type": "BIBD_exact" if best_m.bibd_exact_feasible else "Quasi_balanced",
                    "method": best_label,
                }
            )

        exp_stats = mc_stats["exploratory_sigma_SN"]
        assert isinstance(exp_stats, dict)
        mc_lines = [
            f"- **Test randomisation Monte Carlo ({mc_stats['trials']} tirages à graines distinctes)** :",
            f"  - *Exploratoire (`pi x tau x sigma dans S_N`)* : invariants hors ordre préservés dans `{exp_stats['order_agnostic_invariants_count']}/{mc_stats['trials']}` (positions `[1,1,1,1]`: `{exp_stats['exact_position_balance_count']}/{mc_stats['trials']}`, fréquences `r=4`: `{exp_stats['uniform_frequency_count']}/{mc_stats['trials']}`, cooccurrences & connectivité: `{exp_stats['cooccurrence_preserved_count']}/{mc_stats['trials']}`, zéro doublon/unicité intra-bloc: `{exp_stats['no_duplicates_and_intra_unique_count']}/{mc_stats['trials']}`) ; `max_consecutive_overlap` linéaire préservé dans `{exp_stats['max_consecutive_overlap_preserved_count']}/{mc_stats['trials']}` (max observé = `{exp_stats['max_consecutive_overlap_observed_across_trials']}`), bouclage cyclique `B{n}→B1` inclus dans `{exp_stats['cyclic_overlap_including_wrap_preserved_count']}/{mc_stats['trials']}` (max observé = `{exp_stats['max_cyclic_overlap_observed_across_trials']}`), total tous invariants testés = `{exp_stats['all_tested_invariants_including_overlap_count']}/{mc_stats['trials']}` ; mélange naïf par bloc `[1,1,1,1]`: `{mc_stats['naive_exact_position_count']}/{mc_stats['trials']}` (`{float(mc_stats['naive_exact_position_rate'])*100:.1f}%`).",
        ]
        if n == 8 and "pilot_n8_dihedral_pi_tau_D8" in mc_stats:
            d8_stats = mc_stats["pilot_n8_dihedral_pi_tau_D8"]
            assert isinstance(d8_stats, dict)
            mc_lines.append(
                f"  - *Pilote N=8 (`randomize_pilot_n8_dihedral`, `pi x tau x D8`)* : positions `[1,1,1,1]` = `{d8_stats['exact_position_balance_1111_count']}/{d8_stats['trials']}`, fréquences `r=4` = `{d8_stats['uniform_frequency_r4_count']}/{d8_stats['trials']}`, cooccurrences & connectivité = `{d8_stats['cooccurrence_and_connectivity_preserved_count']}/{d8_stats['trials']}`, zéro doublon & unicité intra-bloc = `{d8_stats['no_duplicates_and_intra_unique_count']}/{d8_stats['trials']}`, `max_consecutive_overlap == 1` (linéaire) = `{d8_stats['linear_max_consecutive_overlap_eq_1_count']}/{d8_stats['trials']}`, bouclage `B8→B1 == 1` = `{d8_stats['cyclic_wrap_B8_to_B1_overlap_eq_1_count']}/{d8_stats['trials']}`, `max_cyclic_consecutive_overlap == 1` = `{d8_stats['cyclic_max_consecutive_overlap_eq_1_count']}/{d8_stats['trials']}`, **tous invariants testés préservés = `{d8_stats['all_tested_invariants_preserved_count']}/{d8_stats['trials']}`** (max observé linéaire = `{d8_stats['max_consecutive_overlap_observed']}`, max observé `B8→B1` = `{d8_stats['max_cyclic_wrap_B8_to_B1_observed']}`)."
            )

        detailed_sections.extend(
            [
                f"## N = {n} items ({best_m.n_blocks} blocs de {K_BLOCK_SIZE})",
                "",
                f"- **Construction retenue** : {best_label}",
                f"- **Faisabilité BIBD exact (b=N, r=4)** : {'Oui' if best_m.bibd_exact_feasible else 'Non'} — {best_m.bibd_feasibility_reason}",
                f"- **b_min arithmétique nécessaire si BIBD (r libre, k=4)** : `b_min = {best_m.bibd_min_blocks_if_r_free}` blocs (`r = {best_m.bibd_min_reps_if_r_free}` présentations/item)",
                f"- **Fréquence par item** : `{list(best_m.item_frequencies)}` (uniforme : {best_m.item_freq_uniform})",
                f"- **Distribution des paires** : `{best_m.pair_histogram}` (moyenne = {best_m.pair_mean:.4f}, variance = {best_m.pair_variance_pop:.6f}, borne théorique = {best_m.theoretical_min_variance:.6f})",
                f"- **Connectivité** : {best_m.connected_components} composante(s) connexe(s) ; $\\lambda_2(L) = {best_m.algebraic_connectivity:.4f}$ ; D-efficacité = `{best_m.d_efficiency_vs_ideal:.4f}`",
                f"- **Précision asymptotique sous H0 ($\\beta = 0$, $r = 4$)** : SE($\\hat{{\\beta}}_i - \\hat{{\\beta}}_j$) min = `{best_m.fisher_se_min:.4f}`, moy = `{best_m.fisher_se_mean:.4f}`, max = `{best_m.fisher_se_max:.4f}` logits",
                f"- **Blocs dupliqués** : {best_m.duplicate_block_count} (unicité intra-bloc : {best_m.intra_block_unique})",
                f"- **Équilibre exact des positions** : {best_m.position_balance_exact} (chaque item apparaît `[1, 1, 1, 1]` fois aux positions 1..4)",
                f"- **Chevauchement entre blocs consécutifs** : max linéaire = {best_m.max_consecutive_overlap} (moyenne = {best_m.mean_consecutive_overlap:.2f}), bouclage `B{n}→B1` = {best_m.cyclic_wrap_overlap} (max cyclique = {best_m.max_cyclic_consecutive_overlap})",
                *mc_lines,
                "",
                "### Comparaison des candidats / fonctions objectif",
                "",
                "| Candidat | Histogramme paires | Paires à 0 | Variance | Étendue | D-eff | $\\lambda_2(L)$ | SE max H0 | Doublons |",
                "|---|---|---:|---:|---:|---:|---:|---:|---:|",
            ]
        )
        for lbl, _, cm in candidates:
            c_hist = ", ".join(f"{k}:{v}" for k, v in cm.pair_histogram.items())
            detailed_sections.append(
                f"| {lbl} | {c_hist} | {cm.zero_pair_count} | {cm.pair_variance_pop:.4f} | {cm.pair_range} | {cm.d_efficiency_vs_ideal:.4f} | {cm.algebraic_connectivity:.2f} | {cm.fisher_se_max:.3f} | {cm.duplicate_block_count} |"
            )

        detailed_sections.extend(
            [
                "",
                "### Séquence ordonnée des blocs (positions 1 à 4, indices 1..N)",
                "",
                "| Bloc | Pos 1 | Pos 2 | Pos 3 | Pos 4 |",
                "|---:|---:|---:|---:|---:|",
            ]
        )
        for b_idx, blk in enumerate(best_blocks, start=1):
            detailed_sections.append(
                f"| B{b_idx} | I{blk[0]+1} | I{blk[1]+1} | I{blk[2]+1} | I{blk[3]+1} |"
            )

        detailed_sections.extend(
            [
                "",
                "### Matrice complète des cooccurrences",
                "",
                format_matrix_markdown(best_m.cooccurrence_matrix),
                "",
            ]
        )

    json_path = OUTPUT_DIR / "designs_N6_to_N13.json"
    with json_path.open("w", encoding="utf-8") as f:
        json.dump(
            {
                "metadata": {
                    "block_size": K_BLOCK_SIZE,
                    "reps_per_item": R_REPS,
                    "seed_base": SEED_BASE,
                    "generator_script": "docs/experiments/maxdiff/audit_maxdiff_designs.py",
                },
                "designs": {str(k): v for k, v in all_results.items()},
            },
            f,
            indent=2,
            ensure_ascii=False,
        )

    csv_path = OUTPUT_DIR / "designs_N6_to_N13.csv"
    with csv_path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "N",
                "block_index",
                "pos_1_item",
                "pos_2_item",
                "pos_3_item",
                "pos_4_item",
                "design_type",
                "method",
            ],
        )
        writer.writeheader()
        writer.writerows(csv_rows)

    report_path = OUTPUT_DIR / "METRICS_REPORT.md"
    with report_path.open("w", encoding="utf-8") as f:
        f.write("\n".join(report_sections + ["", "---", ""] + detailed_sections))

    print(f"Generated:\n- {json_path}\n- {csv_path}\n- {report_path}")
    mc_n8 = all_results[8]["metrics"]["randomization_monte_carlo_1000"]
    print(f"N=8 Monte Carlo ({mc_n8['trials']} distinct seeds):")
    print("  exploratory_sigma_SN:", json.dumps(mc_n8["exploratory_sigma_SN"], ensure_ascii=False))
    print("  pilot_n8_dihedral_pi_tau_D8:", json.dumps(mc_n8["pilot_n8_dihedral_pi_tau_D8"], ensure_ascii=False))
    print("  naive_exact_position_count:", mc_n8["naive_exact_position_count"])


if __name__ == "__main__":
    main()
