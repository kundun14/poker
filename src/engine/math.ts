/**
 * Motor Matemático de Poker basado en "Essential Poker Math" de Alton Hardin.
 * Fórmulas puras, deterministas y de alta precisión.
 */

export interface PotOddsResult {
  percent: number;       // ej: 25%
  ratio: string;         // ej: "3.0 : 1"
  rawRatio: number;      // ej: 3.0
  breakEvenCall: number;
}

/**
 * Calcula las Pot Odds directas a partir de la apuesta a pagar y el tamaño del bote.
 * Libro Cap. 6: Pot Odds = Call / (Bote Actual + Apuesta Rival + Tu Call)
 */
export function calculatePotOdds(
  callAmount: number,
  potBeforeBet: number,
  opponentBet: number
): PotOddsResult {
  const totalPotAfterCall = potBeforeBet + opponentBet + callAmount;
  if (totalPotAfterCall <= 0 || callAmount <= 0) {
    return { percent: 0, ratio: '0 : 1', rawRatio: 0, breakEvenCall: 0 };
  }

  const percent = (callAmount / totalPotAfterCall) * 100;
  const reward = potBeforeBet + opponentBet;
  const rawRatio = reward / callAmount;
  const ratio = `${rawRatio.toFixed(1)} : 1`;

  return {
    percent: Math.round(percent * 10) / 10,
    ratio,
    rawRatio,
    breakEvenCall: callAmount,
  };
}

/**
 * Convierte un ratio en contra (ej. 4 a 1) a porcentaje de probabilidad.
 * Probabilidad = 1 / (Odds + 1)
 */
export function ratioToPercent(oddsAgainst: number, base: number = 1): number {
  if (oddsAgainst + base === 0) return 0;
  const p = (base / (oddsAgainst + base)) * 100;
  return Math.round(p * 10) / 10;
}

/**
 * Convierte un porcentaje de probabilidad a ratio en contra (X a 1).
 */
export function percentToRatio(percent: number): string {
  if (percent <= 0) return '∞ : 1';
  if (percent >= 100) return '0 : 1';
  const oddsAgainst = (100 - percent) / percent;
  return `${oddsAgainst.toFixed(1)} : 1`;
}

export interface RuleOf2And4Result {
  estimated: number;   // Estimación con regla
  exact: number;       // Probabilidad exacta
  difference: number;  // Desviación
  multiplier: 2 | 4;
}

/**
 * Regla del 2 y 4 (Libro Cap. 9):
 * - 1 calle por venir (Flop a Turn o Turn a River): Outs * 2
 * - 2 calles por venir (Flop a River All-In): Outs * 4
 *   Ajuste Alton Hardin: cuando Outs > 8: (Outs * 4) - (Outs - 8)
 */
export function calculateRuleOf2And4(
  outs: number,
  street: 'flop' | 'turn',
  isAllIn: boolean = false
): RuleOf2And4Result {
  if (outs <= 0) {
    return { estimated: 0, exact: 0, difference: 0, multiplier: street === 'flop' && isAllIn ? 4 : 2 };
  }

  let estimated = 0;
  let exact = 0;
  let multiplier: 2 | 4 = 2;

  if (street === 'turn' || !isAllIn) {
    // 1 carta por venir: 46 cartas desconocidas en el turn
    multiplier = 2;
    estimated = outs * 2;
    exact = (outs / 46) * 100;
  } else {
    // Flop All-In (2 cartas por venir: 47 desconocidas en flop)
    multiplier = 4;
    if (outs > 8) {
      estimated = (outs * 4) - (outs - 8);
    } else {
      estimated = outs * 4;
    }
    // Fórmula exacta: 1 - ((47 - outs) / 47 * (46 - outs) / 46)
    const probMissFlop = (47 - outs) / 47;
    const probMissTurn = (46 - outs) / 46;
    exact = (1 - (probMissFlop * probMissTurn)) * 100;
  }

  const roundedEst = Math.round(estimated * 10) / 10;
  const roundedExact = Math.round(exact * 10) / 10;

  return {
    estimated: roundedEst,
    exact: roundedExact,
    difference: Math.round(Math.abs(roundedEst - roundedExact) * 10) / 10,
    multiplier,
  };
}

