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
AccessKeysService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: AccessKeysService, deps: [{ token: i1.ViewerService }, { token: i2.CanvasService }, { token: i3.ModeService }, { token: i4.IiifManifestService }, { token: i5.IiifContentSearchService }, { token: i6.ContentSearchDialogService }, { token: i7.ContentsDialogService }, { token: i8.ViewDialogService }, { token: i9.MimeDomHelper }, { token: i10.ContentSearchNavigationService }, { token: i11.AltoService }], target: i0.ɵɵFactoryTarget.Injectable });
AccessKeysService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: AccessKeysService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: AccessKeysService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ViewerService }, { type: i2.CanvasService }, { type: i3.ModeService }, { type: i4.IiifManifestService }, { type: i5.IiifContentSearchService }, { type: i6.ContentSearchDialogService }, { type: i7.ContentsDialogService }, { type: i8.ViewDialogService }, { type: i9.MimeDomHelper }, { type: i10.ContentSearchNavigationService }, { type: i11.AltoService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzLWtleXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2FjY2Vzcy1rZXlzLWhhbmRsZXItc2VydmljZS9hY2Nlc3Mta2V5cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQVVwQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUdsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7Ozs7Ozs7OztBQUsvRCxNQUFNLE9BQU8saUJBQWlCO0lBTzVCLFlBQ1UsYUFBNEIsRUFDNUIsYUFBNEIsRUFDNUIsV0FBd0IsRUFDeEIsbUJBQXdDLEVBQ3hDLHdCQUFrRCxFQUNsRCwwQkFBc0QsRUFDdEQscUJBQTRDLEVBQzVDLGlCQUFvQyxFQUNwQyxhQUE0QixFQUM1Qiw4QkFBOEQsRUFDOUQsV0FBd0I7UUFWeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUFDdEQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLG1DQUE4QixHQUE5Qiw4QkFBOEIsQ0FBZ0M7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TyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7OEdBcFJVLGlCQUFpQjtrSEFBakIsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBRDdCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29udGVudC1zZWFyY2gtZGlhbG9nL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRlbnRzRGlhbG9nU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbnRlbnRzLWRpYWxvZy9jb250ZW50cy1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3RGlhbG9nU2VydmljZSB9IGZyb20gJy4uLy4uL3ZpZXctZGlhbG9nL3ZpZXctZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWx0b1NlcnZpY2UgfSBmcm9tICcuLi9hbHRvLXNlcnZpY2UvYWx0by5zZXJ2aWNlJztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLi9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi9paWlmLWNvbnRlbnQtc2VhcmNoLXNlcnZpY2UvaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZNYW5pZmVzdFNlcnZpY2UgfSBmcm9tICcuLi9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVEb21IZWxwZXIgfSBmcm9tICcuLi9taW1lLWRvbS1oZWxwZXInO1xuaW1wb3J0IHsgTW9kZVNlcnZpY2UgfSBmcm9tICcuLi9tb2RlLXNlcnZpY2UvbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlY29nbml6ZWRUZXh0TW9kZSwgVmlld2VyTW9kZSB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBBY2Nlc3NLZXlzIH0gZnJvbSAnLi4vbW9kZWxzL0FjY2Vzc0tleXMnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vbW9kZWxzL3NlYXJjaC1yZXN1bHQnO1xuaW1wb3J0IHsgVmlld2luZ0RpcmVjdGlvbiB9IGZyb20gJy4uL21vZGVscy92aWV3aW5nLWRpcmVjdGlvbic7XG5pbXBvcnQgeyBDb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9uYXZpZ2F0aW9uL2NvbnRlbnQtc2VhcmNoLW5hdmlnYXRpb24tc2VydmljZS9jb250ZW50LXNlYXJjaC1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2VyU2VydmljZSB9IGZyb20gJy4uL3ZpZXdlci1zZXJ2aWNlL3ZpZXdlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFjY2Vzc0tleXNTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBpc1NlYXJjaGFibGUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBoYXNIaXRzID0gZmFsc2U7XG4gIHByaXZhdGUgZGlzYWJsZWRLZXlzOiBudW1iZXJbXSA9IFtdO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByaXZhdGUgaW52ZXJ0ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB2aWV3ZXJTZXJ2aWNlOiBWaWV3ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FudmFzU2VydmljZTogQ2FudmFzU2VydmljZSxcbiAgICBwcml2YXRlIG1vZGVTZXJ2aWNlOiBNb2RlU2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZNYW5pZmVzdFNlcnZpY2U6IElpaWZNYW5pZmVzdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmQ29udGVudFNlYXJjaFNlcnZpY2U6IElpaWZDb250ZW50U2VhcmNoU2VydmljZSxcbiAgICBwcml2YXRlIGNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlOiBDb250ZW50U2VhcmNoRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGNvbnRlbnRzRGlhbG9nU2VydmljZTogQ29udGVudHNEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgdmlld0RpYWxvZ1NlcnZpY2U6IFZpZXdEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgbWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlcixcbiAgICBwcml2YXRlIGNvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZTogQ29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgYWx0b1NlcnZpY2U6IEFsdG9TZXJ2aWNlXG4gICkge31cblxuICBpbml0aWFsaXplKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG1hbmlmZXN0KSB7XG4gICAgICAgICAgICB0aGlzLmlzU2VhcmNoYWJsZSA9IHRoaXMuaXNNYW5pZmVzdFNlYXJjaGFibGUobWFuaWZlc3QpO1xuICAgICAgICAgICAgdGhpcy5pbnZlcnQgPSBtYW5pZmVzdC52aWV3aW5nRGlyZWN0aW9uID09PSBWaWV3aW5nRGlyZWN0aW9uLlJUTDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKHJlc3VsdDogU2VhcmNoUmVzdWx0KSA9PiB7XG4gICAgICAgICAgdGhpcy5oYXNIaXRzID0gcmVzdWx0LmhpdHMubGVuZ3RoID4gMDtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVLZXlFdmVudHMoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBhY2Nlc3NLZXlzID0gbmV3IEFjY2Vzc0tleXMoZXZlbnQpO1xuICAgIGlmICghdGhpcy5pc0tleURpc2FibGVkKGV2ZW50LmtleUNvZGUpKSB7XG4gICAgICBpZiAoYWNjZXNzS2V5cy5pc0Fycm93TGVmdEtleXMoKSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNab29tZWRJbigpKSB7XG4gICAgICAgICAgdGhpcy5pbnZlcnRcbiAgICAgICAgICAgID8gYWNjZXNzS2V5cy5leGVjdXRlKCgpID0+IHRoaXMuZ29Ub05leHRDYW52YXNHcm91cCgpKVxuICAgICAgICAgICAgOiBhY2Nlc3NLZXlzLmV4ZWN1dGUoKCkgPT4gdGhpcy5nb1RvUHJldmlvdXNDYW52YXNHcm91cCgpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzQXJyb3dSaWdodEtleXMoKSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNab29tZWRJbigpKSB7XG4gICAgICAgICAgdGhpcy5pbnZlcnRcbiAgICAgICAgICAgID8gYWNjZXNzS2V5cy5leGVjdXRlKCgpID0+IHRoaXMuZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKSlcbiAgICAgICAgICAgIDogYWNjZXNzS2V5cy5leGVjdXRlKCgpID0+IHRoaXMuZ29Ub05leHRDYW52YXNHcm91cCgpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzRmlyc3RDYW52YXNHcm91cEtleXMoKSkge1xuICAgICAgICBhY2Nlc3NLZXlzLmV4ZWN1dGUoKCkgPT4gdGhpcy5nb1RvRmlyc3RDYW52YXNHcm91cCgpKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc0xhc3RDYW52YXNHcm91cEtleXMoKSkge1xuICAgICAgICBhY2Nlc3NLZXlzLmV4ZWN1dGUoKCkgPT4gdGhpcy5nb1RvTGFzdENhbnZhc0dyb3VwKCkpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzTmV4dEhpdEtleXMoKSAmJiB0aGlzLmhhc0hpdHMpIHtcbiAgICAgICAgYWNjZXNzS2V5cy5leGVjdXRlKCgpID0+IHRoaXMuZ29Ub05leHRIaXQoKSk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNQcmV2aW91c0hpdEtleXMoKSAmJiB0aGlzLmhhc0hpdHMpIHtcbiAgICAgICAgYWNjZXNzS2V5cy5leGVjdXRlKCgpID0+IHRoaXMuZ29Ub1ByZXZpb3VzSGl0KCkpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzRnVsbHNjcmVlbktleXMoKSkge1xuICAgICAgICBhY2Nlc3NLZXlzLmV4ZWN1dGUoKCkgPT4gdGhpcy50b2dnbGVGdWxsc2NyZWVuKCkpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzU2VhcmNoRGlhbG9nS2V5cygpICYmIHRoaXMuaXNTZWFyY2hhYmxlKSB7XG4gICAgICAgIGFjY2Vzc0tleXMuZXhlY3V0ZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy50b2dnbGVTZWFyY2hEaWFsb2coKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNDb250ZW50c0RpYWxvZ0tleXMoKSkge1xuICAgICAgICBhY2Nlc3NLZXlzLmV4ZWN1dGUoKCkgPT4gdGhpcy50b2dnbGVDb250ZW50c0RpYWxvZygpKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc1Jlc2V0U2VhcmNoS2V5cygpKSB7XG4gICAgICAgIGFjY2Vzc0tleXMuZXhlY3V0ZSgoKSA9PiB0aGlzLnJlc2V0U2VhcmNoKCkpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzUGFnZURvd25LZXlzKCkpIHtcbiAgICAgICAgYWNjZXNzS2V5cy5leGVjdXRlKCgpID0+IHRoaXMuZ29Ub05leHRDYW52YXNHcm91cCgpKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc1BhZ2VVcEtleXMoKSkge1xuICAgICAgICBhY2Nlc3NLZXlzLmV4ZWN1dGUoKCkgPT4gdGhpcy5nb1RvUHJldmlvdXNDYW52YXNHcm91cCgpKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc1pvb21JbktleXMoKSkge1xuICAgICAgICBhY2Nlc3NLZXlzLmV4ZWN1dGUoKCkgPT4gdGhpcy56b29tSW4oKSk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNab29tT3V0S2V5cygpKSB7XG4gICAgICAgIGFjY2Vzc0tleXMuZXhlY3V0ZSgoKSA9PiB0aGlzLnpvb21PdXQoKSk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNab29tSG9tZUtleXMoKSkge1xuICAgICAgICBhY2Nlc3NLZXlzLmV4ZWN1dGUoKCkgPT4gdGhpcy56b29tSG9tZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc1JvdGF0ZUtleXMoKSkge1xuICAgICAgICBhY2Nlc3NLZXlzLmV4ZWN1dGUoKCkgPT4gdGhpcy5yb3RhdGVDbG9ja1dpc2UoKSk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNSZWNvZ25pemVkVGV4dENvbnRlbnRLZXlzKCkpIHtcbiAgICAgICAgYWNjZXNzS2V5cy5leGVjdXRlKCgpID0+IHRoaXMudG9nZ2xlUmVjb2duaXplZFRleHRDb250ZW50SW5TcGxpdFZpZXcoKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnb1RvTmV4dENhbnZhc0dyb3VwKCkge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvTmV4dENhbnZhc0dyb3VwKCk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKCkge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvUHJldmlvdXNDYW52YXNHcm91cCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvRmlyc3RDYW52YXNHcm91cCgpIHtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub0NhbnZhc0dyb3VwKDAsIGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ29Ub0xhc3RDYW52YXNHcm91cCgpIHtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub0NhbnZhc0dyb3VwKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLm51bWJlck9mQ2FudmFzR3JvdXBzIC0gMSxcbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcm90YXRlQ2xvY2tXaXNlKCkge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5yb3RhdGUoKTtcbiAgICB0aGlzLm1pbWVEb21IZWxwZXIuc2V0Rm9jdXNPblZpZXdlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVSZWNvZ25pemVkVGV4dENvbnRlbnRJblNwbGl0VmlldygpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmFsdG9TZXJ2aWNlLnJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgIT09IFJlY29nbml6ZWRUZXh0TW9kZS5TUExJVFxuICAgICkge1xuICAgICAgdGhpcy5hbHRvU2VydmljZS5zaG93UmVjb2duaXplZFRleHRDb250ZW50SW5TcGxpdFZpZXcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hbHRvU2VydmljZS5jbG9zZVJlY29nbml6ZWRUZXh0Q29udGVudCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ29Ub05leHRIaXQoKSB7XG4gICAgdGhpcy5jb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2UuZ29Ub05leHRIaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ29Ub1ByZXZpb3VzSGl0KCkge1xuICAgIHRoaXMuY29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlLmdvVG9QcmV2aW91c0hpdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSB6b29tSW4oKSB7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQpIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UudG9nZ2xlTW9kZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdlclNlcnZpY2Uuem9vbUluKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB6b29tT3V0KCkge1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS50b2dnbGVNb2RlKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGVTZXJ2aWNlLmlzUGFnZVpvb21lZCgpKSB7XG4gICAgICB0aGlzLnZpZXdlclNlcnZpY2Uuem9vbU91dCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgem9vbUhvbWUoKSB7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UuaXNQYWdlWm9vbWVkKCkpIHtcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS5ob21lKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVTZWFyY2hEaWFsb2coKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UgfHxcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UuaXNQYWdlWm9vbWVkKClcbiAgICApIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuREFTSEJPQVJEO1xuICAgICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5vcGVuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmlzT3BlbigpKSB7XG4gICAgICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2Uub3BlbigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY29udGVudHNEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gICAgdGhpcy52aWV3RGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVDb250ZW50c0RpYWxvZygpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSB8fFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKVxuICAgICkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gVmlld2VyTW9kZS5EQVNIQk9BUkQ7XG4gICAgICB0aGlzLmNvbnRlbnRzRGlhbG9nU2VydmljZS5vcGVuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmNvbnRlbnRzRGlhbG9nU2VydmljZS5pc09wZW4oKSkge1xuICAgICAgICB0aGlzLmNvbnRlbnRzRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2Uub3BlbigpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gICAgdGhpcy52aWV3RGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVGdWxsc2NyZWVuKCkge1xuICAgIHRoaXMubWltZURvbUhlbHBlci50b2dnbGVGdWxsc2NyZWVuKCk7XG4gICAgdGhpcy5taW1lRG9tSGVscGVyLnNldEZvY3VzT25WaWV3ZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRTZWFyY2goKSB7XG4gICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2UuZGVzdHJveSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc01hbmlmZXN0U2VhcmNoYWJsZShtYW5pZmVzdDogTWFuaWZlc3QpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWFuaWZlc3Quc2VydmljZSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgaXNab29tZWRJbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRGlzYWJsZWRLZXlzKCkge1xuICAgIHRoaXMucmVzZXREaXNhYmxlZEtleXMoKTtcbiAgICBpZiAodGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2UuaXNPcGVuKCkpIHtcbiAgICAgIHRoaXMuZGlzYWJsZUtleXNGb3JDb250ZW50RGlhbG9nKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLmRpYWJsZUtleXNGb3JDb250ZW50U2VhcmNoRGlhbG9nKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzUmVjb2duaXplZFRleHRDb250ZW50TW9kZU9ubHkoKSkge1xuICAgICAgdGhpcy5kaXNhYmxlS2V5c0ZvclJlY29nbml6ZWRUZXh0Q29udGVudE9ubHkoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRpc2FibGVLZXlzRm9yQ29udGVudERpYWxvZygpIHtcbiAgICB0aGlzLmRpc2FibGVkS2V5cyA9IHRoaXMuZGlzYWJsZWRLZXlzXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMuQVJST1dMRUZUKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLkFSUk9XUklHSFQpO1xuICB9XG5cbiAgcHJpdmF0ZSBkaWFibGVLZXlzRm9yQ29udGVudFNlYXJjaERpYWxvZygpIHtcbiAgICB0aGlzLmRpc2FibGVkS2V5cyA9IHRoaXMuZGlzYWJsZWRLZXlzXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMuQVJST1dMRUZUKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLkFSUk9XUklHSFQpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMuZmlyc3RDYW52YXNHcm91cENvZGVzKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLmxhc3RDYW52YXNHcm91cENvZGVzKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLnpvb21JbkNvZGVzKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLnpvb21PdXRDb2RlcylcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy56b29tSG9tZUNvZGVzKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLm5leHRIaXQpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMucHJldmlvdXNIaXQpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMudG9nZ2xlU2VhcmNoRGlhbG9nQ29kZXMpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMudG9nZ2xlQ29udGVudHNEaWFsb2dDb2RlcylcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy50b2dnbGVGdWxsc2NyZWVuQ29kZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1JlY29nbml6ZWRUZXh0Q29udGVudE1vZGVPbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmFsdG9TZXJ2aWNlLnJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgPT09IFJlY29nbml6ZWRUZXh0TW9kZS5PTkxZXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZGlzYWJsZUtleXNGb3JSZWNvZ25pemVkVGV4dENvbnRlbnRPbmx5KCk6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWRLZXlzID0gdGhpcy5kaXNhYmxlZEtleXNcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy56b29tSW5Db2RlcylcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy56b29tT3V0Q29kZXMpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMuem9vbUhvbWVDb2Rlcyk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RGlzYWJsZWRLZXlzKCkge1xuICAgIHRoaXMuZGlzYWJsZWRLZXlzID0gW107XG4gIH1cblxuICBwcml2YXRlIGlzS2V5RGlzYWJsZWQoa2V5Q29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgdGhpcy51cGRhdGVEaXNhYmxlZEtleXMoKTtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZEtleXMuaW5kZXhPZihrZXlDb2RlKSA+IC0xO1xuICB9XG5cbiAgdW5zdWJzY3JpYmUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=