import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { AttributionDialogComponent } from './attribution-dialog.component';
import { AttributionDialogService } from './attribution-dialog.service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { MimeDomHelper } from '../core/mime-dom-helper';
import * as i0 from "@angular/core";
export class AttributionDialogModule {
}
AttributionDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: AttributionDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AttributionDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: AttributionDialogModule, declarations: [AttributionDialogComponent], imports: [SharedModule] });
AttributionDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: AttributionDialogModule, providers: [
        AttributionDialogService,
        AttributionDialogResizeService,
        MimeDomHelper,
    ], imports: [[SharedModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: AttributionDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [SharedModule],
                    declarations: [AttributionDialogComponent],
                    providers: [
                        AttributionDialogService,
                        AttributionDialogResizeService,
                        MimeDomHelper,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRpb24tZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9hdHRyaWJ1dGlvbi1kaWFsb2cvYXR0cmlidXRpb24tZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBV3hELE1BQU0sT0FBTyx1QkFBdUI7O29IQUF2Qix1QkFBdUI7cUhBQXZCLHVCQUF1QixpQkFQbkIsMEJBQTBCLGFBRC9CLFlBQVk7cUhBUVgsdUJBQXVCLGFBTnZCO1FBQ1Qsd0JBQXdCO1FBQ3hCLDhCQUE4QjtRQUM5QixhQUFhO0tBQ2QsWUFOUSxDQUFDLFlBQVksQ0FBQzsyRkFRWix1QkFBdUI7a0JBVG5DLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztvQkFDMUMsU0FBUyxFQUFFO3dCQUNULHdCQUF3Qjt3QkFDeEIsOEJBQThCO3dCQUM5QixhQUFhO3FCQUNkO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vYXR0cmlidXRpb24tZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL2F0dHJpYnV0aW9uLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IEF0dHJpYnV0aW9uRGlhbG9nUmVzaXplU2VydmljZSB9IGZyb20gJy4vYXR0cmlidXRpb24tZGlhbG9nLXJlc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVEb21IZWxwZXIgfSBmcm9tICcuLi9jb3JlL21pbWUtZG9tLWhlbHBlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtTaGFyZWRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtBdHRyaWJ1dGlvbkRpYWxvZ0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEF0dHJpYnV0aW9uRGlhbG9nU2VydmljZSxcbiAgICBBdHRyaWJ1dGlvbkRpYWxvZ1Jlc2l6ZVNlcnZpY2UsXG4gICAgTWltZURvbUhlbHBlcixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQXR0cmlidXRpb25EaWFsb2dNb2R1bGUge31cbiJdfQ==