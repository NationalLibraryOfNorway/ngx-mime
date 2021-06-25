import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, finalize, take } from 'rxjs/operators';
import { ManifestBuilder } from '../builders/manifest.builder';
import { MimeViewerIntl } from '../intl/viewer-intl';
import { SpinnerService } from '../spinner-service/spinner.service';
export class IiifManifestService {
    constructor(intl, http, spinnerService) {
        this.intl = intl;
        this.http = http;
        this.spinnerService = spinnerService;
        this._currentManifest = new BehaviorSubject(null);
        this._errorMessage = new BehaviorSubject(null);
    }
    get currentManifest() {
        return this._currentManifest.asObservable().pipe(distinctUntilChanged());
    }
    get errorMessage() {
        return this._errorMessage.asObservable();
    }
    load(manifestUri) {
        return new Observable((observer) => {
            if (manifestUri.length === 0) {
                this._errorMessage.next(this.intl.manifestUriMissingLabel);
                observer.next(false);
            }
            else {
                this.spinnerService.show();
                this.http
                    .get(manifestUri)
                    .pipe(finalize(() => this.spinnerService.hide()), take(1))
                    .subscribe((response) => {
                    const manifest = this.extractData(response);
                    if (this.isManifestValid(manifest)) {
                        this._currentManifest.next(manifest);
                        observer.next(true);
                    }
                    else {
                        this._errorMessage.next(this.intl.manifestNotValidLabel);
                        observer.next(false);
                    }
                }, (err) => {
                    this._errorMessage.next(this.handleError(err));
                    observer.next(false);
                });
            }
        });
    }
    destroy() {
        this.resetCurrentManifest();
        this.resetErrorMessage();
    }
    resetCurrentManifest() {
        this._currentManifest.next(null);
    }
    resetErrorMessage() {
        this._errorMessage.next(null);
    }
    extractData(response) {
        return new ManifestBuilder(response).build();
    }
    isManifestValid(manifest) {
        return (manifest &&
            manifest.tileSource !== undefined &&
            manifest.tileSource.length > 0);
    }
    handleError(err) {
        let errMsg;
        if (err.error instanceof Object) {
            errMsg = err.message;
        }
        else {
            errMsg = err.error;
        }
        return errMsg;
    }
}
IiifManifestService.decorators = [
    { type: Injectable }
];
IiifManifestService.ctorParameters = () => [
    { type: MimeViewerIntl },
    { type: HttpClient },
    { type: SpinnerService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWlpZi1tYW5pZmVzdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFxQixNQUFNLHNCQUFzQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXJELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUdwRSxNQUFNLE9BQU8sbUJBQW1CO0lBSTlCLFlBQ1MsSUFBb0IsRUFDbkIsSUFBZ0IsRUFDaEIsY0FBOEI7UUFGL0IsU0FBSSxHQUFKLElBQUksQ0FBZ0I7UUFDbkIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFOOUIscUJBQWdCLEdBQUcsSUFBSSxlQUFlLENBQWtCLElBQUksQ0FBQyxDQUFDO1FBQzlELGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO0lBTWhFLENBQUM7SUFFSixJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsSUFBSSxZQUFZ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aW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaW5hbGl6ZSwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1hbmlmZXN0QnVpbGRlciB9IGZyb20gJy4uL2J1aWxkZXJzL21hbmlmZXN0LmJ1aWxkZXInO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuLi9pbnRsL3ZpZXdlci1pbnRsJztcbmltcG9ydCB7IE1hbmlmZXN0IH0gZnJvbSAnLi4vbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IFNwaW5uZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc3Bpbm5lci1zZXJ2aWNlL3NwaW5uZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJaWlmTWFuaWZlc3RTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIF9jdXJyZW50TWFuaWZlc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1hbmlmZXN0IHwgbnVsbD4obnVsbCk7XG4gIHByb3RlY3RlZCBfZXJyb3JNZXNzYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgc3Bpbm5lclNlcnZpY2U6IFNwaW5uZXJTZXJ2aWNlXG4gICkge31cblxuICBnZXQgY3VycmVudE1hbmlmZXN0KCk6IE9ic2VydmFibGU8TWFuaWZlc3QgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRNYW5pZmVzdC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IGVycm9yTWVzc2FnZSgpOiBPYnNlcnZhYmxlPHN0cmluZyB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JNZXNzYWdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgbG9hZChtYW5pZmVzdFVyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcikgPT4ge1xuICAgICAgaWYgKG1hbmlmZXN0VXJpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLl9lcnJvck1lc3NhZ2UubmV4dCh0aGlzLmludGwubWFuaWZlc3RVcmlNaXNzaW5nTGFiZWwpO1xuICAgICAgICBvYnNlcnZlci5uZXh0KGZhbHNlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zcGlubmVyU2VydmljZS5zaG93KCk7XG4gICAgICAgIHRoaXMuaHR0cFxuICAgICAgICAgIC5nZXQ8UmVzcG9uc2U+KG1hbmlmZXN0VXJpKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5zcGlubmVyU2VydmljZS5oaWRlKCkpLFxuICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgIClcbiAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBtYW5pZmVzdCA9IHRoaXMuZXh0cmFjdERhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgICBpZiAodGhpcy5pc01hbmlmZXN0VmFsaWQobWFuaWZlc3QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudE1hbmlmZXN0Lm5leHQobWFuaWZlc3QpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQodHJ1ZSlcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lcnJvck1lc3NhZ2UubmV4dCh0aGlzLmludGwubWFuaWZlc3ROb3RWYWxpZExhYmVsKTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGZhbHNlKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZXJyb3JNZXNzYWdlLm5leHQodGhpcy5oYW5kbGVFcnJvcihlcnIpKTtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChmYWxzZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlc2V0Q3VycmVudE1hbmlmZXN0KCk7XG4gICAgdGhpcy5yZXNldEVycm9yTWVzc2FnZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldEN1cnJlbnRNYW5pZmVzdCgpIHtcbiAgICB0aGlzLl9jdXJyZW50TWFuaWZlc3QubmV4dChudWxsKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRFcnJvck1lc3NhZ2UoKSB7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlLm5leHQobnVsbCk7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3REYXRhKHJlc3BvbnNlOiBSZXNwb25zZSkge1xuICAgIHJldHVybiBuZXcgTWFuaWZlc3RCdWlsZGVyKHJlc3BvbnNlKS5idWlsZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc01hbmlmZXN0VmFsaWQobWFuaWZlc3Q6IE1hbmlmZXN0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIG1hbmlmZXN0ICYmXG4gICAgICBtYW5pZmVzdC50aWxlU291cmNlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIG1hbmlmZXN0LnRpbGVTb3VyY2UubGVuZ3RoID4gMFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycjogSHR0cEVycm9yUmVzcG9uc2UpOiBzdHJpbmcge1xuICAgIGxldCBlcnJNc2c6IHN0cmluZztcbiAgICBpZiAoZXJyLmVycm9yIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBlcnJNc2cgPSBlcnIubWVzc2FnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyTXNnID0gZXJyLmVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gZXJyTXNnO1xuICB9XG59XG4iXX0=