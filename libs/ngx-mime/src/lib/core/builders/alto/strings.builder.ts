import { String } from '../../alto-service/alto.model';

export class StringsBuilder {
  private stringXml: any | undefined;

  withStringXml(stringXml: any): StringsBuilder {
    this.stringXml = stringXml;
    return this;
  }

  build(): String[] {
    return this.stringXml
      ? this.stringXml.map((string: any) => {
          return { content: string.$.CONTENT };
        })
      : [];
  }
}
