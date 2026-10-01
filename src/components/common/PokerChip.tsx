import React from 'react';

interface PokerChipProps {
  amount?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'red' | 'blue' | 'green' | 'black' | 'gold';
  className?: string;
}

const colorStyles = {
  white: { bg: 'bg-slate-100', border: 'border-slate-300', text: 'text-slate-800', stripe: 'bg-slate-400' },
  red: { bg: 'bg-rose-600', border: 'border-rose-400', text: 'text-white', stripe: 'bg-white' },
  blue: { bg: 'bg-blue-600', border: 'border-blue-400', text: 'text-white', stripe: 'bg-white' },
  green: { bg: 'bg-emerald-600', border: 'border-emerald-400', text: 'text-white', stripe: 'bg-white' },
  black: { bg: 'bg-slate-900', border: 'border-slate-700', text: 'text-amber-300', stripe: 'bg-amber-300' },
  gold: { bg: 'bg-amber-500', border: 'border-amber-300', text: 'text-slate-950', stripe: 'bg-white' },
};

const sizeClasses = {
  sm: 'w-7 h-7 text-[10px]',
  md: 'w-10 h-10 text-xs',
  lg: 'w-14 h-14 text-sm',
};

export const PokerChip: React.FC<PokerChipProps> = ({
  amount,
  size = 'md',
  color = 'red',
  className = '',
}) => {
  // auto pick color based on amount if not provided
  let activeColor = color;
  if (amount !== undefined) {
    if (amount >= 500) activeColor = 'gold';
    else if (amount >= 100) activeColor = 'black';
    else if (amount >= 25) activeColor = 'green';
    else if (amount >= 10) activeColor = 'blue';
    else if (amount >= 5) activeColor = 'red';
    else activeColor = 'white';
  }

  const c = colorStyles[activeColor];

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full border-2 ${c.bg} ${c.border} ${c.text} shadow-md font-bold select-none ${sizeClasses[size]} ${className}`}
    >
      {/* Dashed inner circle */}
      <div className="absolute inset-1 rounded-full border border-dashed border-white/40 flex items-center justify-center">
        {amount !== undefined ? (
          <span className="leading-none drop-shadow font-extrabold">${amount}</span>
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
        )}
      </div>
    </div>
  );
};
