export class Utils{

  constructor(public min: number, public max: number){}

  public getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}

export enum CellState{
  CLOSED_WITHOUT_MINE = 1,
  CLOSED_WITH_MINE = 2,
  CLOSED_WITH_MARKER = 3,
  OPENED_WITH_MINE = 4,
  OPENED_WITHOUT_MINE = 5,
}
