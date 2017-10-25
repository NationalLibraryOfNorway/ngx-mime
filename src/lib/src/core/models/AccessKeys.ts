export class AccessKeys {
  private static nextPageCodes = [34, 39, 78]; // PageDown, ArrowRight, n
  private static previousPageCodes = [33, 37, 80]; // PageUp, ArrowLeft, p
  private static firstPageCodes = [36]; // Home
  private static lastPageCodes = [35]; // End
  private static zoomInCodes = [107, 187, 171]; // +, numpad and standard position, Firefox uses 171 for standard position
  private static zoomOutCodes = [109, 189, 173]; // -, numpad and standard position, Firefox uses 173 for standard position
  private static zoomHomeCodes = [96, 48]; // 0
  private static toggleSearchDialogCodes = [83]; // s
  private static toggleContentsDialogCodes = [67]; // C
  private static toggleFullscreenCodes = [70]; // f
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

  public isNextPageKeys() {
    return !this.isMultiKeys() && AccessKeys.nextPageCodes.indexOf(this.keyCode) > -1;
  }

  public isPreviousPageKeys() {
    return !this.isMultiKeys() && AccessKeys.previousPageCodes.indexOf(this.keyCode) > -1;
  }

  public isFirstPageKeys() {
    return !this.isMultiKeys() && AccessKeys.firstPageCodes.indexOf(this.keyCode) > -1;
  }

  public isLastPageKeys() {
    return !this.isMultiKeys() && AccessKeys.lastPageCodes.indexOf(this.keyCode) > -1;
  }

  public isZoomInKeys() {
    return !this.isMultiKeys() && AccessKeys.zoomInCodes.indexOf(this.keyCode) > -1;
  }

  public isZoomOutKeys() {
    return !this.isMultiKeys() && AccessKeys.zoomOutCodes.indexOf(this.keyCode) > -1;
  }

  public isZoomHomeKeys() {
    return !this.isMultiKeys() && AccessKeys.zoomHomeCodes.indexOf(this.keyCode) > -1;
  }

  public isSearchDialogKeys() {
    return !this.isMultiKeys() && AccessKeys.toggleSearchDialogCodes.indexOf(this.keyCode) > -1;
  }

  public isContentsDialogKeys() {
    return !this.isMultiKeys() && AccessKeys.toggleContentsDialogCodes.indexOf(this.keyCode) > -1;
  }

  public isFullscreenKeys() {
    return !this.isMultiKeys() && AccessKeys.toggleFullscreenCodes.indexOf(this.keyCode) > -1;
  }

  private isMultiKeys(): boolean {
    return this.altKey || this.shiftKey || this.ctrlkey;
  }
}
