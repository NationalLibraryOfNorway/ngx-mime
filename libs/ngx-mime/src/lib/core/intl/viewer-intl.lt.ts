import { Injectable } from '@angular/core';
import { HelpIntlLt } from './help-intl.lt';
import { MimeViewerIntl } from './viewer-intl';

@Injectable()
export class MimeViewerIntlLt extends MimeViewerIntl {
  override help = new HelpIntlLt();
  override closeLabel = 'Uždaryti';
  override attributionLabel = 'Teisių priskyrimas';
  override attributonCloseAriaLabel = 'Uždaryti teisių priskyrimo langą';
  override helpCloseAriaLabel = 'Uždaryti pagalbos dialogo langą';
  override informationLabel = 'Informacija';
  override layoutMenuLabel = 'Žiūrėti';
  override pageLayoutLabel = 'Puslapio išdėstymas';
  override singlePageViewLabel = 'Atvaizduoti po vieną puslapį';
  override twoPageViewLabel = 'Atvaizduoti po du puslapius';
  override digitalTextLabel = 'Skaitmeninis tekstas';
  override recognizedTextContentCloseLabel = 'Nė vienas';
  override recognizedTextContentInSplitViewLabel = 'Suskaidytas';
  override showRecognizedTextContentLabel = 'Tik skaitmeninis tekstas';
  override metadataLabel = 'Metaduomenys';
  override licenseLabel = 'Licencija';
  override tocLabel = 'Turinys';
  override fullScreenLabel = 'Pilno ekrano režimas';
  override exitFullScreenLabel = 'Išeiti iš pilno ekrano režimo';
  override openOsdControlPanelAriaLabel = 'Atidarykite valdymo skydelį';
  override closeOsdControlPanelAriaLabel = 'Uždarykite valdymo skydelį';
  override zoomInLabel = 'Priartinti';
  override zoomOutLabel = 'Atitolinti';
  override resetZoomLabel = 'iš naujo nustatykite skalę';
  override previousPageLabel = 'Buvęs puslapis';
  override nextPageLabel = 'Kitas puslapis';
  override rotateCwLabel = 'Pasukti 90°';
  override searchLabel = 'Paieška';
  override clearSearchLabel = 'Išvalyti';
  override previousHitLabel = 'Buvęs rezultatas';
  override nextHitLabel = 'Kitas rezultatas';
  override goToPageLabel = 'Persikelti į puslapį';
  override currentPageLabel = 'Dabartinis puslapis';
  override enterPageNumber = 'Įveskite puslapio numerį';
  override dropDisabled = 'Atleiskite, bet veiksmas negalimas';
  override loading = 'Pakrovimas ...';
  override rotationIsNotSupported = 'Sukimas jūsų įrenginyje nepalaikomas';

  // ERRORS
  override somethingHasGoneWrongLabel = 'Objekto atvaizduoti nepavyko...';
  override manifestUriMissingLabel =
    'Nerastas objektų sąrašo identifikatorius (ManifestUri)';
  override manifestNotValidLabel = 'Netinkamas objektų sąrašas (Manifest)';
  override pageDoesNotExists = 'Nepavyko rasti šio paslapio';
  override textContentErrorLabel = 'Atsiprašau, bet nerandu jums teksto';

  override noResultsFoundLabel = (q: string) => {
    return `Objekte nerasta atitikmenų <em class="current-search">${q}</em>`;
  };

  override resultsFoundLabel = (numberOfHits: number, q: string) => {
    return `${numberOfHits} rezultata${
      numberOfHits === 1 ? 's' : 'i'
    } su <em class="current-search">${q}</em>`;
  };
  override currentHitLabel = (currentHit: number, numberOfHits: number) => {
    return `${currentHit} iš ${numberOfHits} atitikmenų`;
  };
}
