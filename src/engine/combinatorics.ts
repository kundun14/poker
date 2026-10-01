import type { Rank, Suit } from '../types/poker';

export const RANKS: Rank[] = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
export const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];

export interface HandComboInfo {
  hand: string; // ej: "AKs", "AKo", "AA"
  rank1: Rank;
  rank2: Rank;
  type: 'pair' | 'suited' | 'offsuit';
  totalCombosDefault: number;
  combosRemaining: number;
  blockedPercent: number;
}

/**
 * Calcula las combinaciones restantes de una mano dada una lista de cartas visibles (Hero + Board)
 * Libro Cap. 18: Combinatorics & Blockers
 */
export function calculateHandCombos(
  handLabel: string,
  deadCards: { rank: Rank; suit: Suit }[] = []
): HandComboInfo {
  const isPair = handLabel.length === 2 && handLabel[0] === handLabel[1];
  const isSuited = handLabel.endsWith('s');

  const r1 = handLabel[0] as Rank;
  const r2 = handLabel[1] as Rank;

  if (isPair) {
    // 6 combos base: C(4, 2)
    const deadOfRank = deadCards.filter(c => c.rank === r1).length;
    const remainingCards = Math.max(0, 4 - deadOfRank);
    const combosRemaining = (remainingCards * (remainingCards - 1)) / 2;
    const defaultCombos = 6;
    const blockedPercent = Math.round(((defaultCombos - combosRemaining) / defaultCombos) * 100);

    return {
      hand: handLabel,
      rank1: r1,
      rank2: r2,
      type: 'pair',
      totalCombosDefault: defaultCombos,
      combosRemaining: Math.max(0, combosRemaining),
      blockedPercent,
    };
  }

  if (isSuited) {
    // 4 combos base: 1 por cada palo
    let combosRemaining = 0;
    for (const suit of SUITS) {
      const r1Dead = deadCards.some(c => c.rank === r1 && c.suit === suit);
      const r2Dead = deadCards.some(c => c.rank === r2 && c.suit === suit);
      if (!r1Dead && !r2Dead) {
        combosRemaining++;
      }
    }
    const defaultCombos = 4;
    const blockedPercent = Math.round(((defaultCombos - combosRemaining) / defaultCombos) * 100);

    return {
      hand: handLabel,
      rank1: r1,
      rank2: r2,
      type: 'suited',
      totalCombosDefault: defaultCombos,
      combosRemaining,
      blockedPercent,
    };
  }

  // Offsuit: 12 combos base
  let combosRemaining = 0;
  for (const s1 of SUITS) {
    for (const s2 of SUITS) {
      if (s1 !== s2) {
        const r1Dead = deadCards.some(c => c.rank === r1 && c.suit === s1);
        const r2Dead = deadCards.some(c => c.rank === r2 && c.suit === s2);
        if (!r1Dead && !r2Dead) {
          combosRemaining++;
        }
      }
    }
  }
  const defaultCombos = 12;
  const blockedPercent = Math.round(((defaultCombos - combosRemaining) / defaultCombos) * 100);

  return {
    hand: handLabel,
    rank1: r1,
    rank2: r2,
    type: 'offsuit',
    totalCombosDefault: defaultCombos,
    combosRemaining,
    blockedPercent,
  };
}

/**
 * Genera la matriz completa 13x13 de poker con el estado de combinaciones y bloqueadores.
 */
export function generateRangeMatrix(deadCards: { rank: Rank; suit: Suit }[] = []): HandComboInfo[][] {
  const matrix: HandComboInfo[][] = [];

  for (let i = 0; i < RANKS.length; i++) {
    const row: HandComboInfo[] = [];
    for (let j = 0; j < RANKS.length; j++) {
      let label = '';
      if (i === j) {
        label = `${RANKS[i]}${RANKS[j]}`;
      } else if (i < j) {
        label = `${RANKS[i]}${RANKS[j]}s`;
      } else {
        label = `${RANKS[j]}${RANKS[i]}o`;
      }
      row.push(calculateHandCombos(label, deadCards));
    }
    matrix.push(row);
  }

  return matrix;
}
