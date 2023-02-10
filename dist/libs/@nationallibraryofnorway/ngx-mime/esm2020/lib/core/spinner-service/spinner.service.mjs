import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class SpinnerService {
    constructor() {
        this.spinnerSubject = new Subject();
        this.spinnerState = this.spinnerSubject.asObservable();
    }
    show() {
        this.spinnerSubject.next({ show: true });
    }
    hide() {
        this.spinnerSubject.next({ show: false });
    }
}
SpinnerService.ɵfac = function SpinnerService_Factory(t) { return new (t || SpinnerService)(); };
SpinnerService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SpinnerService, factory: SpinnerService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SpinnerService, [{
        type: Injectable
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvc3Bpbm5lci1zZXJ2aWNlL3NwaW5uZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBTy9CLE1BQU0sT0FBTyxjQUFjO0lBSXpCO1FBSFEsbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQUM5QyxpQkFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7SUFFMUMsQ0FBQztJQUVoQixJQUFJO1FBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQWUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFlLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7NEVBWlUsY0FBYztvRUFBZCxjQUFjLFdBQWQsY0FBYzt1RkFBZCxjQUFjO2NBRDFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3Bpbm5lclN0YXRlIHtcbiAgc2hvdzogYm9vbGVhbjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNwaW5uZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBzcGlubmVyU3ViamVjdCA9IG5ldyBTdWJqZWN0PFNwaW5uZXJTdGF0ZT4oKTtcbiAgcHVibGljIHNwaW5uZXJTdGF0ZSA9IHRoaXMuc3Bpbm5lclN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5zcGlubmVyU3ViamVjdC5uZXh0KDxTcGlubmVyU3RhdGU+eyBzaG93OiB0cnVlIH0pO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnNwaW5uZXJTdWJqZWN0Lm5leHQoPFNwaW5uZXJTdGF0ZT57IHNob3c6IGZhbHNlIH0pO1xuICB9XG59XG4iXX0=