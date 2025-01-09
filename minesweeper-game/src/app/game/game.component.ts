import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { GameParameters } from '../model/game-parameters.model';
import { UtilsService } from '../services/utils.service';
import { Board } from '../model/board.model';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  public boardSize: number = 0;
  public minesNumber: number = 0;
  public board?: Board

  @Input() set parameters(parameters: GameParameters){
    this.updateGameParameters(parameters)
  }

  constructor(private utilsService: UtilsService) {}

  public updateGameParameters(parameters: GameParameters){
    if(parameters){
      const {minesNumber, boardSize} = parameters
      this.board = new Board(minesNumber, boardSize)
    }
  }

  public openCell(row: any){
    console.log("Row: ", row)
  }

  public addMarker(){
    console.log("check")
  }

}
