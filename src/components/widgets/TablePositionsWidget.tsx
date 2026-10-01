import React, { useState, useEffect } from 'react';
import { Crown, Zap, Sparkles, RotateCw, Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Coins, Award } from 'lucide-react';
import { fireSuccessConfetti } from '../common/Confetti';

interface PositionData {
  id: string;
  name: string;
  shortName: string;
  category: 'early' | 'middle' | 'late' | 'blinds';
  categoryLabel: string;
  preflopOrder6Max: number;
  postflopOrder6Max: number;
  preflopOrder9Max: number;
  postflopOrder9Max: number;
  rangePercentage: number;
  handsSample: string;
  advantageLevel: 'Peligro / Muy Difícil' | 'Moderado' | 'Ventaja Alta' | 'Máxima Ventaja (Oro)' | 'Defensivo';
  description: string;
  tableTip: string;
  whyItMatters: string;
  pos6Max: { x: number; y: number };
  pos9Max: { x: number; y: number };
}

const POSITIONS_DATA: PositionData[] = [
  {
    id: 'btn',
    name: 'Botón (Button / Dealer)',
    shortName: 'BTN',
    category: 'late',
    categoryLabel: 'Posición Tardía (La Mejor)',
    preflopOrder6Max: 4,
    postflopOrder6Max: 6,
    preflopOrder9Max: 7,
    postflopOrder9Max: 9,
    rangePercentage: 45,
    handsSample: 'AA-22, AK-A2s, KQs-K8s, QJs-Q9s, Conectores de color, etc.',
    advantageLevel: 'Máxima Ventaja (Oro)',
    description: 'La posición reina del poker. Simboliza al repartidor (dealer). Tienes el botón "D".',
    whyItMatters: 'En el Flop, Turn y River hablarás de ÚLTIMO después de ver qué hicieron todos los rivales. Si pasan, puedes robar el bote con un farol; si apuestan, decides si pagar o retirarte con información perfecta.',
    tableTip: 'Juega cerca del 40-50% de tus manos desde aquí. Es la posición donde los profesionales ganan la mayor parte de su dinero.',
    pos6Max: { x: 22, y: 76 },
    pos9Max: { x: 18, y: 74 },
  },
  {
    id: 'sb',
    name: 'Ciega Pequeña (Small Blind)',
    shortName: 'SB',
    category: 'blinds',
    categoryLabel: 'Ciegas (Forzadas)',
    preflopOrder6Max: 5,
    postflopOrder6Max: 1,
    preflopOrder9Max: 8,
    postflopOrder9Max: 1,
    rangePercentage: 15,
    handsSample: 'Parejas medias/altas, AJs+, KQs, suited broadways',
    advantageLevel: 'Defensivo',
    description: 'Debe poner media ciega obligatoria antes de ver sus cartas. Situado a la izquierda del botón.',
    whyItMatters: 'Aunque pre-flop hablas de penúltimo, en todas las rondas posteriores (Flop, Turn, River) hablarás de PRIMERO. Es la peor posición post-flop porque juegas completamente a ciegas respecto a los demás.',
    tableTip: 'No caigas en el error de pagar solo porque "ya pusiste media ciega". Fuera de posición perderás mucho dinero con manos dudosas.',
    pos6Max: { x: 50, y: 88 },
    pos9Max: { x: 42, y: 88 },
  },
  {
    id: 'bb',
    name: 'Ciega Grande (Big Blind)',
    shortName: 'BB',
    category: 'blinds',
    categoryLabel: 'Ciegas (Forzadas)',
    preflopOrder6Max: 6,
    postflopOrder6Max: 2,
    preflopOrder9Max: 9,
    postflopOrder9Max: 2,
    rangePercentage: 25,
    handsSample: 'Defiende manos con buena jugabilidad si el bote es barato',
    advantageLevel: 'Defensivo',
    description: 'Pone una apuesta obligatoria completa antes de recibir cartas. Cierra la ronda pre-flop.',
    whyItMatters: 'Pre-flop hablas de último (puedes pasar gratis si nadie subió), pero post-flop hablarás siempre de segundo, jugando fuera de posición contra casi toda la mesa.',
    tableTip: 'Aprovecha tus Pot Odds favorables para defender tu ciega, pero prepárate para retirarte en el flop si no conectas con fuerza.',
    pos6Max: { x: 78, y: 76 },
    pos9Max: { x: 68, y: 88 },
  },
  {
    id: 'utg',
    name: 'Under the Gun (UTG)',
    shortName: 'UTG',
    category: 'early',
    categoryLabel: 'Posición Temprana (Bajo Peligro)',
    preflopOrder6Max: 1,
    postflopOrder6Max: 3,
    preflopOrder9Max: 1,
    postflopOrder9Max: 3,
    rangePercentage: 12,
    handsSample: 'AA-77, AKs-ATs, AKo-AQo, KQs',
    advantageLevel: 'Peligro / Muy Difícil',
    description: 'Literalmente "Bajo la mira del cañón". Primer jugador en actuar antes del flop.',
    whyItMatters: 'Hablas primero sin saber qué cartas tienen los otros jugadores sentados detrás de ti. Si subes con una mano regular (como K-10 o 8-9), es muy probable que alguien detrás tenga una mano monstruo o te resuba.',
    tableTip: 'Juega solo el 10-14% de las mejores manos. La disciplina desde UTG evita desastres financieros en el poker.',
    pos6Max: { x: 86, y: 28 },
    pos9Max: { x: 86, y: 70 },
  },
  {
    id: 'utg1',
    name: 'Under the Gun + 1 (UTG+1)',
    shortName: 'UTG+1',
    category: 'early',
    categoryLabel: 'Posición Temprana (Solo en 9-Max)',
    preflopOrder6Max: 0,
    postflopOrder6Max: 0,
    preflopOrder9Max: 2,
    postflopOrder9Max: 4,
    rangePercentage: 14,
    handsSample: 'AA-66, AKs-AJs, AKo-AQo, KQs',
    advantageLevel: 'Peligro / Muy Difícil',
    description: 'El jugador inmediatamente después de UTG en mesas de 9 jugadores.',
    whyItMatters: 'Sigue teniendo 7 rivales por detrás. Requiere casi la misma disciplina de hierro que UTG.',
    tableTip: 'No amplíes mucho tu rango aquí; los jugadores en posiciones tardías siguen teniendo ventaja posicional sobre ti.',
    pos6Max: { x: 0, y: 0 },
    pos9Max: { x: 88, y: 35 },
  },
  {
    id: 'mp',
    name: 'Posición Media (Middle Position / MP)',
    shortName: 'MP',
    category: 'middle',
    categoryLabel: 'Posición Intermedia',
    preflopOrder6Max: 2,
    postflopOrder6Max: 4,
    preflopOrder9Max: 3,
    postflopOrder9Max: 5,
    rangePercentage: 18,
    handsSample: 'AA-55, AJs-A2s, KQs, QJs, JTs, AQo',
    advantageLevel: 'Moderado',
    description: 'Se encuentra en la mitad de la mesa. En 6-Max actúa como HJ/MP.',
    whyItMatters: 'Varios jugadores ya han hablado, lo que reduce el riesgo de manos monstruo no vistas, pero el Cutoff y el Botón aún actuarán después de ti.',
    tableTip: 'Puedes empezar a incorporar conectores de color y parejas medianas.',
    pos6Max: { x: 50, y: 12 },
    pos9Max: { x: 68, y: 14 },
  },
  {
    id: 'hj',
    name: 'Hijack (HJ)',
    shortName: 'HJ',
    category: 'middle',
    categoryLabel: 'Posición Intermedia Tardía',
    preflopOrder6Max: 0,
    postflopOrder6Max: 0,
    preflopOrder9Max: 5,
    postflopOrder9Max: 6,
    rangePercentage: 22,
    handsSample: 'AA-44, ATs+, KJs+, QJs, JTs, T9s, AJo, KQo',
    advantageLevel: 'Moderado',
    description: 'Significa "Secuestrar" el botón. Asiento justo a la derecha del Cutoff.',
    whyItMatters: 'Si subes con fuerza desde aquí, puedes "secuestrar" la posición y obligar al Cutoff y al Botón a retirarse, dándote a ti la ventaja para el resto de la mano.',
    tableTip: 'Es el umbral donde el juego deja de ser puramente conservador y pasa a ser más agresivo.',
    pos6Max: { x: 0, y: 0 },
    pos9Max: { x: 38, y: 12 },
  },
  {
    id: 'co',
    name: 'Cutoff (CO)',
    shortName: 'CO',
    category: 'late',
    categoryLabel: 'Posición Tardía (Segunda Mejor)',
    preflopOrder6Max: 3,
    postflopOrder6Max: 5,
    preflopOrder9Max: 6,
    postflopOrder9Max: 8,
    rangePercentage: 28,
    handsSample: 'AA-22, Any Ace de color, K9s+, Q9s+, J9s+, T8s+, ATo+, KJo+',
    advantageLevel: 'Ventaja Alta',
    description: 'Asiento a la derecha inmediata del Botón. Segunda mejor posición de la mesa.',
    whyItMatters: 'Si el Botón no entra a disputar el bote, tú actuarás de ÚLTIMO durante todo el Flop, Turn y River. Excelente asiento para robar las ciegas.',
    tableTip: 'Aprovecha cuando los jugadores anteriores hayan pasado para subir y llevarte el bote sin ver el flop.',
    pos6Max: { x: 14, y: 28 },
    pos9Max: { x: 14, y: 35 },
  },
];

