export declare class Utils {
    static numbersAreClose(thing: number, realThing: number, epsilon: number): boolean;
    static shortenDecimals(zoom: any, precision: number): number;
    static getScaleFactor(physicalScale: number | undefined, ignorePhysicalScale?: boolean): number;
}
