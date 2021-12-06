import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Dimensions } from '../models/dimensions';
import * as i0 from "@angular/core";
import * as i1 from "../mime-dom-helper";
export class MimeResizeService {
    constructor(mimeDomHelper) {
        this.mimeDomHelper = mimeDomHelper;
        this.resizeSubject = new ReplaySubject();
        this.dimensions = new Dimensions();
    }
    set el(el) {
        this._el = el;
    }
    get el() {
        return this._el;
    }
    get onResize() {
        return this.resizeSubject.asObservable();
    }
    markForCheck() {
        if (!this.el) {
            throw new Error('No element!');
        }
        const dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);
        if (this.dimensions.bottom !== dimensions.bottom ||
            this.dimensions.height !== dimensions.height ||
            this.dimensions.left !== dimensions.left ||
            this.dimensions.right !== dimensions.right ||
            this.dimensions.top !== dimensions.top ||
            this.dimensions.width !== dimensions.width) {
            this.dimensions = dimensions;
            this.resizeSubject.next({ ...this.dimensions });
        }
    }
}
MimeResizeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MimeResizeService, deps: [{ token: i1.MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable });
MimeResizeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MimeResizeService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MimeResizeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MimeDomHelper }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS1yZXNpemUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL21pbWUtcmVzaXplLXNlcnZpY2UvbWltZS1yZXNpemUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7QUFHbEQsTUFBTSxPQUFPLGlCQUFpQjtJQUs1QixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUh4QyxrQkFBYSxHQUE4QixJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQy9ELGVBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBRWEsQ0FBQztJQUVwRCxJQUFJLEVBQUUsQ0FBQyxFQUFjO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQTtTQUMvQjtRQUNELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXJFLElBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLE1BQU07WUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLE1BQU07WUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLElBQUk7WUFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDLEtBQUs7WUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDLEdBQUc7WUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDLEtBQUssRUFDMUM7WUFDQSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7U0FDakQ7SUFDSCxDQUFDOzs4R0FwQ1UsaUJBQWlCO2tIQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQgeyBEaW1lbnNpb25zIH0gZnJvbSAnLi4vbW9kZWxzL2RpbWVuc2lvbnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWltZVJlc2l6ZVNlcnZpY2Uge1xuICBwcml2YXRlIF9lbCE6IEVsZW1lbnRSZWY7XG4gIHByaXZhdGUgcmVzaXplU3ViamVjdDogUmVwbGF5U3ViamVjdDxEaW1lbnNpb25zPiA9IG5ldyBSZXBsYXlTdWJqZWN0KCk7XG4gIHByaXZhdGUgZGltZW5zaW9ucyA9IG5ldyBEaW1lbnNpb25zKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtaW1lRG9tSGVscGVyOiBNaW1lRG9tSGVscGVyKSB7fVxuXG4gIHNldCBlbChlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2VsID0gZWw7XG4gIH1cblxuICBnZXQgZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsO1xuICB9XG5cbiAgZ2V0IG9uUmVzaXplKCk6IE9ic2VydmFibGU8RGltZW5zaW9ucz4ge1xuICAgIHJldHVybiB0aGlzLnJlc2l6ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBtYXJrRm9yQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmVsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGVsZW1lbnQhJylcbiAgICB9XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMubWltZURvbUhlbHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QodGhpcy5lbCk7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmRpbWVuc2lvbnMuYm90dG9tICE9PSBkaW1lbnNpb25zLmJvdHRvbSB8fFxuICAgICAgdGhpcy5kaW1lbnNpb25zLmhlaWdodCAhPT0gZGltZW5zaW9ucy5oZWlnaHQgfHxcbiAgICAgIHRoaXMuZGltZW5zaW9ucy5sZWZ0ICE9PSBkaW1lbnNpb25zLmxlZnQgfHxcbiAgICAgIHRoaXMuZGltZW5zaW9ucy5yaWdodCAhPT0gZGltZW5zaW9ucy5yaWdodCB8fFxuICAgICAgdGhpcy5kaW1lbnNpb25zLnRvcCAhPT0gZGltZW5zaW9ucy50b3AgfHxcbiAgICAgIHRoaXMuZGltZW5zaW9ucy53aWR0aCAhPT0gZGltZW5zaW9ucy53aWR0aFxuICAgICkge1xuICAgICAgdGhpcy5kaW1lbnNpb25zID0gZGltZW5zaW9ucztcbiAgICAgIHRoaXMucmVzaXplU3ViamVjdC5uZXh0KHsgLi4udGhpcy5kaW1lbnNpb25zIH0pO1xuICAgIH1cbiAgfVxufVxuIl19