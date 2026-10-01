import React, { useState, useMemo, useEffect, useRef } from 'react';
import { GLOSSARY_ITEMS, GLOSSARY_CATEGORIES } from '../../data/glossary';
import { Search, X, BookOpen, Sparkles, Lightbulb, ShieldAlert, ChevronRight, HelpCircle } from 'lucide-react';
import { TablePositionsWidget } from '../widgets/TablePositionsWidget';
import { HandFlowSimulatorWidget } from '../widgets/HandFlowSimulatorWidget';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTermId?: string | null;
  initialTab?: 'dictionary' | 'positions' | 'hand_flow';
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  initialTermId,
  initialTab = 'dictionary',
}) => {
  const [activeModalTab, setActiveModalTab] = useState<'dictionary' | 'positions' | 'hand_flow'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [expandedId, setExpandedId] = useState<string | null>(initialTermId || null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialTermId) {
      if (initialTermId === 'positions') {
        setActiveModalTab('positions');
      } else if (initialTermId === 'hand_flow') {
        setActiveModalTab('hand_flow');
      } else {
        setActiveModalTab('dictionary');
        setExpandedId(initialTermId);
        // Auto-set category if item belongs to it
        const item = GLOSSARY_ITEMS.find((g) => g.id === initialTermId);
        if (item) {
          setSelectedCategory('todos');
        }
      }
    }
  }, [initialTermId]);

  useEffect(() => {
    if (isOpen) {
      if (activeModalTab === 'dictionary') {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose, activeModalTab]);

  const filteredItems = useMemo(() => {
    return GLOSSARY_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'todos' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.shortDefinition.toLowerCase().includes(q) ||
        item.plainExplanation.toLowerCase().includes(q) ||
        item.aliases.some((a) => a.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  if (!isOpen) return null;

  // The 4 most critical terms for beginners
  const beginnerPicks = ['bote', 'boton', 'utg', 'pot_odds'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/10 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Centro de Aprendizaje para Principiantes
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Novatos a Pro
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Aprende qué significa cada término, las posiciones en la mesa y cómo fluye una mano de Pre-Flop a River.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Cerrar ventana (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/80 px-4 sm:px-6 pt-2 gap-2 text-xs font-bold overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveModalTab('dictionary')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeModalTab === 'dictionary'
                ? 'border-emerald-500 text-emerald-400 font-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>📖</span>
            <span>Diccionario de Términos</span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded-full font-mono">
              {GLOSSARY_ITEMS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveModalTab('positions')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeModalTab === 'positions'
                ? 'border-emerald-500 text-emerald-400 font-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🎯</span>
            <span>Mesa de Posiciones (UTG a BTN)</span>
          </button>

          <button
            onClick={() => setActiveModalTab('hand_flow')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeModalTab === 'hand_flow'
                ? 'border-emerald-500 text-emerald-400 font-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🃏</span>
            <span>Simulador: Pre-Flop a River</span>
          </button>
        </div>

        {/* Tab 1: Positions Table */}
        {activeModalTab === 'positions' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fadeIn">
            <TablePositionsWidget />
          </div>
        )}

        {/* Tab 2: Hand Flow Simulator */}
        {activeModalTab === 'hand_flow' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fadeIn">
            <HandFlowSimulatorWidget />
          </div>
        )}

        {/* Tab 3: Dictionary List */}
        {activeModalTab === 'dictionary' && (
          <>
            {/* Search & Category Filter Bar */}
            <div className="p-4 sm:p-6 border-b border-slate-800/80 space-y-4 bg-slate-900/40">
              {/* Search Input */}
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar término... ej: Botón, UTG, Bote, Flop, Equity, Pot Odds"
                  className="w-full pl-12 pr-10 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {GLOSSARY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800/80'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id
                      ? 'bg-slate-950/20 text-slate-950 font-black'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Beginner Essentials Banner */}
          {!searchQuery && selectedCategory === 'todos' && (
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-200 font-semibold">
                  Términos imprescindibles para tu primera partida:
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {beginnerPicks.map((id) => {
                  const item = GLOSSARY_ITEMS.find((g) => g.id === id);
                  if (!item) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => setExpandedId(id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500/30 transition-all text-[11px]"
                    >
                      {item.term.split('(')[0].trim()}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-semibold">No se encontraron términos para "{searchQuery}"</p>
              <p className="text-xs text-slate-500 mt-1">
                Prueba buscando palabras como "bote", "botón", "ciegas", "all-in" o "odds".
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  id={`term-${item.id}`}
                  className={`rounded-2xl border transition-all ${
                    isExpanded
                      ? 'bg-slate-950 border-emerald-500/50 shadow-lg shadow-emerald-500/5'
                      : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {/* Card Header (Click to toggle) */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                      <span className="text-sm sm:text-base font-black text-white">
                        {item.term}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-extrabold tracking-wider bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full text-slate-400">
                          {item.categoryLabel}
                        </span>
                        {!isExpanded && (
                          <span className="text-xs text-slate-400 hidden md:inline truncate max-w-md">
                            — {item.shortDefinition}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-emerald-400 font-bold hidden sm:inline">
                        {isExpanded ? 'Menos' : 'Ver detalle'}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isExpanded ? 'rotate-90 text-emerald-400' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 pb-5 pt-1 border-t border-slate-900 space-y-3 text-xs sm:text-sm animate-fadeIn">
                      {/* Short Definition */}
                      <p className="font-semibold text-emerald-300">
                        💡 {item.shortDefinition}
                      </p>

                      {/* Plain Explanation for Beginners */}
                      <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-slate-200 leading-relaxed space-y-1">
                        <span className="font-bold text-slate-100 block text-xs uppercase tracking-wider text-emerald-400">
                          Explicación para Principiantes:
                        </span>
                        <p>{item.plainExplanation}</p>
                      </div>

                      {/* Table Significance */}
                      {item.tableSignificance && (
                        <div className="bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/30 text-emerald-200 flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-emerald-300">¿Por qué importa en la mesa? </span>
                            {item.tableSignificance}
                          </div>
                        </div>
                      )}

                      {/* Beginner Tip / Warning */}
                      {item.beginnerTip && (
                        <div className="bg-amber-950/20 p-3 rounded-xl border border-amber-500/30 text-amber-200 flex items-start gap-2">
                          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-amber-300">Consejo de Oro para Novatos: </span>
                            {item.beginnerTip}
                          </div>
                        </div>
                      )}

                      {/* Aliases */}
                      {item.aliases.length > 1 && (
                        <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-1.5">
                          <span className="font-medium">También conocido como:</span>
                          <div className="flex flex-wrap gap-1">
                            {item.aliases.map((alias, i) => (
                              <span
                                key={i}
                                className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 text-slate-400"
                              >
                                {alias}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        </>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>
            {activeModalTab === 'dictionary'
              ? `${filteredItems.length} términos disponibles`
              : activeModalTab === 'positions'
              ? 'Mesa didáctica interactiva de 6 y 9 posiciones'
              : 'Simulación didáctica de las 5 calles de poker'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
          >
            Entendido, volver al juego
          </button>
        </div>
      </div>
    </div>
  );
};
