import { NgModule } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { SharedModule } from '../shared/shared.module';
import { IconComponent } from './icon/icon.component';
import { ViewDialogConfigStrategyFactory } from './view-dialog-config-strategy-factory';
import { ViewDialogComponent } from './view-dialog.component';
import { ViewDialogService } from './view-dialog.service';
import * as i0 from "@angular/core";
export class ViewDialogModule {
}
ViewDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: ViewDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ViewDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.2", ngImport: i0, type: ViewDialogModule, declarations: [ViewDialogComponent, IconComponent], imports: [SharedModule] });
ViewDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: ViewDialogModule, providers: [
        ViewDialogService,
        ViewDialogConfigStrategyFactory,
        MimeDomHelper,
    ], imports: [SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: ViewDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [SharedModule],
                    declarations: [ViewDialogComponent, IconComponent],
                    providers: [
                        ViewDialogService,
                        ViewDialogConfigStrategyFactory,
                        MimeDomHelper,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1kaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL3ZpZXctZGlhbG9nL3ZpZXctZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQVcxRCxNQUFNLE9BQU8sZ0JBQWdCOzs2R0FBaEIsZ0JBQWdCOzhHQUFoQixnQkFBZ0IsaUJBUFosbUJBQW1CLEVBQUUsYUFBYSxhQUR2QyxZQUFZOzhHQVFYLGdCQUFnQixhQU5oQjtRQUNULGlCQUFpQjtRQUNqQiwrQkFBK0I7UUFDL0IsYUFBYTtLQUNkLFlBTlMsWUFBWTsyRkFRWCxnQkFBZ0I7a0JBVDVCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLENBQUM7b0JBQ2xELFNBQVMsRUFBRTt3QkFDVCxpQkFBaUI7d0JBQ2pCLCtCQUErQjt3QkFDL0IsYUFBYTtxQkFDZDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNaW1lRG9tSGVscGVyIH0gZnJvbSAnLi4vY29yZS9taW1lLWRvbS1oZWxwZXInO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vaWNvbi9pY29uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3lGYWN0b3J5IH0gZnJvbSAnLi92aWV3LWRpYWxvZy1jb25maWctc3RyYXRlZ3ktZmFjdG9yeSc7XG5pbXBvcnQgeyBWaWV3RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld0RpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL3ZpZXctZGlhbG9nLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbVmlld0RpYWxvZ0NvbXBvbmVudCwgSWNvbkNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFZpZXdEaWFsb2dTZXJ2aWNlLFxuICAgIFZpZXdEaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnksXG4gICAgTWltZURvbUhlbHBlcixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVmlld0RpYWxvZ01vZHVsZSB7fVxuIl19