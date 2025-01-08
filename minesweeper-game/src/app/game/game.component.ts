import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { GameService } from '../services/game.service';
import { GameParameters } from '../model/game-parameters.model';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  public boardSize: number = 10;
  public minesNumber: number = 2;

  @Input() set parameters(parameters: GameParameters){
    this.updateGameParameters(parameters)
  }

  constructor(private gameService: GameService) {}

  public updateGameParameters(parameters: GameParameters){
    console.log("parameters: ", parameters)
    if(parameters){
      const {minesNumber, boardSize} = parameters
      this.boardSize = boardSize
      this.minesNumber = minesNumber
    }

  }


}
