import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, finalize, take } from 'rxjs/operators';
import { ManifestBuilder as IiifV2ManifestBuilder } from '../builders/iiif/v2/manifest.builder';
import { ManifestBuilder as IiifV3ManifestBuilder } from '../builders/iiif/v3/manifest.builder';
import { MimeViewerIntl } from '../intl';
import { SpinnerService } from '../spinner-service/spinner.service';
import * as i0 from "@angular/core";
import * as i1 from "../intl";
import * as i2 from "@angular/common/http";
import * as i3 from "../spinner-service/spinner.service";
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
            if (!manifestUri || manifestUri.length === 0) {
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
        if (response.type === 'Manifest') {
            return new IiifV3ManifestBuilder(response).build();
        }
        else {
            return new IiifV2ManifestBuilder(response).build();
        }
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: IiifManifestService, deps: [{ token: i1.MimeViewerIntl }, { token: i2.HttpClient }, { token: i3.SpinnerService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: IiifManifestService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: IiifManifestService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.MimeViewerIntl }, { type: i2.HttpClient }, { type: i3.SpinnerService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWlpZi1tYW5pZmVzdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFxQixNQUFNLHNCQUFzQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxJQUFJLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDaEcsT0FBTyxFQUFFLGVBQWUsSUFBSSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7OztBQUdwRSxNQUFNLE9BQU8sbUJBQW1CO0lBSTlCLFlBQ1MsSUFBb0IsRUFDbkIsSUFBZ0IsRUFDaEIsY0FBOEI7UUFGL0IsU0FBSSxHQUFKLElBQUksQ0FBZ0I7UUFDbkIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFOOUIscUJBQWdCLEdBQUcsSUFBSSxlQUFlLENBQWtCLElBQUksQ0FBQyxDQUFDO1FBQzlELGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO0lBTWhFLENBQUM7SUFFSixJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFB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VyxDQUFDLEdBQXNCO1FBQ3hDLElBQUksTUFBYyxDQUFDO1FBQ25CLElBQUksR0FBRyxDQUFDLEtBQUssWUFBWSxNQUFNLEVBQUUsQ0FBQztZQUNoQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUN2QixDQUFDO2FBQU0sQ0FBQztZQUNOLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzhHQXhGVSxtQkFBbUI7a0hBQW5CLG1CQUFtQjs7MkZBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmluYWxpemUsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYW5pZmVzdEJ1aWxkZXIgYXMgSWlpZlYyTWFuaWZlc3RCdWlsZGVyIH0gZnJvbSAnLi4vYnVpbGRlcnMvaWlpZi92Mi9tYW5pZmVzdC5idWlsZGVyJztcbmltcG9ydCB7IE1hbmlmZXN0QnVpbGRlciBhcyBJaWlmVjNNYW5pZmVzdEJ1aWxkZXIgfSBmcm9tICcuLi9idWlsZGVycy9paWlmL3YzL21hbmlmZXN0LmJ1aWxkZXInO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuLi9pbnRsJztcbmltcG9ydCB7IE1hbmlmZXN0IH0gZnJvbSAnLi4vbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IFNwaW5uZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc3Bpbm5lci1zZXJ2aWNlL3NwaW5uZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJaWlmTWFuaWZlc3RTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIF9jdXJyZW50TWFuaWZlc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1hbmlmZXN0IHwgbnVsbD4obnVsbCk7XG4gIHByb3RlY3RlZCBfZXJyb3JNZXNzYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgc3Bpbm5lclNlcnZpY2U6IFNwaW5uZXJTZXJ2aWNlXG4gICkge31cblxuICBnZXQgY3VycmVudE1hbmlmZXN0KCk6IE9ic2VydmFibGU8TWFuaWZlc3QgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRNYW5pZmVzdC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IGVycm9yTWVzc2FnZSgpOiBPYnNlcnZhYmxlPHN0cmluZyB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JNZXNzYWdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgbG9hZChtYW5pZmVzdFVyaTogc3RyaW5nIHwgbnVsbCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXIpID0+IHtcbiAgICAgIGlmICghbWFuaWZlc3RVcmkgfHwgbWFuaWZlc3RVcmkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuX2Vycm9yTWVzc2FnZS5uZXh0KHRoaXMuaW50bC5tYW5pZmVzdFVyaU1pc3NpbmdMYWJlbCk7XG4gICAgICAgIG9ic2VydmVyLm5leHQoZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zcGlubmVyU2VydmljZS5zaG93KCk7XG4gICAgICAgIHRoaXMuaHR0cFxuICAgICAgICAgIC5nZXQ8UmVzcG9uc2U+KG1hbmlmZXN0VXJpKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5zcGlubmVyU2VydmljZS5oaWRlKCkpLFxuICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgIClcbiAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBtYW5pZmVzdCA9IHRoaXMuZXh0cmFjdERhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgICBpZiAodGhpcy5pc01hbmlmZXN0VmFsaWQobWFuaWZlc3QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudE1hbmlmZXN0Lm5leHQobWFuaWZlc3QpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXJyb3JNZXNzYWdlLm5leHQodGhpcy5pbnRsLm1hbmlmZXN0Tm90VmFsaWRMYWJlbCk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9lcnJvck1lc3NhZ2UubmV4dCh0aGlzLmhhbmRsZUVycm9yKGVycikpO1xuICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlc2V0Q3VycmVudE1hbmlmZXN0KCk7XG4gICAgdGhpcy5yZXNldEVycm9yTWVzc2FnZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldEN1cnJlbnRNYW5pZmVzdCgpIHtcbiAgICB0aGlzLl9jdXJyZW50TWFuaWZlc3QubmV4dChudWxsKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRFcnJvck1lc3NhZ2UoKSB7XG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlLm5leHQobnVsbCk7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3REYXRhKHJlc3BvbnNlOiBhbnkpIHtcbiAgICBpZiAocmVzcG9uc2UudHlwZSA9PT0gJ01hbmlmZXN0Jykge1xuICAgICAgcmV0dXJuIG5ldyBJaWlmVjNNYW5pZmVzdEJ1aWxkZXIocmVzcG9uc2UpLmJ1aWxkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgSWlpZlYyTWFuaWZlc3RCdWlsZGVyKHJlc3BvbnNlKS5idWlsZCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNNYW5pZmVzdFZhbGlkKG1hbmlmZXN0OiBNYW5pZmVzdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBtYW5pZmVzdCAmJlxuICAgICAgbWFuaWZlc3QudGlsZVNvdXJjZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBtYW5pZmVzdC50aWxlU291cmNlLmxlbmd0aCA+IDBcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnI6IEh0dHBFcnJvclJlc3BvbnNlKTogc3RyaW5nIHtcbiAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XG4gICAgaWYgKGVyci5lcnJvciBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgZXJyTXNnID0gZXJyLm1lc3NhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyck1zZyA9IGVyci5lcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIGVyck1zZztcbiAgfVxufVxuIl19