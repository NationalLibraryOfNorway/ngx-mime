import { PrintSpace, TextStyle } from '../../alto-service/alto.model';
export declare class PrintSpaceBuilder {
    private textStyles;
    private printSpaceXml;
    withPrintSpaceXml(printSpaceXml: any): this;
    withTextStyles(textStyles: Map<string, TextStyle> | undefined): PrintSpaceBuilder;
    build(): PrintSpace;
    private extractTextBlocks;
    private isTextBlock;
    private isComposedBlock;
}
