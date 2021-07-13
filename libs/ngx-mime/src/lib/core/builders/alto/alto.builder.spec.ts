import { parseString } from 'xml2js';
import { testAlto } from '../../../test/testAltos';
import { AltoBuilder } from '../../builders/alto';

describe('AltoBuilder', () => {
  fit('should build altoxml', () => {
    parseString(testAlto, {}, (error, result) => {
      const alto = new AltoBuilder().withAltoXml(result.alto).build();
      expect(alto).toBeDefined();
      expect(alto?.layout.page.printSpace.textBlocks.length).toBe(4);
      expect(alto?.layout.page.printSpace.textBlocks[0].textLines.length).toBe(
        1
      );
      expect(
        alto?.layout.page.printSpace.textBlocks[0].textLines[0].strings.length
      ).toBe(4);
      expect(
        alto?.layout.page.printSpace.textBlocks[0].textLines[0].strings[0]
          .content
      ).toBe('Brann-');
      expect(
        alto?.layout.page.printSpace.textBlocks[0].textStyle
      ).toBeDefined ();
      expect(
        alto?.layout.page.printSpace.textBlocks[1].textStyle?.fontStyle
      ).toBe('bold');
    });
  });
});
