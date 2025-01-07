import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-settings.component.html',
  styleUrl: './game-settings.component.scss'
})
export class GameSettingsComponent {

  public hideOptions: boolean = false

  constructor(private router: Router){}

  public confirm(){
    /* Make some changes before going back to home-options */
    this.goBackToHomeOptions()
  }

  public cancel(){
    this.goBackToHomeOptions()
  }

  private goBackToHomeOptions(){
    this.router.navigate(['home-options'])
  }

}
