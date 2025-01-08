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
  public board: any[] = []

  @Input() set parameters(parameters: GameParameters){
    this.updateGameParameters(parameters)
  }

  constructor() {}

  public updateGameParameters(parameters: GameParameters){
    if(parameters){
      const {minesNumber, boardSize} = parameters
      this.boardSize = boardSize
      this.minesNumber = minesNumber
      this.buildBoard()
    }
  }

  public buildBoard(){
    let row : any[] = []
    const MAX_FILAS = 3
    const MAX_COLUMNS = 10;
    for(let i=0; i<MAX_FILAS; i++){
      row = []
      for(let j=0; j<MAX_COLUMNS; j++){
        row.push(0)
      }
      this.board.push(row)
    }
    console.log("Rows: ", row)
    console.log("Board: ", this.board)
  }

}
