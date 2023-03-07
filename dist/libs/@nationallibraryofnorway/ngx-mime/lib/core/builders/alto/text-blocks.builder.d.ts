import { TextBlock, TextStyle } from '../../alto-service/alto.model';
export declare class TextBlocksBuilder {
    private textLinesBuilder;
    private textStyles;
    private textBlocksXml;
    withTextBlocksXml(textBlocksXml: any): this;
    withTextStyles(textStyles: Map<string, TextStyle> | undefined): TextBlocksBuilder;
    build(): TextBlock[];
}
//# sourceMappingURL=text-blocks.builder.d.ts.map