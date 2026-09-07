import { ClickService } from './click.service';

describe('ClickService', () => {
  let service: ClickService;
  let singleClickCounter: number;
  let doubleClickCounter: number;
  let event: any;

  beforeEach(() => {
    jest.useFakeTimers();
    event = {
      quick: true,
      tracker: { dblClickTimeThreshold: 300 },
      preventDefaultAction: false,
    };
    singleClickCounter = 0;
    doubleClickCounter = 0;
    service = new ClickService();
    service.addSingleClickHandler(() => {
      singleClickCounter++;
    });
    service.addDoubleClickHandler(() => {
      doubleClickCounter++;
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('clickcounters should start on 0 after setup', () => {
    expect(singleClickCounter).toBe(0);
    expect(doubleClickCounter).toBe(0);
  });

  it('only singleClickCounter should increase to 1 aftere one click', () => {
    service.click(event);
    jest.advanceTimersByTime(event.tracker.dblClickTimeThreshold);

    expect(singleClickCounter).toBe(1);
    expect(doubleClickCounter).toBe(0);
  });

  it('only doubleClickCounter should increase to 1 aftere double click', () => {
    service.click(event);
    service.click(event);

    // We don't need to tick/wait for timer to end. A double click will clear the timeout
    expect(singleClickCounter).toBe(0);
    expect(doubleClickCounter).toBe(1);
  });

  it('only singleClickCounter should increase to 2 aftere two clicks', () => {
    service.click(event);
    jest.advanceTimersByTime(event.tracker.dblClickTimeThreshold);
    service.click(event);
    jest.advanceTimersByTime(event.tracker.dblClickTimeThreshold);

    expect(singleClickCounter).toBe(2);
    expect(doubleClickCounter).toBe(0);
  });

  it("both clickCounters should remain at 0 after 'slow' clicks", () => {
    event.quick = false;

    service.click(event);
    jest.advanceTimersByTime(event.tracker.dblClickTimeThreshold);
    expect(singleClickCounter).toBe(0);
    service.click(event);
    service.click(event);

    expect(singleClickCounter).toBe(0);
  });
});
