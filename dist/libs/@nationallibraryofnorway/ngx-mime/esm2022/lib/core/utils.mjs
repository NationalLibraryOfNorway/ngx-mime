export class Utils {
    static numbersAreClose(thing, realThing, epsilon) {
        return Math.abs(thing - realThing) <= epsilon;
    }
    static shortenDecimals(zoom, precision) {
        const short = Number(zoom).toPrecision(precision);
        return Number(short);
    }
    static getScaleFactor(physicalScale, ignorePhysicalScale = false) {
        return ignorePhysicalScale ? 1 : (physicalScale ? physicalScale : 1) * 400;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sS0FBSztJQUNoQixNQUFNLENBQUMsZUFBZSxDQUNwQixLQUFhLEVBQ2IsU0FBaUIsRUFDakIsT0FBZTtRQUVmLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksT0FBTyxDQUFDO0lBQ2hELENBQUM7SUFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLElBQVMsRUFBRSxTQUFpQjtRQUNqRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxNQUFNLENBQUMsY0FBYyxDQUNuQixhQUFpQyxFQUNqQyxtQkFBbUIsR0FBRyxLQUFLO1FBRTNCLE9BQU8sbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQzdFLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBVdGlscyB7XG4gIHN0YXRpYyBudW1iZXJzQXJlQ2xvc2UoXG4gICAgdGhpbmc6IG51bWJlcixcbiAgICByZWFsVGhpbmc6IG51bWJlcixcbiAgICBlcHNpbG9uOiBudW1iZXJcbiAgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIE1hdGguYWJzKHRoaW5nIC0gcmVhbFRoaW5nKSA8PSBlcHNpbG9uO1xuICB9XG4gIHN0YXRpYyBzaG9ydGVuRGVjaW1hbHMoem9vbTogYW55LCBwcmVjaXNpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qgc2hvcnQgPSBOdW1iZXIoem9vbSkudG9QcmVjaXNpb24ocHJlY2lzaW9uKTtcbiAgICByZXR1cm4gTnVtYmVyKHNob3J0KTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRTY2FsZUZhY3RvcihcbiAgICBwaHlzaWNhbFNjYWxlOiBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgaWdub3JlUGh5c2ljYWxTY2FsZSA9IGZhbHNlXG4gICk6IG51bWJlciB7XG4gICAgcmV0dXJuIGlnbm9yZVBoeXNpY2FsU2NhbGUgPyAxIDogKHBoeXNpY2FsU2NhbGUgPyBwaHlzaWNhbFNjYWxlIDogMSkgKiA0MDA7XG4gIH1cbn1cbiJdfQ==