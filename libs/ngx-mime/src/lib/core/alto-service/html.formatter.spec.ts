import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { Alto } from './alto.model';
import { HtmlFormatter } from './html.formatter';
import { Hit } from './../../core/models/hit';

describe('HtmlFormatter', () => {
  let sanitizer: DomSanitizer;
  let alto: Alto = {
    layout: {
      page: {
        topMargin: {},
        leftMargin: {},
        rightMargin: {},
        bottomMargin: {},
        printSpace: {
          textBlocks: [
            {
              textLines: [{ strings: [{ content: 'this is a test' }] }],
            },
          ],
        },
      },
    },
  };
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

  it('should mark searchQuery', () => {
    const result = new HtmlFormatter(sanitizer, ['test']).altoToHtml(alto);

    expect(result).toBe(
      '<p>this is a <mark>test</mark><p/>'
    );
  });

  it('should mark multiple words', () => {
    const result = new HtmlFormatter(sanitizer, ['this','test','is']).altoToHtml(alto);

    expect(result).toBe(
      '<p><mark>this</mark> <mark>is</mark> a <mark>test</mark><p/>'
    );
  });

  it('should mark single letter words', () => {
    const result = new HtmlFormatter(sanitizer, ['a']).altoToHtml(alto);

    expect(result).toBe(
      '<p>this is<mark> a </mark>test<p/>'
    );
  });

  it('should sanitize searchQuery', () => {
    const result = new HtmlFormatter(sanitizer, ['"test"']).altoToHtml(alto);
    const result2 = new HtmlFormatter(sanitizer, ['.."*is...']).altoToHtml(alto);

    expect(result).toBe(
      '<p>this is a <mark>test</mark><p/>'
    );
    expect(result2).toBe(
      '<p>this <mark>is</mark> a test<p/>'
    );
  });

  it('should mark whole words and not partially', () => {
    const result = new HtmlFormatter(sanitizer, ['is']).altoToHtml(alto);

    expect(result).toBe(
      '<p>this <mark>is</mark> a test<p/>'
    );
  });

  it('should mark match when hits are available', () => {
    var hits: Hit[] = [{id: 1, index: 2, match: 'this', label: '', before: '', after: '', rects: []}]
    const result = new HtmlFormatter(sanitizer, undefined, hits).altoToHtml(alto);

    expect(result).toBe(
      '<p><mark>this</mark> is a test<p/>'
    );
  });
});
