import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { AttributionDialogComponent } from './attribution-dialog.component';
import { AttributionDialogService } from './attribution-dialog.service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { MimeDomHelper } from '../core/mime-dom-helper';
export class AttributionDialogModule {
}
AttributionDialogModule.decorators = [
    { type: NgModule, args: [{
                imports: [SharedModule],
                declarations: [AttributionDialogComponent],
                providers: [
                    AttributionDialogService,
                    AttributionDialogResizeService,
                    MimeDomHelper
                ],
                entryComponents: [AttributionDialogComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRpb24tZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9yb25ueW0vVGVtcC9uZ3gtbWltZS9saWJzL25neC1taW1lL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9hdHRyaWJ1dGlvbi1kaWFsb2cvYXR0cmlidXRpb24tZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFZeEQsTUFBTSxPQUFPLHVCQUF1Qjs7O1lBVm5DLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLFlBQVksRUFBRSxDQUFDLDBCQUEwQixDQUFDO2dCQUMxQyxTQUFTLEVBQUU7b0JBQ1Qsd0JBQXdCO29CQUN4Qiw4QkFBOEI7b0JBQzlCLGFBQWE7aUJBQ2Q7Z0JBQ0QsZUFBZSxFQUFFLENBQUMsMEJBQTBCLENBQUM7YUFDOUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IEF0dHJpYnV0aW9uRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9hdHRyaWJ1dGlvbi1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEF0dHJpYnV0aW9uRGlhbG9nU2VydmljZSB9IGZyb20gJy4vYXR0cmlidXRpb24tZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXR0cmlidXRpb25EaWFsb2dSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi9hdHRyaWJ1dGlvbi1kaWFsb2ctcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uL2NvcmUvbWltZS1kb20taGVscGVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1NoYXJlZE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0F0dHJpYnV0aW9uRGlhbG9nQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlLFxuICAgIEF0dHJpYnV0aW9uRGlhbG9nUmVzaXplU2VydmljZSxcbiAgICBNaW1lRG9tSGVscGVyXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW0F0dHJpYnV0aW9uRGlhbG9nQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGlvbkRpYWxvZ01vZHVsZSB7fVxuIl19