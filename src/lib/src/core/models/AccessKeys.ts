export class AccessKeys {
  private static nextPageKeys = ['PageDown', 'ArrowRight', 'n'];
  private static previousPageKeys = ['PageUp', 'ArrowLeft', 'p'];
  private static firstPageKeys = ['Home'];
  private static lastPageKeys = ['End'];
  private static zoomInKeys = ['+'];
  private static zoomOutKeys = ['-'];
  private static zoomHomeKeys = ['0'];
  private static toggleSearchDialogKeys = ['F'];
  private static toggleContentsDialogKeys = ['C'];
  private static toggleFullscreenKeys = ['f'];
  private key: string;
  private altKey = false;
  private shiftKey = false;

  constructor(event: KeyboardEvent) {
    this.key = event.key;
    this.altKey = event.altKey;
    this.shiftKey = event.shiftKey;
  }

  public isNextPageKeys() {
    return AccessKeys.nextPageKeys.indexOf(this.key) > -1;
  }

  public isPreviousPageKeys() {
    return AccessKeys.previousPageKeys.indexOf(this.key) > -1;
  }

  public isFirstPageKeys() {
    return AccessKeys.firstPageKeys.indexOf(this.key) > -1;
  }

  public isLastPageKeys() {
    return AccessKeys.lastPageKeys.indexOf(this.key) > -1;
  }

  public isZoomInKeys() {
    return AccessKeys.zoomInKeys.indexOf(this.key) > -1;
  }

  public isZoomOutKeys() {
    return AccessKeys.zoomOutKeys.indexOf(this.key) > -1;
  }

  public isZoomHomeKeys() {
    return AccessKeys.zoomHomeKeys.indexOf(this.key) > -1;
  }

  public isSearchDialogKeys() {
    return AccessKeys.toggleSearchDialogKeys.indexOf(this.key) > -1 && this.isShiftAltCombination();
  }

  public isContentsDialogKeys() {
    return AccessKeys.toggleContentsDialogKeys.indexOf(this.key) > -1 && this.isShiftAltCombination();
  }

  public isFullscreenKeys() {
    return AccessKeys.toggleFullscreenKeys.indexOf(this.key) > -1;
  }

  private isShiftAltCombination(): boolean {
    return this.shiftKey && this.altKey;
  }
}
