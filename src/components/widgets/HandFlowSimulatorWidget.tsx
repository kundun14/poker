import React, { useState } from 'react';
import type { Card } from '../../types/poker';
import { PlayingCard } from '../common/PlayingCard';
import { PokerChip } from '../common/PokerChip';
import { ChevronRight, ChevronLeft, RotateCcw, Sparkles, Info, Zap, HelpCircle } from 'lucide-react';
import { fireSuccessConfetti } from '../common/Confetti';

interface StreetStep {
  id: 'preflop' | 'flop' | 'turn' | 'river' | 'showdown';
  number: number;
  name: string;
  subtitle: string;
  boardCount: number;
  cardsKnown: string;
  whoActsFirst: string;
  whoActsLast: string;
  heroAction: string;
  villainAction: string;
  potBefore: number;
  betThisRound: number;
  potTotal: number;
  whatIsHappening: string;
  mathFocus: string;
  mathFormula: string;
  beginnerMistake: string;
  hardinRule: string;
}

export const HandFlowSimulatorWidget: React.FC = () => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [exampleScenario, setExampleScenario] = useState<'made_hand' | 'flush_draw'>('made_hand');

  // Scenario 1: Made Hand (A-K connects Top Pair)
  const scenarioMadeHand = {
    heroCards: [{ suit: 'spades', rank: 'A' }, { suit: 'hearts', rank: 'K' }] as Card[],
    villainCards: [{ suit: 'clubs', rank: 'K' }, { suit: 'diamonds', rank: 'Q' }] as Card[],
    board: [
      { suit: 'diamonds', rank: 'K' },
      { suit: 'spades', rank: '9' },
      { suit: 'clubs', rank: '4' },
      { suit: 'spades', rank: '10' },
      { suit: 'diamonds', rank: '2' },
    ] as Card[],
    heroHandName: 'Pareja Máxima de Reyes con Kicker As (A-K-K-10-9)',
    villainHandName: 'Pareja de Reyes con Kicker Dama (K-K-Q-10-9)',
    winnerVerdict: '¡Gana Hero! Ambos tienen pareja de Reyes, pero el Kicker As de Hero supera a la Dama del rival.',
  };

  // Scenario 2: Drawing Hand (Nut Flush Draw connects on the Turn)
  const scenarioFlushDraw = {
    heroCards: [{ suit: 'spades', rank: 'A' }, { suit: 'spades', rank: 'J' }] as Card[],
    villainCards: [{ suit: 'hearts', rank: 'Q' }, { suit: 'diamonds', rank: 'Q' }] as Card[],
    board: [
      { suit: 'spades', rank: 'K' },
      { suit: 'spades', rank: '7' },
      { suit: 'clubs', rank: '2' },
      { suit: 'spades', rank: '4' },
      { suit: 'hearts', rank: '9' },
    ] as Card[],
    heroHandName: 'Color Máximo al As de Picas (Nut Flush: A♠-K♠-J♠-7♠-4♠)',
    villainHandName: 'Pareja de Damas (Q♥-Q♦)',
    winnerVerdict: '¡Gana Hero! Completó el Color Máximo en el Turn (4 picas comunitarias + 2 en mano), batiendo la pareja del rival.',
  };

  const activeScenario = exampleScenario === 'made_hand' ? scenarioMadeHand : scenarioFlushDraw;

  const steps: StreetStep[] = [
    {
      id: 'preflop',
      number: 1,
      name: 'Pre-Flop',
      subtitle: 'Antes de que se abra ninguna carta comunitaria',
      boardCount: 0,
      cardsKnown: '2 de 7 cartas (29% de la información)',
      whoActsFirst: 'Under the Gun (UTG) habla de primero pre-flop',
      whoActsLast: 'Ciega Grande (BB) habla de último pre-flop',
      heroAction: 'Hero (Botón) recibe A-K y sube a $6',
      villainAction: 'Rival (Ciega Grande) iguala los $6',
      potBefore: 3, // SB ($1) + BB ($2)
      betThisRound: 12,
      potTotal: 15,
      whatIsHappening: 'Cada jugador recibe 2 cartas privadas boca abajo. Las ciegas obligatorias (SB y BB) ya están en el centro formando el primer bote. No hay cartas descubiertas sobre la mesa.',
      mathFocus: 'Selección de Manos Iniciales & Dominación',
      mathFormula: 'Dominación: AK vs AQ tiene un 74% de ventaja matemática pre-flop.',
      beginnerMistake: 'Pagar con cualquier combinación de cartas mediocres "para ver el flop barato".',
      hardinRule: 'Juega manos premium y aprovecha la posición del Botón para tomar la iniciativa.',
    },
    {
      id: 'flop',
      number: 2,
      name: 'Flop',
      subtitle: 'Las 3 primeras cartas comunitarias compartidas',
      boardCount: 3,
      cardsKnown: '5 de 7 cartas (¡El 71% de la mano ya está decidido!)',
      whoActsFirst: 'Ciega Pequeña o primer jugador a la izquierda del botón',
      whoActsLast: 'Botón (BTN) habla de ÚLTIMO (máxima ventaja)',
      heroAction: 'Rival pasa (Check). Hero apuesta $10 por Valor.',
      villainAction: 'Rival paga los $10.',
      potBefore: 15,
      betThisRound: 20,
      potTotal: 35,
      whatIsHappening: 'El repartidor quema una carta y descubre 3 cartas comunitarias en el centro. Cualquier jugador puede combinar sus 2 cartas privadas con estas 3 para armar su mejor mano.',
      mathFocus: 'Conteo de Outs & Regla del 4 de Hardin',
      mathFormula: 'Equity del Flop al River = Outs × 4 (ej. 9 outs de color × 4 = ~36%)',
      beginnerMistake: 'Perseguir proyectos milagrosos (gutshots de 4 outs) pagando apuestas desproporcionadas.',
      hardinRule: 'Si tus Pot Odds son peores que tu probabilidad de ligar (equity), retírate sin dudar.',
    },
    {
      id: 'turn',
      number: 3,
      name: 'Turn (4ª Calle)',
      subtitle: 'La cuarta carta comunitaria en juego',
      boardCount: 4,
      cardsKnown: '6 de 7 cartas (86% de la información final)',
      whoActsFirst: 'Primer jugador a la izquierda del botón',
      whoActsLast: 'Botón (BTN) habla de último',
      heroAction: 'Rival pasa. Hero apuesta $25. Rival paga $25.',
      villainAction: 'Rival iguala los $25.',
      potBefore: 35,
      betThisRound: 50,
      potTotal: 85,
      whatIsHappening: 'Se descubre la cuarta carta comunitaria. Solo queda 1 carta por salir en toda la mano. El tamaño de las apuestas suele aumentar drásticamente.',
      mathFocus: 'La Regla del 2 & Implied Odds',
      mathFormula: 'Equity del Turn al River = Outs × 2 (ej. 9 outs × 2 = ~18%)',
      beginnerMistake: 'Olvidar que en el Turn solo queda UNA carta por salir; tu probabilidad es la mitad que en el Flop.',
      hardinRule: 'Aplica siempre la Regla del 2: Outs × 2 para calcular si pagar la apuesta es rentable.',
    },
    {
      id: 'river',
      number: 4,
      name: 'River (5ª y Última Calle)',
      subtitle: 'La quinta carta: no saldrán más cartas en la baraja',
      boardCount: 5,
      cardsKnown: '7 de 7 cartas (100% de la información final)',
      whoActsFirst: 'Primer jugador a la izquierda del botón',
      whoActsLast: 'Botón (BTN) habla de último',
      heroAction: 'Rival pasa. Hero hace una apuesta por Valor de $45.',
      villainAction: 'Rival paga los $45 con su pareja peor.',
      potBefore: 85,
      betThisRound: 90,
      potTotal: 175,
      whatIsHappening: 'Se descubre la 5ª y definitiva carta. Se acabaron los proyectos futuros: ya nadie puede mejorar. Las manos están hechas de forma irreversible.',
      mathFocus: 'Value Betting vs Farol Puro & Pot Odds',
      mathFormula: 'Apuesta por Valor: ¿Pagan al menos un 50% de manos peores en su rango?',
      beginnerMistake: 'Pasar con manos ganadoras por miedo o pagar apuestas enormes con manos irrelevantes.',
      hardinRule: 'En el River solo existen dos motivos para apostar: hacer que pague una mano peor (Valor) o hacer que tire una mano mejor (Farol).',
    },
    {
      id: 'showdown',
      number: 5,
      name: 'Showdown',
      subtitle: 'El momento de la verdad: se revelan las cartas',
      boardCount: 5,
      cardsKnown: '100% cartas reveladas a toda la mesa',
      whoActsFirst: 'El último jugador que apostó o subió en el River',
      whoActsLast: 'Los jugadores que pagaron muestran después',
      heroAction: 'Hero muestra sus cartas y se lleva el Bote de $175',
      villainAction: 'Rival muestra su mano perdedora',
      potBefore: 175,
      betThisRound: 0,
      potTotal: 175,
      whatIsHappening: 'Ambos jugadores descubren sus cartas privadas. El repartidor evalúa la mejor combinación de 5 cartas de cada uno y otorga todo el bote acumulado al ganador.',
      mathFocus: 'Evaluación de Manos & EV Acumulado',
      mathFormula: 'Resultado: +$175 de Bote ganado gracias a decisiones con EV positivo.',
      beginnerMistake: 'Muckear (tirar) las cartas sin mostrarlas si sospechas que podrías haber ganado.',
      hardinRule: 'Toma nota del juego del rival: sus cartas reveladas en el showdown te dicen qué manos juega y cómo piensa.',
    },
  ];

  const currentStep = steps[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < steps.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      if (nextIdx === steps.length - 1) {
        fireSuccessConfetti();
      }
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Simulador del Flujo del Juego
            </span>
            <span className="text-xs text-slate-400 font-mono">Guía Paso a Paso</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
            ¿Cómo se Desarrolla una Mano de Poker?
          </h3>
          <p className="text-xs text-slate-400">
            Avanza paso a paso desde el Pre-Flop hasta el Showdown para entender cuándo sale cada carta, quién habla y qué matemáticas se aplican.
          </p>
        </div>

        {/* Scenario Toggle */}
        <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex text-xs font-bold">
          <button
            onClick={() => {
              setExampleScenario('made_hand');
              setCurrentStepIdx(0);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              exampleScenario === 'made_hand'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ejemplo 1: Mano Hecha (A-K)
          </button>
          <button
            onClick={() => {
              setExampleScenario('flush_draw');
              setCurrentStepIdx(0);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              exampleScenario === 'flush_draw'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ejemplo 2: Proyecto Color
          </button>
        </div>
      </div>

      {/* Street Progress Step Pills */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {steps.map((s, idx) => {
          const isActive = idx === currentStepIdx;
          const isPassed = idx < currentStepIdx;

          return (
            <button
              key={s.id}
              onClick={() => {
                setCurrentStepIdx(idx);
                if (idx === steps.length - 1) fireSuccessConfetti();
              }}
              className={`p-2 sm:p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black shadow-lg shadow-emerald-500/20 scale-105'
                  : isPassed
                  ? 'bg-slate-900/90 text-emerald-400 border-emerald-500/40 font-bold'
                  : 'bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] sm:text-xs uppercase tracking-wider font-mono">
                Paso {s.number}
              </div>
              <div className="text-xs sm:text-sm font-black truncate">
                {s.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual Table Simulation Area */}
      <div className="relative bg-gradient-to-b from-slate-900 via-emerald-950/80 to-slate-950 rounded-3xl p-6 sm:p-8 border-4 border-amber-950/80 shadow-2xl overflow-hidden">
        {/* Table Inner Ring */}
        <div className="absolute inset-3 rounded-[32px] border border-emerald-500/20 pointer-events-none" />

        {/* Top: Current Street Banner & Pot */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 relative z-10">
          <div className="bg-slate-950/90 border border-slate-800 px-4 py-2 rounded-2xl flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">
              {currentStep.number}
            </span>
            <div>
              <span className="text-sm font-black text-white block">
                {currentStep.name}
              </span>
              <span className="text-[11px] text-slate-400">
                {currentStep.cardsKnown}
              </span>
            </div>
          </div>

          {/* Dynamic Pot Badge */}
          <div className="flex items-center gap-2 bg-slate-950/90 border border-amber-500/50 px-4 py-2 rounded-2xl shadow-lg">
            <PokerChip amount={currentStep.potTotal} size="sm" color="gold" />
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                BOTE ACUMULADO:
              </span>
              <span className="text-base font-black text-white font-mono">
                ${currentStep.potTotal}
              </span>
            </div>
          </div>
        </div>

        {/* Middle: Community Board (Cards deal dynamically according to street) */}
        <div className="my-6 flex flex-col items-center justify-center relative z-10">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <span>Cartas Comunitarias en la Mesa</span>
            <span className="text-emerald-400 font-mono">({currentStep.boardCount} de 5)</span>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {[0, 1, 2, 3, 4].map((slotIdx) => {
              const isRevealed = slotIdx < currentStep.boardCount;
              const card = activeScenario.board[slotIdx];
              const slotLabel = slotIdx < 3 ? 'FLOP' : slotIdx === 3 ? 'TURN' : 'RIVER';

              return (
                <div key={slotIdx} className="relative">
                  {isRevealed && card ? (
                    <div className="animate-scaleUp">
                      <PlayingCard card={card} size="md" />
                      <span className="text-[9px] font-mono text-emerald-400 font-bold block text-center mt-1">
                        {slotLabel}
                      </span>
                    </div>
                  ) : (
                    <div className="w-14 sm:w-16 h-20 sm:h-24 rounded-xl border-2 border-dashed border-emerald-500/25 bg-emerald-950/30 flex flex-col items-center justify-center">
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-emerald-500/40">
                        {slotLabel}
                      </span>
                      <span className="text-[9px] text-slate-600 font-mono">
                        {slotIdx === 3 ? '4ª carta' : slotIdx === 4 ? '5ª carta' : `Carta ${slotIdx + 1}`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: Players Hand Representation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t border-emerald-500/20 relative z-10">
          {/* Rival Box */}
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-rose-400 block">
                Rival (Ciega Grande - BB)
              </span>
              <span className="text-[11px] text-slate-400">
                {currentStep.id === 'showdown'
                  ? activeScenario.villainHandName
                  : 'Cartas ocultas boca abajo'}
              </span>
            </div>
            <div className="flex gap-1.5">
              {currentStep.id === 'showdown' ? (
                activeScenario.villainCards.map((c, i) => (
                  <PlayingCard key={i} card={c} size="sm" />
                ))
              ) : (
                <>
                  <PlayingCard hidden size="sm" />
                  <PlayingCard hidden size="sm" />
                </>
              )}
            </div>
          </div>

          {/* Hero Box */}
          <div className="bg-slate-950/90 p-3 rounded-2xl border border-emerald-500/50 flex items-center justify-between shadow-lg">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-emerald-400">
                  TÚ (Hero - Botón BTN)
                </span>
                <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 rounded-full">
                  Dealer
                </span>
              </div>
              <span className="text-[11px] text-emerald-300 font-medium">
                {currentStep.id === 'showdown'
                  ? activeScenario.heroHandName
                  : currentStep.id === 'preflop'
                  ? 'Mano inicial privada'
                  : 'Conectando con la mesa'}
              </span>
            </div>
            <div className="flex gap-1.5">
              {activeScenario.heroCards.map((c, i) => (
                <PlayingCard key={i} card={c} size="sm" isHighlighted />
              ))}
            </div>
          </div>
        </div>

        {/* Showdown Verdict Banner */}
        {currentStep.id === 'showdown' && (
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500 text-center animate-scaleUp">
            <span className="text-xs uppercase font-black text-amber-400 tracking-wider block mb-1">
              🏆 Resultado del Showdown:
            </span>
            <p className="text-sm sm:text-base font-bold text-white mb-1">
              {activeScenario.winnerVerdict}
            </p>
            <p className="text-xs text-emerald-300">
              ¡Hero gana el bote completo de <strong>${currentStep.potTotal}</strong>!
            </p>
          </div>
        )}

        {/* Controls: Prev / Next */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800 relative z-10">
          <button
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              currentStepIdx === 0
                ? 'opacity-30 cursor-not-allowed text-slate-600 bg-slate-950'
                : 'text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Ronda Anterior</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-900 transition-all border border-slate-800"
            title="Volver a empezar la mano"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Mano</span>
          </button>

          {currentStepIdx < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-lg shadow-emerald-500/30 transition-all hover:scale-105"
            >
              <span>Avanzar a {steps[currentStepIdx + 1].name}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/30 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ver de Nuevo</span>
            </button>
          )}
        </div>
      </div>

      {/* Educational Deep Dive Card for Current Street */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
        {/* Street Title & Summary */}
        <div className="pb-3 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
              Desglose Didáctico de la Calle:
            </span>
            <h4 className="text-lg sm:text-xl font-black text-white">
              Fase {currentStep.number}: {currentStep.name}
            </h4>
          </div>
          <span className="text-xs text-slate-400 italic">
            "{currentStep.subtitle}"
          </span>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* Card 1: What happens */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-rose-400 flex items-center gap-1.5 uppercase text-xs tracking-wide">
              <Info className="w-4 h-4" />
              <span>¿Qué está ocurriendo en la mesa?</span>
            </span>
            <p className="text-slate-300 leading-relaxed font-medium">
              {currentStep.whatIsHappening}
            </p>
          </div>

          {/* Card 2: Turn of speech */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-400 flex items-center gap-1.5 uppercase text-xs tracking-wide">
              <Zap className="w-4 h-4" />
              <span>Orden de Turno en esta Ronda:</span>
            </span>
            <div className="text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-rose-400 font-bold">1º en hablar:</span>
                <span>{currentStep.whoActsFirst}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">Último en hablar:</span>
                <span>{currentStep.whoActsLast}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Math formula */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase text-xs tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>Matemática de Hardin para esta Fase:</span>
            </span>
            <div className="font-mono text-emerald-300 bg-slate-950 p-2.5 rounded-xl border border-emerald-500/20 text-xs">
              {currentStep.mathFormula}
            </div>
          </div>

          {/* Card 4: Golden rule for novices */}
          <div className="bg-amber-950/20 p-4 rounded-2xl border border-amber-500/30 text-amber-200 space-y-1.5">
            <span className="font-bold text-amber-300 flex items-center gap-1.5 text-xs uppercase tracking-wide">
              <HelpCircle className="w-4 h-4" />
              <span>Error Común y Consejo de Oro:</span>
            </span>
            <p className="text-xs leading-relaxed text-amber-200/90 font-medium">
              {currentStep.hardinRule}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
