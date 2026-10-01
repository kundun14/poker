import React, { useState, useEffect } from 'react';
import type { Problem, ProblemOption } from '../../types/poker';
import { PokerTableView } from '../table/PokerTableView';
import { SmartText } from '../glossary/SmartText';
import { CheckCircle2, XCircle, Lightbulb, ChevronRight, RotateCcw, Award } from 'lucide-react';
import { fireSuccessConfetti } from '../common/Confetti';

interface ProblemCardProps {
  problem: Problem;
  onSolve?: (problemId: string, isCorrect: boolean) => void;
  onNext?: () => void;
  isLastInModule?: boolean;
  onOpenFullGlossary?: (termId?: string) => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  onSolve,
  onNext,
  isLastInModule = false,
  onOpenFullGlossary,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Reiniciar estado cada vez que se cargue un problema nuevo
  useEffect(() => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setShowHint(false);
  }, [problem.id]);

  const selectedOption = problem.options?.find((o) => o.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  const handleSelect = (option: ProblemOption) => {
    if (isSubmitted && isCorrect) return; // locked once correct
    setSelectedOptionId(option.id);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
    if (selectedOption.isCorrect) {
      fireSuccessConfetti();
      onSolve?.(problem.id, true);
    } else {
      onSolve?.(problem.id, false);
    }
  };

  const handleRetry = () => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
  };

  const difficultyColors = {
    Principiante: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Intermedio: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    Avanzado: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  };

  const hasPokerTable = (problem.heroCards && problem.heroCards.length > 0) || (problem.board && problem.board.length > 0);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 max-w-3xl mx-auto backdrop-blur">
      {/* Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
            {problem.conceptBadge}
          </span>
          <span className={`text-xs font-bold border px-3 py-1 rounded-full ${difficultyColors[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
        </div>

        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 transition-all"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>{showHint ? 'Ocultar Pista' : 'Pista de Hardin'}</span>
        </button>
      </div>

      {/* Problem Title */}
      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3">
        {problem.title}
      </h2>

      {/* Scenario Text */}
      <div className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-medium">
        <SmartText text={problem.scenario} onOpenFullGlossary={onOpenFullGlossary} />
      </div>

      {/* Embedded Poker Table (if cards/board exist) */}
      {hasPokerTable && (
        <div className="my-6">
          <PokerTableView
            heroCards={problem.heroCards}
            villainCards={problem.villainCards}
            board={problem.board}
            potSize={problem.potSize}
            betToCall={problem.betToCall}
            heroStack={problem.heroStack}
            villainStack={problem.villainStack}
            heroPosition={problem.heroPosition || 'BTN'}
            villainPosition={problem.villainPosition || 'BB'}
            onOpenFullGlossary={onOpenFullGlossary}
          />
        </div>
      )}

      {/* Question Banner */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
          Pregunta de Decisión:
        </span>
        <div className="text-base sm:text-lg font-bold text-white">
          <SmartText text={problem.question} onOpenFullGlossary={onOpenFullGlossary} />
        </div>
      </div>

      {/* Hint Alert */}
      {showHint && (
        <div className="mb-6 p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs sm:text-sm leading-relaxed flex items-start gap-3 animate-fadeIn">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-amber-300">Pista de Alton Hardin:</span>
            <SmartText text={problem.hint} onOpenFullGlossary={onOpenFullGlossary} />
          </div>
        </div>
      )}

      {/* Multiple-Choice Options */}
      {problem.options && (
        <div className="space-y-3 mb-6">
          {problem.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            const isThisSelected = selectedOptionId === option.id;

            let cardStyle = 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200';
            if (isSubmitted) {
              if (option.isCorrect) {
                cardStyle = 'bg-emerald-950/80 border-emerald-500 text-white shadow-emerald-900/40 shadow-lg';
              } else if (isThisSelected && !option.isCorrect) {
                cardStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-rose-900/40 shadow-lg';
              }
            } else if (isThisSelected) {
              cardStyle = 'bg-indigo-950/80 border-indigo-500 text-white ring-2 ring-indigo-500/40';
            }

            return (
              <div
                key={option.id}
                onClick={() => handleSelect(option)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${cardStyle}`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isThisSelected
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="font-semibold text-sm sm:text-base leading-snug">
                    {option.label}
                  </span>
                </div>

                {isSubmitted && option.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isSubmitted && isThisSelected && !option.isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Immediate Option Feedback */}
      {isSubmitted && selectedOption && (
        <div
          className={`p-4 rounded-2xl mb-6 border text-sm leading-relaxed ${
            isCorrect
              ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="font-bold flex items-center gap-2 mb-1">
            {isCorrect ? (
              <>
                <Award className="w-4 h-4 text-emerald-400" />
                <span>¡Respuesta Correcta! (+15 XP)</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4 text-rose-400" />
                <span>Revisa el razonamiento matemático:</span>
              </>
            )}
          </div>
          <p className="text-xs sm:text-sm">{selectedOption.feedback}</p>
        </div>
      )}

      {/* Detailed Step-by-Step Explanation (shown after submission) */}
      {isSubmitted && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <span>Desglose Matemático Paso a Paso:</span>
          </div>
          <div className="text-sm text-slate-300 font-medium">
            <SmartText text={problem.explanation.summary} onOpenFullGlossary={onOpenFullGlossary} />
          </div>

          <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-400 pl-1">
            {problem.explanation.steps.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                <span className="text-slate-200 font-mono">
                  <SmartText text={step} onOpenFullGlossary={onOpenFullGlossary} />
                </span>
              </li>
            ))}
          </ol>

          {problem.explanation.ruleOfThumb && (
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-amber-300 bg-amber-950/20 p-2.5 rounded-xl border border-amber-500/20">
              <span className="font-bold">🎯 Regla de Oro:</span>
              <SmartText text={problem.explanation.ruleOfThumb} onOpenFullGlossary={onOpenFullGlossary} />
            </div>
          )}
        </div>
      )}

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
        <div>
          {isSubmitted && !isCorrect && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-bold px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Intentar de nuevo</span>
            </button>
          )}
        </div>

        <div>
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOptionId}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
                selectedOptionId
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Comprobar Respuesta
            </button>
          ) : (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-lg shadow-emerald-500/30 transition-all"
            >
              <span>{isLastInModule ? 'Completar Módulo' : 'Siguiente Ejercicio'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
