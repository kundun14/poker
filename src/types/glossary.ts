export type GlossaryCategory =
  | 'posiciones'
  | 'rondas_botes'
  | 'acciones_apuestas'
  | 'matematica_odds'
  | 'perfiles_jugadores'
  | 'estrategia';

export interface GlossaryItem {
  id: string;
  term: string;
  aliases: string[];
  category: GlossaryCategory;
  categoryLabel: string;
  shortDefinition: string;
  plainExplanation: string;
  tableSignificance: string;
  example?: string;
  beginnerTip?: string;
  badgeColor?: string;
}
