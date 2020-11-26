import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewerService } from '../viewer-service/viewer.service';
import { CanvasService } from '../canvas-service/canvas-service';
import { ContentSearchDialogService } from '../../content-search-dialog/content-search-dialog.service';
import { ContentsDialogService } from '../../contents-dialog/contents-dialog.service';
import { ModeService } from '../mode-service/mode.service';
import { ViewerMode } from '../models/viewer-mode';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeDomHelper } from '../mime-dom-helper';
import { AccessKeys } from '../models/AccessKeys';
import { ContentSearchNavigationService } from '../navigation/content-search-navigation-service/content-search-navigation.service';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';
import { ViewingDirection } from '../models/viewing-direction';
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
        this.destroyed = new Subject();
        this.invert = false;
        this.iiifManifestService.currentManifest
            .pipe(takeUntil(this.destroyed))
            .subscribe((manifest) => {
            this.isSearchable = this.isManifestSearchable(manifest);
            this.invert = manifest.viewingDirection === ViewingDirection.RTL;
        });
        this.iiifContentSearchService.onChange
            .pipe(takeUntil(this.destroyed))
            .subscribe((result) => {
            this.hasHits = result.hits.length > 0;
        });
    }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzLWtleXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9yb25ueW0vVGVtcC9uZ3gtbWltZS9saWJzL25neC1taW1lL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2FjY2Vzcy1rZXlzLWhhbmRsZXItc2VydmljZS9hY2Nlc3Mta2V5cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUN2RyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN0RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBRXJGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sbUZBQW1GLENBQUM7QUFDbkksT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNERBQTRELENBQUM7QUFFdEcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHL0QsTUFBTSxPQUFPLGlCQUFpQjtJQU81QixZQUNVLGFBQTRCLEVBQzVC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WUFFYiw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgVmlld2VyU2VydmljZSB9IGZyb20gJy4uL3ZpZXdlci1zZXJ2aWNlL3ZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLi9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBDb250ZW50U2VhcmNoRGlhbG9nU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy9jb250ZW50LXNlYXJjaC1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBDb250ZW50c0RpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb250ZW50cy1kaWFsb2cvY29udGVudHMtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kZVNlcnZpY2UgfSBmcm9tICcuLi9tb2RlLXNlcnZpY2UvbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdlck1vZGUgfSBmcm9tICcuLi9tb2RlbHMvdmlld2VyLW1vZGUnO1xuaW1wb3J0IHsgSWlpZk1hbmlmZXN0U2VydmljZSB9IGZyb20gJy4uL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQgeyBBY2Nlc3NLZXlzIH0gZnJvbSAnLi4vbW9kZWxzL0FjY2Vzc0tleXMnO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vbmF2aWdhdGlvbi9jb250ZW50LXNlYXJjaC1uYXZpZ2F0aW9uLXNlcnZpY2UvY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZDb250ZW50U2VhcmNoU2VydmljZSB9IGZyb20gJy4uL2lpaWYtY29udGVudC1zZWFyY2gtc2VydmljZS9paWlmLWNvbnRlbnQtc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vbW9kZWxzL3NlYXJjaC1yZXN1bHQnO1xuaW1wb3J0IHsgVmlld2luZ0RpcmVjdGlvbiB9IGZyb20gJy4uL21vZGVscy92aWV3aW5nLWRpcmVjdGlvbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY2Nlc3NLZXlzU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgaXNTZWFyY2hhYmxlID0gZmFsc2U7XG4gIHByaXZhdGUgaGFzSGl0cyA9IGZhbHNlO1xuICBwcml2YXRlIGRpc2FibGVkS2V5czogbnVtYmVyW10gPSBbXTtcbiAgcHJpdmF0ZSBkZXN0cm95ZWQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIGludmVydCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdmlld2VyU2VydmljZTogVmlld2VyU2VydmljZSxcbiAgICBwcml2YXRlIGNhbnZhc1NlcnZpY2U6IENhbnZhc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBtb2RlU2VydmljZTogTW9kZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmTWFuaWZlc3RTZXJ2aWNlOiBJaWlmTWFuaWZlc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlOiBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb250ZW50U2VhcmNoRGlhbG9nU2VydmljZTogQ29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb250ZW50c0RpYWxvZ1NlcnZpY2U6IENvbnRlbnRzRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIG1pbWVEb21IZWxwZXI6IE1pbWVEb21IZWxwZXIsXG4gICAgcHJpdmF0ZSBjb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2U6IENvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZVxuICApIHtcbiAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuY3VycmVudE1hbmlmZXN0XG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgLnN1YnNjcmliZSgobWFuaWZlc3Q6IE1hbmlmZXN0KSA9PiB7XG4gICAgICAgIHRoaXMuaXNTZWFyY2hhYmxlID0gdGhpcy5pc01hbmlmZXN0U2VhcmNoYWJsZShtYW5pZmVzdCk7XG4gICAgICAgIHRoaXMuaW52ZXJ0ID0gbWFuaWZlc3Qudmlld2luZ0RpcmVjdGlvbiA9PT0gVmlld2luZ0RpcmVjdGlvbi5SVEw7XG4gICAgICB9KTtcblxuICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uQ2hhbmdlXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgLnN1YnNjcmliZSgocmVzdWx0OiBTZWFyY2hSZXN1bHQpID0+IHtcbiAgICAgICAgdGhpcy5oYXNIaXRzID0gcmVzdWx0LmhpdHMubGVuZ3RoID4gMDtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlS2V5RXZlbnRzKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgYWNjZXNzS2V5cyA9IG5ldyBBY2Nlc3NLZXlzKGV2ZW50KTtcbiAgICBpZiAoIXRoaXMuaXNLZXlEaXNhYmxlZChldmVudC5rZXlDb2RlKSkge1xuICAgICAgaWYgKGFjY2Vzc0tleXMuaXNBcnJvd0xlZnRLZXlzKCkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzWm9vbWVkSW4oKSkge1xuICAgICAgICAgIHRoaXMuaW52ZXJ0XG4gICAgICAgICAgICA/IHRoaXMuZ29Ub05leHRDYW52YXNHcm91cCgpXG4gICAgICAgICAgICA6IHRoaXMuZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzQXJyb3dSaWdodEtleXMoKSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNab29tZWRJbigpKSB7XG4gICAgICAgICAgdGhpcy5pbnZlcnRcbiAgICAgICAgICAgID8gdGhpcy5nb1RvUHJldmlvdXNDYW52YXNHcm91cCgpXG4gICAgICAgICAgICA6IHRoaXMuZ29Ub05leHRDYW52YXNHcm91cCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNGaXJzdENhbnZhc0dyb3VwS2V5cygpKSB7XG4gICAgICAgIHRoaXMuZ29Ub0ZpcnN0Q2FudmFzR3JvdXAoKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc0xhc3RDYW52YXNHcm91cEtleXMoKSkge1xuICAgICAgICB0aGlzLmdvVG9MYXN0Q2FudmFzR3JvdXAoKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc05leHRIaXRLZXlzKCkgJiYgdGhpcy5oYXNIaXRzKSB7XG4gICAgICAgIHRoaXMuZ29Ub05leHRIaXQoKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc1ByZXZpb3VzSGl0S2V5cygpICYmIHRoaXMuaGFzSGl0cykge1xuICAgICAgICB0aGlzLmdvVG9QcmV2aW91c0hpdCgpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzRnVsbHNjcmVlbktleXMoKSkge1xuICAgICAgICB0aGlzLnRvZ2dsZUZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5cy5pc1NlYXJjaERpYWxvZ0tleXMoKSAmJiB0aGlzLmlzU2VhcmNoYWJsZSkge1xuICAgICAgICB0aGlzLnRvZ2dsZVNlYXJjaERpYWxvZygpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzQ29udGVudHNEaWFsb2dLZXlzKCkpIHtcbiAgICAgICAgdGhpcy50b2dnbGVDb250ZW50c0RpYWxvZygpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzUmVzZXRTZWFyY2hLZXlzKCkpIHtcbiAgICAgICAgdGhpcy5yZXNldFNlYXJjaCgpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzUGFnZURvd25LZXlzKCkpIHtcbiAgICAgICAgdGhpcy5nb1RvTmV4dENhbnZhc0dyb3VwKCk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNQYWdlVXBLZXlzKCkpIHtcbiAgICAgICAgdGhpcy5nb1RvUHJldmlvdXNDYW52YXNHcm91cCgpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzWm9vbUluS2V5cygpKSB7XG4gICAgICAgIHRoaXMuem9vbUluKCk7XG4gICAgICB9IGVsc2UgaWYgKGFjY2Vzc0tleXMuaXNab29tT3V0S2V5cygpKSB7XG4gICAgICAgIHRoaXMuem9vbU91dCgpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzWm9vbUhvbWVLZXlzKCkpIHtcbiAgICAgICAgdGhpcy56b29tSG9tZSgpO1xuICAgICAgfSBlbHNlIGlmIChhY2Nlc3NLZXlzLmlzUm90YXRlS2V5cygpKSB7XG4gICAgICAgIHRoaXMucm90YXRlQ2xvY2tXaXNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnb1RvTmV4dENhbnZhc0dyb3VwKCkge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvTmV4dENhbnZhc0dyb3VwKCk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKCkge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvUHJldmlvdXNDYW52YXNHcm91cCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvRmlyc3RDYW52YXNHcm91cCgpIHtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub0NhbnZhc0dyb3VwKDAsIGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ29Ub0xhc3RDYW52YXNHcm91cCgpIHtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub0NhbnZhc0dyb3VwKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLm51bWJlck9mQ2FudmFzR3JvdXBzIC0gMSxcbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcm90YXRlQ2xvY2tXaXNlKCkge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5yb3RhdGUoKTtcbiAgICB0aGlzLm1pbWVEb21IZWxwZXIuc2V0Rm9jdXNPblZpZXdlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvTmV4dEhpdCgpIHtcbiAgICB0aGlzLmNvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZS5nb1RvTmV4dENhbnZhc0dyb3VwSGl0KCk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9QcmV2aW91c0hpdCgpIHtcbiAgICB0aGlzLmNvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZS5nb1RvUHJldmlvdXNDYW52YXNHcm91cEhpdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSB6b29tSW4oKSB7XG4gICAgaWYgKHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQpIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UudG9nZ2xlTW9kZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdlclNlcnZpY2Uuem9vbUluKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB6b29tT3V0KCkge1xuICAgIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSkge1xuICAgICAgdGhpcy5tb2RlU2VydmljZS50b2dnbGVNb2RlKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRUQpIHtcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS56b29tT3V0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB6b29tSG9tZSgpIHtcbiAgICBpZiAodGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0VfWk9PTUVEKSB7XG4gICAgICB0aGlzLnZpZXdlclNlcnZpY2UuaG9tZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlU2VhcmNoRGlhbG9nKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFIHx8XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRURcbiAgICApIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuREFTSEJPQVJEO1xuICAgICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5vcGVuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmlzT3BlbigpKSB7XG4gICAgICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2Uub3BlbigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY29udGVudHNEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZUNvbnRlbnRzRGlhbG9nKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFIHx8XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRURcbiAgICApIHtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IFZpZXdlck1vZGUuREFTSEJPQVJEO1xuICAgICAgdGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2Uub3BlbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2UuaXNPcGVuKCkpIHtcbiAgICAgICAgdGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29udGVudHNEaWFsb2dTZXJ2aWNlLm9wZW4oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVGdWxsc2NyZWVuKCkge1xuICAgIHRoaXMubWltZURvbUhlbHBlci50b2dnbGVGdWxsc2NyZWVuKCk7XG4gICAgdGhpcy5taW1lRG9tSGVscGVyLnNldEZvY3VzT25WaWV3ZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRTZWFyY2goKSB7XG4gICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2UuZGVzdHJveSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc01hbmlmZXN0U2VhcmNoYWJsZShtYW5pZmVzdDogTWFuaWZlc3QpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWFuaWZlc3Quc2VydmljZSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgaXNab29tZWRJbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0VfWk9PTUVEO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVEaXNhYmxlZEtleXMoKSB7XG4gICAgdGhpcy5yZXNldERpc2FibGVkS2V5cygpO1xuICAgIGlmICh0aGlzLmNvbnRlbnRzRGlhbG9nU2VydmljZS5pc09wZW4oKSkge1xuICAgICAgdGhpcy5kaXNhYmxlS2V5c0ZvckNvbnRlbnREaWFsb2coKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuaXNPcGVuKCkpIHtcbiAgICAgIHRoaXMuZGlhYmxlS2V5c0ZvckNvbnRlbnRTZWFyY2hEaWFsb2coKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRpc2FibGVLZXlzRm9yQ29udGVudERpYWxvZygpIHtcbiAgICB0aGlzLmRpc2FibGVkS2V5cyA9IHRoaXMuZGlzYWJsZWRLZXlzXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMuQVJST1dMRUZUKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLkFSUk9XUklHSFQpO1xuICB9XG5cbiAgcHJpdmF0ZSBkaWFibGVLZXlzRm9yQ29udGVudFNlYXJjaERpYWxvZygpIHtcbiAgICB0aGlzLmRpc2FibGVkS2V5cyA9IHRoaXMuZGlzYWJsZWRLZXlzXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMuQVJST1dMRUZUKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLkFSUk9XUklHSFQpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMuZmlyc3RDYW52YXNHcm91cENvZGVzKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLmxhc3RDYW52YXNHcm91cENvZGVzKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLnpvb21JbkNvZGVzKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLnpvb21PdXRDb2RlcylcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy56b29tSG9tZUNvZGVzKVxuICAgICAgLmNvbmNhdChBY2Nlc3NLZXlzLm5leHRIaXQpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMucHJldmlvdXNIaXQpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMudG9nZ2xlU2VhcmNoRGlhbG9nQ29kZXMpXG4gICAgICAuY29uY2F0KEFjY2Vzc0tleXMudG9nZ2xlQ29udGVudHNEaWFsb2dDb2RlcylcbiAgICAgIC5jb25jYXQoQWNjZXNzS2V5cy50b2dnbGVGdWxsc2NyZWVuQ29kZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldERpc2FibGVkS2V5cygpIHtcbiAgICB0aGlzLmRpc2FibGVkS2V5cyA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0tleURpc2FibGVkKGtleUNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHRoaXMudXBkYXRlRGlzYWJsZWRLZXlzKCk7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWRLZXlzLmluZGV4T2Yoa2V5Q29kZSkgPiAtMTtcbiAgfVxufVxuIl19