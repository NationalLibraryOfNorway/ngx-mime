import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { DesktopHelpDialogConfigStrategy, MobileHelpDialogConfigStrategy, } from './help-dialog-config-strategy';
import * as i0 from "@angular/core";
import * as i1 from "@angular/flex-layout";
import * as i2 from "../core/mime-dom-helper";
export class HelpDialogConfigStrategyFactory {
    constructor(mediaObserver, mimeDomHelper) {
        this.mediaObserver = mediaObserver;
        this.mimeDomHelper = mimeDomHelper;
    }
    create() {
        return this.mediaObserver.isActive('lt-md')
            ? new MobileHelpDialogConfigStrategy()
            : new DesktopHelpDialogConfigStrategy(this.mimeDomHelper);
    }
}
HelpDialogConfigStrategyFactory.ɵfac = function HelpDialogConfigStrategyFactory_Factory(t) { return new (t || HelpDialogConfigStrategyFactory)(i0.ɵɵinject(i1.MediaObserver), i0.ɵɵinject(i2.MimeDomHelper)); };
HelpDialogConfigStrategyFactory.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: HelpDialogConfigStrategyFactory, factory: HelpDialogConfigStrategyFactory.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HelpDialogConfigStrategyFactory, [{
        type: Injectable
    }], function () { return [{ type: i1.MediaObserver }, { type: i2.MimeDomHelper }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvaGVscC1kaWFsb2cvaGVscC1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFDTCwrQkFBK0IsRUFFL0IsOEJBQThCLEdBQy9CLE1BQU0sK0JBQStCLENBQUM7Ozs7QUFHdkMsTUFBTSxPQUFPLCtCQUErQjtJQUMxQyxZQUNVLGFBQTRCLEVBQzVCLGFBQTRCO1FBRDVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ25DLENBQUM7SUFFRyxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDekMsQ0FBQyxDQUFDLElBQUksOEJBQThCLEVBQUU7WUFDdEMsQ0FBQyxDQUFDLElBQUksK0JBQStCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzlELENBQUM7OzhHQVZVLCtCQUErQjtxRkFBL0IsK0JBQStCLFdBQS9CLCtCQUErQjt1RkFBL0IsK0JBQStCO2NBRDNDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZWRpYU9ic2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uL2NvcmUvbWltZS1kb20taGVscGVyJztcbmltcG9ydCB7XG4gIERlc2t0b3BIZWxwRGlhbG9nQ29uZmlnU3RyYXRlZ3ksXG4gIEhlbHBEaWFsb2dDb25maWdTdHJhdGVneSxcbiAgTW9iaWxlSGVscERpYWxvZ0NvbmZpZ1N0cmF0ZWd5LFxufSBmcm9tICcuL2hlbHAtZGlhbG9nLWNvbmZpZy1zdHJhdGVneSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIZWxwRGlhbG9nQ29uZmlnU3RyYXRlZ3lGYWN0b3J5IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBtZWRpYU9ic2VydmVyOiBNZWRpYU9ic2VydmVyLFxuICAgIHByaXZhdGUgbWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlclxuICApIHt9XG5cbiAgcHVibGljIGNyZWF0ZSgpOiBIZWxwRGlhbG9nQ29uZmlnU3RyYXRlZ3kge1xuICAgIHJldHVybiB0aGlzLm1lZGlhT2JzZXJ2ZXIuaXNBY3RpdmUoJ2x0LW1kJylcbiAgICAgID8gbmV3IE1vYmlsZUhlbHBEaWFsb2dDb25maWdTdHJhdGVneSgpXG4gICAgICA6IG5ldyBEZXNrdG9wSGVscERpYWxvZ0NvbmZpZ1N0cmF0ZWd5KHRoaXMubWltZURvbUhlbHBlcik7XG4gIH1cbn1cbiJdfQ==