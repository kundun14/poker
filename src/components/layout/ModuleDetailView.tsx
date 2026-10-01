import React, { useState, useEffect } from 'react';
import type { PokerModule } from '../../types/poker';
import { ProblemCard } from '../quiz/ProblemCard';
import { VarianceWidget } from '../widgets/VarianceWidget';
import { PositionSprWidget } from '../widgets/PositionSprWidget';
import { PlayerProfilerWidget } from '../widgets/PlayerProfilerWidget';
import { ConverterWidget } from '../widgets/ConverterWidget';
import { OutPickerWidget } from '../widgets/OutPickerWidget';
import { PotOddsSlider } from '../widgets/PotOddsSlider';
import { ImpliedOddsGauge } from '../widgets/ImpliedOddsGauge';
import { EvBalanceWidget } from '../widgets/EvBalanceWidget';
import { DecisionFlowWidget } from '../widgets/DecisionFlowWidget';
import { PreflopStealWidget } from '../widgets/PreflopStealWidget';
import { ValueSizingWidget } from '../widgets/ValueSizingWidget';
import { SemiBluffMatrix } from '../widgets/SemiBluffMatrix';
import { EvTreeWidget } from '../widgets/EvTreeWidget';
import { RangeMatrixWidget } from '../widgets/RangeMatrixWidget';
import { ArrowLeft, CheckCircle2, BookOpen, Sparkles, ChevronRight, Trophy, HelpCircle, AlertOctagon, Zap, ShieldAlert } from 'lucide-react';
import { fireSuccessConfetti } from '../common/Confetti';
import { SmartText } from '../glossary/SmartText';

interface ModuleDetailViewProps {
  module: PokerModule;
  solvedProblems: Record<string, boolean>;
  onBack: () => void;
  onSolveProblem: (problemId: string, isCorrect: boolean) => void;
  onNextModule?: () => void;
  onOpenFullGlossary?: (termId?: string) => void;
}

