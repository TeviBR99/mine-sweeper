import { CommonModule } from '@angular/common';
import { Component, ElementRef, input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-options.component.html',
  styleUrl: './game-options.component.scss'
})
export class GameOptionsComponent implements OnInit{

  public hideGameSettings: boolean = false
  public hideOptions: boolean = false
  @ViewChild('minesNumber') minesNumber: ElementRef | undefined;

  constructor(private router: Router, private gameService: GameService){}

  ngOnInit(){
    this.hideGameSettings = true
    this.hideOptions = false
  }

  public startGame(){
    this.hideGameSettings = true
    this.hideOptions = this.hideGameSettings
    this.router.navigate(['/play'])
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
