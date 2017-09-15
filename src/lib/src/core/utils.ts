export class Utils {
  static numbersAreClose(thing: number, realThing: number, epsilon: number): boolean {
    return (Math.abs(thing - realThing) <= epsilon);
  }
}