import React from 'react';
import { Flame, Zap, CheckCircle2, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  xp: number;
  streak: number;
  solvedCount: number;
  totalProblems: number;
  activeView: 'dashboard' | 'module' | 'sandbox';
  onNavigate: (view: 'dashboard' | 'module' | 'sandbox') => void;
  onOpenGlossary: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  xp,
  streak,
  solvedCount,
  totalProblems,
  activeView,
  onNavigate,
  onOpenGlossary,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-md px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            ♠
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-white tracking-tight">PokerMath</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                BRILLIANT STYLE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Basado en Alton Hardin: Essential Poker Math
            </p>
          </div>
        </div>

        {/* Center Nav */}
        <nav className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeView === 'dashboard'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Módulos</span>
          </button>
          <button
            onClick={() => onNavigate('sandbox')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeView === 'sandbox'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Laboratorio</span>
          </button>
          <button
            onClick={onOpenGlossary}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 bg-slate-950 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/10 shadow-sm group"
            title="Diccionario de Términos para Novatos (Botón, UTG, Bote, Flop, etc.)"
          >
            <span className="text-amber-400">📖</span>
            <span>Glosario</span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 py-0.2 rounded font-bold hidden md:inline">
              Novato
            </span>
          </button>
        </nav>

        {/* User Stats (Gamification like Brilliant) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Streak */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs font-mono font-bold text-amber-400 shadow-sm" title="Racha de estudio">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
            <span>{streak}d</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs font-mono font-bold text-indigo-400 shadow-sm" title="Puntos de experiencia XP">
            <Zap className="w-4 h-4 text-indigo-400 fill-indigo-400" />
            <span>{xp} XP</span>
          </div>

          {/* Solved Progress */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs font-mono font-bold text-emerald-400 shadow-sm" title="Ejercicios dominados">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{solvedCount}/{totalProblems}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