/**
 * Expected Value (EV) fundamental (Libro Cap. 10 y 17):
 * EV = (Prob_Win * $Win) - (Prob_Lose * $Lose)
 */
export function calculateEV(
  winProbPercent: number,
  winAmount: number,
  loseAmount: number
): { ev: number; isProfitable: boolean; formatted: string } {
  const winP = winProbPercent / 100;
  const loseP = 1 - winP;

  const ev = (winP * winAmount) - (loseP * loseAmount);
  const roundedEV = Math.round(ev * 100) / 100;

  return {
    ev: roundedEV,
    isProfitable: roundedEV > 0,
    formatted: roundedEV >= 0 ? `+$${roundedEV.toFixed(2)}` : `-$${Math.abs(roundedEV).toFixed(2)}`,
  };
}

/**
 * Odds Implícitas (Libro Cap. 7):
 * Calcula cuánto dinero adicional del stack del rival necesitamos ganar en calles
 * futuras para compensar un pago que no tiene pot odds directas inmediatas.
 *
 * Dinero Extra Necesario = (Call / (Equity / 100)) - (Bote Actual + Apuesta)
 */
export function calculateImpliedOddsNeeded(
  callAmount: number,
  equityPercent: number,
  currentPotTotal: number
): { neededAmount: number; isPossible: boolean } {
  if (equityPercent <= 0) return { neededAmount: Infinity, isPossible: false };

  const totalPotRequired = callAmount / (equityPercent / 100);
  const neededAmount = Math.max(0, totalPotRequired - currentPotTotal);

  return {
    neededAmount: Math.round(neededAmount * 100) / 100,
    isPossible: neededAmount >= 0,
  };
}

/**
 * Frecuencia Mínima de Defensa (MDF) (Libro Cap. 16):
 * MDF = Bote / (Bote + Apuesta)
 */
export function calculateMDF(pot: number, bet: number): number {
  if (pot + bet <= 0) return 0;
  const mdf = (pot / (pot + bet)) * 100;
  return Math.round(mdf * 10) / 10;
}

/**
 * Alpha / Break-Even Bluff Percentage (Libro Cap. 16):
 * Alpha = Riesgo / (Riesgo + Recompensa)
 * Cuánto porcentaje de las veces debe foldear el rival para que un farol puro sea rentable.
 */
export function calculateAlpha(riskBet: number, potToWin: number): number {
  if (riskBet + potToWin <= 0) return 0;
  const alpha = (riskBet / (riskBet + potToWin)) * 100;
  return Math.round(alpha * 10) / 10;
}

/**
 * Matemática del Semi-Bluff All-In (Libro Cap. 15):
 * EV = (Fold% * Pot) + (1 - Fold%) * [ (Equity% * PotFinal) - ((1 - Equity%) * AllIn) ]
 */
export function calculateSemiBluffEV(
  foldPercent: number,
  deadPot: number,
  cardEquityPercent: number,
  allInBet: number,
  potIfCalled: number
): { ev: number; foldEquityPortion: number; showdownPortion: number } {
  const f = foldPercent / 100;
  const eq = cardEquityPercent / 100;

  const foldEV = f * deadPot;
  const showdownEV = (1 - f) * ((eq * potIfCalled) - ((1 - eq) * allInBet));
  const totalEV = foldEV + showdownEV;

  return {
    ev: Math.round(totalEV * 100) / 100,
    foldEquityPortion: Math.round(foldEV * 100) / 100,
    showdownPortion: Math.round(showdownEV * 100) / 100,
  };
}

/**
 * Set-Mining Math (Libro Cap. 13):
 * Probabilidad de conectar trío en el flop con pareja en mano: 11.8% (~7.5 a 1 en contra).
 * Regla de oro de Alton Hardin: Stack efectivo >= 15x a 20x la apuesta a pagar.
 */
export function calculateSetMiningCheck(
  callAmount: number,
  effectiveStack: number,
  ruleMultiplier: number = 20
): { isRecommended: boolean; currentMultiplier: number; minStackNeeded: number } {
  const currentMultiplier = callAmount > 0 ? effectiveStack / callAmount : 0;
  const minStackNeeded = callAmount * ruleMultiplier;

  return {
    isRecommended: currentMultiplier >= ruleMultiplier,
    currentMultiplier: Math.round(currentMultiplier * 10) / 10,
    minStackNeeded,
  };
}
