import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HelpDialogComponent } from './help-dialog.component';
import { HelpDialogService } from './help-dialog.service';
import { HelpDialogConfigStrategyFactory } from './help-dialog-config-strategy-factory';
import * as i0 from "@angular/core";
export class HelpDialogModule {
}
HelpDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: HelpDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
HelpDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: HelpDialogModule, declarations: [HelpDialogComponent], imports: [SharedModule] });
HelpDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: HelpDialogModule, providers: [HelpDialogService, HelpDialogConfigStrategyFactory], imports: [[SharedModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: HelpDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [SharedModule],
                    declarations: [HelpDialogComponent],
                    providers: [HelpDialogService, HelpDialogConfigStrategyFactory],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1kaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2hlbHAtZGlhbG9nL2hlbHAtZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFPeEYsTUFBTSxPQUFPLGdCQUFnQjs7NkdBQWhCLGdCQUFnQjs4R0FBaEIsZ0JBQWdCLGlCQUhaLG1CQUFtQixhQUR4QixZQUFZOzhHQUlYLGdCQUFnQixhQUZoQixDQUFDLGlCQUFpQixFQUFFLCtCQUErQixDQUFDLFlBRnRELENBQUMsWUFBWSxDQUFDOzJGQUlaLGdCQUFnQjtrQkFMNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDO29CQUNuQyxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSwrQkFBK0IsQ0FBQztpQkFDaEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgSGVscERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vaGVscC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEhlbHBEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IEhlbHBEaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnkgfSBmcm9tICcuL2hlbHAtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS1mYWN0b3J5JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1NoYXJlZE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0hlbHBEaWFsb2dDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtIZWxwRGlhbG9nU2VydmljZSwgSGVscERpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeV0sXG59KVxuZXhwb3J0IGNsYXNzIEhlbHBEaWFsb2dNb2R1bGUge31cbiJdfQ==