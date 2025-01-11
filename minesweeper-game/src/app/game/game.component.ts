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
export class GameComponent implements OnInit{

  public boardSize: number = 0;
  public minesNumber: number = 0;
  public board?: Board
  public CellState = CellState;

  @Input() set parameters(parameters: GameParameters){
    this.updateGameParameters(parameters)
  }

  constructor(private gameService: GameService,
    private router: Router) {}

  ngOnInit(): void {
    this.removeAuxClickEvent()
  }

  public updateGameParameters(parameters: GameParameters){
    if(parameters){
      this.board = new Board(parameters?.minesNumber, parameters?.boardSize)
      console.log(this.board)
    }
  }

  public openCell(rowIndex: number, cellIndex: number){
    this.board?.openCells(rowIndex, cellIndex)
    this.board?.changeCellState(rowIndex, cellIndex, CellState.OPENED)
  }

  public addMarker(rowIndex: number, cellIndex: number){
    this.board?.changeCellState(rowIndex, cellIndex, CellState.CLOSED_WITH_MARKER)
  }

  public removeAuxClickEvent(){
    const gameBoardElement = document.body.querySelector(".game-board")
    gameBoardElement?.addEventListener("contextmenu", (event) =>{
      event.preventDefault()
    }, true)
  }

}
