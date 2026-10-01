import React, { useState } from 'react';
import type { PokerModule } from '../../types/poker';
import { ArrowRight, BookOpen, CheckCircle, Percent, Flame, Scale, Coins, TrendingUp, Target, Zap, Grid, Shield, Sparkles, HelpCircle } from 'lucide-react';

interface DashboardProps {
  modules: PokerModule[];
  solvedProblems: Record<string, boolean>;
  onSelectModule: (moduleId: string) => void;
  onOpenSandbox: () => void;
  onOpenGlossary?: () => void;
  onOpenGlossaryWithTab?: (tab: 'dictionary' | 'positions' | 'hand_flow') => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Percent: <Percent className="w-5 h-5 text-emerald-400" />,
  Flame: <Flame className="w-5 h-5 text-amber-400" />,
  Scale: <Scale className="w-5 h-5 text-blue-400" />,
  Coins: <Coins className="w-5 h-5 text-teal-400" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-indigo-400" />,
  Target: <Target className="w-5 h-5 text-rose-400" />,
  Zap: <Zap className="w-5 h-5 text-amber-400" />,
  Grid: <Grid className="w-5 h-5 text-purple-400" />,
  Shield: <Shield className="w-5 h-5 text-blue-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-teal-400" />,
};

export const Dashboard: React.FC<DashboardProps> = ({
  modules,
  solvedProblems,
  onSelectModule,
  onOpenSandbox,
  onOpenGlossary,
  onOpenGlossaryWithTab,
}) => {
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('all');

  // Group modules by section
  const sections = Array.from(new Set(modules.map((m) => m.section)));

  const filteredModules = selectedSectionFilter === 'all'
    ? modules
    : modules.filter((m) => m.section === selectedSectionFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 mb-8 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-400 mb-3">
            <span>♠ Plan de Estudio Completo • 18 Capítulos de Alton Hardin</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Domina las Matemáticas del Poker <span className="text-emerald-400">capítulo a capítulo</span>.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-medium">
            Cada capítulo responde una pregunta crucial en la mesa: <em>"¿Por qué veo esto? ¿De qué me sirve? ¿Qué error me costará dinero evitar?"</em>. Aprende con micro-retos interactivos y simuladores dinámicos estilo <strong>Brilliant.org</strong>.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onSelectModule('c1')}
              className="px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 flex items-center gap-2"
            >
              <span>Comenzar con Capítulo 1</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenSandbox}
              className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Laboratorio Libre</span>
            </button>

            {onOpenGlossary && (
              <button
                onClick={onOpenGlossary}
                className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-2"
              >
                <span>📖</span>
                <span>¿Eres Novato? Abre el Glosario</span>
              </button>
            )}
          </div>
        </div>

        {/* Decorative background poker elements */}
        <div className="absolute -right-8 -bottom-10 opacity-10 sm:opacity-20 pointer-events-none select-none text-[180px] font-black text-emerald-500">
          ♠
        </div>
      </div>

      {/* Guía Visual Rápida para Principiantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div
          onClick={() => (onOpenGlossaryWithTab ? onOpenGlossaryWithTab('positions') : onOpenGlossary?.())}
          className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 hover:border-indigo-400 p-5 rounded-3xl transition-all cursor-pointer shadow-lg hover:scale-[1.01] group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full">
              Didáctico • Mesa & Asientos
            </span>
            <span className="text-xs text-indigo-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
              <span>Abrir simulador</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white group-hover:text-indigo-300 transition-colors">
            🎯 Mesa Interactiva con Todas las Posiciones
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Mira dónde se sientan UTG, Cutoff, Botón (BTN) y las Ciegas. Descubre quién habla primero y quién habla de último.
          </p>
        </div>

        <div
          onClick={() => (onOpenGlossaryWithTab ? onOpenGlossaryWithTab('hand_flow') : onOpenGlossary?.())}
          className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 hover:border-emerald-400 p-5 rounded-3xl transition-all cursor-pointer shadow-lg hover:scale-[1.01] group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              Didáctico • Calles de Poker
            </span>
            <span className="text-xs text-emerald-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
              <span>Abrir simulador</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
            🃏 Simulador Paso a Paso: De Pre-Flop a River
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Sigue una mano completa en vivo: cuándo salen las 3 cartas del Flop, la 4ª del Turn, la 5ª del River y el Showdown final.
          </p>
        </div>
      </div>

      {/* Section Filter Pills */}
      <div className="mb-8">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Filtrar por Sección Oficial del Libro:
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSectionFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedSectionFilter === 'all'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Todos los Capítulos (18)
          </button>
          {sections.map((sec, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedSectionFilter(sec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedSectionFilter === sec
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Chapter Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredModules.map((mod) => {
          const totalInMod = mod.problems.length;
          const solvedInMod = mod.problems.filter((p) => solvedProblems[p.id]).length;
          const isComplete = totalInMod > 0 && solvedInMod === totalInMod;
          const progressPct = totalInMod > 0 ? (solvedInMod / totalInMod) * 100 : 0;

          return (
            <div
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                      {iconMap[mod.icon] || <Percent className="w-5 h-5 text-emerald-400" />}
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block font-mono">
                        CAPÍTULO {mod.chapterNumber} • {mod.section.split(':')[0]}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{mod.readingTime}</span>
                    </div>
                  </div>

                  {isComplete ? (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Completado</span>
                    </div>
                  ) : (
                    <span className="text-xs font-mono text-slate-400">
                      {solvedInMod}/{totalInMod} resueltos
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-300 transition-colors mb-1.5">
                  {mod.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
                  {mod.learningContext.tableDilemma}
                </p>

                {/* Practical benefit badge */}
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 mb-4 flex items-start gap-2 text-xs text-slate-300">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="line-clamp-2 leading-relaxed">
                    <strong className="text-amber-300">¿De qué te sirve? </strong>
                    {mod.learningContext.whyItMatters}
                  </p>
                </div>
              </div>

              {/* Progress Bar & CTA */}
              <div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400 group-hover:text-slate-200 transition-colors text-[11px]">
                    Fórmula: <span className="font-mono text-slate-300">{mod.formula.name}</span>
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Aprender y Practicar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
