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
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRpb24tZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9hdHRyaWJ1dGlvbi1kaWFsb2cvYXR0cmlidXRpb24tZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFXeEQsTUFBTSxPQUFPLHVCQUF1Qjs7O1lBVG5DLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLFlBQVksRUFBRSxDQUFDLDBCQUEwQixDQUFDO2dCQUMxQyxTQUFTLEVBQUU7b0JBQ1Qsd0JBQXdCO29CQUN4Qiw4QkFBOEI7b0JBQzlCLGFBQWE7aUJBQ2Q7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgQXR0cmlidXRpb25EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2F0dHJpYnV0aW9uLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9hdHRyaWJ1dGlvbi1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkRpYWxvZ1Jlc2l6ZVNlcnZpY2UgfSBmcm9tICcuL2F0dHJpYnV0aW9uLWRpYWxvZy1yZXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBNaW1lRG9tSGVscGVyIH0gZnJvbSAnLi4vY29yZS9taW1lLWRvbS1oZWxwZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQXR0cmlidXRpb25EaWFsb2dDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2UsXG4gICAgQXR0cmlidXRpb25EaWFsb2dSZXNpemVTZXJ2aWNlLFxuICAgIE1pbWVEb21IZWxwZXJcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGlvbkRpYWxvZ01vZHVsZSB7fVxuIl19