import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { Alto } from './alto.model';
import { HtmlFormatter } from './html.formatter';

describe('HtmlFormatter', () => {
  let sanitizer: DomSanitizer;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: (val: string) => val,
          },
        },
      ],
    });
    sanitizer = TestBed.inject(DomSanitizer);
  });

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

    const result = new HtmlFormatter(sanitizer).altoToHtml(alto);

    expect(result).toBe(
      '<p style="font-weight: bold">fakeString1<p/><p>fakeString2<p/>'
    );
  });
});
