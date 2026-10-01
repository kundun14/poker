import React, { useState } from 'react';
import { calculateAlpha, calculateSetMiningCheck } from '../../engine/math';

export const PreflopStealWidget: React.FC = () => {
  const [tab, setTab] = useState<'set-mining' | 'steal'>('set-mining');

  // Set-Mining state
  const [callAmount, setCallAmount] = useState<number>(6); // e.g. $6 open raise
  const [effectiveStack, setEffectiveStack] = useState<number>(140); // $140 stack
  const [multiplierRule, setMultiplierRule] = useState<number>(20); // 20x or 15x rule

  const setMining = calculateSetMiningCheck(callAmount, effectiveStack, multiplierRule);

  // Steal state
  const [bbSize, setBbSize] = useState<number>(2); // $2 BB
  const [openSizeBb, setOpenSizeBb] = useState<number>(2.5); // 2.5 BB raise

  const smallBlind = bbSize / 2;
  const deadBlinds = smallBlind + bbSize;
  const riskAmount = openSizeBb * bbSize;
  const breakEvenSteal = calculateAlpha(riskAmount, deadBlinds);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400">Matemática Pre-Flop: Set-Mining & Steals</h3>
          <p className="text-xs text-slate-400">Capítulo 12 & 13: Decisiones matemáticas antes de ver el Flop</p>
        </div>
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setTab('set-mining')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              tab === 'set-mining' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Regla del {multiplierRule}x (Set-Mining)
          </button>
          <button
            onClick={() => setTab('steal')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              tab === 'steal' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Robo de Ciegas
          </button>
        </div>
      </div>

      {tab === 'set-mining' ? (
        <div>
          {/* Multiplier rule toggle */}
          <div className="flex items-center justify-between mb-4 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">Criterio de Multiplicador de Stack:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setMultiplierRule(15)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  multiplierRule === 15 ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                }`}
              >
                15x (vs Rivales Loose)
              </button>
              <button
                onClick={() => setMultiplierRule(20)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  multiplierRule === 20 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                }`}
              >
                20x (Estándar de Alton Hardin)
              </button>
            </div>
          </div>

          {/* Verdict Banner */}
          <div
            className={`p-4 rounded-xl border mb-6 text-center transition-all ${
              setMining.isRecommended
                ? 'bg-emerald-950/40 border-emerald-500/50 shadow-emerald-950/40 shadow-lg'
                : 'bg-rose-950/40 border-rose-500/50 shadow-rose-950/40 shadow-lg'
            }`}
          >
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Diagnóstico de Set-Mining (Parejas 22-99):
            </span>
            <div className="text-2xl font-black mt-1">
              {setMining.isRecommended ? (
                <span className="text-emerald-400">✓ CALL RENTABLE PARA BUSCAR TRÍO</span>
              ) : (
                <span className="text-rose-400">✗ FOLD: STACK INSUFICIENTE PARA SET-MINING</span>
              )}
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Stack efectivo actual es <span className="font-bold text-white">{setMining.currentMultiplier}x</span> la apuesta a pagar.
              {setMining.isRecommended
                ? ` Supera el mínimo recomendado de ${multiplierRule}x.`
                : ` Necesitas al menos ${multiplierRule}x ($${setMining.minStackNeeded}).`}
            </p>
          </div>

          {/* Probability reminder */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 flex justify-between items-center text-xs">
            <div>
              <span className="font-bold text-amber-400 block">Probabilidad de ligar Set en el Flop:</span>
              <span className="text-slate-400">11.8% (Exactamente 7.5 a 1 en contra)</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-emerald-400 block">Regla de Alton Hardin:</span>
              <span className="text-slate-400">Pide {multiplierRule}x para compensar las veces que no te pagan</span>
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">Apuesta a Pagar (Call):</span>
                <span className="font-bold text-rose-400">${callAmount}</span>
              </div>
              <input
                type="range"
                min="2"
                max="25"
                value={callAmount}
                onChange={(e) => setCallAmount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">Stack Efectivo Más Corto:</span>
                <span className="font-bold text-emerald-400">${effectiveStack}</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="5"
                value={effectiveStack}
                onChange={(e) => setEffectiveStack(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Steal Math */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 text-center">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Frecuencia de Fold Necesaria para Auto-Profit (Break-Even):
            </span>
            <div className="text-4xl font-black text-amber-400 font-mono my-2">
              {breakEvenSteal.toFixed(1)}%
            </div>
            <p className="text-xs text-slate-300">
              Si las ciegas foldean más del <span className="font-bold text-emerald-400">{breakEvenSteal.toFixed(1)}%</span> de las veces,
              robar con cualquier combinación de 2 cartas es matemáticamente rentable en automático.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">Tamaño del Open-Raise:</span>
                <span className="font-bold text-emerald-400">{openSizeBb} BB (${riskAmount.toFixed(1)})</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="4.0"
                step="0.1"
                value={openSizeBb}
                onChange={(e) => setOpenSizeBb(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>Min-raise (2bb)</span>
                <span>Estándar (2.5bb)</span>
                <span>Grande (3.5bb)</span>
              </div>
            </div>

            <div className="flex flex-col justify-center text-xs space-y-2 border-l border-slate-800 pl-4">
              <div className="flex justify-between font-mono">
                <span className="text-slate-400">Nivel de Ciegas:</span>
                <div className="flex gap-1.5">
                  {[2, 5, 10].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBbSize(b)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        bbSize === b ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      ${b}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-400">Riesgo (Tu subida):</span>
                <span className="text-rose-400 font-bold">${riskAmount.toFixed(1)}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-400">Recompensa (Ciegas):</span>
                <span className="text-emerald-400 font-bold">${deadBlinds.toFixed(1)} (1.5 BB)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
