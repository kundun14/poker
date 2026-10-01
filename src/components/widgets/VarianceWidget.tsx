import React, { useState } from 'react';
import { Play } from 'lucide-react';

export const VarianceWidget: React.FC = () => {
  const [edgePct, setEdgePct] = useState<number>(60); // 60% winrate
  const [sampleSize, setSampleSize] = useState<number>(100);
  const [simulationResult, setSimulationResult] = useState<{ wins: number; losses: number; actualWinPct: number } | null>(null);

  const runSimulation = () => {
    let wins = 0;
    const threshold = edgePct / 100;
    for (let i = 0; i < sampleSize; i++) {
      if (Math.random() < threshold) {
        wins++;
      }
    }
    const losses = sampleSize - wins;
    const actualWinPct = Math.round((wins / sampleSize) * 1000) / 10;
    setSimulationResult({ wins, losses, actualWinPct });
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400">Simulador de Varianza y Ley de Grandes Números</h3>
          <p className="text-xs text-slate-400">Capítulo 1: Por qué la matemática derrota a la suerte a largo plazo</p>
        </div>
        <span className="text-xs bg-emerald-500/20 text-emerald-300 font-mono px-2 py-1 rounded">
          Ventaja Real: {edgePct}%
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-slate-400">Tu Ventaja Matemática:</span>
            <span className="font-bold text-emerald-400">{edgePct}%</span>
          </div>
          <input
            type="range"
            min="51"
            max="85"
            value={edgePct}
            onChange={(e) => setEdgePct(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <span className="text-[10px] text-slate-500 mt-1 block">Ej: AA vs KK = ~82%, Jugador sólido = ~58%</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 block mb-2 font-mono">Muestra de Manos:</span>
          <div className="grid grid-cols-3 gap-1.5">
            {[10, 100, 1000].map((n) => (
              <button
                key={n}
                onClick={() => setSampleSize(n)}
                className={`py-1 rounded text-xs font-bold font-mono transition-all ${
                  sampleSize === n ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Compara cómo la varianza se disipa</span>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={runSimulation}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Simular {sampleSize} Manos Ahora</span>
        </button>
      </div>

      {simulationResult && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center animate-fadeIn">
          <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">
            Resultado de la Simulación ({sampleSize} Manos):
          </div>
          <div className="text-3xl font-black font-mono my-2 flex items-center justify-center gap-4">
            <span className="text-emerald-400">{simulationResult.wins} Victorias</span>
            <span className="text-slate-600">/</span>
            <span className="text-rose-400">{simulationResult.losses} Derrotas</span>
          </div>
          <div className="text-sm font-semibold text-slate-300">
            Tasa de victoria observada: <span className="font-bold text-white font-mono">{simulationResult.actualWinPct}%</span>{' '}
            (Esperada teóricamente: <span className="text-emerald-400 font-mono">{edgePct}%</span>)
          </div>

          <div className="mt-4 p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-200/90 text-left">
            <span className="font-bold text-emerald-400">💡 Lección de Alton Hardin: </span>
            {sampleSize <= 10
              ? 'En muestras cortas (10 manos), la suerte domina. Puedes perder 6 de 10 manos teniendo un 70% de ventaja. ¡Nunca juzgues tu calidad de juego por una sola sesión!'
              : sampleSize === 100
              ? 'Con 100 manos, la matemática empieza a imponerse, pero la varianza aún crea desviaciones del ±5% al 10%.'
              : 'Con 1,000 manos, la Ley de los Grandes Números aplasta la suerte. El resultado converge casi idéntico a la expectativa matemática pura. ¡Esta es la razón por la que los pros ganan siempre a largo plazo!'}
          </div>
        </div>
      )}
    </div>
  );
};
