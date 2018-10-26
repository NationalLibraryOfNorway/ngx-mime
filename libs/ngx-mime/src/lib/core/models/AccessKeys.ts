export class AccessKeys {
  public static PAGEDOWN = ['PageDown'];
  public static PAGEUP = ['PageUp'];
  public static ARROWRIGHT = ['ArrowRight'];
  public static ARROWLEFT = ['ArrowLeft'];
  public static firstCanvasGroupCodes = ['Home'];
  public static lastCanvasGroupCodes = ['End'];
  public static zoomInCodes = ['NumpadAdd'];
  public static zoomOutCodes = ['NumpadSubtract'];
  public static zoomHomeCodes = ['Digit0', 'Numpad0'];
  public static nextHit = ['KeyN'];
  public static previousHit = ['KeyP'];
  public static toggleSearchDialogCodes = ['KeyS'];
  public static toggleContentsDialogCodes = ['KeyC'];
  public static toggleFullscreenCodes = ['KeyF'];
  public static resetSearch = ['KeyS'];
  private key: string;
  private altKey = false;
  private shiftKey = false;
  private ctrlkey = false;

  constructor(event: KeyboardEvent) {
    this.key = event.code;
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

  public isZoomInKeys() {
    console.log();
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

  public isContentsDialogKeys() {
    return (
      !this.isMultiKeys() &&
      this.arrayContainsKeys(AccessKeys.toggleContentsDialogCodes)
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
      this.isShiftPressed() && this.arrayContainsKeys(AccessKeys.resetSearch)
    );
  }

  private isMultiKeys(): boolean {
    return this.altKey || this.shiftKey || this.ctrlkey;
  }

  private arrayContainsKeys(keys: string[]): boolean {
    return keys.indexOf(this.key) > -1;
  }

  private isShiftPressed(): boolean {
    return this.shiftKey;
  }
}
