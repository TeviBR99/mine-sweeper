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
    let xAxys = x
    let yAxys = y
    let yAxysTowardsLeft = y-1
    let xAxysTowardsTop = x-1
    let openCell = true
    let openedCells = 0;
    do{
      let colNumbersOpened = 0
      if(openedCells === 0 && this.rows[xAxys][yAxys].neighborMines > 0 || (this.isThereMine(xAxys, yAxys) || this.isThereMine(xAxys, yAxysTowardsLeft) || this.isThereMine(xAxysTowardsTop, yAxysTowardsLeft) || this.isThereMine(xAxysTowardsTop, yAxys)) ){
        this.changeCellState(xAxys, yAxys, CellState.OPENED)
        openCell = false
      }else{
        this.changeCellState(xAxys, yAxys, CellState.OPENED)
        colNumbersOpened += this.rows[xAxys][yAxys]?.neighborMines > 0 ? 1 : 0
        openedCells++

        if(this.rows[xAxys][yAxys]?.neighborMines === 0){
          yAxys++
        }else{
          colNumbersOpened++
        }

        this.changeCellState(xAxys, yAxysTowardsLeft, CellState.OPENED)
        colNumbersOpened += this.rows[xAxys][yAxysTowardsLeft]?.neighborMines > 0 ? 1 : 0
        openedCells++

        if(this.rows[xAxys][yAxysTowardsLeft]?.neighborMines === 0){
          yAxysTowardsLeft--
        }else{
          if(colNumbersOpened > 1){
            yAxysTowardsLeft = y-1
            yAxys = y

            if(xAxysTowardsTop > 0){
              xAxysTowardsTop--
            }

            if(xAxys < this.boardSize-1){
              xAxys++
            }
          }
        }

      }

    }while(openCell && this.allCoordinatesInLimits([xAxys, xAxysTowardsTop, yAxys, yAxysTowardsLeft]));
  }


}
