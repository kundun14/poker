import React, { useState } from 'react';
import { calculateEV } from '../../engine/math';

export const EvBalanceWidget: React.FC = () => {
  const [winProb, setWinProb] = useState<number>(35); // 35%
  const [winAmount, setWinAmount] = useState<number>(120); // $120
  const [loseAmount, setLoseAmount] = useState<number>(40); // $40

  const evResult = calculateEV(winProb, winAmount, loseAmount);

  // Calculate tilt angle for physical balance beam (-15deg to +15deg)
  const maxTilt = 18;
  const normalizedEv = Math.max(-100, Math.min(100, evResult.ev));
  const tiltAngle = (normalizedEv / 100) * maxTilt;

  const winP = winProb / 100;
  const loseP = (100 - winProb) / 100;
  const winEVPart = Math.round(winP * winAmount * 100) / 100;
  const loseEVPart = Math.round(loseP * loseAmount * 100) / 100;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400">La Balanza Física de EV (Valor Esperado)</h3>
          <p className="text-xs text-slate-400">Capítulo 10 & 17: El principio supremo del poker a largo plazo</p>
        </div>
        <span
          className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
            evResult.isProfitable
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
          }`}
        >
          {evResult.isProfitable ? '+EV (Rentable)' : '-EV (Pérdida)'}
        </span>
      </div>

      {/* EV Display */}
      <div className="text-center my-4">
        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
          Valor Esperado Promedio Por Decisión:
        </span>
        <div
          className={`text-5xl font-black font-mono tracking-tight my-1 transition-all ${
            evResult.isProfitable ? 'text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]' : 'text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.3)]'
          }`}
        >
          {evResult.formatted}
        </div>
        <p className="text-xs text-slate-400">
          En 1,000 repeticiones idénticas de esta jugada, ganarías{' '}
          <span className="font-bold text-white">
            {evResult.ev >= 0 ? `+$${(evResult.ev * 1000).toLocaleString()}` : `-$${Math.abs(evResult.ev * 1000).toLocaleString()}`}
          </span>
        </p>
      </div>

      {/* Physics-inspired Balance Beam Graphic */}
      <div className="relative h-44 my-6 flex flex-col items-center justify-center select-none overflow-hidden">
        {/* Pivot Fulcrum Base */}
        <div className="absolute bottom-2 w-0 h-0 border-x-[20px] border-x-transparent border-b-[36px] border-b-slate-700 z-10 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-amber-400 absolute top-7 -left-1"></div>
        </div>

        {/* Tilting Beam */}
        <div
          className="relative w-80 h-3 bg-gradient-to-r from-emerald-500 via-slate-600 to-rose-500 rounded-full transition-transform duration-500 ease-out origin-center flex justify-between items-center px-2 shadow-lg"
          style={{ transform: `rotate(${-tiltAngle}deg)` }}
        >
          {/* Left Pan (Win Pan) */}
          <div className="relative -top-14 -left-6 flex flex-col items-center">
            <div className="w-0.5 h-14 bg-emerald-400/80"></div>
            <div className="w-20 bg-slate-950 border-2 border-emerald-500 rounded-lg p-1.5 text-center shadow-lg">
              <span className="text-[10px] font-bold text-emerald-400 block uppercase">Ganancia</span>
              <span className="text-xs font-black text-white font-mono">+${winEVPart}</span>
              <span className="text-[9px] text-slate-400 block font-mono">({winProb}% × ${winAmount})</span>
            </div>
          </div>

          {/* Center Indicator */}
          <div className="w-3 h-3 rounded-full bg-white shadow ring-2 ring-slate-900"></div>

          {/* Right Pan (Lose Pan) */}
          <div className="relative -top-14 -right-6 flex flex-col items-center">
            <div className="w-0.5 h-14 bg-rose-400/80"></div>
            <div className="w-20 bg-slate-950 border-2 border-rose-500 rounded-lg p-1.5 text-center shadow-lg">
              <span className="text-[10px] font-bold text-rose-400 block uppercase">Pérdida</span>
              <span className="text-xs font-black text-white font-mono">-${loseEVPart}</span>
              <span className="text-[9px] text-slate-400 block font-mono">({100 - winProb}% × ${loseAmount})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-emerald-400 font-semibold">% Victoria:</span>
            <span className="font-bold text-white">{winProb}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={winProb}
            onChange={(e) => setWinProb(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-emerald-400 font-semibold">$ Ganas:</span>
            <span className="font-bold text-white">${winAmount}</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="5"
            value={winAmount}
            onChange={(e) => setWinAmount(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-rose-400 font-semibold">$ Pierdes:</span>
            <span className="font-bold text-white">${loseAmount}</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="5"
            value={loseAmount}
            onChange={(e) => setLoseAmount(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-rose-500"
          />
        </div>
      </div>
    </div>
  );
};
