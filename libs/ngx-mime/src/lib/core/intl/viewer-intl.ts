import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HelpIntl } from './help-intl';

@Injectable()
export class MimeViewerIntl {
  changes: Subject<void> = new Subject<void>();

  help: HelpIntl = new HelpIntl();
  closeLabel = 'Close';
  attributionLabel = 'Attribution';
  attributonCloseAriaLabel = 'Close attribution dialog';
  contentsLabel = 'Contents';
  layoutMenuLabel = 'View'
  pageLayoutLabel = "Page layout";
  singlePageViewLabel = 'Single pages';
  twoPageViewLabel = 'Two pages';
  digitalTextLabel = "Digital text";
  hideRecognizedTextContentLabel = 'None';
  recognizedTextContentInSideNavLabel = 'Split';
  showRecognizedTextContentLabel = 'Digital text only';
  metadataLabel = 'Metadata';
  licenseLabel = 'License';
  tocLabel = 'Table of Contents';
  fullScreenLabel = 'Full screen';
  exitFullScreenLabel = 'Exit full screen';
  zoomInLabel = 'Zoom in';
  zoomOutLabel = 'Zoom out';
  previousPageLabel = 'Previous Page';
  nextPageLabel = 'Next Page';
  homeLabel = 'Go Home';
  rotateCwLabel = 'Rotate 90°';
  searchLabel = 'Search';
  clearSearchLabel = 'Clear';
  previousHitLabel = 'Previous Hit';
  nextHitLabel = 'Next Hit';
  goToPageLabel = 'Go to page';
  currentPageLabel = 'Current page';
  enterPageNumber = 'Enter page number';
  dropDisabled = 'Sorry, but drag and drop is disabled';
  loading = 'Loading ...';
  rotationIsNotSupported = 'Rotation is not supported by your device';

  // ERRORS
  somethingHasGoneWrongLabel = 'Oh dear, something has gone terribly wrong...';
  manifestUriMissingLabel = 'ManifestUri is missing';
  manifestNotValidLabel = 'Manifest is not valid';
  pageDoesNotExists = 'Sorry, that page does not exist';
  textContentErrorLabel = `Oh dear, i can't find the text for you`;

  noResultsFoundLabel = (q: string) => {
    return `No results found for <em class="current-search">${q}</em>`;
  };

  resultsFoundLabel = (numberOfHits: number, q: string) => {
    return `${numberOfHits} results found for <em class="current-search">${q}</em>`;
  };

  currentHitLabel = (currentHit: number, numberOfHits: number) => {
    return `${currentHit} of ${numberOfHits} hits`;
  };
}
