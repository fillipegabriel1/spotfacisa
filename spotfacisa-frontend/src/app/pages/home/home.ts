import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Api } from '../../services/api';
import { Artista } from '../../models/artista';
import { Musica } from '../../models/musica';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  artistas: Artista[] = [];
  musicas: Musica[] = [];

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.api.listarArtistas().subscribe({
      next: (dados) => {
        this.artistas = [...dados];
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar artistas:', erro);
      }
    });

    this.api.listarMusicas().subscribe({
      next: (dados) => {
        this.musicas = [...dados];
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar músicas:', erro);
      }
    });

  }

  formatarDuracao(segundos: number): string {

    if (!segundos) {
      return '0:00';
    }

    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;

    return `${minutos}:${segundosRestantes
      .toString()
      .padStart(2, '0')}`;

  }

}
