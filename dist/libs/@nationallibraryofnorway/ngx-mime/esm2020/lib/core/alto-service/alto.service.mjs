import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of, Subject, Subscription, } from 'rxjs';
import { catchError, debounceTime, finalize, take } from 'rxjs/operators';
import { parseString } from 'xml2js';
import { AltoBuilder } from '../builders/alto';
import { RecognizedTextMode } from '../models';
import { HtmlFormatter } from './html.formatter';
import * as i0 from "@angular/core";
import * as i1 from "../intl";
import * as i2 from "@angular/common/http";
import * as i3 from "../iiif-manifest-service/iiif-manifest-service";
import * as i4 from "../highlight-service/highlight.service";
import * as i5 from "../canvas-service/canvas-service";
import * as i6 from "@angular/platform-browser";
export class AltoService {
    constructor(intl, http, iiifManifestService, highlightService, canvasService, sanitizer) {
        this.intl = intl;
        this.http = http;
        this.iiifManifestService = iiifManifestService;
        this.highlightService = highlightService;
        this.canvasService = canvasService;
        this.sanitizer = sanitizer;
        this.altos = [];
        this.isLoading = new BehaviorSubject(false);
        this.textContentReady = new Subject();
        this.textError = new Subject();
        this.manifest = null;
        this.subscriptions = new Subscription();
        this.altoBuilder = new AltoBuilder();
        this._recognizedTextContentModeChanges = new BehaviorSubject({
            previousValue: RecognizedTextMode.NONE,
            currentValue: RecognizedTextMode.NONE,
        });
        this.previousRecognizedTextMode = RecognizedTextMode.NONE;
    }
    get onRecognizedTextContentModeChange$() {
        return this._recognizedTextContentModeChanges.asObservable();
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
    get recognizedTextContentMode() {
        return this._recognizedTextContentModeChanges.value.currentValue;
    }
    set recognizedTextContentMode(value) {
        this._recognizedTextContentModeChanges.next({
            currentValue: value,
            previousValue: this.previousRecognizedTextMode,
        });
        this.previousRecognizedTextMode = value;
    }
    initialize(hits) {
        this.hits = hits;
        this.htmlFormatter = new HtmlFormatter();
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
            if (!canvasGroup || canvasGroup.length === 0) {
                return;
            }
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
        this.recognizedTextContentMode = this.config?.initRecognizedTextContentMode
            ? this.config?.initRecognizedTextContentMode
            : RecognizedTextMode.NONE;
        this.subscriptions.unsubscribe();
        this.clearCache();
    }
    setConfig(config) {
        this.config = config;
    }
    showRecognizedTextContentOnly() {
        this.recognizedTextContentMode = RecognizedTextMode.ONLY;
    }
    showRecognizedTextContentInSplitView() {
        this.recognizedTextContentMode = RecognizedTextMode.SPLIT;
    }
    closeRecognizedTextContent() {
        this.recognizedTextContentMode = RecognizedTextMode.NONE;
    }
    getHtml(index) {
        return this.altos && this.altos.length >= index + 1
            ? this.sanitizer.bypassSecurityTrustHtml(this.highlightService.highlight(this.altos[index], index, this.hits))
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
AltoService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: AltoService, deps: [{ token: i1.MimeViewerIntl }, { token: i2.HttpClient }, { token: i3.IiifManifestService }, { token: i4.HighlightService }, { token: i5.CanvasService }, { token: i6.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable });
AltoService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: AltoService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: AltoService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.MimeViewerIntl }, { type: i2.HttpClient }, { type: i3.IiifManifestService }, { type: i4.HighlightService }, { type: i5.CanvasService }, { type: i6.DomSanitizer }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0by5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvYWx0by1zZXJ2aWNlL2FsdG8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLFFBQVEsRUFDUixVQUFVLEVBQ1YsRUFBRSxFQUNGLE9BQU8sRUFFUCxZQUFZLEdBQ2IsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNyQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFNL0MsT0FBTyxFQUFFLGtCQUFrQixFQUE2QixNQUFNLFdBQVcsQ0FBQztBQUkxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7O0FBS2pELE1BQU0sT0FBTyxXQUFXO0lBa0J0QixZQUNTLElBQW9CLEVBQ25CLElBQWdCLEVBQ2hCLG1CQUF3QyxFQUN4QyxnQkFBa0MsRUFDbEMsYUFBNEIsRUFDNUIsU0FBdUI7UUFMeEIsU0FBSSxHQUFKLElBQUksQ0FBZ0I7UUFDbkIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQXRCekIsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUNyQixj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QyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxVQUFVLENBQUMsS0FBYSxFQUFFLElBQVU7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU8sSUFBSSxDQUFDLFFBQTBCO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTyxLQUFLLENBQUMsUUFBMEI7UUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVPLFFBQVEsQ0FBQyxRQUEwQjtRQUN6QyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3RCLENBQUM7O3dHQWpOVSxXQUFXOzRHQUFYLFdBQVcsY0FGVixNQUFNOzJGQUVQLFdBQVc7a0JBSHZCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGZvcmtKb2luLFxuICBPYnNlcnZhYmxlLFxuICBvZixcbiAgU3ViamVjdCxcbiAgU3Vic2NyaWJlcixcbiAgU3Vic2NyaXB0aW9uLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGRlYm91bmNlVGltZSwgZmluYWxpemUsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBwYXJzZVN0cmluZyB9IGZyb20gJ3htbDJqcyc7XG5pbXBvcnQgeyBBbHRvQnVpbGRlciB9IGZyb20gJy4uL2J1aWxkZXJzL2FsdG8nO1xuaW1wb3J0IHsgQ2FudmFzU2VydmljZSB9IGZyb20gJy4uL2NhbnZhcy1zZXJ2aWNlL2NhbnZhcy1zZXJ2aWNlJztcbmltcG9ydCB7IEhpZ2hsaWdodFNlcnZpY2UgfSBmcm9tICcuLi9oaWdobGlnaHQtc2VydmljZS9oaWdobGlnaHQuc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3Qtc2VydmljZSc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4uL2ludGwnO1xuaW1wb3J0IHsgTWltZVZpZXdlckNvbmZpZyB9IGZyb20gJy4uL21pbWUtdmlld2VyLWNvbmZpZyc7XG5pbXBvcnQgeyBSZWNvZ25pemVkVGV4dE1vZGUsIFJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXMgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgSGl0IH0gZnJvbSAnLi8uLi8uLi9jb3JlL21vZGVscy9oaXQnO1xuaW1wb3J0IHsgQWx0byB9IGZyb20gJy4vYWx0by5tb2RlbCc7XG5pbXBvcnQgeyBIdG1sRm9ybWF0dGVyIH0gZnJvbSAnLi9odG1sLmZvcm1hdHRlcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBbHRvU2VydmljZSB7XG4gIHByaXZhdGUgY29uZmlnITogTWltZVZpZXdlckNvbmZpZztcbiAgcHJpdmF0ZSBhbHRvczogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBpc0xvYWRpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgcHJpdmF0ZSB0ZXh0Q29udGVudFJlYWR5ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSB0ZXh0RXJyb3IgPSBuZXcgU3ViamVjdDxzdHJpbmcgfCB1bmRlZmluZWQ+KCk7XG4gIHByaXZhdGUgbWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJpdmF0ZSBhbHRvQnVpbGRlciA9IG5ldyBBbHRvQnVpbGRlcigpO1xuICBwcml2YXRlIGh0bWxGb3JtYXR0ZXIhOiBIdG1sRm9ybWF0dGVyO1xuICBwcml2YXRlIGhpdHM6IEhpdFtdIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlQ2hhbmdlcyA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxSZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzPih7XG4gICAgICBwcmV2aW91c1ZhbHVlOiBSZWNvZ25pemVkVGV4dE1vZGUuTk9ORSxcbiAgICAgIGN1cnJlbnRWYWx1ZTogUmVjb2duaXplZFRleHRNb2RlLk5PTkUsXG4gICAgfSk7XG4gIHByaXZhdGUgcHJldmlvdXNSZWNvZ25pemVkVGV4dE1vZGUgPSBSZWNvZ25pemVkVGV4dE1vZGUuTk9ORTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgaWlpZk1hbmlmZXN0U2VydmljZTogSWlpZk1hbmlmZXN0U2VydmljZSxcbiAgICBwcml2YXRlIGhpZ2hsaWdodFNlcnZpY2U6IEhpZ2hsaWdodFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXJcbiAgKSB7fVxuXG4gIGdldCBvblJlY29nbml6ZWRUZXh0Q29udGVudE1vZGVDaGFuZ2UkKCk6IE9ic2VydmFibGU8UmVjb2duaXplZFRleHRNb2RlQ2hhbmdlcz4ge1xuICAgIHJldHVybiB0aGlzLl9yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlQ2hhbmdlcy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBvblRleHRDb250ZW50UmVhZHkkKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLnRleHRDb250ZW50UmVhZHkuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgaXNMb2FkaW5nJCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5pc0xvYWRpbmcuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgaGFzRXJyb3JzJCgpOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLnRleHRFcnJvci5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCByZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlKCk6IFJlY29nbml6ZWRUZXh0TW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29nbml6ZWRUZXh0Q29udGVudE1vZGVDaGFuZ2VzLnZhbHVlLmN1cnJlbnRWYWx1ZTtcbiAgfVxuXG4gIHNldCByZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlKHZhbHVlOiBSZWNvZ25pemVkVGV4dE1vZGUpIHtcbiAgICB0aGlzLl9yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlQ2hhbmdlcy5uZXh0KHtcbiAgICAgIGN1cnJlbnRWYWx1ZTogdmFsdWUsXG4gICAgICBwcmV2aW91c1ZhbHVlOiB0aGlzLnByZXZpb3VzUmVjb2duaXplZFRleHRNb2RlLFxuICAgIH0pO1xuICAgIHRoaXMucHJldmlvdXNSZWNvZ25pemVkVGV4dE1vZGUgPSB2YWx1ZTtcbiAgfVxuXG4gIGluaXRpYWxpemUoaGl0cz86IEhpdFtdKSB7XG4gICAgdGhpcy5oaXRzID0gaGl0cztcbiAgICB0aGlzLmh0bWxGb3JtYXR0ZXIgPSBuZXcgSHRtbEZvcm1hdHRlcigpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuY3VycmVudE1hbmlmZXN0LnN1YnNjcmliZShcbiAgICAgICAgKG1hbmlmZXN0OiBNYW5pZmVzdCB8IG51bGwpID0+IHtcbiAgICAgICAgICB0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG4gICAgICAgICAgdGhpcy5jbGVhckNhY2hlKCk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5vbkNhbnZhc0dyb3VwSW5kZXhDaGFuZ2VcbiAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDIwMCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKGN1cnJlbnRDYW52YXNHcm91cEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICB0aGlzLnRleHRFcnJvci5uZXh0KHVuZGVmaW5lZCk7XG4gICAgICAgICAgY29uc3Qgc291cmNlczogT2JzZXJ2YWJsZTx2b2lkPltdID0gW107XG5cbiAgICAgICAgICBjb25zdCBjYW52YXNHcm91cCA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNlc1BlckNhbnZhc0dyb3VwKFxuICAgICAgICAgICAgY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKCFjYW52YXNHcm91cCB8fCBjYW52YXNHcm91cC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRBbHRvU291cmNlKGNhbnZhc0dyb3VwWzBdLCBzb3VyY2VzKTtcbiAgICAgICAgICBpZiAoY2FudmFzR3JvdXAubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEFsdG9Tb3VyY2UoY2FudmFzR3JvdXBbMV0sIHNvdXJjZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmlzTG9hZGluZy5uZXh0KHRydWUpO1xuICAgICAgICAgIGZvcmtKb2luKHNvdXJjZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5pc0xvYWRpbmcubmV4dChmYWxzZSkpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlID0gdGhpcy5jb25maWc/LmluaXRSZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlXG4gICAgICA/IHRoaXMuY29uZmlnPy5pbml0UmVjb2duaXplZFRleHRDb250ZW50TW9kZVxuICAgICAgOiBSZWNvZ25pemVkVGV4dE1vZGUuTk9ORTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY2xlYXJDYWNoZSgpO1xuICB9XG5cbiAgc2V0Q29uZmlnKGNvbmZpZzogTWltZVZpZXdlckNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgc2hvd1JlY29nbml6ZWRUZXh0Q29udGVudE9ubHkoKSB7XG4gICAgdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlID0gUmVjb2duaXplZFRleHRNb2RlLk9OTFk7XG4gIH1cblxuICBzaG93UmVjb2duaXplZFRleHRDb250ZW50SW5TcGxpdFZpZXcoKSB7XG4gICAgdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlID0gUmVjb2duaXplZFRleHRNb2RlLlNQTElUO1xuICB9XG5cbiAgY2xvc2VSZWNvZ25pemVkVGV4dENvbnRlbnQoKSB7XG4gICAgdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlID0gUmVjb2duaXplZFRleHRNb2RlLk5PTkU7XG4gIH1cblxuICBnZXRIdG1sKGluZGV4OiBudW1iZXIpOiBTYWZlSHRtbCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuYWx0b3MgJiYgdGhpcy5hbHRvcy5sZW5ndGggPj0gaW5kZXggKyAxXG4gICAgICA/IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKFxuICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0U2VydmljZS5oaWdobGlnaHQodGhpcy5hbHRvc1tpbmRleF0sIGluZGV4LCB0aGlzLmhpdHMpXG4gICAgICAgIClcbiAgICAgIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgY2xlYXJDYWNoZSgpIHtcbiAgICB0aGlzLmFsdG9zID0gW107XG4gIH1cblxuICBwcml2YXRlIGFkZEFsdG9Tb3VyY2UoaW5kZXg6IG51bWJlciwgc291cmNlczogT2JzZXJ2YWJsZTx2b2lkPltdKSB7XG4gICAgaWYgKHRoaXMubWFuaWZlc3QgJiYgdGhpcy5tYW5pZmVzdC5zZXF1ZW5jZXMpIHtcbiAgICAgIGNvbnN0IHNlcSA9IHRoaXMubWFuaWZlc3Quc2VxdWVuY2VzWzBdO1xuICAgICAgaWYgKHNlcS5jYW52YXNlcykge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBzZXEuY2FudmFzZXNbaW5kZXhdO1xuICAgICAgICBpZiAoY2FudmFzICYmIGNhbnZhcy5hbHRvVXJsKSB7XG4gICAgICAgICAgc291cmNlcy5wdXNoKHRoaXMuYWRkKGluZGV4LCBjYW52YXMuYWx0b1VybCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGQoaW5kZXg6IG51bWJlciwgdXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc0luQ2FjaGUoaW5kZXgpKSB7XG4gICAgICAgIHRoaXMuZG9uZShvYnNlcnZlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvYWQob2JzZXJ2ZXIsIGluZGV4LCB1cmwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0luQ2FjaGUoaW5kZXg6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmFsdG9zW2luZGV4XTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZChvYnNlcnZlcjogU3Vic2NyaWJlcjx2b2lkPiwgaW5kZXg6IG51bWJlciwgdXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLmh0dHBcbiAgICAgIC5nZXQodXJsLCB7XG4gICAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycygpLnNldCgnQ29udGVudC1UeXBlJywgJ3RleHQveG1sJyksXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ3RleHQnLFxuICAgICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICBjYXRjaEVycm9yKChlcnIpID0+IG9mKHsgaXNFcnJvcjogdHJ1ZSwgZXJyb3I6IGVyciB9KSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGRhdGE6IEFsdG8gfCBhbnkpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIWRhdGEuaXNFcnJvcikge1xuICAgICAgICAgICAgcGFyc2VTdHJpbmcoXG4gICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgIHsgZXhwbGljaXRDaGlsZHJlbjogdHJ1ZSwgcHJlc2VydmVDaGlsZHJlbk9yZGVyOiB0cnVlIH0sXG4gICAgICAgICAgICAgIChlcnJvciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWx0byA9IHRoaXMuYWx0b0J1aWxkZXIud2l0aEFsdG9YbWwocmVzdWx0LmFsdG8pLmJ1aWxkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUb0NhY2hlKGluZGV4LCBhbHRvKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvbmUob2JzZXJ2ZXIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBkYXRhLmVycjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIHRoaXMuZXJyb3Iob2JzZXJ2ZXIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkVG9DYWNoZShpbmRleDogbnVtYmVyLCBhbHRvOiBBbHRvKSB7XG4gICAgdGhpcy5hbHRvc1tpbmRleF0gPSB0aGlzLmh0bWxGb3JtYXR0ZXIuYWx0b1RvSHRtbChhbHRvKTtcbiAgfVxuXG4gIHByaXZhdGUgZG9uZShvYnNlcnZlcjogU3Vic2NyaWJlcjx2b2lkPikge1xuICAgIHRoaXMudGV4dENvbnRlbnRSZWFkeS5uZXh0KCk7XG4gICAgdGhpcy5jb21wbGV0ZShvYnNlcnZlcik7XG4gIH1cblxuICBwcml2YXRlIGVycm9yKG9ic2VydmVyOiBTdWJzY3JpYmVyPHZvaWQ+KSB7XG4gICAgdGhpcy50ZXh0RXJyb3IubmV4dCh0aGlzLmludGwudGV4dENvbnRlbnRFcnJvckxhYmVsKTtcbiAgICB0aGlzLmNvbXBsZXRlKG9ic2VydmVyKTtcbiAgfVxuXG4gIHByaXZhdGUgY29tcGxldGUob2JzZXJ2ZXI6IFN1YnNjcmliZXI8dm9pZD4pIHtcbiAgICBvYnNlcnZlci5uZXh0KCk7XG4gICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgfVxufVxuIl19