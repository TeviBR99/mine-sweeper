import { Cell } from "./cell.model"
import { CellState, RandomIntUtils } from "./utils.model"

export class Board{
  public rows : any[] = []
  public bombOpened: boolean = false
  public numberIsOpened: boolean = false

  private inLimits = (x: number, y: number) => {return x >= 0 && x < this.boardSize && y >= 0 && y < this.boardSize}


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
    if(this.rows && this.inLimits(rowIndex, cellIndex)){
      this.rows[rowIndex][cellIndex].state = state
    }
  }

  public open(x: number, y: number){
    const top = x === 0 && y >= 0 && y < this.boardSize
    const left = x >= 0 && x < this.boardSize && y === 0
    const right = x >= 0 && x < this.boardSize && y === this.boardSize-1
    const bottom = x === this.boardSize-1 && y >= 0 && y < this.boardSize

    if(top){
      for(let i=y; i<this.boardSize; i++){
        const neighborMines = this.rows[x][i].neighborMines
        if(neighborMines >= 0){
          this.changeCellState(x, i, CellState.OPENED)
          if(neighborMines > 0){
            break;
          }
        }else{
          this.changeCellState(x, i, CellState.OPENED)
          break;
        }
      }

      for(let i=y; i>=0; i--){
        const neighborMines = this.rows[x][i].neighborMines
        if(neighborMines >= 0){
          this.changeCellState(x, i, CellState.OPENED)
          if(neighborMines > 0){
            break;
          }
        }else{
          this.changeCellState(x, i, CellState.OPENED)
          break;
        }
      }
    }else if(left){

    }else if(right){

    }else if(bottom){

    }else{

    }
  }


  private isMineOpen(x: number, y: number){
    return this.rows[x][y].mine
  }
}
