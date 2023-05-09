export interface RecomendedTable {
  marvel: number;
  dc: number;
  disney: number;
  anime: number;
  starWars: number;
  games: number;
  statueDrawing: number;
  drawing: number;
  actionFigure: number;
}

export interface User {
  id: string;
  guestId: string;
  cep: string;
  city: string;
  uf: string;
  preferences: RecomendedTable
}
