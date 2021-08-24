import { Injectable } from '@angular/core';
import { MimeViewerIntl } from './viewer-intl';
import { HelpIntlLt } from './help-intl.lt';

@Injectable()
export class MimeViewerIntlLt extends MimeViewerIntl {
  help = new HelpIntlLt();
  closeLabel = 'Uždaryti';
  attributionLabel = 'Teisių priskyrimas';
  attributonCloseAriaLabel = 'Uždaryti teisių priskyrimo langą';
  recognizedTextLabel = 'Atpazīts teksts';
  contentsLabel = 'Informacija apie objektą';
  twoPageViewLabel = 'Atvaizduoti po du puslapius';
  singlePageViewLabel = 'Atvaizduoti po vieną puslapį';
  metadataLabel = 'Metaduomenys';
  licenseLabel = 'Licencija';
  tocLabel = 'Turinys';
  fullScreenLabel = 'Pilno ekrano režimas';
  exitFullScreenLabel = 'Išeiti iš pilno ekrano režimo';
  zoomInLabel = 'Priartinti';
  zoomOutLabel = 'Atitolinti';
  previousPageLabel = 'Buvęs puslapis';
  nextPageLabel = 'Kitas puslapis';
  homeLabel = 'Grįžti į pradžią';
  rotateCwLabel = 'Pasukti 90°';
  searchLabel = 'Paieška';
  clearSearchLabel = 'Išvalyti';
  previousHitLabel = 'Buvęs rezultatas';
  nextHitLabel = 'Kitas rezultatas';
  goToPageLabel = 'Persikelti į puslapį';
  currentPageLabel = 'Dabartinis puslapis';
  enterPageNumber = 'Įveskite puslapio numerį';
  dropDisabled = 'Atleiskite, bet veiksmas negalimas';
  loading = 'Pakrovimas ...';

  // ERRORS
  somethingHasGoneWrongLabel = 'Objekto atvaizduoti nepavyko...';
  manifestUriMissingLabel = 'Nerastas objektų sąrašo identifikatorius (ManifestUri)';
  manifestNotValidLabel = 'Netinkamas objektų sąrašas (Manifest)';
  pageDoesNotExists = 'Nepavyko rasti šio paslapio';
  textErrorLabel = 'Atsiprašau, nerandu jums teksto';

  noResultsFoundLabel = (q: string) => {
    return `Objekte nerasta atitikmenų <em class="current-search">${q}</em>`;
  };

  resultsFoundLabel = (numberOfHits: number, q: string) => {
    return `${numberOfHits} rezultata${numberOfHits === 1 ? 's' : 'i'} su <em class="current-search">${q}</em>`;
  };
  currentHitLabel = (currentHit: number, numberOfHits: number) => {
    return `${currentHit} iš ${numberOfHits} atitikmenų`;
  };
}
