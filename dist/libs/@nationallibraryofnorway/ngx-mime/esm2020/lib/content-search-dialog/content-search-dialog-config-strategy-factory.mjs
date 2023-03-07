import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { DesktopContentSearchDialogConfigStrategy, MobileContentSearchDialogConfigStrategy, } from './content-search-dialog-config-strategy';
import * as i0 from "@angular/core";
import * as i1 from "@angular/flex-layout";
import * as i2 from "../core/mime-dom-helper";
export class ContentSearchDialogConfigStrategyFactory {
    constructor(mediaObserver, mimeDomHelper) {
        this.mediaObserver = mediaObserver;
        this.mimeDomHelper = mimeDomHelper;
    }
    create() {
        return this.mediaObserver.isActive('lt-md')
            ? new MobileContentSearchDialogConfigStrategy()
            : new DesktopContentSearchDialogConfigStrategy(this.mimeDomHelper);
    }
}
ContentSearchDialogConfigStrategyFactory.ɵfac = function ContentSearchDialogConfigStrategyFactory_Factory(t) { return new (t || ContentSearchDialogConfigStrategyFactory)(i0.ɵɵinject(i1.MediaObserver), i0.ɵɵinject(i2.MimeDomHelper)); };
ContentSearchDialogConfigStrategyFactory.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ContentSearchDialogConfigStrategyFactory, factory: ContentSearchDialogConfigStrategyFactory.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContentSearchDialogConfigStrategyFactory, [{
        type: Injectable
    }], function () { return [{ type: i1.MediaObserver }, { type: i2.MimeDomHelper }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy9jb250ZW50LXNlYXJjaC1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFFTCx3Q0FBd0MsRUFDeEMsdUNBQXVDLEdBQ3hDLE1BQU0seUNBQXlDLENBQUM7Ozs7QUFHakQsTUFBTSxPQUFPLHdDQUF3QztJQUNuRCxZQUNVLGFBQTRCLEVBQzVCLGFBQTRCO1FBRDVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ25DLENBQUM7SUFFRyxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDekMsQ0FBQyxDQUFDLElBQUksdUNBQXVDLEVBQUU7WUFDL0MsQ0FBQyxDQUFDLElBQUksd0NBQXdDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7O2dJQVZVLHdDQUF3Qzs4RkFBeEMsd0NBQXdDLFdBQXhDLHdDQUF3Qzt1RkFBeEMsd0NBQXdDO2NBRHBELFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZWRpYU9ic2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uL2NvcmUvbWltZS1kb20taGVscGVyJztcbmltcG9ydCB7XG4gIENvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneSxcbiAgRGVza3RvcENvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneSxcbiAgTW9iaWxlQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5LFxufSBmcm9tICcuL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy1jb25maWctc3RyYXRlZ3knO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbWVkaWFPYnNlcnZlcjogTWVkaWFPYnNlcnZlcixcbiAgICBwcml2YXRlIG1pbWVEb21IZWxwZXI6IE1pbWVEb21IZWxwZXJcbiAgKSB7fVxuXG4gIHB1YmxpYyBjcmVhdGUoKTogQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5IHtcbiAgICByZXR1cm4gdGhpcy5tZWRpYU9ic2VydmVyLmlzQWN0aXZlKCdsdC1tZCcpXG4gICAgICA/IG5ldyBNb2JpbGVDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3koKVxuICAgICAgOiBuZXcgRGVza3RvcENvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneSh0aGlzLm1pbWVEb21IZWxwZXIpO1xuICB9XG59XG4iXX0=