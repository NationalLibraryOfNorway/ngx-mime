import { TextBlock, TextStyle } from '../../alto-service/alto.model';
import { TextLinesBuilder } from './text-lines.builder';

export class TextBlocksBuilder {
  private textLinesBuilder = new TextLinesBuilder();
  private textStyles: Map<string, TextStyle> | undefined;
  private textBlocksXml: any | undefined;

  withTextBlocksXml(textBlocksXml: any) {
    this.textBlocksXml = textBlocksXml;
    return this;
  }

  withTextStyles(
    textStyles: Map<string, TextStyle> | undefined,
  ): TextBlocksBuilder {
    this.textStyles = textStyles;
    return this;
  }

  build(): TextBlock[] {
    return this.textBlocksXml
      ? this.textBlocksXml.map((textBlock: any) => {
          const styleRef = textBlock.$.STYLEREFS?.split(' ');
          let textStyle = undefined;
          if (styleRef && this.textStyles) {
            textStyle = this.textStyles.get(styleRef[0]);
          }
          return {
            textLines: this.textLinesBuilder
              .withTextLinesXml(textBlock.TextLine)
              .build(),
            textStyle: {
              fontStyle: textStyle?.fontStyle,
            },
          };
        })
      : [];
  }
}
