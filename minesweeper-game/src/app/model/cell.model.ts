import { CellState } from "./utils.model";
export class Cell{
  public neighborMines: number;

  constructor(public state: CellState,
    public mine: boolean,
  ){
    this.neighborMines = 0
  }
}
