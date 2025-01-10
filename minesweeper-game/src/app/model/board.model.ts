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
    let cell : Cell[]
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
      const xAxys = utilsModel.getRandomInt()
      const yAxys = utilsModel.getRandomInt()
      if(!this.isThereMine(xAxys, yAxys)){
        this.rows[xAxys][yAxys].mine = true
        mineSet++
      }
    }
    this.setNeighbourMines()
  }

  private setNeighbourMines(){
    for(let xAxys=0; xAxys<this.boardSize; xAxys++){
      for(let yAxys=0; yAxys<this.boardSize; yAxys++){
       this.rows[xAxys][yAxys].neighborMines = this.minesAround(xAxys, yAxys)
      }
    }
  }

  private minesAround(x: number, y: number){
    let mines : number = 0;
    const xTop = x-1
    const xBottom = x+1
    const yLeft = y-1
    const yRight = y+1

    mines += this.isThereMine(xTop, yLeft) ? 1 : 0;
    mines += this.isThereMine(xTop, y) ? 1 : 0;
    mines += this.isThereMine(xTop, yRight) ? 1 : 0;

    mines += this.isThereMine(x, yLeft) ? 1 : 0;
    mines += this.isThereMine(x, yRight) ? 1 : 0;

    mines += this.isThereMine(xBottom, yLeft) ? 1 : 0;
    mines += this.isThereMine(xBottom, y) ? 1 : 0;
    mines += this.isThereMine(xBottom, yRight) ? 1 : 0;

    return mines;
  }

  private isThereMine(xAxys: number, yAxys: number){
    let mine = false;
    if(xAxys >= 0 && xAxys < this.boardSize && yAxys >= 0 && yAxys < this.boardSize){
      mine = this.rows[xAxys][yAxys].mine;
    }
    return mine
  }

  public openCells(rowIndex: number, cellIndex: number, state: CellState){

  }

  public changeCellState(rowIndex: number, cellIndex: number, state: CellState){
    if(this.rows){
      this.rows[rowIndex][cellIndex].state = state
    }
  }

}
