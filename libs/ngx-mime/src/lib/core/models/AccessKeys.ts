export class AccessKeys {
  public static PAGEDOWN = [34];
  public static PAGEUP = [33];
  public static ARROWRIGHT = [39];
  public static ARROWLEFT = [37];
  public static firstCanvasGroupCodes = [36]; // Home
  public static lastCanvasGroupCodes = [35]; // End
  public static zoomInCodes = [107, 187, 171]; // +, numpad and standard position, Firefox uses 171 for standard position
  public static zoomOutCodes = [109, 189, 173]; // -, numpad and standard position, Firefox uses 173 for standard position
  public static zoomHomeCodes = [96, 48]; // 0
  public static nextHit = [78]; // n
  public static previousHit = [80]; // p
  public static toggleSearchDialogCodes = [83]; // s
  public static toggleInformationDialogCodes = [67]; // C TODO Should this key change?
  public static toggleFullscreenCodes = [70]; // f
  public static resetSearch = [83]; // s
  public static rotateCwCodes = [82]; // r
  public static recognizedTextContentCodes = [84]; // t
  private keyCode: number;
  private altKey = false;
  private shiftKey = false;
  private ctrlkey = false;
  private metaKey = false;
  private event: KeyboardEvent;

  constructor(event: KeyboardEvent) {
    this.event = event;
    this.keyCode = event.keyCode;
    this.altKey = event.altKey;
    this.shiftKey = event.shiftKey;
    this.ctrlkey = event.ctrlKey;
    this.metaKey = event.metaKey;
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

  public isFirstCanvasGroupKeys() {
    return (
      !this.isMultiKeys() &&
      this.arrayContainsKeys(AccessKeys.firstCanvasGroupCodes)
    );
  }

  public isLastCanvasGroupKeys() {
    return (
      !this.isMultiKeys() &&
      this.arrayContainsKeys(AccessKeys.lastCanvasGroupCodes)
    );
  }

  public isSliderKeys() {
    return (
      this.isArrowLeftKeys() ||
      this.isArrowRightKeys() ||
      this.isPageDownKeys() ||
      this.isPageUpKeys() ||
      this.isFirstCanvasGroupKeys() ||
      this.isLastCanvasGroupKeys()
    );
  }

  public isZoomInKeys() {
    return (
      !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.zoomInCodes)
    );
  }

  public isZoomOutKeys() {
    return (
      !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.zoomOutCodes)
    );
  }

  public isZoomHomeKeys() {
    return (
      !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.zoomHomeCodes)
    );
  }

  public isNextHitKeys() {
    return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.nextHit);
  }

  public isPreviousHitKeys() {
    return (
      !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.previousHit)
    );
  }

  public isSearchDialogKeys() {
    return (
      !this.isMultiKeys() &&
      this.arrayContainsKeys(AccessKeys.toggleSearchDialogCodes)
    );
  }

  public isInformationDialogKeys() {
    return (
      !this.isMultiKeys() &&
      this.arrayContainsKeys(AccessKeys.toggleInformationDialogCodes)
    );
  }

  public isFullscreenKeys() {
    return (
      !this.isMultiKeys() &&
      this.arrayContainsKeys(AccessKeys.toggleFullscreenCodes)
    );
  }

  public isResetSearchKeys() {
    return (
      !this.isMetaPressed() &&
      this.isShiftPressed() &&
      this.arrayContainsKeys(AccessKeys.resetSearch)
    );
  }

  public isRotateKeys() {
    return (
      !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.rotateCwCodes)
    );
  }

  public isRecognizedTextContentKeys() {
    return (
      !this.isMultiKeys() &&
      this.arrayContainsKeys(AccessKeys.recognizedTextContentCodes)
    );
  }

  execute(fn: Function): void {
    this.event.preventDefault();
    fn();
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

  private isMetaPressed(): boolean {
    return this.metaKey;
  }
}
