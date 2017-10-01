import { Direction } from '../models/direction';
import { Side } from '../models/side';
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
    counter.addHit(Side.LEFT, Direction.RIGHT);
    expect(counter.leftCount).toBe(1);
    counter.addHit(Side.LEFT, Direction.RIGHT);
    expect(counter.leftCount).toBe(2);
    counter.addHit(Side.RIGHT, Direction.LEFT);
    expect(counter.rightCount).toBe(1);
    counter.addHit(Side.RIGHT, Direction.LEFT);
    expect(counter.rightCount).toBe(2);
  });

  it('should not increment when side is not left/right', () => {
    counter.addHit(Side.TOP, undefined);
    expect(counter.leftCount).toBe(0);
    expect(counter.rightCount).toBe(0);
    counter.addHit(undefined, undefined);
    expect(counter.leftCount).toBe(0);
    expect(counter.rightCount).toBe(0);
  });

  it('should reset counter of opposite side when incrementing a side', () => {
    counter.addHit(Side.LEFT, undefined);
    expect(counter.leftCount).toBe(1);
    expect(counter.rightCount).toBe(0);

    counter.addHit(Side.RIGHT, undefined);
    expect(counter.leftCount).toBe(0);
    expect(counter.rightCount).toBe(1);


    counter.addHit(Side.RIGHT, undefined);
    expect(counter.leftCount).toBe(0);
    expect(counter.rightCount).toBe(2);
  });


  it('should return true when one of the counts are 2', () => {
    counter.addHit(Side.LEFT, undefined);
    counter.addHit(Side.LEFT, undefined);
    expect(counter.hitCountReached()).toBe(true);
    counter.reset();
    expect(counter.hitCountReached()).toBe(false);
    counter.addHit(Side.RIGHT, undefined);
    counter.addHit(Side.RIGHT, undefined);
    expect(counter.hitCountReached()).toBe(true);
  });

  it('should clear counter of opposite side of dragging direction', () => {

    counter.addHit(Side.LEFT, undefined);
    expect(counter.leftCount).toBe(1);

    counter.addHit(undefined, Direction.RIGHT);
    expect(counter.rightCount).toBe(0);

    counter.addHit(Side.RIGHT, undefined);
    expect(counter.rightCount).toBe(1);

    counter.addHit(undefined, Direction.LEFT);
    expect(counter.leftCount).toBe(0);
  });

});
