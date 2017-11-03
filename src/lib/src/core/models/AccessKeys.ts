export class AccessKeys {
  private static PAGEDOWN = [34];
  private static PAGEUP = [33];
  private static ARROWRIGHT = [39];
  private static ARROWLEFT = [37];
  private static firstPageCodes = [36]; // Home
  private static lastPageCodes = [35]; // End
  private static zoomInCodes = [107, 187, 171]; // +, numpad and standard position, Firefox uses 171 for standard position
  private static zoomOutCodes = [109, 189, 173]; // -, numpad and standard position, Firefox uses 173 for standard position
  private static zoomHomeCodes = [96, 48]; // 0
  private static nextHit = [78]; // n
  private static previousHit = [80]; // p
  private static toggleSearchDialogCodes = [83]; // s
  private static toggleContentsDialogCodes = [67]; // C
  private static toggleFullscreenCodes = [70]; // f
  private static resetSearch = [83]; // s
  private keyCode: number;
  private altKey = false;
  private shiftKey = false;
  private ctrlkey = false;

  constructor(event: KeyboardEvent) {
    this.keyCode = event.keyCode;
    this.altKey = event.altKey;
    this.shiftKey = event.shiftKey;
    this.ctrlkey = event.ctrlKey;
  }

  public isArrowRightKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.ARROWRIGHT);
  }

  public isArrowLeftKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.ARROWLEFT);
  }

  public isPageUpKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.PAGEUP);
  }

  public isPageDownKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.PAGEDOWN);
  }

  public isNextPageKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.nextPageCodes);
  }

  public isPreviousPageKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.previousPageCodes);
  }

  public isFirstPageKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.firstPageCodes);
  }

  public isLastPageKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.lastPageCodes);
  }

  public isZoomInKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.zoomInCodes);
  }

  public isZoomOutKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.zoomOutCodes);
  }

  public isZoomHomeKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.zoomHomeCodes);
  }

  public isNextHitKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.nextHit);
  }

  public isPreviousHitKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.previousHit);
  }

  public isSearchDialogKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.toggleSearchDialogCodes);
  }

  public isContentsDialogKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.toggleContentsDialogCodes);
  }

  public isFullscreenKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.toggleFullscreenCodes);
  }

  public isResetSearchKeys() {
    return this.isShiftPressed() && this.arrayContainsKeys(AccessKeys.resetSearch);
  }

  private isMultiKeys(): boolean {
    return this.altKey || this.shiftKey || this.ctrlkey;
  }

  private arrayContainsKeys(keys: number[]): boolean {
    return keys.indexOf(this.keyCode) > -1;
  }

  private isShiftPressed(): boolean {
    return this.shiftKey;
  }
}
