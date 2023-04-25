import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightService } from './highlight.service';
import { Hit } from './../../core/models/hit';

@Component({
  template: `<mark data-id="1">this </mark>`,
})
export class TestHostComponent {}

describe('HighlightService', () => {
  let component: TestHostComponent;
  let highlightService: HighlightService;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighlightService],
    });
    highlightService = TestBed.inject(HighlightService);
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(highlightService).toBeTruthy();
  });

  it('should highlight text when match has quotation marks', () => {
    expect(
      highlightService.highlight('this "is" a test.', 0, [
        createMockHit(1, '"is" '),
      ])
    ).toEqual('this "<mark data-id="1">is" </mark>a test.');
  });

  it('should not highlight when no hits', () => {
    expect(highlightService.highlight('this is a test.', 0, undefined)).toEqual(
      'this is a test.'
    );
  });

  it('should highlight numbers and symbols', () => {
    expect(
      highlightService.highlight('2) this is a test.', 0, [
        createMockHit(1, '2) '),
      ])
    ).toEqual('<mark data-id="1">2) </mark>this is a test.');
  });

  it('should highlight single letters', () => {
    expect(
      highlightService.highlight('this is a test today.', 0, [
        createMockHit(1, 'a '),
      ])
    ).toEqual('this is <mark data-id="1">a </mark>test today.');
  });

  it('should highlight multiple words', () => {
    const hits: Hit[] = [
      createMockHit(1, 'this '),
      createMockHit(2, 'is '),
      createMockHit(3, 'a '),
    ];

    expect(highlightService.highlight('this is a test.', 0, hits)).toEqual(
      '<mark data-id="1">this </mark><mark data-id="2">is </mark><mark data-id="3">a </mark>test.'
    );
  });

  it('should add selectedHit class to selected hit', () => {
    highlightService.highlightSelectedHit(1);

    const mark: DebugElement = fixture.debugElement.query(
      By.css('mark[data-id="1"]')
    );
    expect(mark.nativeElement.innerHTML).toBe('this ');
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
