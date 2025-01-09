import { Utils } from "./utils.model"

export class Board{
  public rows : any[] = []
  public mines: any[] = []

  constructor(
    public minesNumber: number,
    public boardSize: number
  ) {
    this.buildBoard()
  }

  private buildBoard(){
    let cell : any[] = []
    let rows: any[] = []
    for(let i=0; i<this.boardSize; i++){
      cell = []
      for(let j=0; j<this.boardSize; j++){
        cell.push(false)
      }
      this.rows.push(cell)
    }
    this.setMines()
  }

  private setMines(){
    let utilsModel : Utils = new Utils(0, this.boardSize-1)
    let mineSet = 0;
    while(mineSet < this.minesNumber){
      const xYaxys = utilsModel.getRandomInt(0,this.boardSize-1)
      const yAxys = utilsModel.getRandomInt(0,this.boardSize-1)
      if(this.checkIfThereIsNoMine(xYaxys, yAxys)){
        this.rows[xYaxys][yAxys] = true
        mineSet++
      }
    }
  }

  private checkIfThereIsNoMine(xAxys: number, yAxys: number){
    return this.rows[xAxys][yAxys] === false;
  }

}
