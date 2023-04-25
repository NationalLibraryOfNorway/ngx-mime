import { Injectable } from '@angular/core';
import { DesktopInformationDialogConfigStrategy, MobileInformationDialogConfigStrategy, } from './information-dialog-config-strategy';
import * as i0 from "@angular/core";
import * as i1 from "@angular/flex-layout";
import * as i2 from "../core/mime-dom-helper";
export class InformationDialogConfigStrategyFactory {
    constructor(mediaObserver, mimeDomHelper) {
        this.mediaObserver = mediaObserver;
        this.mimeDomHelper = mimeDomHelper;
    }
    create() {
        return this.mediaObserver.isActive('lt-md')
            ? new MobileInformationDialogConfigStrategy()
            : new DesktopInformationDialogConfigStrategy(this.mimeDomHelper);
    }
}
InformationDialogConfigStrategyFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: InformationDialogConfigStrategyFactory, deps: [{ token: i1.MediaObserver }, { token: i2.MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable });
InformationDialogConfigStrategyFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: InformationDialogConfigStrategyFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: InformationDialogConfigStrategyFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MediaObserver }, { type: i2.MimeDomHelper }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tZGlhbG9nLWNvbmZpZy1zdHJhdGVneS1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2luZm9ybWF0aW9uLWRpYWxvZy9pbmZvcm1hdGlvbi1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQ0wsc0NBQXNDLEVBRXRDLHFDQUFxQyxHQUN0QyxNQUFNLHNDQUFzQyxDQUFDOzs7O0FBRzlDLE1BQU0sT0FBTyxzQ0FBc0M7SUFDakQsWUFDVSxhQUE0QixFQUM1QixhQUE0QjtRQUQ1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNuQyxDQUFDO0lBRUcsTUFBTTtRQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxJQUFJLHFDQUFxQyxFQUFFO1lBQzdDLENBQUMsQ0FBQyxJQUFJLHNDQUFzQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyRSxDQUFDOzttSUFWVSxzQ0FBc0M7dUlBQXRDLHNDQUFzQzsyRkFBdEMsc0NBQXNDO2tCQURsRCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVkaWFPYnNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1pbWVEb21IZWxwZXIgfSBmcm9tICcuLi9jb3JlL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQge1xuICBEZXNrdG9wSW5mb3JtYXRpb25EaWFsb2dDb25maWdTdHJhdGVneSxcbiAgSW5mb3JtYXRpb25EaWFsb2dDb25maWdTdHJhdGVneSxcbiAgTW9iaWxlSW5mb3JtYXRpb25EaWFsb2dDb25maWdTdHJhdGVneSxcbn0gZnJvbSAnLi9pbmZvcm1hdGlvbi1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEluZm9ybWF0aW9uRGlhbG9nQ29uZmlnU3RyYXRlZ3lGYWN0b3J5IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBtZWRpYU9ic2VydmVyOiBNZWRpYU9ic2VydmVyLFxuICAgIHByaXZhdGUgbWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlclxuICApIHt9XG5cbiAgcHVibGljIGNyZWF0ZSgpOiBJbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5IHtcbiAgICByZXR1cm4gdGhpcy5tZWRpYU9ic2VydmVyLmlzQWN0aXZlKCdsdC1tZCcpXG4gICAgICA/IG5ldyBNb2JpbGVJbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5KClcbiAgICAgIDogbmV3IERlc2t0b3BJbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5KHRoaXMubWltZURvbUhlbHBlcik7XG4gIH1cbn1cbiJdfQ==