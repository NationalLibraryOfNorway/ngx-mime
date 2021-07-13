import { TextStyle } from '../../alto-service/alto.model';

export class StylesBuilder {
  constructor(private stylesXml: any) {}

  build(): Map<string, TextStyle> {
    const textStyles: Map<string, TextStyle> = new Map();
    if (this.stylesXml.TextStyle) {
      this.stylesXml.TextStyle.forEach((textStyle: any) => {
        textStyles.set(textStyle.$.ID, {
          fontStyle: textStyle.$.FONTSTYLE,
        });
      });
    }
    return textStyles;
  }
}
