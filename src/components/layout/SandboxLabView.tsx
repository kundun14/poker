import React, { useState } from 'react';
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
import { TablePositionsWidget } from '../widgets/TablePositionsWidget';
import { HandFlowSimulatorWidget } from '../widgets/HandFlowSimulatorWidget';
import { Layers, ArrowLeft } from 'lucide-react';

interface SandboxLabViewProps {
  onBack: () => void;
}

export const SandboxLabView: React.FC<SandboxLabViewProps> = ({ onBack }) => {
  const [selectedTool, setSelectedTool] = useState<string>('table-positions');

  const tools = [
    { id: 'table-positions', name: 'Mesa de Posiciones (UTG-BTN)', chapter: 'Guía Novato' },
    { id: 'hand-flow', name: 'Flujo: Pre-Flop a River', chapter: 'Guía Rondas' },
    { id: 'variance', name: 'Varianza & Grandes Números', chapter: 'Cap. 1' },
    { id: 'position-spr', name: 'Posición & SPR', chapter: 'Cap. 2' },
    { id: 'player-profiler', name: 'Perfilador de Rivales', chapter: 'Cap. 3' },
    { id: 'converter', name: 'Conversor Odds / Equity', chapter: 'Cap. 4 y 5' },
    { id: 'pot-odds', name: 'Pot Odds vs Equity', chapter: 'Cap. 6' },
    { id: 'implied-odds', name: 'Odds Implícitas & Stack', chapter: 'Cap. 7' },
    { id: 'out-picker', name: 'Outs & Regla 2 y 4', chapter: 'Cap. 8 y 9' },
    { id: 'ev-balance', name: 'Balanza Física de EV', chapter: 'Cap. 10' },
    { id: 'decision-flow', name: 'Algoritmo "¿Podemos Pagar?"', chapter: 'Cap. 11' },
    { id: 'preflop-steal', name: 'Set-Mining & Steals', chapter: 'Cap. 12 y 13' },
    { id: 'value-sizing', name: 'Optimizador Value Bet', chapter: 'Cap. 14' },
    { id: 'semi-bluff', name: 'Semi-Farol & MDF / Alpha', chapter: 'Cap. 15 y 16' },
    { id: 'ev-tree', name: 'Árbol de Decisión EV', chapter: 'Cap. 17' },
    { id: 'range-matrix', name: 'Matriz 13x13 Bloqueadores', chapter: 'Cap. 18' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 transition-all hover:border-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Índice de Capítulos</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <Layers className="w-3.5 h-3.5" />
          <span>Modo Laboratorio Libre</span>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
          Laboratorio Matemático Interactivo Completo
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Experimenta libremente con cada concepto del libro de Alton Hardin modificando números y observando los resultados en tiempo real.
        </p>
      </div>

      {/* Tool Navigation Pill Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 mb-8 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTool(t.id)}
            className={`p-2.5 rounded-xl text-left transition-all ${
              selectedTool === t.id
                ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="text-xs truncate font-bold">{t.name}</div>
            <div className={`text-[10px] font-mono ${selectedTool === t.id ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
              {t.chapter}
            </div>
          </button>
        ))}
      </div>

      {/* Render Active Widget */}
      <div className="bg-slate-950/60 p-4 sm:p-8 rounded-3xl border border-slate-800/80">
        {selectedTool === 'table-positions' && <TablePositionsWidget />}
        {selectedTool === 'hand-flow' && <HandFlowSimulatorWidget />}
        {selectedTool === 'variance' && <VarianceWidget />}
        {selectedTool === 'position-spr' && <PositionSprWidget />}
        {selectedTool === 'player-profiler' && <PlayerProfilerWidget />}
        {selectedTool === 'converter' && <ConverterWidget />}
        {selectedTool === 'pot-odds' && <PotOddsSlider />}
        {selectedTool === 'implied-odds' && <ImpliedOddsGauge />}
        {selectedTool === 'out-picker' && <OutPickerWidget />}
        {selectedTool === 'ev-balance' && <EvBalanceWidget />}
        {selectedTool === 'decision-flow' && <DecisionFlowWidget />}
        {selectedTool === 'preflop-steal' && <PreflopStealWidget />}
        {selectedTool === 'value-sizing' && <ValueSizingWidget />}
        {selectedTool === 'semi-bluff' && <SemiBluffMatrix />}
        {selectedTool === 'ev-tree' && <EvTreeWidget />}
        {selectedTool === 'range-matrix' && <RangeMatrixWidget />}
      </div>
    </div>
  );
};
