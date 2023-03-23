import { Injectable } from '@angular/core';
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
HelpDialogConfigStrategyFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: HelpDialogConfigStrategyFactory, deps: [{ token: i1.MediaObserver }, { token: i2.MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable });
HelpDialogConfigStrategyFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: HelpDialogConfigStrategyFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: HelpDialogConfigStrategyFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MediaObserver }, { type: i2.MimeDomHelper }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvaGVscC1kaWFsb2cvaGVscC1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQ0wsK0JBQStCLEVBRS9CLDhCQUE4QixHQUMvQixNQUFNLCtCQUErQixDQUFDOzs7O0FBR3ZDLE1BQU0sT0FBTywrQkFBK0I7SUFDMUMsWUFDVSxhQUE0QixFQUM1QixhQUE0QjtRQUQ1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNuQyxDQUFDO0lBRUcsTUFBTTtRQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxJQUFJLDhCQUE4QixFQUFFO1lBQ3RDLENBQUMsQ0FBQyxJQUFJLCtCQUErQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs0SEFWVSwrQkFBK0I7Z0lBQS9CLCtCQUErQjsyRkFBL0IsK0JBQStCO2tCQUQzQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVkaWFPYnNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1pbWVEb21IZWxwZXIgfSBmcm9tICcuLi9jb3JlL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQge1xuICBEZXNrdG9wSGVscERpYWxvZ0NvbmZpZ1N0cmF0ZWd5LFxuICBIZWxwRGlhbG9nQ29uZmlnU3RyYXRlZ3ksXG4gIE1vYmlsZUhlbHBEaWFsb2dDb25maWdTdHJhdGVneSxcbn0gZnJvbSAnLi9oZWxwLWRpYWxvZy1jb25maWctc3RyYXRlZ3knO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGVscERpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbWVkaWFPYnNlcnZlcjogTWVkaWFPYnNlcnZlcixcbiAgICBwcml2YXRlIG1pbWVEb21IZWxwZXI6IE1pbWVEb21IZWxwZXJcbiAgKSB7fVxuXG4gIHB1YmxpYyBjcmVhdGUoKTogSGVscERpYWxvZ0NvbmZpZ1N0cmF0ZWd5IHtcbiAgICByZXR1cm4gdGhpcy5tZWRpYU9ic2VydmVyLmlzQWN0aXZlKCdsdC1tZCcpXG4gICAgICA/IG5ldyBNb2JpbGVIZWxwRGlhbG9nQ29uZmlnU3RyYXRlZ3koKVxuICAgICAgOiBuZXcgRGVza3RvcEhlbHBEaWFsb2dDb25maWdTdHJhdGVneSh0aGlzLm1pbWVEb21IZWxwZXIpO1xuICB9XG59XG4iXX0=