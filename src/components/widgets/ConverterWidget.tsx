import React, { useState } from 'react';
import { ratioToPercent } from '../../engine/math';

export const ConverterWidget: React.FC = () => {
  const [ratioVal, setRatioVal] = useState<number>(3.0); // 3:1

  const currentPercent = ratioToPercent(ratioVal);

  const quickPresets = [
    { label: 'Color (4 : 1)', ratio: 4.1, pct: 19.6 },
    { label: 'Escalera (5 : 1)', ratio: 4.8, pct: 17.4 },
    { label: 'Gutshot (10.5 : 1)', ratio: 10.5, pct: 8.7 },
    { label: 'Set-Mining (7.5 : 1)', ratio: 7.5, pct: 11.8 },
    { label: 'Coin Flip (1 : 1)', ratio: 1.0, pct: 50.0 },
    { label: 'Apuesta Pot (2 : 1)', ratio: 2.0, pct: 33.3 },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400">Conversor Interactivo: Odds vs Porcentaje</h3>
          <p className="text-xs text-slate-400">Capítulo 4 & 5: Dominando la conversión mental</p>
        </div>
        <span className="text-xs bg-emerald-500/20 text-emerald-300 font-mono px-2 py-1 rounded">
          Insight First
        </span>
      </div>

      {/* Main interactive display */}
      <div className="grid grid-cols-2 gap-4 my-6 text-center">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Odds en Contra</span>
          <div className="text-3xl font-black text-amber-400 font-mono mt-1">
            {ratioVal.toFixed(1)} : 1
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Pierdes {ratioVal.toFixed(1)} veces por cada 1 que ganas</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Probabilidad / Equity</span>
          <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
            {currentPercent.toFixed(1)}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Fórmula: 1 / ({ratioVal.toFixed(1)} + 1)</p>
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-xs text-slate-400 font-mono">
          <span>0.5 : 1 (66%)</span>
          <span className="text-amber-300 font-bold">Desliza para explorar</span>
          <span>15.0 : 1 (6.2%)</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="15.0"
          step="0.1"
          value={ratioVal}
          onChange={(e) => setRatioVal(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
      </div>

      {/* Visual Bar representation */}
      <div className="mb-6">
        <div className="flex justify-between text-xs mb-1 font-semibold">
          <span className="text-emerald-400">Ganas: {currentPercent.toFixed(1)}%</span>
          <span className="text-rose-400">Pierdes: {(100 - currentPercent).toFixed(1)}%</span>
        </div>
        <div className="w-full h-4 bg-rose-950/60 rounded-full overflow-hidden flex border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-150"
            style={{ width: `${currentPercent}%` }}
          ></div>
          <div
            className="h-full bg-rose-600/70 transition-all duration-150"
            style={{ width: `${100 - currentPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Quick reference presets */}
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Puntos de Referencia Habituales en Poker:
        </span>
        <div className="grid grid-cols-3 gap-2">
          {quickPresets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setRatioVal(p.ratio)}
              className={`p-2 rounded-lg text-xs font-medium border text-left transition-all ${
                Math.abs(ratioVal - p.ratio) < 0.2
                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="font-bold">{p.label}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">{p.pct}%</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
