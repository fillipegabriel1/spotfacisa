import { Artista } from './artista';

export interface Musica {
  id?: number;
  titulo: string;
  duracao: number;
  genero: string;
  anoLancamento: number;
  artista: Artista;
}
