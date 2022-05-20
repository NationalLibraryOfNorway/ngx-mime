import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, finalize, take } from 'rxjs/operators';
import { ManifestBuilder as IiifV2ManifestBuilder } from '../builders/iiif/v2/manifest.builder';
import { ManifestBuilder as IiifV3ManifestBuilder } from '../builders/iiif/v3/manifest.builder';
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
}
IiifManifestService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: IiifManifestService, deps: [{ token: i1.MimeViewerIntl }, { token: i2.HttpClient }, { token: i3.SpinnerService }], target: i0.ɵɵFactoryTarget.Injectable });
IiifManifestService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: IiifManifestService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: IiifManifestService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.MimeViewerIntl }, { type: i2.HttpClient }, { type: i3.SpinnerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWlpZi1tYW5pZmVzdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsSUFBSSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxlQUFlLElBQUkscUJBQXFCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7Ozs7QUFRaEcsTUFBTSxPQUFPLG1CQUFtQjtJQUk5QixZQUNTLElBQW9CLEVBQ25CLElBQWdCLEVBQ2hCLGNBQThCO1FBRi9CLFNBQUksR0FBSixJQUFJLENBQWdCO1FBQ25CLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTjlCLHFCQUFnQixHQUFHLElBQUksZUFBZSxDQUFrQixJQUFJLENBQUMsQ0FBQztRQUM5RCxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFnQixJQUFJLENBQUMsQ0FBQztJQU1oRSxDQUFDO0lBRUosSUFBSSxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lB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QkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixNQUFNOzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbmFsaXplLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFuaWZlc3RCdWlsZGVyIGFzIElpaWZWMk1hbmlmZXN0QnVpbGRlciB9IGZyb20gJy4uL2J1aWxkZXJzL2lpaWYvdjIvbWFuaWZlc3QuYnVpbGRlcic7XG5pbXBvcnQgeyBNYW5pZmVzdEJ1aWxkZXIgYXMgSWlpZlYzTWFuaWZlc3RCdWlsZGVyIH0gZnJvbSAnLi4vYnVpbGRlcnMvaWlpZi92My9tYW5pZmVzdC5idWlsZGVyJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi4vaW50bCc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBTcGlubmVyU2VydmljZSB9IGZyb20gJy4uL3NwaW5uZXItc2VydmljZS9zcGlubmVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgSWlpZk1hbmlmZXN0U2VydmljZSB7XG4gIHByb3RlY3RlZCBfY3VycmVudE1hbmlmZXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNYW5pZmVzdCB8IG51bGw+KG51bGwpO1xuICBwcm90ZWN0ZWQgX2Vycm9yTWVzc2FnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGludGw6IE1pbWVWaWV3ZXJJbnRsLFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIHNwaW5uZXJTZXJ2aWNlOiBTcGlubmVyU2VydmljZVxuICApIHt9XG5cbiAgZ2V0IGN1cnJlbnRNYW5pZmVzdCgpOiBPYnNlcnZhYmxlPE1hbmlmZXN0IHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50TWFuaWZlc3QuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBlcnJvck1lc3NhZ2UoKTogT2JzZXJ2YWJsZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9yTWVzc2FnZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGxvYWQobWFuaWZlc3RVcmk6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXIpID0+IHtcbiAgICAgIGlmIChtYW5pZmVzdFVyaS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5fZXJyb3JNZXNzYWdlLm5leHQodGhpcy5pbnRsLm1hbmlmZXN0VXJpTWlzc2luZ0xhYmVsKTtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dChmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNwaW5uZXJTZXJ2aWNlLnNob3coKTtcbiAgICAgICAgdGhpcy5odHRwXG4gICAgICAgICAgLmdldDxSZXNwb25zZT4obWFuaWZlc3RVcmkpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaW5hbGl6ZSgoKSA9PiB0aGlzLnNwaW5uZXJTZXJ2aWNlLmhpZGUoKSksXG4gICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG1hbmlmZXN0ID0gdGhpcy5leHRyYWN0RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmlzTWFuaWZlc3RWYWxpZChtYW5pZmVzdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50TWFuaWZlc3QubmV4dChtYW5pZmVzdCk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lcnJvck1lc3NhZ2UubmV4dCh0aGlzLmludGwubWFuaWZlc3ROb3RWYWxpZExhYmVsKTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Vycm9yTWVzc2FnZS5uZXh0KHRoaXMuaGFuZGxlRXJyb3IoZXJyKSk7XG4gICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVzZXRDdXJyZW50TWFuaWZlc3QoKTtcbiAgICB0aGlzLnJlc2V0RXJyb3JNZXNzYWdlKCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0Q3VycmVudE1hbmlmZXN0KCkge1xuICAgIHRoaXMuX2N1cnJlbnRNYW5pZmVzdC5uZXh0KG51bGwpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldEVycm9yTWVzc2FnZSgpIHtcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2UubmV4dChudWxsKTtcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdERhdGEocmVzcG9uc2U6IGFueSkge1xuICAgIGlmIChyZXNwb25zZS50eXBlID09PSAnTWFuaWZlc3QnKSB7XG4gICAgICByZXR1cm4gbmV3IElpaWZWM01hbmlmZXN0QnVpbGRlcihyZXNwb25zZSkuYnVpbGQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBJaWlmVjJNYW5pZmVzdEJ1aWxkZXIocmVzcG9uc2UpLmJ1aWxkKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc01hbmlmZXN0VmFsaWQobWFuaWZlc3Q6IE1hbmlmZXN0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIG1hbmlmZXN0ICYmXG4gICAgICBtYW5pZmVzdC50aWxlU291cmNlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIG1hbmlmZXN0LnRpbGVTb3VyY2UubGVuZ3RoID4gMFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycjogSHR0cEVycm9yUmVzcG9uc2UpOiBzdHJpbmcge1xuICAgIGxldCBlcnJNc2c6IHN0cmluZztcbiAgICBpZiAoZXJyLmVycm9yIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBlcnJNc2cgPSBlcnIubWVzc2FnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyTXNnID0gZXJyLmVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gZXJyTXNnO1xuICB9XG59XG4iXX0=