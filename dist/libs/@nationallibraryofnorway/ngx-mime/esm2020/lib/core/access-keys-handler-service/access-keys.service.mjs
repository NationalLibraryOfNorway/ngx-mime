import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecognizedTextMode, ViewerMode } from '../models';
import { AccessKeys } from '../models/AccessKeys';
import { ViewingDirection } from '../models/viewing-direction';
import * as i0 from "@angular/core";
import * as i1 from "../viewer-service/viewer.service";
import * as i2 from "../canvas-service/canvas-service";
import * as i3 from "../mode-service/mode.service";
import * as i4 from "../iiif-manifest-service/iiif-manifest-service";
import * as i5 from "../iiif-content-search-service/iiif-content-search.service";
import * as i6 from "../../content-search-dialog/content-search-dialog.service";
import * as i7 from "../../contents-dialog/contents-dialog.service";
import * as i8 from "../../view-dialog/view-dialog.service";
import * as i9 from "../mime-dom-helper";
import * as i10 from "../navigation/content-search-navigation-service/content-search-navigation.service";
import * as i11 from "../alto-service/alto.service";
export class AccessKeysService {
    constructor(viewerService, canvasService, modeService, iiifManifestService, iiifContentSearchService, contentSearchDialogService, contentsDialogService, viewDialogService, mimeDomHelper, contentSearchNavigationService, altoService) {
        this.viewerService = viewerService;
        this.canvasService = canvasService;
        this.modeService = modeService;
        this.iiifManifestService = iiifManifestService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.contentSearchDialogService = contentSearchDialogService;
        this.contentsDialogService = contentsDialogService;
        this.viewDialogService = viewDialogService;
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
                        ? accessKeys.execute(() => this.goToNextCanvasGroup())
                        : accessKeys.execute(() => this.goToPreviousCanvasGroup());
                }
            }
            else if (accessKeys.isArrowRightKeys()) {
                if (!this.isZoomedIn()) {
                    this.invert
                        ? accessKeys.execute(() => this.goToPreviousCanvasGroup())
                        : accessKeys.execute(() => this.goToNextCanvasGroup());
                }
            }
            else if (accessKeys.isFirstCanvasGroupKeys()) {
                accessKeys.execute(() => this.goToFirstCanvasGroup());
            }
            else if (accessKeys.isLastCanvasGroupKeys()) {
                accessKeys.execute(() => this.goToLastCanvasGroup());
            }
            else if (accessKeys.isNextHitKeys() && this.hasHits) {
                accessKeys.execute(() => this.goToNextHit());
            }
            else if (accessKeys.isPreviousHitKeys() && this.hasHits) {
                accessKeys.execute(() => this.goToPreviousHit());
            }
            else if (accessKeys.isFullscreenKeys()) {
                accessKeys.execute(() => this.toggleFullscreen());
            }
            else if (accessKeys.isSearchDialogKeys() && this.isSearchable) {
                accessKeys.execute(() => {
                    this.toggleSearchDialog();
                });
            }
            else if (accessKeys.isContentsDialogKeys()) {
                accessKeys.execute(() => this.toggleContentsDialog());
            }
            else if (accessKeys.isResetSearchKeys()) {
                accessKeys.execute(() => this.resetSearch());
            }
            else if (accessKeys.isPageDownKeys()) {
                accessKeys.execute(() => this.goToNextCanvasGroup());
            }
            else if (accessKeys.isPageUpKeys()) {
                accessKeys.execute(() => this.goToPreviousCanvasGroup());
            }
            else if (accessKeys.isZoomInKeys()) {
                accessKeys.execute(() => this.zoomIn());
            }
            else if (accessKeys.isZoomOutKeys()) {
                accessKeys.execute(() => this.zoomOut());
            }
            else if (accessKeys.isZoomHomeKeys()) {
                accessKeys.execute(() => this.zoomHome());
            }
            else if (accessKeys.isRotateKeys()) {
                accessKeys.execute(() => this.rotateClockWise());
            }
            else if (accessKeys.isRecognizedTextContentKeys()) {
                accessKeys.execute(() => this.toggleRecognizedTextContentInSplitView());
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
    toggleRecognizedTextContentInSplitView() {
        if (this.altoService.recognizedTextContentMode !== RecognizedTextMode.SPLIT) {
            this.altoService.showRecognizedTextContentInSplitView();
        }
        else {
            this.altoService.closeRecognizedTextContent();
        }
    }
    goToNextHit() {
        this.contentSearchNavigationService.goToNextHit();
    }
    goToPreviousHit() {
        this.contentSearchNavigationService.goToPreviousHit();
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
        this.viewDialogService.close();
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
        this.viewDialogService.close();
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
        if (this.isRecognizedTextContentModeOnly()) {
            this.disableKeysForRecognizedTextContentOnly();
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
    isRecognizedTextContentModeOnly() {
        return (this.altoService.recognizedTextContentMode === RecognizedTextMode.ONLY);
    }
    disableKeysForRecognizedTextContentOnly() {
        this.disabledKeys = this.disabledKeys
            .concat(AccessKeys.zoomInCodes)
            .concat(AccessKeys.zoomOutCodes)
            .concat(AccessKeys.zoomHomeCodes);
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
AccessKeysService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: AccessKeysService, deps: [{ token: i1.ViewerService }, { token: i2.CanvasService }, { token: i3.ModeService }, { token: i4.IiifManifestService }, { token: i5.IiifContentSearchService }, { token: i6.ContentSearchDialogService }, { token: i7.ContentsDialogService }, { token: i8.ViewDialogService }, { token: i9.MimeDomHelper }, { token: i10.ContentSearchNavigationService }, { token: i11.AltoService }], target: i0.ɵɵFactoryTarget.Injectable });
AccessKeysService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: AccessKeysService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: AccessKeysService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ViewerService }, { type: i2.CanvasService }, { type: i3.ModeService }, { type: i4.IiifManifestService }, { type: i5.IiifContentSearchService }, { type: i6.ContentSearchDialogService }, { type: i7.ContentsDialogService }, { type: i8.ViewDialogService }, { type: i9.MimeDomHelper }, { type: i10.ContentSearchNavigationService }, { type: i11.AltoService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzLWtleXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2FjY2Vzcy1rZXlzLWhhbmRsZXItc2VydmljZS9hY2Nlc3Mta2V5cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQVVwQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUdsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7Ozs7Ozs7OztBQU8vRCxNQUFNLE9BQU8saUJBQWlCO0lBTzVCLFlBQ1UsYUFBNEIsRUFDNUIsYUFBNEIsRUFDNUIsV0FBd0IsRUFDeEIsbUJBQXdDLEVBQ3hDLHdCQUFrRCxFQUNsRCwwQkFBc0QsRUFDdEQscUJBQTRDLEVBQzVDLGlCQUFvQyxFQUNwQyxhQUE0QixFQUM1Qiw4QkFBOEQsRUFDOUQsV0FBd0I7UUFWeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUFDdEQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLG1DQUE4QixHQUE5Qiw4QkFBOEIsQ0FBZ0M7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TyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7OEdBcFJVLGlCQUFpQjtrSEFBakIsaUJBQWlCLGNBRmhCLE1BQU07MkZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udGVudHNEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29udGVudHMtZGlhbG9nL2NvbnRlbnRzLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdmlldy1kaWFsb2cvdmlldy1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBBbHRvU2VydmljZSB9IGZyb20gJy4uL2FsdG8tc2VydmljZS9hbHRvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FudmFzU2VydmljZSB9IGZyb20gJy4uL2NhbnZhcy1zZXJ2aWNlL2NhbnZhcy1zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZDb250ZW50U2VhcmNoU2VydmljZSB9IGZyb20gJy4uL2lpaWYtY29udGVudC1zZWFyY2gtc2VydmljZS9paWlmLWNvbnRlbnQtc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZk1hbmlmZXN0U2VydmljZSB9IGZyb20gJy4uL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQgeyBNb2RlU2VydmljZSB9IGZyb20gJy4uL21vZGUtc2VydmljZS9tb2RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjb2duaXplZFRleHRNb2RlLCBWaWV3ZXJNb2RlIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IEFjY2Vzc0tleXMgfSBmcm9tICcuLi9tb2RlbHMvQWNjZXNzS2V5cyc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi9tb2RlbHMvc2VhcmNoLXJlc3VsdCc7XG5pbXBvcnQgeyBWaWV3aW5nRGlyZWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdpbmctZGlyZWN0aW9uJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uL25hdmlnYXRpb24vY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi1zZXJ2aWNlL2NvbnRlbnQtc2VhcmNoLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdmlld2VyLXNlcnZpY2Uvdmlld2VyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQWNjZXNzS2V5c1NlcnZpY2Uge1xuICBwcml2YXRlIGlzU2VhcmNoYWJsZSA9IGZhbHNlO1xuICBwcml2YXRlIGhhc0hpdHMgPSBmYWxzZTtcbiAgcHJpdmF0ZSBkaXNhYmxlZEtleXM6IG51bWJlcltdID0gW107XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJpdmF0ZSBpbnZlcnQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHZpZXdlclNlcnZpY2U6IFZpZXdlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgbW9kZVNlcnZpY2U6IE1vZGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZk1hbmlmZXN0U2VydmljZTogSWlpZk1hbmlmZXN0U2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZDb250ZW50U2VhcmNoU2VydmljZTogSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2U6IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29udGVudHNEaWFsb2dTZXJ2aWNlOiBDb250ZW50c0RpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3RGlhbG9nU2VydmljZTogVmlld0RpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBtaW1lRG9tSGVscGVyOiBNaW1lRG9tSGVscGVyLFxuICAgIHByaXZhdGUgY29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlOiBDb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhbHRvU2VydmljZTogQWx0b1NlcnZpY2VcbiAgKSB7fVxuXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuY3VycmVudE1hbmlmZXN0LnN1YnNjcmliZShcbiAgICAgICAgKG1hbmlmZXN0OiBNYW5pZmVzdCB8IG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobWFuaWZlc3QpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTZWFyY2hhYmxlID0gdGhpcy5pc01hbmlmZXN0U2VhcmNoYWJsZShtYW5pZmVzdCk7XG4gICAgICAgICAgICB0aGlzLmludmVydCA9IG1hbmlmZXN0LnZpZXdpbmdEaXJlY3Rpb24gPT09IFZpZXdpbmdEaXJlY3Rpb24uUlRMO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAocmVzdWx0OiBTZWFyY2hSZXN1bHQpID0+IHtcbiAgICAgICAgICB0aGlzLmhhc0hpdHMgPSByZXN1bHQuaGl0cy5sZW5ndGggPiAwO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUtleUV2ZW50cyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IGFjY2Vzc0tleXMgPSBuZXcgQWNjZXNzS2V5cyhldmVudCk7XG4gICAgaWYgKCF0aGlzLmlzS2V5RGlzYWJsZWQoZXZlbnQua2V5Q29kZSkpIHtcbiAgICAgIGlmIChhY2Nlc3NLZXlzLmlzQXJyb3dMZWZ0S2V5cygpKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1pvb21lZEluKCkpIHtcbiAgICAgICAgICB0aGlzLmludmVydFxuICAgICAgICAgICAgPyBhY2Nlc3NLZXlzLmV4ZWN1dGUoKCkgPT4gdGhpcy5nb1RvTmV4dENhbnZhc0dyb3VwKCkpXG4gICAgICAgICAgICA6IGFjY2Vzc0tleXMuZXhlY3V0ZSgoKSA9PiB0aGlzLmdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKCkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNBcnJvd1JpZ2h0S2V5cygpKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1pvb21lZEluKCkpIHtcbiAgICAgICAgICB0aGlzLmludmVydFxuICAgICAgICAgICAgPyBhY2Nlc3NLZXlzLmV4ZWN1dGUoKCkgPT4gdGhpcy5nb1RvUHJldmlvdXNDYW52YXNHcm91cCgpKVxuICAgICAgICAgICAgOiBhY2Nlc3NLZXlzLmV4ZWN1dGUoKCkgPT4gdGhpcy5nb1RvTmV4dENhbnZhc0dyb3VwKCkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNGaXJzdENhbnZhc0dyb3VwS2V5cygpKSB7XG4gICAgICAgIGFjY2Vzc0tleXMuZXhlY3V0ZSgoKSA9PiB0aGlzLmdvVG9GaXJzdENhbnZhc0dyb3VwKCkpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzTGFzdENhbnZhc0dyb3VwS2V5cygpKSB7XG4gICAgICAgIGFjY2Vzc0tleXMuZXhlY3V0ZSgoKSA9PiB0aGlzLmdvVG9MYXN0Q2FudmFzR3JvdXAoKSk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNOZXh0SGl0S2V5cygpICYmIHRoaXMuaGFzSGl0cykge1xuICAgICAgICBhY2Nlc3NLZXlzLmV4ZWN1dGUoKCkgPT4gdGhpcy5nb1RvTmV4dEhpdCgpKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc1ByZXZpb3VzSGl0S2V5cygpICYmIHRoaXMuaGFzSGl0cykge1xuICAgICAgICBhY2Nlc3NLZXlzLmV4ZWN1dGUoKCkgPT4gdGhpcy5nb1RvUHJldmlvdXNIaXQoKSk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNGdWxsc2NyZWVuS2V5cygpKSB7XG4gICAgICAgIGFjY2Vzc0tleXMuZXhlY3V0ZSgoKSA9PiB0aGlzLnRvZ2dsZUZ1bGxzY3JlZW4oKSk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNTZWFyY2hEaWFsb2dLZXlzKCkgJiYgdGhpcy5pc1NlYXJjaGFibGUpIHtcbiAgICAgICAgYWNjZXNzS2V5cy5leGVjdXRlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZVNlYXJjaERpYWxvZygpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc0NvbnRlbnRzRGlhbG9nS2V5cygpKSB7XG4gICAgICAgIGFjY2Vzc0tleXMuZXhlY3V0ZSgoKSA9PiB0aGlzLnRvZ2dsZUNvbnRlbnRzRGlhbG9nKCkpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzUmVzZXRTZWFyY2hLZXlzKCkpIHtcbiAgICAgICAgYWNjZXNzS2V5cy5leGVjdXRlKCgpID0+IHRoaXMucmVzZXRTZWFyY2goKSk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNQYWdlRG93bktleXMoKSkge1xuICAgICAgICBhY2Nlc3NLZXlzLmV4ZWN1dGUoKCkgPT4gdGhpcy5nb1RvTmV4dENhbnZhc0dyb3VwKCkpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzUGFnZVVwS2V5cygpKSB7XG4gICAgICAgIGFjY2Vzc0tleXMuZXhlY3V0ZSgoKSA9PiB0aGlzLmdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKCkpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzWm9vbUluS2V5cygpKSB7XG4gICAgICAgIGFjY2Vzc0tleXMuZXhlY3V0ZSgoKSA9PiB0aGlzLnpvb21JbigpKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc1pvb21PdXRLZXlzKCkpIHtcbiAgICAgICAgYWNjZXNzS2V5cy5leGVjdXRlKCgpID0+IHRoaXMuem9vbU91dCgpKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc1pvb21Ib21lS2V5cygpKSB7XG4gICAgICAgIGFjY2Vzc0tleXMuZXhlY3V0ZSgoKSA9PiB0aGlzLnpvb21Ib21lKCkpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzUm90YXRlS2V5cygpKSB7XG4gICAgICAgIGFjY2Vzc0tleXMuZXhlY3V0ZSgoKSA9PiB0aGlzLnJvdGF0ZUNsb2NrV2lzZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc1JlY29nbml6ZWRUZXh0Q29udGVudEtleXMoKSkge1xuICAgICAgICBhY2Nlc3NLZXlzLmV4ZWN1dGUoKCkgPT4gdGhpcy50b2dnbGVSZWNvZ25pemVkVGV4dENvbnRlbnRJblNwbGl0VmlldygpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdvVG9OZXh0Q2FudmFzR3JvdXAoKSB7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9OZXh0Q2FudmFzR3JvdXAoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKSB7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKCk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9GaXJzdENhbnZhc0dyb3VwKCkge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvQ2FudmFzR3JvdXAoMCwgZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvTGFzdENhbnZhc0dyb3VwKCkge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvQ2FudmFzR3JvdXAoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2UubnVtYmVyT2ZDYW52YXNHcm91cHMgLSAxLFxuICAgICAgZmFsc2VcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSByb3RhdGVDbG9ja1dpc2UoKSB7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLnJvdGF0ZSgpO1xuICAgIHRoaXMubWltZURvbUhlbHBlci5zZXRGb2N1c09uVmlld2VyKCk7XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZVJlY29nbml6ZWRUZXh0Q29udGVudEluU3BsaXRWaWV3KCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuYWx0b1NlcnZpY2UucmVjb2duaXplZFRleHRDb250ZW50TW9kZSAhPT0gUmVjb2duaXplZFRleHRNb2RlLlNQTElUXG4gICAgKSB7XG4gICAgICB0aGlzLmFsdG9TZXJ2aWNlLnNob3dSZWNvZ25pemVkVGV4dENvbnRlbnRJblNwbGl0VmlldygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFsdG9TZXJ2aWNlLmNsb3NlUmVjb2duaXplZFRleHRDb250ZW50KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnb1RvTmV4dEhpdCgpIHtcbiAgICB0aGlzLmNvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZS5nb1RvTmV4dEhpdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvUHJldmlvdXNIaXQoKSB7XG4gICAgdGhpcy5jb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2UuZ29Ub1ByZXZpb3VzSGl0KCk7XG4gIH1cblxuICBwcml2YXRlIHpvb21JbigpIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS50b2dnbGVNb2RlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS56b29tSW4oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHpvb21PdXQoKSB7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFKSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLnRvZ2dsZU1vZGUoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZVNlcnZpY2UuaXNQYWdlWm9vbWVkKCkpIHtcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS56b29tT3V0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB6b29tSG9tZSgpIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKSkge1xuICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmhvbWUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZVNlYXJjaERpYWxvZygpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSB8fFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKVxuICAgICkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5EQVNIQk9BUkQ7XG4gICAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLm9wZW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuaXNPcGVuKCkpIHtcbiAgICAgICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5vcGVuKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICB0aGlzLnZpZXdEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZUNvbnRlbnRzRGlhbG9nKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFIHx8XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLmlzUGFnZVpvb21lZCgpXG4gICAgKSB7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSBWaWV3ZXJNb2RlLkRBU0hCT0FSRDtcbiAgICAgIHRoaXMuY29udGVudHNEaWFsb2dTZXJ2aWNlLm9wZW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY29udGVudHNEaWFsb2dTZXJ2aWNlLmlzT3BlbigpKSB7XG4gICAgICAgIHRoaXMuY29udGVudHNEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbnRlbnRzRGlhbG9nU2VydmljZS5vcGVuKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICB0aGlzLnZpZXdEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZUZ1bGxzY3JlZW4oKSB7XG4gICAgdGhpcy5taW1lRG9tSGVscGVyLnRvZ2dsZUZ1bGxzY3JlZW4oKTtcbiAgICB0aGlzLm1pbWVEb21IZWxwZXIuc2V0Rm9jdXNPblZpZXdlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFNlYXJjaCgpIHtcbiAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5kZXN0cm95KCk7XG4gIH1cblxuICBwcml2YXRlIGlzTWFuaWZlc3RTZWFyY2hhYmxlKG1hbmlmZXN0OiBNYW5pZmVzdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBtYW5pZmVzdC5zZXJ2aWNlID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1pvb21lZEluKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1vZGVTZXJ2aWNlLmlzUGFnZVpvb21lZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVEaXNhYmxlZEtleXMoKSB7XG4gICAgdGhpcy5yZXNldERpc2FibGVkS2V5cygpO1xuICAgIGlmICh0aGlzLmNvbnRlbnRzRGlhbG9nU2VydmljZS5pc09wZW4oKSkge1xuICAgICAgdGhpcy5kaXNhYmxlS2V5c0ZvckNvbnRlbnREaWFsb2coKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuaXNPcGVuKCkpIHtcbiAgICAgIHRoaXMuZGlhYmxlS2V5c0ZvckNvbnRlbnRTZWFyY2hEaWFsb2coKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNSZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlT25seSgpKSB7XG4gICAgICB0aGlzLmRpc2FibGVLZXlzRm9yUmVjb2duaXplZFRleHRDb250ZW50T25seSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGlzYWJsZUtleXNGb3JDb250ZW50RGlhbG9nKCkge1xuICAgIHRoaXMuZGlzYWJsZWRLZXlzID0gdGhpcy5kaXNhYmxlZEtleXNcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy5BUlJPV0xFRlQpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMuQVJST1dSSUdIVCk7XG4gIH1cblxuICBwcml2YXRlIGRpYWJsZUtleXNGb3JDb250ZW50U2VhcmNoRGlhbG9nKCkge1xuICAgIHRoaXMuZGlzYWJsZWRLZXlzID0gdGhpcy5kaXNhYmxlZEtleXNcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy5BUlJPV0xFRlQpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMuQVJST1dSSUdIVClcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy5maXJzdENhbnZhc0dyb3VwQ29kZXMpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMubGFzdENhbnZhc0dyb3VwQ29kZXMpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMuem9vbUluQ29kZXMpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMuem9vbU91dENvZGVzKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLnpvb21Ib21lQ29kZXMpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMubmV4dEhpdClcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy5wcmV2aW91c0hpdClcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy50b2dnbGVTZWFyY2hEaWFsb2dDb2RlcylcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy50b2dnbGVDb250ZW50c0RpYWxvZ0NvZGVzKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLnRvZ2dsZUZ1bGxzY3JlZW5Db2Rlcyk7XG4gIH1cblxuICBwcml2YXRlIGlzUmVjb2duaXplZFRleHRDb250ZW50TW9kZU9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuYWx0b1NlcnZpY2UucmVjb2duaXplZFRleHRDb250ZW50TW9kZSA9PT0gUmVjb2duaXplZFRleHRNb2RlLk9OTFlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBkaXNhYmxlS2V5c0ZvclJlY29nbml6ZWRUZXh0Q29udGVudE9ubHkoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZEtleXMgPSB0aGlzLmRpc2FibGVkS2V5c1xuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLnpvb21JbkNvZGVzKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLnpvb21PdXRDb2RlcylcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy56b29tSG9tZUNvZGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXREaXNhYmxlZEtleXMoKSB7XG4gICAgdGhpcy5kaXNhYmxlZEtleXMgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgaXNLZXlEaXNhYmxlZChrZXlDb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICB0aGlzLnVwZGF0ZURpc2FibGVkS2V5cygpO1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkS2V5cy5pbmRleE9mKGtleUNvZGUpID4gLTE7XG4gIH1cblxuICB1bnN1YnNjcmliZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==