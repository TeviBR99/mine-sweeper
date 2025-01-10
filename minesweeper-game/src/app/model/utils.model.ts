export class RandomIntUtils{

  constructor(public min: number, public max: number){}

  public getRandomInt(): number {
    return Math.floor(Math.random() * (this.max - this.min)) + this.min;
  }

}

export enum CellState{
  CLOSED = 0,
  CLOSED_WITH_MARKER = 1,
  OPENED = 2
}
