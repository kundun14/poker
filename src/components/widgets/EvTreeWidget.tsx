import React, { useState } from 'react';
import { GitBranch } from 'lucide-react';

export const EvTreeWidget: React.FC = () => {
  const [pot] = useState<number>(120);
  const [betToCall] = useState<number>(60);
  const [winShowdownPct, setWinShowdownPct] = useState<number>(45);

  const evFold = 0;
  const winAmount = pot; // win what was in the pot + bet
  const loseAmount = betToCall;

  const winP = winShowdownPct / 100;
  const loseP = 1 - winP;
  const evCall = Math.round(((winP * winAmount) - (loseP * loseAmount)) * 10) / 10;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400">Árbol de Decisión EV (Análisis Fuera de las Mesas)</h3>
          <p className="text-xs text-slate-400">Capítulo 17: Desglosando cada rama de expectativa matemática</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-mono">
          <GitBranch className="w-3.5 h-3.5" />
          <span>Árbol Multi-Rama</span>
        </div>
      </div>

      {/* Decision Tree Diagram */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6 space-y-4">
        {/* Root Node */}
        <div className="text-center">
          <span className="text-xs font-mono bg-slate-900 text-slate-300 border border-slate-700 px-3 py-1 rounded-full">
            Tu Turno: Bote actual = ${pot}, Apuesta a pagar = ${betToCall}
          </span>
        </div>

        {/* Two Main Branches: FOLD vs CALL */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          {/* FOLD Branch */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
            <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider block">Rama 1: FOLDEAR</span>
            <div className="text-2xl font-black text-slate-300 font-mono my-1">$0.00</div>
            <p className="text-[11px] text-slate-500">
              No arriesgas nada extra. El dinero pasado ya está perdido.
            </p>
          </div>

          {/* CALL Branch */}
          <div className={`p-4 rounded-xl border text-center transition-all ${evCall >= 0 ? 'bg-emerald-950/40 border-emerald-500/50' : 'bg-rose-950/40 border-rose-500/50'}`}>
            <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider block">Rama 2: PAGAR (CALL)</span>
            <div className={`text-2xl font-black font-mono my-1 ${evCall >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {evCall >= 0 ? `+$${evCall}` : `-$${Math.abs(evCall)}`}
            </div>
            <div className="text-[10px] space-y-0.5 text-slate-300 font-mono mt-1">
              <div>Ganas ({winShowdownPct}%): +${winAmount}</div>
              <div>Pierdes ({100 - winShowdownPct}%): -${loseAmount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Equity Slider */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4">
        <div className="flex justify-between text-xs font-mono mb-2">
          <span className="text-slate-400">Probabilidad de ganar al Showdown si pagas:</span>
          <span className="font-bold text-emerald-400">{winShowdownPct}%</span>
        </div>
        <input
          type="range"
          min="10"
          max="80"
          value={winShowdownPct}
          onChange={(e) => setWinShowdownPct(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
      </div>

      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
        <span className="font-bold text-white">Veredicto del Árbol: </span>
        {evCall > evFold
          ? `Hacer Call tiene un EV superior ($+${evCall} vs $0.00). La jugada matemáticamente correcta es PAGAR.`
          : `Hacer Call tiene un EV inferior ($${evCall} vs $0.00). La jugada matemáticamente correcta es FOLDEAR.`}
      </div>
    </div>
  );
};
