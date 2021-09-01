import { TextBlocksBuilder } from './text-blocks.builder';
export class PrintSpaceBuilder {
    withPrintSpaceXml(printSpaceXml) {
        this.printSpaceXml = printSpaceXml;
        return this;
    }
    withTextStyles(textStyles) {
        this.textStyles = textStyles;
        return this;
    }
    build() {
        let textBlocks = [];
        if (this.printSpaceXml.TextBlock) {
            textBlocks = [...textBlocks, ...this.printSpaceXml.TextBlock];
        }
        if (this.printSpaceXml.ComposedBlock) {
            textBlocks = [
                ...textBlocks,
                ...this.printSpaceXml.ComposedBlock.filter((t) => t.TextBlock !== undefined).flatMap((t) => t.TextBlock),
            ];
        }
        return {
            textBlocks: new TextBlocksBuilder()
                .withTextBlocksXml(textBlocks)
                .withTextStyles(this.textStyles)
                .build(),
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQtc3BhY2UuYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2J1aWxkZXJzL2FsdG8vcHJpbnQtc3BhY2UuYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxNQUFNLE9BQU8saUJBQWlCO0lBSTVCLGlCQUFpQixDQUFDLGFBQWtCO1FBQ2xDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELGNBQWMsQ0FDWixVQUE4QztRQUU5QyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxVQUFVLEdBQVUsRUFBRSxDQUFDO1FBRTNCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUU7WUFDaEMsVUFBVSxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQy9EO1FBQ0QsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRTtZQUNwQyxVQUFVLEdBQUc7Z0JBQ1gsR0FBRyxVQUFVO2dCQUNiLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUN4QyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQ3RDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2FBQ25DLENBQUM7U0FDSDtRQUNELE9BQU87WUFDTCxVQUFVLEVBQUUsSUFBSSxpQkFBaUIsRUFBRTtpQkFDaEMsaUJBQWlCLENBQUMsVUFBVSxDQUFDO2lCQUM3QixjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztpQkFDL0IsS0FBSyxFQUFFO1NBQ1gsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaW50U3BhY2UsIFRleHRTdHlsZSB9IGZyb20gJy4uLy4uL2FsdG8tc2VydmljZS9hbHRvLm1vZGVsJztcbmltcG9ydCB7IFRleHRCbG9ja3NCdWlsZGVyIH0gZnJvbSAnLi90ZXh0LWJsb2Nrcy5idWlsZGVyJztcblxuZXhwb3J0IGNsYXNzIFByaW50U3BhY2VCdWlsZGVyIHtcbiAgcHJpdmF0ZSB0ZXh0U3R5bGVzOiBNYXA8c3RyaW5nLCBUZXh0U3R5bGU+IHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIHByaW50U3BhY2VYbWw6IGFueSB8IHVuZGVmaW5lZDtcblxuICB3aXRoUHJpbnRTcGFjZVhtbChwcmludFNwYWNlWG1sOiBhbnkpIHtcbiAgICB0aGlzLnByaW50U3BhY2VYbWwgPSBwcmludFNwYWNlWG1sO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFRleHRTdHlsZXMoXG4gICAgdGV4dFN0eWxlczogTWFwPHN0cmluZywgVGV4dFN0eWxlPiB8IHVuZGVmaW5lZFxuICApOiBQcmludFNwYWNlQnVpbGRlciB7XG4gICAgdGhpcy50ZXh0U3R5bGVzID0gdGV4dFN0eWxlcztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGJ1aWxkKCk6IFByaW50U3BhY2Uge1xuICAgIGxldCB0ZXh0QmxvY2tzOiBhbnlbXSA9IFtdO1xuXG4gICAgaWYgKHRoaXMucHJpbnRTcGFjZVhtbC5UZXh0QmxvY2spIHtcbiAgICAgIHRleHRCbG9ja3MgPSBbLi4udGV4dEJsb2NrcywgLi4udGhpcy5wcmludFNwYWNlWG1sLlRleHRCbG9ja107XG4gICAgfVxuICAgIGlmICh0aGlzLnByaW50U3BhY2VYbWwuQ29tcG9zZWRCbG9jaykge1xuICAgICAgdGV4dEJsb2NrcyA9IFtcbiAgICAgICAgLi4udGV4dEJsb2NrcyxcbiAgICAgICAgLi4udGhpcy5wcmludFNwYWNlWG1sLkNvbXBvc2VkQmxvY2suZmlsdGVyKFxuICAgICAgICAgICh0OiBhbnkpID0+IHQuVGV4dEJsb2NrICE9PSB1bmRlZmluZWRcbiAgICAgICAgKS5mbGF0TWFwKCh0OiBhbnkpID0+IHQuVGV4dEJsb2NrKSxcbiAgICAgIF07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB0ZXh0QmxvY2tzOiBuZXcgVGV4dEJsb2Nrc0J1aWxkZXIoKVxuICAgICAgICAud2l0aFRleHRCbG9ja3NYbWwodGV4dEJsb2NrcylcbiAgICAgICAgLndpdGhUZXh0U3R5bGVzKHRoaXMudGV4dFN0eWxlcylcbiAgICAgICAgLmJ1aWxkKCksXG4gICAgfTtcbiAgfVxufVxuIl19