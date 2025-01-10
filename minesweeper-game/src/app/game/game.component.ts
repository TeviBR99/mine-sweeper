import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { GameParameters } from '../model/game-parameters.model';
import { Board } from '../model/board.model';
import { CellState } from '../model/utils.model';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';


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

  constructor(private gameService: GameService,
    private router: Router) {}


  public updateGameParameters(parameters: GameParameters){
    if(parameters){
      this.board = new Board(parameters?.minesNumber, parameters?.boardSize)
    }
  }

  public openCell(rowIndex: number, cellIndex: number){
    if(this.board){
      this.board.rows[rowIndex][cellIndex].state = CellState.OPENED
    }
  }

  public addMarker(rowIndex: number, cellIndex: number){

  }

}
