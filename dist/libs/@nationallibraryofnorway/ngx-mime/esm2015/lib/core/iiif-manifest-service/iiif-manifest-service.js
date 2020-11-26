import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { filter, distinctUntilChanged, finalize } from 'rxjs/operators';
import { ManifestBuilder } from '../builders/manifest.builder';
import { SpinnerService } from '../spinner-service/spinner.service';
import { MimeViewerIntl } from '../intl/viewer-intl';
export class IiifManifestService {
    constructor(intl, http, spinnerService) {
        this.intl = intl;
        this.http = http;
        this.spinnerService = spinnerService;
        this._currentManifest = new BehaviorSubject(null);
        this._errorMessage = new BehaviorSubject(null);
    }
    get currentManifest() {
        return this._currentManifest.asObservable().pipe(filter(m => m !== null), distinctUntilChanged());
    }
    get errorMessage() {
        return this._errorMessage.asObservable();
    }
    load(manifestUri) {
        if (manifestUri === null) {
            this._errorMessage.next(this.intl.manifestUriMissingLabel);
        }
        else {
            this.spinnerService.show();
            this.http
                .get(manifestUri)
                .pipe(finalize(() => this.spinnerService.hide()))
                .subscribe((response) => {
                const manifest = this.extractData(response);
                if (this.isManifestValid(manifest)) {
                    this._currentManifest.next(manifest);
                }
                else {
                    this._errorMessage.next(this.intl.manifestNotValidLabel);
                }
            }, (err) => {
                this._errorMessage.next(this.handleError(err));
            });
        }
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
        return manifest && manifest.tileSource && manifest.tileSource.length > 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWlpZi1tYW5pZmVzdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3Jvbm55bS9UZW1wL25neC1taW1lL2xpYnMvbmd4LW1pbWUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvcmUvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQXFCLE1BQU0sc0JBQXNCLENBQUM7QUFDckUsT0FBTyxFQUF1QixlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUdyRCxNQUFNLE9BQU8sbUJBQW1CO0lBTTlCLFlBQ1MsSUFBb0IsRUFDbkIsSUFBZ0IsRUFDaEIsY0FBOEI7UUFGL0IsU0FBSSxHQUFKLElBQUksQ0FBZ0I7UUFDbkIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFSOUIscUJBQWdCLEdBQXNCLElBQUksZUFBZSxDQUNqRSxJQUFJLENBQ0wsQ0FBQztRQUNRLGtCQUFhLEdBQW9CLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBTWxFLENBQUM7SUFFSixJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUM5QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQ3ZCLG9CQUFvQixFQUFFLENBQ3ZCLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFJLENBQUMsV0FBbUI7UUFDdEIsSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUM1RDthQUFNO1lBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSTtpQkFDTixHQUFHLENBQUMsV0FBVyxDQUFDO2lCQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDaEQsU0FBUyxDQUNSLENBQUMsUUFBa0IsRUFBRSxFQUFFO2dCQUNyQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3RDO3FCQUFNO29CQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztpQkFDMUQ7WUFDSCxDQUFDLEVBQ0QsQ0FBQyxHQUFzQixFQUFFLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQ0YsQ0FBQztTQUNMO0lBQ0gsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sb0JBQW9CO1FBQzFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVPLGlCQUFpQjtRQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU8sV0FBVyxDQUFDLFFBQWtCO1FBQ3BDLE9BQU8sSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVPLGVBQWUsQ0FBQyxRQUFrQjtRQUN4QyxPQUFPLFFBQVEsSUFBSSxRQUFRLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRU8sV0FBVyxDQUFDLEdBQXNCO1FBQ3hDLElBQUksTUFBYyxDQUFDO1FBQ25CLElBQUksR0FBRyxDQUFDLEtBQUssWUFBWSxNQUFNLEVBQUU7WUFDL0IsTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7U0FDdEI7YUFBTTtZQUNMLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7O1lBN0VGLFVBQVU7OztZQUZGLGNBQWM7WUFQZCxVQUFVO1lBTVYsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaW5hbGl6ZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgTWFuaWZlc3RCdWlsZGVyIH0gZnJvbSAnLi4vYnVpbGRlcnMvbWFuaWZlc3QuYnVpbGRlcic7XG5pbXBvcnQgeyBTcGlubmVyU2VydmljZSB9IGZyb20gJy4uL3NwaW5uZXItc2VydmljZS9zcGlubmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuLi9pbnRsL3ZpZXdlci1pbnRsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIElpaWZNYW5pZmVzdFNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgX2N1cnJlbnRNYW5pZmVzdDogU3ViamVjdDxNYW5pZmVzdD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1hbmlmZXN0PihcbiAgICBudWxsXG4gICk7XG4gIHByb3RlY3RlZCBfZXJyb3JNZXNzYWdlOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpbnRsOiBNaW1lVmlld2VySW50bCxcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBzcGlubmVyU2VydmljZTogU3Bpbm5lclNlcnZpY2VcbiAgKSB7fVxuXG4gIGdldCBjdXJyZW50TWFuaWZlc3QoKTogT2JzZXJ2YWJsZTxNYW5pZmVzdD4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50TWFuaWZlc3QuYXNPYnNlcnZhYmxlKCkucGlwZShcbiAgICAgIGZpbHRlcihtID0+IG0gIT09IG51bGwpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICk7XG4gIH1cblxuICBnZXQgZXJyb3JNZXNzYWdlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9yTWVzc2FnZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGxvYWQobWFuaWZlc3RVcmk6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChtYW5pZmVzdFVyaSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fZXJyb3JNZXNzYWdlLm5leHQodGhpcy5pbnRsLm1hbmlmZXN0VXJpTWlzc2luZ0xhYmVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zcGlubmVyU2VydmljZS5zaG93KCk7XG4gICAgICB0aGlzLmh0dHBcbiAgICAgICAgLmdldChtYW5pZmVzdFVyaSlcbiAgICAgICAgLnBpcGUoZmluYWxpemUoKCkgPT4gdGhpcy5zcGlubmVyU2VydmljZS5oaWRlKCkpKVxuICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgIChyZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hbmlmZXN0ID0gdGhpcy5leHRyYWN0RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc01hbmlmZXN0VmFsaWQobWFuaWZlc3QpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRNYW5pZmVzdC5uZXh0KG1hbmlmZXN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX2Vycm9yTWVzc2FnZS5uZXh0KHRoaXMuaW50bC5tYW5pZmVzdE5vdFZhbGlkTGFiZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yTWVzc2FnZS5uZXh0KHRoaXMuaGFuZGxlRXJyb3IoZXJyKSk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZXNldEN1cnJlbnRNYW5pZmVzdCgpO1xuICAgIHRoaXMucmVzZXRFcnJvck1lc3NhZ2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRDdXJyZW50TWFuaWZlc3QoKSB7XG4gICAgdGhpcy5fY3VycmVudE1hbmlmZXN0Lm5leHQobnVsbCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RXJyb3JNZXNzYWdlKCkge1xuICAgIHRoaXMuX2Vycm9yTWVzc2FnZS5uZXh0KG51bGwpO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0RGF0YShyZXNwb25zZTogUmVzcG9uc2UpIHtcbiAgICByZXR1cm4gbmV3IE1hbmlmZXN0QnVpbGRlcihyZXNwb25zZSkuYnVpbGQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNNYW5pZmVzdFZhbGlkKG1hbmlmZXN0OiBNYW5pZmVzdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBtYW5pZmVzdCAmJiBtYW5pZmVzdC50aWxlU291cmNlICYmIG1hbmlmZXN0LnRpbGVTb3VyY2UubGVuZ3RoID4gMDtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSk6IHN0cmluZyB7XG4gICAgbGV0IGVyck1zZzogc3RyaW5nO1xuICAgIGlmIChlcnIuZXJyb3IgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGVyck1zZyA9IGVyci5tZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJNc2cgPSBlcnIuZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiBlcnJNc2c7XG4gIH1cbn1cbiJdfQ==