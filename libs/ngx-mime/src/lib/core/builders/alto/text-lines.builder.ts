import { TextLine } from '../../alto-service/alto.model';
import { StringsBuilder } from './strings.builder';

export class TextLinesBuilder {
  private stringBuilder = new StringsBuilder();
  private textLinesXml: any | undefined;

  withTextLinesXml(textLinesXml: any) {
    this.textLinesXml = textLinesXml;
    return this;
  }

  build(): TextLine[] {
    return this.textLinesXml
      ? this.textLinesXml.map((textLine: any) => {
          return {
            strings: this.stringBuilder.withStringXml(textLine.String).build(),
          };
        })
      : [];
  }
}
