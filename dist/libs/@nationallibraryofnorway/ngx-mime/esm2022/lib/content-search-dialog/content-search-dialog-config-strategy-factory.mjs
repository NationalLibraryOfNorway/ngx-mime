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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ContentSearchDialogConfigStrategyFactory, deps: [{ token: i1.BreakpointObserver }, { token: i2.MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ContentSearchDialogConfigStrategyFactory }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ContentSearchDialogConfigStrategyFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.BreakpointObserver }, { type: i2.MimeDomHelper }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy9jb250ZW50LXNlYXJjaC1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFFTCx3Q0FBd0MsRUFDeEMsdUNBQXVDLEdBQ3hDLE1BQU0seUNBQXlDLENBQUM7Ozs7QUFHakQsTUFBTSxPQUFPLHdDQUF3QztJQUNuRCxZQUNVLGtCQUFzQyxFQUN0QyxhQUE0QjtRQUQ1Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ25DLENBQUM7SUFFRyxNQUFNO1FBQ1gsTUFBTSwyQkFBMkIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDO1lBQ3BFLFdBQVcsQ0FBQyxPQUFPO1lBQ25CLFdBQVcsQ0FBQyxjQUFjO1NBQzNCLENBQUMsQ0FBQztRQUVILE9BQU8sMkJBQTJCO1lBQ2hDLENBQUMsQ0FBQyxJQUFJLHVDQUF1QyxFQUFFO1lBQy9DLENBQUMsQ0FBQyxJQUFJLHdDQUF3QyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RSxDQUFDOzhHQWZVLHdDQUF3QztrSEFBeEMsd0NBQXdDOzsyRkFBeEMsd0NBQXdDO2tCQURwRCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnJlYWtwb2ludE9ic2VydmVyLCBCcmVha3BvaW50cyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9sYXlvdXQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uL2NvcmUvbWltZS1kb20taGVscGVyJztcbmltcG9ydCB7XG4gIENvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneSxcbiAgRGVza3RvcENvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneSxcbiAgTW9iaWxlQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5LFxufSBmcm9tICcuL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy1jb25maWctc3RyYXRlZ3knO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYnJlYWtwb2ludE9ic2VydmVyOiBCcmVha3BvaW50T2JzZXJ2ZXIsXG4gICAgcHJpdmF0ZSBtaW1lRG9tSGVscGVyOiBNaW1lRG9tSGVscGVyXG4gICkge31cblxuICBwdWJsaWMgY3JlYXRlKCk6IENvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneSB7XG4gICAgY29uc3QgaXNIYW5kc2V0T3JUYWJsZXRJblBvcnRyYWl0ID0gdGhpcy5icmVha3BvaW50T2JzZXJ2ZXIuaXNNYXRjaGVkKFtcbiAgICAgIEJyZWFrcG9pbnRzLkhhbmRzZXQsXG4gICAgICBCcmVha3BvaW50cy5UYWJsZXRQb3J0cmFpdCxcbiAgICBdKTtcblxuICAgIHJldHVybiBpc0hhbmRzZXRPclRhYmxldEluUG9ydHJhaXRcbiAgICAgID8gbmV3IE1vYmlsZUNvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneSgpXG4gICAgICA6IG5ldyBEZXNrdG9wQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5KHRoaXMubWltZURvbUhlbHBlcik7XG4gIH1cbn1cbiJdfQ==