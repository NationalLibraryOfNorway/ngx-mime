export class AccessKeys {
  public static PAGEDOWN = ['PageDown'];
  public static PAGEUP = ['PageUp'];
  public static ARROWRIGHT = ['ArrowRight'];
  public static ARROWLEFT = ['ArrowLeft'];
  public static firstCanvasGroupCodes = ['Home'];
  public static lastCanvasGroupCodes = ['End'];
  public static zoomInKeys = ['+'];
  public static zoomOutKeys = ['-'];
  public static zoomHomeCodes = ['0'];
  public static nextHit = ['n'];
  public static previousHit = ['p'];
  public static toggleSearchDialogKeys = ['s'];
  public static toggleContentsDialogKeys = ['c'];
  public static toggleFullscreenCodes = ['f'];
  public static resetSearch = ['s'];
  private key: string;

  constructor(event: KeyboardEvent) {
    this.key = event.key;
  }

  public isArrowRightKeys() {
    return this.arrayContainsKeys(AccessKeys.ARROWRIGHT);
  }

  public isArrowLeftKeys() {
    return this.arrayContainsKeys(AccessKeys.ARROWLEFT);
  }

  public isPageUpKeys() {
    return this.arrayContainsKeys(AccessKeys.PAGEUP);
  }

  public isPageDownKeys() {
    return this.arrayContainsKeys(AccessKeys.PAGEDOWN);
  }

  public isFirstCanvasGroupKeys() {
    return this.arrayContainsKeys(AccessKeys.firstCanvasGroupCodes);
  }

  public isLastCanvasGroupKeys() {
    return this.arrayContainsKeys(AccessKeys.lastCanvasGroupCodes);
  }

  public isZoomInKeys() {
    return this.arrayContainsKeys(AccessKeys.zoomInKeys);
  }

  public isZoomOutKeys() {
    return this.arrayContainsKeys(AccessKeys.zoomOutKeys);
  }

  public isZoomHomeKeys() {
    return this.arrayContainsKeys(AccessKeys.zoomHomeCodes);
  }

  public isNextHitKeys() {
    return this.arrayContainsKeys(AccessKeys.nextHit);
  }

  public isPreviousHitKeys() {
    return this.arrayContainsKeys(AccessKeys.previousHit);
  }

  public isSearchDialogKeys() {
    return this.arrayContainsKeys(AccessKeys.toggleSearchDialogKeys);
  }

  public isContentsDialogKeys() {
    return this.arrayContainsKeys(AccessKeys.toggleContentsDialogKeys);
  }

  public isFullscreenKeys() {
    return this.arrayContainsKeys(AccessKeys.toggleFullscreenCodes);
  }

  public isResetSearchKeys() {
    return this.arrayContainsKeys(AccessKeys.resetSearch);
  }

  private arrayContainsKeys(keys: string[]): boolean {
    return keys.indexOf(this.key) > -1;
  }
}
