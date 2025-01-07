import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';

export const routes: Routes = [
  { path: 'start', component: AppComponent},
  { path: 'game', component: GameComponent},
  { path: 'settings', component: GameSettingsComponent},
  { path: '', redirectTo: '/start', pathMatch: 'full' },
];