export const ModuleDetailView: React.FC<ModuleDetailViewProps> = ({
  module,
  solvedProblems,
  onBack,
  onSolveProblem,
  onNextModule,
  onOpenFullGlossary,
}) => {
  const [activeTab, setActiveTab] = useState<'practice' | 'theory'>('practice');
  const [currentProblemIdx, setCurrentProblemIdx] = useState<number>(0);
  const [isModuleCompleted, setIsModuleCompleted] = useState<boolean>(false);
  const [showFullContext, setShowFullContext] = useState<boolean>(true);

  // Reiniciar estado completamente cuando se cambia de capítulo / módulo
  useEffect(() => {
    setCurrentProblemIdx(0);
    setIsModuleCompleted(false);
  }, [module.id]);

  const currentProblem = module.problems[currentProblemIdx];
  const totalModuleProblems = module.problems.length;
  const solvedInThisModule = module.problems.filter((p) => solvedProblems[p.id]).length;

  const handleNextProblem = () => {
    if (currentProblemIdx < totalModuleProblems - 1) {
      setCurrentProblemIdx(currentProblemIdx + 1);
    } else {
      setIsModuleCompleted(true);
      fireSuccessConfetti();
    }
  };

  const renderSandboxWidget = () => {
    switch (module.sandboxType) {
      case 'variance':
        return <VarianceWidget />;
      case 'position-spr':
        return <PositionSprWidget />;
      case 'player-profiler':
        return <PlayerProfilerWidget />;
      case 'converter':
        return <ConverterWidget />;
      case 'out-picker':
        return <OutPickerWidget />;
      case 'pot-odds':
        return <PotOddsSlider />;
      case 'implied-odds':
        return <ImpliedOddsGauge />;
      case 'ev-balance':
        return <EvBalanceWidget />;
      case 'decision-flow':
        return <DecisionFlowWidget />;
      case 'preflop-steal':
        return <PreflopStealWidget />;
      case 'value-sizing':
        return <ValueSizingWidget />;
      case 'semi-bluff':
        return <SemiBluffMatrix />;
      case 'ev-tree':
        return <EvTreeWidget />;
      case 'range-matrix':
        return <RangeMatrixWidget />;
      default:
        return <ConverterWidget />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 animate-fadeIn">
      {/* Back button & Module Meta */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 transition-all hover:border-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Índice de Capítulos</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-emerald-400 font-bold">{module.section}</span>
          <span>•</span>
          <span>{module.readingTime} lectura</span>
        </div>
      </div>

      {/* Module Title Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
            CAPÍTULO {module.chapterNumber}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-400">{module.subtitle}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {module.title}
        </h1>
      </div>

      {/* Pedagogical "Why Am I Learning This?" Context Banner (Brilliant.org Style) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 mb-6 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>¿Por qué estás viendo este capítulo y de qué te sirve?</span>
          </div>
          <button
            onClick={() => setShowFullContext(!showFullContext)}
            className="text-[11px] font-mono text-slate-400 hover:text-white underline"
          >
            {showFullContext ? 'Contraer' : 'Ver contexto completo'}
          </button>
        </div>

        {showFullContext ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {/* Real Table Dilemma */}
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 space-y-1">
              <span className="font-bold text-rose-400 flex items-center gap-1.5 uppercase text-[11px] tracking-wide">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>El Dilema Real en la Mesa:</span>
              </span>
              <div className="text-slate-300 leading-relaxed font-medium">
                <SmartText text={module.learningContext.tableDilemma} onOpenFullGlossary={onOpenFullGlossary} />
              </div>
            </div>

            {/* Practical Utility */}
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 space-y-1">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase text-[11px] tracking-wide">
                <Zap className="w-3.5 h-3.5" />
                <span>¿De qué te sirve en el juego?</span>
              </span>
              <div className="text-slate-300 leading-relaxed font-medium">
                <SmartText text={module.learningContext.whyItMatters} onOpenFullGlossary={onOpenFullGlossary} />
              </div>
            </div>

            {/* Common Mistake */}
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 space-y-1">
              <span className="font-bold text-amber-400 flex items-center gap-1.5 uppercase text-[11px] tracking-wide">
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>El Error del 90% de Jugadores:</span>
              </span>
              <div className="text-slate-400 leading-relaxed">
                <SmartText text={module.learningContext.commonMistake} onOpenFullGlossary={onOpenFullGlossary} />
              </div>
            </div>

            {/* Table Superpower */}
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-emerald-500/30 space-y-1">
              <span className="font-bold text-teal-300 flex items-center gap-1.5 uppercase text-[11px] tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tu Superpoder al Terminar:</span>
              </span>
              <div className="text-emerald-200/90 leading-relaxed font-medium">
                <SmartText text={module.learningContext.tableSuperpower} onOpenFullGlossary={onOpenFullGlossary} />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs sm:text-sm text-slate-300">
            <SmartText text={module.learningContext.whyItMatters} onOpenFullGlossary={onOpenFullGlossary} />
          </div>
        )}
      </div>

      {/* Mode Switch Tabs (Practice vs Sandbox/Theory) */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'practice'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Ejercicios Prácticos ({solvedInThisModule}/{totalModuleProblems})</span>
          </button>

          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'theory'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Laboratorio & Micro-Teoría</span>
          </button>
        </div>

        {/* Mini progress dots */}
        {activeTab === 'practice' && !isModuleCompleted && (
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-slate-400">
            <span>Problema {currentProblemIdx + 1} de {totalModuleProblems}</span>
            <div className="flex gap-1.5 ml-2">
              {module.problems.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setCurrentProblemIdx(idx);
                    setIsModuleCompleted(false);
                  }}
                  title={`Ir al problema ${idx + 1}`}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    solvedProblems[p.id]
                      ? 'bg-emerald-500 hover:ring-2 hover:ring-emerald-400'
                      : idx === currentProblemIdx
                      ? 'bg-indigo-500 ring-2 ring-indigo-400/50'
                      : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {activeTab === 'practice' ? (
        <div>
          {!isModuleCompleted && currentProblem ? (
            <ProblemCard
              key={currentProblem.id}
              problem={currentProblem}
              onSolve={onSolveProblem}
              onNext={handleNextProblem}
              isLastInModule={currentProblemIdx === totalModuleProblems - 1}
              onOpenFullGlossary={onOpenFullGlossary}
            />
          ) : (
            /* Module Completion Screen */
            <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xl animate-scaleUp">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-6 border-2 border-emerald-500/40 shadow-emerald-500/30 shadow-lg">
                <Trophy className="w-10 h-10" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                ¡Capítulo {module.chapterNumber} Completado!
              </h2>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Has resuelto todos los desafíos de <span className="text-emerald-400 font-bold">{module.title}</span>. Has incorporado este concepto a tu juego automático.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setIsModuleCompleted(false);
                    setCurrentProblemIdx(0);
                  }}
                  className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all"
                >
                  Repasar Ejercicios
                </button>
                {onNextModule && (
                  <button
                    onClick={onNextModule}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/30 transition-all hover:scale-105"
                  >
                    <span>Siguiente Capítulo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Theory & Interactive Sandbox View */
        <div className="space-y-8">
          {/* Key Formula Card */}
          <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 p-6 rounded-2xl border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 block mb-1">
                Fórmula Clave del Capítulo {module.chapterNumber}:
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight">
                {module.formula.expression}
              </div>
              <p className="text-xs text-slate-400 mt-1">{module.formula.explanation}</p>
            </div>
            <div className="shrink-0 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 font-bold">
              {module.formula.name}
            </div>
          </div>

          {/* Interactive Sandbox Widget */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-extrabold text-slate-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Simulador Interactivo de Laboratorio</span>
            </h3>
            {renderSandboxWidget()}
          </div>

          {/* Micro-Lesson Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {module.theoryInsights.map((insight, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-bold text-white text-sm">{insight.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {insight.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
