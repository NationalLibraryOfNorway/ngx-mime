import { StringsBuilder } from './strings.builder';
export class TextLinesBuilder {
    constructor() {
        this.stringBuilder = new StringsBuilder();
    }
    withTextLinesXml(textLinesXml) {
        this.textLinesXml = textLinesXml;
        return this;
    }
    build() {
        return this.textLinesXml
            ? this.textLinesXml.map((textLine) => {
                return {
                    strings: this.stringBuilder.withStringXml(textLine.String).build(),
                };
            })
            : [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1saW5lcy5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvYnVpbGRlcnMvYWx0by90ZXh0LWxpbmVzLmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5ELE1BQU0sT0FBTyxnQkFBZ0I7SUFBN0I7UUFDVSxrQkFBYSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7SUFpQi9DLENBQUM7SUFkQyxnQkFBZ0IsQ0FBQyxZQUFpQjtRQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxLQUFLO1FBQ0gsT0FBTyxJQUFJLENBQUMsWUFBWTtZQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFhLEVBQUUsRUFBRTtnQkFDdEMsT0FBTztvQkFDTCxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRTtpQkFDbkUsQ0FBQztZQUNKLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDVCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0TGluZSB9IGZyb20gJy4uLy4uL2FsdG8tc2VydmljZS9hbHRvLm1vZGVsJztcbmltcG9ydCB7IFN0cmluZ3NCdWlsZGVyIH0gZnJvbSAnLi9zdHJpbmdzLmJ1aWxkZXInO1xuXG5leHBvcnQgY2xhc3MgVGV4dExpbmVzQnVpbGRlciB7XG4gIHByaXZhdGUgc3RyaW5nQnVpbGRlciA9IG5ldyBTdHJpbmdzQnVpbGRlcigpO1xuICBwcml2YXRlIHRleHRMaW5lc1htbDogYW55IHwgdW5kZWZpbmVkO1xuXG4gIHdpdGhUZXh0TGluZXNYbWwodGV4dExpbmVzWG1sOiBhbnkpIHtcbiAgICB0aGlzLnRleHRMaW5lc1htbCA9IHRleHRMaW5lc1htbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGJ1aWxkKCk6IFRleHRMaW5lW10ge1xuICAgIHJldHVybiB0aGlzLnRleHRMaW5lc1htbFxuICAgICAgPyB0aGlzLnRleHRMaW5lc1htbC5tYXAoKHRleHRMaW5lOiBhbnkpID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RyaW5nczogdGhpcy5zdHJpbmdCdWlsZGVyLndpdGhTdHJpbmdYbWwodGV4dExpbmUuU3RyaW5nKS5idWlsZCgpLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgICA6IFtdO1xuICB9XG59XG4iXX0=