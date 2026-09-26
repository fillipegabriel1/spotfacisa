import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Artistas } from './pages/artistas/artistas';
import { Musicas } from './pages/musicas/musicas';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'artistas',
    component: Artistas
  },
  {
    path: 'musicas',
    component: Musicas
  },
  {
    path: '**',
    redirectTo: ''
  }
];
