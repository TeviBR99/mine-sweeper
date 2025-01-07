import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-game-options',
  standalone: true,
  imports: [],
  templateUrl: './game-options.component.html',
  styleUrl: './game-options.component.scss'
})
export class GameOptionsComponent {

  constructor(private router: Router){}

  public startGame(){
    this.router.navigate(['/play'])
  }

  public goToSettings(){
    this.router.navigate(['/game-settings']);
  }
}
