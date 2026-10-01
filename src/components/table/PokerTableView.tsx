import React, { useState } from 'react';
import type { Card, PlayerPosition } from '../../types/poker';
import { PlayingCard } from '../common/PlayingCard';
import { PokerChip } from '../common/PokerChip';
import { findGlossaryItem } from '../../data/glossary';
import { GlossaryPopup } from '../glossary/GlossaryPopup';
import type { GlossaryItem } from '../../types/glossary';
import { HelpCircle } from 'lucide-react';

interface PokerTableViewProps {
  heroCards?: Card[];
  villainCards?: Card[];
  board?: Card[];
  potSize?: number;
  betToCall?: number;
  heroStack?: number;
  villainStack?: number;
  heroPosition?: PlayerPosition;
  villainPosition?: PlayerPosition;
  className?: string;
  onOpenFullGlossary?: (termId?: string) => void;
}

export const PokerTableView: React.FC<PokerTableViewProps> = ({
  heroCards,
  villainCards,
  board = [],
  potSize = 0,
  betToCall = 0,
  heroStack,
  villainStack,
  heroPosition = 'BTN',
  villainPosition = 'BB',
  className = '',
  onOpenFullGlossary,
}) => {
  const [activePopupItem, setActivePopupItem] = useState<GlossaryItem | null>(null);

  // Pad board up to 5 cards (placeholders)
  const fullBoard: (Card | undefined)[] = [...board];
  while (fullBoard.length < 5) {
    fullBoard.push(undefined);
  }

  const handleOpenTerm = (termKey: string) => {
    const item = findGlossaryItem(termKey);
    if (item) {
      setActivePopupItem(item);
    }
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Felt Table Oval */}
      <div className="relative w-full bg-gradient-to-b from-slate-900 to-emerald-950/90 rounded-[50px] p-6 border-4 border-amber-900/60 shadow-[inset_0_0_40px_rgba(0,0,0,0.8),0_10px_30px_rgba(0,0,0,0.6)]">
        
        {/* Table Inner Line Ring */}
        <div className="absolute inset-3 rounded-[42px] border border-emerald-500/20 pointer-events-none"></div>

        {/* Top: Villain Section */}
        <div className="flex flex-col items-center justify-center mb-4 relative">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenTerm(villainPosition)}
              className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-700/80 shadow backdrop-blur transition-all cursor-pointer group"
              title={`Ver explicación de la posición ${villainPosition}`}
            >
              <span className="text-xs font-bold text-rose-400 group-hover:text-rose-300">
                Rival ({villainPosition})
              </span>
              <HelpCircle className="w-3 h-3 text-rose-400/60 group-hover:text-rose-300" />
            </button>

            {villainStack !== undefined && (
              <button
                onClick={() => handleOpenTerm('stack')}
                className="bg-slate-900/80 hover:bg-slate-800 px-2.5 py-1.5 rounded-full border border-slate-700/60 text-xs font-mono text-slate-300 transition-all cursor-pointer"
                title="¿Qué es el Stack? Clic para ver"
              >
                Stack: ${villainStack}
              </button>
            )}
          </div>
          
          <div className="flex gap-2 mt-2">
            {villainCards && villainCards.length > 0 ? (
              villainCards.map((c, i) => <PlayingCard key={i} card={c} size="sm" />)
            ) : (
              <>
                <PlayingCard hidden size="sm" />
                <PlayingCard hidden size="sm" />
              </>
            )}
          </div>

          {betToCall > 0 && (
            <div className="mt-1 flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 px-3 py-0.5 rounded-full text-xs font-bold animate-pulse">
              <PokerChip amount={betToCall} size="sm" />
              <span>Apuesta: ${betToCall}</span>
            </div>
          )}
        </div>

        {/* Center: Community Board & Pot */}
        <div className="my-5 flex flex-col items-center justify-center relative">
          {/* Pot Badge (Clickable to learn what Bote is) */}
          <button
            onClick={() => handleOpenTerm('bote')}
            className="flex items-center gap-2 bg-slate-950/90 hover:bg-slate-900 border border-amber-500/50 hover:border-amber-400 px-4 py-1.5 rounded-full shadow-lg mb-3 transition-all cursor-pointer group"
            title="¿Qué es el Bote? Haz clic para ver la explicación"
          >
            <PokerChip amount={potSize} size="sm" color="gold" />
            <span className="text-xs font-bold text-amber-300 tracking-wider flex items-center gap-1.5">
              BOTE TOTAL: <span className="text-sm font-black text-white">${potSize}</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded-full font-mono group-hover:bg-amber-500/30">
                ?
              </span>
            </span>
          </button>

          {/* 5 Community Cards */}
          <div className="flex items-center justify-center gap-2">
            {fullBoard.map((c, idx) => {
              const stageName = idx < 3 ? 'FLOP' : idx === 3 ? 'TURN' : 'RIVER';
              return (
                <div key={idx} className="relative">
                  {c ? (
                    <PlayingCard card={c} size="md" />
                  ) : (
                    <button
                      onClick={() => handleOpenTerm(stageName.toLowerCase())}
                      className="w-14 h-20 rounded-lg border-2 border-dashed border-emerald-500/30 hover:border-emerald-400 bg-emerald-950/30 hover:bg-emerald-950/50 flex flex-col items-center justify-center transition-all cursor-pointer group"
                      title={`¿Qué es el ${stageName}? Haz clic para ver`}
                    >
                      <span className="text-[10px] text-emerald-400/60 group-hover:text-emerald-300 font-mono font-bold">
                        {stageName}
                      </span>
                      <span className="text-[9px] text-emerald-500/40 group-hover:text-emerald-400">?</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: Hero Section */}
        <div className="flex flex-col items-center justify-center mt-4 relative">
          <div className="flex gap-2 mb-2">
            {heroCards && heroCards.length > 0 ? (
              heroCards.map((c, i) => (
                <PlayingCard key={i} card={c} size="md" isHighlighted />
              ))
            ) : (
              <>
                <PlayingCard hidden size="md" />
                <PlayingCard hidden size="md" />
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenTerm(heroPosition)}
              className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 px-3.5 py-1.5 rounded-full border border-emerald-500/60 shadow-lg cursor-pointer transition-all group"
              title={`Tu posición es ${heroPosition}. Clic para ver ventajas.`}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black shadow">
                {heroPosition}
              </span>
              <span className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
                TÚ (Héroe)
              </span>
              <HelpCircle className="w-3 h-3 text-emerald-400/60 group-hover:text-emerald-300" />
            </button>

            {heroStack !== undefined && (
              <button
                onClick={() => handleOpenTerm('stack')}
                className="bg-slate-900/80 hover:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700/60 text-xs font-mono text-slate-200 font-semibold cursor-pointer transition-all"
                title="¿Qué es tu Stack? Clic para ver"
              >
                Stack: ${heroStack}
              </button>
            )}
          </div>
        </div>

        {/* Floating Active Popup */}
        {activePopupItem && (
          <div className="absolute inset-x-4 top-12 z-50 flex justify-center">
            <GlossaryPopup
              item={activePopupItem}
              onClose={() => setActivePopupItem(null)}
              onOpenFullGlossary={onOpenFullGlossary}
              position="bottom"
            />
          </div>
        )}
      </div>

      {/* Helper caption for novices */}
      <div className="mt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
        <span className="text-emerald-400 font-bold">💡 Consejo para principiantes:</span>
        <span>Toca cualquier posición ({heroPosition}, {villainPosition}), el Bote o las cartas para ver su significado.</span>
      </div>
    </div>
  );
};
