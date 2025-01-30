import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { DesktopContentSearchDialogConfigStrategy, MobileContentSearchDialogConfigStrategy, } from './content-search-dialog-config-strategy';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/layout";
import * as i2 from "../core/mime-dom-helper";
export class ContentSearchDialogConfigStrategyFactory {
    constructor(breakpointObserver, mimeDomHelper) {
        this.breakpointObserver = breakpointObserver;
        this.mimeDomHelper = mimeDomHelper;
    }
    create() {
        const isHandsetOrTabletInPortrait = this.breakpointObserver.isMatched([
            Breakpoints.Handset,
            Breakpoints.TabletPortrait,
        ]);
        return isHandsetOrTabletInPortrait
            ? new MobileContentSearchDialogConfigStrategy()
            : new DesktopContentSearchDialogConfigStrategy(this.mimeDomHelper);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: ContentSearchDialogConfigStrategyFactory, deps: [{ token: i1.BreakpointObserver }, { token: i2.MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: ContentSearchDialogConfigStrategyFactory }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: ContentSearchDialogConfigStrategyFactory, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.BreakpointObserver }, { type: i2.MimeDomHelper }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy9jb250ZW50LXNlYXJjaC1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFFTCx3Q0FBd0MsRUFDeEMsdUNBQXVDLEdBQ3hDLE1BQU0seUNBQXlDLENBQUM7Ozs7QUFHakQsTUFBTSxPQUFPLHdDQUF3QztJQUNuRCxZQUNtQixrQkFBc0MsRUFDdEMsYUFBNEI7UUFENUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUM1QyxDQUFDO0lBRUcsTUFBTTtRQUNYLE1BQU0sMkJBQTJCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztZQUNwRSxXQUFXLENBQUMsT0FBTztZQUNuQixXQUFXLENBQUMsY0FBYztTQUMzQixDQUFDLENBQUM7UUFFSCxPQUFPLDJCQUEyQjtZQUNoQyxDQUFDLENBQUMsSUFBSSx1Q0FBdUMsRUFBRTtZQUMvQyxDQUFDLENBQUMsSUFBSSx3Q0FBd0MsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkUsQ0FBQzs4R0FmVSx3Q0FBd0M7a0hBQXhDLHdDQUF3Qzs7MkZBQXhDLHdDQUF3QztrQkFEcEQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJyZWFrcG9pbnRPYnNlcnZlciwgQnJlYWtwb2ludHMgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1pbWVEb21IZWxwZXIgfSBmcm9tICcuLi9jb3JlL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQge1xuICBDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3ksXG4gIERlc2t0b3BDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3ksXG4gIE1vYmlsZUNvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneSxcbn0gZnJvbSAnLi9jb250ZW50LXNlYXJjaC1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneUZhY3Rvcnkge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IGJyZWFrcG9pbnRPYnNlcnZlcjogQnJlYWtwb2ludE9ic2VydmVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgbWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlcixcbiAgKSB7fVxuXG4gIHB1YmxpYyBjcmVhdGUoKTogQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5IHtcbiAgICBjb25zdCBpc0hhbmRzZXRPclRhYmxldEluUG9ydHJhaXQgPSB0aGlzLmJyZWFrcG9pbnRPYnNlcnZlci5pc01hdGNoZWQoW1xuICAgICAgQnJlYWtwb2ludHMuSGFuZHNldCxcbiAgICAgIEJyZWFrcG9pbnRzLlRhYmxldFBvcnRyYWl0LFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIGlzSGFuZHNldE9yVGFibGV0SW5Qb3J0cmFpdFxuICAgICAgPyBuZXcgTW9iaWxlQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5KClcbiAgICAgIDogbmV3IERlc2t0b3BDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3kodGhpcy5taW1lRG9tSGVscGVyKTtcbiAgfVxufVxuIl19