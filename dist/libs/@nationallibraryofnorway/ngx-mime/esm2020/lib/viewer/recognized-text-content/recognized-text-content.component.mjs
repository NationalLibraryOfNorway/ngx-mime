import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../core/intl/viewer-intl";
import * as i2 from "../../core/canvas-service/canvas-service";
import * as i3 from "../../core/alto-service/alto.service";
import * as i4 from "../../core/iiif-manifest-service/iiif-manifest-service";
import * as i5 from "../../core/iiif-content-search-service/iiif-content-search.service";
import * as i6 from "@angular/common";
export class RecognizedTextContentComponent {
    constructor(intl, cdr, canvasService, altoService, iiifManifestService, iiifContentSearchService) {
        this.intl = intl;
        this.cdr = cdr;
        this.canvasService = canvasService;
        this.altoService = altoService;
        this.iiifManifestService = iiifManifestService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.isLoading = false;
        this.error = undefined;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((sr) => {
            this.altoService.initialize(sr.hits);
        }));
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe(() => {
            this.clearRecognizedText();
            this.cdr.detectChanges();
        }));
        this.subscriptions.add(this.altoService.onTextContentReady$.subscribe(() => {
            this.clearRecognizedText();
            this.scrollToTop();
            this.updateRecognizedText();
            this.cdr.detectChanges();
        }));
        this.subscriptions.add(this.altoService.isLoading$.subscribe((isLoading) => {
            this.isLoading = isLoading;
            this.cdr.detectChanges();
        }));
        this.subscriptions.add(this.altoService.hasErrors$.subscribe((error) => {
            this.error = error;
            this.cdr.detectChanges();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.altoService.destroy();
    }
    clearRecognizedText() {
        this.firstCanvasRecognizedTextContent = '';
        this.secondCanvasRecognizedTextContent = '';
    }
    scrollToTop() {
        this.recognizedTextContentContainer.nativeElement.scrollTop = 0;
    }
    updateRecognizedText() {
        const canvases = this.canvasService.getCanvasesPerCanvasGroup(this.canvasService.currentCanvasGroupIndex);
        this.firstCanvasRecognizedTextContent = this.altoService.getHtml(canvases[0]);
        if (canvases.length === 2) {
            this.secondCanvasRecognizedTextContent = this.altoService.getHtml(canvases[1]);
        }
    }
}
RecognizedTextContentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: RecognizedTextContentComponent, deps: [{ token: i1.MimeViewerIntl }, { token: i0.ChangeDetectorRef }, { token: i2.CanvasService }, { token: i3.AltoService }, { token: i4.IiifManifestService }, { token: i5.IiifContentSearchService }], target: i0.ɵɵFactoryTarget.Component });
RecognizedTextContentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.2", type: RecognizedTextContentComponent, selector: "mime-recognized-text-content", viewQueries: [{ propertyName: "recognizedTextContentContainer", first: true, predicate: ["recognizedTextContentContainer"], descendants: true, read: ElementRef }], ngImport: i0, template: "<div #recognizedTextContentContainer class=\"recognized-text-content-container\" aria-live=\"polite\">\n  <div *ngIf=\"error\" data-test-id=\"error\">{{ error }}</div>\n  <div *ngIf=\"!isLoading\">\n    <div *ngIf=\"firstCanvasRecognizedTextContent\" data-test-id=\"firstCanvasRecognizedTextContent\" [innerHTML]=\"firstCanvasRecognizedTextContent\"> </div>\n    <div *ngIf=\"secondCanvasRecognizedTextContent\" data-test-id=\"secondCanvasRecognizedTextContent\" [innerHTML]=\"secondCanvasRecognizedTextContent\"> </div>\n  </div>\n  <div *ngIf=\"isLoading\">{{intl.loading}}</div>\n</div>\n", styles: [".recognized-text-content-container{height:100%;overflow:auto}.recognized-text-content-container>div{padding:1em}\n"], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: RecognizedTextContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-recognized-text-content', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div #recognizedTextContentContainer class=\"recognized-text-content-container\" aria-live=\"polite\">\n  <div *ngIf=\"error\" data-test-id=\"error\">{{ error }}</div>\n  <div *ngIf=\"!isLoading\">\n    <div *ngIf=\"firstCanvasRecognizedTextContent\" data-test-id=\"firstCanvasRecognizedTextContent\" [innerHTML]=\"firstCanvasRecognizedTextContent\"> </div>\n    <div *ngIf=\"secondCanvasRecognizedTextContent\" data-test-id=\"secondCanvasRecognizedTextContent\" [innerHTML]=\"secondCanvasRecognizedTextContent\"> </div>\n  </div>\n  <div *ngIf=\"isLoading\">{{intl.loading}}</div>\n</div>\n", styles: [".recognized-text-content-container{height:100%;overflow:auto}.recognized-text-content-container>div{padding:1em}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: i2.CanvasService }, { type: i3.AltoService }, { type: i4.IiifManifestService }, { type: i5.IiifContentSearchService }]; }, propDecorators: { recognizedTextContentContainer: [{
                type: ViewChild,
                args: ['recognizedTextContentContainer', { read: ElementRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb2duaXplZC10ZXh0LWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL3ZpZXdlci9yZWNvZ25pemVkLXRleHQtY29udGVudC9yZWNvZ25pemVkLXRleHQtY29udGVudC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3JlY29nbml6ZWQtdGV4dC1jb250ZW50L3JlY29nbml6ZWQtdGV4dC1jb250ZW50LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFVBQVUsRUFHVixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7QUFjcEMsTUFBTSxPQUFPLDhCQUE4QjtJQVV6QyxZQUNTLElBQW9CLEVBQ25CLEdBQXNCLEVBQ3RCLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3hCLG1CQUF3QyxFQUN4Qyx3QkFBa0Q7UUFMbkQsU0FBSSxHQUFKLElBQUksQ0FBZ0I7UUFDbkIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBWDVELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsVUFBSyxHQUF1QixTQUFTLENBQUM7UUFFOUIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBU3hDLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyx3QkFB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dGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBbHRvU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvYWx0by1zZXJ2aWNlL2FsdG8uc2VydmljZSc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZDb250ZW50U2VhcmNoU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4uLy4uL2NvcmUvaW50bC92aWV3ZXItaW50bCc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy9zZWFyY2gtcmVzdWx0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS1yZWNvZ25pemVkLXRleHQtY29udGVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZWNvZ25pemVkLXRleHQtY29udGVudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3JlY29nbml6ZWQtdGV4dC1jb250ZW50LmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBSZWNvZ25pemVkVGV4dENvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ3JlY29nbml6ZWRUZXh0Q29udGVudENvbnRhaW5lcicsIHsgcmVhZDogRWxlbWVudFJlZiB9KVxuICByZWNvZ25pemVkVGV4dENvbnRlbnRDb250YWluZXIhOiBFbGVtZW50UmVmO1xuICBmaXJzdENhbnZhc1JlY29nbml6ZWRUZXh0Q29udGVudDogU2FmZUh0bWwgfCB1bmRlZmluZWQ7XG4gIHNlY29uZENhbnZhc1JlY29nbml6ZWRUZXh0Q29udGVudDogU2FmZUh0bWwgfCB1bmRlZmluZWQ7XG4gIGlzTG9hZGluZyA9IGZhbHNlO1xuICBlcnJvcjogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgY2FudmFzU2VydmljZTogQ2FudmFzU2VydmljZSxcbiAgICBwcml2YXRlIGFsdG9TZXJ2aWNlOiBBbHRvU2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZNYW5pZmVzdFNlcnZpY2U6IElpaWZNYW5pZmVzdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmQ29udGVudFNlYXJjaFNlcnZpY2U6IElpaWZDb250ZW50U2VhcmNoU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZSgoc3I6IFNlYXJjaFJlc3VsdCkgPT4ge1xuICAgICAgICB0aGlzLmFsdG9TZXJ2aWNlLmluaXRpYWxpemUoc3IuaGl0cyk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyUmVjb2duaXplZFRleHQoKTtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuYWx0b1NlcnZpY2Uub25UZXh0Q29udGVudFJlYWR5JC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyUmVjb2duaXplZFRleHQoKTtcbiAgICAgICAgdGhpcy5zY3JvbGxUb1RvcCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVJlY29nbml6ZWRUZXh0KCk7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5hbHRvU2VydmljZS5pc0xvYWRpbmckLnN1YnNjcmliZSgoaXNMb2FkaW5nOiBib29sZWFuKSA9PiB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gaXNMb2FkaW5nO1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuYWx0b1NlcnZpY2UuaGFzRXJyb3JzJC5zdWJzY3JpYmUoKGVycm9yOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmFsdG9TZXJ2aWNlLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJSZWNvZ25pemVkVGV4dCgpIHtcbiAgICB0aGlzLmZpcnN0Q2FudmFzUmVjb2duaXplZFRleHRDb250ZW50ID0gJyc7XG4gICAgdGhpcy5zZWNvbmRDYW52YXNSZWNvZ25pemVkVGV4dENvbnRlbnQgPSAnJztcbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsVG9Ub3AoKSB7XG4gICAgdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRDb250YWluZXIubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVSZWNvZ25pemVkVGV4dCgpIHtcbiAgICBjb25zdCBjYW52YXNlcyA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNlc1BlckNhbnZhc0dyb3VwKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4XG4gICAgKTtcbiAgICB0aGlzLmZpcnN0Q2FudmFzUmVjb2duaXplZFRleHRDb250ZW50ID0gdGhpcy5hbHRvU2VydmljZS5nZXRIdG1sKFxuICAgICAgY2FudmFzZXNbMF1cbiAgICApO1xuXG4gICAgaWYgKGNhbnZhc2VzLmxlbmd0aCA9PT0gMikge1xuICAgICAgdGhpcy5zZWNvbmRDYW52YXNSZWNvZ25pemVkVGV4dENvbnRlbnQgPSB0aGlzLmFsdG9TZXJ2aWNlLmdldEh0bWwoXG4gICAgICAgIGNhbnZhc2VzWzFdXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiAjcmVjb2duaXplZFRleHRDb250ZW50Q29udGFpbmVyIGNsYXNzPVwicmVjb2duaXplZC10ZXh0LWNvbnRlbnQtY29udGFpbmVyXCIgYXJpYS1saXZlPVwicG9saXRlXCI+XG4gIDxkaXYgKm5nSWY9XCJlcnJvclwiIGRhdGEtdGVzdC1pZD1cImVycm9yXCI+e3sgZXJyb3IgfX08L2Rpdj5cbiAgPGRpdiAqbmdJZj1cIiFpc0xvYWRpbmdcIj5cbiAgICA8ZGl2ICpuZ0lmPVwiZmlyc3RDYW52YXNSZWNvZ25pemVkVGV4dENvbnRlbnRcIiBkYXRhLXRlc3QtaWQ9XCJmaXJzdENhbnZhc1JlY29nbml6ZWRUZXh0Q29udGVudFwiIFtpbm5lckhUTUxdPVwiZmlyc3RDYW52YXNSZWNvZ25pemVkVGV4dENvbnRlbnRcIj4gPC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cInNlY29uZENhbnZhc1JlY29nbml6ZWRUZXh0Q29udGVudFwiIGRhdGEtdGVzdC1pZD1cInNlY29uZENhbnZhc1JlY29nbml6ZWRUZXh0Q29udGVudFwiIFtpbm5lckhUTUxdPVwic2Vjb25kQ2FudmFzUmVjb2duaXplZFRleHRDb250ZW50XCI+IDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cImlzTG9hZGluZ1wiPnt7aW50bC5sb2FkaW5nfX08L2Rpdj5cbjwvZGl2PlxuIl19