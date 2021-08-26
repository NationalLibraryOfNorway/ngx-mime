import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, forkJoin, Observable, of, Subject, Subscription, } from 'rxjs';
import { catchError, debounceTime, finalize, take } from 'rxjs/operators';
import { parseString } from 'xml2js';
import { AltoBuilder } from '../builders/alto';
import { CanvasService } from '../canvas-service/canvas-service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../intl/viewer-intl';
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
                    parseString(data, {}, (error, result) => {
                        const alto = this.altoBuilder.withAltoXml(result.alto).build();
                        this.addToCache(index, alto);
                        this.done(observer);
                    });
                }
                else {
                    throw data.err;
                }
            }
            catch (_a) {
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
AltoService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AltoService_Factory() { return new AltoService(i0.ɵɵinject(i1.MimeViewerIntl), i0.ɵɵinject(i2.HttpClient), i0.ɵɵinject(i3.IiifManifestService), i0.ɵɵinject(i4.CanvasService), i0.ɵɵinject(i5.DomSanitizer)); }, token: AltoService, providedIn: "root" });
AltoService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
AltoService.ctorParameters = () => [
    { type: MimeViewerIntl },
    { type: HttpClient },
    { type: IiifManifestService },
    { type: CanvasService },
    { type: DomSanitizer }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0by5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvYWx0by1zZXJ2aWNlL2FsdG8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ25FLE9BQU8sRUFDTCxlQUFlLEVBQ2YsUUFBUSxFQUNSLFVBQVUsRUFDVixFQUFFLEVBQ0YsT0FBTyxFQUVQLFlBQVksR0FDYixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDckYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7OztBQUtqRCxNQUFNLE9BQU8sV0FBVztJQVd0QixZQUNTLElBQW9CLEVBQ25CLElBQWdCLEVBQ2hCLG1CQUF3QyxFQUN4QyxhQUE0QixFQUNwQyxTQUF1QjtRQUpoQixTQUFJLEdBQUosSUFBSSxDQUFnQjtRQUNuQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLHdCQUFtQixHQUFuQixtQkFBbUIs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QUFFLElBQUksQ0FBQyxDQUFDO3dCQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN0QixDQUFDLENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ2hCO2FBQ0Y7WUFBQyxXQUFNO2dCQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxVQUFVLENBQUMsS0FBYSxFQUFFLElBQVU7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU8sSUFBSSxDQUFDLFFBQTBCO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTyxLQUFLLENBQUMsUUFBMEI7UUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVPLFFBQVEsQ0FBQyxRQUEwQjtRQUN6QyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7WUE5S0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7WUFQUSxjQUFjO1lBakJkLFVBQVU7WUFnQlYsbUJBQW1CO1lBRG5CLGFBQWE7WUFiYixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGZvcmtKb2luLFxuICBPYnNlcnZhYmxlLFxuICBvZixcbiAgU3ViamVjdCxcbiAgU3Vic2NyaWJlcixcbiAgU3Vic2NyaXB0aW9uLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGRlYm91bmNlVGltZSwgZmluYWxpemUsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBwYXJzZVN0cmluZyB9IGZyb20gJ3htbDJqcyc7XG5pbXBvcnQgeyBBbHRvQnVpbGRlciB9IGZyb20gJy4uL2J1aWxkZXJzL2FsdG8nO1xuaW1wb3J0IHsgQ2FudmFzU2VydmljZSB9IGZyb20gJy4uL2NhbnZhcy1zZXJ2aWNlL2NhbnZhcy1zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZNYW5pZmVzdFNlcnZpY2UgfSBmcm9tICcuLi9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi4vaW50bC92aWV3ZXItaW50bCc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBBbHRvIH0gZnJvbSAnLi9hbHRvLm1vZGVsJztcbmltcG9ydCB7IEh0bWxGb3JtYXR0ZXIgfSBmcm9tICcuL2h0bWwuZm9ybWF0dGVyJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEFsdG9TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBhbHRvczogU2FmZUh0bWxbXSA9IFtdO1xuICBwcml2YXRlIHJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBwcml2YXRlIGlzTG9hZGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBwcml2YXRlIHRleHRDb250ZW50UmVhZHkgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIHRleHRFcnJvciA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgcHJpdmF0ZSBtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBwcml2YXRlIGFsdG9CdWlsZGVyID0gbmV3IEFsdG9CdWlsZGVyKCk7XG4gIHByaXZhdGUgaHRtbEZvcm1hdHRlcjogSHRtbEZvcm1hdHRlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgaWlpZk1hbmlmZXN0U2VydmljZTogSWlpZk1hbmlmZXN0U2VydmljZSxcbiAgICBwcml2YXRlIGNhbnZhc1NlcnZpY2U6IENhbnZhc1NlcnZpY2UsXG4gICAgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXJcbiAgKSB7XG4gICAgdGhpcy5odG1sRm9ybWF0dGVyID0gbmV3IEh0bWxGb3JtYXR0ZXIoc2FuaXRpemVyKTtcbiAgfVxuXG4gIGdldCBvblJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZUNoYW5nZSQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMucmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IG9uVGV4dENvbnRlbnRSZWFkeSQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMudGV4dENvbnRlbnRSZWFkeS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBpc0xvYWRpbmckKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmlzTG9hZGluZy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBoYXNFcnJvcnMkKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMudGV4dEVycm9yLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IG9uUmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlKCkge1xuICAgIHJldHVybiB0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZS52YWx1ZTtcbiAgfVxuXG4gIHNldCBvblJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMucmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlLm5leHQodmFsdWUpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5tYW5pZmVzdCA9IG1hbmlmZXN0O1xuICAgICAgICAgIHRoaXMuY2xlYXJDYWNoZSgpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2Uub25DYW52YXNHcm91cEluZGV4Q2hhbmdlXG4gICAgICAgIC5waXBlKGRlYm91bmNlVGltZSgyMDApKVxuICAgICAgICAuc3Vic2NyaWJlKChjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgdGhpcy50ZXh0RXJyb3IubmV4dCh1bmRlZmluZWQpO1xuICAgICAgICAgIGNvbnN0IHNvdXJjZXM6IE9ic2VydmFibGU8dm9pZD5bXSA9IFtdO1xuXG4gICAgICAgICAgY29uc3QgY2FudmFzR3JvdXAgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q2FudmFzZXNQZXJDYW52YXNHcm91cChcbiAgICAgICAgICAgIGN1cnJlbnRDYW52YXNHcm91cEluZGV4XG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmFkZEFsdG9Tb3VyY2UoY2FudmFzR3JvdXBbMF0sIHNvdXJjZXMpO1xuICAgICAgICAgIGlmIChjYW52YXNHcm91cC5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQWx0b1NvdXJjZShjYW52YXNHcm91cFsxXSwgc291cmNlcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nLm5leHQodHJ1ZSk7XG4gICAgICAgICAgZm9ya0pvaW4oc291cmNlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICBmaW5hbGl6ZSgoKSA9PiB0aGlzLmlzTG9hZGluZy5uZXh0KGZhbHNlKSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNsZWFyQ2FjaGUoKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLm9uUmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlID0gIXRoaXMucmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlLmdldFZhbHVlKCk7XG4gIH1cblxuICBnZXRIdG1sKGluZGV4OiBudW1iZXIpOiBTYWZlSHRtbCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuYWx0b3MgJiYgdGhpcy5hbHRvcy5sZW5ndGggPj0gaW5kZXggKyAxXG4gICAgICA/IHRoaXMuYWx0b3NbaW5kZXhdXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNsZWFyQ2FjaGUoKSB7XG4gICAgdGhpcy5hbHRvcyA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRBbHRvU291cmNlKGluZGV4OiBudW1iZXIsIHNvdXJjZXM6IE9ic2VydmFibGU8dm9pZD5bXSkge1xuICAgIGlmICh0aGlzLm1hbmlmZXN0ICYmIHRoaXMubWFuaWZlc3Quc2VxdWVuY2VzKSB7XG4gICAgICBjb25zdCBzZXEgPSB0aGlzLm1hbmlmZXN0LnNlcXVlbmNlc1swXTtcbiAgICAgIGlmIChzZXEuY2FudmFzZXMpIHtcbiAgICAgICAgY29uc3QgY2FudmFzID0gc2VxLmNhbnZhc2VzW2luZGV4XTtcbiAgICAgICAgaWYgKGNhbnZhcyAmJiBjYW52YXMuYWx0b1VybCkge1xuICAgICAgICAgIHNvdXJjZXMucHVzaCh0aGlzLmFkZChpbmRleCwgY2FudmFzLmFsdG9VcmwpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkKGluZGV4OiBudW1iZXIsIHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcikgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNJbkNhY2hlKGluZGV4KSkge1xuICAgICAgICB0aGlzLmRvbmUob2JzZXJ2ZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2FkKG9ic2VydmVyLCBpbmRleCwgdXJsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNJbkNhY2hlKGluZGV4OiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5hbHRvc1tpbmRleF07XG4gIH1cblxuICBwcml2YXRlIGxvYWQob2JzZXJ2ZXI6IFN1YnNjcmliZXI8dm9pZD4sIGluZGV4OiBudW1iZXIsIHVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5odHRwXG4gICAgICAuZ2V0KHVybCwge1xuICAgICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoKS5zZXQoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L3htbCcpLFxuICAgICAgICByZXNwb25zZVR5cGU6ICd0ZXh0JyxcbiAgICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgY2F0Y2hFcnJvcigoZXJyKSA9PiBvZih7IGlzRXJyb3I6IHRydWUsIGVycm9yOiBlcnIgfSkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChkYXRhOiBBbHRvIHwgYW55KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFkYXRhLmlzRXJyb3IpIHtcbiAgICAgICAgICAgIHBhcnNlU3RyaW5nKGRhdGEsIHt9LCAoZXJyb3IsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBhbHRvID0gdGhpcy5hbHRvQnVpbGRlci53aXRoQWx0b1htbChyZXN1bHQuYWx0bykuYnVpbGQoKTtcbiAgICAgICAgICAgICAgdGhpcy5hZGRUb0NhY2hlKGluZGV4LCBhbHRvKTtcbiAgICAgICAgICAgICAgdGhpcy5kb25lKG9ic2VydmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBkYXRhLmVycjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIHRoaXMuZXJyb3Iob2JzZXJ2ZXIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkVG9DYWNoZShpbmRleDogbnVtYmVyLCBhbHRvOiBBbHRvKSB7XG4gICAgdGhpcy5hbHRvc1tpbmRleF0gPSB0aGlzLmh0bWxGb3JtYXR0ZXIuYWx0b1RvSHRtbChhbHRvKTtcbiAgfVxuXG4gIHByaXZhdGUgZG9uZShvYnNlcnZlcjogU3Vic2NyaWJlcjx2b2lkPikge1xuICAgIHRoaXMudGV4dENvbnRlbnRSZWFkeS5uZXh0KCk7XG4gICAgdGhpcy5jb21wbGV0ZShvYnNlcnZlcik7XG4gIH1cblxuICBwcml2YXRlIGVycm9yKG9ic2VydmVyOiBTdWJzY3JpYmVyPHZvaWQ+KSB7XG4gICAgdGhpcy50ZXh0RXJyb3IubmV4dCh0aGlzLmludGwudGV4dENvbnRlbnRFcnJvckxhYmVsKTtcbiAgICB0aGlzLmNvbXBsZXRlKG9ic2VydmVyKTtcbiAgfVxuXG4gIHByaXZhdGUgY29tcGxldGUob2JzZXJ2ZXI6IFN1YnNjcmliZXI8dm9pZD4pIHtcbiAgICBvYnNlcnZlci5uZXh0KCk7XG4gICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgfVxufVxuIl19