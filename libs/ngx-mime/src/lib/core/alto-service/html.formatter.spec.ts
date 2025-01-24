import { Alto } from './alto.model';
import { HtmlFormatter } from './html.formatter';

describe('HtmlFormatter', () => {
  it('should format alto to html', () => {
    const alto: Alto = {
      layout: {
        page: {
          topMargin: {},
          leftMargin: {},
          rightMargin: {},
          bottomMargin: {},
          printSpace: {
            textBlocks: [
              {
                textLines: [{ strings: [{ content: 'fakeString1' }] }],
                textStyle: {
                  fontStyle: 'bold',
                },
              },
              {
                textLines: [{ strings: [{ content: 'fakeString2' }] }],
              },
            ],
          },
        },
      },
    };

    const result = new HtmlFormatter().altoToHtml(alto);

    expect(result).toBe(
      '<p style="font-weight: bold">fakeString1<p/><p>fakeString2<p/>',
    );
  });
});
