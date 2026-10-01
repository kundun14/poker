import React, { useState } from 'react';
import type { Card, Rank, Suit } from '../../types/poker';
import { generateRangeMatrix } from '../../engine/combinatorics';
import { PlayingCard } from '../common/PlayingCard';

export const RangeMatrixWidget: React.FC = () => {
  // Dead cards (Hero + Board)
  const [deadCards, setDeadCards] = useState<Card[]>([
    { rank: 'A', suit: 'spades' },
    { rank: 'K', suit: 'spades' },
  ]);

  const [hoveredHand, setHoveredHand] = useState<string | null>('AA');

  const matrix = generateRangeMatrix(deadCards);

  // Compute total combos remaining vs baseline 1326 combos
  let totalCombosRemaining = 0;
  matrix.forEach(row => {
    row.forEach(cell => {
      totalCombosRemaining += cell.combosRemaining;
    });
  });

  const totalCombosDefault = 1326;
  const blockedCount = totalCombosDefault - totalCombosRemaining;
  const blockedPct = Math.round((blockedCount / totalCombosDefault) * 100);

  // Presets for quick blocker testing
  const presets = [
    {
      name: 'Hero: As Ks (Bloqueador de As)',
      cards: [
        { rank: 'A' as Rank, suit: 'spades' as Suit },
        { rank: 'K' as Rank, suit: 'spades' as Suit },
      ],
    },
    {
      name: 'Hero: Ah Ad (Bloqueas Pareja de Ases)',
      cards: [
        { rank: 'A' as Rank, suit: 'hearts' as Suit },
        { rank: 'A' as Rank, suit: 'diamonds' as Suit },
      ],
    },
    {
      name: 'Flop Seco: Kh 7d 2c + Hero: Kd',
      cards: [
        { rank: 'K' as Rank, suit: 'hearts' as Suit },
        { rank: '7' as Rank, suit: 'diamonds' as Suit },
        { rank: '2' as Rank, suit: 'clubs' as Suit },
        { rank: 'K' as Rank, suit: 'diamonds' as Suit },
      ],
    },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400">Matriz 13x13: Combinatoria y Efecto Bloqueador</h3>
          <p className="text-xs text-slate-400">Capítulo 18: Card Removal y reducción de combinaciones</p>
        </div>
        <span className="text-xs bg-indigo-500/20 text-indigo-300 font-mono px-2 py-1 rounded">
          1,326 Combos Totales
        </span>
      </div>

      {/* Preset Buttons */}
      <div className="mb-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Escenarios Típicos de Bloqueadores:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setDeadCards(p.cards)}
              className="p-2 rounded-xl text-left border border-slate-800 bg-slate-950 text-xs hover:border-slate-700 transition-all"
            >
              <div className="text-amber-400 font-bold">{p.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Visible Cards Badges */}
      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Cartas Vistas (Hero + Mesa):</span>
          <div className="flex gap-1.5">
            {deadCards.map((c, i) => (
              <PlayingCard key={i} card={c} size="xs" />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400">Combos Restantes: </span>
            <span className="font-bold text-emerald-400">{totalCombosRemaining}</span>
          </div>
          <div>
            <span className="text-slate-400">Bloqueados: </span>
            <span className="font-bold text-rose-400">-{blockedCount} ({blockedPct}%)</span>
          </div>
        </div>
      </div>

      {/* 13x13 Grid */}
      <div className="overflow-x-auto pb-2 flex justify-center">
        <div className="inline-grid grid-cols-13 gap-0.5 p-2 bg-slate-950 rounded-xl border border-slate-800 select-none">
          {matrix.map((row, rIdx) =>
            row.map((cell, cIdx) => {
              const isPair = cell.type === 'pair';
              const isSuited = cell.type === 'suited';
              const isBlocked = cell.blockedPercent > 0;
              const isFullyBlocked = cell.combosRemaining === 0;

              let bg = isPair
                ? 'bg-amber-600/30 text-amber-200 border-amber-500/30'
                : isSuited
                ? 'bg-emerald-600/30 text-emerald-200 border-emerald-500/30'
                : 'bg-blue-600/30 text-blue-200 border-blue-500/30';

              if (isFullyBlocked) {
                bg = 'bg-slate-900/40 text-slate-600 border-slate-800 line-through opacity-40';
              } else if (isBlocked) {
                bg += ' ring-1 ring-rose-500/40';
              }

              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  onMouseEnter={() => setHoveredHand(cell.hand)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 flex flex-col items-center justify-center text-[10px] sm:text-xs font-mono font-bold border rounded cursor-pointer transition-all hover:scale-110 hover:z-10 hover:border-white ${bg}`}
                  title={`${cell.hand}: ${cell.combosRemaining}/${cell.totalCombosDefault} combos`}
                >
                  <span className="leading-none">{cell.hand}</span>
                  <span className="text-[8px] font-normal opacity-80">{cell.combosRemaining}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Hover Detail Card */}
      {hoveredHand && (
        <div className="mt-4 bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
          <div>
            <span className="text-slate-400 font-semibold">Mano Inspeccionada: </span>
            <span className="text-base font-bold text-amber-400 font-mono ml-1">{hoveredHand}</span>
          </div>
          <div className="flex gap-4 font-mono">
            {(() => {
              const row = matrix.flat().find(c => c.hand === hoveredHand);
              if (!row) return null;
              return (
                <>
                  <div>
                    <span className="text-slate-400">Tipo: </span>
                    <span className="capitalize text-white">{row.type}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Combos: </span>
                    <span className="text-emerald-400 font-bold">{row.combosRemaining}</span>
                    <span className="text-slate-500"> / {row.totalCombosDefault}</span>
                  </div>
                  {row.blockedPercent > 0 && (
                    <div>
                      <span className="text-slate-400">Bloqueado: </span>
                      <span className="text-rose-400 font-bold">-{row.blockedPercent}%</span>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
