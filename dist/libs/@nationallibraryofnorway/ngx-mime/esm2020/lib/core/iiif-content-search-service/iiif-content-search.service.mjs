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
IiifContentSearchService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: IiifContentSearchService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
IiifContentSearchService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: IiifContentSearchService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: IiifContentSearchService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsRUFBRSxFQUFXLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1RSxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLFFBQVEsRUFFUixTQUFTLEVBQ1QsSUFBSSxHQUNMLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFLN0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7QUFHekQsTUFBTSxPQUFPLHdCQUF3QjtJQVFuQyxZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBUDFCLHlCQUFvQixHQUM1QixJQUFJLGVBQWUsQ0FBZSxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hELGVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUNqRCxjQUFTLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7UUFDNUMsY0FBUyxHQUFHLElBQUksZUFBZSxDQUFhLElBQUksQ0FBQyxDQUFDO0lBR3JCLENBQUM7SUFFeEMsT0FBTztRQUNMLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FB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TyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7cUhBekZVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBRHBDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaW5hbGl6ZSxcbiAgbWFwLFxuICBzd2l0Y2hNYXAsXG4gIHRha2UsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdEJ1aWxkZXIgfSBmcm9tICcuLi9idWlsZGVycy9paWlmL3NlYXJjaC1yZXN1bHQuYnVpbGRlcic7XG5pbXBvcnQgeyBNaW1lVmlld2VyQ29uZmlnIH0gZnJvbSAnLi4vbWltZS12aWV3ZXItY29uZmlnJztcbmltcG9ydCB7IEhpdCB9IGZyb20gJy4vLi4vbW9kZWxzL2hpdCc7XG5pbXBvcnQgeyBJaWlmU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi9tb2RlbHMvaWlpZi1zZWFyY2gtcmVzdWx0JztcbmltcG9ydCB7IE1hbmlmZXN0IH0gZnJvbSAnLi8uLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi9tb2RlbHMvc2VhcmNoLXJlc3VsdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgX2N1cnJlbnRTZWFyY2hSZXN1bHQ6IFN1YmplY3Q8U2VhcmNoUmVzdWx0PiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxTZWFyY2hSZXN1bHQ+KG5ldyBTZWFyY2hSZXN1bHQoe30pKTtcbiAgcHJvdGVjdGVkIF9zZWFyY2hpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJvdGVjdGVkIF9jdXJyZW50USA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHByb3RlY3RlZCBfc2VsZWN0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhpdCB8IG51bGw+KG51bGwpO1xuXG4gIHByaXZhdGUgY29uZmlnITogTWltZVZpZXdlckNvbmZpZztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5fY3VycmVudFNlYXJjaFJlc3VsdC5uZXh0KG5ldyBTZWFyY2hSZXN1bHQoe30pKTtcbiAgICB0aGlzLl9zZWFyY2hpbmcubmV4dChmYWxzZSk7XG4gICAgdGhpcy5fY3VycmVudFEubmV4dCgnJyk7XG4gICAgdGhpcy5fc2VsZWN0ZWQubmV4dChudWxsKTtcbiAgfVxuXG4gIGdldCBvblFDaGFuZ2UoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFEuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBvbkNoYW5nZSgpOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50U2VhcmNoUmVzdWx0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGlzU2VhcmNoaW5nKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9zZWFyY2hpbmcuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgb25TZWxlY3RlZCgpOiBPYnNlcnZhYmxlPEhpdCB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgc2VhcmNoKG1hbmlmZXN0OiBNYW5pZmVzdCwgcTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fY3VycmVudFEubmV4dChxKTtcbiAgICB0aGlzLl9zZWxlY3RlZC5uZXh0KG51bGwpO1xuXG4gICAgaWYgKHEubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLl9jdXJyZW50U2VhcmNoUmVzdWx0Lm5leHQobmV3IFNlYXJjaFJlc3VsdCgpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFtYW5pZmVzdC5zZXJ2aWNlIHx8IG1hbmlmZXN0LnNlcnZpY2UgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2VhcmNoaW5nLm5leHQodHJ1ZSk7XG4gICAgdGhpcy5odHRwXG4gICAgICAuZ2V0KGAke21hbmlmZXN0LnNlcnZpY2UuaWR9P3E9JHtxfWApXG4gICAgICAucGlwZShcbiAgICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5fc2VhcmNoaW5nLm5leHQoZmFsc2UpKSxcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgc3dpdGNoTWFwKChyZXM6IElpaWZTZWFyY2hSZXN1bHQpID0+IHtcbiAgICAgICAgICByZXR1cm4gb2YodGhpcy5leHRyYWN0RGF0YShxLCBtYW5pZmVzdCwgcmVzKSk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAocmVzOiBTZWFyY2hSZXN1bHQpID0+IHRoaXMuX2N1cnJlbnRTZWFyY2hSZXN1bHQubmV4dChyZXMpLFxuICAgICAgICAoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4gdGhpcy5oYW5kbGVFcnJvclxuICAgICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RlZChoaXQ6IEhpdCkge1xuICAgIHRoaXMuX3NlbGVjdGVkLm5leHQoaGl0KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRDb25maWcoY29uZmlnOiBNaW1lVmlld2VyQ29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3REYXRhKFxuICAgIHE6IHN0cmluZyxcbiAgICBtYW5pZmVzdDogTWFuaWZlc3QsXG4gICAgaWlpZlNlYXJjaFJlc3VsdDogSWlpZlNlYXJjaFJlc3VsdFxuICApOiBTZWFyY2hSZXN1bHQge1xuICAgIHJldHVybiBuZXcgU2VhcmNoUmVzdWx0QnVpbGRlcihcbiAgICAgIHEsXG4gICAgICBtYW5pZmVzdCxcbiAgICAgIGlpaWZTZWFyY2hSZXN1bHQsXG4gICAgICB0aGlzLmNvbmZpZ1xuICAgICkuYnVpbGQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSB8IGFueSkge1xuICAgIGxldCBlcnJNc2c6IHN0cmluZztcbiAgICBpZiAoZXJyLmVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIGVyck1zZyA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJNc2cgPSBlcnIuZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiB0aHJvd0Vycm9yKGVyck1zZyk7XG4gIH1cbn1cbiJdfQ==