import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MimeDomHelper } from '../mime-dom-helper';
import { Dimensions } from '../models/dimensions';
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
            this.resizeSubject.next(Object.assign({}, this.dimensions));
        }
    }
}
MimeResizeService.decorators = [
    { type: Injectable }
];
MimeResizeService.ctorParameters = () => [
    { type: MimeDomHelper }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS1yZXNpemUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL21pbWUtcmVzaXplLXNlcnZpY2UvbWltZS1yZXNpemUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUdsRCxNQUFNLE9BQU8saUJBQWlCO0lBSzVCLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBSHhDLGtCQUFhLEdBQThCLElBQUksYUFBYSxFQUFFLENBQUM7UUFDL0QsZUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7SUFFYSxDQUFDO0lBRXBELElBQUksRUFBRSxDQUFDLEVBQWM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELElBQUksRUFBRTtRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1NBQy9CO1FBQ0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFckUsSUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsTUFBTTtZQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsTUFBTTtZQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsSUFBSTtZQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsS0FBSztZQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxVQUFVLENBQUMsR0FBRztZQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsS0FBSyxFQUMxQztZQUNBLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxtQkFBTSxJQUFJLENBQUMsVUFBVSxFQUFHLENBQUM7U0FDakQ7SUFDSCxDQUFDOzs7WUFyQ0YsVUFBVTs7O1lBSEYsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQgeyBEaW1lbnNpb25zIH0gZnJvbSAnLi4vbW9kZWxzL2RpbWVuc2lvbnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWltZVJlc2l6ZVNlcnZpY2Uge1xuICBwcml2YXRlIF9lbCE6IEVsZW1lbnRSZWY7XG4gIHByaXZhdGUgcmVzaXplU3ViamVjdDogUmVwbGF5U3ViamVjdDxEaW1lbnNpb25zPiA9IG5ldyBSZXBsYXlTdWJqZWN0KCk7XG4gIHByaXZhdGUgZGltZW5zaW9ucyA9IG5ldyBEaW1lbnNpb25zKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtaW1lRG9tSGVscGVyOiBNaW1lRG9tSGVscGVyKSB7fVxuXG4gIHNldCBlbChlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2VsID0gZWw7XG4gIH1cblxuICBnZXQgZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsO1xuICB9XG5cbiAgZ2V0IG9uUmVzaXplKCk6IE9ic2VydmFibGU8RGltZW5zaW9ucz4ge1xuICAgIHJldHVybiB0aGlzLnJlc2l6ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBtYXJrRm9yQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmVsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGVsZW1lbnQhJylcbiAgICB9XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMubWltZURvbUhlbHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QodGhpcy5lbCk7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmRpbWVuc2lvbnMuYm90dG9tICE9PSBkaW1lbnNpb25zLmJvdHRvbSB8fFxuICAgICAgdGhpcy5kaW1lbnNpb25zLmhlaWdodCAhPT0gZGltZW5zaW9ucy5oZWlnaHQgfHxcbiAgICAgIHRoaXMuZGltZW5zaW9ucy5sZWZ0ICE9PSBkaW1lbnNpb25zLmxlZnQgfHxcbiAgICAgIHRoaXMuZGltZW5zaW9ucy5yaWdodCAhPT0gZGltZW5zaW9ucy5yaWdodCB8fFxuICAgICAgdGhpcy5kaW1lbnNpb25zLnRvcCAhPT0gZGltZW5zaW9ucy50b3AgfHxcbiAgICAgIHRoaXMuZGltZW5zaW9ucy53aWR0aCAhPT0gZGltZW5zaW9ucy53aWR0aFxuICAgICkge1xuICAgICAgdGhpcy5kaW1lbnNpb25zID0gZGltZW5zaW9ucztcbiAgICAgIHRoaXMucmVzaXplU3ViamVjdC5uZXh0KHsgLi4udGhpcy5kaW1lbnNpb25zIH0pO1xuICAgIH1cbiAgfVxufVxuIl19