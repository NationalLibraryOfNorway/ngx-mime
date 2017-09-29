import { SwipeDragEndCounter } from './swipe-drag-end-counter';


describe('SwipeDragEndCounter ', () => {

  let counter: SwipeDragEndCounter;

  beforeEach(() => {
    counter = new SwipeDragEndCounter();
  });

  it('should be no hits initially', () => {
    expect(counter.leftCount).toBe(0);
  });


  it('should increment on left/right-hits', () => {
    counter.addHit('left', 'right');
    expect(counter.leftCount).toBe(1);
    counter.addHit('left', 'right');
    expect(counter.leftCount).toBe(2);
    counter.addHit('right', 'left');
    expect(counter.rightCount).toBe(1);
    counter.addHit('right', 'left');
    expect(counter.rightCount).toBe(2);
  });

  it('should not increment when side is not left/right', () => {
    counter.addHit('up', undefined);
    expect(counter.leftCount).toBe(0);
    expect(counter.rightCount).toBe(0);
    counter.addHit(undefined, undefined);
    expect(counter.leftCount).toBe(0);
    expect(counter.rightCount).toBe(0);
  });

  it('should reset counter of opposite side when incrementing a side', () => {
    counter.addHit('left', undefined);
    expect(counter.leftCount).toBe(1);
    expect(counter.rightCount).toBe(0);

    counter.addHit('right', undefined);
    expect(counter.leftCount).toBe(0);
    expect(counter.rightCount).toBe(1);


    counter.addHit('right', undefined);
    expect(counter.leftCount).toBe(0);
    expect(counter.rightCount).toBe(2);
  });


  it('should return true when one of the counts are 2', () => {
    counter.addHit('left', undefined);
    counter.addHit('left', undefined);
    expect(counter.hitCountReached()).toBe(true);
    counter.reset();
    expect(counter.hitCountReached()).toBe(false);
    counter.addHit('right', undefined);
    counter.addHit('right', undefined);
    expect(counter.hitCountReached()).toBe(true);
  });

  it('should clear counter of opposite side of dragging direction', () => {

    counter.addHit('left', undefined);
    expect(counter.leftCount).toBe(1);

    counter.addHit(undefined, 'right');
    expect(counter.rightCount).toBe(0);

    counter.addHit('right', undefined);
    expect(counter.rightCount).toBe(1);

    counter.addHit(undefined, 'left');
    expect(counter.leftCount).toBe(0);
  });

});
