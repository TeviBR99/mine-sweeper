import { Cell } from "./cell.model"
import { CellState, RandomIntUtils } from "./utils.model"

export class Board{
  public rows : any[] = []
  public bombOpened: boolean = false
  public numberIsOpened: boolean = false
  private openedCellsWithBombsNearby: {xPoint: number, yPoint: number}[] = []



  constructor(
    public minesNumber: number,
    public boardSize: number
  ) {
    this.buildBoard()
  }

  private coordinatesInLimits = (x: number, y: number) => {return this.coordinateInLimit(x) && this.coordinateInLimit(y)}
  private coordinateInLimit = (n: number) => {return n >= 0 && n < this.boardSize}

  private allCoordinatesInLimits( coordinates: number[]){
    return coordinates.filter( c => this.coordinateInLimit(c)).length > 0
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
    for(let i=x-1; i<=x+1; i++){
      for(let j=y-1; j<=y+1; j++){
        mines += this.isThereMine(i, j) ? 1 : 0;
      }
    }
    return mines;
  }

  private isThereMine(xAxys: number, yAxys: number){
    let mine = false;
    if(this.coordinatesInLimits(xAxys, yAxys)){
      mine = this.rows[xAxys][yAxys].mine;
    }
    return mine
  }

  public changeCellState(rowIndex: number, cellIndex: number, state: CellState){
    let check = false;
    if(this.rows && this.coordinatesInLimits(rowIndex, cellIndex)){
      this.rows[rowIndex][cellIndex].state = state
      check = true
    }
    return check;
  }

  public open(x: number, y: number){
    console.log("(",x,",",y,")")
    this.changeCellState(x, y, CellState.OPENED)
    if(this.minesAround(x,y) === 0 && !this.isThereMine(x,y)){
      this.openAdjacentCells(x,y)
    }
  }

  public openAdjacentCells(x: number, y: number){
    for(let rowsAround = x-1; rowsAround <= x+1; rowsAround++ ){
      this.cellsAround(rowsAround, y)
    }
  }

  public cellsAround(x: number, y: number){
    for(let j=y-1; j<=y+1; j++){
      if(!this.isThereMine(x,y)){
        this.changeCellState(x, j, CellState.OPENED)
      }
    }
  }
}
