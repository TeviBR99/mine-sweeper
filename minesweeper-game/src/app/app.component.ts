import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GameOptionsComponent } from "./game-options/game-options.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameOptionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'minesweeper-game';

}
