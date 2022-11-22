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
    const topMargin = this.getFirstPrintSpace(this.pageXml.TopMargin);
    const leftMargin = this.getFirstPrintSpace(this.pageXml.LeftMargin);
    const rightMargin = this.getFirstPrintSpace(this.pageXml.RightMargin);
    const bottomMargin = this.getFirstPrintSpace(this.pageXml.BottomMargin);
    const printSpace = this.getFirstPrintSpace(this.pageXml.PrintSpace);

    return {
      topMargin: this.printSpaceBuilder.withPrintSpaceXml(topMargin).build(),
      leftMargin: this.printSpaceBuilder.withPrintSpaceXml(leftMargin).build(),
      rightMargin: this.printSpaceBuilder
        .withPrintSpaceXml(rightMargin)
        .build(),
      bottomMargin: this.printSpaceBuilder
        .withPrintSpaceXml(bottomMargin)
        .build(),
      printSpace: this.printSpaceBuilder.withPrintSpaceXml(printSpace).build(),
    };
  }

  private getFirstPrintSpace(printSpace: any[]): any | undefined {
    return printSpace ? printSpace[0] : undefined;
  }
}
