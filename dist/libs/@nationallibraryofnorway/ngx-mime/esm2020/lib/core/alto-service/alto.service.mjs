import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of, Subject, Subscription, } from 'rxjs';
import { catchError, debounceTime, finalize, take } from 'rxjs/operators';
import { parseString } from 'xml2js';
import { AltoBuilder } from '../builders/alto';
import { HtmlFormatter } from './html.formatter';
import * as i0 from "@angular/core";
import * as i1 from "../intl/viewer-intl";
import * as i2 from "@angular/common/http";
import * as i3 from "../iiif-manifest-service/iiif-manifest-service";
import * as i4 from "../canvas-service/canvas-service";
import * as i5 from "@angular/platform-browser";
export class AltoService {
    constructor(intl, http, iiifManifestService, canvasService, sanitizer) {
        this.intl = intl;
        this.http = http;
        this.iiifManifestService = iiifManifestService;
        this.canvasService = canvasService;
        this.sanitizer = sanitizer;
        this.altos = [];
        this.recognizedTextContentToggle = new BehaviorSubject(false);
        this.isLoading = new BehaviorSubject(false);
        this.textContentReady = new Subject();
        this.textError = new Subject();
        this.manifest = null;
        this.subscriptions = new Subscription();
        this.altoBuilder = new AltoBuilder();
    }
    get onRecognizedTextContentToggleChange$() {
        return this.recognizedTextContentToggle.asObservable();
    }
    get onTextContentReady$() {
        return this.textContentReady.asObservable();
    }
    get isLoading$() {
        return this.isLoading.asObservable();
    }
    get hasErrors$() {
        return this.textError.asObservable();
    }
    get onRecognizedTextContentToggle() {
        return this.recognizedTextContentToggle.value;
    }
    set onRecognizedTextContentToggle(value) {
        this.recognizedTextContentToggle.next(value);
    }
    initialize(hits) {
        this.htmlFormatter = new HtmlFormatter(this.sanitizer, hits);
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
            this.clearCache();
        }));
        this.subscriptions.add(this.canvasService.onCanvasGroupIndexChange
            .pipe(debounceTime(200))
            .subscribe((currentCanvasGroupIndex) => {
            this.textError.next(undefined);
            const sources = [];
            const canvasGroup = this.canvasService.getCanvasesPerCanvasGroup(currentCanvasGroupIndex);
            this.addAltoSource(canvasGroup[0], sources);
            if (canvasGroup.length === 2) {
                this.addAltoSource(canvasGroup[1], sources);
            }
            this.isLoading.next(true);
            forkJoin(sources)
                .pipe(take(1), finalize(() => this.isLoading.next(false)))
                .subscribe();
        }));
    }
    destroy() {
        this.subscriptions.unsubscribe();
        this.clearCache();
    }
    toggle() {
        this.onRecognizedTextContentToggle =
            !this.recognizedTextContentToggle.getValue();
    }
    getHtml(index) {
        return this.altos && this.altos.length >= index + 1
            ? this.altos[index]
            : undefined;
    }
    clearCache() {
        this.altos = [];
    }
    addAltoSource(index, sources) {
        if (this.manifest && this.manifest.sequences) {
            const seq = this.manifest.sequences[0];
            if (seq.canvases) {
                const canvas = seq.canvases[index];
                if (canvas && canvas.altoUrl) {
                    sources.push(this.add(index, canvas.altoUrl));
                }
            }
        }
    }
    add(index, url) {
        return new Observable((observer) => {
            if (this.isInCache(index)) {
                this.done(observer);
            }
            else {
                this.load(observer, index, url);
            }
        });
    }
    isInCache(index) {
        return this.altos[index];
    }
    load(observer, index, url) {
        this.http
            .get(url, {
            headers: new HttpHeaders().set('Content-Type', 'text/xml'),
            responseType: 'text',
        })
            .pipe(take(1), catchError((err) => of({ isError: true, error: err })))
            .subscribe((data) => {
            try {
                if (!data.isError) {
                    parseString(data, { explicitChildren: true, preserveChildrenOrder: true }, (error, result) => {
                        const alto = this.altoBuilder.withAltoXml(result.alto).build();
                        this.addToCache(index, alto);
                        this.done(observer);
                    });
                }
                else {
                    throw data.err;
                }
            }
            catch {
                this.error(observer);
            }
        });
    }
    addToCache(index, alto) {
        this.altos[index] = this.htmlFormatter.altoToHtml(alto);
    }
    done(observer) {
        this.textContentReady.next();
        this.complete(observer);
    }
    error(observer) {
        this.textError.next(this.intl.textContentErrorLabel);
        this.complete(observer);
    }
    complete(observer) {
        observer.next();
        observer.complete();
    }
}
AltoService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: AltoService, deps: [{ token: i1.MimeViewerIntl }, { token: i2.HttpClient }, { token: i3.IiifManifestService }, { token: i4.CanvasService }, { token: i5.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable });
AltoService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: AltoService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: AltoService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.MimeViewerIntl }, { type: i2.HttpClient }, { type: i3.IiifManifestService }, { type: i4.CanvasService }, { type: i5.DomSanitizer }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0by5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvYWx0by1zZXJ2aWNlL2FsdG8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLFFBQVEsRUFDUixVQUFVLEVBQ1YsRUFBRSxFQUNGLE9BQU8sRUFFUCxZQUFZLEdBQ2IsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNyQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFPL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7O0FBS2pELE1BQU0sT0FBTyxXQUFXO0lBV3RCLFlBQ1MsSUFBb0IsRUFDbkIsSUFBZ0IsRUFDaEIsbUJBQXdDLEVBQ3hDLGFBQTRCLEVBQzVCLFNBQXVCO1FBSnhCLFNBQUksR0FBSixJQUFJLENBQWdCO1FBQ25CLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBZnpCLFVBQUssR0FBZSxFQUFFLENBQUM7UUFDdkIsZ0NBQTJCLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekQsY0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZD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QztpQkFDSDtxQkFBTTtvQkFDTCxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ2hCO2FBQ0Y7WUFBQyxNQUFNO2dCQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxVQUFVLENBQUMsS0FBYSxFQUFFLElBQVU7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU8sSUFBSSxDQUFDLFFBQTBCO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTyxLQUFLLENBQUMsUUFBMEI7UUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVPLFFBQVEsQ0FBQyxRQUEwQjtRQUN6QyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3RCLENBQUM7O3dHQS9LVSxXQUFXOzRHQUFYLFdBQVcsY0FGVixNQUFNOzJGQUVQLFdBQVc7a0JBSHZCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGZvcmtKb2luLFxuICBPYnNlcnZhYmxlLFxuICBvZixcbiAgU3ViamVjdCxcbiAgU3Vic2NyaWJlcixcbiAgU3Vic2NyaXB0aW9uLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGRlYm91bmNlVGltZSwgZmluYWxpemUsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBwYXJzZVN0cmluZyB9IGZyb20gJ3htbDJqcyc7XG5pbXBvcnQgeyBBbHRvQnVpbGRlciB9IGZyb20gJy4uL2J1aWxkZXJzL2FsdG8nO1xuaW1wb3J0IHsgQ2FudmFzU2VydmljZSB9IGZyb20gJy4uL2NhbnZhcy1zZXJ2aWNlL2NhbnZhcy1zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZNYW5pZmVzdFNlcnZpY2UgfSBmcm9tICcuLi9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi4vaW50bC92aWV3ZXItaW50bCc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBBbHRvIH0gZnJvbSAnLi9hbHRvLm1vZGVsJztcbmltcG9ydCB7IEhpdCB9IGZyb20gJy4vLi4vLi4vY29yZS9tb2RlbHMvaGl0JztcbmltcG9ydCB7IEh0bWxGb3JtYXR0ZXIgfSBmcm9tICcuL2h0bWwuZm9ybWF0dGVyJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEFsdG9TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBhbHRvczogU2FmZUh0bWxbXSA9IFtdO1xuICBwcml2YXRlIHJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBwcml2YXRlIGlzTG9hZGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBwcml2YXRlIHRleHRDb250ZW50UmVhZHkgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIHRleHRFcnJvciA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgcHJpdmF0ZSBtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBwcml2YXRlIGFsdG9CdWlsZGVyID0gbmV3IEFsdG9CdWlsZGVyKCk7XG4gIHByaXZhdGUgaHRtbEZvcm1hdHRlciE6IEh0bWxGb3JtYXR0ZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGludGw6IE1pbWVWaWV3ZXJJbnRsLFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIGlpaWZNYW5pZmVzdFNlcnZpY2U6IElpaWZNYW5pZmVzdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXJcbiAgKSB7fVxuXG4gIGdldCBvblJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZUNoYW5nZSQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMucmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IG9uVGV4dENvbnRlbnRSZWFkeSQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMudGV4dENvbnRlbnRSZWFkeS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBpc0xvYWRpbmckKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmlzTG9hZGluZy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBoYXNFcnJvcnMkKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMudGV4dEVycm9yLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IG9uUmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlKCkge1xuICAgIHJldHVybiB0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZS52YWx1ZTtcbiAgfVxuXG4gIHNldCBvblJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMucmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlLm5leHQodmFsdWUpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShoaXRzPzogSGl0W10pIHtcbiAgICB0aGlzLmh0bWxGb3JtYXR0ZXIgPSBuZXcgSHRtbEZvcm1hdHRlcih0aGlzLnNhbml0aXplciwgaGl0cyk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5jdXJyZW50TWFuaWZlc3Quc3Vic2NyaWJlKFxuICAgICAgICAobWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCkgPT4ge1xuICAgICAgICAgIHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcbiAgICAgICAgICB0aGlzLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLm9uQ2FudmFzR3JvdXBJbmRleENoYW5nZVxuICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoMjAwKSlcbiAgICAgICAgLnN1YnNjcmliZSgoY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIHRoaXMudGV4dEVycm9yLm5leHQodW5kZWZpbmVkKTtcbiAgICAgICAgICBjb25zdCBzb3VyY2VzOiBPYnNlcnZhYmxlPHZvaWQ+W10gPSBbXTtcblxuICAgICAgICAgIGNvbnN0IGNhbnZhc0dyb3VwID0gdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc2VzUGVyQ2FudmFzR3JvdXAoXG4gICAgICAgICAgICBjdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5hZGRBbHRvU291cmNlKGNhbnZhc0dyb3VwWzBdLCBzb3VyY2VzKTtcbiAgICAgICAgICBpZiAoY2FudmFzR3JvdXAubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEFsdG9Tb3VyY2UoY2FudmFzR3JvdXBbMV0sIHNvdXJjZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmlzTG9hZGluZy5uZXh0KHRydWUpO1xuICAgICAgICAgIGZvcmtKb2luKHNvdXJjZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5pc0xvYWRpbmcubmV4dChmYWxzZSkpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jbGVhckNhY2hlKCk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5vblJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZSA9XG4gICAgICAhdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGUuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIGdldEh0bWwoaW5kZXg6IG51bWJlcik6IFNhZmVIdG1sIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5hbHRvcyAmJiB0aGlzLmFsdG9zLmxlbmd0aCA+PSBpbmRleCArIDFcbiAgICAgID8gdGhpcy5hbHRvc1tpbmRleF1cbiAgICAgIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgY2xlYXJDYWNoZSgpIHtcbiAgICB0aGlzLmFsdG9zID0gW107XG4gIH1cblxuICBwcml2YXRlIGFkZEFsdG9Tb3VyY2UoaW5kZXg6IG51bWJlciwgc291cmNlczogT2JzZXJ2YWJsZTx2b2lkPltdKSB7XG4gICAgaWYgKHRoaXMubWFuaWZlc3QgJiYgdGhpcy5tYW5pZmVzdC5zZXF1ZW5jZXMpIHtcbiAgICAgIGNvbnN0IHNlcSA9IHRoaXMubWFuaWZlc3Quc2VxdWVuY2VzWzBdO1xuICAgICAgaWYgKHNlcS5jYW52YXNlcykge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBzZXEuY2FudmFzZXNbaW5kZXhdO1xuICAgICAgICBpZiAoY2FudmFzICYmIGNhbnZhcy5hbHRvVXJsKSB7XG4gICAgICAgICAgc291cmNlcy5wdXNoKHRoaXMuYWRkKGluZGV4LCBjYW52YXMuYWx0b1VybCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGQoaW5kZXg6IG51bWJlciwgdXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc0luQ2FjaGUoaW5kZXgpKSB7XG4gICAgICAgIHRoaXMuZG9uZShvYnNlcnZlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvYWQob2JzZXJ2ZXIsIGluZGV4LCB1cmwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0luQ2FjaGUoaW5kZXg6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmFsdG9zW2luZGV4XTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZChvYnNlcnZlcjogU3Vic2NyaWJlcjx2b2lkPiwgaW5kZXg6IG51bWJlciwgdXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLmh0dHBcbiAgICAgIC5nZXQodXJsLCB7XG4gICAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycygpLnNldCgnQ29udGVudC1UeXBlJywgJ3RleHQveG1sJyksXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ3RleHQnLFxuICAgICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICBjYXRjaEVycm9yKChlcnIpID0+IG9mKHsgaXNFcnJvcjogdHJ1ZSwgZXJyb3I6IGVyciB9KSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGRhdGE6IEFsdG8gfCBhbnkpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIWRhdGEuaXNFcnJvcikge1xuICAgICAgICAgICAgcGFyc2VTdHJpbmcoXG4gICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgIHsgZXhwbGljaXRDaGlsZHJlbjogdHJ1ZSwgcHJlc2VydmVDaGlsZHJlbk9yZGVyOiB0cnVlIH0sXG4gICAgICAgICAgICAgIChlcnJvciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWx0byA9IHRoaXMuYWx0b0J1aWxkZXIud2l0aEFsdG9YbWwocmVzdWx0LmFsdG8pLmJ1aWxkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUb0NhY2hlKGluZGV4LCBhbHRvKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvbmUob2JzZXJ2ZXIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBkYXRhLmVycjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIHRoaXMuZXJyb3Iob2JzZXJ2ZXIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkVG9DYWNoZShpbmRleDogbnVtYmVyLCBhbHRvOiBBbHRvKSB7XG4gICAgdGhpcy5hbHRvc1tpbmRleF0gPSB0aGlzLmh0bWxGb3JtYXR0ZXIuYWx0b1RvSHRtbChhbHRvKTtcbiAgfVxuXG4gIHByaXZhdGUgZG9uZShvYnNlcnZlcjogU3Vic2NyaWJlcjx2b2lkPikge1xuICAgIHRoaXMudGV4dENvbnRlbnRSZWFkeS5uZXh0KCk7XG4gICAgdGhpcy5jb21wbGV0ZShvYnNlcnZlcik7XG4gIH1cblxuICBwcml2YXRlIGVycm9yKG9ic2VydmVyOiBTdWJzY3JpYmVyPHZvaWQ+KSB7XG4gICAgdGhpcy50ZXh0RXJyb3IubmV4dCh0aGlzLmludGwudGV4dENvbnRlbnRFcnJvckxhYmVsKTtcbiAgICB0aGlzLmNvbXBsZXRlKG9ic2VydmVyKTtcbiAgfVxuXG4gIHByaXZhdGUgY29tcGxldGUob2JzZXJ2ZXI6IFN1YnNjcmliZXI8dm9pZD4pIHtcbiAgICBvYnNlcnZlci5uZXh0KCk7XG4gICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgfVxufVxuIl19