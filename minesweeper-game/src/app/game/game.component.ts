import { Component, Input } from '@angular/core';
import { GameParameters } from '../model/game-parameters.model';
import { Board } from '../model/board.model';
import { CellState } from '../model/utils.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  public boardSize: number = 0;
  public minesNumber: number = 0;
  public board?: Board
  public CellState = CellState;

  @Input() set parameters(parameters: GameParameters){
    this.updateGameParameters(parameters)
  }

  constructor() {}

  public updateGameParameters(parameters: GameParameters){
    if(parameters){
      const {minesNumber, boardSize} = parameters
      this.board = new Board(minesNumber, boardSize)
    }
  }

  public openCell(rowIndex: number, cellIndex: number){

  }

  public addMarker(rowIndex: number, cellIndex: number){

  }

}
