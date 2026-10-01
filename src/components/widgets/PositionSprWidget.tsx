import React, { useState } from 'react';
import type { PlayerPosition } from '../../types/poker';

export const PositionSprWidget: React.FC = () => {
  const [selectedPos, setSelectedPos] = useState<PlayerPosition>('BTN');
  const [effectiveStack, setEffectiveStack] = useState<number>(200);
  const [flopPot, setFlopPot] = useState<number>(20);

  const spr = flopPot > 0 ? Math.round((effectiveStack / flopPot) * 10) / 10 : 0;

  const positions: { pos: PlayerPosition; name: string; rangePct: string; advantage: string; color: string }[] = [
    { pos: 'UTG', name: 'Under the Gun (Primero en hablar)', rangePct: '12-15%', advantage: 'Muy Desfavorable. 5 jugadores hablarán después de ti.', color: 'text-rose-400' },
    { pos: 'MP', name: 'Middle Position', rangePct: '16-20%', advantage: 'Moderada. Menos rivales por hablar.', color: 'text-amber-400' },
    { pos: 'CO', name: 'Cutoff', rangePct: '25-30%', advantage: 'Favorable. Penúltimo en posición post-flop.', color: 'text-blue-400' },
    { pos: 'BTN', name: 'Botón (Dealer)', rangePct: '40-50%', advantage: 'MÁXIMA VENTAJA. Siempre hablas el último post-flop.', color: 'text-emerald-400' },
    { pos: 'SB', name: 'Small Blind', rangePct: '35-45% (vs BB)', advantage: 'Desfavorable post-flop. Hablas primero siempre.', color: 'text-rose-400' },
    { pos: 'BB', name: 'Big Blind', rangePct: 'Defensa amplia', advantage: 'Tienes descuento preflop, pero jugarás fuera de posición.', color: 'text-amber-400' },
  ];

  const currentPosData = positions.find((p) => p.pos === selectedPos) || positions[3];

  let sprZone = '';
  let sprAdvice = '';
  let sprColor = '';
  if (spr <= 3) {
    sprZone = 'SPR Bajo (< 3): Zona de Compromiso Rápido';
    sprAdvice = 'Cualquier Top Pair fuerte o Overpair está automáticamente comprometida para ir All-in.';
    sprColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  } else if (spr <= 6) {
    sprZone = 'SPR Medio (3 a 6): La Zona Peligrosa';
    sprAdvice = 'Top pair ya no es un monstruo. Cuidado con cometer stacks enteros con una sola pareja.';
    sprColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  } else {
    sprZone = 'SPR Alto (> 6): Poker de Stacks Profundos';
    sprAdvice = 'Las parejas bajas (set-mining), suited connectors y proyectos especulativos ganan valor masivo.';
    sprColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400">Posición & Stack-to-Pot Ratio (SPR)</h3>
          <p className="text-xs text-slate-400">Capítulo 2: Los dos pilares estructurales de la mesa</p>
        </div>
        <span className="text-xs bg-indigo-500/20 text-indigo-300 font-mono px-2 py-1 rounded">
          SPR: {spr}
        </span>
      </div>

      {/* Position Selector Table */}
      <div className="mb-6">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Selecciona una Posición en la Mesa:
        </label>
        <div className="grid grid-cols-6 gap-2">
          {positions.map((p) => (
            <button
              key={p.pos}
              onClick={() => setSelectedPos(p.pos)}
              className={`p-2 rounded-xl text-center border font-mono font-bold text-xs transition-all ${
                selectedPos === p.pos
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div>{p.pos}</div>
            </button>
          ))}
        </div>

        <div className="mt-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex justify-between items-center mb-1">
            <span className={`text-sm font-bold ${currentPosData.color}`}>{currentPosData.name}</span>
            <span className="text-xs font-mono text-slate-400">Rango jugable: {currentPosData.rangePct}</span>
          </div>
          <p className="text-xs text-slate-400">{currentPosData.advantage}</p>
        </div>
      </div>

      {/* SPR Calculator */}
      <div className="space-y-4">
        <div className={`p-4 rounded-xl border ${sprColor}`}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs uppercase font-extrabold tracking-wider">{sprZone}</span>
            <span className="text-2xl font-black font-mono">SPR = {spr}</span>
          </div>
          <p className="text-xs leading-relaxed opacity-90">{sprAdvice}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">Stack Efectivo:</span>
              <span className="font-bold text-emerald-400">${effectiveStack}</span>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={effectiveStack}
              onChange={(e) => setEffectiveStack(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">Bote en el Flop:</span>
              <span className="font-bold text-amber-400">${flopPot}</span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              step="5"
              value={flopPot}
              onChange={(e) => setFlopPot(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
