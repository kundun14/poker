import React, { useState } from 'react';
import { calculateRuleOf2And4 } from '../../engine/math';
import { PlayingCard } from '../common/PlayingCard';
import type { Card } from '../../types/poker';

export const OutPickerWidget: React.FC = () => {
  const [outs, setOuts] = useState<number>(9); // default 9 outs (flush draw)
  const [street, setStreet] = useState<'flop' | 'turn'>('turn');
  const [isAllIn, setIsAllIn] = useState<boolean>(false);

  const presets = [
    { name: 'Gutshot (Escalera interna)', outs: 4, desc: '4 cartas para escalera' },
    { name: 'Overcards (2 cartas mayores)', outs: 6, desc: '3 de cada carta superior' },
    { name: 'OESD (Escalera abierta)', outs: 8, desc: '4 en cada extremo' },
    { name: 'Flush Draw (Color)', outs: 9, desc: '9 del mismo palo' },
    { name: 'OESD + Overcard', outs: 11, desc: '8 escalera + 3 overcard' },
    { name: 'Monster Combo Draw', outs: 15, desc: '9 color + 6 escalera/par' },
  ];

  const result = calculateRuleOf2And4(outs, street, isAllIn);

  // Example cards for visual feel
  const exampleHand: Card[] = [
    { rank: 'A', suit: 'hearts' },
    { rank: '4', suit: 'hearts' },
  ];
  const exampleBoard: Card[] = [
    { rank: 'K', suit: 'hearts' },
    { rank: '8', suit: 'hearts' },
    { rank: '2', suit: 'clubs' },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400">Simulador: Conteo de Outs y Regla del 2 y 4</h3>
          <p className="text-xs text-slate-400">Capítulo 8 & 9: Estimación instantánea de Equity</p>
        </div>
        <span className="text-xs bg-amber-500/20 text-amber-300 font-mono px-2 py-1 rounded">
          {street === 'turn' || !isAllIn ? 'Regla del 2 (1 carta)' : 'Regla del 4 (2 cartas All-In)'}
        </span>
      </div>

      {/* Visual Hand & Board Preview */}
      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase font-bold text-emerald-400 mr-1">Tú:</span>
            {exampleHand.map((c, i) => (
              <PlayingCard key={i} card={c} size="xs" />
            ))}
          </div>
          <div className="h-6 w-px bg-slate-800"></div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Mesa:</span>
            {exampleBoard.map((c, i) => (
              <PlayingCard key={i} card={c} size="xs" />
            ))}
          </div>
        </div>
        <span className="text-[11px] text-amber-300 font-mono font-bold">
          Ejemplo: Color al As ({outs} outs)
        </span>
      </div>

      {/* Preset Buttons */}
      <div className="mb-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Selecciona un Proyecto Típico:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setOuts(p.outs)}
              className={`p-2 rounded-xl text-left border text-xs transition-all ${
                outs === p.outs
                  ? 'bg-emerald-950/80 border-emerald-500 text-white font-bold shadow'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="text-emerald-400 font-bold">{p.name}</div>
              <div className="text-[10px] text-slate-400">{p.outs} Outs</div>
            </button>
          ))}
        </div>
      </div>

      {/* Street & Situation toggle */}
      <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-950 p-2 rounded-xl border border-slate-800">
        <button
          onClick={() => { setStreet('turn'); setIsAllIn(false); }}
          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            street === 'turn' && !isAllIn
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          1 Calle (Turn a River o Flop sin all-in)
        </button>
        <button
          onClick={() => { setStreet('flop'); setIsAllIn(true); }}
          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            street === 'flop' && isAllIn
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          2 Calles (Flop a River All-In)
        </button>
      </div>

      {/* Slider for Outs */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-slate-400">Número de Outs Limpias:</span>
          <span className="text-2xl font-black text-amber-400 px-3 py-0.5 bg-slate-950 rounded-lg border border-slate-800">
            {outs}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="20"
          value={outs}
          onChange={(e) => setOuts(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>1 out</span>
          <span>10 outs</span>
          <span>20 outs</span>
        </div>
      </div>

      {/* Comparison Grid: Estimated vs Exact */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-emerald-500/40 p-4 rounded-xl text-center relative overflow-hidden">
          <div className="absolute top-2 right-2 text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-1.5 py-0.5 rounded">
            Cálculo Mental
          </div>
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            Regla del {result.multiplier}
          </span>
          <div className="text-4xl font-black text-emerald-400 font-mono my-1">
            {result.estimated}%
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            {result.multiplier === 2
              ? `${outs} outs × 2 = ${result.estimated}%`
              : outs > 8
              ? `(${outs} × 4) - (${outs} - 8) = ${result.estimated}%`
              : `${outs} outs × 4 = ${result.estimated}%`}
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 p-4 rounded-xl text-center relative overflow-hidden">
          <div className="absolute top-2 right-2 text-[10px] bg-blue-500/20 text-blue-300 font-mono px-1.5 py-0.5 rounded">
            Exacta
          </div>
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            Probabilidad Real
          </span>
          <div className="text-4xl font-black text-blue-400 font-mono my-1">
            {result.exact}%
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            Diferencia: ±{result.difference}% (¡Mínima!)
          </p>
        </div>
      </div>

      {/* Insight banner */}
      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-200/90 leading-relaxed">
        <span className="font-bold text-emerald-400">💡 Clave de Alton Hardin: </span>
        {street === 'turn' || !isAllIn
          ? 'Con una sola carta por ver, multiplica tus outs por 2. La precisión es prácticamente idéntica a la fórmula completa de probabilidad y la calculas en 1 segundo en la mesa.'
          : outs > 8
          ? 'Cuando vas All-In en el Flop con más de 8 outs, la regla clásica (Outs × 4) sobrestima ligeramente. Usa el ajuste de Hardin: resta (Outs - 8) para una precisión asombrosa.'
          : 'En situaciones de All-In en el Flop, multiplica por 4. Tienes dos oportunidades (Turn y River) para conectar tu mano ganadora.'}
      </div>
    </div>
  );
};
