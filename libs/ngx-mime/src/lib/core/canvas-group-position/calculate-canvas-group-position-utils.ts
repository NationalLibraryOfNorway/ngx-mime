import { Rect } from '../models/rect';
import { CanvasGroupPositionCriteria } from './calculate-canvas-group-position-strategy';

export const canvasRectFromCriteria = (
  rotation: number,
  criteria: CanvasGroupPositionCriteria,
  x: number
) => {
  let rect = {};
  if (rotation === 90 || rotation === 270) {
    rect = {
      height: criteria.canvasSource.width,
      width: criteria.canvasSource.height,
      x: x,
      y: (criteria.canvasSource.width / 2) * -1,
    };
  } else {
    rect = {
      height: criteria.canvasSource.height,
      width: criteria.canvasSource.width,
      x: x,
      y: (criteria.canvasSource.height / 2) * -1,
    };
  }
  return new Rect(rect);
};