// Physical seat layout ordered clockwise around the oval
interface PhysicalSeat {
  seatNumber: number; // 1 to 6
  name: string;
  coords6Max: { x: number; y: number };
}

const PHYSICAL_SEATS_6MAX: PhysicalSeat[] = [
  { seatNumber: 1, name: 'Asiento 1 (TÚ / Hero)', coords6Max: { x: 22, y: 76 } },
  { seatNumber: 2, name: 'Asiento 2 (Rival A)', coords6Max: { x: 50, y: 88 } },
  { seatNumber: 3, name: 'Asiento 3 (Rival B)', coords6Max: { x: 78, y: 76 } },
  { seatNumber: 4, name: 'Asiento 4 (Rival C)', coords6Max: { x: 86, y: 28 } },
  { seatNumber: 5, name: 'Asiento 5 (Rival D)', coords6Max: { x: 50, y: 12 } },
  { seatNumber: 6, name: 'Asiento 6 (Rival E)', coords6Max: { x: 14, y: 28 } },
];

// In 6-max, position roles in clockwise order from BTN:
// [BTN, SB, BB, UTG, MP, CO]
const ROLES_CYCLE_6MAX = ['btn', 'sb', 'bb', 'utg', 'mp', 'co'];

interface OrbitHandInfo {
  handNumber: number;
  dealerSeat: number; // 1 to 6
  heroRole: string; // 'btn', 'co', 'mp', 'utg', 'bb', 'sb'
  heroBlindCost: number; // $0, $1 (SB), or $2 (BB)
  tacticalAdvice: string;
  whyThisMatters: string;
}

