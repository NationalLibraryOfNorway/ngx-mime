import { TestBed, inject } from '@angular/core/testing';
import { HighlightService } from './highlight.service';
import { Hit } from './../../core/models/hit';

describe('HighlightService', () => {
  let highlightService: HighlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighlightService],
    });
    highlightService = TestBed.inject(HighlightService);
  });

  it('should be created', inject(
    [HighlightService],
    (service: HighlightService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should highlight text when match has quotation marks', () => {
    const hits: Hit[] = [
      {
        id: 1,
        index: 0,
        match: '"en" ',
        label: '',
        before: '',
        after: '',
        rects: [],
      },
    ];

    expect(highlightService.highlight('dette er "en" test.', 0, hits)).toEqual(
      'dette er "<mark data-id="1">en" </mark>test.'
    );
  });

  it('should not highlight when no hits', () => {
    expect(
      highlightService.highlight('dette er en test.', 0, undefined)
    ).toEqual('dette er en test.');
  });

  it('should highlight numbers and symbols', () => {
    const hits: Hit[] = [
      {
        id: 1,
        index: 0,
        match: '2) ',
        label: '',
        before: '',
        after: '',
        rects: [],
      },
    ];
    expect(highlightService.highlight('2) dette er en test.', 0, hits)).toEqual(
      '<mark data-id="1">2) </mark>dette er en test.'
    );
  });

  it('should highlight single letters', () => {
    const hits: Hit[] = [
      {
        id: 1,
        index: 0,
        match: 'i ',
        label: '',
        before: '',
        after: '',
        rects: [],
      },
    ];
    expect(
      highlightService.highlight('dette er en test i dag.', 0, hits)
    ).toEqual('dette er en test <mark data-id="1">i </mark>dag.');
  });

  it('should highlight multiple words', () => {
    const hits: Hit[] = [
      {
        id: 1,
        index: 0,
        match: 'dette ',
        label: '',
        before: '',
        after: '',
        rects: [],
      },
      {
        id: 2,
        index: 0,
        match: 'er ',
        label: '',
        before: '',
        after: '',
        rects: [],
      },
      {
        id: 3,
        index: 0,
        match: 'en ',
        label: '',
        before: '',
        after: '',
        rects: [],
      },
    ];
    expect(highlightService.highlight('dette er en test.', 0, hits)).toEqual(
      '<mark data-id="1">dette </mark><mark data-id="2">er </mark><mark data-id="3">en </mark>test.'
    );
  });
});
