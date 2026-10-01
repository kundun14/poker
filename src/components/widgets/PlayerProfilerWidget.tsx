import React, { useState } from 'react';
import { Shield, Swords, Anchor, Smile } from 'lucide-react';

export const PlayerProfilerWidget: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<string>('tag');

  const profiles = [
    {
      id: 'tag',
      name: 'TAG (Tight-Aggressive)',
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
      range: '18% - 22% de manos',
      style: 'Selectivo y Agresivo. El arquetipo del jugador ganador moderno.',
      mathTendency: 'Sabe calcular pot odds y fold equity. Foldea cuando no tiene números.',
      howToExploit: 'Respeta sus apuestas fuertes en river. Ataca sus ciegas cuando puedas.',
      color: 'border-emerald-500/50 bg-emerald-950/30',
    },
    {
      id: 'lag',
      name: 'LAG (Loose-Aggressive)',
      icon: <Swords className="w-5 h-5 text-amber-400" />,
      range: '28% - 35% de manos',
      style: 'Amplio y Muy Agresivo. Pone máxima presión en cada calle.',
      mathTendency: 'Acepta semi-faroles y sabe explotar el miedo ajeno.',
      howToExploit: 'Ensancha tu rango de valor y prepárate para pagar calles con segundas parejas fuertes (Bluff-catching).',
      color: 'border-amber-500/50 bg-amber-950/30',
    },
    {
      id: 'rock',
      name: 'Roca / Nit (Tight-Passive)',
      icon: <Anchor className="w-5 h-5 text-blue-400" />,
      range: '8% - 12% de manos',
      style: 'Extremadamente miedoso. Solo juega cartas monstruosas (JJ+, AK).',
      mathTendency: 'Frecuencia de fold > 80% ante cualquier resistencia.',
      howToExploit: 'Róbale las ciegas con el 100% de tus cartas. Si él te resube en el turn o river, ¡FOLDEA INMEDIATAMENTE!',
      color: 'border-blue-500/50 bg-blue-950/30',
    },
    {
      id: 'station',
      name: 'Calling Station (Loose-Passive)',
      icon: <Smile className="w-5 h-5 text-rose-400" />,
      range: '40% - 60% de manos',
      style: 'Amistoso y pasivo. Le encanta "ver el flop" y jamás foldea una pareja.',
      mathTendency: 'Ignora por completo las Pot Odds. Paga cualquier precio.',
      howToExploit: '¡REGLA SAGRADA: CERO FAROLES! Apuesta por valor grande con tus manos hechas y te pagará todo.',
      color: 'border-rose-500/50 bg-rose-950/30',
    },
  ];

  const current = profiles.find((p) => p.id === selectedProfile) || profiles[0];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400">Perfilador de Rivales: Explotación Matemática</h3>
          <p className="text-xs text-slate-400">Capítulo 3: Adapta tus cálculos al perfil exacto del oponente</p>
        </div>
      </div>

      {/* Profile Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {profiles.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedProfile(p.id)}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedProfile === p.id
                ? 'bg-slate-800 border-white text-white shadow-lg'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="mb-2">{p.icon}</div>
            <div className="text-xs font-bold truncate">{p.name.split(' ')[0]}</div>
            <div className="text-[10px] text-slate-500 font-mono">{p.range.split(' ')[0]}</div>
          </button>
        ))}
      </div>

      {/* Profile Details */}
      <div className={`p-5 rounded-2xl border ${current.color} space-y-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {current.icon}
            <h4 className="text-base font-bold text-white">{current.name}</h4>
          </div>
          <span className="text-xs font-mono font-bold bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-amber-300">
            {current.range}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">{current.style}</p>

        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="text-xs">
            <span className="font-bold text-slate-400 uppercase tracking-wider block">Tendencia Matemática:</span>
            <span className="text-slate-200">{current.mathTendency}</span>
          </div>

          <div className="text-xs">
            <span className="font-bold text-emerald-400 uppercase tracking-wider block">Cómo Explotarlo Matemáticamente:</span>
            <span className="text-emerald-200 font-medium">{current.howToExploit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
