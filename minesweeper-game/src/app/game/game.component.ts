import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { GameService } from '../services/game.service';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  public hasStarted?: boolean

  @Input() set startGame(startGame: boolean){
    this.hasStarted = startGame
  }

  constructor(private gameService: GameService) {}

}
