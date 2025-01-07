import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private minesNumber: number = 0
  private gameHasStarted: boolean = false

  constructor() { }

  public getMinesNumber(){
    return this.minesNumber
  }

  public setMinesNumber(mines: number){
    this.minesNumber = mines
  }

  public setGameStarted(hasStarted: boolean){
    this.gameHasStarted = hasStarted
  }

}
