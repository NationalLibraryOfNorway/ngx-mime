import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, forkJoin, Observable, of, Subject, Subscription, } from 'rxjs';
import { catchError, debounceTime, finalize, take } from 'rxjs/operators';
import { parseString } from 'xml2js';
import { AltoBuilder } from '../builders/alto';
import { CanvasService } from '../canvas-service/canvas-service';
import { HighlightService } from '../highlight-service/highlight.service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../intl';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: AltoService, deps: [{ token: i1.MimeViewerIntl }, { token: i2.HttpClient }, { token: i3.IiifManifestService }, { token: i4.HighlightService }, { token: i5.CanvasService }, { token: i6.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: AltoService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: AltoService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.MimeViewerIntl }, { type: i2.HttpClient }, { type: i3.IiifManifestService }, { type: i4.HighlightService }, { type: i5.CanvasService }, { type: i6.DomSanitizer }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0by5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvYWx0by1zZXJ2aWNlL2FsdG8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ25FLE9BQU8sRUFDTCxlQUFlLEVBQ2YsUUFBUSxFQUNSLFVBQVUsRUFDVixFQUFFLEVBQ0YsT0FBTyxFQUVQLFlBQVksR0FDYixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDckYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUV6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQTZCLE1BQU0sV0FBVyxDQUFDO0FBSTFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7Ozs7QUFHakQsTUFBTSxPQUFPLFdBQVc7SUFrQnRCLFlBQ1MsSUFBb0IsRUFDbkIsSUFBZ0IsRUFDaEIsbUJBQXdDLEVBQ3hDLGdCQUFrQyxF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LFdBQVc7OzJGQUFYLFdBQVc7a0JBRHZCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgZm9ya0pvaW4sXG4gIE9ic2VydmFibGUsXG4gIG9mLFxuICBTdWJqZWN0LFxuICBTdWJzY3JpYmVyLFxuICBTdWJzY3JpcHRpb24sXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZGVib3VuY2VUaW1lLCBmaW5hbGl6ZSwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHBhcnNlU3RyaW5nIH0gZnJvbSAneG1sMmpzJztcbmltcG9ydCB7IEFsdG9CdWlsZGVyIH0gZnJvbSAnLi4vYnVpbGRlcnMvYWx0byc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgSGlnaGxpZ2h0U2VydmljZSB9IGZyb20gJy4uL2hpZ2hsaWdodC1zZXJ2aWNlL2hpZ2hsaWdodC5zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZNYW5pZmVzdFNlcnZpY2UgfSBmcm9tICcuLi9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi4vaW50bCc7XG5pbXBvcnQgeyBNaW1lVmlld2VyQ29uZmlnIH0gZnJvbSAnLi4vbWltZS12aWV3ZXItY29uZmlnJztcbmltcG9ydCB7IFJlY29nbml6ZWRUZXh0TW9kZSwgUmVjb2duaXplZFRleHRNb2RlQ2hhbmdlcyB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBIaXQgfSBmcm9tICcuLy4uLy4uL2NvcmUvbW9kZWxzL2hpdCc7XG5pbXBvcnQgeyBBbHRvIH0gZnJvbSAnLi9hbHRvLm1vZGVsJztcbmltcG9ydCB7IEh0bWxGb3JtYXR0ZXIgfSBmcm9tICcuL2h0bWwuZm9ybWF0dGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFsdG9TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb25maWchOiBNaW1lVmlld2VyQ29uZmlnO1xuICBwcml2YXRlIGFsdG9zOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIGlzTG9hZGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBwcml2YXRlIHRleHRDb250ZW50UmVhZHkgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIHRleHRFcnJvciA9IG5ldyBTdWJqZWN0PHN0cmluZyB8IHVuZGVmaW5lZD4oKTtcbiAgcHJpdmF0ZSBtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBwcml2YXRlIGFsdG9CdWlsZGVyID0gbmV3IEFsdG9CdWlsZGVyKCk7XG4gIHByaXZhdGUgaHRtbEZvcm1hdHRlciE6IEh0bWxGb3JtYXR0ZXI7XG4gIHByaXZhdGUgaGl0czogSGl0W10gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX3JlY29nbml6ZWRUZXh0Q29udGVudE1vZGVDaGFuZ2VzID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PFJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXM+KHtcbiAgICAgIHByZXZpb3VzVmFsdWU6IFJlY29nbml6ZWRUZXh0TW9kZS5OT05FLFxuICAgICAgY3VycmVudFZhbHVlOiBSZWNvZ25pemVkVGV4dE1vZGUuTk9ORSxcbiAgICB9KTtcbiAgcHJpdmF0ZSBwcmV2aW91c1JlY29nbml6ZWRUZXh0TW9kZSA9IFJlY29nbml6ZWRUZXh0TW9kZS5OT05FO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpbnRsOiBNaW1lVmlld2VySW50bCxcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBpaWlmTWFuaWZlc3RTZXJ2aWNlOiBJaWlmTWFuaWZlc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgaGlnaGxpZ2h0U2VydmljZTogSGlnaGxpZ2h0U2VydmljZSxcbiAgICBwcml2YXRlIGNhbnZhc1NlcnZpY2U6IENhbnZhc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplclxuICApIHt9XG5cbiAgZ2V0IG9uUmVjb2duaXplZFRleHRDb250ZW50TW9kZUNoYW5nZSQoKTogT2JzZXJ2YWJsZTxSZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29nbml6ZWRUZXh0Q29udGVudE1vZGVDaGFuZ2VzLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IG9uVGV4dENvbnRlbnRSZWFkeSQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMudGV4dENvbnRlbnRSZWFkeS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBpc0xvYWRpbmckKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmlzTG9hZGluZy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBoYXNFcnJvcnMkKCk6IE9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMudGV4dEVycm9yLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IHJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUoKTogUmVjb2duaXplZFRleHRNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb2duaXplZFRleHRDb250ZW50TW9kZUNoYW5nZXMudmFsdWUuY3VycmVudFZhbHVlO1xuICB9XG5cbiAgc2V0IHJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUodmFsdWU6IFJlY29nbml6ZWRUZXh0TW9kZSkge1xuICAgIHRoaXMuX3JlY29nbml6ZWRUZXh0Q29udGVudE1vZGVDaGFuZ2VzLm5leHQoe1xuICAgICAgY3VycmVudFZhbHVlOiB2YWx1ZSxcbiAgICAgIHByZXZpb3VzVmFsdWU6IHRoaXMucHJldmlvdXNSZWNvZ25pemVkVGV4dE1vZGUsXG4gICAgfSk7XG4gICAgdGhpcy5wcmV2aW91c1JlY29nbml6ZWRUZXh0TW9kZSA9IHZhbHVlO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShoaXRzPzogSGl0W10pIHtcbiAgICB0aGlzLmhpdHMgPSBoaXRzO1xuICAgIHRoaXMuaHRtbEZvcm1hdHRlciA9IG5ldyBIdG1sRm9ybWF0dGVyKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5jdXJyZW50TWFuaWZlc3Quc3Vic2NyaWJlKFxuICAgICAgICAobWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCkgPT4ge1xuICAgICAgICAgIHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcbiAgICAgICAgICB0aGlzLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLm9uQ2FudmFzR3JvdXBJbmRleENoYW5nZVxuICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoMjAwKSlcbiAgICAgICAgLnN1YnNjcmliZSgoY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIHRoaXMudGV4dEVycm9yLm5leHQodW5kZWZpbmVkKTtcbiAgICAgICAgICBjb25zdCBzb3VyY2VzOiBPYnNlcnZhYmxlPHZvaWQ+W10gPSBbXTtcblxuICAgICAgICAgIGNvbnN0IGNhbnZhc0dyb3VwID0gdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc2VzUGVyQ2FudmFzR3JvdXAoXG4gICAgICAgICAgICBjdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoIWNhbnZhc0dyb3VwIHx8IGNhbnZhc0dyb3VwLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZEFsdG9Tb3VyY2UoY2FudmFzR3JvdXBbMF0sIHNvdXJjZXMpO1xuICAgICAgICAgIGlmIChjYW52YXNHcm91cC5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQWx0b1NvdXJjZShjYW52YXNHcm91cFsxXSwgc291cmNlcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nLm5leHQodHJ1ZSk7XG4gICAgICAgICAgZm9ya0pvaW4oc291cmNlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICBmaW5hbGl6ZSgoKSA9PiB0aGlzLmlzTG9hZGluZy5uZXh0KGZhbHNlKSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgPSB0aGlzLmNvbmZpZz8uaW5pdFJlY29nbml6ZWRUZXh0Q29udGVudE1vZGVcbiAgICAgID8gdGhpcy5jb25maWc/LmluaXRSZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlXG4gICAgICA6IFJlY29nbml6ZWRUZXh0TW9kZS5OT05FO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jbGVhckNhY2hlKCk7XG4gIH1cblxuICBzZXRDb25maWcoY29uZmlnOiBNaW1lVmlld2VyQ29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gIH1cblxuICBzaG93UmVjb2duaXplZFRleHRDb250ZW50T25seSgpIHtcbiAgICB0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgPSBSZWNvZ25pemVkVGV4dE1vZGUuT05MWTtcbiAgfVxuXG4gIHNob3dSZWNvZ25pemVkVGV4dENvbnRlbnRJblNwbGl0VmlldygpIHtcbiAgICB0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgPSBSZWNvZ25pemVkVGV4dE1vZGUuU1BMSVQ7XG4gIH1cblxuICBjbG9zZVJlY29nbml6ZWRUZXh0Q29udGVudCgpIHtcbiAgICB0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgPSBSZWNvZ25pemVkVGV4dE1vZGUuTk9ORTtcbiAgfVxuXG4gIGdldEh0bWwoaW5kZXg6IG51bWJlcik6IFNhZmVIdG1sIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5hbHRvcyAmJiB0aGlzLmFsdG9zLmxlbmd0aCA+PSBpbmRleCArIDFcbiAgICAgID8gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoXG4gICAgICAgICAgdGhpcy5oaWdobGlnaHRTZXJ2aWNlLmhpZ2hsaWdodCh0aGlzLmFsdG9zW2luZGV4XSwgaW5kZXgsIHRoaXMuaGl0cylcbiAgICAgICAgKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBjbGVhckNhY2hlKCkge1xuICAgIHRoaXMuYWx0b3MgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkQWx0b1NvdXJjZShpbmRleDogbnVtYmVyLCBzb3VyY2VzOiBPYnNlcnZhYmxlPHZvaWQ+W10pIHtcbiAgICBpZiAodGhpcy5tYW5pZmVzdCAmJiB0aGlzLm1hbmlmZXN0LnNlcXVlbmNlcykge1xuICAgICAgY29uc3Qgc2VxID0gdGhpcy5tYW5pZmVzdC5zZXF1ZW5jZXNbMF07XG4gICAgICBpZiAoc2VxLmNhbnZhc2VzKSB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHNlcS5jYW52YXNlc1tpbmRleF07XG4gICAgICAgIGlmIChjYW52YXMgJiYgY2FudmFzLmFsdG9VcmwpIHtcbiAgICAgICAgICBzb3VyY2VzLnB1c2godGhpcy5hZGQoaW5kZXgsIGNhbnZhcy5hbHRvVXJsKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZChpbmRleDogbnVtYmVyLCB1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXIpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzSW5DYWNoZShpbmRleCkpIHtcbiAgICAgICAgdGhpcy5kb25lKG9ic2VydmVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9hZChvYnNlcnZlciwgaW5kZXgsIHVybCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGlzSW5DYWNoZShpbmRleDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuYWx0b3NbaW5kZXhdO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkKG9ic2VydmVyOiBTdWJzY3JpYmVyPHZvaWQ+LCBpbmRleDogbnVtYmVyLCB1cmw6IHN0cmluZykge1xuICAgIHRoaXMuaHR0cFxuICAgICAgLmdldCh1cmwsIHtcbiAgICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKCkuc2V0KCdDb250ZW50LVR5cGUnLCAndGV4dC94bWwnKSxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAndGV4dCcsXG4gICAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycikgPT4gb2YoeyBpc0Vycm9yOiB0cnVlLCBlcnJvcjogZXJyIH0pKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoZGF0YTogQWx0byB8IGFueSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghZGF0YS5pc0Vycm9yKSB7XG4gICAgICAgICAgICBwYXJzZVN0cmluZyhcbiAgICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgICAgeyBleHBsaWNpdENoaWxkcmVuOiB0cnVlLCBwcmVzZXJ2ZUNoaWxkcmVuT3JkZXI6IHRydWUgfSxcbiAgICAgICAgICAgICAgKGVycm9yLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhbHRvID0gdGhpcy5hbHRvQnVpbGRlci53aXRoQWx0b1htbChyZXN1bHQuYWx0bykuYnVpbGQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRvQ2FjaGUoaW5kZXgsIGFsdG8pO1xuICAgICAgICAgICAgICAgIHRoaXMuZG9uZShvYnNlcnZlcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGRhdGEuZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgdGhpcy5lcnJvcihvYnNlcnZlcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRUb0NhY2hlKGluZGV4OiBudW1iZXIsIGFsdG86IEFsdG8pIHtcbiAgICB0aGlzLmFsdG9zW2luZGV4XSA9IHRoaXMuaHRtbEZvcm1hdHRlci5hbHRvVG9IdG1sKGFsdG8pO1xuICB9XG5cbiAgcHJpdmF0ZSBkb25lKG9ic2VydmVyOiBTdWJzY3JpYmVyPHZvaWQ+KSB7XG4gICAgdGhpcy50ZXh0Q29udGVudFJlYWR5Lm5leHQoKTtcbiAgICB0aGlzLmNvbXBsZXRlKG9ic2VydmVyKTtcbiAgfVxuXG4gIHByaXZhdGUgZXJyb3Iob2JzZXJ2ZXI6IFN1YnNjcmliZXI8dm9pZD4pIHtcbiAgICB0aGlzLnRleHRFcnJvci5uZXh0KHRoaXMuaW50bC50ZXh0Q29udGVudEVycm9yTGFiZWwpO1xuICAgIHRoaXMuY29tcGxldGUob2JzZXJ2ZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wbGV0ZShvYnNlcnZlcjogU3Vic2NyaWJlcjx2b2lkPikge1xuICAgIG9ic2VydmVyLm5leHQoKTtcbiAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=