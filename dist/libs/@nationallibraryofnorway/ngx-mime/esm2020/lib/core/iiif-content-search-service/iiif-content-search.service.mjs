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
IiifContentSearchService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: IiifContentSearchService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
IiifContentSearchService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: IiifContentSearchService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: IiifContentSearchService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQXVCLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBSzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7O0FBR3pELE1BQU0sT0FBTyx3QkFBd0I7SUFRbkMsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQVAxQix5QkFBb0IsR0FDNUIsSUFBSSxlQUFlLENBQWUsSUFBSSxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRCxlQUFVLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFDakQsY0FBUyxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBYSxJQUFJLENBQUMsQ0FBQztJQUdyQixDQUFDO0lBRXhDLE9BQU87UUFDTCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNB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bnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaW5hbGl6ZSwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdEJ1aWxkZXIgfSBmcm9tICcuLi9idWlsZGVycy9paWlmL3NlYXJjaC1yZXN1bHQuYnVpbGRlcic7XG5pbXBvcnQgeyBNaW1lVmlld2VyQ29uZmlnIH0gZnJvbSAnLi4vbWltZS12aWV3ZXItY29uZmlnJztcbmltcG9ydCB7IEhpdCB9IGZyb20gJy4vLi4vbW9kZWxzL2hpdCc7XG5pbXBvcnQgeyBJaWlmU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi9tb2RlbHMvaWlpZi1zZWFyY2gtcmVzdWx0JztcbmltcG9ydCB7IE1hbmlmZXN0IH0gZnJvbSAnLi8uLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi9tb2RlbHMvc2VhcmNoLXJlc3VsdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgX2N1cnJlbnRTZWFyY2hSZXN1bHQ6IFN1YmplY3Q8U2VhcmNoUmVzdWx0PiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxTZWFyY2hSZXN1bHQ+KG5ldyBTZWFyY2hSZXN1bHQoe30pKTtcbiAgcHJvdGVjdGVkIF9zZWFyY2hpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJvdGVjdGVkIF9jdXJyZW50USA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHByb3RlY3RlZCBfc2VsZWN0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhpdCB8IG51bGw+KG51bGwpO1xuXG4gIHByaXZhdGUgY29uZmlnITogTWltZVZpZXdlckNvbmZpZztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5fY3VycmVudFNlYXJjaFJlc3VsdC5uZXh0KG5ldyBTZWFyY2hSZXN1bHQoe30pKTtcbiAgICB0aGlzLl9zZWFyY2hpbmcubmV4dChmYWxzZSk7XG4gICAgdGhpcy5fY3VycmVudFEubmV4dCgnJyk7XG4gICAgdGhpcy5fc2VsZWN0ZWQubmV4dChudWxsKTtcbiAgfVxuXG4gIGdldCBvblFDaGFuZ2UoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFEuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBvbkNoYW5nZSgpOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50U2VhcmNoUmVzdWx0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGlzU2VhcmNoaW5nKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9zZWFyY2hpbmcuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgb25TZWxlY3RlZCgpOiBPYnNlcnZhYmxlPEhpdCB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgc2VhcmNoKG1hbmlmZXN0OiBNYW5pZmVzdCwgcTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fY3VycmVudFEubmV4dChxKTtcbiAgICB0aGlzLl9zZWxlY3RlZC5uZXh0KG51bGwpO1xuXG4gICAgaWYgKHEubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLl9jdXJyZW50U2VhcmNoUmVzdWx0Lm5leHQobmV3IFNlYXJjaFJlc3VsdCgpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFtYW5pZmVzdC5zZXJ2aWNlIHx8IG1hbmlmZXN0LnNlcnZpY2UgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2VhcmNoaW5nLm5leHQodHJ1ZSk7XG4gICAgdGhpcy5odHRwXG4gICAgICAuZ2V0KGAke21hbmlmZXN0LnNlcnZpY2UuaWR9P3E9JHtxfWApXG4gICAgICAucGlwZShcbiAgICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5fc2VhcmNoaW5nLm5leHQoZmFsc2UpKSxcbiAgICAgICAgdGFrZSgxKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKHJlczogSWlpZlNlYXJjaFJlc3VsdCkgPT5cbiAgICAgICAgICB0aGlzLl9jdXJyZW50U2VhcmNoUmVzdWx0Lm5leHQodGhpcy5leHRyYWN0RGF0YShxLCBtYW5pZmVzdCwgcmVzKSksXG4gICAgICAgIChlcnI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB0aGlzLmhhbmRsZUVycm9yXG4gICAgICApO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdGVkKGhpdDogSGl0KSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQubmV4dChoaXQpO1xuICB9XG5cbiAgcHVibGljIHNldENvbmZpZyhjb25maWc6IE1pbWVWaWV3ZXJDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdERhdGEoXG4gICAgcTogc3RyaW5nLFxuICAgIG1hbmlmZXN0OiBNYW5pZmVzdCxcbiAgICBpaWlmU2VhcmNoUmVzdWx0OiBJaWlmU2VhcmNoUmVzdWx0XG4gICk6IFNlYXJjaFJlc3VsdCB7XG4gICAgcmV0dXJuIG5ldyBTZWFyY2hSZXN1bHRCdWlsZGVyKFxuICAgICAgcSxcbiAgICAgIG1hbmlmZXN0LFxuICAgICAgaWlpZlNlYXJjaFJlc3VsdCxcbiAgICAgIHRoaXMuY29uZmlnXG4gICAgKS5idWlsZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnI6IEh0dHBFcnJvclJlc3BvbnNlIHwgYW55KSB7XG4gICAgbGV0IGVyck1zZzogc3RyaW5nO1xuICAgIGlmIChlcnIuZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgZXJyTXNnID0gZXJyLmVycm9yLm1lc3NhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyck1zZyA9IGVyci5lcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIHRocm93RXJyb3IoZXJyTXNnKTtcbiAgfVxufVxuIl19