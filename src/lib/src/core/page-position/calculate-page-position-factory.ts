import { CalculatePagePositionStrategy } from './calculate-page-position-strategy';
import { OnePageCalculatePagePositionStrategy } from './one-page-calculate-page-position-strategy';
import { TwoPageCalculatePagePositionStrategy } from './two-page-calculate-page-position-strategy';
import { View } from '../models/view';

export class CalculatePagePositionFactory {

  public static create(view: View, paged: boolean): CalculatePagePositionStrategy {
    if (view === View.ONE_PAGE || !paged) {
      return new OnePageCalculatePagePositionStrategy();
    } else if (view === View.TWO_PAGE) {
      return new TwoPageCalculatePagePositionStrategy();
    }
  }
}
