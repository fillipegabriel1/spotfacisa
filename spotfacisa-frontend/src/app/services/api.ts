import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Artista } from '../models/artista';
import { Musica } from '../models/musica';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  listarArtistas(): Observable<Artista[]> {
    return this.http.get<Artista[]>(
      `${this.apiUrl}/artistas`
    );
  }

  buscarArtista(id: number): Observable<Artista> {
    return this.http.get<Artista>(
      `${this.apiUrl}/artistas/${id}`
    );
  }

  criarArtista(artista: Artista): Observable<Artista> {
    return this.http.post<Artista>(
      `${this.apiUrl}/artistas`,
      artista
    );
  }

  atualizarArtista(
    id: number,
    artista: Artista
  ): Observable<Artista> {
    return this.http.put<Artista>(
      `${this.apiUrl}/artistas/${id}`,
      artista
    );
  }

  deletarArtista(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/artistas/${id}`
    );
  }

  listarMusicas(): Observable<Musica[]> {
    return this.http.get<Musica[]>(
      `${this.apiUrl}/musicas`
    );
  }

  buscarMusica(id: number): Observable<Musica> {
    return this.http.get<Musica>(
      `${this.apiUrl}/musicas/${id}`
    );
  }

  criarMusica(musica: Musica): Observable<Musica> {
    return this.http.post<Musica>(
      `${this.apiUrl}/musicas`,
      musica
    );
  }

  atualizarMusica(
    id: number,
    musica: Musica
  ): Observable<Musica> {
    return this.http.put<Musica>(
      `${this.apiUrl}/musicas/${id}`,
      musica
    );
  }

  deletarMusica(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/musicas/${id}`
    );
  }
}
