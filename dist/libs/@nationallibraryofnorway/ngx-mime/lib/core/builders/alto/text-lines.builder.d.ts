import { TextLine } from '../../alto-service/alto.model';
export declare class TextLinesBuilder {
    private stringBuilder;
    private textLinesXml;
    withTextLinesXml(textLinesXml: any): this;
    build(): TextLine[];
}
