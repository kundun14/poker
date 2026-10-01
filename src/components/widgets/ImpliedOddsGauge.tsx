import React, { useState } from 'react';
import { calculateImpliedOddsNeeded, calculatePotOdds } from '../../engine/math';

export const ImpliedOddsGauge: React.FC = () => {
  const [potSize, setPotSize] = useState<number>(60);
  const [betToCall, setBetToCall] = useState<number>(30);
  const [equity, setEquity] = useState<number>(18); // e.g. 18% (Flush draw 9 outs on turn)
  const [opponentRemainingStack, setOpponentRemainingStack] = useState<number>(150);

  const directOdds = calculatePotOdds(betToCall, potSize, betToCall);
  const implied = calculateImpliedOddsNeeded(betToCall, equity, potSize + betToCall + betToCall);
  const canCover = opponentRemainingStack >= implied.neededAmount;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400">Calculadora de Odds Implícitas</h3>
          <p className="text-xs text-slate-400">Capítulo 7: Cuánto dinero futuro necesitas ganar</p>
        </div>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            canCover
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
          }`}
        >
          {canCover ? '✓ RIVAL TIENE STACK SUFICIENTE' : '✗ STACK INSUFICIENTE (FOLD)'}
        </span>
      </div>

      {/* Main Results Banner */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
            Pot Odds Directas
          </span>
          <div className="text-2xl font-black text-blue-400 font-mono mt-1">
            {directOdds.percent}%
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">Ratio: {directOdds.ratio}</p>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
            Dinero Extra en River
          </span>
          <div className="text-2xl font-black text-amber-400 font-mono mt-1">
            ${implied.neededAmount.toFixed(0)}
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">Extraer de su stack</p>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
            Stack Restante Rival
          </span>
          <div className={`text-2xl font-black font-mono mt-1 ${canCover ? 'text-emerald-400' : 'text-rose-400'}`}>
            ${opponentRemainingStack}
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">
            {canCover ? `Margen: +$${opponentRemainingStack - Math.round(implied.neededAmount)}` : 'Déficit de stack'}
          </p>
        </div>
      </div>

      {/* Stack comparison bar */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-slate-400">Progreso de Requerimiento de Stack:</span>
          <span className={canCover ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
            {Math.min(200, Math.round((opponentRemainingStack / (implied.neededAmount || 1)) * 100))}%
          </span>
        </div>
        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 flex">
          <div
            className={`h-full transition-all duration-300 ${canCover ? 'bg-emerald-500' : 'bg-rose-500'}`}
            style={{ width: `${Math.min(100, (opponentRemainingStack / (implied.neededAmount || 1)) * 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-slate-400">Bote Actual:</span>
            <span className="text-white font-bold">${potSize}</span>
          </div>
          <input
            type="range"
            min="20"
            max="300"
            step="10"
            value={potSize}
            onChange={(e) => setPotSize(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-slate-400">Apuesta a Pagar (Call):</span>
            <span className="text-rose-400 font-bold">${betToCall}</span>
          </div>
          <input
            type="range"
            min="5"
            max="150"
            step="5"
            value={betToCall}
            onChange={(e) => setBetToCall(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-slate-400">Stack Detrás del Rival:</span>
            <span className="text-white font-bold">${opponentRemainingStack}</span>
          </div>
          <input
            type="range"
            min="10"
            max="400"
            step="10"
            value={opponentRemainingStack}
            onChange={(e) => setOpponentRemainingStack(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-slate-400">Tu Card Equity:</span>
            <span className="text-emerald-400 font-bold">{equity}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="45"
            value={equity}
            onChange={(e) => setEquity(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
      </div>
    </div>
  );
};
