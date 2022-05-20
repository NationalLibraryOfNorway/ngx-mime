import { Injectable } from '@angular/core';
import { DesktopViewDialogConfigStrategy, MobileViewDialogConfigStrategy, } from './view-dialog-config-strategy';
import * as i0 from "@angular/core";
import * as i1 from "@angular/flex-layout";
import * as i2 from "../core/mime-dom-helper";
export class ViewDialogConfigStrategyFactory {
    constructor(mediaObserver, mimeDomHelper) {
        this.mediaObserver = mediaObserver;
        this.mimeDomHelper = mimeDomHelper;
    }
    create() {
        return this.mediaObserver.isActive('lt-md')
            ? new MobileViewDialogConfigStrategy()
            : new DesktopViewDialogConfigStrategy(this.mimeDomHelper);
    }
}
ViewDialogConfigStrategyFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ViewDialogConfigStrategyFactory, deps: [{ token: i1.MediaObserver }, { token: i2.MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable });
ViewDialogConfigStrategyFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ViewDialogConfigStrategyFactory, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ViewDialogConfigStrategyFactory, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.MediaObserver }, { type: i2.MimeDomHelper }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlldy1kaWFsb2cvdmlldy1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQ0wsK0JBQStCLEVBQy9CLDhCQUE4QixHQUUvQixNQUFNLCtCQUErQixDQUFDOzs7O0FBS3ZDLE1BQU0sT0FBTywrQkFBK0I7SUFDMUMsWUFDVSxhQUE0QixFQUM1QixhQUE0QjtRQUQ1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNuQyxDQUFDO0lBRUcsTUFBTTtRQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxJQUFJLDhCQUE4QixFQUFFO1lBQ3RDLENBQUMsQ0FBQyxJQUFJLCtCQUErQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs0SEFWVSwrQkFBK0I7Z0lBQS9CLCtCQUErQixjQUY5QixNQUFNOzJGQUVQLCtCQUErQjtrQkFIM0MsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZWRpYU9ic2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uL2NvcmUvbWltZS1kb20taGVscGVyJztcbmltcG9ydCB7XG4gIERlc2t0b3BWaWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3ksXG4gIE1vYmlsZVZpZXdEaWFsb2dDb25maWdTdHJhdGVneSxcbiAgVmlld0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5LFxufSBmcm9tICcuL3ZpZXctZGlhbG9nLWNvbmZpZy1zdHJhdGVneSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBWaWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3lGYWN0b3J5IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBtZWRpYU9ic2VydmVyOiBNZWRpYU9ic2VydmVyLFxuICAgIHByaXZhdGUgbWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlclxuICApIHt9XG5cbiAgcHVibGljIGNyZWF0ZSgpOiBWaWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3kge1xuICAgIHJldHVybiB0aGlzLm1lZGlhT2JzZXJ2ZXIuaXNBY3RpdmUoJ2x0LW1kJylcbiAgICAgID8gbmV3IE1vYmlsZVZpZXdEaWFsb2dDb25maWdTdHJhdGVneSgpXG4gICAgICA6IG5ldyBEZXNrdG9wVmlld0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5KHRoaXMubWltZURvbUhlbHBlcik7XG4gIH1cbn1cbiJdfQ==