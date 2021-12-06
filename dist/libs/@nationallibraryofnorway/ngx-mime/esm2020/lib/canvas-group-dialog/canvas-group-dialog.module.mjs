import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { CanvasGroupDialogComponent } from './canvas-group-dialog.component';
import { CanvasGroupDialogService } from './canvas-group-dialog.service';
import * as i0 from "@angular/core";
export class CanvasGroupDialogModule {
}
CanvasGroupDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: CanvasGroupDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CanvasGroupDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: CanvasGroupDialogModule, declarations: [CanvasGroupDialogComponent], imports: [SharedModule] });
CanvasGroupDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: CanvasGroupDialogModule, providers: [CanvasGroupDialogService], imports: [[SharedModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: CanvasGroupDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [SharedModule],
                    declarations: [CanvasGroupDialogComponent],
                    providers: [CanvasGroupDialogService]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLWdyb3VwLWRpYWxvZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY2FudmFzLWdyb3VwLWRpYWxvZy9jYW52YXMtZ3JvdXAtZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7QUFRekUsTUFBTSxPQUFPLHVCQUF1Qjs7b0hBQXZCLHVCQUF1QjtxSEFBdkIsdUJBQXVCLGlCQUhuQiwwQkFBMEIsYUFEL0IsWUFBWTtxSEFJWCx1QkFBdUIsYUFGdkIsQ0FBQyx3QkFBd0IsQ0FBQyxZQUY1QixDQUFDLFlBQVksQ0FBQzsyRkFJWix1QkFBdUI7a0JBTG5DLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztvQkFDMUMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7aUJBQ3RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBDYW52YXNHcm91cERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY2FudmFzLWdyb3VwLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9jYW52YXMtZ3JvdXAtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uL2NvcmUvbWltZS1kb20taGVscGVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1NoYXJlZE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0NhbnZhc0dyb3VwRGlhbG9nQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbQ2FudmFzR3JvdXBEaWFsb2dTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBDYW52YXNHcm91cERpYWxvZ01vZHVsZSB7fVxuIl19