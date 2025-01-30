import { PageBuilder } from './page.builder';
export class LayoutBuilder {
    constructor() {
        this.pageBuilder = new PageBuilder();
    }
    withLayoutXml(layoutXml) {
        this.pageBuilder.withPageXml(layoutXml.Page[0]);
        return this;
    }
    withTextStyles(textStyles) {
        this.pageBuilder.withTextStyles(textStyles);
        return this;
    }
    build() {
        return {
            page: this.pageBuilder.build(),
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9idWlsZGVycy9hbHRvL2xheW91dC5idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxNQUFNLE9BQU8sYUFBYTtJQUExQjtRQUNVLGdCQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQW1CMUMsQ0FBQztJQWpCQyxhQUFhLENBQUMsU0FBYztRQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsY0FBYyxDQUNaLFVBQThDO1FBRTlDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELEtBQUs7UUFDSCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1NBQy9CLENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMYXlvdXQsIFRleHRTdHlsZSB9IGZyb20gJy4uLy4uL2FsdG8tc2VydmljZS9hbHRvLm1vZGVsJztcbmltcG9ydCB7IFBhZ2VCdWlsZGVyIH0gZnJvbSAnLi9wYWdlLmJ1aWxkZXInO1xuXG5leHBvcnQgY2xhc3MgTGF5b3V0QnVpbGRlciB7XG4gIHByaXZhdGUgcGFnZUJ1aWxkZXIgPSBuZXcgUGFnZUJ1aWxkZXIoKTtcblxuICB3aXRoTGF5b3V0WG1sKGxheW91dFhtbDogYW55KTogTGF5b3V0QnVpbGRlciB7XG4gICAgdGhpcy5wYWdlQnVpbGRlci53aXRoUGFnZVhtbChsYXlvdXRYbWwuUGFnZVswXSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoVGV4dFN0eWxlcyhcbiAgICB0ZXh0U3R5bGVzOiBNYXA8c3RyaW5nLCBUZXh0U3R5bGU+IHwgdW5kZWZpbmVkLFxuICApOiBMYXlvdXRCdWlsZGVyIHtcbiAgICB0aGlzLnBhZ2VCdWlsZGVyLndpdGhUZXh0U3R5bGVzKHRleHRTdHlsZXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYnVpbGQoKTogTGF5b3V0IHtcbiAgICByZXR1cm4ge1xuICAgICAgcGFnZTogdGhpcy5wYWdlQnVpbGRlci5idWlsZCgpLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==