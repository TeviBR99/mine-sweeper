import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GameService } from './services/game.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { GameComponent } from "./game/game.component";
import { GameParameters } from './model/game-parameters.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'minesweeper-game';
  public hideGameSettings: boolean = false
  public hideOptions: boolean = false

  @ViewChild('minesNumber') minesNumber: ElementRef | undefined;
  public gameParameters: GameParameters = {} as GameParameters

  constructor(){}

  ngOnInit(){
    this.hideGameSettings = true
    this.hideOptions = false
  }

  public startGame(){
    const boardSize = 64
    let minesNumber = this.minesNumber?.nativeElement.value
    this.gameParameters = new GameParameters(minesNumber, boardSize)

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

}
