import React, { useState } from 'react';

export const ValueSizingWidget: React.FC = () => {
  const [potSize] = useState<number>(100);
  const [betPercent, setBetPercent] = useState<number>(60); // 60% of pot

  const betAmount = Math.round((betPercent / 100) * potSize);

  // Model how calling frequency drops as bet size increases:
  // e.g., 20% pot -> 85% call; 50% pot -> 60% call; 75% pot -> 42% call; 120% pot -> 22% call.
  const callProb = Math.max(0.1, Math.min(0.95, 1 - (betPercent / 160)));
  const callProbPct = Math.round(callProb * 100);

  const valueEV = Math.round(betAmount * callProb * 10) / 10;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400">Optimizador de Value Bet: Tamaño vs Frecuencia</h3>
          <p className="text-xs text-slate-400">Capítulo 14: Extraer el máximo valor sin espantar a manos peores</p>
        </div>
        <span className="text-xs bg-amber-500/20 text-amber-300 font-mono px-2 py-1 rounded">
          Bote: ${potSize}
        </span>
      </div>

      {/* Main Metric Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6 text-center">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Tamaño Apuesta</span>
          <div className="text-2xl font-black text-white font-mono mt-1">${betAmount}</div>
          <span className="text-[10px] text-slate-500 font-mono">({betPercent}% del bote)</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">% que Rival Paga</span>
          <div className="text-2xl font-black text-blue-400 font-mono mt-1">{callProbPct}%</div>
          <span className="text-[10px] text-slate-500 font-mono">Elasticidad de rango</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/40">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block">Ganancia Esperada (EV)</span>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">+${valueEV}</div>
          <span className="text-[10px] text-slate-400 font-mono">Apuesta × Frecuencia</span>
        </div>
      </div>

      {/* Slider */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
        <div className="flex justify-between text-xs font-mono mb-2">
          <span className="text-slate-400">Ajusta el tamaño de tu apuesta:</span>
          <span className="font-bold text-amber-400">{betPercent}% del bote (${betAmount})</span>
        </div>
        <input
          type="range"
          min="15"
          max="150"
          value={betPercent}
          onChange={(e) => setBetPercent(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
          <span>Pequeña (20%)</span>
          <span>Media (60%)</span>
          <span>Bote (100%)</span>
          <span>Overbet (150%)</span>
        </div>
      </div>

      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-200/90 leading-relaxed">
        <span className="font-bold text-emerald-400">🎯 Regla de Alton Hardin: </span>
        El error del novato es apostar demasiado grande y asustar a todas las manos inferiores (haciendo que el rival foldee el 90%), o apostar ridículamente poco regalando valor. El punto dulce suele rondar entre el <strong>55% y 75% del bote</strong> contra jugadores sensatos.
      </div>
    </div>
  );
};
