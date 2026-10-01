export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  rank: Rank;
  suit: Suit;
  id?: string;
  isOut?: boolean;
  isDirty?: boolean;
}

export type PlayerPosition = 'BTN' | 'SB' | 'BB' | 'UTG' | 'MP' | 'CO';

export type ProblemType = 
  | 'multiple-choice'
  | 'out-picker'
  | 'slider-match'
  | 'numeric-input'
  | 'action-decision'
  | 'combo-counter';

export interface ProblemOption {
  id: string;
  label: string;
  detail?: string;
  isCorrect: boolean;
  feedback?: string;
}

export interface Problem {
  id: string;
  moduleId: string;
  title: string;
  conceptBadge: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  scenario: string;
  heroCards?: Card[];
  villainCards?: Card[];
  board?: Card[];
  potSize?: number;
  betToCall?: number;
  heroStack?: number;
  villainStack?: number;
  heroPosition?: PlayerPosition;
  villainPosition?: PlayerPosition;
  question: string;
  type: ProblemType;
  options?: ProblemOption[];
  correctNumericValue?: number;
  tolerance?: number;
  unit?: string;
  correctCards?: string[]; // IDs of cards, e.g. "Ah", "Kd"
  hint: string;
  explanation: {
    summary: string;
    steps: string[];
    ruleOfThumb?: string;
  };
}

export interface ModuleLearningContext {
  whyItMatters: string;       // ¿Por qué estoy viendo este módulo?
  tableDilemma: string;       // El dilema real en la mesa que resuelve
  commonMistake: string;      // El error costoso del 90% de principiantes
  tableSuperpower: string;    // Tu superpoder práctico en la mesa
}

export interface PokerModule {
  id: string;
  order: number;
  chapterNumber: number;
  section: string;
  sectionNumber: number;
  title: string;
  subtitle: string;
  bookChapter: string;
  readingTime: string;
  icon: string;
  color: string;
  learningContext: ModuleLearningContext;
  keyTakeaway: string;
  formula: {
    name: string;
    expression: string;
    explanation: string;
  };
  theoryInsights: {
    title: string;
    content: string;
    diagramType?: string;
  }[];
  sandboxType: 
    | 'variance'
    | 'converter'
    | 'out-picker'
    | 'pot-odds'
    | 'implied-odds'
    | 'ev-balance'
    | 'preflop-steal'
    | 'semi-bluff'
    | 'range-matrix'
    | 'position-spr'
    | 'player-profiler'
    | 'decision-flow'
    | 'value-sizing'
    | 'ev-tree';
  problems: Problem[];
}

export interface UserProgress {
  solvedProblems: Record<string, boolean>;
  xp: number;
  streakDays: number;
  currentModuleId: string;
}
