import { Rect } from '../models/rect';
import { Utils } from '../utils';
import { CanvasGroupPositionCriteria } from './calculate-canvas-group-position-strategy';

export const canvasRectFromCriteria = (
  rotation: number,
  criteria: CanvasGroupPositionCriteria,
  x: number,
  ignorePhysicalScale: boolean,
) => {
  let rect = {};
  const scale = Utils.getScaleFactor(
    criteria.canvasSource.service?.service?.physicalScale,
    ignorePhysicalScale,
  );
  if (rotation === 90 || rotation === 270) {
    rect = {
      height: Math.trunc(criteria.canvasSource.width * scale),
      width: Math.trunc(criteria.canvasSource.height * scale),
      x: x,
      y: Math.trunc((criteria.canvasSource.width * scale) / 2) * -1,
    };
  } else {
    rect = {
      height: Math.trunc(criteria.canvasSource.height * scale),
      width: Math.trunc(criteria.canvasSource.width * scale),
      x: x,
      y: Math.trunc((criteria.canvasSource.height * scale) / 2) * -1,
    };
  }
  return new Rect(rect);
};
