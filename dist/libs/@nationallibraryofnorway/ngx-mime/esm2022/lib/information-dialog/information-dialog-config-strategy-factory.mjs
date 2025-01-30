import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { DesktopInformationDialogConfigStrategy, MobileInformationDialogConfigStrategy, } from './information-dialog-config-strategy';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/layout";
import * as i2 from "../core/mime-dom-helper";
export class InformationDialogConfigStrategyFactory {
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
            ? new MobileInformationDialogConfigStrategy()
            : new DesktopInformationDialogConfigStrategy(this.mimeDomHelper);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: InformationDialogConfigStrategyFactory, deps: [{ token: i1.BreakpointObserver }, { token: i2.MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: InformationDialogConfigStrategyFactory }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: InformationDialogConfigStrategyFactory, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.BreakpointObserver }, { type: i2.MimeDomHelper }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tZGlhbG9nLWNvbmZpZy1zdHJhdGVneS1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2luZm9ybWF0aW9uLWRpYWxvZy9pbmZvcm1hdGlvbi1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFDTCxzQ0FBc0MsRUFFdEMscUNBQXFDLEdBQ3RDLE1BQU0sc0NBQXNDLENBQUM7Ozs7QUFHOUMsTUFBTSxPQUFPLHNDQUFzQztJQUNqRCxZQUNVLGtCQUFzQyxFQUN0QyxhQUE0QjtRQUQ1Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ25DLENBQUM7SUFFRyxNQUFNO1FBQ1gsTUFBTSwyQkFBMkIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDO1lBQ3BFLFdBQVcsQ0FBQyxPQUFPO1lBQ25CLFdBQVcsQ0FBQyxjQUFjO1NBQzNCLENBQUMsQ0FBQztRQUVILE9BQU8sMkJBQTJCO1lBQ2hDLENBQUMsQ0FBQyxJQUFJLHFDQUFxQyxFQUFFO1lBQzdDLENBQUMsQ0FBQyxJQUFJLHNDQUFzQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyRSxDQUFDOzhHQWZVLHNDQUFzQztrSEFBdEMsc0NBQXNDOzsyRkFBdEMsc0NBQXNDO2tCQURsRCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnJlYWtwb2ludE9ic2VydmVyLCBCcmVha3BvaW50cyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9sYXlvdXQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uL2NvcmUvbWltZS1kb20taGVscGVyJztcbmltcG9ydCB7XG4gIERlc2t0b3BJbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5LFxuICBJbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5LFxuICBNb2JpbGVJbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5LFxufSBmcm9tICcuL2luZm9ybWF0aW9uLWRpYWxvZy1jb25maWctc3RyYXRlZ3knO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW5mb3JtYXRpb25EaWFsb2dDb25maWdTdHJhdGVneUZhY3Rvcnkge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGJyZWFrcG9pbnRPYnNlcnZlcjogQnJlYWtwb2ludE9ic2VydmVyLFxuICAgIHByaXZhdGUgbWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlcixcbiAgKSB7fVxuXG4gIHB1YmxpYyBjcmVhdGUoKTogSW5mb3JtYXRpb25EaWFsb2dDb25maWdTdHJhdGVneSB7XG4gICAgY29uc3QgaXNIYW5kc2V0T3JUYWJsZXRJblBvcnRyYWl0ID0gdGhpcy5icmVha3BvaW50T2JzZXJ2ZXIuaXNNYXRjaGVkKFtcbiAgICAgIEJyZWFrcG9pbnRzLkhhbmRzZXQsXG4gICAgICBCcmVha3BvaW50cy5UYWJsZXRQb3J0cmFpdCxcbiAgICBdKTtcblxuICAgIHJldHVybiBpc0hhbmRzZXRPclRhYmxldEluUG9ydHJhaXRcbiAgICAgID8gbmV3IE1vYmlsZUluZm9ybWF0aW9uRGlhbG9nQ29uZmlnU3RyYXRlZ3koKVxuICAgICAgOiBuZXcgRGVza3RvcEluZm9ybWF0aW9uRGlhbG9nQ29uZmlnU3RyYXRlZ3kodGhpcy5taW1lRG9tSGVscGVyKTtcbiAgfVxufVxuIl19