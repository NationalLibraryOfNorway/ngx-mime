import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { distinctUntilChanged, finalize, switchMap, take, } from 'rxjs/operators';
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
            .pipe(finalize(() => this._searching.next(false)), take(1), switchMap((res) => {
            return of(this.extractData(q, manifest, res));
        }))
            .subscribe((res) => this._currentSearchResult.next(res), (err) => this.handleError);
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
IiifContentSearchService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IiifContentSearchService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
IiifContentSearchService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IiifContentSearchService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IiifContentSearchService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFxQixNQUFNLHNCQUFzQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxFQUFFLEVBQVcsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVFLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsUUFBUSxFQUVSLFNBQVMsRUFDVCxJQUFJLEdBQ0wsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUs3RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7OztBQUd6RCxNQUFNLE9BQU8sd0JBQXdCO0lBUW5DLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFQMUIseUJBQW9CLEdBQzVCLElBQUksZUFBZSxDQUFlLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEQsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBQ2pELGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztRQUM1QyxjQUFTLEdBQUcsSUFBSSxlQUFlLENBQWEsSUFBSSxDQUFDLENBQUM7SUFHckIsQ0FBQztJQUV4QyxPQUFPO1FBQ0wsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JE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TUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7U0FDcEI7UUFDRCxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDOztxSEF6RlUsd0JBQXdCO3lIQUF4Qix3QkFBd0I7MkZBQXhCLHdCQUF3QjtrQkFEcEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIGZpbmFsaXplLFxuICBtYXAsXG4gIHN3aXRjaE1hcCxcbiAgdGFrZSxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0QnVpbGRlciB9IGZyb20gJy4uL2J1aWxkZXJzL2lpaWYvc2VhcmNoLXJlc3VsdC5idWlsZGVyJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJDb25maWcgfSBmcm9tICcuLi9taW1lLXZpZXdlci1jb25maWcnO1xuaW1wb3J0IHsgSGl0IH0gZnJvbSAnLi8uLi9tb2RlbHMvaGl0JztcbmltcG9ydCB7IElpaWZTZWFyY2hSZXN1bHQgfSBmcm9tICcuLy4uL21vZGVscy9paWlmLXNlYXJjaC1yZXN1bHQnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLy4uL21vZGVscy9zZWFyY2gtcmVzdWx0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIElpaWZDb250ZW50U2VhcmNoU2VydmljZSB7XG4gIHByb3RlY3RlZCBfY3VycmVudFNlYXJjaFJlc3VsdDogU3ViamVjdDxTZWFyY2hSZXN1bHQ+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PFNlYXJjaFJlc3VsdD4obmV3IFNlYXJjaFJlc3VsdCh7fSkpO1xuICBwcm90ZWN0ZWQgX3NlYXJjaGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwcm90ZWN0ZWQgX2N1cnJlbnRRID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgcHJvdGVjdGVkIF9zZWxlY3RlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SGl0IHwgbnVsbD4obnVsbCk7XG5cbiAgcHJpdmF0ZSBjb25maWchOiBNaW1lVmlld2VyQ29uZmlnO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLl9jdXJyZW50U2VhcmNoUmVzdWx0Lm5leHQobmV3IFNlYXJjaFJlc3VsdCh7fSkpO1xuICAgIHRoaXMuX3NlYXJjaGluZy5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLl9jdXJyZW50US5uZXh0KCcnKTtcbiAgICB0aGlzLl9zZWxlY3RlZC5uZXh0KG51bGwpO1xuICB9XG5cbiAgZ2V0IG9uUUNoYW5nZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50US5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uQ2hhbmdlKCk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTZWFyY2hSZXN1bHQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgaXNTZWFyY2hpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlYXJjaGluZy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBvblNlbGVjdGVkKCk6IE9ic2VydmFibGU8SGl0IHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWFyY2gobWFuaWZlc3Q6IE1hbmlmZXN0LCBxOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50US5uZXh0KHEpO1xuICAgIHRoaXMuX3NlbGVjdGVkLm5leHQobnVsbCk7XG5cbiAgICBpZiAocS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRTZWFyY2hSZXN1bHQubmV4dChuZXcgU2VhcmNoUmVzdWx0KCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIW1hbmlmZXN0LnNlcnZpY2UgfHwgbWFuaWZlc3Quc2VydmljZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZWFyY2hpbmcubmV4dCh0cnVlKTtcbiAgICB0aGlzLmh0dHBcbiAgICAgIC5nZXQoYCR7bWFuaWZlc3Quc2VydmljZS5pZH0/cT0ke3F9YClcbiAgICAgIC5waXBlKFxuICAgICAgICBmaW5hbGl6ZSgoKSA9PiB0aGlzLl9zZWFyY2hpbmcubmV4dChmYWxzZSkpLFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICBzd2l0Y2hNYXAoKHJlczogSWlpZlNlYXJjaFJlc3VsdCkgPT4ge1xuICAgICAgICAgIHJldHVybiBvZih0aGlzLmV4dHJhY3REYXRhKHEsIG1hbmlmZXN0LCByZXMpKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChyZXM6IFNlYXJjaFJlc3VsdCkgPT4gdGhpcy5fY3VycmVudFNlYXJjaFJlc3VsdC5uZXh0KHJlcyksXG4gICAgICAgIChlcnI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB0aGlzLmhhbmRsZUVycm9yXG4gICAgICApO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdGVkKGhpdDogSGl0KSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQubmV4dChoaXQpO1xuICB9XG5cbiAgcHVibGljIHNldENvbmZpZyhjb25maWc6IE1pbWVWaWV3ZXJDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdERhdGEoXG4gICAgcTogc3RyaW5nLFxuICAgIG1hbmlmZXN0OiBNYW5pZmVzdCxcbiAgICBpaWlmU2VhcmNoUmVzdWx0OiBJaWlmU2VhcmNoUmVzdWx0XG4gICk6IFNlYXJjaFJlc3VsdCB7XG4gICAgcmV0dXJuIG5ldyBTZWFyY2hSZXN1bHRCdWlsZGVyKFxuICAgICAgcSxcbiAgICAgIG1hbmlmZXN0LFxuICAgICAgaWlpZlNlYXJjaFJlc3VsdCxcbiAgICAgIHRoaXMuY29uZmlnXG4gICAgKS5idWlsZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnI6IEh0dHBFcnJvclJlc3BvbnNlIHwgYW55KSB7XG4gICAgbGV0IGVyck1zZzogc3RyaW5nO1xuICAgIGlmIChlcnIuZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgZXJyTXNnID0gZXJyLmVycm9yLm1lc3NhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyck1zZyA9IGVyci5lcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIHRocm93RXJyb3IoZXJyTXNnKTtcbiAgfVxufVxuIl19