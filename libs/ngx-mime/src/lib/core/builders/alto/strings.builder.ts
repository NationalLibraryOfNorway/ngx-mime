import { String } from '../../alto-service/alto.model';

export class StringsBuilder {
  private stringXml: any | undefined;

  withStringXml(stringXml: any): StringsBuilder {
    this.stringXml = stringXml;
    return this;
  }

  build(): String[] {
    return this.stringXml
      ? this.stringXml
          .filter(
            (string: any) =>
              !string.$.SUBS_CONTENT || string.$.SUBS_TYPE === 'HypPart1'
          )
          .map((string: any) => {
            return { content: string.$.SUBS_CONTENT || string.$.CONTENT };
          })
      : [];
  }
}
