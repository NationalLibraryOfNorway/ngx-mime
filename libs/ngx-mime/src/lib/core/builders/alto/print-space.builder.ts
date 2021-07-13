import { PrintSpace, TextStyle } from '../../alto-service/alto.model';
import { TextBlocksBuilder } from './text-blocks.builder';

export class PrintSpaceBuilder {
  private textStyles: Map<string, TextStyle> | undefined;
  private printSpaceXml: any | undefined;

  withPrintSpaceXml(printSpaceXml: any) {
    this.printSpaceXml = printSpaceXml;
    return this;
  }

  withTextStyles(
    textStyles: Map<string, TextStyle> | undefined
  ): PrintSpaceBuilder {
    this.textStyles = textStyles;
    return this;
  }

  build(): PrintSpace {
    let textBlocks: any[] = [];
    console.log('xml', this.printSpaceXml);

    if (this.printSpaceXml.TextBlock) {
      textBlocks = [...textBlocks, ...this.printSpaceXml.TextBlock];
    }
    if (this.printSpaceXml.ComposedBlock) {
      textBlocks = [
        ...textBlocks,
        ...this.printSpaceXml.ComposedBlock.filter(
          (t: any) => t.TextBlock !== undefined
        ).flatMap((t: any) => t.TextBlock),
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
