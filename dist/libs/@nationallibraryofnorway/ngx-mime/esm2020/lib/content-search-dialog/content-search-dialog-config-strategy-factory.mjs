import { Injectable } from '@angular/core';
import { DesktopContentSearchDialogConfigStrategy, MobileContentSearchDialogConfigStrategy } from './content-search-dialog-config-strategy';
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
ContentSearchDialogConfigStrategyFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: ContentSearchDialogConfigStrategyFactory, deps: [{ token: i1.MediaObserver }, { token: i2.MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable });
ContentSearchDialogConfigStrategyFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: ContentSearchDialogConfigStrategyFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: ContentSearchDialogConfigStrategyFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MediaObserver }, { type: i2.MimeDomHelper }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy9jb250ZW50LXNlYXJjaC1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBRUwsd0NBQXdDLEVBQ3hDLHVDQUF1QyxFQUN4QyxNQUFNLHlDQUF5QyxDQUFDOzs7O0FBR2pELE1BQU0sT0FBTyx3Q0FBd0M7SUFDbkQsWUFDVSxhQUE0QixFQUM1QixhQUE0QjtRQUQ1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNuQyxDQUFDO0lBRUcsTUFBTTtRQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxJQUFJLHVDQUF1QyxFQUFFO1lBQy9DLENBQUMsQ0FBQyxJQUFJLHdDQUF3QyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RSxDQUFDOztxSUFWVSx3Q0FBd0M7eUlBQXhDLHdDQUF3QzsyRkFBeEMsd0NBQXdDO2tCQURwRCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVkaWFPYnNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1pbWVEb21IZWxwZXIgfSBmcm9tICcuLi9jb3JlL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQge1xuICBDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3ksXG4gIERlc2t0b3BDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3ksXG4gIE1vYmlsZUNvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneVxufSBmcm9tICcuL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy1jb25maWctc3RyYXRlZ3knO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbWVkaWFPYnNlcnZlcjogTWVkaWFPYnNlcnZlcixcbiAgICBwcml2YXRlIG1pbWVEb21IZWxwZXI6IE1pbWVEb21IZWxwZXJcbiAgKSB7fVxuXG4gIHB1YmxpYyBjcmVhdGUoKTogQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5IHtcbiAgICByZXR1cm4gdGhpcy5tZWRpYU9ic2VydmVyLmlzQWN0aXZlKCdsdC1tZCcpXG4gICAgICA/IG5ldyBNb2JpbGVDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3koKVxuICAgICAgOiBuZXcgRGVza3RvcENvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneSh0aGlzLm1pbWVEb21IZWxwZXIpO1xuICB9XG59XG4iXX0=