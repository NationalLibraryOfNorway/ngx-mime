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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: IiifContentSearchService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: IiifContentSearchService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: IiifContentSearchService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.HttpClient }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFxQixNQUFNLHNCQUFzQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxFQUFFLEVBQVcsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVFLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsUUFBUSxFQUVSLFNBQVMsRUFDVCxJQUFJLEdBQ0wsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUs3RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7OztBQUd6RCxNQUFNLE9BQU8sd0JBQXdCO0lBUW5DLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFQMUIseUJBQW9CLEdBQzVCLElBQUksZUFBZSxDQUFlLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEQsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBQ2pELGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztRQUM1QyxjQUFTLEdBQUcsSUFBSSxlQUFlLENBQWEsSUFBSSxDQUFDLENBQUM7SUFHckIsQ0FBQztJQUV4QyxPQUFPO1FBQ0wsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JE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QUFPLENBQUM7UUFDN0IsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUNyQixDQUFDO1FBQ0QsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs4R0F6RlUsd0JBQXdCO2tIQUF4Qix3QkFBd0I7OzJGQUF4Qix3QkFBd0I7a0JBRHBDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaW5hbGl6ZSxcbiAgbWFwLFxuICBzd2l0Y2hNYXAsXG4gIHRha2UsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdEJ1aWxkZXIgfSBmcm9tICcuLi9idWlsZGVycy9paWlmL3NlYXJjaC1yZXN1bHQuYnVpbGRlcic7XG5pbXBvcnQgeyBNaW1lVmlld2VyQ29uZmlnIH0gZnJvbSAnLi4vbWltZS12aWV3ZXItY29uZmlnJztcbmltcG9ydCB7IEhpdCB9IGZyb20gJy4vLi4vbW9kZWxzL2hpdCc7XG5pbXBvcnQgeyBJaWlmU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi9tb2RlbHMvaWlpZi1zZWFyY2gtcmVzdWx0JztcbmltcG9ydCB7IE1hbmlmZXN0IH0gZnJvbSAnLi8uLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi9tb2RlbHMvc2VhcmNoLXJlc3VsdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgX2N1cnJlbnRTZWFyY2hSZXN1bHQ6IFN1YmplY3Q8U2VhcmNoUmVzdWx0PiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxTZWFyY2hSZXN1bHQ+KG5ldyBTZWFyY2hSZXN1bHQoe30pKTtcbiAgcHJvdGVjdGVkIF9zZWFyY2hpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJvdGVjdGVkIF9jdXJyZW50USA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHByb3RlY3RlZCBfc2VsZWN0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhpdCB8IG51bGw+KG51bGwpO1xuXG4gIHByaXZhdGUgY29uZmlnITogTWltZVZpZXdlckNvbmZpZztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5fY3VycmVudFNlYXJjaFJlc3VsdC5uZXh0KG5ldyBTZWFyY2hSZXN1bHQoe30pKTtcbiAgICB0aGlzLl9zZWFyY2hpbmcubmV4dChmYWxzZSk7XG4gICAgdGhpcy5fY3VycmVudFEubmV4dCgnJyk7XG4gICAgdGhpcy5fc2VsZWN0ZWQubmV4dChudWxsKTtcbiAgfVxuXG4gIGdldCBvblFDaGFuZ2UoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFEuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBvbkNoYW5nZSgpOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50U2VhcmNoUmVzdWx0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGlzU2VhcmNoaW5nKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9zZWFyY2hpbmcuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgb25TZWxlY3RlZCgpOiBPYnNlcnZhYmxlPEhpdCB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgc2VhcmNoKG1hbmlmZXN0OiBNYW5pZmVzdCwgcTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fY3VycmVudFEubmV4dChxKTtcbiAgICB0aGlzLl9zZWxlY3RlZC5uZXh0KG51bGwpO1xuXG4gICAgaWYgKHEubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLl9jdXJyZW50U2VhcmNoUmVzdWx0Lm5leHQobmV3IFNlYXJjaFJlc3VsdCgpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFtYW5pZmVzdC5zZXJ2aWNlIHx8IG1hbmlmZXN0LnNlcnZpY2UgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2VhcmNoaW5nLm5leHQodHJ1ZSk7XG4gICAgdGhpcy5odHRwXG4gICAgICAuZ2V0KGAke21hbmlmZXN0LnNlcnZpY2UuaWR9P3E9JHtxfWApXG4gICAgICAucGlwZShcbiAgICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5fc2VhcmNoaW5nLm5leHQoZmFsc2UpKSxcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgc3dpdGNoTWFwKChyZXM6IElpaWZTZWFyY2hSZXN1bHQpID0+IHtcbiAgICAgICAgICByZXR1cm4gb2YodGhpcy5leHRyYWN0RGF0YShxLCBtYW5pZmVzdCwgcmVzKSk7XG4gICAgICAgIH0pLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKHJlczogU2VhcmNoUmVzdWx0KSA9PiB0aGlzLl9jdXJyZW50U2VhcmNoUmVzdWx0Lm5leHQocmVzKSxcbiAgICAgICAgKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHRoaXMuaGFuZGxlRXJyb3IsXG4gICAgICApO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdGVkKGhpdDogSGl0KSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQubmV4dChoaXQpO1xuICB9XG5cbiAgcHVibGljIHNldENvbmZpZyhjb25maWc6IE1pbWVWaWV3ZXJDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdERhdGEoXG4gICAgcTogc3RyaW5nLFxuICAgIG1hbmlmZXN0OiBNYW5pZmVzdCxcbiAgICBpaWlmU2VhcmNoUmVzdWx0OiBJaWlmU2VhcmNoUmVzdWx0LFxuICApOiBTZWFyY2hSZXN1bHQge1xuICAgIHJldHVybiBuZXcgU2VhcmNoUmVzdWx0QnVpbGRlcihcbiAgICAgIHEsXG4gICAgICBtYW5pZmVzdCxcbiAgICAgIGlpaWZTZWFyY2hSZXN1bHQsXG4gICAgICB0aGlzLmNvbmZpZyxcbiAgICApLmJ1aWxkKCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycjogSHR0cEVycm9yUmVzcG9uc2UgfCBhbnkpIHtcbiAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XG4gICAgaWYgKGVyci5lcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBlcnJNc2cgPSBlcnIuZXJyb3IubWVzc2FnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyTXNnID0gZXJyLmVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJNc2cpO1xuICB9XG59XG4iXX0=