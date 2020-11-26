import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MimeDomHelper } from './../core/mime-dom-helper';
import { Dimensions } from './../core/models/dimensions';
export class AttributionDialogResizeService {
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
        const dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);
        if (this.dimensions.bottom !== dimensions.bottom ||
            this.dimensions.height !== dimensions.height ||
            this.dimensions.left !== dimensions.left ||
            this.dimensions.right !== dimensions.right ||
            this.dimensions.top !== dimensions.top ||
            this.dimensions.width !== dimensions.width) {
            this.dimensions = dimensions;
            this.resizeSubject.next(Object.assign({}, this.dimensions));
        }
    }
}
AttributionDialogResizeService.decorators = [
    { type: Injectable }
];
AttributionDialogResizeService.ctorParameters = () => [
    { type: MimeDomHelper }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRpb24tZGlhbG9nLXJlc2l6ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3Jvbm55bS9UZW1wL25neC1taW1lL2xpYnMvbmd4LW1pbWUvc3JjLyIsInNvdXJjZXMiOlsibGliL2F0dHJpYnV0aW9uLWRpYWxvZy9hdHRyaWJ1dGlvbi1kaWFsb2ctcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQWMsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHekQsTUFBTSxPQUFPLDhCQUE4QjtJQUt6QyxZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUh4QyxrQkFBYSxHQUE4QixJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQy9ELGVBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBRWEsQ0FBQztJQUVwRCxJQUFJLEVBQUUsQ0FBQyxFQUFjO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsWUFBWTtRQUNWLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLE1BQU07WUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLE1BQU07WUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLElBQUk7WUFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDLEtBQUs7WUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDLEdBQUc7WUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDLEtBQUssRUFDMUM7WUFDQSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksbUJBQU0sSUFBSSxDQUFDLFVBQVUsRUFBRyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQzs7O1lBakNGLFVBQVU7OztZQUhGLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1pbWVEb21IZWxwZXIgfSBmcm9tICcuLy4uL2NvcmUvbWltZS1kb20taGVscGVyJztcbmltcG9ydCB7IERpbWVuc2lvbnMgfSBmcm9tICcuLy4uL2NvcmUvbW9kZWxzL2RpbWVuc2lvbnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXR0cmlidXRpb25EaWFsb2dSZXNpemVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWY7XG4gIHByaXZhdGUgcmVzaXplU3ViamVjdDogUmVwbGF5U3ViamVjdDxEaW1lbnNpb25zPiA9IG5ldyBSZXBsYXlTdWJqZWN0KCk7XG4gIHByaXZhdGUgZGltZW5zaW9ucyA9IG5ldyBEaW1lbnNpb25zKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtaW1lRG9tSGVscGVyOiBNaW1lRG9tSGVscGVyKSB7fVxuXG4gIHNldCBlbChlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2VsID0gZWw7XG4gIH1cblxuICBnZXQgZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsO1xuICB9XG5cbiAgZ2V0IG9uUmVzaXplKCk6IE9ic2VydmFibGU8RGltZW5zaW9ucz4ge1xuICAgIHJldHVybiB0aGlzLnJlc2l6ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBtYXJrRm9yQ2hlY2soKSB7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMubWltZURvbUhlbHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QodGhpcy5lbCk7XG4gICAgaWYgKFxuICAgICAgdGhpcy5kaW1lbnNpb25zLmJvdHRvbSAhPT0gZGltZW5zaW9ucy5ib3R0b20gfHxcbiAgICAgIHRoaXMuZGltZW5zaW9ucy5oZWlnaHQgIT09IGRpbWVuc2lvbnMuaGVpZ2h0IHx8XG4gICAgICB0aGlzLmRpbWVuc2lvbnMubGVmdCAhPT0gZGltZW5zaW9ucy5sZWZ0IHx8XG4gICAgICB0aGlzLmRpbWVuc2lvbnMucmlnaHQgIT09IGRpbWVuc2lvbnMucmlnaHQgfHxcbiAgICAgIHRoaXMuZGltZW5zaW9ucy50b3AgIT09IGRpbWVuc2lvbnMudG9wIHx8XG4gICAgICB0aGlzLmRpbWVuc2lvbnMud2lkdGggIT09IGRpbWVuc2lvbnMud2lkdGhcbiAgICApIHtcbiAgICAgIHRoaXMuZGltZW5zaW9ucyA9IGRpbWVuc2lvbnM7XG4gICAgICB0aGlzLnJlc2l6ZVN1YmplY3QubmV4dCh7IC4uLnRoaXMuZGltZW5zaW9ucyB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==