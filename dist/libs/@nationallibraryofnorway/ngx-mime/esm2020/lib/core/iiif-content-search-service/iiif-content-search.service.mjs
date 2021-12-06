import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { distinctUntilChanged, finalize, take } from 'rxjs/operators';
import { SearchResultBuilder } from './../builders/search-result.builder';
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
IiifContentSearchService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: IiifContentSearchService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
IiifContentSearchService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: IiifContentSearchService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: IiifContentSearchService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQXVCLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBSTFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7O0FBR3pELE1BQU0sT0FBTyx3QkFBd0I7SUFTbkMsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQVIxQix5QkFBb0IsR0FBMEIsSUFBSSxlQUFlLENBQ3pFLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUNyQixDQUFDO1FBQ1EsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBQ2pELGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztRQUM1QyxjQUFTLEdBQUcsSUFBSSxlQUFlLENBQWEsSUFBSSxDQUFDLENBQUM7SUFHckIsQ0FBQztJQUV4QyxPQUFPO1FBQ0wsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBa0IsRUFBRSxDQUFTO1FBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDbkQsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDbEQsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUk7YUFDTixHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQzthQUNwQyxJQUFJLENBQ0gsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQzNDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUjthQUNBLFNBQVMsQ0FDUixDQUFDLEdBQXFCLEVBQUUsRUFBRSxDQUN4QixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUNwRSxDQUFDLEdBQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQzdDLENBQUM7SUFDTixDQUFDO0lBRU0sUUFBUSxDQUFDLEdBQVE7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLFNBQVMsQ0FBQyxNQUF3QjtRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRU8sV0FBVyxDQUNqQixDQUFTLEVBQ1QsUUFBa0IsRUFDbEIsZ0JBQWtDO1FBRWxDLE9BQU8sSUFBSSxtQkFBbUIsQ0FDNUIsQ0FBQyxFQUNELFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FDWixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVPLFdBQVcsQ0FBQyxHQUE0QjtRQUM5QyxJQUFJLE1BQWMsQ0FBQztRQUNuQixJQUFJLEdBQUcsQ0FBQyxLQUFLLFlBQVksS0FBSyxFQUFFO1lBQzlCLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUM1QjthQUFNO1lBQ0wsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7U0FDcEI7UUFDRCxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDOztxSEF0RlUsd0JBQXdCO3lIQUF4Qix3QkFBd0I7MkZBQXhCLHdCQUF3QjtrQkFEcEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0LCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmluYWxpemUsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNaW1lVmlld2VyQ29uZmlnIH0gZnJvbSAnLi4vbWltZS12aWV3ZXItY29uZmlnJztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdEJ1aWxkZXIgfSBmcm9tICcuLy4uL2J1aWxkZXJzL3NlYXJjaC1yZXN1bHQuYnVpbGRlcic7XG5pbXBvcnQgeyBIaXQgfSBmcm9tICcuLy4uL21vZGVscy9oaXQnO1xuaW1wb3J0IHsgSWlpZlNlYXJjaFJlc3VsdCB9IGZyb20gJy4vLi4vbW9kZWxzL2lpaWYtc2VhcmNoLXJlc3VsdCc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4vLi4vbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4vLi4vbW9kZWxzL3NlYXJjaC1yZXN1bHQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIF9jdXJyZW50U2VhcmNoUmVzdWx0OiBTdWJqZWN0PFNlYXJjaFJlc3VsdD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNlYXJjaFJlc3VsdD4oXG4gICAgbmV3IFNlYXJjaFJlc3VsdCh7fSlcbiAgKTtcbiAgcHJvdGVjdGVkIF9zZWFyY2hpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJvdGVjdGVkIF9jdXJyZW50USA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHByb3RlY3RlZCBfc2VsZWN0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhpdCB8IG51bGw+KG51bGwpO1xuXG4gIHByaXZhdGUgY29uZmlnITogTWltZVZpZXdlckNvbmZpZztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5fY3VycmVudFNlYXJjaFJlc3VsdC5uZXh0KG5ldyBTZWFyY2hSZXN1bHQoe30pKTtcbiAgICB0aGlzLl9zZWxlY3RlZC5uZXh0KG51bGwpO1xuICB9XG5cbiAgZ2V0IG9uUUNoYW5nZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50US5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uQ2hhbmdlKCk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTZWFyY2hSZXN1bHQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgaXNTZWFyY2hpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlYXJjaGluZy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBvblNlbGVjdGVkKCk6IE9ic2VydmFibGU8SGl0IHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWFyY2gobWFuaWZlc3Q6IE1hbmlmZXN0LCBxOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50US5uZXh0KHEpO1xuICAgIHRoaXMuX3NlbGVjdGVkLm5leHQobnVsbCk7XG5cbiAgICBpZiAocS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRTZWFyY2hSZXN1bHQubmV4dChuZXcgU2VhcmNoUmVzdWx0KCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIW1hbmlmZXN0LnNlcnZpY2UgfHwgbWFuaWZlc3Quc2VydmljZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZWFyY2hpbmcubmV4dCh0cnVlKTtcbiAgICB0aGlzLmh0dHBcbiAgICAgIC5nZXQoYCR7bWFuaWZlc3Quc2VydmljZS5pZH0/cT0ke3F9YClcbiAgICAgIC5waXBlKFxuICAgICAgICBmaW5hbGl6ZSgoKSA9PiB0aGlzLl9zZWFyY2hpbmcubmV4dChmYWxzZSkpLFxuICAgICAgICB0YWtlKDEpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAocmVzOiBJaWlmU2VhcmNoUmVzdWx0KSA9PlxuICAgICAgICAgIHRoaXMuX2N1cnJlbnRTZWFyY2hSZXN1bHQubmV4dCh0aGlzLmV4dHJhY3REYXRhKHEsIG1hbmlmZXN0LCByZXMpKSxcbiAgICAgICAgKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHRoaXMuaGFuZGxlRXJyb3JcbiAgICAgICk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0ZWQoaGl0OiBIaXQpIHtcbiAgICB0aGlzLl9zZWxlY3RlZC5uZXh0KGhpdCk7XG4gIH1cblxuICBwdWJsaWMgc2V0Q29uZmlnKGNvbmZpZzogTWltZVZpZXdlckNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0RGF0YShcbiAgICBxOiBzdHJpbmcsXG4gICAgbWFuaWZlc3Q6IE1hbmlmZXN0LFxuICAgIGlpaWZTZWFyY2hSZXN1bHQ6IElpaWZTZWFyY2hSZXN1bHRcbiAgKTogU2VhcmNoUmVzdWx0IHtcbiAgICByZXR1cm4gbmV3IFNlYXJjaFJlc3VsdEJ1aWxkZXIoXG4gICAgICBxLFxuICAgICAgbWFuaWZlc3QsXG4gICAgICBpaWlmU2VhcmNoUmVzdWx0LFxuICAgICAgdGhpcy5jb25maWdcbiAgICApLmJ1aWxkKCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycjogSHR0cEVycm9yUmVzcG9uc2UgfCBhbnkpIHtcbiAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XG4gICAgaWYgKGVyci5lcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBlcnJNc2cgPSBlcnIuZXJyb3IubWVzc2FnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyTXNnID0gZXJyLmVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJNc2cpO1xuICB9XG59XG4iXX0=