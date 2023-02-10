import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function IconComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 2);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 3)(3, "style", 4);
    i0.ɵɵtext(4, " .st0 { clip-path: url(#SVGID_2_); } ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "g")(6, "defs");
    i0.ɵɵelement(7, "rect", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "clipPath", 6);
    i0.ɵɵelement(9, "use", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(10, "path", 8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} }
function IconComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 9)(2, "style", 4);
    i0.ɵɵtext(3, " .st0 { clip-path: url(#SVGID_2_); } ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "g")(5, "defs");
    i0.ɵɵelement(6, "rect", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "clipPath", 11);
    i0.ɵɵelement(8, "use", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "path", 13)(10, "path", 14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} }
export class IconComponent {
    constructor() {
        this.iconName = '';
    }
}
IconComponent.ɵfac = function IconComponent_Factory(t) { return new (t || IconComponent)(); };
IconComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IconComponent, selectors: [["mime-icon"]], inputs: { iconName: "iconName" }, decls: 3, vars: 2, consts: [[1, "mat-icon"], [4, "ngIf"], [1, "single-page-display"], ["version", "1.1", "id", "Layer_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "viewBox", "0 0 90 90", "preserveAspectRatio", "xMidYMin slice"], ["type", "text/css"], ["id", "SVGID_1_", "width", "100%", "height", "100%"], ["id", "SVGID_2_"], [0, "xlink", "href", "#SVGID_1_", 2, "overflow", "visible"], ["d", "M21.7,25.2H8.3v2.7h13.4V25.2z M21.7,18.1H8.3v2.7h13.4V18.1z M26.1,31.8H4V4.1h13.6v8.4h8.5V31.8z M30,31.6\n          V11.4L18.7,0H4.3C4.3,0,0,0,0,4.3v27.4c0,0,0,4.3,4.3,4.3h21.5C25.8,35.9,30,35.9,30,31.6", 1, "st0"], ["version", "1.1", "id", "Layer_2", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "viewBox", "0 0 90 90", "preserveAspectRatio", "xMidYMin slice"], ["id", "SVGID_3_", "width", "100%", "height", "100%"], ["id", "SVGID_4_"], [0, "xlink", "href", "#SVGID_3_", 2, "overflow", "visible"], ["d", "M52.5,25.2H39.1v2.7h13.4V25.2z M52.5,18.1H39.1v2.7h13.4V18.1z M56.8,31.8H34.7V4.1h13.6v8.4h8.5V31.8z\n        M60.8,31.6V11.4L49.4,0H35c0,0-4.3,0-4.3,4.3v27.4c0,0,0,4.3,4.3,4.3h21.5C56.6,35.9,60.8,35.9,60.8,31.6", 1, "st0"], ["d", "M21.7,25.2H8.3v2.7h13.4V25.2z M21.7,18.1H8.3v2.7h13.4V18.1z M21.7,11.1H8.3v2.7h13.4V11.1z M26.1,31.8H4V4.1\n       h22.1V31.8z M30,31.6V4.3c0,0,0-4.3-4.3-4.3H4.3C4.3,0,0,0,0,4.3v27.4c0,0,0,4.3,4.3,4.3h21.5C25.8,35.9,30,35.9,30,31.6", 1, "st0"]], template: function IconComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, IconComponent_ng_container_1_Template, 11, 0, "ng-container", 1);
        i0.ɵɵtemplate(2, IconComponent_ng_container_2_Template, 11, 0, "ng-container", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.iconName === "single_page_display");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.iconName === "two_page_display");
    } }, dependencies: [i1.NgIf], styles: [".mat-icon[_ngcontent-%COMP%]{vertical-align:middle}.single-page-display[_ngcontent-%COMP%]{margin-left:5px}svg[_ngcontent-%COMP%]{height:40px;width:40px}"], changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IconComponent, [{
        type: Component,
        args: [{ selector: 'mime-icon', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mat-icon\">\n  <ng-container *ngIf=\"iconName === 'single_page_display'\">\n    <div class=\"single-page-display\">\n      <svg\n        version=\"1.1\"\n        id=\"Layer_1\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        viewBox=\"0 0 90 90\"\n        preserveAspectRatio=\"xMidYMin slice\"\n      >\n        <style type=\"text/css\">\n          .st0 {\n            clip-path: url(#SVGID_2_);\n          }\n        </style>\n        <g>\n          <defs><rect id=\"SVGID_1_\" width=\"100%\" height=\"100%\" /></defs>\n          <clipPath id=\"SVGID_2_\">\n            <use xlink:href=\"#SVGID_1_\" style=\"overflow: visible\" />\n          </clipPath>\n          <path\n            class=\"st0\"\n            d=\"M21.7,25.2H8.3v2.7h13.4V25.2z M21.7,18.1H8.3v2.7h13.4V18.1z M26.1,31.8H4V4.1h13.6v8.4h8.5V31.8z M30,31.6\n          V11.4L18.7,0H4.3C4.3,0,0,0,0,4.3v27.4c0,0,0,4.3,4.3,4.3h21.5C25.8,35.9,30,35.9,30,31.6\"\n          />\n        </g>\n      </svg>\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"iconName === 'two_page_display'\">\n    <svg\n      version=\"1.1\"\n      id=\"Layer_2\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n      xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n      viewBox=\"0 0 90 90\"\n      preserveAspectRatio=\"xMidYMin slice\"\n    >\n      <style type=\"text/css\">\n        .st0 {\n          clip-path: url(#SVGID_2_);\n        }\n      </style>\n      <g>\n        <defs><rect id=\"SVGID_3_\" width=\"100%\" height=\"100%\" /></defs>\n        <clipPath id=\"SVGID_4_\">\n          <use xlink:href=\"#SVGID_3_\" style=\"overflow: visible\" />\n        </clipPath>\n        <path\n          class=\"st0\"\n          d=\"M52.5,25.2H39.1v2.7h13.4V25.2z M52.5,18.1H39.1v2.7h13.4V18.1z M56.8,31.8H34.7V4.1h13.6v8.4h8.5V31.8z\n        M60.8,31.6V11.4L49.4,0H35c0,0-4.3,0-4.3,4.3v27.4c0,0,0,4.3,4.3,4.3h21.5C56.6,35.9,60.8,35.9,60.8,31.6\"\n        />\n        <path\n          class=\"st0\"\n          d=\"M21.7,25.2H8.3v2.7h13.4V25.2z M21.7,18.1H8.3v2.7h13.4V18.1z M21.7,11.1H8.3v2.7h13.4V11.1z M26.1,31.8H4V4.1\n       h22.1V31.8z M30,31.6V4.3c0,0,0-4.3-4.3-4.3H4.3C4.3,0,0,0,0,4.3v27.4c0,0,0,4.3,4.3,4.3h21.5C25.8,35.9,30,35.9,30,31.6\"\n        />\n      </g>\n    </svg>\n  </ng-container>\n</div>\n", styles: [".mat-icon{vertical-align:middle}.single-page-display{margin-left:5px}svg{height:40px;width:40px}\n"] }]
    }], null, { iconName: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlldy1kaWFsb2cvaWNvbi9pY29uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3LWRpYWxvZy9pY29uL2ljb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7SUNDeEUsNkJBQXlEO0lBQ3ZELDhCQUFpQztJQUMvQixtQkFPQztJQVBELDhCQU9DLGVBQUE7SUFFRyxxREFHRjtJQUFBLGlCQUFRO0lBQ1IseUJBQUcsV0FBQTtJQUNLLDBCQUFpRDtJQUFBLGlCQUFPO0lBQzlELG1DQUF3QjtJQUN0Qix5QkFBd0Q7SUFDMUQsaUJBQVc7SUFDWCwyQkFJRTtJQUNKLGlCQUFJLEVBQUEsRUFBQTtJQUdWLDBCQUFlOzs7SUFDZiw2QkFBc0Q7SUFDcEQsbUJBT0M7SUFQRCw4QkFPQyxlQUFBO0lBRUcscURBR0Y7SUFBQSxpQkFBUTtJQUNSLHlCQUFHLFdBQUE7SUFDSywyQkFBaUQ7SUFBQSxpQkFBTztJQUM5RCxvQ0FBd0I7SUFDdEIsMEJBQXdEO0lBQzFELGlCQUFXO0lBQ1gsMkJBSUUsZ0JBQUE7SUFNSixpQkFBSSxFQUFBO0lBRVIsMEJBQWU7O0FEckRqQixNQUFNLE9BQU8sYUFBYTtJQU4xQjtRQU9XLGFBQVEsR0FBRyxFQUFFLENBQUM7S0FDeEI7OzBFQUZZLGFBQWE7Z0VBQWIsYUFBYTtRQ1IxQiw4QkFBc0I7UUFDcEIsaUZBNEJlO1FBQ2YsaUZBK0JlO1FBQ2pCLGlCQUFNOztRQTdEVyxlQUF3QztRQUF4Qyw2REFBd0M7UUE2QnhDLGVBQXFDO1FBQXJDLDBEQUFxQzs7dUZEdEJ6QyxhQUFhO2NBTnpCLFNBQVM7MkJBQ0UsV0FBVyxtQkFHSix1QkFBdUIsQ0FBQyxNQUFNO2dCQUd0QyxRQUFRO2tCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS1pY29uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ljb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9pY29uLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBJY29uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgaWNvbk5hbWUgPSAnJztcbn1cbiIsIjxkaXYgY2xhc3M9XCJtYXQtaWNvblwiPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiaWNvbk5hbWUgPT09ICdzaW5nbGVfcGFnZV9kaXNwbGF5J1wiPlxuICAgIDxkaXYgY2xhc3M9XCJzaW5nbGUtcGFnZS1kaXNwbGF5XCI+XG4gICAgICA8c3ZnXG4gICAgICAgIHZlcnNpb249XCIxLjFcIlxuICAgICAgICBpZD1cIkxheWVyXzFcIlxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCJcbiAgICAgICAgdmlld0JveD1cIjAgMCA5MCA5MFwiXG4gICAgICAgIHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWlkWU1pbiBzbGljZVwiXG4gICAgICA+XG4gICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAuc3QwIHtcbiAgICAgICAgICAgIGNsaXAtcGF0aDogdXJsKCNTVkdJRF8yXyk7XG4gICAgICAgICAgfVxuICAgICAgICA8L3N0eWxlPlxuICAgICAgICA8Zz5cbiAgICAgICAgICA8ZGVmcz48cmVjdCBpZD1cIlNWR0lEXzFfXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIC8+PC9kZWZzPlxuICAgICAgICAgIDxjbGlwUGF0aCBpZD1cIlNWR0lEXzJfXCI+XG4gICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjU1ZHSURfMV9cIiBzdHlsZT1cIm92ZXJmbG93OiB2aXNpYmxlXCIgLz5cbiAgICAgICAgICA8L2NsaXBQYXRoPlxuICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICBjbGFzcz1cInN0MFwiXG4gICAgICAgICAgICBkPVwiTTIxLjcsMjUuMkg4LjN2Mi43aDEzLjRWMjUuMnogTTIxLjcsMTguMUg4LjN2Mi43aDEzLjRWMTguMXogTTI2LjEsMzEuOEg0VjQuMWgxMy42djguNGg4LjVWMzEuOHogTTMwLDMxLjZcbiAgICAgICAgICBWMTEuNEwxOC43LDBINC4zQzQuMywwLDAsMCwwLDQuM3YyNy40YzAsMCwwLDQuMyw0LjMsNC4zaDIxLjVDMjUuOCwzNS45LDMwLDM1LjksMzAsMzEuNlwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9nPlxuICAgICAgPC9zdmc+XG4gICAgPC9kaXY+XG4gIDwvbmctY29udGFpbmVyPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiaWNvbk5hbWUgPT09ICd0d29fcGFnZV9kaXNwbGF5J1wiPlxuICAgIDxzdmdcbiAgICAgIHZlcnNpb249XCIxLjFcIlxuICAgICAgaWQ9XCJMYXllcl8yXCJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCJcbiAgICAgIHZpZXdCb3g9XCIwIDAgOTAgOTBcIlxuICAgICAgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWluIHNsaWNlXCJcbiAgICA+XG4gICAgICA8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgIC5zdDAge1xuICAgICAgICAgIGNsaXAtcGF0aDogdXJsKCNTVkdJRF8yXyk7XG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG4gICAgICA8Zz5cbiAgICAgICAgPGRlZnM+PHJlY3QgaWQ9XCJTVkdJRF8zX1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiAvPjwvZGVmcz5cbiAgICAgICAgPGNsaXBQYXRoIGlkPVwiU1ZHSURfNF9cIj5cbiAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjU1ZHSURfM19cIiBzdHlsZT1cIm92ZXJmbG93OiB2aXNpYmxlXCIgLz5cbiAgICAgICAgPC9jbGlwUGF0aD5cbiAgICAgICAgPHBhdGhcbiAgICAgICAgICBjbGFzcz1cInN0MFwiXG4gICAgICAgICAgZD1cIk01Mi41LDI1LjJIMzkuMXYyLjdoMTMuNFYyNS4yeiBNNTIuNSwxOC4xSDM5LjF2Mi43aDEzLjRWMTguMXogTTU2LjgsMzEuOEgzNC43VjQuMWgxMy42djguNGg4LjVWMzEuOHpcbiAgICAgICAgTTYwLjgsMzEuNlYxMS40TDQ5LjQsMEgzNWMwLDAtNC4zLDAtNC4zLDQuM3YyNy40YzAsMCwwLDQuMyw0LjMsNC4zaDIxLjVDNTYuNiwzNS45LDYwLjgsMzUuOSw2MC44LDMxLjZcIlxuICAgICAgICAvPlxuICAgICAgICA8cGF0aFxuICAgICAgICAgIGNsYXNzPVwic3QwXCJcbiAgICAgICAgICBkPVwiTTIxLjcsMjUuMkg4LjN2Mi43aDEzLjRWMjUuMnogTTIxLjcsMTguMUg4LjN2Mi43aDEzLjRWMTguMXogTTIxLjcsMTEuMUg4LjN2Mi43aDEzLjRWMTEuMXogTTI2LjEsMzEuOEg0VjQuMVxuICAgICAgIGgyMi4xVjMxLjh6IE0zMCwzMS42VjQuM2MwLDAsMC00LjMtNC4zLTQuM0g0LjNDNC4zLDAsMCwwLDAsNC4zdjI3LjRjMCwwLDAsNC4zLDQuMyw0LjNoMjEuNUMyNS44LDM1LjksMzAsMzUuOSwzMCwzMS42XCJcbiAgICAgICAgLz5cbiAgICAgIDwvZz5cbiAgICA8L3N2Zz5cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cbiJdfQ==