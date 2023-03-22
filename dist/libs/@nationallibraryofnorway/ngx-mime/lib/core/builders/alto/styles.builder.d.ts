import { TextStyle } from '../../alto-service/alto.model';
export declare class StylesBuilder {
    private stylesXml;
    constructor(stylesXml: any);
    build(): Map<string, TextStyle>;
}
