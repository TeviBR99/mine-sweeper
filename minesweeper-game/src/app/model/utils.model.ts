export class Utils{

  constructor(public min: number, public max: number){}

  public getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
