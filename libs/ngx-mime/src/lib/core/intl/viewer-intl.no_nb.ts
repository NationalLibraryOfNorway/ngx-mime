import { Injectable } from '@angular/core';
import { MimeViewerIntl } from './viewer-intl';
import { HelpIntlNoNb } from './help-intl.no_nb';

@Injectable()
export class MimeViewerIntlNoNb extends MimeViewerIntl {
  override help = new HelpIntlNoNb();
  override closeLabel = 'Lukk';
  override attributionLabel = 'Tillatelse';
  override attributonCloseAriaLabel = 'Steng tillatelse dialog';
  override helpCloseAriaLabel = 'Steng hjelp dialog';
  override informationLabel = 'Opplysninger';
  override layoutMenuLabel = 'Visning';
  override pageLayoutLabel = 'Sideoppsett';
  override singlePageViewLabel = 'Enkeltsider';
  override digitalTextLabel = 'Digital tekst';
  override twoPageViewLabel = 'To sider';
  override recognizedTextContentCloseLabel = 'Ingen';
  override recognizedTextContentInSplitViewLabel = 'Delt';
  override showRecognizedTextContentLabel = 'Kun digital tekst';
  override metadataLabel = 'Metadata';
  override licenseLabel = 'Lisens';
  override tocLabel = 'Innholdsfortegnelse';
  override fullScreenLabel = 'Fullskjerm';
  override exitFullScreenLabel = 'Avslutt fullskjerm';
  override openOsdControlPanelLabel = 'Åpne kontrollpanel';
  override closeOsdControlPanelLabel = 'Lukk kontrollpanel';
  override zoomInLabel = 'Zoom inn';
  override zoomOutLabel = 'Zoom ut';
  override resetZoomLabel = 'Nullstill zoom';
  override previousPageLabel = 'Forrige side';
  override nextPageLabel = 'Neste side';
  override rotateCwLabel = 'Rotér 90°';
  override searchLabel = 'Søk';
  override clearSearchLabel = 'Tøm';
  override previousHitLabel = 'Forrige treff';
  override nextHitLabel = 'Neste treff';
  override goToPageLabel = 'Gå til side';
  override currentPageLabel = 'Nåværende side';
  override enterPageNumber = 'Skriv inn sidenummer';
  override dropDisabled = 'Beklager, men drag and drop er ikke aktivert';
  override loading = 'Laster ...';
  override rotationIsNotSupported = 'Rotasjon støttes ikke av enheten din';

  // ERRORS
  override somethingHasGoneWrongLabel = 'Å nei! Noe har gått galt...';
  override manifestUriMissingLabel = 'Lenke til manifest mangler';
  override manifestNotValidLabel = 'Manifestet er ikke gyldig';
  override pageDoesNotExists = 'Beklager, men den siden finnes ikke';
  override textContentErrorLabel =
    'Beklager, men jeg finner ikke teksten for deg';

  override noResultsFoundLabel = (q: string) => {
    return `Ingen treff funnet for <em class="current-search">${q}</em>`;
  };

  override resultsFoundLabel = (numberOfHits: number, q: string) => {
    return `${numberOfHits} treff funnet for <em class="current-search">${q}</em>`;
  };

  override currentHitLabel = (currentHit: number, numberOfHits: number) => {
    return `${currentHit} av ${numberOfHits} treff`;
  };
}
