import { Page, TextStyle } from '../../alto-service/alto.model';
import { PrintSpaceBuilder } from './print-space.builder';

export class PageBuilder {
  private printSpaceBuilder = new PrintSpaceBuilder();
  private pageXml: any | undefined;

  withPageXml(pageXml: any) {
    this.pageXml = pageXml;
    return this;
  }

  withTextStyles(textStyles: Map<string, TextStyle> | undefined): PageBuilder {
    this.printSpaceBuilder.withTextStyles(textStyles);
    return this;
  }

  build(): Page {
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
