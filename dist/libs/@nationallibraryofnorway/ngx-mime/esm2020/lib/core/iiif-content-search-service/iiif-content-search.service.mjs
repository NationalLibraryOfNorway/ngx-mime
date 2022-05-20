import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { distinctUntilChanged, finalize, take } from 'rxjs/operators';
import { SearchResultBuilder } from '../builders/iiif/search-result.builder';
import { SearchResult } from './../models/search-result';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class IiifContentSearchService {
    constructor(http) {
        this.http = http;
        this._currentSearchResult = new BehaviorSubject(new SearchResult({}));
        this._searching = new BehaviorSubject(false);
        this._currentQ = new BehaviorSubject('');
        this._selected = new BehaviorSubject(null);
    }
    destroy() {
        this._currentSearchResult.next(new SearchResult({}));
        this._searching.next(false);
        this._currentQ.next('');
        this._selected.next(null);
    }
    get onQChange() {
        return this._currentQ.asObservable().pipe(distinctUntilChanged());
    }
    get onChange() {
        return this._currentSearchResult.asObservable();
    }
    get isSearching() {
        return this._searching.asObservable();
    }
    get onSelected() {
        return this._selected.asObservable();
    }
    search(manifest, q) {
        this._currentQ.next(q);
        this._selected.next(null);
        if (q.length === 0) {
            this._currentSearchResult.next(new SearchResult());
            return;
        }
        if (!manifest.service || manifest.service === null) {
            return;
        }
        this._searching.next(true);
        this.http
            .get(`${manifest.service.id}?q=${q}`)
            .pipe(finalize(() => this._searching.next(false)), take(1))
            .subscribe((res) => this._currentSearchResult.next(this.extractData(q, manifest, res)), (err) => this.handleError);
    }
    selected(hit) {
        this._selected.next(hit);
    }
    setConfig(config) {
        this.config = config;
    }
    extractData(q, manifest, iiifSearchResult) {
        return new SearchResultBuilder(q, manifest, iiifSearchResult, this.config).build();
    }
    handleError(err) {
        let errMsg;
        if (err.error instanceof Error) {
            errMsg = err.error.message;
        }
        else {
            errMsg = err.error;
        }
        return throwError(errMsg);
    }
}
IiifContentSearchService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: IiifContentSearchService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
IiifContentSearchService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: IiifContentSearchService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: IiifContentSearchService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQXVCLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBSzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7O0FBS3pELE1BQU0sT0FBTyx3QkFBd0I7SUFRbkMsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQVAxQix5QkFBb0IsR0FDNUIsSUFBSSxlQUFlLENBQWUsSUFBSSxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRCxlQUFVLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFDakQsY0FBUyxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBYSxJQUFJLENBQUMsQ0FBQztJQUdyQixDQUFDO0lBRXhDLE9BQU87UUFDTCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNB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QztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbmFsaXplLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0QnVpbGRlciB9IGZyb20gJy4uL2J1aWxkZXJzL2lpaWYvc2VhcmNoLXJlc3VsdC5idWlsZGVyJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJDb25maWcgfSBmcm9tICcuLi9taW1lLXZpZXdlci1jb25maWcnO1xuaW1wb3J0IHsgSGl0IH0gZnJvbSAnLi8uLi9tb2RlbHMvaGl0JztcbmltcG9ydCB7IElpaWZTZWFyY2hSZXN1bHQgfSBmcm9tICcuLy4uL21vZGVscy9paWlmLXNlYXJjaC1yZXN1bHQnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLy4uL21vZGVscy9zZWFyY2gtcmVzdWx0JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIElpaWZDb250ZW50U2VhcmNoU2VydmljZSB7XG4gIHByb3RlY3RlZCBfY3VycmVudFNlYXJjaFJlc3VsdDogU3ViamVjdDxTZWFyY2hSZXN1bHQ+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PFNlYXJjaFJlc3VsdD4obmV3IFNlYXJjaFJlc3VsdCh7fSkpO1xuICBwcm90ZWN0ZWQgX3NlYXJjaGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwcm90ZWN0ZWQgX2N1cnJlbnRRID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgcHJvdGVjdGVkIF9zZWxlY3RlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SGl0IHwgbnVsbD4obnVsbCk7XG5cbiAgcHJpdmF0ZSBjb25maWchOiBNaW1lVmlld2VyQ29uZmlnO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLl9jdXJyZW50U2VhcmNoUmVzdWx0Lm5leHQobmV3IFNlYXJjaFJlc3VsdCh7fSkpO1xuICAgIHRoaXMuX3NlYXJjaGluZy5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLl9jdXJyZW50US5uZXh0KCcnKTtcbiAgICB0aGlzLl9zZWxlY3RlZC5uZXh0KG51bGwpO1xuICB9XG5cbiAgZ2V0IG9uUUNoYW5nZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50US5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uQ2hhbmdlKCk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTZWFyY2hSZXN1bHQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgaXNTZWFyY2hpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlYXJjaGluZy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBvblNlbGVjdGVkKCk6IE9ic2VydmFibGU8SGl0IHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWFyY2gobWFuaWZlc3Q6IE1hbmlmZXN0LCBxOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50US5uZXh0KHEpO1xuICAgIHRoaXMuX3NlbGVjdGVkLm5leHQobnVsbCk7XG5cbiAgICBpZiAocS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRTZWFyY2hSZXN1bHQubmV4dChuZXcgU2VhcmNoUmVzdWx0KCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIW1hbmlmZXN0LnNlcnZpY2UgfHwgbWFuaWZlc3Quc2VydmljZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZWFyY2hpbmcubmV4dCh0cnVlKTtcbiAgICB0aGlzLmh0dHBcbiAgICAgIC5nZXQoYCR7bWFuaWZlc3Quc2VydmljZS5pZH0/cT0ke3F9YClcbiAgICAgIC5waXBlKFxuICAgICAgICBmaW5hbGl6ZSgoKSA9PiB0aGlzLl9zZWFyY2hpbmcubmV4dChmYWxzZSkpLFxuICAgICAgICB0YWtlKDEpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAocmVzOiBJaWlmU2VhcmNoUmVzdWx0KSA9PlxuICAgICAgICAgIHRoaXMuX2N1cnJlbnRTZWFyY2hSZXN1bHQubmV4dCh0aGlzLmV4dHJhY3REYXRhKHEsIG1hbmlmZXN0LCByZXMpKSxcbiAgICAgICAgKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHRoaXMuaGFuZGxlRXJyb3JcbiAgICAgICk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0ZWQoaGl0OiBIaXQpIHtcbiAgICB0aGlzLl9zZWxlY3RlZC5uZXh0KGhpdCk7XG4gIH1cblxuICBwdWJsaWMgc2V0Q29uZmlnKGNvbmZpZzogTWltZVZpZXdlckNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0RGF0YShcbiAgICBxOiBzdHJpbmcsXG4gICAgbWFuaWZlc3Q6IE1hbmlmZXN0LFxuICAgIGlpaWZTZWFyY2hSZXN1bHQ6IElpaWZTZWFyY2hSZXN1bHRcbiAgKTogU2VhcmNoUmVzdWx0IHtcbiAgICByZXR1cm4gbmV3IFNlYXJjaFJlc3VsdEJ1aWxkZXIoXG4gICAgICBxLFxuICAgICAgbWFuaWZlc3QsXG4gICAgICBpaWlmU2VhcmNoUmVzdWx0LFxuICAgICAgdGhpcy5jb25maWdcbiAgICApLmJ1aWxkKCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycjogSHR0cEVycm9yUmVzcG9uc2UgfCBhbnkpIHtcbiAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XG4gICAgaWYgKGVyci5lcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBlcnJNc2cgPSBlcnIuZXJyb3IubWVzc2FnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyTXNnID0gZXJyLmVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJNc2cpO1xuICB9XG59XG4iXX0=