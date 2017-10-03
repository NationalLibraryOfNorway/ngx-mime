import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { MimeViewerIntl } from './viewer-intl';

@Injectable()
export class MimeViewerIntlNoNb extends MimeViewerIntl {
  changes: Subject<void> = new Subject<void>();

  close = 'Åpne';
  attribution = 'Tillatelse';
  contents = 'Innhold';
  metadata = 'Metadata';
  license = 'Lisens';
  fullScreen = 'Fullskjerm';
  exitFullScreen = 'Avslutt fullskjerm';
  zoomIn = 'Zoom inn';
  zoomOut = 'Zoom ut';
  previousPage = 'Forrige side';
  nextPage = 'Neste side';
  home = 'Hjem';
  search = 'Søk';
  previousHitLabel = 'Forrige treff';
  nextHitLabel = 'Neste treff';

  // ERRORS
  somethingHasGoneWrongLabel = 'Å nei! Noe har gått galt...';
  manifestUriMissingLabel = 'Lenke til manifest mangler';
  manifestNotValidLabel = 'Manifestet er ikke gyldig';

  noResultsFoundLabel = (q: string) => {
    return `Ingen treff funnet for <em class="current-search">${q}</em>`;
  }

  resultsFoundLabel = (numberOfHits: number, q: string) => {
    return `${numberOfHits} treff funnet for <em class="current-search">${q}</em>`;
  }

  currentHitLabel = (currentHit: number, numberOfHits: number) => {
    return `${currentHit} av ${numberOfHits} treff`;
  }

}