const ORBIT_HANDS_6MAX: OrbitHandInfo[] = [
  {
    handNumber: 1,
    dealerSeat: 1, // Hero has the button!
    heroRole: 'btn',
    heroBlindCost: 0,
    tacticalAdvice: '¡Estás en el Botón (Dealer)! Máxima libertad y agresividad. Hablas de último post-flop. Si nadie sube, busca robar las ciegas.',
    whyThisMatters: 'Comienzas el ciclo con la posición más lucrativa de toda la mesa. Tu expectativa de ganancias (+EV) aquí es la más alta de las 6 manos.',
  },
  {
    handNumber: 2,
    dealerSeat: 2, // Button moved to Seat 2!
    heroRole: 'co', // Hero is now Cutoff
    heroBlindCost: 0,
    tacticalAdvice: 'El Botón avanzó al Asiento 2. Ahora eres el Cutoff (CO). Segunda mejor posición. Ataca si los jugadores anteriores se retiran.',
    whyThisMatters: 'Solo tienes un jugador (el Botón) con ventaja sobre ti. Si él no entra a la mano, serás el último en hablar toda la mano.',
  },
  {
    handNumber: 3,
    dealerSeat: 3, // Button moved to Seat 3
    heroRole: 'mp', // Hero is now Middle Position
    heroBlindCost: 0,
    tacticalAdvice: 'Ahora estás en Posición Media (MP). Reduce tu rango de manos. Juega parejas, broadways fuertes (AQ, KQs) y conectores de color.',
    whyThisMatters: 'El Cutoff y el Botón hablarán después de ti. Si juegas manos flojas, te meterán en botes difíciles fuera de posición.',
  },
  {
    handNumber: 4,
    dealerSeat: 4, // Button moved to Seat 4
    heroRole: 'utg', // Hero is now UTG
    heroBlindCost: 0,
    tacticalAdvice: '¡Bajo la mira del cañón (UTG)! Eres el PRIMERO en hablar pre-flop con 5 rivales detrás. Juega solo manos monstruo (AA, KK, QQ, AK).',
    whyThisMatters: 'Cualquiera detrás de ti puede tener una mano mejor. Un error aquí cuesta caro. El 90% de los jugadores novatos pierden dinero por jugar de más en UTG.',
  },
  {
    handNumber: 5,
    dealerSeat: 5, // Button moved to Seat 5
    heroRole: 'bb', // Hero is Big Blind!
    heroBlindCost: 2, // 1 BB ($2)
    tacticalAdvice: '¡Te toca pagar la Ciega Grande ($2 forzados)! Cierras la acción pre-flop. Defiende con manos que tengan buena jugabilidad.',
    whyThisMatters: 'Pre-flop hablas de último y tienes descuento en el precio del bote (buenas Pot Odds), pero post-flop hablarás antes que los demás.',
  },
  {
    handNumber: 6,
    dealerSeat: 6, // Button moved to Seat 6
    heroRole: 'sb', // Hero is Small Blind!
    heroBlindCost: 1, // 0.5 BB ($1)
    tacticalAdvice: '¡Pagas la Ciega Pequeña ($1 forzado)! La posición más incómoda de jugar: hablarás de PRIMERO en todas las calles post-flop.',
    whyThisMatters: 'No defiendas cualquier mano solo porque "ya pusiste una ficha". Jugar fuera de posición durante Flop, Turn y River desangra a los novatos.',
  },
];

