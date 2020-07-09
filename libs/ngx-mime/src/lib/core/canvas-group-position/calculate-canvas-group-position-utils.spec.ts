import { Rect } from '../models/rect';
import { CanvasGroupPositionCriteria } from './calculate-canvas-group-position-strategy';

import { canvasRectFromCriteria } from './calculate-canvas-group-position-utils';

import { ViewerOptions } from '../models/viewer-options';
import { ViewingDirection } from '../models/viewing-direction';
import { Service } from '../models/manifest';

describe('canvasRectFromCriteria', () => {
  const canvasGroupsPositionCriteria = {
    canvasGroupIndex: 0,
    canvasSource: new Service({ width: 100, height: 200 }),
    viewingDirection: ViewingDirection.LTR
  };

  it('should return Rect', () => {
    const canvasRect = canvasRectFromCriteria(
      0,
      canvasGroupsPositionCriteria,
      10
    );

    expect(canvasRect).toEqual(
      new Rect({ x: 10, y: -100, width: 100, height: 200 })
    );
  });

  it('should rotate 90 degrees', () => {
    const canvasRect = canvasRectFromCriteria(
      90,
      canvasGroupsPositionCriteria,
      10
    );

    expect(canvasRect).toEqual(
      new Rect({ x: 10, y: -50, width: 200, height: 100 })
    );
  });

  it('should rotate 180 degrees', () => {
    const canvasRect = canvasRectFromCriteria(
      180,
      canvasGroupsPositionCriteria,
      10
    );

    expect(canvasRect).toEqual(
      new Rect({ x: 10, y: -100, width: 100, height: 200 })
    );
  });

  it('should rotate 270 degrees', () => {
    const canvasRect = canvasRectFromCriteria(
      270,
      canvasGroupsPositionCriteria,
      10
    );

    expect(canvasRect).toEqual(
      new Rect({ x: 10, y: -50, width: 200, height: 100 })
    );
  });
  it('should rotate 360 degrees', () => {
    const canvasRect = canvasRectFromCriteria(
      360,
      canvasGroupsPositionCriteria,
      10
    );

    expect(canvasRect).toEqual(
      new Rect({ x: 10, y: -100, width: 100, height: 200 })
    );
  });
});
