import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, finalize, take } from 'rxjs/operators';
import { ManifestBuilder } from '../builders/manifest.builder';
import * as i0 from "@angular/core";
import * as i1 from "../intl/viewer-intl";
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
IiifManifestService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: IiifManifestService, deps: [{ token: i1.MimeViewerIntl }, { token: i2.HttpClient }, { token: i3.SpinnerService }], target: i0.ɵɵFactoryTarget.Injectable });
IiifManifestService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: IiifManifestService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: IiifManifestService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MimeViewerIntl }, { type: i2.HttpClient }, { type: i3.SpinnerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWlpZi1tYW5pZmVzdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7OztBQU0vRCxNQUFNLE9BQU8sbUJBQW1CO0lBSTlCLFlBQ1MsSUFBb0IsRUFDbkIsSUFBZ0IsRUFDaEIsY0FBOEI7UUFGL0IsU0FBSSxHQUFKLElBQUksQ0FBZ0I7UUFDbkIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFOOUIscUJBQWdCLEdBQUcsSUFBSSxlQUFlLENBQWtCLElBQUksQ0FBQyxDQUFDO1FBQzlELGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO0lBTWhFLENBQUM7SUFFSixJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFJLENBQUMsV0FBbUI7UUFDdEIsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2pDLElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFDM0QsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUNyQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMzQixJQUFJLENBQUMsSUFBSTtxQkFDTixHQUFHLENBQVcsV0FBVyxDQUFDO3FCQUMxQixJQUFJLENBQ0gsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsRUFDMUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSO3FCQUNBLFNBQVMsQ0FDUixDQUFDLFFBQWtCLEVBQUUsRUFBRTtvQkFDckIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFO3dCQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO3FCQUNwQjt5QkFBTTt3QkFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7d0JBQ3pELFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7cUJBQ3JCO2dCQUNILENBQUMsRUFDRCxDQUFDLEdBQXNCLEVBQUUsRUFBRTtvQkFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUMvQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUN0QixDQUFDLENBQ0YsQ0FBQzthQUNMO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyxvQkFBb0I7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU8saUJBQWlCO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTyxXQUFXLENBQUMsUUFBa0I7UUFDcEMsT0FBTyxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRU8sZUFBZSxDQUFDLFFBQWtCO1FBQ3hDLE9BQU8sQ0FDTCxRQUFRO1lBQ1IsUUFBUSxDQUFDLFVBQVUsS0FBSyxTQUFTO1lBQ2pDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FDL0IsQ0FBQztJQUNKLENBQUM7SUFFTyxXQUFXLENBQUMsR0FBc0I7UUFDeEMsSUFBSSxNQUFjLENBQUM7UUFDbkIsSUFBSSxHQUFHLENBQUMsS0FBSyxZQUFZLE1BQU0sRUFBRTtZQUMvQixNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztTQUN0QjthQUFNO1lBQ0wsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7U0FDcEI7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOztnSEFwRlUsbUJBQW1CO29IQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmluYWxpemUsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYW5pZmVzdEJ1aWxkZXIgfSBmcm9tICcuLi9idWlsZGVycy9tYW5pZmVzdC5idWlsZGVyJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi4vaW50bC92aWV3ZXItaW50bCc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBTcGlubmVyU2VydmljZSB9IGZyb20gJy4uL3NwaW5uZXItc2VydmljZS9zcGlubmVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSWlpZk1hbmlmZXN0U2VydmljZSB7XG4gIHByb3RlY3RlZCBfY3VycmVudE1hbmlmZXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNYW5pZmVzdCB8IG51bGw+KG51bGwpO1xuICBwcm90ZWN0ZWQgX2Vycm9yTWVzc2FnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGludGw6IE1pbWVWaWV3ZXJJbnRsLFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIHNwaW5uZXJTZXJ2aWNlOiBTcGlubmVyU2VydmljZVxuICApIHt9XG5cbiAgZ2V0IGN1cnJlbnRNYW5pZmVzdCgpOiBPYnNlcnZhYmxlPE1hbmlmZXN0IHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50TWFuaWZlc3QuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBlcnJvck1lc3NhZ2UoKTogT2JzZXJ2YWJsZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9yTWVzc2FnZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGxvYWQobWFuaWZlc3RVcmk6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXIpID0+IHtcbiAgICAgIGlmIChtYW5pZmVzdFVyaS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5fZXJyb3JNZXNzYWdlLm5leHQodGhpcy5pbnRsLm1hbmlmZXN0VXJpTWlzc2luZ0xhYmVsKTtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dChmYWxzZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3Bpbm5lclNlcnZpY2Uuc2hvdygpO1xuICAgICAgICB0aGlzLmh0dHBcbiAgICAgICAgICAuZ2V0PFJlc3BvbnNlPihtYW5pZmVzdFVyaSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGZpbmFsaXplKCgpID0+IHRoaXMuc3Bpbm5lclNlcnZpY2UuaGlkZSgpKSxcbiAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgICApXG4gICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbWFuaWZlc3QgPSB0aGlzLmV4dHJhY3REYXRhKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaXNNYW5pZmVzdFZhbGlkKG1hbmlmZXN0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRNYW5pZmVzdC5uZXh0KG1hbmlmZXN0KTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHRydWUpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXJyb3JNZXNzYWdlLm5leHQodGhpcy5pbnRsLm1hbmlmZXN0Tm90VmFsaWRMYWJlbCk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChmYWxzZSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Vycm9yTWVzc2FnZS5uZXh0KHRoaXMuaGFuZGxlRXJyb3IoZXJyKSk7XG4gICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZmFsc2UpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZXNldEN1cnJlbnRNYW5pZmVzdCgpO1xuICAgIHRoaXMucmVzZXRFcnJvck1lc3NhZ2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRDdXJyZW50TWFuaWZlc3QoKSB7XG4gICAgdGhpcy5fY3VycmVudE1hbmlmZXN0Lm5leHQobnVsbCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RXJyb3JNZXNzYWdlKCkge1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZS5uZXh0KG51bGwpO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0RGF0YShyZXNwb25zZTogUmVzcG9uc2UpIHtcbiAgICByZXR1cm4gbmV3IE1hbmlmZXN0QnVpbGRlcihyZXNwb25zZSkuYnVpbGQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNNYW5pZmVzdFZhbGlkKG1hbmlmZXN0OiBNYW5pZmVzdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBtYW5pZmVzdCAmJlxuICAgICAgbWFuaWZlc3QudGlsZVNvdXJjZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBtYW5pZmVzdC50aWxlU291cmNlLmxlbmd0aCA+IDBcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnI6IEh0dHBFcnJvclJlc3BvbnNlKTogc3RyaW5nIHtcbiAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XG4gICAgaWYgKGVyci5lcnJvciBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgZXJyTXNnID0gZXJyLm1lc3NhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyck1zZyA9IGVyci5lcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIGVyck1zZztcbiAgfVxufVxuIl19