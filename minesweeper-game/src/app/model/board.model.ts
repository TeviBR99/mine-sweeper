import { Cell } from "./cell.model"
import { CellState, RandomIntUtils } from "./utils.model"

export class Board{
  public rows : any[] = []

  constructor(
    public minesNumber: number,
    public boardSize: number
  ) {
    this.buildBoard()
  }

  private buildBoard(){
    let cell : Cell[] = []
    for(let i=0; i<this.boardSize; i++){
      cell = []
      for(let j=0; j<this.boardSize; j++){
        cell.push(new Cell(CellState.CLOSED, false))
      }
      this.rows.push(cell)
    }
    this.setMines()
  }

  private setMines(){
    const min = 0
    const max = this.boardSize-1
    let utilsModel : RandomIntUtils = new RandomIntUtils(min, max)
    let mineSet = 0;

    while(mineSet < this.minesNumber){
      const xYaxys = utilsModel.getRandomInt()
      const yAxys = utilsModel.getRandomInt()
      if(this.checkIfThereIsNoMine(xYaxys, yAxys)){
        this.rows[xYaxys][yAxys].mine = true
        mineSet++
      }
    }
  }

  private checkIfThereIsNoMine(xAxys: number, yAxys: number){
    return !this.rows[xAxys][yAxys].mine;
  }

  private setNeighbourMines(){

  }

}
