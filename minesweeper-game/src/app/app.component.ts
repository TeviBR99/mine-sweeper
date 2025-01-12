import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GameService } from './services/game.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { GameComponent } from "./game/game.component";
import { GameParameters } from './model/game-parameters.model';
import {MatSelectModule} from '@angular/material/select';
import { Difficulty } from './model/difficulty.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, GameComponent, MatSelectModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'minesweeper-game';
  public hideGameSettings: boolean = false
  public hideOptions: boolean = false
  public difficultySelector: string = ""

  @ViewChild('minesNumber') minesNumber: ElementRef | undefined;
  public gameParameters: GameParameters = {} as GameParameters

  constructor(){}

  ngOnInit(){
    this.hideGameSettings = true
    this.hideOptions = false
  }

  public startGame(){
    const defaultMines = 12
    let minesNumber = this.minesNumber?.nativeElement.value
    this.gameParameters = new GameParameters(minesNumber ? minesNumber : defaultMines, this.setBoardSize())
    this.hideGameSettings = true
    this.hideOptions = this.hideGameSettings
  }

  public goToSettings(){
    this.hideOptions = true
    this.hideGameSettings = !this.hideOptions
  }

  public confirmSettings(){
    this.hideGameSettings = true
    this.hideOptions = !this.hideGameSettings
  }

  public cancelSettings(){
    this.hideGameSettings = true
    this.hideOptions = !this.hideGameSettings
  }

  public selectLevel(event: any){
    this.difficultySelector = (event.value as string).toUpperCase()
  }

  private setBoardSize(){
    let boardSize: number = 0
    switch(this.difficultySelector){
      case Difficulty.MEDIUM:
        boardSize = 20
        break;
      case Difficulty.HARD:
        boardSize = 30
        break;
      default:
        boardSize = 10
        break;
    }
    return boardSize;
  }

}
