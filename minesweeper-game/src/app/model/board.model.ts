export class Board{
  public rows : any[] = []
  public cells: any[] = []
  public mines: any[] = []

  constructor(
    public minesNumber: number,
    public boardSize: number
  ) {
    this.buildBoard()
  }

  public getBoardWithMines(){

  }

  public buildBoard(){
    let cell : any[] = []
    let rows: any[] = []
    for(let i=0; i<this.boardSize; i++){
      cell = []
      for(let j=0; j<this.boardSize; j++){
        cell.push(0)
      }
      this.rows.push(cell)
    }
    console.log(this.rows)
    // this.setMines()
  }

  private setMines(){
    for(let i=this.minesNumber; i>=0; i--){
      const xYaxys = this.getRandomInt(0,this.boardSize-1)
      const yAxys = this.getRandomInt(0,this.boardSize-1)
      this.checkIfThereIsNoMine(xYaxys, yAxys)
    }
  }

  private getRandomInt(min: number, max: number){
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private checkIfThereIsNoMine(xAxys: number, yAxys: number){
    let hasMine: boolean = false
    if(this.cells){
      const row = this.cells[xAxys]
      const cell = row[yAxys]
      hasMine = cell ? true : false
      console.log("cell: ", cell)
    }
    console.log("hasMine: ", hasMine)
    return hasMine;
  }



}
