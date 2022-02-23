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
              textLines: [
                { strings: [{ content: '3) this is "now" a test.' }] },
              ],
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

  it('should highlight match when hits are available', () => {
    const hits: Hit[] = [
      {
        id: 1,
        index: 2,
        match: 'this',
        label: '',
        before: '',
        after: '',
        rects: [],
      },
    ];

    const result = new HtmlFormatter(sanitizer, hits).altoToHtml(alto);

    expect(result).toBe('<p>3) <mark>this</mark> is "now" a test.<p/>');
  });

  it('should highlight multiple words', () => {
    const hits: Hit[] = [
      {
        id: 1,
        index: 2,
        match: 'this',
        label: '',
        before: '',
        after: '',
        rects: [],
      },
      {
        id: 2,
        index: 3,
        match: 'test',
        label: '',
        before: '',
        after: '',
        rects: [],
      },
      {
        id: 3,
        index: 4,
        match: 'is',
        label: '',
        before: '',
        after: '',
        rects: [],
      },
    ];

    const result = new HtmlFormatter(sanitizer, hits).altoToHtml(alto);

    expect(result).toBe(
      '<p>3) <mark>this</mark> <mark>is</mark> "now" a <mark>test</mark>.<p/>'
    );
  });

  it('should highlight single letter words', () => {
    const hits: Hit[] = [
      {
        id: 1,
        index: 2,
        match: 'a',
        label: '',
        before: '',
        after: '',
        rects: [],
      },
    ];

    const result = new HtmlFormatter(sanitizer, hits).altoToHtml(alto);

    expect(result).toBe('<p>3) this is "now" <mark>a</mark> test.<p/>');
  });

  it('should highlight numbers and symbols', () => {
    const hits: Hit[] = [
      {
        id: 1,
        index: 2,
        match: '3) ',
        label: '',
        before: '',
        after: '',
        rects: [],
      },
    ];

    const result = new HtmlFormatter(sanitizer, hits).altoToHtml(alto);

    expect(result).toBe('<p><mark>3) </mark>this is "now" a test.<p/>');
  });

  it('should not highlight when no hits', () => {
    const hits: Hit[] = [];

    const result = new HtmlFormatter(sanitizer, hits).altoToHtml(alto);

    expect(result).toBe('<p>3) this is "now" a test.<p/>');
  });

  it('should highlight text when match has quotation marks', () => {
    const hits: Hit[] = [
      {
        id: 1,
        index: 2,
        match: '"now" ',
        label: '',
        before: '',
        after: '',
        rects: [],
      },
    ];

    const result = new HtmlFormatter(sanitizer, hits).altoToHtml(alto);

    expect(result).toBe('<p>3) this is "<mark>now" </mark>a test.<p/>');
  });
});
