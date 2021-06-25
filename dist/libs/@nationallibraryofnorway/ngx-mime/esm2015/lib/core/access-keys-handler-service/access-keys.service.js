import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentSearchDialogService } from '../../content-search-dialog/content-search-dialog.service';
import { ContentsDialogService } from '../../contents-dialog/contents-dialog.service';
import { CanvasService } from '../canvas-service/canvas-service';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeDomHelper } from '../mime-dom-helper';
import { ModeService } from '../mode-service/mode.service';
import { AccessKeys } from '../models/AccessKeys';
import { ViewerMode } from '../models/viewer-mode';
import { ViewingDirection } from '../models/viewing-direction';
import { ContentSearchNavigationService } from '../navigation/content-search-navigation-service/content-search-navigation.service';
import { ViewerService } from '../viewer-service/viewer.service';
export class AccessKeysService {
    constructor(viewerService, canvasService, modeService, iiifManifestService, iiifContentSearchService, contentSearchDialogService, contentsDialogService, mimeDomHelper, contentSearchNavigationService) {
        this.viewerService = viewerService;
        this.canvasService = canvasService;
        this.modeService = modeService;
        this.iiifManifestService = iiifManifestService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.contentSearchDialogService = contentSearchDialogService;
        this.contentsDialogService = contentsDialogService;
        this.mimeDomHelper = mimeDomHelper;
        this.contentSearchNavigationService = contentSearchNavigationService;
        this.isSearchable = false;
        this.hasHits = false;
        this.disabledKeys = [];
        this.subscriptions = new Subscription();
        this.invert = false;
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            if (manifest) {
                this.isSearchable = this.isManifestSearchable(manifest);
                this.invert = manifest.viewingDirection === ViewingDirection.RTL;
            }
        }));
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((result) => {
            this.hasHits = result.hits.length > 0;
        }));
    }
    destroy() {
        this.unsubscribe();
    }
    handleKeyEvents(event) {
        const accessKeys = new AccessKeys(event);
        if (!this.isKeyDisabled(event.keyCode)) {
            if (accessKeys.isArrowLeftKeys()) {
                if (!this.isZoomedIn()) {
                    this.invert
                        ? this.goToNextCanvasGroup()
                        : this.goToPreviousCanvasGroup();
                }
            }
            else if (accessKeys.isArrowRightKeys()) {
                if (!this.isZoomedIn()) {
                    this.invert
                        ? this.goToPreviousCanvasGroup()
                        : this.goToNextCanvasGroup();
                }
            }
            else if (accessKeys.isFirstCanvasGroupKeys()) {
                this.goToFirstCanvasGroup();
            }
            else if (accessKeys.isLastCanvasGroupKeys()) {
                this.goToLastCanvasGroup();
            }
            else if (accessKeys.isNextHitKeys() && this.hasHits) {
                this.goToNextHit();
            }
            else if (accessKeys.isPreviousHitKeys() && this.hasHits) {
                this.goToPreviousHit();
            }
            else if (accessKeys.isFullscreenKeys()) {
                this.toggleFullscreen();
            }
            else if (accessKeys.isSearchDialogKeys() && this.isSearchable) {
                this.toggleSearchDialog();
            }
            else if (accessKeys.isContentsDialogKeys()) {
                this.toggleContentsDialog();
            }
            else if (accessKeys.isResetSearchKeys()) {
                this.resetSearch();
            }
            else if (accessKeys.isPageDownKeys()) {
                this.goToNextCanvasGroup();
            }
            else if (accessKeys.isPageUpKeys()) {
                this.goToPreviousCanvasGroup();
            }
            else if (accessKeys.isZoomInKeys()) {
                this.zoomIn();
            }
            else if (accessKeys.isZoomOutKeys()) {
                this.zoomOut();
            }
            else if (accessKeys.isZoomHomeKeys()) {
                this.zoomHome();
            }
            else if (accessKeys.isRotateKeys()) {
                this.rotateClockWise();
            }
        }
    }
    goToNextCanvasGroup() {
        this.viewerService.goToNextCanvasGroup();
    }
    goToPreviousCanvasGroup() {
        this.viewerService.goToPreviousCanvasGroup();
    }
    goToFirstCanvasGroup() {
        this.viewerService.goToCanvasGroup(0, false);
    }
    goToLastCanvasGroup() {
        this.viewerService.goToCanvasGroup(this.canvasService.numberOfCanvasGroups - 1, false);
    }
    rotateClockWise() {
        this.viewerService.rotate();
        this.mimeDomHelper.setFocusOnViewer();
    }
    goToNextHit() {
        this.contentSearchNavigationService.goToNextCanvasGroupHit();
    }
    goToPreviousHit() {
        this.contentSearchNavigationService.goToPreviousCanvasGroupHit();
    }
    zoomIn() {
        if (this.modeService.mode === ViewerMode.DASHBOARD) {
            this.modeService.toggleMode();
        }
        else {
            this.viewerService.zoomIn();
        }
    }
    zoomOut() {
        if (this.modeService.mode === ViewerMode.PAGE) {
            this.modeService.toggleMode();
        }
        else if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
            this.viewerService.zoomOut();
        }
    }
    zoomHome() {
        if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
            this.viewerService.home();
        }
    }
    toggleSearchDialog() {
        if (this.modeService.mode === ViewerMode.PAGE ||
            this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
            this.modeService.mode = ViewerMode.DASHBOARD;
            this.contentSearchDialogService.open();
        }
        else {
            if (this.contentSearchDialogService.isOpen()) {
                this.contentSearchDialogService.close();
            }
            else {
                this.contentSearchDialogService.open();
            }
        }
        this.contentsDialogService.close();
    }
    toggleContentsDialog() {
        if (this.modeService.mode === ViewerMode.PAGE ||
            this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
            this.modeService.mode = ViewerMode.DASHBOARD;
            this.contentsDialogService.open();
        }
        else {
            if (this.contentsDialogService.isOpen()) {
                this.contentsDialogService.close();
            }
            else {
                this.contentsDialogService.open();
            }
        }
        this.contentSearchDialogService.close();
    }
    toggleFullscreen() {
        this.mimeDomHelper.toggleFullscreen();
        this.mimeDomHelper.setFocusOnViewer();
    }
    resetSearch() {
        this.iiifContentSearchService.destroy();
    }
    isManifestSearchable(manifest) {
        return manifest.service ? true : false;
    }
    isZoomedIn() {
        return this.modeService.mode === ViewerMode.PAGE_ZOOMED;
    }
    updateDisabledKeys() {
        this.resetDisabledKeys();
        if (this.contentsDialogService.isOpen()) {
            this.disableKeysForContentDialog();
        }
        else if (this.contentSearchDialogService.isOpen()) {
            this.diableKeysForContentSearchDialog();
        }
    }
    disableKeysForContentDialog() {
        this.disabledKeys = this.disabledKeys
            .concat(AccessKeys.ARROWLEFT)
            .concat(AccessKeys.ARROWRIGHT);
    }
    diableKeysForContentSearchDialog() {
        this.disabledKeys = this.disabledKeys
            .concat(AccessKeys.ARROWLEFT)
            .concat(AccessKeys.ARROWRIGHT)
            .concat(AccessKeys.firstCanvasGroupCodes)
            .concat(AccessKeys.lastCanvasGroupCodes)
            .concat(AccessKeys.zoomInCodes)
            .concat(AccessKeys.zoomOutCodes)
            .concat(AccessKeys.zoomHomeCodes)
            .concat(AccessKeys.nextHit)
            .concat(AccessKeys.previousHit)
            .concat(AccessKeys.toggleSearchDialogCodes)
            .concat(AccessKeys.toggleContentsDialogCodes)
            .concat(AccessKeys.toggleFullscreenCodes);
    }
    resetDisabledKeys() {
        this.disabledKeys = [];
    }
    isKeyDisabled(keyCode) {
        this.updateDisabledKeys();
        return this.disabledKeys.indexOf(keyCode) > -1;
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
}
AccessKeysService.decorators = [
    { type: Injectable }
];
AccessKeysService.ctorParameters = () => [
    { type: ViewerService },
    { type: CanvasService },
    { type: ModeService },
    { type: IiifManifestService },
    { type: IiifContentSearchService },
    { type: ContentSearchDialogService },
    { type: ContentsDialogService },
    { type: MimeDomHelper },
    { type: ContentSearchNavigationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzLWtleXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2FjY2Vzcy1rZXlzLWhhbmRsZXItc2VydmljZS9hY2Nlc3Mta2V5cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUN2RyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN0RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDdEcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDckYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLG1GQUFtRixDQUFDO0FBQ25JLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUdqRSxNQUFNLE9BQU8saUJBQWlCO0lBTzVCLFlBQ1UsYUFBNEIsRUFDNUIsYUFBNEIsRUFDNUIsV0FBd0IsRUFDeEIsbUJBQXdDLEVBQ3hDLHdCQUFrRCxF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O1lBRlgsbUJBQW1CO1lBRG5CLHdCQUF3QjtZQUh4QiwwQkFBMEI7WUFDMUIscUJBQXFCO1lBSXJCLGFBQWE7WUFPYiw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29udGVudC1zZWFyY2gtZGlhbG9nL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRlbnRzRGlhbG9nU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbnRlbnRzLWRpYWxvZy9jb250ZW50cy1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3Qtc2VydmljZSc7XG5pbXBvcnQgeyBNaW1lRG9tSGVscGVyIH0gZnJvbSAnLi4vbWltZS1kb20taGVscGVyJztcbmltcG9ydCB7IE1vZGVTZXJ2aWNlIH0gZnJvbSAnLi4vbW9kZS1zZXJ2aWNlL21vZGUuc2VydmljZSc7XG5pbXBvcnQgeyBBY2Nlc3NLZXlzIH0gZnJvbSAnLi4vbW9kZWxzL0FjY2Vzc0tleXMnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vbW9kZWxzL3NlYXJjaC1yZXN1bHQnO1xuaW1wb3J0IHsgVmlld2VyTW9kZSB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItbW9kZSc7XG5pbXBvcnQgeyBWaWV3aW5nRGlyZWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdpbmctZGlyZWN0aW9uJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uL25hdmlnYXRpb24vY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi1zZXJ2aWNlL2NvbnRlbnQtc2VhcmNoLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdmlld2VyLXNlcnZpY2Uvdmlld2VyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWNjZXNzS2V5c1NlcnZpY2Uge1xuICBwcml2YXRlIGlzU2VhcmNoYWJsZSA9IGZhbHNlO1xuICBwcml2YXRlIGhhc0hpdHMgPSBmYWxzZTtcbiAgcHJpdmF0ZSBkaXNhYmxlZEtleXM6IG51bWJlcltdID0gW107XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJpdmF0ZSBpbnZlcnQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHZpZXdlclNlcnZpY2U6IFZpZXdlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgbW9kZVNlcnZpY2U6IE1vZGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZk1hbmlmZXN0U2VydmljZTogSWlpZk1hbmlmZXN0U2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZDb250ZW50U2VhcmNoU2VydmljZTogSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2U6IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29udGVudHNEaWFsb2dTZXJ2aWNlOiBDb250ZW50c0RpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBtaW1lRG9tSGVscGVyOiBNaW1lRG9tSGVscGVyLFxuICAgIHByaXZhdGUgY29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlOiBDb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBpbml0aWFsaXplKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG1hbmlmZXN0KSB7XG4gICAgICAgICAgICB0aGlzLmlzU2VhcmNoYWJsZSA9IHRoaXMuaXNNYW5pZmVzdFNlYXJjaGFibGUobWFuaWZlc3QpO1xuICAgICAgICAgICAgdGhpcy5pbnZlcnQgPSBtYW5pZmVzdC52aWV3aW5nRGlyZWN0aW9uID09PSBWaWV3aW5nRGlyZWN0aW9uLlJUTDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKHJlc3VsdDogU2VhcmNoUmVzdWx0KSA9PiB7XG4gICAgICAgICAgdGhpcy5oYXNIaXRzID0gcmVzdWx0LmhpdHMubGVuZ3RoID4gMDtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVLZXlFdmVudHMoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBhY2Nlc3NLZXlzID0gbmV3IEFjY2Vzc0tleXMoZXZlbnQpO1xuICAgIGlmICghdGhpcy5pc0tleURpc2FibGVkKGV2ZW50LmtleUNvZGUpKSB7XG4gICAgICBpZiAoYWNjZXNzS2V5cy5pc0Fycm93TGVmdEtleXMoKSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNab29tZWRJbigpKSB7XG4gICAgICAgICAgdGhpcy5pbnZlcnRcbiAgICAgICAgICAgID8gdGhpcy5nb1RvTmV4dENhbnZhc0dyb3VwKClcbiAgICAgICAgICAgIDogdGhpcy5nb1RvUHJldmlvdXNDYW52YXNHcm91cCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNBcnJvd1JpZ2h0S2V5cygpKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1pvb21lZEluKCkpIHtcbiAgICAgICAgICB0aGlzLmludmVydFxuICAgICAgICAgICAgPyB0aGlzLmdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKClcbiAgICAgICAgICAgIDogdGhpcy5nb1RvTmV4dENhbnZhc0dyb3VwKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc0ZpcnN0Q2FudmFzR3JvdXBLZXlzKCkpIHtcbiAgICAgICAgdGhpcy5nb1RvRmlyc3RDYW52YXNHcm91cCgpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzTGFzdENhbnZhc0dyb3VwS2V5cygpKSB7XG4gICAgICAgIHRoaXMuZ29Ub0xhc3RDYW52YXNHcm91cCgpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzTmV4dEhpdEtleXMoKSAmJiB0aGlzLmhhc0hpdHMpIHtcbiAgICAgICAgdGhpcy5nb1RvTmV4dEhpdCgpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzUHJldmlvdXNIaXRLZXlzKCkgJiYgdGhpcy5oYXNIaXRzKSB7XG4gICAgICAgIHRoaXMuZ29Ub1ByZXZpb3VzSGl0KCk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNGdWxsc2NyZWVuS2V5cygpKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlRnVsbHNjcmVlbigpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzU2VhcmNoRGlhbG9nS2V5cygpICYmIHRoaXMuaXNTZWFyY2hhYmxlKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlU2VhcmNoRGlhbG9nKCk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNDb250ZW50c0RpYWxvZ0tleXMoKSkge1xuICAgICAgICB0aGlzLnRvZ2dsZUNvbnRlbnRzRGlhbG9nKCk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNSZXNldFNlYXJjaEtleXMoKSkge1xuICAgICAgICB0aGlzLnJlc2V0U2VhcmNoKCk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNQYWdlRG93bktleXMoKSkge1xuICAgICAgICB0aGlzLmdvVG9OZXh0Q2FudmFzR3JvdXAoKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc1BhZ2VVcEtleXMoKSkge1xuICAgICAgICB0aGlzLmdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKCk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNab29tSW5LZXlzKCkpIHtcbiAgICAgICAgdGhpcy56b29tSW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc1pvb21PdXRLZXlzKCkpIHtcbiAgICAgICAgdGhpcy56b29tT3V0KCk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNab29tSG9tZUtleXMoKSkge1xuICAgICAgICB0aGlzLnpvb21Ib21lKCk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNSb3RhdGVLZXlzKCkpIHtcbiAgICAgICAgdGhpcy5yb3RhdGVDbG9ja1dpc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdvVG9OZXh0Q2FudmFzR3JvdXAoKSB7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9OZXh0Q2FudmFzR3JvdXAoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKSB7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKCk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9GaXJzdENhbnZhc0dyb3VwKCkge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvQ2FudmFzR3JvdXAoMCwgZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvTGFzdENhbnZhc0dyb3VwKCkge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvQ2FudmFzR3JvdXAoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2UubnVtYmVyT2ZDYW52YXNHcm91cHMgLSAxLFxuICAgICAgZmFsc2VcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSByb3RhdGVDbG9ja1dpc2UoKSB7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLnJvdGF0ZSgpO1xuICAgIHRoaXMubWltZURvbUhlbHBlci5zZXRGb2N1c09uVmlld2VyKCk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9OZXh0SGl0KCkge1xuICAgIHRoaXMuY29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlLmdvVG9OZXh0Q2FudmFzR3JvdXBIaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ29Ub1ByZXZpb3VzSGl0KCkge1xuICAgIHRoaXMuY29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlLmdvVG9QcmV2aW91c0NhbnZhc0dyb3VwSGl0KCk7XG4gIH1cblxuICBwcml2YXRlIHpvb21JbigpIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS50b2dnbGVNb2RlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS56b29tSW4oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHpvb21PdXQoKSB7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFKSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLnRvZ2dsZU1vZGUoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFX1pPT01FRCkge1xuICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLnpvb21PdXQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHpvb21Ib21lKCkge1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRUQpIHtcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS5ob21lKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVTZWFyY2hEaWFsb2coKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UgfHxcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFX1pPT01FRFxuICAgICkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5EQVNIQk9BUkQ7XG4gICAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLm9wZW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuaXNPcGVuKCkpIHtcbiAgICAgICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5vcGVuKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlQ29udGVudHNEaWFsb2coKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UgfHxcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFX1pPT01FRFxuICAgICkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5EQVNIQk9BUkQ7XG4gICAgICB0aGlzLmNvbnRlbnRzRGlhbG9nU2VydmljZS5vcGVuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmNvbnRlbnRzRGlhbG9nU2VydmljZS5pc09wZW4oKSkge1xuICAgICAgICB0aGlzLmNvbnRlbnRzRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2Uub3BlbigpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZUZ1bGxzY3JlZW4oKSB7XG4gICAgdGhpcy5taW1lRG9tSGVscGVyLnRvZ2dsZUZ1bGxzY3JlZW4oKTtcbiAgICB0aGlzLm1pbWVEb21IZWxwZXIuc2V0Rm9jdXNPblZpZXdlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFNlYXJjaCgpIHtcbiAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5kZXN0cm95KCk7XG4gIH1cblxuICBwcml2YXRlIGlzTWFuaWZlc3RTZWFyY2hhYmxlKG1hbmlmZXN0OiBNYW5pZmVzdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBtYW5pZmVzdC5zZXJ2aWNlID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1pvb21lZEluKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRUQ7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZURpc2FibGVkS2V5cygpIHtcbiAgICB0aGlzLnJlc2V0RGlzYWJsZWRLZXlzKCk7XG4gICAgaWYgKHRoaXMuY29udGVudHNEaWFsb2dTZXJ2aWNlLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLmRpc2FibGVLZXlzRm9yQ29udGVudERpYWxvZygpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5pc09wZW4oKSkge1xuICAgICAgdGhpcy5kaWFibGVLZXlzRm9yQ29udGVudFNlYXJjaERpYWxvZygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGlzYWJsZUtleXNGb3JDb250ZW50RGlhbG9nKCkge1xuICAgIHRoaXMuZGlzYWJsZWRLZXlzID0gdGhpcy5kaXNhYmxlZEtleXNcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy5BUlJPV0xFRlQpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMuQVJST1dSSUdIVCk7XG4gIH1cblxuICBwcml2YXRlIGRpYWJsZUtleXNGb3JDb250ZW50U2VhcmNoRGlhbG9nKCkge1xuICAgIHRoaXMuZGlzYWJsZWRLZXlzID0gdGhpcy5kaXNhYmxlZEtleXNcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy5BUlJPV0xFRlQpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMuQVJST1dSSUdIVClcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy5maXJzdENhbnZhc0dyb3VwQ29kZXMpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMubGFzdENhbnZhc0dyb3VwQ29kZXMpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMuem9vbUluQ29kZXMpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMuem9vbU91dENvZGVzKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLnpvb21Ib21lQ29kZXMpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMubmV4dEhpdClcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy5wcmV2aW91c0hpdClcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy50b2dnbGVTZWFyY2hEaWFsb2dDb2RlcylcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy50b2dnbGVDb250ZW50c0RpYWxvZ0NvZGVzKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLnRvZ2dsZUZ1bGxzY3JlZW5Db2Rlcyk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RGlzYWJsZWRLZXlzKCkge1xuICAgIHRoaXMuZGlzYWJsZWRLZXlzID0gW107XG4gIH1cblxuICBwcml2YXRlIGlzS2V5RGlzYWJsZWQoa2V5Q29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgdGhpcy51cGRhdGVEaXNhYmxlZEtleXMoKTtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZEtleXMuaW5kZXhPZihrZXlDb2RlKSA+IC0xO1xuICB9XG5cbiAgdW5zdWJzY3JpYmUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==