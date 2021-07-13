import { parseString } from 'xml2js';
import { testAlto } from '../../../test/testAltos';
import { AltoBuilder } from '../../builders/alto';

describe('AltoBuilder', () => {
  it('should build altoxml', () => {
    parseString(testAlto, {}, (error, result) => {
      const alto = new AltoBuilder().withAltoXml(result.alto).build();

      const textBlocks = alto.layout.page.printSpace.textBlocks;
      const firstTextBlock = textBlocks[0];
      const secondTextBlock = textBlocks[1];
      expect(textBlocks.length).toBe(4);
      expect(firstTextBlock.textLines.length).toBe(1);
      expect(firstTextBlock.textLines[0].strings.length).toBe(4);
      expect(firstTextBlock.textLines[0].strings[0].content).toBe('Brann-');
      expect(secondTextBlock.textStyle?.fontStyle).toBe('bold');
    });
  });
});
