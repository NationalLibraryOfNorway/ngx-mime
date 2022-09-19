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
AltoService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: AltoService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: AltoService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MimeViewerIntl }, { type: i2.HttpClient }, { type: i3.IiifManifestService }, { type: i4.HighlightService }, { type: i5.CanvasService }, { type: i6.DomSanitizer }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0by5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvYWx0by1zZXJ2aWNlL2FsdG8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLFFBQVEsRUFDUixVQUFVLEVBQ1YsRUFBRSxFQUNGLE9BQU8sRUFFUCxZQUFZLEdBQ2IsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNyQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFNL0MsT0FBTyxFQUFFLGtCQUFrQixFQUE2QixNQUFNLFdBQVcsQ0FBQztBQUkxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7O0FBR2pELE1BQU0sT0FBTyxXQUFXO0lBa0J0QixZQUNTLElBQW9CLEVBQ25CLElBQWdCLEVBQ2hCLG1CQUF3QyxFQUN4QyxnQkFBa0MsRUFDbEMsYUFBNEIsRUFDNUIsU0FBdUI7UUFMeEIsU0FBSSxHQUFKLElBQUksQ0FBZ0I7UUFDbkIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQXRCekIsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUNyQixj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QyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxVQUFVLENBQUMsS0FBYSxFQUFFLElBQVU7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU8sSUFBSSxDQUFDLFFBQTBCO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTyxLQUFLLENBQUMsUUFBMEI7UUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVPLFFBQVEsQ0FBQyxRQUEwQjtRQUN6QyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3RCLENBQUM7O3dHQWpOVSxXQUFXOzRHQUFYLFdBQVc7MkZBQVgsV0FBVztrQkFEdkIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBmb3JrSm9pbixcbiAgT2JzZXJ2YWJsZSxcbiAgb2YsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmliZXIsXG4gIFN1YnNjcmlwdGlvbixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBkZWJvdW5jZVRpbWUsIGZpbmFsaXplLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgcGFyc2VTdHJpbmcgfSBmcm9tICd4bWwyanMnO1xuaW1wb3J0IHsgQWx0b0J1aWxkZXIgfSBmcm9tICcuLi9idWlsZGVycy9hbHRvJztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLi9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBIaWdobGlnaHRTZXJ2aWNlIH0gZnJvbSAnLi4vaGlnaGxpZ2h0LXNlcnZpY2UvaGlnaGxpZ2h0LnNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZk1hbmlmZXN0U2VydmljZSB9IGZyb20gJy4uL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuLi9pbnRsJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJDb25maWcgfSBmcm9tICcuLi9taW1lLXZpZXdlci1jb25maWcnO1xuaW1wb3J0IHsgUmVjb2duaXplZFRleHRNb2RlLCBSZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IE1hbmlmZXN0IH0gZnJvbSAnLi4vbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IEhpdCB9IGZyb20gJy4vLi4vLi4vY29yZS9tb2RlbHMvaGl0JztcbmltcG9ydCB7IEFsdG8gfSBmcm9tICcuL2FsdG8ubW9kZWwnO1xuaW1wb3J0IHsgSHRtbEZvcm1hdHRlciB9IGZyb20gJy4vaHRtbC5mb3JtYXR0ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWx0b1NlcnZpY2Uge1xuICBwcml2YXRlIGNvbmZpZyE6IE1pbWVWaWV3ZXJDb25maWc7XG4gIHByaXZhdGUgYWx0b3M6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgaXNMb2FkaW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gIHByaXZhdGUgdGV4dENvbnRlbnRSZWFkeSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgdGV4dEVycm9yID0gbmV3IFN1YmplY3Q8c3RyaW5nIHwgdW5kZWZpbmVkPigpO1xuICBwcml2YXRlIG1hbmlmZXN0OiBNYW5pZmVzdCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByaXZhdGUgYWx0b0J1aWxkZXIgPSBuZXcgQWx0b0J1aWxkZXIoKTtcbiAgcHJpdmF0ZSBodG1sRm9ybWF0dGVyITogSHRtbEZvcm1hdHRlcjtcbiAgcHJpdmF0ZSBoaXRzOiBIaXRbXSB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfcmVjb2duaXplZFRleHRDb250ZW50TW9kZUNoYW5nZXMgPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8UmVjb2duaXplZFRleHRNb2RlQ2hhbmdlcz4oe1xuICAgICAgcHJldmlvdXNWYWx1ZTogUmVjb2duaXplZFRleHRNb2RlLk5PTkUsXG4gICAgICBjdXJyZW50VmFsdWU6IFJlY29nbml6ZWRUZXh0TW9kZS5OT05FLFxuICAgIH0pO1xuICBwcml2YXRlIHByZXZpb3VzUmVjb2duaXplZFRleHRNb2RlID0gUmVjb2duaXplZFRleHRNb2RlLk5PTkU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGludGw6IE1pbWVWaWV3ZXJJbnRsLFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIGlpaWZNYW5pZmVzdFNlcnZpY2U6IElpaWZNYW5pZmVzdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRTZXJ2aWNlOiBIaWdobGlnaHRTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FudmFzU2VydmljZTogQ2FudmFzU2VydmljZSxcbiAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyXG4gICkge31cblxuICBnZXQgb25SZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlQ2hhbmdlJCgpOiBPYnNlcnZhYmxlPFJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXM+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb2duaXplZFRleHRDb250ZW50TW9kZUNoYW5nZXMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgb25UZXh0Q29udGVudFJlYWR5JCgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy50ZXh0Q29udGVudFJlYWR5LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGlzTG9hZGluZyQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNMb2FkaW5nLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGhhc0Vycm9ycyQoKTogT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy50ZXh0RXJyb3IuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgcmVjb2duaXplZFRleHRDb250ZW50TW9kZSgpOiBSZWNvZ25pemVkVGV4dE1vZGUge1xuICAgIHJldHVybiB0aGlzLl9yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlQ2hhbmdlcy52YWx1ZS5jdXJyZW50VmFsdWU7XG4gIH1cblxuICBzZXQgcmVjb2duaXplZFRleHRDb250ZW50TW9kZSh2YWx1ZTogUmVjb2duaXplZFRleHRNb2RlKSB7XG4gICAgdGhpcy5fcmVjb2duaXplZFRleHRDb250ZW50TW9kZUNoYW5nZXMubmV4dCh7XG4gICAgICBjdXJyZW50VmFsdWU6IHZhbHVlLFxuICAgICAgcHJldmlvdXNWYWx1ZTogdGhpcy5wcmV2aW91c1JlY29nbml6ZWRUZXh0TW9kZSxcbiAgICB9KTtcbiAgICB0aGlzLnByZXZpb3VzUmVjb2duaXplZFRleHRNb2RlID0gdmFsdWU7XG4gIH1cblxuICBpbml0aWFsaXplKGhpdHM/OiBIaXRbXSkge1xuICAgIHRoaXMuaGl0cyA9IGhpdHM7XG4gICAgdGhpcy5odG1sRm9ybWF0dGVyID0gbmV3IEh0bWxGb3JtYXR0ZXIoKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5tYW5pZmVzdCA9IG1hbmlmZXN0O1xuICAgICAgICAgIHRoaXMuY2xlYXJDYWNoZSgpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2Uub25DYW52YXNHcm91cEluZGV4Q2hhbmdlXG4gICAgICAgIC5waXBlKGRlYm91bmNlVGltZSgyMDApKVxuICAgICAgICAuc3Vic2NyaWJlKChjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgdGhpcy50ZXh0RXJyb3IubmV4dCh1bmRlZmluZWQpO1xuICAgICAgICAgIGNvbnN0IHNvdXJjZXM6IE9ic2VydmFibGU8dm9pZD5bXSA9IFtdO1xuXG4gICAgICAgICAgY29uc3QgY2FudmFzR3JvdXAgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q2FudmFzZXNQZXJDYW52YXNHcm91cChcbiAgICAgICAgICAgIGN1cnJlbnRDYW52YXNHcm91cEluZGV4XG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmICghY2FudmFzR3JvdXAgfHwgY2FudmFzR3JvdXAubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkQWx0b1NvdXJjZShjYW52YXNHcm91cFswXSwgc291cmNlcyk7XG4gICAgICAgICAgaWYgKGNhbnZhc0dyb3VwLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgdGhpcy5hZGRBbHRvU291cmNlKGNhbnZhc0dyb3VwWzFdLCBzb3VyY2VzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5pc0xvYWRpbmcubmV4dCh0cnVlKTtcbiAgICAgICAgICBmb3JrSm9pbihzb3VyY2VzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgIGZpbmFsaXplKCgpID0+IHRoaXMuaXNMb2FkaW5nLm5leHQoZmFsc2UpKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVjb2duaXplZFRleHRDb250ZW50TW9kZSA9IHRoaXMuY29uZmlnPy5pbml0UmVjb2duaXplZFRleHRDb250ZW50TW9kZVxuICAgICAgPyB0aGlzLmNvbmZpZz8uaW5pdFJlY29nbml6ZWRUZXh0Q29udGVudE1vZGVcbiAgICAgIDogUmVjb2duaXplZFRleHRNb2RlLk5PTkU7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNsZWFyQ2FjaGUoKTtcbiAgfVxuXG4gIHNldENvbmZpZyhjb25maWc6IE1pbWVWaWV3ZXJDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIHNob3dSZWNvZ25pemVkVGV4dENvbnRlbnRPbmx5KCkge1xuICAgIHRoaXMucmVjb2duaXplZFRleHRDb250ZW50TW9kZSA9IFJlY29nbml6ZWRUZXh0TW9kZS5PTkxZO1xuICB9XG5cbiAgc2hvd1JlY29nbml6ZWRUZXh0Q29udGVudEluU3BsaXRWaWV3KCkge1xuICAgIHRoaXMucmVjb2duaXplZFRleHRDb250ZW50TW9kZSA9IFJlY29nbml6ZWRUZXh0TW9kZS5TUExJVDtcbiAgfVxuXG4gIGNsb3NlUmVjb2duaXplZFRleHRDb250ZW50KCkge1xuICAgIHRoaXMucmVjb2duaXplZFRleHRDb250ZW50TW9kZSA9IFJlY29nbml6ZWRUZXh0TW9kZS5OT05FO1xuICB9XG5cbiAgZ2V0SHRtbChpbmRleDogbnVtYmVyKTogU2FmZUh0bWwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmFsdG9zICYmIHRoaXMuYWx0b3MubGVuZ3RoID49IGluZGV4ICsgMVxuICAgICAgPyB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChcbiAgICAgICAgICB0aGlzLmhpZ2hsaWdodFNlcnZpY2UuaGlnaGxpZ2h0KHRoaXMuYWx0b3NbaW5kZXhdLCBpbmRleCwgdGhpcy5oaXRzKVxuICAgICAgICApXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNsZWFyQ2FjaGUoKSB7XG4gICAgdGhpcy5hbHRvcyA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRBbHRvU291cmNlKGluZGV4OiBudW1iZXIsIHNvdXJjZXM6IE9ic2VydmFibGU8dm9pZD5bXSkge1xuICAgIGlmICh0aGlzLm1hbmlmZXN0ICYmIHRoaXMubWFuaWZlc3Quc2VxdWVuY2VzKSB7XG4gICAgICBjb25zdCBzZXEgPSB0aGlzLm1hbmlmZXN0LnNlcXVlbmNlc1swXTtcbiAgICAgIGlmIChzZXEuY2FudmFzZXMpIHtcbiAgICAgICAgY29uc3QgY2FudmFzID0gc2VxLmNhbnZhc2VzW2luZGV4XTtcbiAgICAgICAgaWYgKGNhbnZhcyAmJiBjYW52YXMuYWx0b1VybCkge1xuICAgICAgICAgIHNvdXJjZXMucHVzaCh0aGlzLmFkZChpbmRleCwgY2FudmFzLmFsdG9VcmwpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkKGluZGV4OiBudW1iZXIsIHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcikgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNJbkNhY2hlKGluZGV4KSkge1xuICAgICAgICB0aGlzLmRvbmUob2JzZXJ2ZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2FkKG9ic2VydmVyLCBpbmRleCwgdXJsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNJbkNhY2hlKGluZGV4OiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5hbHRvc1tpbmRleF07XG4gIH1cblxuICBwcml2YXRlIGxvYWQob2JzZXJ2ZXI6IFN1YnNjcmliZXI8dm9pZD4sIGluZGV4OiBudW1iZXIsIHVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5odHRwXG4gICAgICAuZ2V0KHVybCwge1xuICAgICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoKS5zZXQoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L3htbCcpLFxuICAgICAgICByZXNwb25zZVR5cGU6ICd0ZXh0JyxcbiAgICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgY2F0Y2hFcnJvcigoZXJyKSA9PiBvZih7IGlzRXJyb3I6IHRydWUsIGVycm9yOiBlcnIgfSkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChkYXRhOiBBbHRvIHwgYW55KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFkYXRhLmlzRXJyb3IpIHtcbiAgICAgICAgICAgIHBhcnNlU3RyaW5nKFxuICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICB7IGV4cGxpY2l0Q2hpbGRyZW46IHRydWUsIHByZXNlcnZlQ2hpbGRyZW5PcmRlcjogdHJ1ZSB9LFxuICAgICAgICAgICAgICAoZXJyb3IsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFsdG8gPSB0aGlzLmFsdG9CdWlsZGVyLndpdGhBbHRvWG1sKHJlc3VsdC5hbHRvKS5idWlsZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9DYWNoZShpbmRleCwgYWx0byk7XG4gICAgICAgICAgICAgICAgdGhpcy5kb25lKG9ic2VydmVyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZGF0YS5lcnI7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICB0aGlzLmVycm9yKG9ic2VydmVyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFRvQ2FjaGUoaW5kZXg6IG51bWJlciwgYWx0bzogQWx0bykge1xuICAgIHRoaXMuYWx0b3NbaW5kZXhdID0gdGhpcy5odG1sRm9ybWF0dGVyLmFsdG9Ub0h0bWwoYWx0byk7XG4gIH1cblxuICBwcml2YXRlIGRvbmUob2JzZXJ2ZXI6IFN1YnNjcmliZXI8dm9pZD4pIHtcbiAgICB0aGlzLnRleHRDb250ZW50UmVhZHkubmV4dCgpO1xuICAgIHRoaXMuY29tcGxldGUob2JzZXJ2ZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBlcnJvcihvYnNlcnZlcjogU3Vic2NyaWJlcjx2b2lkPikge1xuICAgIHRoaXMudGV4dEVycm9yLm5leHQodGhpcy5pbnRsLnRleHRDb250ZW50RXJyb3JMYWJlbCk7XG4gICAgdGhpcy5jb21wbGV0ZShvYnNlcnZlcik7XG4gIH1cblxuICBwcml2YXRlIGNvbXBsZXRlKG9ic2VydmVyOiBTdWJzY3JpYmVyPHZvaWQ+KSB7XG4gICAgb2JzZXJ2ZXIubmV4dCgpO1xuICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==