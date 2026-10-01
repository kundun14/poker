import React, { useState } from 'react';
import { calculateAlpha, calculateMDF, calculateSemiBluffEV } from '../../engine/math';

export const SemiBluffMatrix: React.FC = () => {
  const [tab, setTab] = useState<'semi-bluff' | 'mdf'>('semi-bluff');

  // Semi-bluff state
  const [foldPercent, setFoldPercent] = useState<number>(40); // 40% fold
  const [cardEquity, setCardEquity] = useState<number>(36); // 36% equity (e.g. combo draw)
  const [deadPot, setDeadPot] = useState<number>(100);
  const [allInBet, setAllInBet] = useState<number>(120);

  const potIfCalled = deadPot + (allInBet * 2);
  const semiBluffResult = calculateSemiBluffEV(foldPercent, deadPot, cardEquity, allInBet, potIfCalled);

  // MDF / Alpha state
  const [potSize, setPotSize] = useState<number>(100);
  const [betSize, setBetSize] = useState<number>(75);

  const mdf = calculateMDF(potSize, betSize);
  const alpha = calculateAlpha(betSize, potSize);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400">Post-Flop: Semi-Farol All-In & MDF / Alpha</h3>
          <p className="text-xs text-slate-400">Capítulo 15 & 16: La matemática de apostar fuerte</p>
        </div>
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setTab('semi-bluff')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              tab === 'semi-bluff' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Semi-Bluff All-In
          </button>
          <button
            onClick={() => setTab('mdf')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              tab === 'mdf' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Alpha vs MDF
          </button>
        </div>
      </div>

      {tab === 'semi-bluff' ? (
        <div>
          {/* Main Semi-bluff summary */}
          <div
            className={`p-4 rounded-xl border mb-6 text-center transition-all ${
              semiBluffResult.ev > 0
                ? 'bg-emerald-950/40 border-emerald-500/50 shadow-emerald-950/40 shadow-lg'
                : 'bg-rose-950/40 border-rose-500/50 shadow-rose-950/40 shadow-lg'
            }`}
          >
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              EV Neto del Semi-Bluff All-In:
            </span>
            <div
              className={`text-4xl font-black font-mono my-1 ${
                semiBluffResult.ev > 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {semiBluffResult.ev >= 0 ? `+$${semiBluffResult.ev.toFixed(2)}` : `-$${Math.abs(semiBluffResult.ev).toFixed(2)}`}
            </div>
            <p className="text-xs text-slate-300">
              {semiBluffResult.ev > 0
                ? '✓ La combinación de Fold Equity + Card Equity hace que el All-In sea altamente rentable.'
                : '✗ El rival no foldea suficiente y tu mano no tiene suficiente equity si te paga.'}
            </p>
          </div>

          {/* Breakdown: 2 ways to win */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-amber-400 font-bold block uppercase">
                1. Fold Equity (El Rival Foldea):
              </span>
              <div className="text-2xl font-black text-white font-mono mt-1">
                +${semiBluffResult.foldEquityPortion.toFixed(2)}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Ganas el bote muerto (${deadPot}) el {foldPercent}% de las veces sin ver el showdown.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-blue-400 font-bold block uppercase">
                2. Showdown Equity (El Rival Paga):
              </span>
              <div
                className={`text-2xl font-black font-mono mt-1 ${
                  semiBluffResult.showdownPortion >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {semiBluffResult.showdownPortion >= 0
                  ? `+$${semiBluffResult.showdownPortion.toFixed(2)}`
                  : `-$${Math.abs(semiBluffResult.showdownPortion).toFixed(2)}`}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Si paga el restante {100 - foldPercent}%, juegas por el bote final de ${potIfCalled} con {cardEquity}% de equity.
              </p>
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">Fold Equity (Frecuencia de fold):</span>
                <span className="font-bold text-amber-400">{foldPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={foldPercent}
                onChange={(e) => setFoldPercent(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">Card Equity (Si te pagan):</span>
                <span className="font-bold text-emerald-400">{cardEquity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                value={cardEquity}
                onChange={(e) => setCardEquity(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">Bote Muerto en Flop:</span>
                <span className="font-bold text-white">${deadPot}</span>
              </div>
              <input
                type="range"
                min="30"
                max="300"
                step="10"
                value={deadPot}
                onChange={(e) => setDeadPot(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">Tu Apuesta de All-In:</span>
                <span className="font-bold text-rose-400">${allInBet}</span>
              </div>
              <input
                type="range"
                min="30"
                max="300"
                step="10"
                value={allInBet}
                onChange={(e) => setAllInBet(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* MDF vs Alpha */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider block">
                Alpha (Break-Even Bluff)
              </span>
              <div className="text-4xl font-black text-amber-400 font-mono my-2">
                {alpha.toFixed(1)}%
              </div>
              <p className="text-xs text-slate-400">
                Frecuencia que el rival debe foldear para que un farol puro con 0% equity sea rentable.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-xs uppercase font-bold text-blue-400 tracking-wider block">
                MDF (Minimum Defense Frequency)
              </span>
              <div className="text-4xl font-black text-blue-400 font-mono my-2">
                {mdf.toFixed(1)}%
              </div>
              <p className="text-xs text-slate-400">
                Porcentaje mínimo de tu rango que debes defender (pagar o subir) para no ser explotado.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">Bote Actual:</span>
                <span className="font-bold text-white">${potSize}</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="5"
                value={potSize}
                onChange={(e) => setPotSize(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">Tamaño de la Apuesta:</span>
                <span className="font-bold text-rose-400">${betSize}</span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={betSize}
                onChange={(e) => setBetSize(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
