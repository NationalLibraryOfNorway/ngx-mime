import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { MimeViewerIntl } from './viewer-intl';

@Injectable()
export class MimeViewerIntlNoNb extends MimeViewerIntl {
  closeLabel = 'Lukk';
  attributionLabel = 'Tillatelse';
  contentsLabel = 'Innhold';
  twoPageViewLabel = 'Tosidevisning';
  singlePageViewLabel = 'Enkeltsidevisning';
  metadataLabel = 'Metadata';
  licenseLabel = 'Lisens';
  tocLabel = 'Innholdsfortegnelse';
  fullScreenLabel = 'Fullskjerm';
  exitFullScreenLabel = 'Avslutt fullskjerm';
  zoomInLabel = 'Zoom inn';
  zoomOutLabel = 'Zoom ut';
  previousPageLabel = 'Forrige side';
  nextPageLabel = 'Neste side';
  homeLabel = 'Hjem';
  searchLabel = 'Søk';
  clearSearchLabel = 'Tøm';
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
