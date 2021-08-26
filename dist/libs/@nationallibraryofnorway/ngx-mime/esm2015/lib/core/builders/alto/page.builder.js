import { PrintSpaceBuilder } from './print-space.builder';
export class PageBuilder {
    constructor() {
        this.printSpaceBuilder = new PrintSpaceBuilder();
    }
    withPageXml(pageXml) {
        this.pageXml = pageXml;
        return this;
    }
    withTextStyles(textStyles) {
        this.printSpaceBuilder.withTextStyles(textStyles);
        return this;
    }
    build() {
        return {
            topMargin: this.printSpaceBuilder
                .withPrintSpaceXml(this.pageXml.TopMargin[0])
                .build(),
            leftMargin: this.printSpaceBuilder
                .withPrintSpaceXml(this.pageXml.LeftMargin[0])
                .build(),
            rightMargin: this.printSpaceBuilder
                .withPrintSpaceXml(this.pageXml.RightMargin[0])
                .build(),
            bottomMargin: this.printSpaceBuilder
                .withPrintSpaceXml(this.pageXml.BottomMargin[0])
                .build(),
            printSpace: this.printSpaceBuilder
                .withPrintSpaceXml(this.pageXml.PrintSpace[0])
                .build(),
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvYnVpbGRlcnMvYWx0by9wYWdlLmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsTUFBTSxPQUFPLFdBQVc7SUFBeEI7UUFDVSxzQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7SUFnQ3RELENBQUM7SUE3QkMsV0FBVyxDQUFDLE9BQVk7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsY0FBYyxDQUFDLFVBQThDO1FBQzNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsS0FBSztRQUNILE9BQU87WUFDTCxTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtpQkFDOUIsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzVDLEtBQUssRUFBRTtZQUNWLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCO2lCQUMvQixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDN0MsS0FBSyxFQUFFO1lBQ1YsV0FBVyxFQUFFLElBQUksQ0FBQyxpQkFBaUI7aUJBQ2hDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM5QyxLQUFLLEVBQUU7WUFDVixZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtpQkFDakMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQy9DLEtBQUssRUFBRTtZQUNWLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCO2lCQUMvQixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDN0MsS0FBSyxFQUFFO1NBQ1gsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhZ2UsIFRleHRTdHlsZSB9IGZyb20gJy4uLy4uL2FsdG8tc2VydmljZS9hbHRvLm1vZGVsJztcbmltcG9ydCB7IFByaW50U3BhY2VCdWlsZGVyIH0gZnJvbSAnLi9wcmludC1zcGFjZS5idWlsZGVyJztcblxuZXhwb3J0IGNsYXNzIFBhZ2VCdWlsZGVyIHtcbiAgcHJpdmF0ZSBwcmludFNwYWNlQnVpbGRlciA9IG5ldyBQcmludFNwYWNlQnVpbGRlcigpO1xuICBwcml2YXRlIHBhZ2VYbWw6IGFueSB8IHVuZGVmaW5lZDtcblxuICB3aXRoUGFnZVhtbChwYWdlWG1sOiBhbnkpIHtcbiAgICB0aGlzLnBhZ2VYbWwgPSBwYWdlWG1sO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFRleHRTdHlsZXModGV4dFN0eWxlczogTWFwPHN0cmluZywgVGV4dFN0eWxlPiB8IHVuZGVmaW5lZCk6IFBhZ2VCdWlsZGVyIHtcbiAgICB0aGlzLnByaW50U3BhY2VCdWlsZGVyLndpdGhUZXh0U3R5bGVzKHRleHRTdHlsZXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYnVpbGQoKTogUGFnZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcE1hcmdpbjogdGhpcy5wcmludFNwYWNlQnVpbGRlclxuICAgICAgICAud2l0aFByaW50U3BhY2VYbWwodGhpcy5wYWdlWG1sLlRvcE1hcmdpblswXSlcbiAgICAgICAgLmJ1aWxkKCksXG4gICAgICBsZWZ0TWFyZ2luOiB0aGlzLnByaW50U3BhY2VCdWlsZGVyXG4gICAgICAgIC53aXRoUHJpbnRTcGFjZVhtbCh0aGlzLnBhZ2VYbWwuTGVmdE1hcmdpblswXSlcbiAgICAgICAgLmJ1aWxkKCksXG4gICAgICByaWdodE1hcmdpbjogdGhpcy5wcmludFNwYWNlQnVpbGRlclxuICAgICAgICAud2l0aFByaW50U3BhY2VYbWwodGhpcy5wYWdlWG1sLlJpZ2h0TWFyZ2luWzBdKVxuICAgICAgICAuYnVpbGQoKSxcbiAgICAgIGJvdHRvbU1hcmdpbjogdGhpcy5wcmludFNwYWNlQnVpbGRlclxuICAgICAgICAud2l0aFByaW50U3BhY2VYbWwodGhpcy5wYWdlWG1sLkJvdHRvbU1hcmdpblswXSlcbiAgICAgICAgLmJ1aWxkKCksXG4gICAgICBwcmludFNwYWNlOiB0aGlzLnByaW50U3BhY2VCdWlsZGVyXG4gICAgICAgIC53aXRoUHJpbnRTcGFjZVhtbCh0aGlzLnBhZ2VYbWwuUHJpbnRTcGFjZVswXSlcbiAgICAgICAgLmJ1aWxkKCksXG4gICAgfTtcbiAgfVxufVxuIl19