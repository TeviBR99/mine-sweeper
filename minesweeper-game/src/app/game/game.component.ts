import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA } from '@angular/core';
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

  public boardSize: number = 0;
  public minesNumber: number = 20;
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
    for(let i=0; i<this.boardSize; i++){
      row = []
      for(let j=0; j<this.boardSize; j++){
        row.push(0)
      }
      this.board.push(row)
    }
    this.addMines()
  }

  public addMines(){
    // console.log("This board: ", this.board)
  }

  public openCell(row: any){
    console.log("Row: ", row)
  }



}
