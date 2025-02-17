export class Utils {
  static numbersAreClose(
    thing: number,
    realThing: number,
    epsilon: number,
  ): boolean {
    return Math.abs(thing - realThing) <= epsilon;
  }
  static shortenDecimals(zoom: any, precision: number): number {
    const short = Number(zoom).toPrecision(precision);
    return Number(short);
  }

  static getScaleFactor(
    physicalScale: number | undefined,
    ignorePhysicalScale = false,
  ): number {
    return ignorePhysicalScale ? 1 : (physicalScale ? physicalScale : 1) * 400;
  }
}