export const TablePositionsWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'static_table' | 'orbit_simulator'>('orbit_simulator');
  const [tableFormat, setTableFormat] = useState<'6max' | '9max'>('6max');
  const [selectedPosId, setSelectedPosId] = useState<string>('btn');
  const [viewPerspective, setViewPerspective] = useState<'preflop' | 'postflop'>('preflop');

  // Orbit Simulator State
  const [currentOrbitHand, setCurrentOrbitHand] = useState<number>(1); // 1 to 6
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Auto-play timer for button rotation
  useEffect(() => {
    let timer: any = null;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentOrbitHand((prev) => {
          if (prev >= 6) {
            fireSuccessConfetti();
            return 1;
          }
          return prev + 1;
        });
      }, 2200);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const visiblePositions = POSITIONS_DATA.filter((p) => {
    if (tableFormat === '6max') {
      return ['btn', 'sb', 'bb', 'utg', 'mp', 'co'].includes(p.id);
    }
    return true;
  });

  const selectedPos = POSITIONS_DATA.find((p) => p.id === selectedPosId) || POSITIONS_DATA[0];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'late':
        return 'from-emerald-500 to-teal-400 text-slate-950 border-emerald-400 shadow-emerald-500/30';
      case 'middle':
        return 'from-amber-500 to-yellow-400 text-slate-950 border-amber-400 shadow-amber-500/30';
      case 'early':
        return 'from-rose-600 to-rose-400 text-white border-rose-400 shadow-rose-500/30';
      case 'blinds':
        return 'from-indigo-600 to-purple-500 text-white border-indigo-400 shadow-indigo-500/30';
      default:
        return 'from-slate-700 to-slate-600 text-white border-slate-500';
    }
  };

  const getOrderBadge = (p: PositionData) => {
    if (viewPerspective === 'preflop') {
      return tableFormat === '6max' ? p.preflopOrder6Max : p.preflopOrder9Max;
    } else {
      return tableFormat === '6max' ? p.postflopOrder6Max : p.postflopOrder9Max;
    }
  };

  // Orbit calculations
  const orbitHandData = ORBIT_HANDS_6MAX[currentOrbitHand - 1];
  const heroRoleData = POSITIONS_DATA.find((p) => p.id === orbitHandData.heroRole) || POSITIONS_DATA[0];

  // Calculate cumulative blind cost in the orbit up to this hand
  const cumulativeBlindCost = ORBIT_HANDS_6MAX.slice(0, currentOrbitHand).reduce(
    (acc, h) => acc + h.heroBlindCost,
    0
  );

  const handleNextOrbitHand = () => {
    if (currentOrbitHand < 6) {
      setCurrentOrbitHand(currentOrbitHand + 1);
      if (currentOrbitHand + 1 === 6) {
        // user reached the last hand
      }
    } else {
      setCurrentOrbitHand(1);
      fireSuccessConfetti();
    }
  };

  const handlePrevOrbitHand = () => {
    if (currentOrbitHand > 1) {
      setCurrentOrbitHand(currentOrbitHand - 1);
    } else {
      setCurrentOrbitHand(6);
    }
  };

  // Helper to determine the role of any physical seat given current dealer seat
  const getSeatRoleInOrbit = (seatNum: number, dealerSeat: number) => {
    // 0 = Dealer (BTN), 1 = SB, 2 = BB, 3 = UTG, 4 = MP, 5 = CO
    const offset = (seatNum - dealerSeat + 6) % 6;
    const roleId = ROLES_CYCLE_6MAX[offset];
    return POSITIONS_DATA.find((p) => p.id === roleId) || POSITIONS_DATA[0];
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Main Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Guía Visual para Novatos
            </span>
            <span className="text-xs text-slate-400 font-mono">Alton Hardin Cap. 2 y 13</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
            Mesa de Posiciones y Rotación del Botón
          </h3>
          <p className="text-xs text-slate-400">
            Descubre cómo funciona la mesa y cómo viaja el Botón en sentido horario a lo largo de 6 partidas.
          </p>
        </div>

        {/* Tab Selection: Orbit Simulator vs Static Anatomy */}
        <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex text-xs font-bold shrink-0">
          <button
            onClick={() => {
              setActiveTab('orbit_simulator');
              setIsAutoPlaying(false);
            }}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'orbit_simulator'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Simulador de Órbita (6 Partidas)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('static_table');
              setIsAutoPlaying(false);
            }}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'static_table'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Anatomía Fija</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODE 1: ORBIT SIMULATOR (ROTATION OF THE BUTTON)         */}
      {/* ======================================================== */}
      {activeTab === 'orbit_simulator' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Orbit Stepper Banner */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black text-lg shrink-0">
                <RotateCw className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white">
                    Partida {currentOrbitHand} de 6 de la Órbita
                  </span>
                  <span className="text-[10px] bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-full text-slate-300 font-mono">
                    Rotación en Sentido Horario ↻
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Tú estás siempre sentado en el <strong className="text-emerald-400">Asiento 1</strong>. Mira cómo el Botón "D" y las ciegas se mueven a tu alrededor.
                </p>
              </div>
            </div>

            {/* Orbit Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrevOrbitHand}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all cursor-pointer"
                title="Partida anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isAutoPlaying
                    ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800'
                }`}
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isAutoPlaying ? 'Pausar' : 'Giro Automático'}</span>
              </button>

              <button
                onClick={handleNextOrbitHand}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                title="Avanzar mano y rotar botón"
              >
                <span>Siguiente Mano</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setCurrentOrbitHand(1);
                  setIsAutoPlaying(false);
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all cursor-pointer"
                title="Reiniciar al inicio de la órbita (Mano 1)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Hand Jump Pills */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((handNum) => {
              const info = ORBIT_HANDS_6MAX[handNum - 1];
              const isCurrent = handNum === currentOrbitHand;
              const role = POSITIONS_DATA.find((p) => p.id === info.heroRole);

              return (
                <button
                  key={handNum}
                  onClick={() => {
                    setCurrentOrbitHand(handNum);
                    setIsAutoPlaying(false);
                  }}
                  className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black shadow-lg shadow-emerald-500/20 scale-105'
                      : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className={`text-[10px] font-mono uppercase ${isCurrent ? 'text-slate-950 font-black' : 'text-slate-500'}`}>
                    Partida {handNum}
                  </div>
                  <div className="text-xs sm:text-sm font-black truncate">
                    Eres {role?.shortName}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Orbit Interactive Oval Felt Table */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[420px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-4 sm:p-8 border border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden">
            {/* Felt Oval Ring */}
            <div className="relative w-[88%] h-[80%] bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 rounded-[100px] border-8 border-amber-950/80 shadow-[inset_0_0_50px_rgba(0,0,0,0.8),0_10px_40px_rgba(0,0,0,0.7)] flex flex-col items-center justify-center p-4">
              {/* Inner Line */}
              <div className="absolute inset-3 rounded-[90px] border border-emerald-500/20 pointer-events-none" />

              {/* Center Table Info */}
              <div className="text-center z-10 space-y-1.5">
                <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-amber-400">
                  <span>↻ DIRECCIÓN: SENTIDO HORARIO</span>
                </div>

                <div className="text-sm sm:text-base font-black text-white">
                  El Botón "D" está en el{' '}
                  <span className="text-emerald-400 underline decoration-dotted">
                    Asiento {orbitHandData.dealerSeat}
                  </span>
                </div>

                {/* Hero's role status in this hand */}
                <div className="bg-slate-950/80 px-4 py-1.5 rounded-full border border-slate-800 inline-flex items-center gap-2">
                  <span className="text-xs text-slate-300 font-bold">Tu Rol Actual (Asiento 1):</span>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                    heroRoleData.category === 'late'
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : heroRoleData.category === 'blinds'
                      ? 'bg-indigo-500 text-white font-bold'
                      : heroRoleData.category === 'early'
                      ? 'bg-rose-500 text-white font-bold'
                      : 'bg-amber-500 text-slate-950 font-bold'
                  }`}>
                    {heroRoleData.shortName} ({heroRoleData.name.split('(')[0].trim()})
                  </span>
                </div>

                {/* Blind cost indicator */}
                {orbitHandData.heroBlindCost > 0 ? (
                  <div className="text-[11px] text-amber-300 font-bold flex items-center justify-center gap-1 animate-pulse">
                    <Coins className="w-3.5 h-3.5" />
                    <span>¡Pagas ${orbitHandData.heroBlindCost} de ciega obligatoria en esta mano!</span>
                  </div>
                ) : (
                  <div className="text-[11px] text-emerald-400 font-medium">
                    ✓ Sin costo forzado de ciegas en esta mano.
                  </div>
                )}
              </div>

              {/* Render 6 Physical Seats */}
              {PHYSICAL_SEATS_6MAX.map((seat) => {
                const isHero = seat.seatNumber === 1;
                const role = getSeatRoleInOrbit(seat.seatNumber, orbitHandData.dealerSeat);
                const isDealer = seat.seatNumber === orbitHandData.dealerSeat;
                const isSB = role.id === 'sb';
                const isBB = role.id === 'bb';

                return (
                  <div
                    key={seat.seatNumber}
                    style={{
                      left: `${seat.coords6Max.x}%`,
                      top: `${seat.coords6Max.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute z-20 transition-all flex flex-col items-center`}
                  >
                    {/* Seat Pill */}
                    <div
                      className={`relative px-3 py-1.5 rounded-2xl border-2 font-bold transition-all shadow-xl flex items-center gap-1.5 ${
                        isHero
                          ? 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 text-slate-950 border-white ring-4 ring-emerald-400/40 scale-110 z-30'
                          : 'bg-slate-900/90 text-slate-200 border-slate-700'
                      }`}
                    >
                      {/* Seat Label */}
                      <span className={`text-[10px] font-black ${isHero ? 'text-slate-950' : 'text-slate-400'}`}>
                        {isHero ? 'TÚ' : `A${seat.seatNumber}`}
                      </span>

                      {/* Current Role in this hand */}
                      <span className={`text-xs font-black px-1.5 py-0.5 rounded ${
                        isHero
                          ? 'bg-slate-950 text-emerald-300'
                          : role.category === 'late'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : role.category === 'blinds'
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : role.category === 'early'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {role.shortName}
                      </span>

                      {/* Dealer Button Token (visibly moves around the table!) */}
                      {isDealer && (
                        <span
                          className="w-5 h-5 rounded-full bg-white text-slate-950 font-black text-[10px] flex items-center justify-center shadow-lg border-2 border-amber-400 animate-bounce"
                          title="Ficha del Repartidor (Dealer Button)"
                        >
                          D
                        </span>
                      )}

                      {/* Blind chips */}
                      {isSB && (
                        <span className="text-[10px] text-amber-300 font-mono font-bold" title="Ciega Pequeña ($1)">
                          $1
                        </span>
                      )}
                      {isBB && (
                        <span className="text-[10px] text-amber-300 font-mono font-bold" title="Ciega Grande ($2)">
                          $2
                        </span>
                      )}
                    </div>

                    <span className={`text-[9px] font-bold mt-1 px-1 rounded ${
                      isHero
                        ? 'text-emerald-300 bg-slate-950/80 font-black'
                        : 'text-slate-400 bg-slate-950/50'
                    }`}>
                      {isHero ? 'Tu Asiento Fijo' : seat.name.split('(')[1]?.replace(')', '') || ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Educational Insights for Current Orbit Hand */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black bg-gradient-to-tr ${getCategoryColor(
                  heroRoleData.category
                )} shadow-lg`}>
                  {heroRoleData.shortName}
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-white">
                    Partida {currentOrbitHand}: Eres {heroRoleData.name}
                  </h4>
                  <span className="text-xs text-slate-400 font-medium">
                    {heroRoleData.categoryLabel} • {heroRoleData.advantageLevel}
                  </span>
                </div>
              </div>

              {/* Orbit Cost Tracker */}
              <div className="bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-800 flex items-center gap-3 shrink-0">
                <Coins className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Costo Acumulado de Ciegas:
                  </span>
                  <span className="text-sm font-black text-amber-300 font-mono">
                    ${cumulativeBlindCost} de $3.00 (1.5 BBs por órbita)
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Didactic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                  <Zap className="w-4 h-4" />
                  <span>Tu Estrategia en Esta Partida:</span>
                </span>
                <p className="text-slate-300 leading-relaxed font-medium">
                  {orbitHandData.tacticalAdvice}
                </p>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="font-bold text-indigo-400 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                  <Sparkles className="w-4 h-4" />
                  <span>¿Por qué cambia tu ventaja?</span>
                </span>
                <p className="text-slate-300 leading-relaxed font-medium">
                  {orbitHandData.whyThisMatters}
                </p>
              </div>

              <div className="bg-amber-950/20 p-4 rounded-2xl border border-amber-500/30 text-amber-200 space-y-1.5">
                <span className="font-bold text-amber-300 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>Principio Clave de Alton Hardin:</span>
                </span>
                <p className="text-xs leading-relaxed text-amber-200/90 font-medium">
                  {currentOrbitHand === 1
                    ? '¡Gana la mayor cantidad de botes posibles en esta mano! Necesitas ganar fichas en el Botón para pagar las ciegas que vendrán en las manos 5 y 6.'
                    : currentOrbitHand === 6
                    ? 'La Ciega Pequeña es el asiento estadísticamente más deficitario del poker. Sé muy disciplinado y no defiendas manos marginales.'
                    : heroRoleData.tableTip}
                </p>
              </div>
            </div>

            {/* Orbit Completion Card (Hand 6) */}
            {currentOrbitHand === 6 && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-black text-white block">
                      ¡Fin de la Órbita de 6 Manos!
                    </span>
                    <span className="text-slate-300">
                      En la siguiente mano, el botón habrá dado una vuelta completa de 360° y regresará al Asiento 1 (TÚ).
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCurrentOrbitHand(1);
                    fireSuccessConfetti();
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-lg transition-all shrink-0 cursor-pointer"
                >
                  Completar Vuelta & Festejar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: STATIC ANATOMY VIEW (ORIGINAL COMPLETE EXPLORER)  */}
      {/* ======================================================== */}
      {activeTab === 'static_table' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Format & Perspective Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400">Modo de Visualización:</span>
            <div className="flex flex-wrap gap-2">
              <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex text-xs font-bold">
                <button
                  onClick={() => {
                    setTableFormat('6max');
                    if (['utg1', 'hj'].includes(selectedPosId)) setSelectedPosId('btn');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    tableFormat === '6max'
                      ? 'bg-emerald-500 text-slate-950 shadow font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Mesa 6-Max (Online)
                </button>
                <button
                  onClick={() => setTableFormat('9max')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    tableFormat === '9max'
                      ? 'bg-emerald-500 text-slate-950 shadow font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Mesa 9-Max (En Vivo)
                </button>
              </div>

              <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex text-xs font-bold">
                <button
                  onClick={() => setViewPerspective('preflop')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    viewPerspective === 'preflop'
                      ? 'bg-indigo-500 text-white shadow font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Orden Pre-Flop
                </button>
                <button
                  onClick={() => setViewPerspective('postflop')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    viewPerspective === 'postflop'
                      ? 'bg-indigo-500 text-white shadow font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Orden Post-Flop
                </button>
              </div>
            </div>
          </div>

          {/* Static Table Oval */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[420px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-4 sm:p-8 border border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden">
            <div className="relative w-[88%] h-[80%] bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 rounded-[100px] border-8 border-amber-950/80 shadow-[inset_0_0_50px_rgba(0,0,0,0.8),0_10px_40px_rgba(0,0,0,0.7)] flex flex-col items-center justify-center p-4">
              <div className="absolute inset-3 rounded-[90px] border border-emerald-500/20 pointer-events-none" />

              <div className="text-center z-10 space-y-1">
                <div className="text-[11px] font-black uppercase tracking-widest text-emerald-400/80">
                  {tableFormat === '6max' ? 'MESA 6-MAX SHORTHANDED' : 'MESA 9-MAX FULL RING'}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-200">
                  {viewPerspective === 'preflop' ? (
                    <span className="flex items-center justify-center gap-1.5 text-amber-300">
                      <span>Pre-Flop: Habla 1º</span>
                      <span className="font-mono bg-rose-500/30 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/50">
                        UTG
                      </span>
                      <span>➡️ Cierra</span>
                      <span className="font-mono bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/50">
                        BB
                      </span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5 text-emerald-300">
                      <span>Post-Flop: Habla 1º</span>
                      <span className="font-mono bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/50">
                        SB
                      </span>
                      <span>➡️ Cierra (Oro)</span>
                      <span className="font-mono bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/50">
                        BTN
                      </span>
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 max-w-xs mx-auto hidden sm:block">
                  Toca cualquier asiento para ver sus cartas recomendadas y estrategia.
                </p>
              </div>

              {visiblePositions.map((pos) => {
                const coords = tableFormat === '6max' ? pos.pos6Max : pos.pos9Max;
                const isSelected = selectedPosId === pos.id;
                const order = getOrderBadge(pos);
                const isDealer = pos.id === 'btn';
                const isSB = pos.id === 'sb';
                const isBB = pos.id === 'bb';

                return (
                  <button
                    key={pos.id}
                    onClick={() => setSelectedPosId(pos.id)}
                    style={{
                      left: `${coords.x}%`,
                      top: `${coords.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute z-20 transition-all cursor-pointer group flex flex-col items-center focus:outline-none`}
                  >
                    <div
                      className={`relative px-2.5 sm:px-3 py-1.5 rounded-2xl border-2 font-bold transition-all shadow-lg flex items-center gap-1.5 ${
                        isSelected
                          ? `bg-gradient-to-r ${getCategoryColor(pos.category)} scale-110 ring-4 ring-white/30 z-30`
                          : 'bg-slate-900/90 text-slate-200 border-slate-700/80 hover:border-slate-500 hover:scale-105'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono font-black ${
                          isSelected
                            ? 'bg-slate-950 text-white'
                            : 'bg-slate-800 text-slate-400 group-hover:text-white'
                        }`}
                      >
                        {order}
                      </span>

                      <span className="text-xs sm:text-sm font-black tracking-tight">
                        {pos.shortName}
                      </span>

                      {isDealer && (
                        <span className="w-4 h-4 rounded-full bg-white text-slate-950 font-black text-[9px] flex items-center justify-center shadow-md border border-slate-300 animate-pulse">
                          D
                        </span>
                      )}

                      {isSB && (
                        <span className="text-[9px] text-amber-400 font-mono font-bold">
                          0.5BB
                        </span>
                      )}
                      {isBB && (
                        <span className="text-[9px] text-amber-400 font-mono font-bold">
                          1BB
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-[9px] font-semibold mt-1 px-1 rounded transition-opacity ${
                        isSelected
                          ? 'text-emerald-300 font-black bg-slate-950/80'
                          : 'text-slate-400 opacity-80 group-hover:opacity-100'
                      }`}
                    >
                      {pos.shortName === 'BTN' ? 'Oro ★' : pos.categoryLabel.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Position Detailed Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black bg-gradient-to-tr ${getCategoryColor(
                    selectedPos.category
                  )} shadow-lg`}
                >
                  {selectedPos.shortName}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg sm:text-xl font-black text-white">
                      {selectedPos.name}
                    </h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-slate-900 border border-slate-700 text-slate-300">
                      {selectedPos.categoryLabel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">
                    {selectedPos.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Turno Pre-Flop
                  </span>
                  <span className="text-sm font-black text-white font-mono">
                    #{tableFormat === '6max' ? selectedPos.preflopOrder6Max : selectedPos.preflopOrder9Max}
                  </span>
                </div>
                <div className="bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                    Turno Post-Flop
                  </span>
                  <span className="text-sm font-black text-emerald-400 font-mono">
                    #{tableFormat === '6max' ? selectedPos.postflopOrder6Max : selectedPos.postflopOrder9Max}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="font-bold text-indigo-400 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                  <Zap className="w-4 h-4" />
                  <span>¿Qué ocurre en este asiento?</span>
                </span>
                <p className="text-slate-300 leading-relaxed font-medium">
                  {selectedPos.whyItMatters}
                </p>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                    <Sparkles className="w-4 h-4" />
                    <span>Rango Recomendado:</span>
                  </span>
                  <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    ~{selectedPos.rangePercentage}% de manos
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  {selectedPos.handsSample}
                </p>
              </div>

              <div className="bg-amber-950/20 p-4 rounded-2xl border border-amber-500/30 text-amber-200 space-y-1.5">
                <span className="font-bold text-amber-300 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>Regla de Oro de Alton Hardin:</span>
                </span>
                <p className="text-xs leading-relaxed text-amber-200/90 font-medium">
                  {selectedPos.tableTip}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
              <span className="text-slate-500 font-bold shrink-0 mr-1">Seleccionar posición:</span>
              {visiblePositions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPosId(p.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                    selectedPosId === p.id
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {p.shortName}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
