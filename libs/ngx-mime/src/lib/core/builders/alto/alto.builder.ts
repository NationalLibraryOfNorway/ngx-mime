import { Alto } from '../../alto-service/alto.model';
import { LayoutBuilder } from './layout.builder';
import { StylesBuilder } from './styles.builder';

export class AltoBuilder {
  private layoutBuilder = new LayoutBuilder();
  private altoXml: any | undefined;

  withAltoXml(altoXml: any): AltoBuilder {
    this.altoXml = altoXml;
    return this;
  }

  build(): Alto {
    if (this.altoXml.Styles) {
      this.layoutBuilder.withTextStyles(
        new StylesBuilder(this.altoXml.Styles[0]).build()
      );
    }
    this.layoutBuilder.withLayoutXml(this.altoXml.Layout[0]);

    return {
      layout: this.layoutBuilder.build(),
    };
  }
}
