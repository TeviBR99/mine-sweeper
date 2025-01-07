import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home-options',
    loadComponent: () => import('./game-options/game-options.component').then(c => c. GameOptionsComponent)
  },
  {
    path: 'play',
    loadComponent: () => import('./game/game.component').then(c => c. GameComponent)
  }
];
