import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Api } from '../../services/api';
import { Musica } from '../../models/musica';
import { Artista } from '../../models/artista';

@Component({
  selector: 'app-musicas',
  imports: [FormsModule],
  templateUrl: './musicas.html',
  styleUrl: './musicas.css'
})
export class Musicas implements OnInit {

  musicas: Musica[] = [];
  artistas: Artista[] = [];

  mostrarFormulario = false;
  editando = false;
  musicaEditandoId?: number;

  artistaSelecionadoId: number | null = null;

  musicaForm: Musica = {
    titulo: '',
    duracao: 0,
    genero: '',
    anoLancamento: 0,
    artista: {
      id: 0,
      nome: '',
      genero: '',
      nacionalidade: '',
      descricao: ''
    }
  };

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarMusicas();
    this.carregarArtistas();
  }

  carregarMusicas(): void {
    this.api.listarMusicas().subscribe({
      next: (dados) => {
        this.musicas = [...dados];

        console.log('Músicas carregadas:', this.musicas);

        this.cdr.detectChanges();
      },

      error: (erro) => {
        console.error('Erro ao buscar músicas:', erro);
        this.cdr.detectChanges();
      }
    });
  }

  carregarArtistas(): void {
    this.api.listarArtistas().subscribe({
      next: (dados) => {
        this.artistas = [...dados];

        console.log('Artistas carregados:', this.artistas);

        this.cdr.detectChanges();
      },

      error: (erro) => {
        console.error('Erro ao buscar artistas:', erro);
      }
    });
  }

  novaMusica(): void {
    this.editando = false;
    this.musicaEditandoId = undefined;
    this.artistaSelecionadoId = null;

    this.musicaForm = {
      titulo: '',
      duracao: 0,
      genero: '',
      anoLancamento: 0,
      artista: {
        id: 0,
        nome: '',
        genero: '',
        nacionalidade: '',
        descricao: ''
      }
    };

    this.mostrarFormulario = true;

    this.cdr.detectChanges();
  }

  editarMusica(musica: Musica): void {
    this.editando = true;
    this.musicaEditandoId = musica.id;

    this.musicaForm = {
      titulo: musica.titulo,
      duracao: musica.duracao,
      genero: musica.genero,
      anoLancamento: musica.anoLancamento,
      artista: musica.artista
    };

    this.artistaSelecionadoId = musica.artista?.id ?? null;

    this.mostrarFormulario = true;

    this.cdr.detectChanges();
  }

  salvarMusica(): void {

    if (!this.musicaForm.titulo.trim()) {
      alert('Informe o título da música.');
      return;
    }

    if (!this.artistaSelecionadoId) {
      alert('Selecione um artista.');
      return;
    }

    const artistaSelecionado = this.artistas.find(
      artista => artista.id === this.artistaSelecionadoId
    );

    if (!artistaSelecionado) {
      alert('Artista não encontrado.');
      return;
    }

    const musicaParaSalvar: Musica = {
      titulo: this.musicaForm.titulo,
      duracao: this.musicaForm.duracao,
      genero: this.musicaForm.genero,
      anoLancamento: this.musicaForm.anoLancamento,
      artista: artistaSelecionado
    };


    if (this.editando && this.musicaEditandoId) {

      this.api.atualizarMusica(
        this.musicaEditandoId,
        musicaParaSalvar
      ).subscribe({

        next: (musicaAtualizada) => {

          const index = this.musicas.findIndex(
            musica => musica.id === this.musicaEditandoId
          );

          if (index !== -1) {
            this.musicas[index] = musicaAtualizada;
            this.musicas = [...this.musicas];
          }

          this.fecharFormulario();

          this.cdr.detectChanges();

          alert('Música atualizada com sucesso!');
        },

        error: (erro) => {

          console.error(
            'Erro ao atualizar música:',
            erro
          );

          alert('Erro ao atualizar música.');

          this.cdr.detectChanges();
        }
      });

      return;
    }

    this.api.criarMusica(musicaParaSalvar).subscribe({

      next: (novaMusica) => {

        console.log(
          'Nova música criada:',
          novaMusica
        );

        this.musicas = [
          ...this.musicas,
          novaMusica
        ];

        this.fecharFormulario();

        this.cdr.detectChanges();

        alert('Música criada com sucesso!');
      },

      error: (erro) => {

        console.error(
          'Erro ao criar música:',
          erro
        );

        alert('Erro ao criar música.');

        this.cdr.detectChanges();
      }
    });
  }

  excluirMusica(id?: number): void {

    if (!id) {
      return;
    }

    const confirmar = confirm(
      'Tem certeza que deseja excluir esta música?'
    );

    if (!confirmar) {
      return;
    }

    this.api.deletarMusica(id).subscribe({

      next: () => {

        this.musicas = this.musicas.filter(
          musica => musica.id !== id
        );

        this.cdr.detectChanges();

        alert('Música excluída com sucesso!');
      },

      error: (erro) => {

        console.error(
          'Erro ao excluir música:',
          erro
        );

        alert('Erro ao excluir música.');

        this.cdr.detectChanges();
      }
    });
  }

  fecharFormulario(): void {

    this.mostrarFormulario = false;

    this.editando = false;

    this.musicaEditandoId = undefined;

    this.artistaSelecionadoId = null;

    this.musicaForm = {
      titulo: '',
      duracao: 0,
      genero: '',
      anoLancamento: 0,
      artista: {
        id: 0,
        nome: '',
        genero: '',
        nacionalidade: '',
        descricao: ''
      }
    };

    this.cdr.detectChanges();
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
