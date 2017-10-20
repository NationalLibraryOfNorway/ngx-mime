export class AccessKeys {
  private static nextPageCodes = [34, 39, 78]; // PageDown, ArrowRight, n
  private static previousPageCodes = [33, 37, 80]; // PageUp, ArrowLeft, p
  private static firstPageCodes = [36]; // Home
  private static lastPageCodes = [35]; // End
  private static zoomInCodes = [107, 187, 171]; // +, numpad and standard position, Firefox uses 171 for standard position
  private static zoomOutCodes = [109, 189, 173]; // -, numpad and standard position, Firefox uses 173 for standard position
  private static zoomHomeCodes = [96, 48]; // 0
  private static toggleSearchDialogCodes = [70]; // F
  private static toggleContentsDialogCodes = [67]; // C
  private static toggleFullscreenCodes = [70]; // f
  private keyCode: number;
  private altKey = false;
  private shiftKey = false;

  constructor(event: KeyboardEvent) {
    this.keyCode = event.keyCode;
    this.altKey = event.altKey;
    this.shiftKey = event.shiftKey;
  }

  public isNextPageKeys() {
    return AccessKeys.nextPageCodes.indexOf(this.keyCode) > -1;
  }

  public isPreviousPageKeys() {
    return AccessKeys.previousPageCodes.indexOf(this.keyCode) > -1;
  }

  public isFirstPageKeys() {
    return AccessKeys.firstPageCodes.indexOf(this.keyCode) > -1;
  }

  public isLastPageKeys() {
    return AccessKeys.lastPageCodes.indexOf(this.keyCode) > -1;
  }

  public isZoomInKeys() {
    return AccessKeys.zoomInCodes.indexOf(this.keyCode) > -1;
  }

  public isZoomOutKeys() {
    return AccessKeys.zoomOutCodes.indexOf(this.keyCode) > -1;
  }

  public isZoomHomeKeys() {
    return AccessKeys.zoomHomeCodes.indexOf(this.keyCode) > -1;
  }

  public isSearchDialogKeys() {
    return AccessKeys.toggleSearchDialogCodes.indexOf(this.keyCode) > -1 && this.isShiftAltCombination();
  }

  public isContentsDialogKeys() {
    return AccessKeys.toggleContentsDialogCodes.indexOf(this.keyCode) > -1 && this.isShiftAltCombination();
  }

  public isFullscreenKeys() {
    return AccessKeys.toggleFullscreenCodes.indexOf(this.keyCode) > -1;
  }

  private isShiftAltCombination(): boolean {
    return this.shiftKey && this.altKey;
  }
}
