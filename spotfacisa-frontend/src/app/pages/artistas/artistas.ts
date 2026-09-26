import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Api } from '../../services/api';
import { Artista } from '../../models/artista';

@Component({
  selector: 'app-artistas',
  imports: [FormsModule],
  templateUrl: './artistas.html',
  styleUrl: './artistas.css'
})
export class Artistas implements OnInit {

  artistas: Artista[] = [];

  mostrarFormulario = false;
  editando = false;
  artistaEditandoId?: number;

  artistaForm: Artista = {
    nome: '',
    genero: '',
    nacionalidade: '',
    descricao: ''
  };

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarArtistas();
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

        this.cdr.detectChanges();
      }
    });
  }

  novoArtista(): void {
    this.editando = false;
    this.artistaEditandoId = undefined;

    this.artistaForm = {
      nome: '',
      genero: '',
      nacionalidade: '',
      descricao: ''
    };

    this.mostrarFormulario = true;

    this.cdr.detectChanges();
  }

  editarArtista(artista: Artista): void {
    this.editando = true;
    this.artistaEditandoId = artista.id;

    this.artistaForm = {
      nome: artista.nome,
      genero: artista.genero,
      nacionalidade: artista.nacionalidade,
      descricao: artista.descricao
    };

    this.mostrarFormulario = true;

    this.cdr.detectChanges();
  }

  salvarArtista(): void {

    if (!this.artistaForm.nome.trim()) {
      alert('Informe o nome do artista.');
      return;
    }

    /*
     * =========================
     * ATUALIZAR ARTISTA
     * =========================
     */

    if (this.editando && this.artistaEditandoId) {

      this.api.atualizarArtista(
        this.artistaEditandoId,
        this.artistaForm
      ).subscribe({

        next: (artistaAtualizado) => {

          const index = this.artistas.findIndex(
            artista => artista.id === this.artistaEditandoId
          );

          if (index !== -1) {
            this.artistas[index] = artistaAtualizado;
            this.artistas = [...this.artistas];
          }

          this.fecharFormulario();

          this.cdr.detectChanges();

          alert('Artista atualizado com sucesso!');
        },

        error: (erro) => {

          console.error(
            'Erro ao atualizar artista:',
            erro
          );

          alert('Erro ao atualizar artista.');

          this.cdr.detectChanges();
        }

      });

      return;
    }

    /*
     * =========================
     * CRIAR ARTISTA
     * =========================
     */

    this.api.criarArtista(this.artistaForm).subscribe({

      next: (novoArtista) => {

        console.log(
          'Novo artista criado:',
          novoArtista
        );

        this.artistas = [
          ...this.artistas,
          novoArtista
        ];

        this.fecharFormulario();

        this.cdr.detectChanges();

        alert('Artista criado com sucesso!');
      },

      error: (erro) => {

        console.error(
          'Erro ao criar artista:',
          erro
        );

        alert('Erro ao criar artista.');

        this.cdr.detectChanges();
      }

    });
  }

  excluirArtista(id?: number): void {

    if (!id) {
      return;
    }

    const confirmar = confirm(
      'Tem certeza que deseja excluir este artista?'
    );

    if (!confirmar) {
      return;
    }

    this.api.deletarArtista(id).subscribe({

      next: () => {

        this.artistas = this.artistas.filter(
          artista => artista.id !== id
        );

        this.cdr.detectChanges();

        alert('Artista excluído com sucesso!');
      },

      error: (erro) => {

        console.error(
          'Erro ao excluir artista:',
          erro
        );

        alert('Erro ao excluir artista.');

        this.cdr.detectChanges();
      }

    });
  }

  fecharFormulario(): void {

    this.mostrarFormulario = false;

    this.editando = false;

    this.artistaEditandoId = undefined;

    this.artistaForm = {
      nome: '',
      genero: '',
      nacionalidade: '',
      descricao: ''
    };

    this.cdr.detectChanges();
  }
}
