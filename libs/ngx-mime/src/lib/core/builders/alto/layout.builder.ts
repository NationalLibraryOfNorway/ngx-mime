import { Layout, TextStyle } from '../../alto-service/alto.model';
import { PageBuilder } from './page.builder';

export class LayoutBuilder {
  private pageBuilder = new PageBuilder();

  withLayoutXml(layoutXml: any): LayoutBuilder {
    this.pageBuilder.withPageXml(layoutXml.Page[0]);
    return this;
  }

  withTextStyles(
    textStyles: Map<string, TextStyle> | undefined,
  ): LayoutBuilder {
    this.pageBuilder.withTextStyles(textStyles);
    return this;
  }

  build(): Layout {
    return {
      page: this.pageBuilder.build(),
    };
  }
}
