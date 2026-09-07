import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Hit } from './../../core/models/hit';
import { HighlightService } from './highlight.service';

@Component({
  template: `
    <div id="viewer-1">
      <mark class="selectedHit" data-id="0">previous</mark>
      <mark data-id="1">first copy</mark>
      <mark data-id="1">second copy</mark>
    </div>
    <div id="viewer-2">
      <mark class="selectedHit" data-id="0">other previous</mark>
      <mark data-id="1">other viewer</mark>
    </div>
  `,
})
export class TestHostComponent {}

describe('HighlightService', () => {
  let highlightService: HighlightService;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighlightService],
    });
    highlightService = TestBed.inject(HighlightService);
    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should be created', () => {
    expect(highlightService).toBeTruthy();
  });

  it('should highlight text when match has quotation marks', () => {
    expect(
      highlightService.highlight('this "is" a test.', 0, [
        createMockHit(1, '"is" '),
      ]),
    ).toEqual('this "<mark data-id="1">is" </mark>a test.');
  });

  it('should not highlight when no hits', () => {
    expect(highlightService.highlight('this is a test.', 0, undefined)).toEqual(
      'this is a test.',
    );
  });

  it('should highlight numbers and symbols', () => {
    expect(
      highlightService.highlight('2) this is a test.', 0, [
        createMockHit(1, '2) '),
      ]),
    ).toEqual('<mark data-id="1">2) </mark>this is a test.');
  });

  it('should highlight single letters', () => {
    expect(
      highlightService.highlight('this is a test today.', 0, [
        createMockHit(1, 'a '),
      ]),
    ).toEqual('this is <mark data-id="1">a </mark>test today.');
  });

  it('should highlight multiple words', () => {
    const hits: Hit[] = [
      createMockHit(1, 'this '),
      createMockHit(2, 'is '),
      createMockHit(3, 'a '),
    ];

    expect(highlightService.highlight('this is a test.', 0, hits)).toEqual(
      '<mark data-id="1">this </mark><mark data-id="2">is </mark><mark data-id="3">a </mark>test.',
    );
  });

  it('should select all matching hits within the specified viewer', async () => {
    await fixture.whenStable();

    highlightService.highlightSelectedHit('viewer-1', 1);

    const selectedMarks = fixture.debugElement.queryAll(
      By.css('#viewer-1 mark.selectedHit[data-id="1"]'),
    );
    const previousMark: DebugElement = fixture.debugElement.query(
      By.css('#viewer-1 mark[data-id="0"]'),
    );
    const otherViewerPreviousMark: DebugElement = fixture.debugElement.query(
      By.css('#viewer-2 mark.selectedHit[data-id="0"]'),
    );
    const otherViewerHit: DebugElement = fixture.debugElement.query(
      By.css('#viewer-2 mark[data-id="1"]'),
    );

    expect(selectedMarks).toHaveLength(2);
    expect(previousMark.nativeElement.classList).not.toContain('selectedHit');
    expect(otherViewerPreviousMark).not.toBeNull();
    expect(otherViewerHit.nativeElement.classList).not.toContain('selectedHit');
  });

  function createMockHit(id: number, match: string): Hit {
    return {
      id,
      index: 0,
      match,
      label: '',
      before: '',
      after: '',
      highlightRects: [],
    };
  }
});
