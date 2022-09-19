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
ViewDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ViewDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ViewDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ViewDialogModule, declarations: [ViewDialogComponent, IconComponent], imports: [SharedModule] });
ViewDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ViewDialogModule, providers: [
        ViewDialogService,
        ViewDialogConfigStrategyFactory,
        MimeDomHelper,
    ], imports: [[SharedModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ViewDialogModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1kaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL3ZpZXctZGlhbG9nL3ZpZXctZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQVcxRCxNQUFNLE9BQU8sZ0JBQWdCOzs2R0FBaEIsZ0JBQWdCOzhHQUFoQixnQkFBZ0IsaUJBUFosbUJBQW1CLEVBQUUsYUFBYSxhQUR2QyxZQUFZOzhHQVFYLGdCQUFnQixhQU5oQjtRQUNULGlCQUFpQjtRQUNqQiwrQkFBK0I7UUFDL0IsYUFBYTtLQUNkLFlBTlEsQ0FBQyxZQUFZLENBQUM7MkZBUVosZ0JBQWdCO2tCQVQ1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsWUFBWSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxDQUFDO29CQUNsRCxTQUFTLEVBQUU7d0JBQ1QsaUJBQWlCO3dCQUNqQiwrQkFBK0I7d0JBQy9CLGFBQWE7cUJBQ2Q7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uL2NvcmUvbWltZS1kb20taGVscGVyJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IEljb25Db21wb25lbnQgfSBmcm9tICcuL2ljb24vaWNvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeSB9IGZyb20gJy4vdmlldy1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnknO1xuaW1wb3J0IHsgVmlld0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vdmlldy1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi92aWV3LWRpYWxvZy5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1NoYXJlZE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1ZpZXdEaWFsb2dDb21wb25lbnQsIEljb25Db21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBWaWV3RGlhbG9nU2VydmljZSxcbiAgICBWaWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3lGYWN0b3J5LFxuICAgIE1pbWVEb21IZWxwZXIsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFZpZXdEaWFsb2dNb2R1bGUge31cbiJdfQ==