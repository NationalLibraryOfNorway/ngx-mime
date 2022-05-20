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
SpinnerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: SpinnerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SpinnerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: SpinnerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: SpinnerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvc3Bpbm5lci1zZXJ2aWNlL3NwaW5uZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBUy9CLE1BQU0sT0FBTyxjQUFjO0lBSXpCO1FBSFEsbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQUM5QyxpQkFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7SUFFMUMsQ0FBQztJQUVoQixJQUFJO1FBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQWUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFlLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7MkdBWlUsY0FBYzsrR0FBZCxjQUFjLGNBRmIsTUFBTTsyRkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBTcGlubmVyU3RhdGUge1xuICBzaG93OiBib29sZWFuO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3Bpbm5lclNlcnZpY2Uge1xuICBwcml2YXRlIHNwaW5uZXJTdWJqZWN0ID0gbmV3IFN1YmplY3Q8U3Bpbm5lclN0YXRlPigpO1xuICBwdWJsaWMgc3Bpbm5lclN0YXRlID0gdGhpcy5zcGlubmVyU3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLnNwaW5uZXJTdWJqZWN0Lm5leHQoPFNwaW5uZXJTdGF0ZT57IHNob3c6IHRydWUgfSk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMuc3Bpbm5lclN1YmplY3QubmV4dCg8U3Bpbm5lclN0YXRlPnsgc2hvdzogZmFsc2UgfSk7XG4gIH1cbn1cbiJdfQ==