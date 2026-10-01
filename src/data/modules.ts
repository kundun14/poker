import type { PokerModule } from '../types/poker';
import { PROBLEMS } from './problems';

export const MODULES: PokerModule[] = [
  // =========================================================================
  // SECCIÓN 1: INTRODUCCIÓN Y FUNDAMENTOS
  // =========================================================================
  {
    id: 'c1',
    order: 1,
    chapterNumber: 1,
    section: 'Sección 1: Introducción y Fundamentos',
    sectionNumber: 1,
    title: 'La Importancia de las Matemáticas en el Poker',
    subtitle: 'Por qué la matemática derrota a la suerte a largo plazo',
    bookChapter: 'Capítulo 1',
    readingTime: '2 min',
    icon: 'TrendingUp',
    color: 'emerald',
    learningContext: {
      whyItMatters: 'Si juegas solo por "corazonadas", estás apostando a ciegas contra un casino invisible. La matemática es la única herramienta que transforma el poker de un juego de azar en una profesión o hobby rentable.',
      tableDilemma: 'Acabas de perder una mano yendo All-In con AA frente a un rival que pagó con cartas basura. ¿Estás jugando mal o fue mala suerte? ¿Cómo saber si tu juego es ganador?',
      commonMistake: 'El 90% de novatos sufren de "sesgo de resultado": juzgan si una jugada fue buena o mala solo por si ganaron o perdieron esa mano individual.',
      tableSuperpower: 'Inmunidad emocional ante la varianza: juegas sabiendo que la Ley de los Grandes Números te devolverá cada centavo con creces a lo largo de 1,000 manos.',
    },
    keyTakeaway: 'Una mano aislada es puro azar; 1,000 manos son matemática pura. Concéntrate en tomar decisiones con expectativa positiva (+EV).',
    formula: {
      name: 'Ley de los Grandes Números',
      expression: 'lim(n→∞) Resultado Observado = Expectativa Matemática (EV)',
      explanation: 'A mayor volumen de manos jugadas, el factor suerte tiende a cero y solo prevalece tu ventaja matemática.',
    },
    theoryInsights: [
      {
        title: 'El Poker ya no es como en las películas',
        content: 'El poker clásico de leer tics nerviosos en los ojos ha sido superado por el poker cuantitativo. Los jugadores de élite calculan probabilidades y frecuencias en segundos.',
      },
      {
        title: 'La Varianza es tu amiga',
        content: 'La varianza permite que los malos jugadores ganen a corto plazo. Si no ganaran a veces, dejarían de jugar. La matemática garantiza que te transferirán sus fichas a largo plazo.',
      },
    ],
    sandboxType: 'variance',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c1'),
  },

  {
    id: 'c2',
    order: 2,
    chapterNumber: 2,
    section: 'Sección 1: Introducción y Fundamentos',
    sectionNumber: 1,
    title: 'Conceptos Fundamentales: Posición, Botes y Estructura',
    subtitle: 'La anatomía de la mesa y el poder absoluto de actuar último',
    bookChapter: 'Capítulo 2',
    readingTime: '3 min',
    icon: 'Grid',
    color: 'blue',
    learningContext: {
      whyItMatters: 'Jugar la misma mano en primera posición (UTG) que en el Botón (BTN) es la diferencia entre perder dinero sistemáticamente o acumular fichas sin parar.',
      tableDilemma: 'Tienes K-J. ¿Debes entrar al bote desde UTG? ¿Y si estás en el Botón? ¿Cómo cambia el tamaño del bote según el Stack-to-Pot Ratio (SPR)?',
      commonMistake: 'Jugar demasiadas manos fuera de posición, viéndose obligado a tomar decisiones a ciegas en cada una de las 4 calles.',
      tableSuperpower: 'Dominio posicional: obligas a tus rivales a hablar primero, extrayéndoles información gratuita antes de arriesgar una sola ficha.',
    },
    keyTakeaway: 'La posición te da información; el SPR te dice si debes comprometer tu stack entero con una sola pareja o jugar con cautela.',
    formula: {
      name: 'Stack-to-Pot Ratio (SPR)',
      expression: 'SPR = Stack Efectivo / Bote en el Flop',
      explanation: 'SPR < 3 = compromiso total con Top Pair. SPR > 6 = manos especulativas y draws ganan valor masivo.',
    },
    theoryInsights: [
      {
        title: 'Las 6 Posiciones Canónicas',
        content: 'UTG (primero en hablar, rango muy cerrado 12-15%), MP (medio), CO (cutoff), BTN (la mejor posición de la mesa, rango 40-50%), SB (ciega pequeña) y BB (ciega grande).',
      },
      {
        title: 'SPR y Compromiso',
        content: 'Si el bote preflop es enorme y te queda poco stack (SPR bajo), no intentes faroles complejos: una pareja buena ya justifica ir all-in.',
      },
    ],
    sandboxType: 'position-spr',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c2'),
  },

  {
    id: 'c3',
    order: 3,
    chapterNumber: 3,
    section: 'Sección 1: Introducción y Fundamentos',
    sectionNumber: 1,
    title: 'Tipos de Jugadores Básicos y Explotación Matemática',
    subtitle: 'Identifica a tus rivales y desarma sus tendencias con números',
    bookChapter: 'Capítulo 3',
    readingTime: '3 min',
    icon: 'Target',
    color: 'amber',
    learningContext: {
      whyItMatters: 'La matemática del poker no se aplica en el vacío. Calcular pot odds o faroles depende directamente de qué cartas juega y cómo reacciona cada perfil de rival.',
      tableDilemma: 'Llegas al river con aire puro. El bote tiene $100. ¿Debes farolear? Contra una "Roca" ganarás el 80% de las veces; contra una "Calling Station" perderás el 100%.',
      commonMistake: 'Intentar farolear a jugadores pasivos que pagan con cualquier carta ("Calling Stations"), regalándoles botes enteros.',
      tableSuperpower: 'Visión de rayos X: identificas el perfil del rival en 1 ó 2 rondas y adaptas tus apuestas a sus errores sistemáticos.',
    },
    keyTakeaway: 'A las Calling Stations se les apuesta por valor fuerte y NUNCA se les farolea. A las Rocas se les roban las ciegas constantemente.',
    formula: {
      name: 'Regla de Explotación por Perfil',
      expression: 'Calling Station: EV(Farol) ≈ 0 | Roca: EV(Robo) >> 0',
      explanation: 'Modifica tus rangos de apuesta según la elasticidad y frecuencia de fold del rival.',
    },
    theoryInsights: [
      {
        title: 'Los 4 Perfiles Clásicos',
        content: 'TAG (Tight-Aggressive: selectivo y ganador), LAG (Loose-Aggressive: agresivo y peligroso), Nit/Roca (Tight-Passive: miedoso y predecible), Calling Station (Loose-Passive: paga con todo).',
      },
      {
        title: 'La Regla de Oro contra Pasivos',
        content: 'Un jugador pasivo solo sube cuando tiene monstruos absolutos. Si un jugador pasivo te resube en turn o river, ¡tira tu mano sin dudar!',
      },
    ],
    sandboxType: 'player-profiler',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c3'),
  },

  // =========================================================================
  // SECCIÓN 2: MATEMÁTICAS FUNDAMENTALES
  // =========================================================================
  {
    id: 'c4',
    order: 4,
    chapterNumber: 4,
    section: 'Sección 2: Matemáticas Fundamentales',
    sectionNumber: 2,
    title: 'Probabilidades y Odds Básicas',
    subtitle: 'La moneda de cambio mental para pensar en ratios y porcentajes',
    bookChapter: 'Capítulo 4',
    readingTime: '3 min',
    icon: 'Percent',
    color: 'emerald',
    learningContext: {
      whyItMatters: 'Para calcular si un pago es rentable en plena mano necesitas transformar ratios de odds (ej. 4 a 1) en porcentajes en menos de 2 segundos.',
      tableDilemma: 'Un rival te ofrece unas odds de 3 a 1 para pagar. ¿Qué porcentaje de victorias necesitas exactamente para no perder dinero?',
      commonMistake: 'Pensar que 3 a 1 significa un 33% (1/3), cuando en realidad representa un 25% (1 / [3 + 1]). Ese 8% de error cuesta miles de dólares en las mesas.',
      tableSuperpower: 'Conversión mental refleja: conviertes cualquier ratio de odds a porcentaje al instante mientras los demás jugadores usan calculadoras.',
    },
    keyTakeaway: 'Suma siempre los dos términos del ratio: Odds en contra A:B significa probabilidad = B / (A + B).',
    formula: {
      name: 'Conversión de Odds a Probabilidad',
      expression: 'Probabilidad % = B / (A + B) × 100',
      explanation: 'Para 4 a 1: 1 / (4 + 1) = 1/5 = 20%. Para 3 a 1: 1 / (3 + 1) = 1/4 = 25%.',
    },
    theoryInsights: [
      {
        title: 'Odds en Contra vs Odds a Favor',
        content: 'En poker siempre hablamos de odds en contra (A a B), donde A es la cantidad de veces que fallas y B las que aciertas.',
      },
      {
        title: 'Los 4 Ratios Sagrados',
        content: '4:1 = 20% (Color en el turn). 3:1 = 25% (Apuesta de medio bote). 2:1 = 33% (Apuesta de bote completo). 1:1 = 50% (Coin flip).',
      },
    ],
    sandboxType: 'converter',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c4'),
  },

  {
    id: 'c5',
    order: 5,
    chapterNumber: 5,
    section: 'Sección 2: Matemáticas Fundamentales',
    sectionNumber: 2,
    title: 'Entendiendo la Equity (Cuota del Bote)',
    subtitle: 'Tu porción matemática de propiedad sobre el dinero en juego',
    bookChapter: 'Capítulo 5',
    readingTime: '3 min',
    icon: 'Scale',
    color: 'indigo',
    learningContext: {
      whyItMatters: 'La Equity es el concepto que te dice cuánto dinero del bote te pertenece legalmente por leyes de la probabilidad antes de ver el river.',
      tableDilemma: 'Hay $200 en el bote y tu mano tiene un 35% de probabilidad de ganar. ¿Cuánto dinero vale tu mano ahora mismo? ¿Cuánto puedes arriesgar para defenderla?',
      commonMistake: 'Creer que una mano solo vale dinero si va por delante en el flop. Muchas manos por detrás tienen suficiente equity para ser rentables.',
      tableSuperpower: 'Visión patrimonial: ves el bote de poker como una tarta dividida en porcentajes exactos entre tú y tus rivales.',
    },
    keyTakeaway: 'Tu Equity es tu probabilidad de victoria multiplicada por el tamaño del bote. Es dinero real a largo plazo.',
    formula: {
      name: 'Equity Monetaria en el Bote',
      expression: 'Equity ($) = Probabilidad de Ganar (%) × Bote Total',
      explanation: 'Si hay $300 en el bote y tienes 40% de equity, tu mano vale matemáticamente $120.00 en ese instante.',
    },
    theoryInsights: [
      {
        title: 'Card Equity vs Pot Equity',
        content: 'Card Equity es la probabilidad pura de que tus 2 cartas ganen al llegar al river. Pot Equity es la porción del bote que esperas ganar considerando fold equity.',
      },
      {
        title: 'Equity Preflop Estándar',
        content: 'Overpair vs Underpair: ~82% vs 18%. Pareja vs 2 Overcards: ~54% vs 46%. Overcards vs Undercards: ~63% vs 37%.',
      },
    ],
    sandboxType: 'converter',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c5'),
  },

  {
    id: 'c6',
    order: 6,
    chapterNumber: 6,
    section: 'Sección 2: Matemáticas Fundamentales',
    sectionNumber: 2,
    title: 'Pot Odds Directas',
    subtitle: 'El precio del bote: cuánto arriesgas frente a cuánto puedes ganar',
    bookChapter: 'Capítulo 6',
    readingTime: '4 min',
    icon: 'Coins',
    color: 'amber',
    learningContext: {
      whyItMatters: 'Las Pot Odds te dicen exactamente el "precio con descuento" que te ofrece el bote para pagar. Sin ellas, pagarás precios caros por proyectos baratos.',
      tableDilemma: 'Un oponente apuesta $40 en un bote de $80. Te cuesta $40 pagar. ¿Qué porcentaje de victorias necesitas en el showdown para que el pago no sea una pérdida de dinero?',
      commonMistake: 'Calcular 40 / 80 = 50% de odds, sin darse cuenta de que la apuesta del rival y el propio call aumentan el bote total resultante a $160 (exigiendo solo el 25%).',
      tableSuperpower: 'Detector de precios: sabes en 1 segundo si una apuesta es una ganga matemática o un robo a mano armada.',
    },
    keyTakeaway: 'Fórmula de Pot Odds: Tu Call / (Bote antes de apostar + Apuesta rival + Tu Call).',
    formula: {
      name: 'Fórmula de Pot Odds Directas',
      expression: 'Pot Odds % = Call / (Bote Previo + Apuesta + Call)',
      explanation: 'Pagar $50 en bote de $100 con apuesta de $50: $50 / ($100 + $50 + $50) = 50 / 200 = 25%.',
    },
    theoryInsights: [
      {
        title: 'Los Precios Estándar del Poker',
        content: 'Apuesta de 1/3 bote = necesitas 20% equity. Apuesta de 1/2 bote = necesitas 25% equity. Apuesta de 2/3 bote = necesitas 28.6% equity. Apuesta de 1 bote = necesitas 33.3% equity.',
      },
      {
        title: 'La Comparación Inmediata',
        content: 'Una vez calculas tus Pot Odds (ej. 25%), solo tienes que compararlas con tu Card Equity (ej. 30%). Si Equity >= Pot Odds, ¡PAGAS!',
      },
    ],
    sandboxType: 'pot-odds',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c6'),
  },

  {
    id: 'c7',
    order: 7,
    chapterNumber: 7,
    section: 'Sección 2: Matemáticas Fundamentales',
    sectionNumber: 2,
    title: 'Implied Odds & Reverse Implied Odds',
    subtitle: 'El dinero futuro que justifica pagos sin odds directas inmediatas',
    bookChapter: 'Capítulo 7',
    readingTime: '4 min',
    icon: 'Flame',
    color: 'teal',
    learningContext: {
      whyItMatters: 'Muchos pagos en el turn no tienen Pot Odds directas (te falta un 5-10% de equity). Las Odds Implícitas te permiten pagar legalmente si el rival tiene fichas detrás para pagarte en el river.',
      tableDilemma: 'Tienes un proyecto de color en el Turn (18% equity). El rival apuesta medio bote (pide 25%). ¿Debes foldear? Si el rival tiene $100 en su stack y le cuesta foldear, ¡las Implied Odds te salvan la mano!',
      commonMistake: 'Pagar con proyectos débiles o dominados (Reverse Implied Odds) donde completar la mano te cuesta la caja entera contra un color superior.',
      tableSuperpower: 'Cálculo de cheque futuro: calculas la factura exacta que le pasarás al rival en el river para compensar el peaje del turn.',
    },
    keyTakeaway: 'Dinero extra necesario = (Call / Equity%) - Bote actual tras pagar. Solo paga si el rival tiene ese dinero detrás.',
    formula: {
      name: 'Cálculo de Dinero Futuro Necesario',
      expression: 'Extra Requerido = (Call / Equity) - Bote Final tras Call',
      explanation: 'Determina cuántos dólares debes extraerle al stack del rival en el river para equilibrar el coste.',
    },
    theoryInsights: [
      {
        title: 'Las 3 Condiciones de Implied Odds',
        content: '1) El rival debe tener stack suficiente detrás. 2) El rival debe ser capaz de pagar en river con manos peores. 3) Tu proyecto debe ser disimulado para que no se asuste.',
      },
      {
        title: 'El Peligro de Reverse Implied Odds',
        content: 'Proyectos de color al 6 o escaleras dominadas sufren de odds implícitas inversas: cuando ligas tu carta, pierdes el máximo contra una mano superior.',
      },
    ],
    sandboxType: 'implied-odds',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c7'),
  },

  {
    id: 'c8',
    order: 8,
    chapterNumber: 8,
    section: 'Sección 2: Matemáticas Fundamentales',
    sectionNumber: 2,
    title: 'Proyectos Comunes y Conteo de Outs',
    subtitle: 'Identifica exactamente cuántas cartas en la baraja te dan la victoria',
    bookChapter: 'Capítulo 8',
    readingTime: '3 min',
    icon: 'Sparkles',
    color: 'purple',
    learningContext: {
      whyItMatters: 'Un "out" es una carta desconocida en la baraja que completará tu mano ganadora. Contar mal tus outs arruina toda la cadena de cálculos posteriores.',
      tableDilemma: 'Tienes 8-7 en board 6-5-K con 2 corazones. Tienes escalera abierta (8 outs), pero sospechas que el rival tiene color. ¿Cuántas outs limpias tienes de verdad?',
      commonMistake: 'Contar "Dirty Outs" (outs sucias) como si fueran cartas seguras, pagando apuestas con falsa sensación de seguridad.',
      tableSuperpower: 'Filtro de outs limpias: descuentas naipes contaminados y sabes con precisión quirúrgica cuántas cartas reales te dan el bote.',
    },
    keyTakeaway: 'Gutshot = 4 outs. Overcards = 6 outs. Escalera abierta = 8 outs. Color = 9 outs. Monstruos = 12-15 outs.',
    formula: {
      name: 'Outs Limpias (Clean Outs)',
      expression: 'Outs Limpias = Outs Nominales - Dirty Outs (Contaminadas)',
      explanation: 'Si una out completa tu escalera pero también le da color al rival, no debes contarla al 100%.',
    },
    theoryInsights: [
      {
        title: 'La Baraja de 52 Cartas',
        content: 'En el flop ya conoces 5 cartas (2 tuyas + 3 del flop); quedan 47 cartas desconocidas en la baraja. En el turn quedan 46 cartas desconocidas.',
      },
      {
        title: 'Outs Ocultas (Backdoor Draws)',
        content: 'Tener 3 cartas de un palo en el flop (backdoor flush) añade aproximadamente 1 out adicional equivalente por las posibilidades de ligar en turn y river.',
      },
    ],
    sandboxType: 'out-picker',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c8'),
  },

  {
    id: 'c9',
    order: 9,
    chapterNumber: 9,
    section: 'Sección 2: Matemáticas Fundamentales',
    sectionNumber: 2,
    title: 'La Regla del 2 y 4 (El Atajo de Hardin)',
    subtitle: 'Estima tu probabilidad en menos de 2 segundos en mesas en vivo u online',
    bookChapter: 'Capítulo 9',
    readingTime: '4 min',
    icon: 'Flame',
    color: 'amber',
    learningContext: {
      whyItMatters: 'En la mesa de poker no tienes tiempo de resolver complejas fórmulas combinatorias. La Regla del 2 y 4 es el truco aritmético que usan todos los profesionales para estimar su equity al instante.',
      tableDilemma: 'El rival te apuesta en el flop y te quedan 10 segundos en el reloj de decisión. Tienes 9 outs. ¿Cómo sabes tu porcentaje exacto de victoria sin titubear?',
      commonMistake: 'Multiplicar por 4 en All-in con muchas outs (>8) sin aplicar el ajuste de Hardin, sobrestimando la equity hasta en un 5%.',
      tableSuperpower: 'Cálculo relámpago: conviertes cualquier conteo de outs en porcentaje de victoria antes de que el rival suelte sus fichas.',
    },
    keyTakeaway: '1 carta por ver (Turn a River): Outs × 2. 2 cartas por ver (Flop All-in): (Outs × 4) - (Outs - 8) si tienes más de 8 outs.',
    formula: {
      name: 'La Regla del 2 y 4 de Alton Hardin',
      expression: 'Turn: Outs × 2% | Flop All-in (>8 outs): (Outs × 4) - (Outs - 8)%',
      explanation: 'Para 9 outs en Flop All-in: (9 × 4) - (9 - 8) = 36 - 1 = 35% de Equity (exacto: 35.0%).',
    },
    theoryInsights: [
      {
        title: 'Por Qué Funciona la Regla del 2',
        content: 'En el turn quedan 46 cartas. Cada out representa 1 / 46 = 2.17%. Multiplicar por 2 es una aproximación con menos del 1% de error.',
      },
      {
        title: 'El Ajuste de Hardin',
        content: 'Con 15 outs, 15 × 4 = 60% (sobrestima). Ajuste de Hardin: 60 - (15 - 8) = 53% (el valor exacto es 54.1%).',
      },
    ],
    sandboxType: 'out-picker',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c9'),
  },

  {
    id: 'c10',
    order: 10,
    chapterNumber: 10,
    section: 'Sección 2: Matemáticas Fundamentales',
    sectionNumber: 2,
    title: 'Introducción al Valor Esperado (EV)',
    subtitle: 'El criterio supremo: cómo piensan los profesionales del poker',
    bookChapter: 'Capítulo 10',
    readingTime: '4 min',
    icon: 'TrendingUp',
    color: 'indigo',
    learningContext: {
      whyItMatters: 'El Valor Esperado (EV) es el único indicador que separa a los ganadores de los perdedores. Te permite saber si una jugada produce beneficios netos a largo plazo o si es un agujero negro de dinero.',
      tableDilemma: 'Tienes que pagar $100. El 40% de las veces ganas $300 y el 60% pierdes tus $100. ¿Debes pagar? Sí, porque ganas +$60.00 en promedio cada vez.',
      commonMistake: 'Juzgar las decisiones por si "gané esta mano" o "perdí esta mano". La varianza te confunde si no mides el EV de la decisión.',
      tableSuperpower: 'Visión de largo plazo: dejas de frustrarte por las malas rachas porque sabes que cada jugada +EV añade dinero matemático a tu bolsillo.',
    },
    keyTakeaway: 'EV = (Probabilidad de Ganar × Ganancia Neta) - (Probabilidad de Perder × Inversión). El Fold siempre tiene EV = $0.',
    formula: {
      name: 'Ecuación Fundamental de EV',
      expression: 'EV = (P_win × $Win) - (P_lose × $Lose)',
      explanation: 'Pondera cada resultado posible por su recompensa o coste financiero neto.',
    },
    theoryInsights: [
      {
        title: 'El Secreto de EV(Fold) = $0',
        content: 'El dinero previamente invertido en el bote es dinero muerto. Retirarte nunca cuesta nada extra. Cualquier decisión con EV > $0 supera a foldear.',
      },
      {
        title: 'Decisiones de +EV Acumulado',
        content: 'Los mejores jugadores del mundo simplemente encadenan decisiones de +EV pequeño (+$2, +$5, +$15) que al cabo de 50,000 manos suman decenas de miles de dólares.',
      },
    ],
    sandboxType: 'ev-balance',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c10'),
  },

  {
    id: 'c11',
    order: 11,
    chapterNumber: 11,
    section: 'Sección 2: Matemáticas Fundamentales',
    sectionNumber: 2,
    title: '¿Podemos Pagar? (El Proceso de Decisión Completo)',
    subtitle: 'El algoritmo mental de 5 pasos para tomar decisiones perfectas en vivo',
    bookChapter: 'Capítulo 11',
    readingTime: '5 min',
    icon: 'Scale',
    color: 'emerald',
    learningContext: {
      whyItMatters: 'Este capítulo es la culminación de toda la Sección 2. Reúne Outs, Regla de 2 y 4, Pot Odds, Implied Odds y EV en un algoritmo mental único y ordenado.',
      tableDilemma: 'Estás en el river o turn facing a bet. El corazón te late rápido. ¿Pagar o foldear? En vez de dudar, ejecutas el algoritmo mental de 5 pasos y la respuesta sale sola.',
      commonMistake: 'Tomar la decisión al revés: primero decidir si "quieres ver la carta" y luego buscar excusas para justificar el pago.',
      tableSuperpower: 'Algoritmo mental infalible: ante cualquier apuesta rival ejecutas los 5 pasos en orden y sabes exactamente si tu call es ganador o perdedor.',
    },
    keyTakeaway: '1: Cuenta Outs limpias. 2: Estima Equity con Regla de 2/4. 3: Calcula Pot Odds. 4: Compara (¿Equity >= Pot Odds?). 5: Si no, evalúa Implied Odds.',
    formula: {
      name: 'Algoritmo de Decisión de Hardin',
      expression: '¿Equity % >= Pot Odds %? -> CALL | Si no: ¿Stack rival cubre el déficit? -> CALL/FOLD',
      explanation: 'El árbol de decisión definitivo para resolver cualquier situación post-flop.',
    },
    theoryInsights: [
      {
        title: 'Los 5 Pasos en Secuencia',
        content: 'Paso 1: Outs limpias. Paso 2: Equity estimada. Paso 3: Pot Odds requeridas. Paso 4: Comparación directa. Paso 5: Evaluación de odds implícitas.',
      },
      {
        title: 'La Disciplina del Fold',
        content: 'Si fallan tanto las Pot Odds directas como las Implied Odds, foldear es la única opción matemáticamente correcta.',
      },
    ],
    sandboxType: 'decision-flow',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c11'),
  },

  // =========================================================================
  // SECCIÓN 3: MATEMÁTICAS PRE-FLOP
  // =========================================================================
  {
    id: 'c12',
    order: 12,
    chapterNumber: 12,
    section: 'Sección 3: Matemáticas Pre-Flop',
    sectionNumber: 3,
    title: 'Situaciones All-In Pre-Flop',
    subtitle: 'La matemática de los enfrentamientos preflop y dominación de rangos',
    bookChapter: 'Capítulo 12',
    readingTime: '3 min',
    icon: 'Zap',
    color: 'rose',
    learningContext: {
      whyItMatters: 'En torneos y botes 3-beteados, las situaciones de All-In preflop mueven botes gigantescos. Conocer las probabilidades exactas de los choques típicos es vital.',
      tableDilemma: 'Un jugador agresivo va All-In preflop por 25 ciegas grandes. Tienes A-K o Q-Q. ¿Cuánto riesgo estás asumiendo realmente contra su rango?',
      commonMistake: 'Pagar all-ins con cartas dominadas como A-J o K-Q creyendo que son "buenas cartas", perdiendo el 74% de las veces contra AK.',
      tableSuperpower: 'Evaluador de rangos preflop: conoces de memoria los porcentajes de victoria de todos los enfrentamientos clásicos de Texas Hold\'em.',
    },
    keyTakeaway: 'Monstruos: AA vs KK = 82% vs 18%. Coin flip: QQ vs AKs = 54% vs 46%. Kicker dominado: AK vs AQ = 74% vs 26%.',
    formula: {
      name: 'Matriz de Choques Pre-Flop',
      expression: 'Overpair vs Underpair: ~82% | Par vs 2 Overcards: ~54% | Dominación: ~74%',
      explanation: 'Las tres categorías universales de enfrentamientos de all-in antes del flop.',
    },
    theoryInsights: [
      {
        title: 'El Fenómeno del Coin Flip',
        content: 'Las parejas bajas y medias (22 a TT) frente a dos cartas mayores (AK, AQ) siempre oscilan entre un 52% y 56% a favor de la pareja.',
      },
      {
        title: 'La Tragedia de la Dominación',
        content: 'Tener una carta igual a la del rival pero con peor kicker (AQ vs AK, KQ vs AK) te deja con solo 3 cartas salvadoras en toda la baraja (~26% de equity).',
      },
    ],
    sandboxType: 'converter',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c12'),
  },

  {
    id: 'c13',
    order: 13,
    chapterNumber: 13,
    section: 'Sección 3: Matemáticas Pre-Flop',
    sectionNumber: 3,
    title: 'Set-Mining, Robo de Ciegas y 3-Bet Bluffs',
    subtitle: 'Multiplica tu dinero con parejas pequeñas y roba botes automáticamente',
    bookChapter: 'Capítulo 13',
    readingTime: '4 min',
    icon: 'Target',
    color: 'amber',
    learningContext: {
      whyItMatters: 'Preflop se ganan botes pequeños que mantienen viva tu cuenta. La Regla del 20 te dice cuándo pagar con parejas bajas para buscar trío, y el Break-Even de robo te permite imprimir fichas gratis desde el Botón.',
      tableDilemma: 'Tienes 33 en el Botón. UTG sube a $10. Tienen $150 de stack. ¿Es rentable pagar para set-mining? No, porque 150/10 = 15x, no llega al 20x ideal de Hardin.',
      commonMistake: 'Pagar subidas preflop con parejas como 22 o 33 cuando el rival solo tiene 8 o 10 ciegas grandes de stack, perdiendo fichas en 7 de cada 8 flops.',
      tableSuperpower: 'Cazador de tríos y ladrón de ciegas: solo pagas parejas cuando el stack rival garantiza rentabilidad y abres el botón sabiendo la frecuencia exacta de fold.',
    },
    keyTakeaway: 'Regla del 20: Stacks efectivos deben ser al menos 20 veces la apuesta. Break-Even de robo = Riesgo / (Riesgo + Ciegas).',
    formula: {
      name: 'Regla del 20 y Break-Even Steal',
      expression: 'Stack >= 20 × Subida | Break-Even Steal = Riesgo / (Riesgo + Recompensa)',
      explanation: 'Robar con min-raise (2bb para ganar 1.5bb): 2 / (2 + 1.5) = 2/3.5 = 57.1% de folds requeridos.',
    },
    theoryInsights: [
      {
        title: 'La Probabilidad de Set en el Flop',
        content: 'Con una pareja en mano, conectarás trío en el flop exactamente el 11.8% de las veces (1 de cada 8.5 veces o 7.5 a 1 en contra).',
      },
      {
        title: 'Por Qué Necesitas 20x y no 8x',
        content: 'Porque cuando ligues tu trío, no siempre el rival tendrá mano suficiente para pagarte todo su stack. El colchón de 20x compensa las veces que no te pagan.',
      },
    ],
    sandboxType: 'preflop-steal',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c13'),
  },

  // =========================================================================
  // SECCIÓN 4: MATEMÁTICAS POST-FLOP
  // =========================================================================
  {
    id: 'c14',
    order: 14,
    chapterNumber: 14,
    section: 'Sección 4: Matemáticas Post-Flop',
    sectionNumber: 4,
    title: 'Apostando con la Mejor Mano (Value Betting & Sizing)',
    subtitle: 'Cómo dimensionar tus apuestas para extraer el valor máximo sin espantar al rival',
    bookChapter: 'Capítulo 14',
    readingTime: '4 min',
    icon: 'Coins',
    color: 'emerald',
    learningContext: {
      whyItMatters: 'Tener la mejor mano y apostar demasiado poco regala dinero; apostar demasiado grande asusta al rival y hace que foldee. El Sizing de Value Bet es el arte de maximizar la ganancia esperada.',
      tableDilemma: 'Tienes color en el river. El bote es de $100. ¿Debes apostar $30, $60 o $120? Con $60 te pagan el 60% (EV=$36); con $120 solo te pagan el 20% (EV=$24).',
      commonMistake: 'Creer que apostar más dinero siempre genera más ganancia, ignorando la elasticidad del rango del rival.',
      tableSuperpower: 'Extractor de valor óptimo: encuentras el punto dulce matemático donde el producto de Tamaño × Frecuencia de Pago es máximo.',
    },
    keyTakeaway: 'El EV de una Value Bet es: Tamaño de Apuesta × Probabilidad de que el Rival Pague. Maximiza ese producto.',
    formula: {
      name: 'Ecuación de Value Bet Sizing',
      expression: 'EV_value = Tamaño Apuesta ($) × Frecuencia de Call (%)',
      explanation: 'Un tamaño medio que consigue muchos calls supera a un tamaño gigante que solo consigue folds.',
    },
    theoryInsights: [
      {
        title: 'Los Objetivos de la Apuesta por Valor',
        content: '1) Conseguir que manos peores paguen (Value). 2) Denegar equity protegiendo tu mano de proyectos baratos (Protection).',
      },
      {
        title: 'Rangos Elásticos vs Inelásticos',
        content: 'Un rival inelástico (Calling Station) pagará lo mismo si apuestas 50% que si apuestas 85% del bote: ¡apuéstale grande siempre!',
      },
    ],
    sandboxType: 'value-sizing',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c14'),
  },

  {
    id: 'c15',
    order: 15,
    chapterNumber: 15,
    section: 'Sección 4: Matemáticas Post-Flop',
    sectionNumber: 4,
    title: 'Semi-Farol All-In (Semi-Bluffing)',
    subtitle: 'La fórmula de los dos motores: cómo la agresividad con proyectos genera ganancias',
    bookChapter: 'Capítulo 15',
    readingTime: '4 min',
    icon: 'Flame',
    color: 'rose',
    learningContext: {
      whyItMatters: 'Pagar pasivamente con un proyecto te da una sola forma de ganar (showdown). El Semi-Farol All-in te da dos formas simultáneas de ganar fichas: Fold Equity inmediata más Card Equity.',
      tableDilemma: 'Tienes un proyecto de color y escalera (12 outs) en el flop. El rival apuesta. ¿Pagar o ir All-In? La matemática demuestra que ir All-In tiene un EV inmensamente superior.',
      commonMistake: 'Jugar los proyectos de forma pasiva haciendo solo "check-call", regalándole el control absoluto de la mano al oponente.',
      tableSuperpower: 'Agresividad matemática letal: pones la presión del torneo sobre los hombros del rival teniendo siempre un salvavidas de cartas en la recámara.',
    },
    keyTakeaway: 'Semi-Bluff EV = (Fold% × Bote Actual) + (1 - Fold%) × [Showdown EV si pagan]. Dos vías hacia la victoria.',
    formula: {
      name: 'Ecuación de Semi-Bluff All-In',
      expression: 'EV = (Fold% × Bote) + (1 - Fold%) × [(Equity × Bote_Final) - ((1 - Equity) × Apuesta)]',
      explanation: 'Suma el beneficio directo cuando tiran sus cartas más tu expectativa si pagan.',
    },
    theoryInsights: [
      {
        title: 'El Salvavidas del Semi-Farol',
        content: 'A diferencia de un farol puro (donde pierdes el 100% de las veces que te pagan), con un semi-farol tienes entre un 35% y un 54% de equity cuando te pagan.',
      },
      {
        title: 'Maximizando la Fold Equity',
        content: 'El semi-farol funciona mejor cuando tu apuesta representa fuerza legítima y el rival tiene un rango amplio de manos medias.',
      },
    ],
    sandboxType: 'semi-bluff',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c15'),
  },

  {
    id: 'c16',
    order: 16,
    chapterNumber: 16,
    section: 'Sección 4: Matemáticas Post-Flop',
    sectionNumber: 4,
    title: 'Faroles Puros y Hero Calls (Alpha & MDF)',
    subtitle: 'La teoría de juegos de apostar sin cartas y defender el porcentaje mínimo',
    bookChapter: 'Capítulo 16',
    readingTime: '4 min',
    icon: 'Shield',
    color: 'blue',
    learningContext: {
      whyItMatters: '¿Cuándo es matemáticamente rentable farolear con 0% de cartas? ¿Y cuánto porcentaje de tus manos debes defender para que no te atropellen con faroles? Alpha y MDF te dan la respuesta exacta.',
      tableDilemma: 'En el River tienes carta alta al 7 (aire puro). El bote tiene $150. Apuestas $75. Solo necesitas que el rival foldee el 33.3% de las veces para ganar dinero a largo plazo.',
      commonMistake: 'Creer que un farol necesita funcionar el 80% o 90% de las veces. Apuestas pequeñas de farol requieren bajísimas frecuencias de fold.',
      tableSuperpower: 'Escudo inquebrantable: calculas la Frecuencia Mínima de Defensa (MDF) para no ser explotado y sabes el umbral de fold para tus faroles.',
    },
    keyTakeaway: 'Alpha = Riesgo / (Riesgo + Bote). MDF = Bote / (Bote + Apuesta). Dos caras de la misma moneda matemática.',
    formula: {
      name: 'Alpha y MDF',
      expression: 'Alpha = Apuesta / (Apuesta + Bote) | MDF = Bote / (Bote + Apuesta)',
      explanation: 'Apuesta de 1/2 bote: Alpha = 33.3% de fold necesario. MDF = debes defender el 66.7% de tu rango.',
    },
    theoryInsights: [
      {
        title: 'Alpha (Break-Even Bluff)',
        content: 'Si apuestas $50 para ganar $100, arriesgas 50 para ganar 100. Break-even = 50 / 150 = 33.3%. Si el rival foldea 34% de las veces, ¡farolear imprime dinero!',
      },
      {
        title: 'MDF (Minimum Defense Frequency)',
        content: 'Es el porcentaje mínimo de tus manos que debes pagar o subir ante una apuesta rival para evitar que ellos ganen dinero faroleando con cualquier par de cartas.',
      },
    ],
    sandboxType: 'semi-bluff',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c16'),
  },

  // =========================================================================
  // SECCIÓN 5: CÁLCULOS AVANZADOS DE EV Y COMBINATORIA
  // =========================================================================
  {
    id: 'c17',
    order: 17,
    chapterNumber: 17,
    section: 'Sección 5: Cálculos Avanzados de EV y Combinatoria',
    sectionNumber: 5,
    title: 'Cálculos Avanzados de EV (Off-the-Table Analysis)',
    subtitle: 'Construye árboles de decisión para auditar tus manos fuera de las mesas',
    bookChapter: 'Capítulo 17',
    readingTime: '5 min',
    icon: 'TrendingUp',
    color: 'indigo',
    learningContext: {
      whyItMatters: 'En vivo no puedes dibujar árboles de decisión en papel. Este análisis se hace fuera de las mesas para entrenar tu cerebro, detectar fugas de dinero (leaks) y automatizar decisiones complejas.',
      tableDilemma: 'Anoche perdiste un bote de $500 haciendo call en el river. ¿Fue una jugada pésima o fue matemáticamente impecable a pesar de la derrota?',
      commonMistake: 'Repetir errores graves creyendo que fueron "bad beats" o cambiar una estrategia ganadora solo por haber tenido un resultado adverso.',
      tableSuperpower: 'Auditor matemático: desglosas cualquier mano grabada en un árbol de ramas ponderadas y descubres la verdad matemática sin autoengaños.',
    },
    keyTakeaway: 'Construye árboles de decisión comparando: EV(Fold) vs EV(Call) vs EV(Raise). Elige siempre la rama de mayor expectativa numérica.',
    formula: {
      name: 'Árbol de Decisión Ponderado',
      expression: 'EV_Nodo = ∑ (Probabilidad_Rama_i × Beneficio_Rama_i)',
      explanation: 'Suma de cada escenario posible multiplicado por su probabilidad condicional de ocurrencia.',
    },
    theoryInsights: [
      {
        title: 'El Valor del Trabajo Fuera de las Mesas',
        content: 'Los mejores jugadores pasan tantas horas analizando manos en su ordenador como jugando. Este entrenamiento crea intuición matemática instantánea.',
      },
      {
        title: 'Comparando Call vs Fold vs Raise',
        content: 'A veces hacer Call tiene un EV de +$10, pero hacer Raise tiene un EV de +$45. El árbol te enseña no solo a evitar errores, sino a maximizar la ganancia.',
      },
    ],
    sandboxType: 'ev-tree',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c17'),
  },

  {
    id: 'c18',
    order: 18,
    chapterNumber: 18,
    section: 'Sección 5: Cálculos Avanzados de EV y Combinatoria',
    sectionNumber: 5,
    title: 'Combinatoria y Bloqueadores (Card Removal Effect)',
    subtitle: 'Cuenta combinaciones de manos exactas y usa tus cartas como escudo',
    bookChapter: 'Capítulo 18',
    readingTime: '5 min',
    icon: 'Grid',
    color: 'purple',
    learningContext: {
      whyItMatters: 'Las cartas no son abstractas: hay un número finito de combinaciones físicas en la baraja (16 para manos no emparejadas, 6 para parejas). Tus cartas eliminan combinaciones del rival y cambian los porcentajes en el river.',
      tableDilemma: 'El rival va All-in en board con 3 picas simulando el color máximo. Tú tienes el A♠ en mano con una pareja modesta. ¿Pagar? ¡Sí! Es IMPOSIBLE que tenga el color de las nueces porque tú bloqueas el As.',
      commonMistake: 'Juzgar los rangos rivales por nombres de manos ("puede tener AK o QQ") en lugar de por combinaciones numéricas restantes.',
      tableSuperpower: 'Visión combinatoria profesional: cuentas combinaciones de manos en tiempo real y ejecutas Hero Calls y Faroles devastadores usando bloqueadores.',
    },
    keyTakeaway: 'Mano no emparejada = 16 combos (4 suited, 12 offsuit). Pareja = 6 combos. Bloquear 1 carta de una pareja reduce sus combos de 6 a 3 (50% menos).',
    formula: {
      name: 'Regla 16 / 6 y Reducción por Bloqueadores',
      expression: 'Unpaired: 4×4=16 combos | Pocket Pair: C(4,2)=6 combos | Con 1 Blocker: C(3,2)=3 combos',
      explanation: 'Tener una carta en tu mano o en la mesa reduce drásticamente las combinaciones posibles en el rango del oponente.',
    },
    theoryInsights: [
      {
        title: 'Los 1,326 Combos de Texas Hold\'em',
        content: 'La matriz completa de 13x13 contiene 78 combinaciones suited, 78 offsuit y 13 pocket pairs, sumando exactamente 1,326 manos iniciales.',
      },
      {
        title: 'El Poder del Nut Blocker',
        content: 'Tener el As de un palo de color en tu mano corta de raíz las combinaciones legítimas de valor del rival, convirtiendo sus apuestas en candidatos ideales para pagar con bluff-catchers.',
      },
    ],
    sandboxType: 'range-matrix',
    problems: PROBLEMS.filter((p) => p.moduleId === 'c18'),
  },
];
