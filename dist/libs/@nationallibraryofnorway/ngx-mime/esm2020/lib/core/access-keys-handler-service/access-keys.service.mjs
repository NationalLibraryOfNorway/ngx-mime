import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccessKeys } from '../models/AccessKeys';
import { ViewerMode } from '../models/viewer-mode';
import { ViewingDirection } from '../models/viewing-direction';
import * as i0 from "@angular/core";
import * as i1 from "../viewer-service/viewer.service";
import * as i2 from "../canvas-service/canvas-service";
import * as i3 from "../mode-service/mode.service";
import * as i4 from "../iiif-manifest-service/iiif-manifest-service";
import * as i5 from "../iiif-content-search-service/iiif-content-search.service";
import * as i6 from "../../content-search-dialog/content-search-dialog.service";
import * as i7 from "../../contents-dialog/contents-dialog.service";
import * as i8 from "../mime-dom-helper";
import * as i9 from "../navigation/content-search-navigation-service/content-search-navigation.service";
import * as i10 from "../alto-service/alto.service";
export class AccessKeysService {
    constructor(viewerService, canvasService, modeService, iiifManifestService, iiifContentSearchService, contentSearchDialogService, contentsDialogService, mimeDomHelper, contentSearchNavigationService, altoService) {
        this.viewerService = viewerService;
        this.canvasService = canvasService;
        this.modeService = modeService;
        this.iiifManifestService = iiifManifestService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.contentSearchDialogService = contentSearchDialogService;
        this.contentsDialogService = contentsDialogService;
        this.mimeDomHelper = mimeDomHelper;
        this.contentSearchNavigationService = contentSearchNavigationService;
        this.altoService = altoService;
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
            else if (accessKeys.isRecognizedTextContentKeys()) {
                this.toggleRecognizedTextContent();
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
    toggleRecognizedTextContent() {
        this.altoService.toggle();
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
        else if (this.modeService.isPageZoomed()) {
            this.viewerService.zoomOut();
        }
    }
    zoomHome() {
        if (this.modeService.isPageZoomed()) {
            this.viewerService.home();
        }
    }
    toggleSearchDialog() {
        if (this.modeService.mode === ViewerMode.PAGE ||
            this.modeService.isPageZoomed()) {
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
            this.modeService.isPageZoomed()) {
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
        return this.modeService.isPageZoomed();
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
AccessKeysService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: AccessKeysService, deps: [{ token: i1.ViewerService }, { token: i2.CanvasService }, { token: i3.ModeService }, { token: i4.IiifManifestService }, { token: i5.IiifContentSearchService }, { token: i6.ContentSearchDialogService }, { token: i7.ContentsDialogService }, { token: i8.MimeDomHelper }, { token: i9.ContentSearchNavigationService }, { token: i10.AltoService }], target: i0.ɵɵFactoryTarget.Injectable });
AccessKeysService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: AccessKeysService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: AccessKeysService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ViewerService }, { type: i2.CanvasService }, { type: i3.ModeService }, { type: i4.IiifManifestService }, { type: i5.IiifContentSearchService }, { type: i6.ContentSearchDialogService }, { type: i7.ContentsDialogService }, { type: i8.MimeDomHelper }, { type: i9.ContentSearchNavigationService }, { type: i10.AltoService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzLWtleXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2FjY2Vzcy1rZXlzLWhhbmRsZXItc2VydmljZS9hY2Nlc3Mta2V5cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQVNwQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7Ozs7Ozs7QUFLL0QsTUFBTSxPQUFPLGlCQUFpQjtJQU81QixZQUNVLGFBQTRCLEVBQzVCLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3hCLG1CQUF3QyxFQUN4Qyx3QkFBa0QsRUFDbEQsMEJBQXNELEVBQ3RELHFCQUE0QyxFQUM1QyxhQUE0QixFQUM1Qiw4QkFBOEQsRUFDOUQsV0FBd0I7UUFUeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUFDdEQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixtQ0FBOEIsR0FBOUIsOEJBQThCLENBQWdDO1FBQzlELGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBaEIxQixpQkFBWSxHQUFHLEtBQUssQ0FBQztR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QyxXQUFXLENBQUM7YUFDOUIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7YUFDL0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7YUFDaEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7YUFDMUIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7YUFDOUIsTUFBTSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQzthQUMxQyxNQUFNLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDO2FBQzVDLE1BQU0sQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRU8saUJBQWlCO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxhQUFhLENBQUMsT0FBZTtRQUNuQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs4R0ExUFUsaUJBQWlCO2tIQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udGVudHNEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29udGVudHMtZGlhbG9nL2NvbnRlbnRzLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IEFsdG9TZXJ2aWNlIH0gZnJvbSAnLi4vYWx0by1zZXJ2aWNlL2FsdG8uc2VydmljZSc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3Qtc2VydmljZSc7XG5pbXBvcnQgeyBNaW1lRG9tSGVscGVyIH0gZnJvbSAnLi4vbWltZS1kb20taGVscGVyJztcbmltcG9ydCB7IE1vZGVTZXJ2aWNlIH0gZnJvbSAnLi4vbW9kZS1zZXJ2aWNlL21vZGUuc2VydmljZSc7XG5pbXBvcnQgeyBBY2Nlc3NLZXlzIH0gZnJvbSAnLi4vbW9kZWxzL0FjY2Vzc0tleXMnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vbW9kZWxzL3NlYXJjaC1yZXN1bHQnO1xuaW1wb3J0IHsgVmlld2VyTW9kZSB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItbW9kZSc7XG5pbXBvcnQgeyBWaWV3aW5nRGlyZWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdpbmctZGlyZWN0aW9uJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uL25hdmlnYXRpb24vY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi1zZXJ2aWNlL2NvbnRlbnQtc2VhcmNoLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdmlld2VyLXNlcnZpY2Uvdmlld2VyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWNjZXNzS2V5c1NlcnZpY2Uge1xuICBwcml2YXRlIGlzU2VhcmNoYWJsZSA9IGZhbHNlO1xuICBwcml2YXRlIGhhc0hpdHMgPSBmYWxzZTtcbiAgcHJpdmF0ZSBkaXNhYmxlZEtleXM6IG51bWJlcltdID0gW107XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJpdmF0ZSBpbnZlcnQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHZpZXdlclNlcnZpY2U6IFZpZXdlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgbW9kZVNlcnZpY2U6IE1vZGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZk1hbmlmZXN0U2VydmljZTogSWlpZk1hbmlmZXN0U2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZDb250ZW50U2VhcmNoU2VydmljZTogSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2U6IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29udGVudHNEaWFsb2dTZXJ2aWNlOiBDb250ZW50c0RpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBtaW1lRG9tSGVscGVyOiBNaW1lRG9tSGVscGVyLFxuICAgIHByaXZhdGUgY29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlOiBDb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhbHRvU2VydmljZTogQWx0b1NlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBpbml0aWFsaXplKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG1hbmlmZXN0KSB7XG4gICAgICAgICAgICB0aGlzLmlzU2VhcmNoYWJsZSA9IHRoaXMuaXNNYW5pZmVzdFNlYXJjaGFibGUobWFuaWZlc3QpO1xuICAgICAgICAgICAgdGhpcy5pbnZlcnQgPSBtYW5pZmVzdC52aWV3aW5nRGlyZWN0aW9uID09PSBWaWV3aW5nRGlyZWN0aW9uLlJUTDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKHJlc3VsdDogU2VhcmNoUmVzdWx0KSA9PiB7XG4gICAgICAgICAgdGhpcy5oYXNIaXRzID0gcmVzdWx0LmhpdHMubGVuZ3RoID4gMDtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVLZXlFdmVudHMoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBhY2Nlc3NLZXlzID0gbmV3IEFjY2Vzc0tleXMoZXZlbnQpO1xuICAgIGlmICghdGhpcy5pc0tleURpc2FibGVkKGV2ZW50LmtleUNvZGUpKSB7XG4gICAgICBpZiAoYWNjZXNzS2V5cy5pc0Fycm93TGVmdEtleXMoKSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNab29tZWRJbigpKSB7XG4gICAgICAgICAgdGhpcy5pbnZlcnRcbiAgICAgICAgICAgID8gdGhpcy5nb1RvTmV4dENhbnZhc0dyb3VwKClcbiAgICAgICAgICAgIDogdGhpcy5nb1RvUHJldmlvdXNDYW52YXNHcm91cCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNBcnJvd1JpZ2h0S2V5cygpKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1pvb21lZEluKCkpIHtcbiAgICAgICAgICB0aGlzLmludmVydFxuICAgICAgICAgICAgPyB0aGlzLmdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKClcbiAgICAgICAgICAgIDogdGhpcy5nb1RvTmV4dENhbnZhc0dyb3VwKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc0ZpcnN0Q2FudmFzR3JvdXBLZXlzKCkpIHtcbiAgICAgICAgdGhpcy5nb1RvRmlyc3RDYW52YXNHcm91cCgpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzTGFzdENhbnZhc0dyb3VwS2V5cygpKSB7XG4gICAgICAgIHRoaXMuZ29Ub0xhc3RDYW52YXNHcm91cCgpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzTmV4dEhpdEtleXMoKSAmJiB0aGlzLmhhc0hpdHMpIHtcbiAgICAgICAgdGhpcy5nb1RvTmV4dEhpdCgpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzUHJldmlvdXNIaXRLZXlzKCkgJiYgdGhpcy5oYXNIaXRzKSB7XG4gICAgICAgIHRoaXMuZ29Ub1ByZXZpb3VzSGl0KCk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNGdWxsc2NyZWVuS2V5cygpKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlRnVsbHNjcmVlbigpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzU2VhcmNoRGlhbG9nS2V5cygpICYmIHRoaXMuaXNTZWFyY2hhYmxlKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlU2VhcmNoRGlhbG9nKCk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNDb250ZW50c0RpYWxvZ0tleXMoKSkge1xuICAgICAgICB0aGlzLnRvZ2dsZUNvbnRlbnRzRGlhbG9nKCk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNSZXNldFNlYXJjaEtleXMoKSkge1xuICAgICAgICB0aGlzLnJlc2V0U2VhcmNoKCk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNQYWdlRG93bktleXMoKSkge1xuICAgICAgICB0aGlzLmdvVG9OZXh0Q2FudmFzR3JvdXAoKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc1BhZ2VVcEtleXMoKSkge1xuICAgICAgICB0aGlzLmdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKCk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNab29tSW5LZXlzKCkpIHtcbiAgICAgICAgdGhpcy56b29tSW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc1pvb21PdXRLZXlzKCkpIHtcbiAgICAgICAgdGhpcy56b29tT3V0KCk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNab29tSG9tZUtleXMoKSkge1xuICAgICAgICB0aGlzLnpvb21Ib21lKCk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNSb3RhdGVLZXlzKCkpIHtcbiAgICAgICAgdGhpcy5yb3RhdGVDbG9ja1dpc2UoKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc1JlY29nbml6ZWRUZXh0Q29udGVudEtleXMoKSkge1xuICAgICAgICB0aGlzLnRvZ2dsZVJlY29nbml6ZWRUZXh0Q29udGVudCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ29Ub05leHRDYW52YXNHcm91cCgpIHtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub05leHRDYW52YXNHcm91cCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvUHJldmlvdXNDYW52YXNHcm91cCgpIHtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ29Ub0ZpcnN0Q2FudmFzR3JvdXAoKSB7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9DYW52YXNHcm91cCgwLCBmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9MYXN0Q2FudmFzR3JvdXAoKSB7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9DYW52YXNHcm91cChcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5udW1iZXJPZkNhbnZhc0dyb3VwcyAtIDEsXG4gICAgICBmYWxzZVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHJvdGF0ZUNsb2NrV2lzZSgpIHtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2Uucm90YXRlKCk7XG4gICAgdGhpcy5taW1lRG9tSGVscGVyLnNldEZvY3VzT25WaWV3ZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlUmVjb2duaXplZFRleHRDb250ZW50KCkge1xuICAgIHRoaXMuYWx0b1NlcnZpY2UudG9nZ2xlKCk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9OZXh0SGl0KCkge1xuICAgIHRoaXMuY29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlLmdvVG9OZXh0Q2FudmFzR3JvdXBIaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ29Ub1ByZXZpb3VzSGl0KCkge1xuICAgIHRoaXMuY29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlLmdvVG9QcmV2aW91c0NhbnZhc0dyb3VwSGl0KCk7XG4gIH1cblxuICBwcml2YXRlIHpvb21JbigpIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS50b2dnbGVNb2RlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS56b29tSW4oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHpvb21PdXQoKSB7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFKSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLnRvZ2dsZU1vZGUoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZVNlcnZpY2UuaXNQYWdlWm9vbWVkKCkpIHtcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS56b29tT3V0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB6b29tSG9tZSgpIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKSkge1xuICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmhvbWUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZVNlYXJjaERpYWxvZygpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSB8fFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKVxuICAgICkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5EQVNIQk9BUkQ7XG4gICAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLm9wZW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuaXNPcGVuKCkpIHtcbiAgICAgICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5vcGVuKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlQ29udGVudHNEaWFsb2coKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UgfHxcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UuaXNQYWdlWm9vbWVkKClcbiAgICApIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuREFTSEJPQVJEO1xuICAgICAgdGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2Uub3BlbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2UuaXNPcGVuKCkpIHtcbiAgICAgICAgdGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29udGVudHNEaWFsb2dTZXJ2aWNlLm9wZW4oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVGdWxsc2NyZWVuKCkge1xuICAgIHRoaXMubWltZURvbUhlbHBlci50b2dnbGVGdWxsc2NyZWVuKCk7XG4gICAgdGhpcy5taW1lRG9tSGVscGVyLnNldEZvY3VzT25WaWV3ZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRTZWFyY2goKSB7XG4gICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2UuZGVzdHJveSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc01hbmlmZXN0U2VhcmNoYWJsZShtYW5pZmVzdDogTWFuaWZlc3QpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWFuaWZlc3Quc2VydmljZSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgaXNab29tZWRJbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRGlzYWJsZWRLZXlzKCkge1xuICAgIHRoaXMucmVzZXREaXNhYmxlZEtleXMoKTtcbiAgICBpZiAodGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2UuaXNPcGVuKCkpIHtcbiAgICAgIHRoaXMuZGlzYWJsZUtleXNGb3JDb250ZW50RGlhbG9nKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLmRpYWJsZUtleXNGb3JDb250ZW50U2VhcmNoRGlhbG9nKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkaXNhYmxlS2V5c0ZvckNvbnRlbnREaWFsb2coKSB7XG4gICAgdGhpcy5kaXNhYmxlZEtleXMgPSB0aGlzLmRpc2FibGVkS2V5c1xuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLkFSUk9XTEVGVClcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy5BUlJPV1JJR0hUKTtcbiAgfVxuXG4gIHByaXZhdGUgZGlhYmxlS2V5c0ZvckNvbnRlbnRTZWFyY2hEaWFsb2coKSB7XG4gICAgdGhpcy5kaXNhYmxlZEtleXMgPSB0aGlzLmRpc2FibGVkS2V5c1xuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLkFSUk9XTEVGVClcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy5BUlJPV1JJR0hUKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLmZpcnN0Q2FudmFzR3JvdXBDb2RlcylcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy5sYXN0Q2FudmFzR3JvdXBDb2RlcylcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy56b29tSW5Db2RlcylcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy56b29tT3V0Q29kZXMpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMuem9vbUhvbWVDb2RlcylcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy5uZXh0SGl0KVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLnByZXZpb3VzSGl0KVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLnRvZ2dsZVNlYXJjaERpYWxvZ0NvZGVzKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLnRvZ2dsZUNvbnRlbnRzRGlhbG9nQ29kZXMpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMudG9nZ2xlRnVsbHNjcmVlbkNvZGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXREaXNhYmxlZEtleXMoKSB7XG4gICAgdGhpcy5kaXNhYmxlZEtleXMgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgaXNLZXlEaXNhYmxlZChrZXlDb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICB0aGlzLnVwZGF0ZURpc2FibGVkS2V5cygpO1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkS2V5cy5pbmRleE9mKGtleUNvZGUpID4gLTE7XG4gIH1cblxuICB1bnN1YnNjcmliZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxufVxuIl19