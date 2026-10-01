import React from 'react';
import type { Card, Suit } from '../../types/poker';

interface PlayingCardProps {
  card?: Card;
  hidden?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isHighlighted?: boolean;
  isOut?: boolean;
  isDirty?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

const suitSymbols: Record<Suit, string> = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
};

// 4-color deck palette: Spades = Slate/Black, Hearts = Red, Diamonds = Blue, Clubs = Green
const suitColors: Record<Suit, { text: string; bg: string; border: string }> = {
  spades: { text: 'text-slate-900', bg: 'bg-white', border: 'border-slate-300' },
  hearts: { text: 'text-rose-600', bg: 'bg-white', border: 'border-rose-200' },
  diamonds: { text: 'text-blue-600', bg: 'bg-white', border: 'border-blue-200' },
  clubs: { text: 'text-emerald-700', bg: 'bg-white', border: 'border-emerald-200' },
};

const sizeClasses = {
  xs: 'w-7 h-10 text-xs rounded-sm',
  sm: 'w-10 h-14 text-sm rounded-md',
  md: 'w-14 h-20 text-base rounded-lg',
  lg: 'w-20 h-28 text-xl rounded-xl',
  xl: 'w-24 h-36 text-2xl rounded-2xl',
};

export const PlayingCard: React.FC<PlayingCardProps> = ({
  card,
  hidden = false,
  size = 'md',
  isHighlighted = false,
  isOut = false,
  isDirty = false,
  isSelected = false,
  onClick,
  className = '',
}) => {
  if (hidden || !card) {
    return (
      <div
        onClick={onClick}
        className={`relative ${sizeClasses[size]} bg-gradient-to-br from-indigo-900 to-slate-950 border-2 border-indigo-500/40 shadow-lg flex items-center justify-center cursor-pointer select-none transition-transform hover:scale-105 ${className}`}
      >
        <div className="w-full h-full p-1 flex items-center justify-center">
          <div className="w-full h-full border border-indigo-400/30 rounded flex items-center justify-center bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:8px_8px]">
            <span className="text-indigo-400 font-bold opacity-60">♠</span>
          </div>
        </div>
      </div>
    );
  }

  const { suit, rank } = card;
  const color = suitColors[suit];
  const symbol = suitSymbols[suit];

  return (
    <div
      onClick={onClick}
      className={`relative ${sizeClasses[size]} ${color.bg} ${color.text} border-2 ${
        isSelected
          ? 'border-amber-400 ring-4 ring-amber-400/40 scale-105'
          : isOut
          ? 'border-emerald-500 ring-4 ring-emerald-500/40'
          : isDirty
          ? 'border-rose-500 ring-4 ring-rose-500/40'
          : isHighlighted
          ? 'border-amber-400 shadow-amber-500/20'
          : color.border
      } shadow-md flex flex-col justify-between p-1 select-none transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:-translate-y-1 hover:shadow-xl' : ''
      } ${className}`}
    >
      {/* Top Left */}
      <div className="flex flex-col items-center leading-none">
        <span className="font-extrabold tracking-tighter">{rank}</span>
        <span className="text-[1.1em]">{symbol}</span>
      </div>

      {/* Center Symbol */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <span className="text-3xl font-bold">{symbol}</span>
      </div>

      {/* Bottom Right */}
      <div className="flex flex-col items-center leading-none rotate-180">
        <span className="font-extrabold tracking-tighter">{rank}</span>
        <span className="text-[1.1em]">{symbol}</span>
      </div>

      {/* Badges */}
      {isOut && (
        <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow">
          OUT
        </span>
      )}
      {isDirty && (
        <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow">
          DIRTY
        </span>
      )}
    </div>
  );
};
