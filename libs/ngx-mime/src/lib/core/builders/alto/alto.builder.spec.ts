import { parseString } from 'xml2js';
import { testAlto, testAltoWithSubsContent } from '../../../test/testAltos';
import { AltoBuilder } from '../../builders/alto';

describe('AltoBuilder', () => {
  it('should build altoxml', () => {
    parseString(
      testAlto,
      { preserveChildrenOrder: true, explicitChildren: true },
      (error, result) => {
        const alto = new AltoBuilder().withAltoXml(result.alto).build();

        const textBlocks = alto.layout.page.printSpace.textBlocks;
        expect(textBlocks).toBeDefined();
        if (textBlocks) {
          const firstTextBlock = textBlocks[0];
          const secondTextBlock = textBlocks[1];
          expect(textBlocks.length).toBe(4);
          expect(firstTextBlock.textLines.length).toBe(1);
          expect(firstTextBlock.textLines[0].strings.length).toBe(4);
          expect(firstTextBlock.textLines[0].strings[0].content).toBe('Brann-');
          expect(secondTextBlock.textStyle?.fontStyle).toBe('bold');
        }
      }
    );
  });
  it('should build altoxml', () => {
    parseString(
      testAltoWithSubsContent,
      { preserveChildrenOrder: true, explicitChildren: true },
      (error, result) => {
        const alto = new AltoBuilder().withAltoXml(result.alto).build();

        const textBlocks = alto.layout.page.printSpace.textBlocks;
        expect(textBlocks).toBeDefined();
        if (textBlocks) {
          const secondTextBlock = textBlocks[1];
          expect(secondTextBlock.textLines[6].strings[5].content).toBe(
            'politicians.'
          );
        }
      }
    );
  });
});
