import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HelpDialogComponent } from './help-dialog.component';
import { HelpDialogService } from './help-dialog.service';
import { HelpDialogConfigStrategyFactory } from './help-dialog-config-strategy-factory';
import * as i0 from "@angular/core";
export class HelpDialogModule {
}
HelpDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: HelpDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
HelpDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: HelpDialogModule, declarations: [HelpDialogComponent], imports: [SharedModule] });
HelpDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: HelpDialogModule, providers: [
        HelpDialogService,
        HelpDialogConfigStrategyFactory
    ], imports: [[SharedModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: HelpDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [SharedModule],
                    declarations: [HelpDialogComponent],
                    providers: [
                        HelpDialogService,
                        HelpDialogConfigStrategyFactory
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1kaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2hlbHAtZGlhbG9nL2hlbHAtZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFVeEYsTUFBTSxPQUFPLGdCQUFnQjs7NkdBQWhCLGdCQUFnQjs4R0FBaEIsZ0JBQWdCLGlCQU5aLG1CQUFtQixhQUR4QixZQUFZOzhHQU9YLGdCQUFnQixhQUxoQjtRQUNULGlCQUFpQjtRQUNqQiwrQkFBK0I7S0FDaEMsWUFMUSxDQUFDLFlBQVksQ0FBQzsyRkFPWixnQkFBZ0I7a0JBUjVCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDbkMsU0FBUyxFQUFFO3dCQUNULGlCQUFpQjt3QkFDakIsK0JBQStCO3FCQUNoQztpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBIZWxwRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9oZWxwLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGVscERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL2hlbHAtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscERpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeSB9IGZyb20gJy4vaGVscC1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnknO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbSGVscERpYWxvZ0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEhlbHBEaWFsb2dTZXJ2aWNlLFxuICAgIEhlbHBEaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxwRGlhbG9nTW9kdWxlIHt9XG4iXX0=