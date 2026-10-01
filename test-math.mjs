// Test suite for Poker Math Engine verifying Alton Hardin's Essential Poker Math
import { calculatePotOdds, ratioToPercent, calculateRuleOf2And4, calculateEV, calculateSetMiningCheck, calculateAlpha, calculateMDF } from './src/engine/math.ts';
import { calculateHandCombos, generateRangeMatrix } from './src/engine/combinatorics.ts';

function assert(condition, message) {
  if (!condition) {
    console.error('❌ FAIL:', message);
    process.exit(1);
  } else {
    console.log('✅ PASS:', message);
  }
}

console.log('=== VERIFYING POKER MATH ENGINE (ALTON HARDIN) ===');

// 1. Odds & Probabilities
assert(ratioToPercent(4, 1) === 20.0, '4:1 odds against must equal 20.0%');
assert(ratioToPercent(3, 1) === 25.0, '3:1 odds against must equal 25.0%');
assert(ratioToPercent(1, 1) === 50.0, '1:1 odds against must equal 50.0%');

// 2. Pot Odds
const potOddsHalf = calculatePotOdds(50, 100, 50);
assert(potOddsHalf.percent === 25.0, 'Half-pot bet must give 25.0% pot odds');
assert(potOddsHalf.ratio === '3.0 : 1', 'Half-pot bet ratio must be 3.0 : 1');

const potOddsFull = calculatePotOdds(100, 100, 100);
assert(potOddsFull.percent === 33.3, 'Pot-sized bet must give 33.3% pot odds');

// 3. Rule of 2 and 4 & Alton Hardin adjustments
const r2_turn = calculateRuleOf2And4(9, 'turn', false);
assert(r2_turn.estimated === 18.0, '9 outs turn to river rule of 2 = 18.0%');

const r4_flop_8 = calculateRuleOf2And4(8, 'flop', true);
assert(r4_flop_8.estimated === 32.0, '8 outs flop to river rule of 4 = 32.0%');

const r4_flop_9 = calculateRuleOf2And4(9, 'flop', true);
assert(r4_flop_9.estimated === 35.0, '9 outs flop to river Hardin adjustment (36 - 1) = 35.0%');

const r4_flop_15 = calculateRuleOf2And4(15, 'flop', true);
assert(r4_flop_15.estimated === 53.0, '15 outs flop to river Hardin adjustment (60 - 7) = 53.0%');

// 4. Expected Value (EV)
const evCheck = calculateEV(40, 300, 100);
assert(evCheck.ev === 60.0, '40% win $300, 60% lose $100 -> EV = +$60.00');
assert(evCheck.isProfitable === true, 'EV must be profitable');

// 5. Preflop: Set-mining 20x rule
const setMiningGood = calculateSetMiningCheck(10, 250, 20);
assert(setMiningGood.isRecommended === true, '$250 stack vs $10 call (25x) is recommended for set-mining');

const setMiningBad = calculateSetMiningCheck(10, 120, 20);
assert(setMiningBad.isRecommended === false, '$120 stack vs $10 call (12x) fails the 20x rule');

// 6. Alpha & MDF
const alphaHalf = calculateAlpha(50, 100);
assert(alphaHalf === 33.3, 'Bet $50 to win $100 -> Alpha = 33.3%');

const mdfHalf = calculateMDF(100, 50);
assert(mdfHalf === 66.7, 'Pot $100 facing bet $50 -> MDF = 66.7%');

// 7. Combinatorics & Blockers (Chapter 18)
const akDefault = calculateHandCombos('AKo', []);
assert(akDefault.combosRemaining === 12, 'AKo default has 12 combos');

const aksDefault = calculateHandCombos('AKs', []);
assert(aksDefault.combosRemaining === 4, 'AKs default has 4 combos');

const aaDefault = calculateHandCombos('AA', []);
assert(aaDefault.combosRemaining === 6, 'AA default has 6 combos');

// Blocker check: If Hero holds As
const heroDeadCards = [{ rank: 'A', suit: 'spades' }];
const aaBlocked = calculateHandCombos('AA', heroDeadCards);
assert(aaBlocked.combosRemaining === 3, 'Holding 1 Ace cuts opponent AA combos in half (6 -> 3)');

const matrix = generateRangeMatrix([]);
let totalCombos = 0;
matrix.forEach(row => row.forEach(cell => { totalCombos += cell.combosRemaining; }));
assert(totalCombos === 1326, 'Total poker combinations in canonical matrix must be exactly 1,326');

console.log('=== ALL 15 AUTOMATED TESTS PASSED WITH 100% ACCURACY! ===');
