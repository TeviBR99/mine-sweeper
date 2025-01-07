import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-game-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-options.component.html',
  styleUrl: './game-options.component.scss'
})
export class GameOptionsComponent {

  public hideOptions: boolean = false

  constructor(private router: Router){}

  public startGame(){
    this.hideOptions = true
    this.router.navigate(['/play'])
  }

  public goToSettings(){
    this.hideOptions = true
    this.router.navigate(['/game-settings']);
  }
}
