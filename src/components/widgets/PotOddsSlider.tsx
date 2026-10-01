import React, { useState } from 'react';
import { calculatePotOdds } from '../../engine/math';
import { PokerChip } from '../common/PokerChip';

export const PotOddsSlider: React.FC = () => {
  const [potBeforeBet, setPotBeforeBet] = useState<number>(100);
  const [opponentBet, setOpponentBet] = useState<number>(50);
  const [heroEquity, setHeroEquity] = useState<number>(30); // 30% equity

  const callAmount = opponentBet;
  const potOdds = calculatePotOdds(callAmount, potBeforeBet, opponentBet);
  const isProfitable = heroEquity >= potOdds.percent;
  const equityEdge = Math.round((heroEquity - potOdds.percent) * 10) / 10;

  const standardSizes = [
    { label: '1/3 Bote', frac: 1 / 3 },
    { label: '1/2 Bote', frac: 1 / 2 },
    { label: '2/3 Bote', frac: 2 / 3 },
    { label: 'Bote Entero', frac: 1 },
    { label: 'Overbet 1.5x', frac: 1.5 },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400">Batalla Matemática: Pot Odds vs Equity</h3>
          <p className="text-xs text-slate-400">Capítulo 6 & 11: La regla de oro del Call en el poker</p>
        </div>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
            isProfitable
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
          }`}
        >
          {isProfitable ? '✓ CALL RENTABLE (+EV)' : '✗ FOLD MATEMÁTICO (-EV)'}
        </span>
      </div>

      {/* Main Verdict Card */}
      <div
        className={`p-4 rounded-xl border mb-6 transition-all duration-300 ${
          isProfitable
            ? 'bg-emerald-950/40 border-emerald-500/50 shadow-emerald-950/50 shadow-lg'
            : 'bg-rose-950/40 border-rose-500/50 shadow-rose-950/50 shadow-lg'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Decisión Óptima:</span>
            <div className="text-2xl font-black mt-0.5">
              {isProfitable ? (
                <span className="text-emerald-400">PAGAR (CALL) ES +EV</span>
              ) : (
                <span className="text-rose-400">FOLDEAR ES LO CORRECTO</span>
              )}
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {isProfitable
                ? `Tu Equity (${heroEquity}%) supera el precio del bote (${potOdds.percent}%). Margen positivo: +${equityEdge}%.`
                : `Tu Equity (${heroEquity}%) es inferior a las Pot Odds (${potOdds.percent}%). Déficit: ${equityEdge}%.`}
            </p>
          </div>

          <div className="text-right font-mono flex flex-col items-end">
            <span className="text-xs text-slate-400 block mb-1">Ratio Requerido</span>
            <div className="flex items-center gap-1.5">
              <PokerChip amount={callAmount} size="sm" />
              <span className="text-xl font-bold text-amber-300">{potOdds.ratio}</span>
            </div>
          </div>
        </div>

        {/* Dual Bar Comparison */}
        <div className="mt-4 space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1 font-mono">
              <span className="text-slate-400">Pot Odds (Precio a pagar):</span>
              <span className="text-amber-400 font-bold">{potOdds.percent}%</span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-amber-500 transition-all duration-200"
                style={{ width: `${Math.min(100, potOdds.percent)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1 font-mono">
              <span className="text-slate-400">Tu Equity (Probabilidad de ganar):</span>
              <span className="text-emerald-400 font-bold">{heroEquity}%</span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full transition-all duration-200 ${
                  isProfitable ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, heroEquity)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sliders & Controls */}
      <div className="space-y-4">
        {/* Preset bet sizes */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Tamaños de Apuesta Comunes:
          </label>
          <div className="grid grid-cols-5 gap-2">
            {standardSizes.map((s, idx) => {
              const betVal = Math.round(potBeforeBet * s.frac);
              return (
                <button
                  key={idx}
                  onClick={() => setOpponentBet(betVal)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-all ${
                    opponentBet === betVal
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {s.label}
                  <div className="text-[10px] font-mono opacity-80">${betVal}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">Bote Inicial:</span>
              <span className="font-bold text-white">${potBeforeBet}</span>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={potBeforeBet}
              onChange={(e) => setPotBeforeBet(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">Apuesta Rival (Call):</span>
              <span className="font-bold text-rose-400">${opponentBet}</span>
            </div>
            <input
              type="range"
              min="5"
              max="500"
              step="5"
              value={opponentBet}
              onChange={(e) => setOpponentBet(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>
        </div>

        {/* Hero Equity Slider */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-slate-400">Tu Card Equity estimada:</span>
            <span className="font-bold text-emerald-400">{heroEquity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={heroEquity}
            onChange={(e) => setHeroEquity(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
      </div>
    </div>
  );
};
