import React, { useEffect, useRef } from 'react';
import type { GlossaryItem } from '../../types/glossary';
import { HelpCircle, X, ExternalLink, Lightbulb, ShieldAlert } from 'lucide-react';

interface GlossaryPopupProps {
  item: GlossaryItem;
  onClose: () => void;
  onOpenFullGlossary?: (termId?: string) => void;
  position?: 'top' | 'bottom';
}

export const GlossaryPopup: React.FC<GlossaryPopupProps> = ({
  item,
  onClose,
  onOpenFullGlossary,
  position = 'top',
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      role="dialog"
      aria-label={item.term}
      className={`absolute z-50 w-80 sm:w-96 bg-slate-900/98 border border-emerald-500/50 rounded-2xl p-4 shadow-2xl backdrop-blur-xl text-left text-slate-100 animate-fadeIn ${
        position === 'top'
          ? 'bottom-full mb-2 left-1/2 -translate-x-1/2'
          : 'top-full mt-2 left-1/2 -translate-x-1/2'
      }`}
      style={{
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.9), 0 0 20px rgba(16, 185, 129, 0.15)',
      }}
    >
      {/* Mini Arrow */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-emerald-500/50 rotate-45 ${
          position === 'top'
            ? '-bottom-1.5 border-r border-b'
            : '-top-1.5 border-l border-t'
        }`}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-extrabold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
              {item.categoryLabel}
            </span>
            <span className="text-[10px] text-amber-300 font-mono flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>Glosario Poker</span>
            </span>
          </div>
          <h4 className="text-base font-black text-white tracking-tight">
            {item.term}
          </h4>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Cerrar ventana"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Short Summary */}
      <p className="text-xs font-semibold text-emerald-400 mb-2 leading-snug">
        💡 {item.shortDefinition}
      </p>

      {/* Plain Spanish Explanation */}
      <div className="text-xs text-slate-300 space-y-2 mb-3 leading-relaxed">
        <p className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
          <strong className="text-slate-100 block mb-0.5">¿Qué significa para un novato?</strong>
          {item.plainExplanation}
        </p>

        {item.tableSignificance && (
          <div className="bg-emerald-950/20 p-2 rounded-lg border border-emerald-500/30 text-[11px] text-emerald-200 flex items-start gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-300">En la mesa: </span>
              {item.tableSignificance}
            </div>
          </div>
        )}

        {item.beginnerTip && (
          <div className="bg-amber-950/20 p-2 rounded-lg border border-amber-500/30 text-[11px] text-amber-200 flex items-start gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300">Consejo clave: </span>
              {item.beginnerTip}
            </div>
          </div>
        )}
      </div>

      {/* Footer link to full dictionary */}
      {onOpenFullGlossary && (
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-[10px] text-slate-500 font-medium">Toca fuera para cerrar</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
              onOpenFullGlossary(item.id);
            }}
            className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 hover:underline transition-all"
          >
            <span>Ver en Glosario Completo</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
