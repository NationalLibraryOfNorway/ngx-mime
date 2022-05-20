import { Injectable } from '@angular/core';
import { DesktopContentsDialogConfigStrategy, MobileContentsDialogConfigStrategy, } from './contents-dialog-config-strategy';
import * as i0 from "@angular/core";
import * as i1 from "@angular/flex-layout";
import * as i2 from "../core/mime-dom-helper";
export class ContentsDialogConfigStrategyFactory {
    constructor(mediaObserver, mimeDomHelper) {
        this.mediaObserver = mediaObserver;
        this.mimeDomHelper = mimeDomHelper;
    }
    create() {
        return this.mediaObserver.isActive('lt-md')
            ? new MobileContentsDialogConfigStrategy()
            : new DesktopContentsDialogConfigStrategy(this.mimeDomHelper);
    }
}
ContentsDialogConfigStrategyFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentsDialogConfigStrategyFactory, deps: [{ token: i1.MediaObserver }, { token: i2.MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable });
ContentsDialogConfigStrategyFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentsDialogConfigStrategyFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentsDialogConfigStrategyFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MediaObserver }, { type: i2.MimeDomHelper }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudHMtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvbnRlbnRzLWRpYWxvZy9jb250ZW50cy1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBRUwsbUNBQW1DLEVBQ25DLGtDQUFrQyxHQUNuQyxNQUFNLG1DQUFtQyxDQUFDOzs7O0FBRzNDLE1BQU0sT0FBTyxtQ0FBbUM7SUFDOUMsWUFDVSxhQUE0QixFQUM1QixhQUE0QjtRQUQ1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNuQyxDQUFDO0lBRUcsTUFBTTtRQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxJQUFJLGtDQUFrQyxFQUFFO1lBQzFDLENBQUMsQ0FBQyxJQUFJLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNsRSxDQUFDOztnSUFWVSxtQ0FBbUM7b0lBQW5DLG1DQUFtQzsyRkFBbkMsbUNBQW1DO2tCQUQvQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVkaWFPYnNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1pbWVEb21IZWxwZXIgfSBmcm9tICcuLi9jb3JlL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQge1xuICBDb250ZW50c0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5LFxuICBEZXNrdG9wQ29udGVudHNEaWFsb2dDb25maWdTdHJhdGVneSxcbiAgTW9iaWxlQ29udGVudHNEaWFsb2dDb25maWdTdHJhdGVneSxcbn0gZnJvbSAnLi9jb250ZW50cy1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbnRlbnRzRGlhbG9nQ29uZmlnU3RyYXRlZ3lGYWN0b3J5IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBtZWRpYU9ic2VydmVyOiBNZWRpYU9ic2VydmVyLFxuICAgIHByaXZhdGUgbWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlclxuICApIHt9XG5cbiAgcHVibGljIGNyZWF0ZSgpOiBDb250ZW50c0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5IHtcbiAgICByZXR1cm4gdGhpcy5tZWRpYU9ic2VydmVyLmlzQWN0aXZlKCdsdC1tZCcpXG4gICAgICA/IG5ldyBNb2JpbGVDb250ZW50c0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5KClcbiAgICAgIDogbmV3IERlc2t0b3BDb250ZW50c0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5KHRoaXMubWltZURvbUhlbHBlcik7XG4gIH1cbn1cbiJdfQ==