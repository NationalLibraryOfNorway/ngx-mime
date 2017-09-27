import { SwipeDragEndCounter } from './swipe-drag-end-counter';


describe('SwipeDragEndCounter ', () => {

  it('should be no hits initially', () => {
    const counter = new SwipeDragEndCounter();
    expect(counter.leftCount).toBe(0);
  });


  it('should increment on left/right-hits', () => {
    const counter = new SwipeDragEndCounter();
    counter.addHit('left');
    expect(counter.leftCount).toBe(1);
    counter.addHit('left');
    expect(counter.leftCount).toBe(2);
    counter.addHit('right');
    expect(counter.rightCount).toBe(1);
    counter.addHit('right');
    expect(counter.rightCount).toBe(2);
  });

  it('should not increment when side is not left/right', () => {
    const counter = new SwipeDragEndCounter();
    counter.addHit('up');
    expect(counter.leftCount).toBe(0);
    expect(counter.rightCount).toBe(0);
    counter.addHit(undefined);
    expect(counter.leftCount).toBe(0);
    expect(counter.rightCount).toBe(0);
  });


  it('should return true when one of the counts are 2', () => {
    const counter = new SwipeDragEndCounter();
    counter.addHit('left');
    counter.addHit('left');
    expect(counter.shouldSwitchPage()).toBe(true);
    counter.reset();
    expect(counter.shouldSwitchPage()).toBe(false);
    counter.addHit('right');
    counter.addHit('right');
    expect(counter.shouldSwitchPage()).toBe(true);
  });

});
