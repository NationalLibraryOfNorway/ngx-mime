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
        this.altos = [];
        this.recognizedTextContentToggle = new BehaviorSubject(false);
        this.isLoading = new BehaviorSubject(false);
        this.textContentReady = new Subject();
        this.textError = new Subject();
        this.manifest = null;
        this.subscriptions = new Subscription();
        this.altoBuilder = new AltoBuilder();
        this.htmlFormatter = new HtmlFormatter(sanitizer);
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
    initialize() {
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
        this.onRecognizedTextContentToggle = !this.recognizedTextContentToggle.getValue();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0by5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvYWx0by1zZXJ2aWNlL2FsdG8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLFFBQVEsRUFDUixVQUFVLEVBQ1YsRUFBRSxFQUNGLE9BQU8sRUFFUCxZQUFZLEdBQ2IsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNyQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFNL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7O0FBS2pELE1BQU0sT0FBTyxXQUFXO0lBV3RCLFlBQ1MsSUFBb0IsRUFDbkIsSUFBZ0IsRUFDaEIsbUJBQXdDLEVBQ3hDLGFBQTRCLEVBQ3BDLFNBQXVCO1FBSmhCLFNBQUksR0FBSixJQUFJLENBQWdCO1FBQ25CLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWQ5QixVQUFLLEdBQWUsRUFBRSxDQUFDO1FBQ3ZCLGdDQUEyQixHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pELGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxxQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFB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QUMsTUFBTTtnQkFDTixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sVUFBVSxDQUFDLEtBQWEsRUFBRSxJQUFVO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVPLElBQUksQ0FBQyxRQUEwQjtRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU8sS0FBSyxDQUFDLFFBQTBCO1FBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTyxRQUFRLENBQUMsUUFBMEI7UUFDekMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN0QixDQUFDOzt3R0EzS1UsV0FBVzs0R0FBWCxXQUFXLGNBRlYsTUFBTTsyRkFFUCxXQUFXO2tCQUh2QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBmb3JrSm9pbixcbiAgT2JzZXJ2YWJsZSxcbiAgb2YsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmliZXIsXG4gIFN1YnNjcmlwdGlvbixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBkZWJvdW5jZVRpbWUsIGZpbmFsaXplLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgcGFyc2VTdHJpbmcgfSBmcm9tICd4bWwyanMnO1xuaW1wb3J0IHsgQWx0b0J1aWxkZXIgfSBmcm9tICcuLi9idWlsZGVycy9hbHRvJztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLi9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3Qtc2VydmljZSc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4uL2ludGwvdmlld2VyLWludGwnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgQWx0byB9IGZyb20gJy4vYWx0by5tb2RlbCc7XG5pbXBvcnQgeyBIdG1sRm9ybWF0dGVyIH0gZnJvbSAnLi9odG1sLmZvcm1hdHRlcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBbHRvU2VydmljZSB7XG4gIHByaXZhdGUgYWx0b3M6IFNhZmVIdG1sW10gPSBbXTtcbiAgcHJpdmF0ZSByZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgcHJpdmF0ZSBpc0xvYWRpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgcHJpdmF0ZSB0ZXh0Q29udGVudFJlYWR5ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSB0ZXh0RXJyb3IgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gIHByaXZhdGUgbWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJpdmF0ZSBhbHRvQnVpbGRlciA9IG5ldyBBbHRvQnVpbGRlcigpO1xuICBwcml2YXRlIGh0bWxGb3JtYXR0ZXI6IEh0bWxGb3JtYXR0ZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGludGw6IE1pbWVWaWV3ZXJJbnRsLFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIGlpaWZNYW5pZmVzdFNlcnZpY2U6IElpaWZNYW5pZmVzdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHNhbml0aXplcjogRG9tU2FuaXRpemVyXG4gICkge1xuICAgIHRoaXMuaHRtbEZvcm1hdHRlciA9IG5ldyBIdG1sRm9ybWF0dGVyKHNhbml0aXplcik7XG4gIH1cblxuICBnZXQgb25SZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGVDaGFuZ2UkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBvblRleHRDb250ZW50UmVhZHkkKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLnRleHRDb250ZW50UmVhZHkuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgaXNMb2FkaW5nJCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5pc0xvYWRpbmcuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgaGFzRXJyb3JzJCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLnRleHRFcnJvci5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBvblJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGUudmFsdWU7XG4gIH1cblxuICBzZXQgb25SZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZS5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5jdXJyZW50TWFuaWZlc3Quc3Vic2NyaWJlKFxuICAgICAgICAobWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCkgPT4ge1xuICAgICAgICAgIHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcbiAgICAgICAgICB0aGlzLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLm9uQ2FudmFzR3JvdXBJbmRleENoYW5nZVxuICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoMjAwKSlcbiAgICAgICAgLnN1YnNjcmliZSgoY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIHRoaXMudGV4dEVycm9yLm5leHQodW5kZWZpbmVkKTtcbiAgICAgICAgICBjb25zdCBzb3VyY2VzOiBPYnNlcnZhYmxlPHZvaWQ+W10gPSBbXTtcblxuICAgICAgICAgIGNvbnN0IGNhbnZhc0dyb3VwID0gdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc2VzUGVyQ2FudmFzR3JvdXAoXG4gICAgICAgICAgICBjdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5hZGRBbHRvU291cmNlKGNhbnZhc0dyb3VwWzBdLCBzb3VyY2VzKTtcbiAgICAgICAgICBpZiAoY2FudmFzR3JvdXAubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEFsdG9Tb3VyY2UoY2FudmFzR3JvdXBbMV0sIHNvdXJjZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmlzTG9hZGluZy5uZXh0KHRydWUpO1xuICAgICAgICAgIGZvcmtKb2luKHNvdXJjZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5pc0xvYWRpbmcubmV4dChmYWxzZSkpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jbGVhckNhY2hlKCk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5vblJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZSA9ICF0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZS5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgZ2V0SHRtbChpbmRleDogbnVtYmVyKTogU2FmZUh0bWwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmFsdG9zICYmIHRoaXMuYWx0b3MubGVuZ3RoID49IGluZGV4ICsgMVxuICAgICAgPyB0aGlzLmFsdG9zW2luZGV4XVxuICAgICAgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBjbGVhckNhY2hlKCkge1xuICAgIHRoaXMuYWx0b3MgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkQWx0b1NvdXJjZShpbmRleDogbnVtYmVyLCBzb3VyY2VzOiBPYnNlcnZhYmxlPHZvaWQ+W10pIHtcbiAgICBpZiAodGhpcy5tYW5pZmVzdCAmJiB0aGlzLm1hbmlmZXN0LnNlcXVlbmNlcykge1xuICAgICAgY29uc3Qgc2VxID0gdGhpcy5tYW5pZmVzdC5zZXF1ZW5jZXNbMF07XG4gICAgICBpZiAoc2VxLmNhbnZhc2VzKSB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHNlcS5jYW52YXNlc1tpbmRleF07XG4gICAgICAgIGlmIChjYW52YXMgJiYgY2FudmFzLmFsdG9VcmwpIHtcbiAgICAgICAgICBzb3VyY2VzLnB1c2godGhpcy5hZGQoaW5kZXgsIGNhbnZhcy5hbHRvVXJsKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZChpbmRleDogbnVtYmVyLCB1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXIpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzSW5DYWNoZShpbmRleCkpIHtcbiAgICAgICAgdGhpcy5kb25lKG9ic2VydmVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9hZChvYnNlcnZlciwgaW5kZXgsIHVybCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGlzSW5DYWNoZShpbmRleDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuYWx0b3NbaW5kZXhdO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkKG9ic2VydmVyOiBTdWJzY3JpYmVyPHZvaWQ+LCBpbmRleDogbnVtYmVyLCB1cmw6IHN0cmluZykge1xuICAgIHRoaXMuaHR0cFxuICAgICAgLmdldCh1cmwsIHtcbiAgICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKCkuc2V0KCdDb250ZW50LVR5cGUnLCAndGV4dC94bWwnKSxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAndGV4dCcsXG4gICAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycikgPT4gb2YoeyBpc0Vycm9yOiB0cnVlLCBlcnJvcjogZXJyIH0pKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoZGF0YTogQWx0byB8IGFueSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghZGF0YS5pc0Vycm9yKSB7XG4gICAgICAgICAgICBwYXJzZVN0cmluZyhkYXRhLCB7IGV4cGxpY2l0Q2hpbGRyZW46IHRydWUsIHByZXNlcnZlQ2hpbGRyZW5PcmRlcjogdHJ1ZX0sIChlcnJvciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGFsdG8gPSB0aGlzLmFsdG9CdWlsZGVyLndpdGhBbHRvWG1sKHJlc3VsdC5hbHRvKS5idWlsZCgpO1xuICAgICAgICAgICAgICB0aGlzLmFkZFRvQ2FjaGUoaW5kZXgsIGFsdG8pO1xuICAgICAgICAgICAgICB0aGlzLmRvbmUob2JzZXJ2ZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGRhdGEuZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgdGhpcy5lcnJvcihvYnNlcnZlcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRUb0NhY2hlKGluZGV4OiBudW1iZXIsIGFsdG86IEFsdG8pIHtcbiAgICB0aGlzLmFsdG9zW2luZGV4XSA9IHRoaXMuaHRtbEZvcm1hdHRlci5hbHRvVG9IdG1sKGFsdG8pO1xuICB9XG5cbiAgcHJpdmF0ZSBkb25lKG9ic2VydmVyOiBTdWJzY3JpYmVyPHZvaWQ+KSB7XG4gICAgdGhpcy50ZXh0Q29udGVudFJlYWR5Lm5leHQoKTtcbiAgICB0aGlzLmNvbXBsZXRlKG9ic2VydmVyKTtcbiAgfVxuXG4gIHByaXZhdGUgZXJyb3Iob2JzZXJ2ZXI6IFN1YnNjcmliZXI8dm9pZD4pIHtcbiAgICB0aGlzLnRleHRFcnJvci5uZXh0KHRoaXMuaW50bC50ZXh0Q29udGVudEVycm9yTGFiZWwpO1xuICAgIHRoaXMuY29tcGxldGUob2JzZXJ2ZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wbGV0ZShvYnNlcnZlcjogU3Vic2NyaWJlcjx2b2lkPikge1xuICAgIG9ic2VydmVyLm5leHQoKTtcbiAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=