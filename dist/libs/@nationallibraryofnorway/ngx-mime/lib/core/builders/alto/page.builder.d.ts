import { Page, TextStyle } from '../../alto-service/alto.model';
export declare class PageBuilder {
    private printSpaceBuilder;
    private pageXml;
    withPageXml(pageXml: any): this;
    withTextStyles(textStyles: Map<string, TextStyle> | undefined): PageBuilder;
    build(): Page;
}
