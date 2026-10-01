import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const DecisionFlowWidget: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [outs, setOuts] = useState<number>(9);
  const [street, setStreet] = useState<'turn' | 'flop'>('turn');
  const [potOddsPct, setPotOddsPct] = useState<number>(25);
  const [hasImpliedOdds, setHasImpliedOdds] = useState<boolean>(true);

  const equityPct = street === 'turn' ? outs * 2 : outs > 8 ? (outs * 4) - (outs - 8) : outs * 4;
  const directOddsPass = equityPct >= potOddsPct;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400">El Algoritmo Mental de 5 Pasos: "¿Podemos Pagar?"</h3>
          <p className="text-xs text-slate-400">Capítulo 11: La síntesis práctica de Alton Hardin en la mesa</p>
        </div>
      </div>

      {/* Stepper Progress */}
      <div className="flex justify-between items-center mb-6 px-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center">
            <button
              onClick={() => setStep(s)}
              className={`w-8 h-8 rounded-full font-mono font-bold text-xs flex items-center justify-center transition-all ${
                step === s
                  ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/30'
                  : step > s
                  ? 'bg-slate-800 text-emerald-400'
                  : 'bg-slate-950 text-slate-500'
              }`}
            >
              {s}
            </button>
            {s < 5 && <div className={`w-8 sm:w-16 h-0.5 ${step > s ? 'bg-emerald-500' : 'bg-slate-800'}`}></div>}
          </div>
        ))}
      </div>

      {/* Active Step Content */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6 min-h-[160px] flex flex-col justify-center">
        {step === 1 && (
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
              Paso 1: Contar Outs Limpias
            </span>
            <h4 className="text-base font-bold text-white mb-2">¿Cuántas cartas te dan la victoria segura?</h4>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="15"
                value={outs}
                onChange={(e) => setOuts(parseInt(e.target.value))}
                className="flex-1 h-2 bg-slate-800 rounded appearance-none cursor-pointer accent-emerald-500"
              />
              <span className="text-xl font-black text-amber-400 font-mono w-16 text-right">{outs} Outs</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Recuerda restar cualquier carta que le dé una mano superior a tu rival.</p>
          </div>
        )}

        {step === 2 && (
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
              Paso 2: Calcular Equity con la Regla del 2 y 4
            </span>
            <h4 className="text-base font-bold text-white mb-2">Tu probabilidad aproximada de victoria:</h4>
            <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block font-mono">
                  {street === 'turn' ? `${outs} outs × 2` : `${outs} outs × 4 (con ajuste)`}
                </span>
                <span className="text-2xl font-black text-emerald-400 font-mono">{equityPct}% de Equity</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStreet('turn')}
                  className={`px-2.5 py-1 text-xs rounded font-bold ${street === 'turn' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                >
                  Turn (1 carta)
                </button>
                <button
                  onClick={() => setStreet('flop')}
                  className={`px-2.5 py-1 text-xs rounded font-bold ${street === 'flop' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                >
                  Flop All-In
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
              Paso 3: Calcular las Pot Odds
            </span>
            <h4 className="text-base font-bold text-white mb-2">El precio que te pide el bote para continuar:</h4>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10"
                max="40"
                value={potOddsPct}
                onChange={(e) => setPotOddsPct(parseInt(e.target.value))}
                className="flex-1 h-2 bg-slate-800 rounded appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-xl font-black text-amber-400 font-mono w-20 text-right">{potOddsPct}% Req.</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Apuesta 1/2 bote = 25%. Apuesta bote entero = 33.3%.</p>
          </div>
        )}

        {step === 4 && (
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
              Paso 4: Comparación Crucial (Equity vs Pot Odds)
            </span>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Tu Equity: <strong className="text-white">{equityPct}%</strong></span>
                <span className="text-xs text-slate-400 block">Pot Odds: <strong className="text-white">{potOddsPct}%</strong></span>
              </div>
              <div className={`px-4 py-2 rounded-xl text-sm font-black border ${directOddsPass ? 'bg-emerald-950 text-emerald-400 border-emerald-500' : 'bg-rose-950 text-rose-400 border-rose-500'}`}>
                {directOddsPass ? '✓ PAGO DIRECTO +EV' : '✗ PAGO DIRECTO INSUFICIENTE'}
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
              Paso 5: Veredicto Final & Odds Implícitas
            </span>
            {directOddsPass ? (
              <div className="text-emerald-400 font-bold text-sm">
                ¡PAGA INMEDIATAMENTE! No necesitas dinero futuro; la matemática directa te regala beneficio neto en este momento.
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">¿El rival tiene stack suficiente detrás y suele pagarte si completas tu draw?</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setHasImpliedOdds(true)}
                      className={`px-2 py-0.5 rounded font-bold ${hasImpliedOdds ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                    >
                      Sí
                    </button>
                    <button
                      onClick={() => setHasImpliedOdds(false)}
                      className={`px-2 py-0.5 rounded font-bold ${!hasImpliedOdds ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div className={`p-3 rounded-xl text-xs font-bold ${hasImpliedOdds ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40' : 'bg-rose-950/60 text-rose-300 border border-rose-500/40'}`}>
                  {hasImpliedOdds
                    ? '✓ CALL POR ODDS IMPLÍCITAS: Las fichas restantes del rival compensan el déficit actual.'
                    : '✗ FOLD MATEMÁTICO: Sin pot odds directas y sin stack rival detrás, pagar es tirar dinero.'}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stepper Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-950 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Paso Anterior
        </button>

        <button
          onClick={() => setStep(Math.min(5, step + 1))}
          disabled={step === 5}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span>Paso Siguiente</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
