export class Utils{

  constructor(public min: number, public max: number){}

  public getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}

export enum CellState{
  OPENED = 0,
  CLOSED = 1,
  CLOSED_WITH_MARKER = 2,
  OPENED_WITH_MINE = 3,
  OPENED_WITHOUT_MINE = 4,
}
