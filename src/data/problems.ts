import type { Problem } from '../types/poker';

export const PROBLEMS: Problem[] = [
  // =========================================================================
  // SECCIÓN 1: INTRODUCCIÓN Y FUNDAMENTOS
  // =========================================================================

  // CAPÍTULO 1: La Importancia de las Matemáticas en el Poker
  {
    id: 'p1_1',
    moduleId: 'c1',
    title: 'La Ley de los Grandes Números vs "Mala Suerte"',
    conceptBadge: 'Varianza vs Matemática',
    difficulty: 'Principiante',
    scenario: 'Juegas una mano donde vas All-In con Pareja de Ases (82% favorito) y tu rival te paga con 72 offsuit (18%). Cae un 7 y un 2 en el board y pierdes. Tu rival te dice: "¡Ves, las matemáticas no sirven de nada en el poker!".',
    question: 'Desde la perspectiva matemática de Alton Hardin, ¿cuál es la interpretación correcta?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'El rival tiene razón en esa mano individual, pero a lo largo de 1,000 repeticiones idénticas ganarás el 82% y le quitarás todo su bankroll.', isCorrect: true, feedback: '¡Exacto! El poker es un juego de repetición a largo plazo. Una mano individual es puro ruido estadístico.' },
      { id: 'b', label: 'Fue un error ir All-in si había un 18% de probabilidad de perder.', isCorrect: false, feedback: '¡Para nada! Invertir dinero con 82% de ventaja es la jugada con mayor EV posible.' },
      { id: 'c', label: 'Debes cambiar de estrategia porque la mesa tiene mala racha.', isCorrect: false, feedback: 'La falacia del jugador: las cartas no tienen memoria ni rachas místicas.' },
      { id: 'd', label: 'La matemática solo funciona en torneos, no en cash games.', isCorrect: false, feedback: 'La probabilidad aplica exactamente igual en cualquier modalidad de poker.' },
    ],
    hint: 'Piensa en lanzar una moneda trucada que sale cara el 82% de las veces. ¿Qué pasará si la lanzas 500 veces?',
    explanation: {
      summary: 'La Ley de los Grandes Números garantiza que los resultados convergen a la expectativa matemática cuando la muestra crece.',
      steps: [
        'En una sola mano (muestra = 1), el 18% del rival ocurre casi 1 de cada 5 veces.',
        'En 100 manos, ganarás ~82 y perderás ~18.',
        'En 1,000 manos, la ventaja acumulada es devastadora e irreversible a tu favor.',
      ],
      ruleOfThumb: 'Nunca juzgues una decisión por el resultado de una sola mano. Juzga la decisión por su EV.',
    },
  },
  {
    id: 'p1_2',
    moduleId: 'c1',
    title: 'El "Jugador Intuitivo" vs El "Jugador Matemático"',
    conceptBadge: 'Mentalidad Ganadora',
    difficulty: 'Principiante',
    scenario: 'Un jugador en tu mesa dice que juega "por corazonadas y sintiendo la energía de la mesa", sin molestarse en calcular pot odds ni outs.',
    question: 'Según los datos empíricos del libro de Alton Hardin, ¿qué ocurre con estos jugadores a largo plazo?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'Pierden dinero consistentemente contra jugadores que dominan los números, ya que pagan botes demasiado caros y regalan cuota de equity.', isCorrect: true, feedback: '¡Correcto! Las corazonadas no pueden derrotar a las leyes de la probabilidad.' },
      { id: 'b', label: 'Ganan más dinero porque son impredecibles.', isCorrect: false, feedback: 'Ser impredecible cometiendo errores matemáticos solo acelera la pérdida de fichas.' },
      { id: 'c', label: 'Tienen los mismos resultados que un jugador matemático.', isCorrect: false, feedback: 'Los jugadores matemáticos tienen una tasa de victoria (winrate) mediblemente superior.' },
      { id: 'd', label: 'Solo pierden en mesas online.', isCorrect: false, feedback: 'Pierden tanto online como en vivo.' },
    ],
    hint: 'La intuición sin base matemática comete el error sistemático de pagar apuestas que no son rentables.',
    explanation: {
      summary: 'El poker moderno ha dejado atrás los "tells" místicos de las películas. Hoy en día es un juego dominado por la probabilidad.',
      steps: [
        'Los jugadores intuitivos pagan con proyectos sin calcular las Pot Odds necesarias.',
        'Pagan demasiado caro en situaciones deficitarias y apuestan poco en situaciones ganadoras.',
        'El jugador matemático extrae valor constante de esos errores.',
      ],
      ruleOfThumb: 'La matemática en el poker no garantiza ganar cada mano; garantiza ganar a largo plazo.',
    },
  },

  // CAPÍTULO 2: Conceptos Fundamentales: Posición, Botes y Estructura
  {
    id: 'p2_1',
    moduleId: 'c2',
    title: 'El Poder Matemático de la Posición',
    conceptBadge: 'Ventaja Posicional',
    difficulty: 'Principiante',
    scenario: 'Tienes la misma mano exacta (K♠ J♠) en dos situaciones: 1) En UTG (primer jugador en hablar) y 2) En el Botón (BTN, último en hablar post-flop).',
    question: '¿Por qué la matemática del poker demuestra que jugar en el Botón genera mucho más dinero que en UTG?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'Porque hablar el último te da información completa y gratuita sobre las decisiones de todos los rivales antes de que tengas que invertir un solo centavo.', isCorrect: true, feedback: '¡Exacto! La información es dinero en el poker. Actuar después reduce drásticamente la incertidumbre matemática.' },
      { id: 'b', label: 'Porque en el Botón te reparten mejores cartas.', isCorrect: false, feedback: 'Las cartas se reparten de manera aleatoria independientemente del asiento.' },
      { id: 'c', label: 'Porque pagas menos ciegas.', isCorrect: false, feedback: 'La ciega se paga en SB y BB, no en el Botón.' },
      { id: 'd', label: 'Porque el dealer tiene derecho a ver una carta más.', isCorrect: false, feedback: 'No existe tal regla en Texas Hold\'em.' },
    ],
    hint: 'Piensa en qué sabes tú cuando te toca hablar en el Botón que no sabías en UTG.',
    explanation: {
      summary: 'La posición es la mayor ventaja estructural del Texas Hold\'em.',
      steps: [
        'En UTG debes hablar sin saber si los otros 5 o 8 jugadores van a subir, resubir o foldear.',
        'En el Botón ya viste si pasaron, apostaron o foldean en cada una de las 4 calles (Preflop, Flop, Turn, River).',
        'Esto te permite controlar el tamaño del bote a tu conveniencia.',
      ],
      ruleOfThumb: 'En posición ganas más cuando aciertas y pierdes menos cuando fallas.',
    },
  },
  {
    id: 'p2_2',
    moduleId: 'c2',
    title: 'Stack-to-Pot Ratio (SPR) en el Flop',
    conceptBadge: 'SPR & Compromiso',
    difficulty: 'Intermedio',
    scenario: 'En un bote 3-beteado preflop, el bote en el Flop ya tiene $80 y ambos jugadores tienen un stack efectivo restante de $160.',
    question: '¿Cuál es el SPR (Stack-to-Pot Ratio) y qué implicación matemática tiene para tu decisión?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'SPR = 2.0 (SPR Bajo). Estás comprometido con el bote (committed) con cualquier Top Pair o Overpair fuerte para ir All-in.', isCorrect: true, feedback: '¡Brillante! SPR = $160 / $80 = 2.0. Con un SPR tan bajo, la relación riesgo/recompensa favorece empujar todo el stack con manos buenas.' },
      { id: 'b', label: 'SPR = 0.5. Debes foldear de inmediato.', isCorrect: false, feedback: 'SPR es Stack / Pot = 160 / 80 = 2.0.' },
      { id: 'c', label: 'SPR = 8.0 (SPR Alto). Solo juegas por set-mining.', isCorrect: false, feedback: 'El cálculo es 160 / 80 = 2.' },
      { id: 'd', label: 'El SPR solo importa en torneos.', isCorrect: false, feedback: 'El SPR es vital tanto en cash games como en torneos.' },
    ],
    hint: 'Divide el stack efectivo ($160) entre el bote en el Flop ($80).',
    explanation: {
      summary: 'El SPR define el nivel de compromiso y riesgo de tu mano post-flop.',
      steps: [
        'Fórmula: SPR = Stack Efectivo / Bote en el Flop = 160 / 80 = 2.0.',
        'SPR < 3 se clasifica como SPR bajo.',
        'Con SPR bajo, una pareja superior (como TPTK u Overpair) tiene suficiente equity para jugar por todo el stack.',
      ],
      ruleOfThumb: 'SPR bajo (<3) = comprométete rápido. SPR alto (>10) = juega con cautela botes grandes.',
    },
  },

  // CAPÍTULO 3: Tipos de Jugadores Básicos y sus Tendencias Matemáticas
  {
    id: 'p3_1',
    moduleId: 'c3',
    title: 'La Regla Sagrada contra una Calling Station',
    conceptBadge: 'Explotación de Tipos',
    difficulty: 'Principiante',
    scenario: 'Tienes un rival identificado como Calling Station (Loose-Passive). Llega el River y tienes cartas sin ligar (0% de equity). El bote tiene $100.',
    question: '¿Cuál es el ajuste matemático obligatorio según Alton Hardin?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: '¡CERO FAROLES! Pasa o ríndete. Una Calling Station nunca foldea parejas medias/bajas, haciendo que tu Fold Equity sea casi 0%.', isCorrect: true, feedback: '¡Exacto! El farol depende de que el rival foldee. Si el rival nunca foldea, farolear es literalmente tirar dinero al fuego.' },
      { id: 'b', label: 'Hacer una apuesta gigante para asustarlo.', isCorrect: false, feedback: 'Las Calling Stations no se asustan; pagan apuestas gigantes con terceras parejas.' },
      { id: 'c', label: 'Apostar pequeño (1/4 bote).', isCorrect: false, feedback: 'Pagará con aún más facilidad.' },
      { id: 'd', label: 'Mostrar una carta para intimidarlo.', isCorrect: false, feedback: 'No tiene sentido estratégico.' },
    ],
    hint: 'Recuerda: Un farol necesita Fold Equity. ¿Tiene una Calling Station frecuencia de fold?',
    explanation: {
      summary: 'Contra jugadores pasivos y sueltos, la matemática del farol se desmorona porque su Fold% es cercano a 0.',
      steps: [
        'Fórmula de EV del Farol: EV = (Fold% × Bote) - (Call% × Apuesta).',
        'Si Fold% ≈ 0%, la ecuación se convierte en: EV = 0 - (100% × Apuesta) = Pérdida directa.',
        'La única forma de ganarles dinero es apostar fuerte POR VALOR cuando tienes buenas cartas.',
      ],
      ruleOfThumb: 'Regla de Oro: Nunca intentes farolear a una Calling Station.',
    },
  },
  {
    id: 'p3_2',
    moduleId: 'c3',
    title: 'Explotando a una "Roca" (Nit / Tight-Passive)',
    conceptBadge: 'Explotación de Nits',
    difficulty: 'Intermedio',
    scenario: 'Enfrentas a un jugador de tipo "Roca" (solo juega el 9% de manos). Abres en el Botón, él paga en la Ciega Grande. El Flop es 7♠ 3♦ 2♣. Pasa hacia ti.',
    question: '¿Qué jugada matemática tiene un EV desproporcionadamente alto?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'Hacer una apuesta de continuación (C-bet) pequeña, ya que su rango habrá fallado el board y foldeará más del 70% de las veces.', isCorrect: true, feedback: '¡Brillante! Una Roca no continúa si no conecta mano monstruosa. Su altísima frecuencia de fold hace que apostar sea automáticamente rentable.' },
      { id: 'b', label: 'Pasar porque la Roca siempre tiene monstruos.', isCorrect: false, feedback: 'Preflop pagó desde la ciega; la probabilidad de conectar en un flop 7-3-2 es bajísima.' },
      { id: 'c', label: 'Ir All-in directamente.', isCorrect: false, feedback: 'Arriesgarías demasiado para ganar un bote pequeño innecesariamente.' },
      { id: 'd', label: 'Pedir cambio de mesa.', isCorrect: false, feedback: 'Las Rocas son las víctimas favoritas de los robos de ciegas.' },
    ],
    hint: '¿Cuántas veces conecta un flop 7-3-2 un rango tight lleno de Ases y Reyes altos?',
    explanation: {
      summary: 'Los jugadores Nit foldean en exceso cada vez que no tienen una mano hecha fuerte.',
      steps: [
        'En un flop seco como 7-3-2, un rango tight no conecta nada el 65-75% de las veces.',
        'Una apuesta de 1/3 de bote solo necesita un 25% de folds para ser rentable.',
        'Como la Roca foldea ~70%, tu beneficio esperado es masivo.',
      ],
      ruleOfThumb: 'Róbale botes pequeños a las Rocas sin parar; pero si ellos te resuben fuerte, cree en sus monstruos y foldea.',
    },
  },

  // =========================================================================
  // SECCIÓN 2: MATEMÁTICAS FUNDAMENTALES
  // =========================================================================

  // CAPÍTULO 4: Probabilidades y Odds Básicas
  {
    id: 'p4_1',
    moduleId: 'c4',
    title: 'Conversión Instantánea: De Ratio a Porcentaje',
    conceptBadge: 'Odds Básicas',
    difficulty: 'Principiante',
    scenario: 'Tienes un proyecto y tus odds en contra son de 3 a 1 (3 : 1).',
    question: '¿A qué porcentaje exacto de probabilidad equivale un ratio de 3 a 1?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: '25.0%', isCorrect: true, feedback: '¡Correcto! 3 a 1 significa que pierdes 3 veces y ganas 1 vez de un total de 4 escenarios (1 / 4 = 25%).' },
      { id: 'b', label: '33.3%', isCorrect: false, feedback: '33.3% sería un ratio de 2 a 1 (1 / 3).' },
      { id: 'c', label: '30.0%', isCorrect: false, feedback: 'Cálculo inexacto.' },
      { id: 'd', label: '20.0%', isCorrect: false, feedback: '20.0% corresponde a 4 a 1 (1 / 5).' },
    ],
    hint: 'Suma los dos números del ratio (3 + 1 = 4) y divide 1 entre 4.',
    explanation: {
      summary: 'La fórmula fundamental de Alton Hardin para convertir ratios de odds en contra a porcentaje es: 1 / (Odds + 1).',
      steps: [
        'Ratio: 3 a 1 en contra.',
        'Eventos totales = 3 (fallos) + 1 (acierto) = 4 eventos.',
        'Probabilidad = 1 / 4 = 0.25 = 25%.',
      ],
      ruleOfThumb: 'Memoriza los 4 pilares: 4:1 = 20%, 3:1 = 25%, 2:1 = 33%, 1:1 = 50%.',
    },
  },
  {
    id: 'p4_2',
    moduleId: 'c4',
    title: 'La Probabilidad de Fallar vs Acertar',
    conceptBadge: 'Probabilidad Complementaria',
    difficulty: 'Principiante',
    scenario: 'Tienes una mano con un 35% de probabilidad de ganar en el River.',
    question: '¿Cuál es la probabilidad matemática de que NO ganes la mano (pierdas)?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: '65%', isCorrect: true, feedback: '¡Exacto! P(perder) = 100% - P(ganar) = 100% - 35% = 65%.' },
      { id: 'b', label: '35%', isCorrect: false, feedback: 'Esa es la probabilidad de ganar.' },
      { id: 'c', label: '50%', isCorrect: false, feedback: 'No es un coin flip simétrico.' },
      { id: 'd', label: '70%', isCorrect: false, feedback: 'Revisa la resta 100 - 35.' },
    ],
    hint: 'La suma de todos los resultados posibles en probabilidad siempre es igual al 100%.',
    explanation: {
      summary: 'En poker, cada decisión tiene dos caras: lo que ocurre cuando aciertas y lo que ocurre cuando fallas.',
      steps: [
        'Probabilidad total = 100%.',
        'Probabilidad de ganar = 35%.',
        'Probabilidad de perder = 100% - 35% = 65%.',
      ],
      ruleOfThumb: 'Siempre debes calcular el porcentaje complementario para ponderar las pérdidas en el cálculo de EV.',
    },
  },

  // CAPÍTULO 5: Entendiendo la Equity
  {
    id: 'p5_1',
    moduleId: 'c5',
    title: '¿Qué es Realmente la Card Equity?',
    conceptBadge: 'Concepto de Equity',
    difficulty: 'Principiante',
    scenario: 'Estás en el Turn jugando por un bote de $200. Tu mano tiene exactamente un 30% de probabilidad de ganar en el River.',
    question: '¿A cuántos dólares equivale tu "Equity en el bote" en este momento?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'Exactamente $60.00 de los $200 del bote.', isCorrect: true, feedback: '¡Brillante! Equity = Porcentaje de Victoria × Tamaño del Bote = 30% de $200 = $60.' },
      { id: 'b', label: '$140.00.', isCorrect: false, feedback: 'Esa es la cuota del rival (70% de $200).' },
      { id: 'c', label: '$30.00.', isCorrect: false, feedback: 'Confundiste el 30% con $30.' },
      { id: 'd', label: '$0 hasta que caiga el river.', isCorrect: false, feedback: 'En términos de valor esperado, tu cuota ya tiene un valor monetario real en este instante.' },
    ],
    hint: 'Multiplica el porcentaje (0.30) por el dinero total que hay en la mesa ($200).',
    explanation: {
      summary: 'La Equity es tu participación matemática en el bote antes de que concluya la mano.',
      steps: [
        'Bote total = $200.',
        'Tu probabilidad de victoria = 30% = 0.30.',
        'Tu Equity monetaria = 0.30 × $200 = $60.00.',
        'La del rival es 0.70 × $200 = $140.00.',
      ],
      ruleOfThumb: 'Trata tu Equity como dinero en efectivo que te pertenece estadísticamente.',
    },
  },
  {
    id: 'p5_2',
    moduleId: 'c5',
    title: 'Coin Flip Preflop: Pareja vs Overcards',
    conceptBadge: 'Showdown Equity',
    difficulty: 'Intermedio',
    scenario: 'Vas All-In preflop con J♠ J♦ contra A♥ K♥.',
    heroCards: [{ rank: 'J', suit: 'spades' }, { rank: 'J', suit: 'diamonds' }],
    villainCards: [{ rank: 'A', suit: 'hearts' }, { rank: 'K', suit: 'hearts' }],
    question: '¿Por qué la pareja hecha tiene una ligera ventaja sobre dos overcards del mismo palo?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'Porque la pareja ya está formada antes del flop y ganará automáticamente si el rival no conecta un As o un Rey en el board (~54% vs 46%).', isCorrect: true, feedback: '¡Correcto! AKs necesita mejorar en el board; JJ ya tiene mano hecha de inicio.' },
      { id: 'b', label: 'Porque las cartas negras tienen mayor probabilidad que las rojas.', isCorrect: false, feedback: 'Los palos no tienen jerarquía ni ventaja de probabilidad.' },
      { id: 'c', label: 'Porque los Ases no pueden ligar escaleras bajas.', isCorrect: false, feedback: 'El As puede formar la escalera de rueda A-2-3-4-5.' },
      { id: 'd', label: 'Porque la pareja tiene un 75% de equity.', isCorrect: false, feedback: 'Demasiado alto; ronda el 54%.' },
    ],
    hint: 'AKs necesita ligar en el board para superar la pareja de Jotas.',
    explanation: {
      summary: 'En los coin flips preflop, la mano que ya está hecha retiene una pequeña ventaja matemática.',
      steps: [
        'Jotas en mano: ~54% de equity.',
        'As-Rey del mismo palo: ~46% de equity.',
        'Aunque se llama "moneda al aire", las parejas siempre tienen el favoritismo inicial.',
      ],
      ruleOfThumb: 'Pareja en mano vs 2 Overcards suited = 54% vs 46%.',
    },
  },

  // CAPÍTULO 6: Pot Odds Directas
  {
    id: 'p6_1',
    moduleId: 'c6',
    title: 'El Cálculo Universal de Pot Odds',
    conceptBadge: 'Pot Odds',
    difficulty: 'Principiante',
    scenario: 'Hay $60 en el bote. Tu oponente apuesta $30 (medio bote). Te cuesta $30 pagar.',
    potSize: 90,
    betToCall: 30,
    question: '¿Cuál es el cálculo exacto de tus Pot Odds?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: '$30 / ($60 bote previo + $30 apuesta + $30 tu call) = $30 / $120 = 25.0%.', isCorrect: true, feedback: '¡Perfecto! Divides lo que pagas entre el bote final que se formará tras tu pago.' },
      { id: 'b', label: '$30 / $60 = 50.0%.', isCorrect: false, feedback: '¡Error clásico! Olvidaste sumar la apuesta del rival y tu propio call en el denominador.' },
      { id: 'c', label: '$30 / $90 = 33.3%.', isCorrect: false, feedback: 'Olvidaste sumar tu propio call.' },
      { id: 'd', label: '10.0%.', isCorrect: false, feedback: 'Cálculo erróneo.' },
    ],
    hint: 'Fórmula: Tu Call / (Bote antes de la apuesta + Apuesta rival + Tu Call).',
    explanation: {
      summary: 'Las Pot Odds representan el porcentaje de victorias que necesitas para no perder dinero al pagar.',
      steps: [
        'Tu inversión = $30.',
        'Bote total que disputarás = $60 + $30 + $30 = $120.',
        'Pot Odds = 30 / 120 = 1/4 = 25%.',
        'Ratio: Tienes que poner $30 para ganar $90 -> 90 a 30 = 3 a 1.',
      ],
      ruleOfThumb: 'Apuesta de 1/2 bote siempre requiere exactamente 25% de victoria.',
    },
  },
  {
    id: 'p6_2',
    moduleId: 'c6',
    title: 'Enfrentando una Apuesta de Bote Completo',
    conceptBadge: 'Pot Odds Bote Entero',
    difficulty: 'Intermedio',
    scenario: 'En el River, hay $100 en el bote. Tu rival apuesta $100 (el bote completo).',
    potSize: 200,
    betToCall: 100,
    question: '¿Qué porcentaje de victorias necesitas en el showdown para que un Hero Call sea matemáticamente neutro?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: '33.3% (2 a 1 en contra)', isCorrect: true, feedback: '¡Exacto! Debes pagar $100 para un bote total de $300 ($100 + $100 + $100). 100 / 300 = 33.3%.' },
      { id: 'b', label: '50.0%', isCorrect: false, feedback: 'Pagar una apuesta igual al bote no requiere 50%; requiere 33.3%.' },
      { id: 'c', label: '25.0%', isCorrect: false, feedback: '25% es para medio bote.' },
      { id: 'd', label: '40.0%', isCorrect: false, feedback: 'Cálculo inexacto.' },
    ],
    hint: 'Divides $100 entre el total de $300.',
    explanation: {
      summary: 'Frente a una apuesta del tamaño del bote, necesitas ganar 1 de cada 3 veces.',
      steps: [
        'Call = $100.',
        'Bote resultante = $100 + $100 + $100 = $300.',
        'Pot Odds = 100 / 300 = 33.3%.',
        'Si crees que el rival farolea más del 33.3% de las veces, ¡pagar es +EV!',
      ],
      ruleOfThumb: 'Apuesta de 1 bote = necesitas 33.3% de equity.',
    },
  },

  // CAPÍTULO 7: Implied Odds & Reverse Implied Odds
  {
    id: 'p7_1',
    moduleId: 'c7',
    title: 'Compensando el Déficit con Dinero Futuro',
    conceptBadge: 'Implied Odds',
    difficulty: 'Intermedio',
    scenario: 'En el Turn tienes 18% de equity con proyecto de color. Te cobran $50 en un bote que quedará en $150 (te exigen 33% de Pot Odds directas). El pago directo es -EV.',
    potSize: 150,
    betToCall: 50,
    question: 'Si decides pagar por "Odds Implícitas", ¿qué condición matemática OBLIGATORIA debe cumplirse?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'El rival debe tener suficiente dinero restante en su stack y una tendencia a pagarte apuestas en el River cuando completes tu color.', isCorrect: true, feedback: '¡Brillante! Las odds implícitas son una promesa de pago futuro. Si el rival no tiene fichas o foldea ante cualquier carta de color, las odds implícitas valen cero.' },
      { id: 'b', label: 'Que el rival tenga un As en su mano.', isCorrect: false, feedback: 'No necesitas que tenga un As.' },
      { id: 'c', label: 'Que pagues de forma rápida para intimidar.', isCorrect: false, feedback: 'La velocidad de pago no altera las matemáticas de stack.' },
      { id: 'd', label: 'Que vayas All-in ahora mismo.', isCorrect: false, feedback: 'Eso sería un semi-farol, no un call por odds implícitas.' },
    ],
    hint: '¿De dónde saldrá el dinero extra si el rival está "all-in" o no tiene más fichas?',
    explanation: {
      summary: 'Las odds implícitas requieren profundidad de stack y un rival dispuesto a pagar.',
      steps: [
        'Déficit inmediato: Tienes 18% pero el bote te pide 33%.',
        'Para compensar el 15% que te falta, debes extraer fichas extra en el River.',
        'Si el rival tiene menos stack que el dinero necesario, el call es un error matemático fatal.',
      ],
      ruleOfThumb: 'Sin fichas detrás del rival, NO existen las Odds Implícitas.',
    },
  },
  {
    id: 'p7_2',
    moduleId: 'c7',
    title: 'La Pesadilla de las Reverse Implied Odds',
    conceptBadge: 'Reverse Implied',
    difficulty: 'Avanzado',
    scenario: 'Tienes 6♥ 7♥ en board K♥ Q♥ 2♣. Tienes proyecto de color bajo. Un jugador ultra agresivo apuesta fuerte y otro jugador muy conservador resube.',
    heroCards: [{ rank: '7', suit: 'hearts' }, { rank: '6', suit: 'hearts' }],
    board: [{ rank: 'K', suit: 'hearts' }, { rank: 'Q', suit: 'hearts' }, { rank: '2', suit: 'clubs' }],
    question: '¿Por qué Alton Hardin advierte que este es un spot con "Reverse Implied Odds" mortales?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'Porque si cae un corazón en el turn/river, es muy probable que uno de los rivales tenga A♥ x o J♥ T♥ con un color superior, costándote tu stack entero.', isCorrect: true, feedback: '¡Exacto! Completar tu mano no garantiza ganar; al contrario, te invita a pagar apuestas masivas con la segunda mejor mano.' },
      { id: 'b', label: 'Porque solo quedan 4 cartas de corazón en la baraja.', isCorrect: false, feedback: 'Siguen quedando las mismas cartas del palo sin ver.' },
      { id: 'c', label: 'Porque el bote se dividirá en partes iguales.', isCorrect: false, feedback: 'No hay razón para chop pot aquí.' },
      { id: 'd', label: 'Porque las cartas consecutivas pagan más rake.', isCorrect: false, feedback: 'El rake no tiene relación con esto.' },
    ],
    hint: '¿Qué pasa si caes en la trampa de color al 7 contra color al As?',
    explanation: {
      summary: 'Reverse Implied Odds es el riesgo de ganar una mano dominada y perder un bote catastrófico.',
      steps: [
        'Con proyectos bajos en mesas con mucha acción, tus outs pueden estar dominadas.',
        'Si completas el color bajo, no podrás foldear fácilmente y perderás el máximo posible.',
        'Por eso, busca proyectos a las cartas más altas posibles (Nut Draws).',
      ],
      ruleOfThumb: 'Proyectos no-nutted en botes multi-way sufren de Reverse Implied Odds. ¡Juégalos con extrema cautela!',
    },
  },

  // CAPÍTULO 8: Proyectos Comunes y Conteo de Outs
  {
    id: 'p8_1',
    moduleId: 'c8',
    title: 'Catálogo de Outs Comunes',
    conceptBadge: 'Conteo de Outs',
    difficulty: 'Principiante',
    scenario: 'En el Flop tienes un Gutshot Straight Draw (escalera interna, ej: tienes 9-8 en board Q-J-2; necesitas un 10 para completar la escalera).',
    question: '¿Cuántas outs tienes en la baraja para conectar tu escalera?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: '4 Outs (los cuatro Dieces de la baraja)', isCorrect: true, feedback: '¡Correcto! Solo hay 4 Dieces en la baraja de 52 cartas.' },
      { id: 'b', label: '8 Outs', isCorrect: false, feedback: '8 outs es para una escalera abierta por ambos extremos (OESD).' },
      { id: 'c', label: '9 Outs', isCorrect: false, feedback: '9 outs es para un proyecto de color.' },
      { id: 'd', label: '2 Outs', isCorrect: false, feedback: '2 outs es para conectar trío con una pareja en mano.' },
    ],
    hint: 'Solo una carta de rango específico (el 10) completa tu jugada.',
    explanation: {
      summary: 'Conocer las outs estándar de memoria es imprescindible.',
      steps: [
        'Gutshot (escalera interna): 4 outs.',
        'Overcards (2 cartas mayores): 6 outs.',
        'Escalera abierta (OESD): 8 outs.',
        'Color (Flush draw): 9 outs.',
        'Monstruo (Color + Escalera): 15 outs.',
      ],
      ruleOfThumb: 'Un gutshot solo tiene 4 cartas salvadoras en toda la baraja.',
    },
  },
  {
    id: 'p8_2',
    moduleId: 'c8',
    title: 'Descontando "Dirty Outs" en la Práctica',
    conceptBadge: 'Dirty Outs',
    difficulty: 'Intermedio',
    scenario: 'Tienes T♠ 9♠. El board en el Flop es 8♦ 7♦ 2♣. Tienes escalera abierta (ocho cartas: cuatro Jack y cuatro 6). Pero en la mesa hay 2 diamantes y el rival es muy agresivo.',
    heroCards: [{ rank: 'T', suit: 'spades' }, { rank: '9', suit: 'spades' }],
    board: [{ rank: '8', suit: 'diamonds' }, { rank: '7', suit: 'diamonds' }, { rank: '2', suit: 'clubs' }],
    question: '¿Cómo debes descontar tus outs para no sobrestimar tu probabilidad?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'Descontar el J♦ y el 6♦ (2 outs sucias de diamante) que darían color al rival, quedándote con 6 outs limpias seguras.', isCorrect: true, feedback: '¡Excelente! Si cae el J♦ o el 6♦, tu escalera perderá ante cualquier color de diamantes.' },
      { id: 'b', label: 'Contar las 8 outs completas porque la escalera es mano fuerte.', isCorrect: false, feedback: 'El color vence a la escalera. Esas 2 cartas te arruinarán.' },
      { id: 'c', label: 'Descontar todas las outs y rendirte.', isCorrect: false, feedback: 'Aún te quedan 6 outs limpias excelentes.' },
      { id: 'd', label: 'Sumar 4 outs más por el 2.', isCorrect: false, feedback: 'Un 2 no te ayuda a ganar.' },
    ],
    hint: 'Resta las cartas que completan tu escalera pero que también son del palo de diamante.',
    explanation: {
      summary: 'Las "Dirty Outs" (outs sucias) son aquellas que mejoran tu mano pero mejoran aún más la mano del rival.',
      steps: [
        'Outs nominales: 4 Jacks + 4 Seises = 8 outs.',
        'Outs de diamante: J♦ y 6♦ completan un posible color para el rival.',
        'Outs limpias = 8 - 2 = 6 outs limpias.',
      ],
      ruleOfThumb: 'Siempre descuenta las cartas comunitarias que completan proyectos superiores para el rival.',
    },
  },

  // CAPÍTULO 9: La Regla del 2 y 4 (El Atajo de Hardin)
  {
    id: 'p9_1',
    moduleId: 'c9',
    title: 'La Regla del 2: Turn a River',
    conceptBadge: 'Regla del 2',
    difficulty: 'Principiante',
    scenario: 'En el Turn tienes un proyecto de color a las nueces (9 outs). Solo queda una carta por repartir (el River).',
    question: 'Aplicando la Regla del 2, ¿cuál es tu porcentaje estimado de conectar el color en el River?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: '18% (9 outs × 2 = 18%)', isCorrect: true, feedback: '¡Correcto! En el Turn multiplicas tus outs por 2. (El valor exacto es 9 / 46 = 19.5%, ¡la regla del 2 es asombrosamente precisa!).' },
      { id: 'b', label: '36%', isCorrect: false, feedback: '36% sería con 2 cartas por ver (Regla del 4).' },
      { id: 'c', label: '9%', isCorrect: false, feedback: 'Olvidaste multiplicar por 2.' },
      { id: 'd', label: '27%', isCorrect: false, feedback: 'Cálculo erróneo.' },
    ],
    hint: 'Para 1 carta por ver: Outs × 2.',
    explanation: {
      summary: 'La Regla del 2 se utiliza cuando solo queda una calle por repartir.',
      steps: [
        'Outs = 9.',
        'Multiplicador (1 carta por ver) = 2.',
        'Estimación = 9 × 2 = 18%.',
      ],
      ruleOfThumb: 'Una carta por ver = Outs × 2. Dos segundos de cálculo mental en la mesa.',
    },
  },
  {
    id: 'p9_2',
    moduleId: 'c9',
    title: 'El Ajuste de Alton Hardin para >8 Outs en el Flop',
    conceptBadge: 'Ajuste de Hardin',
    difficulty: 'Intermedio',
    scenario: 'Vas All-In en el Flop con un Combo Draw de 12 outs (Escalera abierta + Overcards).',
    question: 'Si aplicas la regla clásica sin ajustar (12 × 4 = 48%), sobrestimas tu probabilidad. ¿Cuál es el cálculo con el ajuste de Alton Hardin: (Outs × 4) - (Outs - 8)?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: '44% (48 - 4 = 44%)', isCorrect: true, feedback: '¡Brillante! (12 × 4) - (12 - 8) = 48 - 4 = 44%. ¡La probabilidad matemática exacta es 45.0%!' },
      { id: 'b', label: '48%', isCorrect: false, feedback: '48% es la regla clásica sin el ajuste de Hardin.' },
      { id: 'c', label: '38%', isCorrect: false, feedback: 'Demasiado bajo.' },
      { id: 'd', label: '50%', isCorrect: false, feedback: 'Cálculo inexacto.' },
    ],
    hint: 'Paso 1: 12 × 4 = 48. Paso 2: Resta (12 - 8 = 4). 48 - 4 = ?',
    explanation: {
      summary: 'La fórmula clásica (Outs × 4) pierde precisión por encima de 8 outs debido a que no puedes ganar dos veces con dos outs simultáneas.',
      steps: [
        'Paso 1: 12 outs × 4 = 48%.',
        'Paso 2: Exceso de outs sobre 8: 12 - 8 = 4.',
        'Paso 3: Resta: 48% - 4% = 44%.',
        'Exacto: 45.0%. ¡El ajuste de Hardin es prácticamente perfecto!',
      ],
      ruleOfThumb: 'En All-in Flop con más de 8 outs: (Outs × 4) - (Outs - 8).',
    },
  },

  // CAPÍTULO 10: Introducción al Valor Esperado (EV)
  {
    id: 'p10_1',
    moduleId: 'c10',
    title: 'El Concepto Sagrado del Valor Esperado (EV)',
    conceptBadge: 'Concepto de EV',
    difficulty: 'Principiante',
    scenario: 'Tienes una decisión donde el 50% de las veces ganas $200 y el 50% de las veces pierdes $100.',
    question: '¿Cuál es el Valor Esperado (EV) por jugada?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: '+$50.00 (+EV)', isCorrect: true, feedback: '¡Correcto! EV = (0.50 × $200) - (0.50 × $100) = $100 - $50 = +$50.00.' },
      { id: 'b', label: '$0.00 (Neutro)', isCorrect: false, feedback: 'Ganas el doble de lo que pierdes con la misma frecuencia.' },
      { id: 'c', label: '+$100.00', isCorrect: false, feedback: 'No olvidemos restar el escenario de pérdida.' },
      { id: 'd', label: '-$50.00', isCorrect: false, feedback: 'Es una jugada ampliamente ganadora.' },
    ],
    hint: 'Pondera la ganancia ($200 × 0.5) y réstale la pérdida ($100 × 0.5).',
    explanation: {
      summary: 'El EV te dice cuánto dinero ganas en promedio cada vez que tomas una decisión.',
      steps: [
        'Escenario A (Ganas): 50% × $200 = +$100.',
        'Escenario B (Pierdes): 50% × $100 = -$50.',
        'EV Neto = +$100 - $50 = +$50.00 por repetición.',
      ],
      ruleOfThumb: 'Todo el juego del poker profesional consiste en buscar jugadas con EV positivo (+EV).',
    },
  },
  {
    id: 'p10_2',
    moduleId: 'c10',
    title: 'Por Qué el Fold Siempre Tiene EV = $0',
    conceptBadge: 'EV de Fold',
    difficulty: 'Principiante',
    scenario: 'Pusiste $50 en el preflop y flop. En el turn el rival te va All-in. Si foldeas, ¿cuál es el EV de tu acción de Fold?',
    question: '¿Cuánto dinero pierdes o ganas en términos de EV al pulsar Fold?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'Exactamente $0.00. El dinero previo ya está en el bote ("coste hundido"); retirarte nunca te cuesta dinero nuevo adicional.', isCorrect: true, feedback: '¡Exacto! El dinero en el bote ya no es tuyo. Tu decisión actual parte desde cero.' },
      { id: 'b', label: '-$50.00 (lo que pusiste antes).', isCorrect: false, feedback: '¡Falacia del coste hundido! Ese dinero ya estaba perdido sin importar si foldeas o pagas.' },
      { id: 'c', label: '-$100.00.', isCorrect: false, feedback: 'Incorrecto.' },
      { id: 'd', label: 'Depende de tus cartas.', isCorrect: false, feedback: 'El EV de Fold siempre es una constante matemática de $0.00.' },
    ],
    hint: 'Retirarte no saca dinero nuevo de tu billetera.',
    explanation: {
      summary: 'El EV de la opción FOLD se define unánimemente como $0.00 en la teoría de juegos del poker.',
      steps: [
        'Cualquier dinero invertido previamente es "dinero muerto en el bote".',
        'Si hacer Call tiene un EV de -$5.00, y hacer Fold tiene un EV de $0.00, foldear es superior porque $0 > -$5.',
      ],
      ruleOfThumb: 'Jamás pagues "porque ya puse mucho dinero en el bote". Fold = $0.',
    },
  },

  // CAPÍTULO 11: ¿Podemos Pagar? (El Proceso de Decisión Completo)
  {
    id: 'p11_1',
    moduleId: 'c11',
    title: 'El Proceso de Decisión de 5 Pasos de Alton Hardin',
    conceptBadge: 'Can We Call?',
    difficulty: 'Intermedio',
    scenario: 'En el Turn tienes un proyecto de color de 9 outs (~18% equity). El bote tiene $100 y el oponente apuesta $50 (te pide 25% de Pot Odds). El rival solo tiene $10 en su stack detrás.',
    potSize: 150,
    betToCall: 50,
    villainStack: 10,
    question: 'Siguiendo el algoritmo de decisión de Alton Hardin, ¿cuál es la decisión correcta?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'FOLDEAR. No tienes Pot Odds directas (18% < 25%) y el rival no tiene stack detrás ($10) para ofrecerte Implied Odds suficientes.', isCorrect: true, feedback: '¡Brillante! El proceso de 5 pasos descarta el call directo y descarta las odds implícitas. ¡Fold claro!' },
      { id: 'b', label: 'PAGAR. Porque 9 outs son muchas cartas para tirar.', isCorrect: false, feedback: '9 outs a una carta solo ganan el 18% de las veces. Pagar $50 para ganar $10 extra en un bote que pide 25% es una sangría de fichas.' },
      { id: 'c', label: 'Resubir All-in de farol contra sus $10.', isCorrect: false, feedback: 'Por $10 pagará con cualquier carta.' },
      { id: 'd', label: 'Lanzar una moneda.', isCorrect: false, feedback: 'La matemática te dio una respuesta inequívoca.' },
    ],
    hint: 'Verifica: 1) ¿Equity >= Pot Odds? No. 2) ¿Hay stack rival suficiente para compensar? No ($10 es nada).',
    explanation: {
      summary: 'El algoritmo de decisión de Alton Hardin evita que los jugadores paguen con proyectos sin justificación matemática.',
      steps: [
        'Paso 1: 9 outs limpias.',
        'Paso 2: Equity = 9 × 2 = 18%.',
        'Paso 3: Pot Odds = $50 / $200 = 25%.',
        'Paso 4: 18% < 25% -> Falla el test directo.',
        'Paso 5: Necesitas $42 extra en el river, pero el rival solo tiene $10 -> Falla el test implícito. ¡FOLD!',
      ],
      ruleOfThumb: 'Si fallan las Pot Odds directas Y fallan las Implied Odds, ¡el único camino es FOLD!',
    },
  },

  // =========================================================================
  // SECCIÓN 3: MATEMÁTICAS PRE-FLOP
  // =========================================================================

  // CAPÍTULO 12: Situaciones All-In Pre-Flop
  {
    id: 'p12_1',
    moduleId: 'c12',
    title: 'Dominación Extrema: AK vs AQ Pre-Flop',
    conceptBadge: 'Preflop Dominance',
    difficulty: 'Intermedio',
    scenario: 'Vas All-In preflop en un torneo con As-Rey (A♠ K♠). Tu rival paga con As-Dama (A♦ Q♦).',
    heroCards: [{ rank: 'A', suit: 'spades' }, { rank: 'K', suit: 'spades' }],
    villainCards: [{ rank: 'A', suit: 'diamonds' }, { rank: 'Q', suit: 'diamonds' }],
    question: 'Aproximadamente, ¿cuál es tu Equity cuando dominas al rival con un kicker superior?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'Aproximadamente 74% vs 26% a tu favor.', isCorrect: true, feedback: '¡Correcto! El rival está "dominado": ambos comparten el As, pero tu Rey mata a su Dama. El rival solo tiene 3 Damas para salvarse.' },
      { id: 'b', label: '50% vs 50% (ambos tienen As).', isCorrect: false, feedback: 'El kicker K vs Q marca una diferencia brutal.' },
      { id: 'c', label: '90% vs 10%.', isCorrect: false, feedback: 'Demasiado alto; la Dama aún puede ligar pareja en el board.' },
      { id: 'd', label: '60% vs 40%.', isCorrect: false, feedback: 'La dominación de kicker es mucho más severa que un simple 60-40.' },
    ],
    hint: 'El rival solo tiene 3 Damas vivas en toda la baraja de 52 cartas.',
    explanation: {
      summary: 'Tener una mano dominada es uno de los peores desastres matemáticos en poker preflop.',
      steps: [
        'Ambos jugadores tienen un As.',
        'Tu rival solo gana si conecta una de las 3 Damas restantes o hace escalera/color milagroso.',
        'Tu Equity ronda el ~74% de victoria sostenida.',
      ],
      ruleOfThumb: 'Dominar el kicker del rival te da una ventaja matemática de ~74% a ~26% (casi 3 a 1).',
    },
  },

  // CAPÍTULO 13: Set-Mining, Robo de Ciegas y 3-Bet Bluffs
  {
    id: 'p13_1',
    moduleId: 'c13',
    title: 'La Regla del 20x en la Práctica',
    conceptBadge: 'Set-Mining',
    difficulty: 'Principiante',
    scenario: 'Tienes 4♠ 4♦ en el Botón. Un jugador sólido abre a $8. Tú tienes $200 de stack y el rival tiene $70.',
    heroCards: [{ rank: '4', suit: 'spades' }, { rank: '4', suit: 'diamonds' }],
    question: '¿Cuál es el stack efectivo y es rentable pagar para set-mining?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'El stack efectivo es $70 (el menor de los dos). 70 / 8 = 8.7x. NO cumple la regla del 20x, por lo que pagar para set-mining es -EV.', isCorrect: true, feedback: '¡Exacto! El stack efectivo siempre está limitado por el jugador que menos fichas tiene. 8.7x es insuficiente para rentabilizar el trío.' },
      { id: 'b', label: 'El stack efectivo es $200 (el tuyo), por lo que sí se cumple el 20x.', isCorrect: false, feedback: '¡Error común! No puedes ganar más dinero del que tiene el rival en su stack.' },
      { id: 'c', label: 'Siempre se pagan parejas pequeñas sin importar el stack.', isCorrect: false, feedback: 'Pagar subidas preflop con parejas bajas sin stack detrás es la mayor fuga de dinero de los novatos.' },
      { id: 'd', label: 'Debes resubir a $24.', isCorrect: false, feedback: 'Convertir 44 en un 3-bet bluff fuera de contexto no es recomendable.' },
    ],
    hint: 'El stack efectivo es el MÍNIMO entre tu stack y el de tu rival.',
    explanation: {
      summary: 'El set-mining depende exclusivamente del stack que puedes ganarle al rival.',
      steps: [
        'Stack efectivo = min($200, $70) = $70.',
        'Multiplicador = $70 / $8 = 8.75x.',
        'Como 8.75x < 15x-20x, el pago es matemáticamente perdedor a largo plazo.',
      ],
      ruleOfThumb: 'Para set-mining, el stack más pequeño de los dos debe ser al menos 20 veces la subida.',
    },
  },
  {
    id: 'p13_2',
    moduleId: 'c13',
    title: 'El Break-Even en Robo de Ciegas con Min-Raise',
    conceptBadge: 'Blind Steal',
    difficulty: 'Intermedio',
    scenario: 'Ciegas $1/$2 (Total $3 muertos en la mesa). Decides abrir a 2 Big Blinds ($4) desde el Botón para robar.',
    question: '¿Qué porcentaje de veces deben foldear las dos ciegas para que tu robo sea rentable con CUALQUIER par de cartas?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: '57.1% (Riesgo $4 / [Riesgo $4 + Recompensa $3] = 4/7 = 57.1%)', isCorrect: true, feedback: '¡Brillante! Solo necesitas que foldeen el 57.1% de las veces. En la práctica, SB y BB foldean juntas más del 65% ante min-raises desde el botón.' },
      { id: 'b', label: '75.0%', isCorrect: false, feedback: 'Demasiado alto para un min-raise.' },
      { id: 'c', label: '50.0%', isCorrect: false, feedback: 'Cálculo inexacto.' },
      { id: 'd', label: '40.0%', isCorrect: false, feedback: 'Demasiado bajo.' },
    ],
    hint: 'Fórmula de Break-Even de Farol: Riesgo / (Riesgo + Recompensa).',
    explanation: {
      summary: 'El min-raise como robo de ciegas es una de las armas matemáticas más eficientes.',
      steps: [
        'Riesgo = $4.',
        'Recompensa = $1 + $2 = $3.',
        'Break-Even = 4 / (4 + 3) = 4 / 7 = 57.1%.',
      ],
      ruleOfThumb: 'Min-raise a 2bb necesita 57% de fold para auto-generar ganancias puras.',
    },
  },

  // =========================================================================
  // SECCIÓN 4: MATEMÁTICAS POST-FLOP
  // =========================================================================

  // CAPÍTULO 14: Apostando con la Mejor Mano (Value Betting & Sizing)
  {
    id: 'p14_1',
    moduleId: 'c14',
    title: 'El Tamaño Óptimo de Apuesta por Valor',
    conceptBadge: 'Value Sizing',
    difficulty: 'Intermedio',
    scenario: 'En el River tienes las nueces (Nut Flush) en un bote de $100 contra un jugador sensato. Estimas dos opciones de apuesta: A) Apostar $60 (te paga el 60% de las veces), o B) Apostar $120 (solo te paga el 20% de las veces).',
    question: '¿Cuál de los dos tamaños de apuesta genera más dinero a largo plazo (mayor EV)?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'Opción A ($60), porque genera $36 de ganancia esperada ($60 × 0.60) frente a solo $24 de la opción B ($120 × 0.20).', isCorrect: true, feedback: '¡Brillante! Apostar demasiado grande asusta al rival y reduce drásticamente las veces que te pagan, bajando tu EV neto.' },
      { id: 'b', label: 'Opción B ($120), porque $120 es el doble de $60.', isCorrect: false, feedback: '¡Error de novato! De nada sirve apostar $120 si el rival foldea casi siempre.' },
      { id: 'c', label: 'Ambas opciones generan exactamente lo mismo.', isCorrect: false, feedback: '$36 es un 50% superior a $24.' },
      { id: 'd', label: 'Pasar para que el rival no se enoje.', isCorrect: false, feedback: 'Con la mejor mano jamás debes pasar por cortesía en el river.' },
    ],
    hint: 'Multiplica el dinero de la apuesta por la probabilidad de que te paguen.',
    explanation: {
      summary: 'El sizing de Value Bet busca maximizar la ecuación: Apuesta × Frecuencia de Pago.',
      steps: [
        'Opción A: $60 × 60% = $36.00 de EV extraído.',
        'Opción B: $120 × 20% = $24.00 de EV extraído.',
        'La apuesta de $60 extrae un 50% más de dinero.',
      ],
      ruleOfThumb: 'Ajusta tu apuesta al precio máximo que el rango del rival esté dispuesto a pagar.',
    },
  },

  // CAPÍTULO 15: Semi-Farol All-In (Semi-Bluffing)
  {
    id: 'p15_1',
    moduleId: 'c15',
    title: 'Los Dos Motores de Ganancia del Semi-Bluff',
    conceptBadge: 'Semi-Bluff',
    difficulty: 'Avanzado',
    scenario: 'En el Flop tienes un Flush Draw con Overcard. Decides ir All-In de semi-farol en vez de pagar pasivamente.',
    question: '¿Por qué la matemática del semi-farol es inmensamente superior a jugar pasivo (hacer solo call)?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'Porque al ir All-in sumas Fold Equity (ganas el bote de inmediato si el rival se retira) MÁS tu Card Equity si te pagan, mientras que pagando pasivo tu Fold Equity es 0%.', isCorrect: true, feedback: '¡Exacto! Pagar pasivamente solo te da una vía de victoria (showdown). El semi-farol te da dos vías hacia el dinero.' },
      { id: 'b', label: 'Porque al ir all-in la baraja reparte mejores cartas en el turn.', isCorrect: false, feedback: 'Las cartas del crupier no cambian según la acción.' },
      { id: 'c', label: 'Porque ahorras tiempo en la sesión.', isCorrect: false, feedback: 'No se trata de rapidez, sino de valor esperado.' },
      { id: 'd', label: 'Solo es rentable si tienes 100% de fold equity.', isCorrect: false, feedback: 'Si tuvieras 100% fold equity sería un farol puro; el semi-farol cuenta con el respaldo de tus cartas.' },
    ],
    hint: 'Compara las formas de ganar: pagar = 1 forma de ganar; resubir = 2 formas de ganar.',
    explanation: {
      summary: 'La agresividad calculada es el principio motor de las ganancias en No-Limit Hold\'em.',
      steps: [
        'Vía 1: El rival foldea y te llevas el bote muerto sin riesgo.',
        'Vía 2: El rival paga pero ligas tu color/escalera y ganas un bote masivo.',
        'Pagar pasivamente renuncia por completo a la Vía 1.',
      ],
      ruleOfThumb: 'Fold Equity + Card Equity = La fórmula de la agresividad rentable.',
    },
  },

  // CAPÍTULO 16: Faroles Puros y Hero Calls (Alpha & MDF)
  {
    id: 'p16_1',
    moduleId: 'c16',
    title: 'Alpha: Frecuencia de Éxito de un Farol en el River',
    conceptBadge: 'Alpha Break-Even',
    difficulty: 'Intermedio',
    scenario: 'En el River tienes cartas que no vencen a nada (0% de equity). Hay un bote de $120. Apuestas $60 de farol puro.',
    potSize: 120,
    betToCall: 60,
    question: '¿Qué porcentaje de las veces debe foldear el rival para que tu farol sea rentable en automático?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: '33.3% (Riesgo $60 / [Riesgo $60 + Bote $120] = 60 / 180 = 33.3%)', isCorrect: true, feedback: '¡Correcto! Alpha = Riesgo / (Riesgo + Recompensa). Si el rival foldea al menos 1 de cada 3 veces, tu farol es +EV garantizado.' },
      { id: 'b', label: '50.0%', isCorrect: false, feedback: '50% sería si apostaras $120 en bote de $120.' },
      { id: 'c', label: '25.0%', isCorrect: false, feedback: 'Demasiado bajo.' },
      { id: 'd', label: '66.7%', isCorrect: false, feedback: '66.7% es la defensa mínima del rival (MDF).' },
    ],
    hint: 'Alpha = Tu apuesta / (Tu apuesta + Lo que hay en el bote).',
    explanation: {
      summary: 'Alpha mide el porcentaje mínimo de repliegue que necesita cualquier farol.',
      steps: [
        'Riesgo = $60.',
        'Bote a ganar = $120.',
        'Alpha = 60 / (60 + 120) = 60 / 180 = 33.3%.',
      ],
      ruleOfThumb: 'Apostar medio bote de farol solo necesita que el rival tire sus cartas un tercio de las veces.',
    },
  },

  // =========================================================================
  // SECCIÓN 5: CÁLCULOS AVANZADOS DE EV Y COMBINATORIA
  // =========================================================================

  // CAPÍTULO 17: Cálculos Avanzados de EV (Off-the-Table Analysis)
  {
    id: 'p17_1',
    moduleId: 'c17',
    title: 'Auditoría de Manos Fuera de las Mesas',
    conceptBadge: 'Árboles de EV',
    difficulty: 'Avanzado',
    scenario: 'Revisas una mano jugada anoche: En el River enfrentaste una apuesta de $80 en bote de $120. Pagaste con segunda pareja y perdiste contra trío. En tu análisis descubres que contra el rango del rival ganabas el 35% de las veces.',
    question: '¿Fue tu decisión de pagar correcta a pesar de haber perdido esa mano?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'Sí, fue absolutamente correcta (+EV). Necesitabas un 28.6% de equity para pagar ($80/$280) y tenías un 35%. A largo plazo esa jugada genera ganancias.', isCorrect: true, feedback: '¡Brillante! EV = (0.35 × $200) - (0.65 × $80) = +$70 - $52 = +$18.00 de ganancia neta esperada.' },
      { id: 'b', label: 'No, porque perdiste $80 y perder dinero siempre es -EV.', isCorrect: false, feedback: '¡Confusión de resultado con proceso! La decisión era +EV a pesar del resultado adverso.' },
      { id: 'c', label: 'Debiste resubir de farol.', isCorrect: false, feedback: 'Contra un trío resubir te costaría aún más fichas.' },
      { id: 'd', label: 'El EV no se puede calcular en el river.', isCorrect: false, feedback: 'El river es el momento más preciso para calcular EV ya que no quedan cartas por salir.' },
    ],
    hint: 'Calcula las Pot Odds ($80 / $280 = 28.6%) y compáralas con tu 35% de victoria.',
    explanation: {
      summary: 'El análisis fuera de las mesas te entrena para juzgar jugadas por su EV y no por el dolor de una derrota puntual.',
      steps: [
        'Pot Odds requeridas = 80 / (120 + 80 + 80) = 80 / 280 = 28.6%.',
        'Tu Equity real = 35.0%.',
        'Como 35% > 28.6%, hacer Call tiene un EV positivo de +$18.00 por jugada.',
      ],
      ruleOfThumb: 'Un profesional sonríe cuando pierde una mano que fue jugada con +EV.',
    },
  },

  // CAPÍTULO 18: Combinatoria y Bloqueadores
  {
    id: 'p18_1',
    moduleId: 'c18',
    title: 'La Regla 16 / 6 de Combinatoria de Poker',
    conceptBadge: 'Combinatoria 16/6',
    difficulty: 'Principiante',
    scenario: 'Estás calculando cuántas formas tiene un rival de tener: 1) Pareja de Reyes en mano (KK), y 2) As-Dama (AQ).',
    question: 'Sin cartas comunitarias a la vista, ¿cuántas combinaciones existen de cada una?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'KK tiene 6 combinaciones; AQ tiene 16 combinaciones (4 suited y 12 offsuit).', isCorrect: true, feedback: '¡Exacto! Cualquier pocket pair tiene 6 combos. Cualquier mano de dos cartas distintas tiene 16 combos.' },
      { id: 'b', label: 'Ambas tienen 12 combinaciones.', isCorrect: false, feedback: 'Las parejas y las manos no emparejadas tienen cantidades base distintas.' },
      { id: 'c', label: 'KK tiene 4 combos y AQ tiene 8 combos.', isCorrect: false, feedback: 'C(4, 2) da 6 combos para parejas, y 4 × 4 da 16 combos para no emparejadas.' },
      { id: 'd', label: 'Depende de la posición.', isCorrect: false, feedback: 'El conteo combinatorio de la baraja es invariable.' },
    ],
    hint: 'Para parejas: C(4, 2) = 6. Para no emparejadas: 4 × 4 = 16.',
    explanation: {
      summary: 'La regla 16 / 6 es el pilar de toda la combinatoria moderna de poker.',
      steps: [
        'Pareja en mano (Pocket Pair): C(4, 2) = (4 × 3) / 2 = 6 combinaciones.',
        'Mano no emparejada: 4 naipes de un rango × 4 naipes del otro = 16 combinaciones.',
        'De las 16: 4 son del mismo palo (suited) y 12 de palos cruzados (offsuit).',
      ],
      ruleOfThumb: 'Siempre hay 16 combos de manos distintas y solo 6 combos de parejas.',
    },
  },
  {
    id: 'p18_2',
    moduleId: 'c18',
    title: 'Efecto de Bloqueadores en el River (Hero Call)',
    conceptBadge: 'Nut Blocker',
    difficulty: 'Avanzado',
    scenario: 'Board: Q♠ 8♠ 3♠ 2♦ K♣ (3 picas en mesa). El rival va All-in en el river fingiendo tener el color máximo de picas. En tu mano tienes A♠ Q♦.',
    heroCards: [{ rank: 'A', suit: 'spades' }, { rank: 'Q', suit: 'diamonds' }],
    board: [{ rank: 'Q', suit: 'spades' }, { rank: '8', suit: 'spades' }, { rank: '3', suit: 'spades' }, { rank: '2', suit: 'diamonds' }, { rank: 'K', suit: 'clubs' }],
    question: '¿Por qué tener el A♠ en tu mano destruye matemáticamente la historia del rival?',
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'Porque al tener tú el A♠, es FÍSICAMENTE IMPOSIBLE que el rival tenga el color a las nueces (Nut Flush), reduciendo sus combos legítimos de valor a cero y aumentando drásticamente la probabilidad de que esté faroleando.', isCorrect: true, feedback: '¡Brillante! Eres el dueño del bloqueador absoluto. El rival no puede tener la mejor mano posible porque la tienes tú.' },
      { id: 'b', label: 'Porque el As gana automáticamente contra cualquier escalera.', isCorrect: false, feedback: 'No es una regla de jerarquía sino de card removal (eliminación de combinaciones).' },
      { id: 'c', label: 'Porque las picas valen más en el river.', isCorrect: false, feedback: 'Ningún palo tiene más valor en Texas Hold\'em.' },
      { id: 'd', label: 'No cambia nada.', isCorrect: false, feedback: 'Los bloqueadores son la herramienta clave del poker de alto nivel.' },
    ],
    hint: 'Si tú tienes el As de picas en tu mano, ¿puede el rival tener As de picas para el color máximo?',
    explanation: {
      summary: 'El bloqueo de combinaciones (Card Removal Effect) es el fundamento de los Hero Calls de nivel profesional.',
      steps: [
        'El color a las nueces requiere tener el A♠.',
        'Como el A♠ está en tu mano, el rival tiene exactamente 0 combos de Nut Flush.',
        'Su rango de apuesta fuerte queda polarizado hacia manos de valor medio o faroles puros.',
      ],
      ruleOfThumb: 'Bloquear la mejor mano del rival (Nut Blocker) convierte sus apuestas gigantescas en candidatos ideales a Hero Call.',
    },
  },
];
