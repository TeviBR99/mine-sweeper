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

    for(let mineSet = 0; mineSet < this.minesNumber; ){
      const xAxys = utilsModel.getRandomInt()
      const yAxys = utilsModel.getRandomInt()
      if(!this.isThereMine(xAxys, yAxys)){
        const cell = this.rows[xAxys][yAxys]
        cell.mine = true
        cell.neighborMines = -1
        mineSet++
      }
    }
    this.setNeighbourMines()
  }

  private setNeighbourMines(){
    for(let xAxys=0; xAxys<this.boardSize; xAxys++){
      for(let yAxys=0; yAxys<this.boardSize; yAxys++){
        const cell = this.rows[xAxys][yAxys]
        if(cell.neighborMines > -1){
          cell.neighborMines = this.minesAround(xAxys, yAxys)
        }
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

  public changeCellState(rowIndex: number, cellIndex: number, state: CellState){
    if(this.rows){
      this.rows[rowIndex][cellIndex].state = state
    }
  }

  public openCells(x: number, y: number){
    const isBorder = x === 0 || x === this.boardSize-1
    let skip : boolean = false
    console.log("Coordinates: ", x, ",", y)

    //Upper rows
    for(let i=x; i>=0; i--){
      skip = this.open(isBorder ? x : i, y, true)
      skip = this.open(isBorder ? x : i, y, false)
      if(skip){
        console.log("Upper rows: ", i)
        break;
      }
    }

    //Lower rows
    for(let i=x; i<this.boardSize; i++){
      skip = this.open(isBorder ? x : i, y, true)
      skip = this.open(isBorder ? x : i, y, false)

      if(skip){
        console.log("Lower rows: ", i)
        break;
      }
    }
  }

  private open(rowIndex: number, cellIndex: number, leftCheck: boolean){
    let stopped: boolean = false
    const cell : Cell = this.rows[rowIndex][cellIndex]
    // console.log("cell: ", cell)
    if(cellIndex === 0 || cellIndex === this.boardSize-1 || cell.neighborMines >= 0){
      if(!cell.mine){
        this.changeCellState(rowIndex, cellIndex, CellState.OPENED)
        stopped = cell.neighborMines >= 0
      }
    }else{
      if(!cell.mine){
        this.changeCellState(rowIndex, cellIndex, CellState.OPENED)
        this.open(rowIndex, leftCheck ? cellIndex-1 : cellIndex+1, leftCheck)
      }
    }
    return stopped;
  }

}
