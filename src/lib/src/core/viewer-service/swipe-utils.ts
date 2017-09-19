export class SwipeUtils {

  public getSwipeDirection(start: number, end: number) {
    return start > end ? 'left' : 'right';
  }

}
