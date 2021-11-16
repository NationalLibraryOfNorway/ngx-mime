import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import { AltoService } from '../../core/alto-service/alto.service';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
export class RecognizedTextContentComponent {
    constructor(intl, cdr, canvasService, altoService, iiifManifestService) {
        this.intl = intl;
        this.cdr = cdr;
        this.canvasService = canvasService;
        this.altoService = altoService;
        this.iiifManifestService = iiifManifestService;
        this.isLoading = false;
        this.error = undefined;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe(() => {
            this.clearRecognizedText();
            this.altoService.initialize();
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
RecognizedTextContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'mime-recognized-text-content',
                template: "<div #recognizedTextContentContainer class=\"recognized-text-content-container\" aria-live=\"polite\">\n  <div *ngIf=\"error\" data-test-id=\"error\">{{ error }}</div>\n  <div *ngIf=\"!isLoading\">\n    <div *ngIf=\"firstCanvasRecognizedTextContent\" data-test-id=\"firstCanvasRecognizedTextContent\" [innerHTML]=\"firstCanvasRecognizedTextContent\"> </div>\n    <div *ngIf=\"secondCanvasRecognizedTextContent\" data-test-id=\"secondCanvasRecognizedTextContent\" [innerHTML]=\"secondCanvasRecognizedTextContent\"> </div>\n  </div>\n  <div *ngIf=\"isLoading\">{{intl.loading}}</div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".recognized-text-content-container{height:100%;overflow:auto}.recognized-text-content-container>div{padding:1em}\n"]
            },] }
];
RecognizedTextContentComponent.ctorParameters = () => [
    { type: MimeViewerIntl },
    { type: ChangeDetectorRef },
    { type: CanvasService },
    { type: AltoService },
    { type: IiifManifestService }
];
RecognizedTextContentComponent.propDecorators = {
    recognizedTextContentContainer: [{ type: ViewChild, args: ['recognizedTextContentContainer', { read: ElementRef },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb2duaXplZC10ZXh0LWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL3ZpZXdlci9yZWNvZ25pemVkLXRleHQtY29udGVudC9yZWNvZ25pemVkLXRleHQtY29udGVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFHVixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQzdGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQVE3RCxNQUFNLE9BQU8sOEJBQThCO0lBVXpDLFlBQ1MsSUFBb0IsRUFDbkIsR0FBc0IsRUFDdEIsYUFBNEIsRUFDNUIsV0FBd0IsRUFDeEIsbUJBQXdDO1FBSnpDLFNBQUksR0FBSixJQUFJLENBQWdCO1FBQ25CLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFWbEQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixVQUFLLEdBQXVCLFNBQVMsQ0FBQztRQUU5QixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFReEMsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3RELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNsRCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQWtCLEVBQUUsRUFBRTtZQUMzRCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7WUFDdEQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVPLG1CQUFtQjtRQUN6QixJQUFJLENBQUMsZ0NBQWdDLEdBQUcsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxpQ0FBaUMsR0FBRyxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxDQUFDLDhCQUE4QixDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTyxvQkFBb0I7UUFDMUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FDM0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FDM0MsQ0FBQztRQUNGLElBQUksQ0FBQyxnQ0FBZ0MsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU5RSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxpQ0FBaUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoRjtJQUNILENBQUM7OztZQTlFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsMmxCQUF1RDtnQkFFdkQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7WUFQUSxjQUFjO1lBWnJCLGlCQUFpQjtZQVVWLGFBQWE7WUFEYixXQUFXO1lBRVgsbUJBQW1COzs7NkNBVXpCLFNBQVMsU0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBbHRvU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvYWx0by1zZXJ2aWNlL2FsdG8uc2VydmljZSc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi4vLi4vY29yZS9pbnRsL3ZpZXdlci1pbnRsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS1yZWNvZ25pemVkLXRleHQtY29udGVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZWNvZ25pemVkLXRleHQtY29udGVudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3JlY29nbml6ZWQtdGV4dC1jb250ZW50LmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBSZWNvZ25pemVkVGV4dENvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ3JlY29nbml6ZWRUZXh0Q29udGVudENvbnRhaW5lcicsIHsgcmVhZDogRWxlbWVudFJlZiB9KVxuICByZWNvZ25pemVkVGV4dENvbnRlbnRDb250YWluZXIhOiBFbGVtZW50UmVmO1xuICBmaXJzdENhbnZhc1JlY29nbml6ZWRUZXh0Q29udGVudDogU2FmZUh0bWwgfCB1bmRlZmluZWQ7XG4gIHNlY29uZENhbnZhc1JlY29nbml6ZWRUZXh0Q29udGVudDogU2FmZUh0bWwgfCB1bmRlZmluZWQ7XG4gIGlzTG9hZGluZyA9IGZhbHNlO1xuICBlcnJvcjogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgY2FudmFzU2VydmljZTogQ2FudmFzU2VydmljZSxcbiAgICBwcml2YXRlIGFsdG9TZXJ2aWNlOiBBbHRvU2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZNYW5pZmVzdFNlcnZpY2U6IElpaWZNYW5pZmVzdFNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuY3VycmVudE1hbmlmZXN0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYXJSZWNvZ25pemVkVGV4dCgpO1xuICAgICAgICB0aGlzLmFsdG9TZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuYWx0b1NlcnZpY2Uub25UZXh0Q29udGVudFJlYWR5JC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyUmVjb2duaXplZFRleHQoKTtcbiAgICAgICAgdGhpcy5zY3JvbGxUb1RvcCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVJlY29nbml6ZWRUZXh0KCk7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5hbHRvU2VydmljZS5pc0xvYWRpbmckLnN1YnNjcmliZSgoaXNMb2FkaW5nOiBib29sZWFuKSA9PiB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gaXNMb2FkaW5nO1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuYWx0b1NlcnZpY2UuaGFzRXJyb3JzJC5zdWJzY3JpYmUoKGVycm9yOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmFsdG9TZXJ2aWNlLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJSZWNvZ25pemVkVGV4dCgpIHtcbiAgICB0aGlzLmZpcnN0Q2FudmFzUmVjb2duaXplZFRleHRDb250ZW50ID0gJyc7XG4gICAgdGhpcy5zZWNvbmRDYW52YXNSZWNvZ25pemVkVGV4dENvbnRlbnQgPSAnJztcbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsVG9Ub3AoKSB7XG4gICAgdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRDb250YWluZXIubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVSZWNvZ25pemVkVGV4dCgpIHtcbiAgICBjb25zdCBjYW52YXNlcyA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNlc1BlckNhbnZhc0dyb3VwKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4XG4gICAgKTtcbiAgICB0aGlzLmZpcnN0Q2FudmFzUmVjb2duaXplZFRleHRDb250ZW50ID0gdGhpcy5hbHRvU2VydmljZS5nZXRIdG1sKGNhbnZhc2VzWzBdKTtcblxuICAgIGlmIChjYW52YXNlcy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHRoaXMuc2Vjb25kQ2FudmFzUmVjb2duaXplZFRleHRDb250ZW50ID0gdGhpcy5hbHRvU2VydmljZS5nZXRIdG1sKGNhbnZhc2VzWzFdKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==