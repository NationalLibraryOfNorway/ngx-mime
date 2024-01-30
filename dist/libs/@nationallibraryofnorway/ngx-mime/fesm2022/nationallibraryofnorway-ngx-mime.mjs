import * as i0 from '@angular/core';
import { Injectable, ElementRef, Component, ViewChild, ViewChildren, ChangeDetectionStrategy, EventEmitter, Output, Input, HostListener, NgModule, ViewContainerRef, HostBinding } from '@angular/core';
import { Subject, BehaviorSubject, Observable, Subscription, forkJoin, of, throwError, ReplaySubject, interval, debounceTime as debounceTime$1, map } from 'rxjs';
import * as d3 from 'd3';
import * as OpenSeadragon$1 from 'openseadragon';
import * as i1$1 from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import * as i8 from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { distinctUntilChanged, finalize, take, debounceTime, catchError, switchMap, filter, tap, sample, throttle } from 'rxjs/operators';
import * as i2 from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import * as i6 from '@angular/platform-browser';
import { parseString } from 'xml2js';
import * as i1 from '@angular/cdk/layout';
import { Breakpoints } from '@angular/cdk/layout';
import * as i6$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2$1 from '@angular/forms';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i8$1 from '@angular/material/toolbar';
import { MatToolbarModule } from '@angular/material/toolbar';
import * as i8$2 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i9 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i10 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i14 from '@angular/material/divider';
import * as i15 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i16 from '@angular/material/form-field';
import * as i17 from '@angular/material/progress-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import * as i11 from '@angular/material/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import * as i10$1 from '@angular/material/button-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import * as i2$2 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as i21 from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import * as i13 from '@angular/material/slider';
import { MatSliderModule } from '@angular/material/slider';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i9$1 from '@angular/cdk/bidi';
import * as i18 from '@angular/cdk/platform';

class HelpIntl {
    constructor() {
        this.helpLabel = 'Help';
        this.line1 = '<strong>ARROW LEFT</strong> or <strong>PAGE UP</strong>: Previous page';
        this.line2 = '<strong>ARROW RIGHT</strong> or <strong>PAGE DOWN</strong>: Next page';
        this.line3 = '<strong>HOME</strong>: Go to first page';
        this.line4 = '<strong>END</strong>: Go to last page';
        this.line5 = '<strong>C</strong>: Show more information about the object. (Close with <strong>ESC</strong>.)';
        this.line6 = '<strong>S</strong>: Search inside the object. (Close with <strong>ESC</strong>.)';
        this.line7 = '<strong>N</strong>: Next result';
        this.line8 = '<strong>P</strong>: Previous result';
        this.line9 = '<strong>F</strong>: Fullscreen on/off (Close with <strong>F</strong> or <strong>ESC</strong>.)';
        this.line10 = '<strong>R</strong>: Rotate 90°';
        this.line11 = '<strong>T</strong>:  Show/hide optically recognized text (for content that can be displayed).';
        this.line12 = '<strong>Shift-S</strong>: Clear text search';
    }
}

class MimeViewerIntl {
    constructor() {
        this.changes = new Subject();
        this.help = new HelpIntl();
        this.closeLabel = 'Close';
        this.attributionLabel = 'Attribution';
        this.attributonCloseAriaLabel = 'Close attribution dialog';
        this.helpCloseAriaLabel = 'Close help dialog';
        this.informationLabel = 'Information';
        this.layoutMenuLabel = 'View';
        this.pageLayoutLabel = 'Page layout';
        this.singlePageViewLabel = 'Single pages';
        this.twoPageViewLabel = 'Two pages';
        this.digitalTextLabel = 'Digital text';
        this.recognizedTextContentCloseLabel = 'None';
        this.recognizedTextContentInSplitViewLabel = 'Split';
        this.showRecognizedTextContentLabel = 'Digital text only';
        this.metadataLabel = 'Metadata';
        this.licenseLabel = 'License';
        this.tocLabel = 'Table of Contents';
        this.fullScreenLabel = 'Full screen';
        this.exitFullScreenLabel = 'Exit full screen';
        this.openOsdControlPanelLabel = 'Open control panel';
        this.closeOsdControlPanelLabel = 'Close control panel';
        this.zoomInLabel = 'Zoom in';
        this.zoomOutLabel = 'Zoom out';
        this.resetZoomLabel = 'Reset zoom';
        this.previousPageLabel = 'Previous Page';
        this.nextPageLabel = 'Next Page';
        this.rotateCwLabel = 'Rotate 90°';
        this.searchLabel = 'Search';
        this.clearSearchLabel = 'Clear';
        this.previousHitLabel = 'Previous Hit';
        this.nextHitLabel = 'Next Hit';
        this.goToPageLabel = 'Go to page';
        this.currentPageLabel = 'Current page';
        this.enterPageNumber = 'Enter page number';
        this.dropDisabled = 'Sorry, but drag and drop is disabled';
        this.loading = 'Loading ...';
        this.rotationIsNotSupported = 'Rotation is not supported by your device';
        // ERRORS
        this.somethingHasGoneWrongLabel = 'Oh dear, something has gone terribly wrong...';
        this.manifestUriMissingLabel = 'ManifestUri is missing';
        this.manifestNotValidLabel = 'Manifest is not valid';
        this.pageDoesNotExists = 'Sorry, that page does not exist';
        this.textContentErrorLabel = `Oh dear, i can't find the text for you`;
        this.noResultsFoundLabel = (q) => {
            return `No results found for <em class="current-search">${q}</em>`;
        };
        this.resultsFoundLabel = (numberOfHits, q) => {
            return `${numberOfHits} results found for <em class="current-search">${q}</em>`;
        };
        this.currentHitLabel = (currentHit, numberOfHits) => {
            return `${currentHit} of ${numberOfHits} hits`;
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeViewerIntl, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeViewerIntl }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeViewerIntl, decorators: [{
            type: Injectable
        }] });

class HelpIntlNoNb extends HelpIntl {
    constructor() {
        super(...arguments);
        this.helpLabel = 'Hjelp';
        this.line1 = '<strong>PIL VENSTRE</strong> eller <strong>PAGE UP</strong>: Gå til forrige side';
        this.line2 = '<strong>PIL HØYRE</strong> eller <strong>PAGE DOWN</strong>: Gå til neste side';
        this.line3 = '<strong>HOME</strong>: Gå til første side';
        this.line4 = '<strong>END</strong>: Gå til siste side';
        this.line5 = '<strong>C</strong>: Vis flere opplysninger om materialet. (Lukk med <strong>ESC</strong>.)';
        this.line6 = '<strong>S</strong>: Åpner søkefeltet for søk i objektet. (Lukk med <strong>ESC</strong>.)';
        this.line7 = '<strong>N</strong>: Går til neste treff i objektet';
        this.line8 = '<strong>P</strong>: Går til forrige treff i objektet';
        this.line9 = '<strong>F</strong>: Fullskjerm av og på (Lukk med <strong>F</strong> eller <strong>ESC</strong>.)';
        this.line10 = '<strong>R</strong>: Rotér 90°';
        this.line11 = '<strong>T</strong>: Vis/skjul optisk gjenkjent tekst (for innhold som kan vises).';
        this.line12 = '<strong>Shift-S</strong>: Tøm søk i tekst';
    }
}

class MimeViewerIntlNoNb extends MimeViewerIntl {
    constructor() {
        super(...arguments);
        this.help = new HelpIntlNoNb();
        this.closeLabel = 'Lukk';
        this.attributionLabel = 'Tillatelse';
        this.attributonCloseAriaLabel = 'Steng tillatelse dialog';
        this.helpCloseAriaLabel = 'Steng hjelp dialog';
        this.informationLabel = 'Opplysninger';
        this.layoutMenuLabel = 'Visning';
        this.pageLayoutLabel = 'Sideoppsett';
        this.singlePageViewLabel = 'Enkeltsider';
        this.digitalTextLabel = 'Digital tekst';
        this.twoPageViewLabel = 'To sider';
        this.recognizedTextContentCloseLabel = 'Ingen';
        this.recognizedTextContentInSplitViewLabel = 'Delt';
        this.showRecognizedTextContentLabel = 'Kun digital tekst';
        this.metadataLabel = 'Metadata';
        this.licenseLabel = 'Lisens';
        this.tocLabel = 'Innholdsfortegnelse';
        this.fullScreenLabel = 'Fullskjerm';
        this.exitFullScreenLabel = 'Avslutt fullskjerm';
        this.openOsdControlPanelLabel = 'Åpne kontrollpanel';
        this.closeOsdControlPanelLabel = 'Lukk kontrollpanel';
        this.zoomInLabel = 'Zoom inn';
        this.zoomOutLabel = 'Zoom ut';
        this.resetZoomLabel = 'Nullstill zoom';
        this.previousPageLabel = 'Forrige side';
        this.nextPageLabel = 'Neste side';
        this.rotateCwLabel = 'Rotér 90°';
        this.searchLabel = 'Søk';
        this.clearSearchLabel = 'Tøm';
        this.previousHitLabel = 'Forrige treff';
        this.nextHitLabel = 'Neste treff';
        this.goToPageLabel = 'Gå til side';
        this.currentPageLabel = 'Nåværende side';
        this.enterPageNumber = 'Skriv inn sidenummer';
        this.dropDisabled = 'Beklager, men drag and drop er ikke aktivert';
        this.loading = 'Laster ...';
        this.rotationIsNotSupported = 'Rotasjon støttes ikke av enheten din';
        // ERRORS
        this.somethingHasGoneWrongLabel = 'Å nei! Noe har gått galt...';
        this.manifestUriMissingLabel = 'Lenke til manifest mangler';
        this.manifestNotValidLabel = 'Manifestet er ikke gyldig';
        this.pageDoesNotExists = 'Beklager, men den siden finnes ikke';
        this.textContentErrorLabel = 'Beklager, men jeg finner ikke teksten for deg';
        this.noResultsFoundLabel = (q) => {
            return `Ingen treff funnet for <em class="current-search">${q}</em>`;
        };
        this.resultsFoundLabel = (numberOfHits, q) => {
            return `${numberOfHits} treff funnet for <em class="current-search">${q}</em>`;
        };
        this.currentHitLabel = (currentHit, numberOfHits) => {
            return `${currentHit} av ${numberOfHits} treff`;
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeViewerIntlNoNb, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeViewerIntlNoNb }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeViewerIntlNoNb, decorators: [{
            type: Injectable
        }] });

class HelpIntlLt extends HelpIntl {
    constructor() {
        super(...arguments);
        this.helpLabel = 'Pagalba';
        this.line1 = '<strong>RODYKLĖ KAIRĖN</strong> arba <strong>PAGE UP</strong>: Buvęs puslapis';
        this.line2 = '<strong>RODYKLĖ DEŠINĖN</strong> arba <strong>PAGE DOWN</strong>: Kitas puslapis';
        this.line3 = '<strong>HOME</strong>: Pirmas puslapis';
        this.line4 = '<strong>END</strong>: Paskutinis puslapis';
        this.line5 = '<strong>C</strong>: Rodyti daugiau informacijos apie objektą. (Uždarykite su <strong>ESC</strong>.)';
        this.line6 = '<strong>S</strong>: Paieška objekto viduje. (Uždarykite su <strong>ESC</strong>.)';
        this.line7 = '<strong>N</strong>: Kitas rezultatas';
        this.line8 = '<strong>P</strong>: Buvęs rezultatas';
        this.line9 = '<strong>F</strong>: Pilno ekrano režimas (Uždarykite su <strong>F</strong> arba <strong>ESC</strong>.)';
        this.line10 = '<strong>R</strong>: Pasukti 90 laipsnių';
        this.line11 = '<strong>T</strong>:  Rodyti/slėpti optiškai atpažįstamą tekstą (turiniui, kurį galima rodyti).';
        this.line12 = '<strong>Shift-S</strong>: Ištuštinkite teksto paiešką';
    }
}

class MimeViewerIntlLt extends MimeViewerIntl {
    constructor() {
        super(...arguments);
        this.help = new HelpIntlLt();
        this.closeLabel = 'Uždaryti';
        this.attributionLabel = 'Teisių priskyrimas';
        this.attributonCloseAriaLabel = 'Uždaryti teisių priskyrimo langą';
        this.helpCloseAriaLabel = 'Uždaryti pagalbos dialogo langą';
        this.informationLabel = 'Informacija';
        this.layoutMenuLabel = 'Žiūrėti';
        this.pageLayoutLabel = 'Puslapio išdėstymas';
        this.singlePageViewLabel = 'Atvaizduoti po vieną puslapį';
        this.twoPageViewLabel = 'Atvaizduoti po du puslapius';
        this.digitalTextLabel = 'Skaitmeninis tekstas';
        this.recognizedTextContentCloseLabel = 'Nė vienas';
        this.recognizedTextContentInSplitViewLabel = 'Suskaidytas';
        this.showRecognizedTextContentLabel = 'Tik skaitmeninis tekstas';
        this.metadataLabel = 'Metaduomenys';
        this.licenseLabel = 'Licencija';
        this.tocLabel = 'Turinys';
        this.fullScreenLabel = 'Pilno ekrano režimas';
        this.exitFullScreenLabel = 'Išeiti iš pilno ekrano režimo';
        this.openOsdControlPanelLabel = 'Atidarykite valdymo skydelį';
        this.closeOsdControlPanelLabel = 'Uždarykite valdymo skydelį';
        this.zoomInLabel = 'Priartinti';
        this.zoomOutLabel = 'Atitolinti';
        this.resetZoomLabel = 'iš naujo nustatykite skalę';
        this.previousPageLabel = 'Buvęs puslapis';
        this.nextPageLabel = 'Kitas puslapis';
        this.rotateCwLabel = 'Pasukti 90°';
        this.searchLabel = 'Paieška';
        this.clearSearchLabel = 'Išvalyti';
        this.previousHitLabel = 'Buvęs rezultatas';
        this.nextHitLabel = 'Kitas rezultatas';
        this.goToPageLabel = 'Persikelti į puslapį';
        this.currentPageLabel = 'Dabartinis puslapis';
        this.enterPageNumber = 'Įveskite puslapio numerį';
        this.dropDisabled = 'Atleiskite, bet veiksmas negalimas';
        this.loading = 'Pakrovimas ...';
        this.rotationIsNotSupported = 'Sukimas jūsų įrenginyje nepalaikomas';
        // ERRORS
        this.somethingHasGoneWrongLabel = 'Objekto atvaizduoti nepavyko...';
        this.manifestUriMissingLabel = 'Nerastas objektų sąrašo identifikatorius (ManifestUri)';
        this.manifestNotValidLabel = 'Netinkamas objektų sąrašas (Manifest)';
        this.pageDoesNotExists = 'Nepavyko rasti šio paslapio';
        this.textContentErrorLabel = 'Atsiprašau, bet nerandu jums teksto';
        this.noResultsFoundLabel = (q) => {
            return `Objekte nerasta atitikmenų <em class="current-search">${q}</em>`;
        };
        this.resultsFoundLabel = (numberOfHits, q) => {
            return `${numberOfHits} rezultata${numberOfHits === 1 ? 's' : 'i'} su <em class="current-search">${q}</em>`;
        };
        this.currentHitLabel = (currentHit, numberOfHits) => {
            return `${currentHit} iš ${numberOfHits} atitikmenų`;
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeViewerIntlLt, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeViewerIntlLt }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeViewerIntlLt, decorators: [{
            type: Injectable
        }] });

class ModeChanges {
    constructor(fields) {
        if (fields) {
            this.currentValue = fields.currentValue || this.currentValue;
            this.previousValue = fields.previousValue || this.previousValue;
        }
    }
}

var RecognizedTextMode;
(function (RecognizedTextMode) {
    RecognizedTextMode["NONE"] = "NONE";
    RecognizedTextMode["ONLY"] = "ONLY";
    RecognizedTextMode["SPLIT"] = "SPLIT";
})(RecognizedTextMode || (RecognizedTextMode = {}));

var ViewerMode;
(function (ViewerMode) {
    ViewerMode[ViewerMode["DASHBOARD"] = 0] = "DASHBOARD";
    ViewerMode[ViewerMode["PAGE"] = 1] = "PAGE";
    ViewerMode[ViewerMode["PAGE_ZOOMED"] = 2] = "PAGE_ZOOMED";
    ViewerMode[ViewerMode["NAVIGATOR"] = 3] = "NAVIGATOR";
})(ViewerMode || (ViewerMode = {}));

var ViewerLayout;
(function (ViewerLayout) {
    ViewerLayout[ViewerLayout["ONE_PAGE"] = 0] = "ONE_PAGE";
    ViewerLayout[ViewerLayout["TWO_PAGE"] = 1] = "TWO_PAGE";
})(ViewerLayout || (ViewerLayout = {}));

class MimeViewerConfig {
    constructor(fields) {
        this.attributionDialogEnabled = true;
        this.attributionDialogHideTimeout = -1;
        this.navigationControlEnabled = true;
        this.initViewerMode = ViewerMode.PAGE;
        this.initViewerLayout = ViewerLayout.TWO_PAGE;
        this.withCredentials = false;
        this.loadTilesWithAjax = false;
        this.crossOriginPolicy = false;
        this.ajaxHeaders = null;
        this.preserveZoomOnCanvasGroupChange = false;
        this.startOnTopOnCanvasGroupChange = false;
        this.isDropEnabled = false;
        this.initRecognizedTextContentMode = RecognizedTextMode.NONE;
        this.ignorePhysicalScale = false;
        if (fields) {
            this.attributionDialogEnabled =
                fields.attributionDialogEnabled !== undefined
                    ? fields.attributionDialogEnabled
                    : this.attributionDialogEnabled;
            this.attributionDialogHideTimeout =
                fields.attributionDialogHideTimeout ||
                    this.attributionDialogHideTimeout;
            this.navigationControlEnabled =
                fields.navigationControlEnabled !== undefined
                    ? fields.navigationControlEnabled
                    : this.navigationControlEnabled;
            this.initViewerMode =
                fields.initViewerMode !== undefined
                    ? fields.initViewerMode
                    : this.initViewerMode;
            this.initViewerLayout =
                fields.initViewerLayout !== undefined
                    ? fields.initViewerLayout
                    : this.initViewerLayout;
            this.withCredentials =
                fields.withCredentials !== undefined
                    ? fields.withCredentials
                    : this.withCredentials;
            this.loadTilesWithAjax =
                fields.loadTilesWithAjax !== undefined
                    ? fields.loadTilesWithAjax
                    : this.loadTilesWithAjax;
            this.crossOriginPolicy =
                fields.crossOriginPolicy !== undefined
                    ? fields.crossOriginPolicy
                    : this.crossOriginPolicy;
            this.ajaxHeaders =
                fields.ajaxHeaders !== undefined
                    ? fields.ajaxHeaders
                    : this.ajaxHeaders;
            this.preserveZoomOnCanvasGroupChange =
                fields.preserveZoomOnCanvasGroupChange !== undefined
                    ? fields.preserveZoomOnCanvasGroupChange
                    : this.preserveZoomOnCanvasGroupChange;
            this.startOnTopOnCanvasGroupChange =
                fields.startOnTopOnCanvasGroupChange !== undefined
                    ? fields.startOnTopOnCanvasGroupChange
                    : this.startOnTopOnCanvasGroupChange;
            this.isDropEnabled =
                fields.isDropEnabled !== undefined
                    ? fields.isDropEnabled
                    : this.isDropEnabled;
            this.initRecognizedTextContentMode =
                fields.initRecognizedTextContentMode !== undefined
                    ? fields.initRecognizedTextContentMode
                    : this.initRecognizedTextContentMode;
            this.ignorePhysicalScale =
                fields.ignorePhysicalScale !== undefined
                    ? fields.ignorePhysicalScale
                    : this.ignorePhysicalScale;
        }
    }
}

var ViewingDirection;
(function (ViewingDirection) {
    ViewingDirection["LTR"] = "ltr";
    ViewingDirection["RTL"] = "rtl";
})(ViewingDirection || (ViewingDirection = {}));

class Manifest {
    constructor(fields) {
        this.viewingDirection = ViewingDirection.LTR;
        this.label = '';
        this.structures = [];
        if (fields) {
            this.context = fields.context || this.context;
            this.type = fields.type || this.type;
            this.id = fields.id || this.id;
            this.viewingDirection = fields.viewingDirection || this.viewingDirection;
            this.label = fields.label || this.label;
            this.metadata = fields.metadata || this.metadata;
            this.license = fields.license || this.license;
            this.logo = fields.logo || this.logo;
            this.attribution = fields.attribution || this.attribution;
            this.service = fields.service || this.service;
            this.sequences = fields.sequences || this.sequences;
            this.structures = fields.structures || this.structures;
            this.tileSource = fields.tileSource || this.tileSource;
            this.viewingHint = fields.viewingHint || this.viewingHint;
        }
    }
}
class Metadata {
    constructor(label, value) {
        this.label = label;
        this.value = value;
    }
}
class Sequence {
    constructor(fields) {
        if (fields) {
            this.id = fields.id || this.id;
            this.type = fields.type || this.type;
            this.label = fields.label || this.label;
            this.viewingHint = fields.viewingHint || this.viewingHint;
            this.canvases = fields.canvases || this.canvases;
        }
    }
}
class Canvas {
    constructor(fields) {
        if (fields) {
            this.id = fields.id || this.id;
            this.type = fields.type || this.type;
            this.label = fields.label || this.label;
            this.thumbnail = fields.thumbnail || this.thumbnail;
            this.height = fields.height || this.height;
            this.width = fields.width || this.width;
            this.images = fields.images || this.images;
            this.altoUrl = fields.altoUrl || this.altoUrl;
        }
    }
}
class Images {
    constructor(fields) {
        if (fields) {
            this.id = fields.id || this.id;
            this.type = fields.type || this.type;
            this.motivation = fields.motivation || this.motivation;
            this.resource = fields.resource || this.resource;
            this.on = fields.on || this.on;
        }
    }
}
class Resource {
    constructor(fields) {
        this.height = 0;
        this.width = 0;
        this.tileOverlap = 0;
        if (fields) {
            this.id = fields.id || this.id;
            this.type = fields.type || this.type;
            this.format = fields.format || this.format;
            this.service = fields.service || this.service;
            this.height = fields.height || this.height;
            this.width = fields.width || this.width;
            this.tileOverlap = fields.tileOverlap || this.tileOverlap;
        }
    }
}
class Service {
    constructor(fields) {
        this.width = 0;
        this.height = 0;
        if (fields) {
            this.context = fields.context || this.context;
            this.id = fields.id || this.id;
            this.protocol = fields.protocol || this.protocol;
            this.width = fields.width || this.width;
            this.height = fields.height || this.height;
            this.sizes = fields.sizes || this.sizes;
            this.tiles = fields.tiles || this.tiles;
            this.profile = fields.profile || this.profile;
            this.physicalScale = fields.physicalScale || this.physicalScale;
            this.physicalUnits = fields.physicalUnits || this.physicalUnits;
            this.service = fields.service || this.service;
        }
    }
}
class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
class Tile {
    constructor(fields) {
        if (fields) {
            this.width = fields.width || this.width;
            this.scaleFactors = fields.scaleFactors || this.scaleFactors;
        }
    }
}
class Structure {
    constructor(fields) {
        this.type = '';
        this.canvases = [];
        this.canvasIndex = 0;
        if (fields) {
            this.id = fields.id || this.id;
            this.type = fields.type || this.type;
            this.label = fields.label || this.label;
            this.canvases = fields.canvases || this.canvases;
            this.canvasIndex = fields.canvasIndex;
        }
    }
}
class TileSource {
}

class ModeService {
    constructor() {
        this.modeChanges = new ModeChanges();
        this.toggleModeSubject = new BehaviorSubject(new ModeChanges());
    }
    get onChange() {
        return this.toggleModeSubject.asObservable().pipe(distinctUntilChanged());
    }
    set mode(mode) {
        this._mode = mode;
        this.change();
    }
    get mode() {
        return this._mode;
    }
    initialize() {
        this.mode = this.config?.initViewerMode;
    }
    destroy() {
        this.mode = this.config?.initViewerMode;
    }
    setConfig(config) {
        this.config = config;
    }
    toggleMode() {
        if (this.mode === ViewerMode.DASHBOARD) {
            this.mode = ViewerMode.PAGE;
        }
        else if (this.mode === ViewerMode.PAGE ||
            this.mode === ViewerMode.PAGE_ZOOMED) {
            this.mode = ViewerMode.DASHBOARD;
        }
    }
    isPageZoomed() {
        return this.mode === ViewerMode.PAGE_ZOOMED;
    }
    change() {
        this.modeChanges.previousValue = this.modeChanges.currentValue;
        this.modeChanges.currentValue = this._mode;
        this.toggleModeSubject.next({
            ...this.modeChanges,
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ModeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ModeService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ModeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class StringsBuilder {
    withStringXml(stringXml) {
        this.stringXml = stringXml;
        return this;
    }
    build() {
        return this.stringXml
            ? this.stringXml
                .filter((string) => !string.$.SUBS_CONTENT || string.$.SUBS_TYPE === 'HypPart1')
                .map((string) => {
                return { content: string.$.SUBS_CONTENT || string.$.CONTENT };
            })
            : [];
    }
}

class TextLinesBuilder {
    constructor() {
        this.stringBuilder = new StringsBuilder();
    }
    withTextLinesXml(textLinesXml) {
        this.textLinesXml = textLinesXml;
        return this;
    }
    build() {
        return this.textLinesXml
            ? this.textLinesXml.map((textLine) => {
                return {
                    strings: this.stringBuilder.withStringXml(textLine.String).build(),
                };
            })
            : [];
    }
}

class TextBlocksBuilder {
    constructor() {
        this.textLinesBuilder = new TextLinesBuilder();
    }
    withTextBlocksXml(textBlocksXml) {
        this.textBlocksXml = textBlocksXml;
        return this;
    }
    withTextStyles(textStyles) {
        this.textStyles = textStyles;
        return this;
    }
    build() {
        return this.textBlocksXml
            ? this.textBlocksXml.map((textBlock) => {
                const styleRef = textBlock.$.STYLEREFS?.split(' ');
                let textStyle = undefined;
                if (styleRef && this.textStyles) {
                    textStyle = this.textStyles.get(styleRef[0]);
                }
                return {
                    textLines: this.textLinesBuilder
                        .withTextLinesXml(textBlock.TextLine)
                        .build(),
                    textStyle: {
                        fontStyle: textStyle?.fontStyle,
                    },
                };
            })
            : [];
    }
}

class PrintSpaceBuilder {
    withPrintSpaceXml(printSpaceXml) {
        this.printSpaceXml = printSpaceXml;
        return this;
    }
    withTextStyles(textStyles) {
        this.textStyles = textStyles;
        return this;
    }
    build() {
        let textBlocks = [];
        if (this.printSpaceXml?.$$) {
            textBlocks = this.extractTextBlocks(this.printSpaceXml.$$);
        }
        return {
            textBlocks: new TextBlocksBuilder()
                .withTextBlocksXml(textBlocks)
                .withTextStyles(this.textStyles)
                .build(),
        };
    }
    extractTextBlocks(node) {
        let blocks = [];
        node.forEach((n) => {
            if (this.isTextBlock(n)) {
                blocks = [...blocks, n];
            }
            else if (this.isComposedBlock(n)) {
                if (n.$$) {
                    blocks = [...blocks, ...this.extractTextBlocks(n.$$)];
                }
            }
        });
        return blocks;
    }
    isTextBlock(n) {
        return n['#name'] && n['#name'] === 'TextBlock';
    }
    isComposedBlock(n) {
        return n['#name'] && n['#name'] === 'ComposedBlock';
    }
}

class PageBuilder {
    constructor() {
        this.printSpaceBuilder = new PrintSpaceBuilder();
    }
    withPageXml(pageXml) {
        this.pageXml = pageXml;
        return this;
    }
    withTextStyles(textStyles) {
        this.printSpaceBuilder.withTextStyles(textStyles);
        return this;
    }
    build() {
        const topMargin = this.getFirstPrintSpace(this.pageXml.TopMargin);
        const leftMargin = this.getFirstPrintSpace(this.pageXml.LeftMargin);
        const rightMargin = this.getFirstPrintSpace(this.pageXml.RightMargin);
        const bottomMargin = this.getFirstPrintSpace(this.pageXml.BottomMargin);
        const printSpace = this.getFirstPrintSpace(this.pageXml.PrintSpace);
        return {
            topMargin: this.printSpaceBuilder.withPrintSpaceXml(topMargin).build(),
            leftMargin: this.printSpaceBuilder.withPrintSpaceXml(leftMargin).build(),
            rightMargin: this.printSpaceBuilder
                .withPrintSpaceXml(rightMargin)
                .build(),
            bottomMargin: this.printSpaceBuilder
                .withPrintSpaceXml(bottomMargin)
                .build(),
            printSpace: this.printSpaceBuilder.withPrintSpaceXml(printSpace).build(),
        };
    }
    getFirstPrintSpace(printSpace) {
        return printSpace ? printSpace[0] : undefined;
    }
}

class LayoutBuilder {
    constructor() {
        this.pageBuilder = new PageBuilder();
    }
    withLayoutXml(layoutXml) {
        this.pageBuilder.withPageXml(layoutXml.Page[0]);
        return this;
    }
    withTextStyles(textStyles) {
        this.pageBuilder.withTextStyles(textStyles);
        return this;
    }
    build() {
        return {
            page: this.pageBuilder.build(),
        };
    }
}

class StylesBuilder {
    constructor(stylesXml) {
        this.stylesXml = stylesXml;
    }
    build() {
        const textStyles = new Map();
        if (this.stylesXml.TextStyle) {
            this.stylesXml.TextStyle.forEach((textStyle) => {
                textStyles.set(textStyle.$.ID, {
                    fontStyle: textStyle.$.FONTSTYLE,
                });
            });
        }
        return textStyles;
    }
}

class AltoBuilder {
    constructor() {
        this.layoutBuilder = new LayoutBuilder();
    }
    withAltoXml(altoXml) {
        this.altoXml = altoXml;
        return this;
    }
    build() {
        if (this.altoXml.Styles) {
            this.layoutBuilder.withTextStyles(new StylesBuilder(this.altoXml.Styles[0]).build());
        }
        this.layoutBuilder.withLayoutXml(this.altoXml.Layout[0]);
        return {
            layout: this.layoutBuilder.build(),
        };
    }
}

class CanvasGroups {
    constructor() {
        this.canvasGroupRects = [];
        this.canvasRects = [];
        this.canvasesPerCanvasGroup = [];
    }
    add(rect) {
        this.canvasGroupRects.push(rect);
    }
    addRange(rects) {
        this.canvasGroupRects = rects;
    }
    get(index) {
        return { ...this.canvasGroupRects[index] };
    }
    findClosestIndex(point) {
        let i = 0;
        let lastDelta;
        if (point === null) {
            return -1;
        }
        this.canvasGroupRects.some(function (rect, index) {
            const delta = Math.abs(point.x - rect.centerX);
            if (delta >= lastDelta) {
                return true;
            }
            i = index;
            lastDelta = delta;
            return false;
        });
        return i;
    }
    length() {
        return this.canvasGroupRects.length;
    }
}

class Rect {
    constructor(fields) {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.centerX = 0;
        this.centerY = 0;
        if (fields) {
            this.x = fields.x || this.x;
            this.y = fields.y || this.y;
            this.width = fields.width || this.width;
            this.height = fields.height || this.height;
            this.centerX = this.x + this.width / 2;
            this.centerY = this.y + this.height / 2;
        }
    }
}

class OneCanvasPerCanvasGroupStrategy {
    constructor() {
        this.addAll = (canvasRects) => {
            const canvasGroups = new CanvasGroups();
            canvasGroups.addRange(canvasRects);
            canvasGroups.canvasRects = canvasRects;
            for (let i = 0; i < canvasRects.length; i++) {
                canvasGroups.canvasesPerCanvasGroup.push([i]);
            }
            return canvasGroups;
        };
    }
}
class TwoCanvasPerCanvasGroupStrategy {
    constructor() {
        this.addAll = (canvasRects) => {
            const canvasGroups = new CanvasGroups();
            // Single first page
            canvasGroups.add(canvasRects[0]);
            canvasGroups.canvasRects = canvasRects;
            canvasGroups.canvasesPerCanvasGroup.push([0]);
            for (let i = 1; i < canvasRects.length; i = i + 2) {
                if (i + 1 < canvasRects.length) {
                    // Paired pages
                    const thisRect = canvasRects[i];
                    const nextRect = canvasRects[i + 1];
                    const groupedRect = new Rect({
                        x: Math.min(thisRect.x, nextRect.x),
                        y: Math.min(thisRect.y, nextRect.y),
                        height: Math.max(thisRect.height, nextRect.height),
                        width: thisRect.width + nextRect.width,
                    });
                    canvasGroups.add(groupedRect);
                    canvasGroups.canvasesPerCanvasGroup.push([i, i + 1]);
                }
                else {
                    // Single last page, if applicable
                    canvasGroups.add(canvasRects[i]);
                    canvasGroups.canvasesPerCanvasGroup.push([i]);
                }
            }
            return canvasGroups;
        };
    }
}

class CanvasGroupStrategyFactory {
    static create(layout) {
        if (layout === ViewerLayout.ONE_PAGE) {
            return new OneCanvasPerCanvasGroupStrategy();
        }
        else {
            return new TwoCanvasPerCanvasGroupStrategy();
        }
    }
}

class CanvasService {
    constructor() {
        this._currentNumberOfCanvasGroups = new BehaviorSubject(0);
        this._currentCanvasGroupIndex = new BehaviorSubject(0);
        this.canvasGroups = new CanvasGroups();
        this._numberOfCanvases = 0;
    }
    addAll(canvasRects, layout) {
        this.numberOfCanvases = canvasRects.length;
        const canvasGroupStrategy = CanvasGroupStrategyFactory.create(layout);
        this.canvasGroups = canvasGroupStrategy.addAll(canvasRects);
        this._currentNumberOfCanvasGroups.next(this.canvasGroups.length());
    }
    reset() {
        this.numberOfCanvases = 0;
        this._currentCanvasGroupIndex.next(0);
        this.canvasGroups = new CanvasGroups();
    }
    get onCanvasGroupIndexChange() {
        return this._currentCanvasGroupIndex
            .asObservable()
            .pipe(distinctUntilChanged());
    }
    get onNumberOfCanvasGroupsChange() {
        return this._currentNumberOfCanvasGroups
            .asObservable()
            .pipe(distinctUntilChanged());
    }
    set currentCanvasGroupIndex(currentCanvasGroupIndex) {
        if (!this.isWithinBounds(currentCanvasGroupIndex)) {
            return;
        }
        this._currentCanvasGroupIndex.next(currentCanvasGroupIndex);
    }
    get currentCanvasGroupIndex() {
        return this._currentCanvasGroupIndex.value;
    }
    get numberOfCanvases() {
        return this._numberOfCanvases;
    }
    set numberOfCanvases(numberOfCanvases) {
        this._numberOfCanvases = numberOfCanvases;
    }
    get numberOfCanvasGroups() {
        return this.canvasGroups.length();
    }
    get currentCanvasIndex() {
        const canvases = this.canvasGroups.canvasesPerCanvasGroup[this.currentCanvasGroupIndex];
        return canvases && canvases.length >= 1 ? canvases[0] : 0;
    }
    isWithinBounds(canvasGroupIndex) {
        return (canvasGroupIndex > -1 && canvasGroupIndex <= this.numberOfCanvasGroups - 1);
    }
    isCurrentCanvasGroupValid() {
        return this.isWithinBounds(this.currentCanvasGroupIndex);
    }
    // Returns -1 if next canvas index is out of bounds
    getNextCanvasGroupIndex() {
        if (!this.isWithinBounds(this.currentCanvasGroupIndex + 1)) {
            return -1;
        }
        this.currentCanvasGroupIndex++;
        return this.currentCanvasGroupIndex;
    }
    // Returns -1 if previous canvas index is out of bounds
    getPrevCanvasGroupIndex() {
        if (!this.isWithinBounds(this.currentCanvasGroupIndex - 1)) {
            return -1;
        }
        this.currentCanvasGroupIndex--;
        return this.currentCanvasGroupIndex;
    }
    constrainToRange(canvasGroupsIndex) {
        if (canvasGroupsIndex < 0) {
            return 0;
        }
        else if (canvasGroupsIndex >= this.numberOfCanvasGroups - 1) {
            return this.numberOfCanvasGroups - 1;
        }
        else {
            return canvasGroupsIndex;
        }
    }
    findClosestCanvasGroupIndex(point) {
        return this.canvasGroups.findClosestIndex(point);
    }
    findCanvasGroupByCanvasIndex(canvasIndex) {
        return this.canvasGroups.canvasesPerCanvasGroup.findIndex(function (canvasForCanvasGroup) {
            return canvasForCanvasGroup.indexOf(canvasIndex) >= 0;
        });
    }
    findCanvasByCanvasIndex(canvasIndex) {
        return this.canvasGroups.canvasesPerCanvasGroup.length === 0
            ? -1
            : this.canvasGroups.canvasesPerCanvasGroup[canvasIndex][0];
    }
    getCanvasGroupLabel(canvasGroupIndex) {
        if (!this.canvasGroups.canvasGroupRects ||
            this.canvasGroups.canvasesPerCanvasGroup.length === 0) {
            return '1';
        }
        const canvasGroup = this.canvasGroups.canvasesPerCanvasGroup[canvasGroupIndex];
        let canvasGroupLabel = '' + (canvasGroup[0] + 1);
        if (canvasGroup.length > 1) {
            canvasGroupLabel =
                canvasGroupLabel + '-' + (canvasGroup[canvasGroup.length - 1] + 1);
        }
        return canvasGroupLabel;
    }
    getCanvasesPerCanvasGroup(canvasIndex) {
        return !this.canvasGroups.canvasGroupRects
            ? [0]
            : this.canvasGroups.canvasesPerCanvasGroup[canvasIndex];
    }
    getCanvasRect(canvasIndex) {
        return this.canvasGroups.canvasRects[canvasIndex];
    }
    getCurrentCanvasGroupRect() {
        return this.getCanvasGroupRect(this.currentCanvasGroupIndex);
    }
    getCanvasGroupRect(canvasGroupIndex) {
        return this.canvasGroups.get(canvasGroupIndex);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: CanvasService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: CanvasService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: CanvasService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class HighlightService {
    highlightSelectedHit(id) {
        document.querySelector('.selectedHit')?.removeAttribute('class');
        document
            .querySelector(`mark[data-id='${id}']`)
            ?.setAttribute('class', 'selectedHit');
    }
    highlight(html, currentIndex, hits) {
        if (hits && hits.length > 0) {
            for (const hit of hits) {
                if (hit.index === currentIndex) {
                    html = this.markHtml(html, hit.match, hit.id);
                }
            }
        }
        return html;
    }
    markHtml(html, pattern, id) {
        const wordBoundary = '\\b';
        return html?.replace(new RegExp(wordBoundary + this.escapeSpecialCharacters(pattern) + '(?!<)'), `<mark data-id="${id}">$&</mark>`);
    }
    /*
      "escapeAndRegexMatch" "\\" Is a escape character used to escape special
      characters in the regexPattern, "$&" is a back reference to the whole match.
  
      "searchValuePattern" is a list of special characters to be escaped,
      everything inside /[ ... ] including \s (whitespace) is to be escaped.
  
      text.substring(1) removes the first character of a string if the character is ",
      this is a special case in order to highlight all words.
    */
    escapeSpecialCharacters(text) {
        const escapeAndRegexMatch = '\\$&';
        const searchValuePattern = /[-[\]{}()*"+?.,\\^$|#\s]/g;
        return text.charAt(0) === '"'
            ? text.substring(1).replace(searchValuePattern, escapeAndRegexMatch)
            : text.replace(searchValuePattern, escapeAndRegexMatch);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: HighlightService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: HighlightService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: HighlightService, decorators: [{
            type: Injectable
        }] });

let BuilderUtils$1 = class BuilderUtils {
    static extractId(value) {
        return value['@id'];
    }
    static extracType(value) {
        return value['@type'];
    }
    static extractContext(value) {
        return value['@context'];
    }
    static extractViewingDirection(value) {
        if (value['viewingDirection'] === 'right-to-left') {
            return ViewingDirection.RTL;
        }
        else {
            return ViewingDirection.LTR;
        }
    }
    static findCanvasIndex(canvases, sequences) {
        let index = -1;
        if (sequences[0] && sequences[0].canvases && canvases[0]) {
            index = sequences[0].canvases.findIndex((canvas) => canvas.id === canvases[0]);
        }
        return index;
    }
};

let MetadataBuilder$1 = class MetadataBuilder {
    constructor(metadatas) {
        this.metadatas = metadatas;
    }
    build() {
        const metadatas = [];
        if (this.metadatas) {
            for (let i = 0; i < this.metadatas.length; i++) {
                const data = this.metadatas[i];
                metadatas.push(new Metadata(data.label, data.value));
            }
        }
        return metadatas;
    }
};

let SizesBuilder$1 = class SizesBuilder {
    constructor(sizes) {
        this.sizes = sizes;
    }
    build() {
        const sizes = [];
        if (this.sizes) {
            for (let i = 0; i < this.sizes.length; i++) {
                const size = this.sizes[i];
                sizes.push(new Size(size.width, size.height));
            }
        }
        return sizes;
    }
};

let TilesBuilder$1 = class TilesBuilder {
    constructor(tiles) {
        this.tiles = tiles;
    }
    build() {
        const tiles = [];
        if (this.tiles) {
            for (let i = 0; i < this.tiles.length; i++) {
                const tile = this.tiles[i];
                tiles.push(new Tile({
                    width: tile.width,
                    scaleFactors: tile.scaleFactors,
                }));
            }
        }
        return tiles;
    }
};

let ServiceBuilder$1 = class ServiceBuilder {
    constructor(service) {
        this.service = service;
    }
    build() {
        if (!this.service) {
            return undefined;
        }
        else {
            return new Service({
                id: BuilderUtils$1.extractId(this.service),
                context: BuilderUtils$1.extractContext(this.service),
                protocol: this.service.protocol,
                width: this.service.width,
                height: this.service.height,
                sizes: new SizesBuilder$1(this.service.sizes).build(),
                tiles: new TilesBuilder$1(this.service.tiles).build(),
                profile: this.service.profile,
                physicalScale: this.service.physicalScale,
                physicalUnits: this.service.physicalUnits,
                service: new ServiceBuilder(this.service.service).build(),
            });
        }
    }
};

let ResourceBuilder$1 = class ResourceBuilder {
    constructor(resource) {
        this.resource = resource;
    }
    build() {
        if (!this.resource) {
            throw new Error('No resource');
        }
        return new Resource({
            id: BuilderUtils$1.extractId(this.resource),
            type: BuilderUtils$1.extracType(this.resource),
            format: this.resource.format,
            service: new ServiceBuilder$1(this.resource.service).build(),
            height: this.resource.height,
            width: this.resource.width,
        });
    }
};

let ImagesBuilder$1 = class ImagesBuilder {
    constructor(images) {
        this.images = images;
    }
    build() {
        const images = [];
        if (this.images) {
            for (let i = 0; i < this.images.length; i++) {
                const image = this.images[i];
                images.push(new Images({
                    id: BuilderUtils$1.extractId(image),
                    type: BuilderUtils$1.extracType(image),
                    motivation: image.motivation,
                    resource: new ResourceBuilder$1(image.resource).build(),
                    on: image.on,
                }));
            }
        }
        return images;
    }
};

let CanvasBuilder$1 = class CanvasBuilder {
    constructor(canvases) {
        this.canvases = canvases;
    }
    build() {
        const canvases = [];
        if (this.canvases) {
            for (let i = 0; i < this.canvases.length; i++) {
                const canvas = this.canvases[i];
                const seeAlso = canvas.seeAlso ? canvas.seeAlso : [];
                if (canvas['@seeAlso']) {
                    seeAlso.push(canvas['@seeAlso']);
                }
                canvases.push(new Canvas({
                    id: BuilderUtils$1.extractId(canvas),
                    type: BuilderUtils$1.extracType(canvas),
                    label: canvas.label,
                    thumbnail: canvas.thumbnail,
                    height: canvas.height,
                    width: canvas.width,
                    images: new ImagesBuilder$1(canvas.images).build(),
                    altoUrl: this.extractAltoUrl(seeAlso),
                }));
            }
        }
        return canvases;
    }
    extractAltoUrl(seeAlso) {
        if (!seeAlso) {
            return undefined;
        }
        const altoService = seeAlso.find((s) => s.format === 'application/alto+xml');
        return altoService ? BuilderUtils$1.extractId(altoService) : undefined;
    }
};

let SequenceBuilder$1 = class SequenceBuilder {
    constructor(sequences) {
        this.sequences = sequences;
    }
    build() {
        const sequences = [];
        if (this.sequences) {
            for (let i = 0; i < this.sequences.length; i++) {
                const seq = this.sequences[i];
                sequences.push(new Sequence({
                    id: BuilderUtils$1.extractId(seq),
                    type: BuilderUtils$1.extracType(seq),
                    label: seq.label,
                    viewingHint: seq.viewingHint,
                    canvases: new CanvasBuilder$1(seq.canvases).build(),
                }));
            }
        }
        return sequences;
    }
};

let StructureBuilder$1 = class StructureBuilder {
    constructor(structures, sequences) {
        this.structures = structures;
        this.sequences = sequences;
    }
    build() {
        const structures = [];
        if (this.structures) {
            for (let i = 0; i < this.structures.length; i++) {
                const structure = this.structures[i];
                structures.push(new Structure({
                    id: BuilderUtils$1.extractId(structure),
                    type: BuilderUtils$1.extracType(structure),
                    label: structure.label,
                    canvases: structure.canvases,
                    canvasIndex: BuilderUtils$1.findCanvasIndex(structure.canvases, this.sequences),
                }));
            }
        }
        return structures;
    }
};

let TileSourceBuilder$1 = class TileSourceBuilder {
    constructor(sequences) {
        this.sequences = sequences;
    }
    build() {
        const tilesources = [];
        if (this.sequences && this.sequences.length > 0) {
            const canvases = this.sequences[0].canvases;
            for (let i = 0; canvases && i < canvases.length; i++) {
                const canvas = canvases[i];
                if (canvas) {
                    if (canvas.images && canvas.images.length >= 0) {
                        const resource = canvas.images[0].resource;
                        if (resource) {
                            tilesources.push(resource);
                        }
                    }
                }
            }
        }
        return tilesources;
    }
};

let ManifestBuilder$1 = class ManifestBuilder {
    constructor(data) {
        this.data = data;
    }
    build() {
        const sequences = new SequenceBuilder$1(this.data.sequences).build();
        return new Manifest({
            context: BuilderUtils$1.extractContext(this.data),
            type: BuilderUtils$1.extracType(this.data),
            id: BuilderUtils$1.extractId(this.data),
            viewingDirection: BuilderUtils$1.extractViewingDirection(this.data),
            label: this.data.label,
            metadata: new MetadataBuilder$1(this.data.metadata).build(),
            license: this.data.license,
            logo: this.data.logo,
            attribution: this.data.attribution,
            service: new ServiceBuilder$1(this.data.service).build(),
            sequences: sequences,
            structures: new StructureBuilder$1(this.data.structures, sequences).build(),
            tileSource: new TileSourceBuilder$1(this.data.sequences).build(),
            viewingHint: this.data.viewingHint,
        });
    }
};

class BuilderUtils {
    static extractId(value) {
        return value['id'];
    }
    static extracType(value) {
        return value['type'];
    }
    static extractContext(value) {
        return value['@context'];
    }
    static extractViewingDirection(value) {
        if (value['viewingDirection'] === 'right-to-left') {
            return ViewingDirection.RTL;
        }
        else {
            return ViewingDirection.LTR;
        }
    }
    static extractViewingHint(value) {
        if (Array.isArray(value)) {
            return value[0];
        }
        return undefined;
    }
    static findCanvasIndex(canvases, sequences) {
        let index = -1;
        if (canvases[0]) {
            index = sequences[0].canvases.findIndex((canvas) => canvas.id === canvases[0].id);
        }
        return index;
    }
    static extractLogo(provider) {
        let logo;
        if (Array.isArray(provider)) {
            logo = this.extractId(provider[0].logo[0]);
        }
        return logo;
    }
    static extractLanguageValue(data, preferredLanguage) {
        if (!data) {
            return '';
        }
        const key = preferredLanguage && data[preferredLanguage]
            ? preferredLanguage
            : this.extractDefaultLanguage(data);
        return data[key][0];
    }
    static extractDefaultLanguage(data) {
        return Object.keys(data)[0];
    }
}

class MetadataBuilder {
    constructor(metadatas) {
        this.metadatas = metadatas;
    }
    build() {
        const metadatas = [];
        if (this.metadatas) {
            for (let i = 0; i < this.metadatas.length; i++) {
                const data = this.metadatas[i];
                metadatas.push(new Metadata(BuilderUtils.extractLanguageValue(data.label), BuilderUtils.extractLanguageValue(data.value)));
            }
        }
        return metadatas;
    }
}

class SizesBuilder {
    constructor(sizes) {
        this.sizes = sizes;
    }
    build() {
        const sizes = [];
        if (this.sizes) {
            for (let i = 0; i < this.sizes.length; i++) {
                const size = this.sizes[i];
                sizes.push(new Size(size.width, size.height));
            }
        }
        return sizes;
    }
}

class TilesBuilder {
    constructor(tiles) {
        this.tiles = tiles;
    }
    build() {
        const tiles = [];
        if (this.tiles) {
            for (let i = 0; i < this.tiles.length; i++) {
                const tile = this.tiles[i];
                tiles.push(new Tile({
                    width: tile.width,
                    scaleFactors: tile.scaleFactors,
                }));
            }
        }
        return tiles;
    }
}

class ServiceBuilder {
    constructor(service) {
        this.service = service;
    }
    build() {
        if (!Array.isArray(this.service) || this.service.length < 1) {
            return undefined;
        }
        else {
            const service = this.service[0];
            return new Service({
                id: BuilderUtils.extractId(service),
                context: BuilderUtils.extractContext(service),
                protocol: service.protocol,
                width: service.width,
                height: service.height,
                sizes: new SizesBuilder(service.sizes).build(),
                tiles: new TilesBuilder(service.tiles).build(),
                profile: service.profile,
                physicalScale: service.physicalScale,
                physicalUnits: service.physicalUnits,
                service: new ServiceBuilder(service.service).build(),
            });
        }
    }
}

class ResourceBuilder {
    constructor(resource) {
        this.resource = resource;
    }
    build() {
        if (!this.resource) {
            throw new Error('No resource');
        }
        return new Resource({
            id: BuilderUtils.extractId(this.resource),
            type: BuilderUtils.extracType(this.resource),
            format: this.resource.format,
            service: new ServiceBuilder(this.resource.service).build(),
            height: this.resource.height,
            width: this.resource.width,
        });
    }
}

class ImagesBuilder {
    constructor(images) {
        this.images = images;
    }
    build() {
        const images = [];
        if (this.images) {
            this.images.forEach((i) => {
                if (i.items) {
                    i.items.forEach((image) => {
                        images.push(new Images({
                            id: BuilderUtils.extractId(image),
                            type: BuilderUtils.extracType(image),
                            resource: new ResourceBuilder(image.body).build(),
                            motivation: image.motivation,
                            on: image.target,
                        }));
                    });
                }
            });
        }
        return images;
    }
}

class CanvasBuilder {
    constructor(canvases) {
        this.canvases = canvases;
    }
    build() {
        const canvases = [];
        if (this.canvases) {
            for (let i = 0; i < this.canvases.length; i++) {
                const canvas = this.canvases[i];
                let seeAlso = [];
                if (canvas.seeAlso) {
                    seeAlso = seeAlso.concat(canvas.seeAlso);
                }
                canvases.push(new Canvas({
                    id: BuilderUtils.extractId(canvas),
                    type: BuilderUtils.extracType(canvas),
                    label: canvas.label,
                    height: canvas.height,
                    width: canvas.width,
                    images: new ImagesBuilder(canvas.items).build(),
                    altoUrl: this.extractAltoUrl(seeAlso),
                }));
            }
        }
        return canvases;
    }
    extractAltoUrl(seeAlso) {
        if (!seeAlso) {
            return undefined;
        }
        const altoService = seeAlso.find((s) => s?.format === 'application/alto+xml');
        return altoService ? BuilderUtils.extractId(altoService) : undefined;
    }
}

class SequenceBuilder {
    constructor(data) {
        this.data = data;
    }
    build() {
        const sequences = [];
        if (this.data) {
            sequences.push(new Sequence({
                id: BuilderUtils.extractId(this.data),
                type: 'Sequence',
                label: 'Current Page Order',
                viewingHint: BuilderUtils.extractViewingHint(this.data.behavior),
                canvases: new CanvasBuilder(this.data.items).build(),
            }));
        }
        return sequences;
    }
}

class StructureBuilder {
    constructor(structures, sequences) {
        this.structures = structures;
        this.sequences = sequences;
    }
    build() {
        const structures = [];
        if (this.structures) {
            for (let i = 0; i < this.structures.length; i++) {
                const structure = this.structures[i];
                structures.push(new Structure({
                    id: BuilderUtils.extractId(structure),
                    type: BuilderUtils.extracType(structure),
                    label: BuilderUtils.extractLanguageValue(structure.label),
                    canvases: structure.items,
                    canvasIndex: BuilderUtils.findCanvasIndex(structure.items, this.sequences),
                }));
            }
        }
        return structures;
    }
}

class TileSourceBuilder {
    constructor(items) {
        this.items = items;
    }
    build() {
        const tilesources = [];
        if (this.items && this.items.length > 0) {
            this.items.forEach((canvas) => {
                if (canvas.type === 'Canvas') {
                    canvas.items.forEach((annotationPage) => {
                        if (annotationPage.type === 'AnnotationPage') {
                            annotationPage.items.forEach((annotation) => {
                                if (annotation.type === 'Annotation') {
                                    let body = annotation.body;
                                    if (body) {
                                        body.service = this.flattenService(body.service);
                                        tilesources.push(body);
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
        return tilesources;
    }
    flattenService(service) {
        if (Array.isArray(service) && service.length === 1) {
            return {
                ...service[0],
                service: this.flattenService(service[0].service),
            };
        }
        return service;
    }
}

class ManifestBuilder {
    constructor(data) {
        this.data = data;
    }
    build() {
        const sequences = new SequenceBuilder(this.data).build();
        const manifest = new Manifest({
            context: BuilderUtils.extractContext(this.data),
            type: BuilderUtils.extracType(this.data),
            id: BuilderUtils.extractId(this.data),
            viewingDirection: BuilderUtils.extractViewingDirection(this.data),
            label: BuilderUtils.extractLanguageValue(this.data.label),
            metadata: new MetadataBuilder(this.data.metadata).build(),
            license: this.data.rights,
            logo: BuilderUtils.extractLogo(this.data.provider),
            attribution: BuilderUtils.extractLanguageValue(this.data.requiredStatement?.value),
            service: new ServiceBuilder(this.data.service).build(),
            sequences: sequences,
            structures: new StructureBuilder(this.data.structures, sequences).build(),
            tileSource: new TileSourceBuilder(this.data.items).build(),
            viewingHint: BuilderUtils.extractViewingHint(this.data.behavior),
        });
        return manifest;
    }
}

class SpinnerService {
    constructor() {
        this.spinnerSubject = new Subject();
        this.spinnerState = this.spinnerSubject.asObservable();
    }
    show() {
        this.spinnerSubject.next({ show: true });
    }
    hide() {
        this.spinnerSubject.next({ show: false });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: SpinnerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: SpinnerService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: SpinnerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class IiifManifestService {
    constructor(intl, http, spinnerService) {
        this.intl = intl;
        this.http = http;
        this.spinnerService = spinnerService;
        this._currentManifest = new BehaviorSubject(null);
        this._errorMessage = new BehaviorSubject(null);
    }
    get currentManifest() {
        return this._currentManifest.asObservable().pipe(distinctUntilChanged());
    }
    get errorMessage() {
        return this._errorMessage.asObservable();
    }
    load(manifestUri) {
        return new Observable((observer) => {
            if (!manifestUri || manifestUri.length === 0) {
                this._errorMessage.next(this.intl.manifestUriMissingLabel);
                observer.next(false);
            }
            else {
                this.spinnerService.show();
                this.http
                    .get(manifestUri)
                    .pipe(finalize(() => this.spinnerService.hide()), take(1))
                    .subscribe((response) => {
                    const manifest = this.extractData(response);
                    if (this.isManifestValid(manifest)) {
                        this._currentManifest.next(manifest);
                        observer.next(true);
                    }
                    else {
                        this._errorMessage.next(this.intl.manifestNotValidLabel);
                        observer.next(false);
                    }
                }, (err) => {
                    this._errorMessage.next(this.handleError(err));
                    observer.next(false);
                });
            }
        });
    }
    destroy() {
        this.resetCurrentManifest();
        this.resetErrorMessage();
    }
    resetCurrentManifest() {
        this._currentManifest.next(null);
    }
    resetErrorMessage() {
        this._errorMessage.next(null);
    }
    extractData(response) {
        if (response.type === 'Manifest') {
            return new ManifestBuilder(response).build();
        }
        else {
            return new ManifestBuilder$1(response).build();
        }
    }
    isManifestValid(manifest) {
        return (manifest &&
            manifest.tileSource !== undefined &&
            manifest.tileSource.length > 0);
    }
    handleError(err) {
        let errMsg;
        if (err.error instanceof Object) {
            errMsg = err.message;
        }
        else {
            errMsg = err.error;
        }
        return errMsg;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: IiifManifestService, deps: [{ token: MimeViewerIntl }, { token: i2.HttpClient }, { token: SpinnerService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: IiifManifestService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: IiifManifestService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: MimeViewerIntl }, { type: i2.HttpClient }, { type: SpinnerService }]; } });

class HtmlFormatter {
    altoToHtml(alto) {
        const page = alto.layout.page;
        let html = '';
        let textBlocks = [];
        if (page.topMargin.textBlocks) {
            textBlocks = [...textBlocks, ...page.topMargin.textBlocks];
        }
        if (page.leftMargin.textBlocks) {
            textBlocks = [...textBlocks, ...page.leftMargin.textBlocks];
        }
        if (page.printSpace.textBlocks) {
            textBlocks = [...textBlocks, ...page.printSpace.textBlocks];
        }
        if (page.bottomMargin.textBlocks) {
            textBlocks = [...textBlocks, ...page.bottomMargin.textBlocks];
        }
        textBlocks.forEach((textBlock) => {
            let words = [];
            textBlock.textLines.forEach((textLine) => {
                textLine.strings.forEach((string) => {
                    words.push(string.content);
                });
            });
            const styles = [];
            if (textBlock?.textStyle?.fontStyle === 'bold') {
                styles.push('font-weight: bold');
            }
            html += '<p';
            if (styles && styles.length > 0) {
                html += ` style="${styles.join(';')}"`;
            }
            html += `>${words.join(' ')}<p/>`;
        });
        return html;
    }
}

class AltoService {
    constructor(intl, http, iiifManifestService, highlightService, canvasService, sanitizer) {
        this.intl = intl;
        this.http = http;
        this.iiifManifestService = iiifManifestService;
        this.highlightService = highlightService;
        this.canvasService = canvasService;
        this.sanitizer = sanitizer;
        this.altos = [];
        this.isLoading = new BehaviorSubject(false);
        this.textContentReady = new Subject();
        this.textError = new Subject();
        this.manifest = null;
        this.subscriptions = new Subscription();
        this.altoBuilder = new AltoBuilder();
        this._recognizedTextContentModeChanges = new BehaviorSubject({
            previousValue: RecognizedTextMode.NONE,
            currentValue: RecognizedTextMode.NONE,
        });
        this.previousRecognizedTextMode = RecognizedTextMode.NONE;
    }
    get onRecognizedTextContentModeChange$() {
        return this._recognizedTextContentModeChanges.asObservable();
    }
    get onTextContentReady$() {
        return this.textContentReady.asObservable();
    }
    get isLoading$() {
        return this.isLoading.asObservable();
    }
    get hasErrors$() {
        return this.textError.asObservable();
    }
    get recognizedTextContentMode() {
        return this._recognizedTextContentModeChanges.value.currentValue;
    }
    set recognizedTextContentMode(value) {
        this._recognizedTextContentModeChanges.next({
            currentValue: value,
            previousValue: this.previousRecognizedTextMode,
        });
        this.previousRecognizedTextMode = value;
    }
    initialize(hits) {
        this.hits = hits;
        this.htmlFormatter = new HtmlFormatter();
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
            this.clearCache();
        }));
        this.subscriptions.add(this.canvasService.onCanvasGroupIndexChange
            .pipe(debounceTime(200))
            .subscribe((currentCanvasGroupIndex) => {
            this.textError.next(undefined);
            const sources = [];
            const canvasGroup = this.canvasService.getCanvasesPerCanvasGroup(currentCanvasGroupIndex);
            if (!canvasGroup || canvasGroup.length === 0) {
                return;
            }
            this.addAltoSource(canvasGroup[0], sources);
            if (canvasGroup.length === 2) {
                this.addAltoSource(canvasGroup[1], sources);
            }
            this.isLoading.next(true);
            forkJoin(sources)
                .pipe(take(1), finalize(() => this.isLoading.next(false)))
                .subscribe();
        }));
    }
    destroy() {
        this.recognizedTextContentMode = this.config?.initRecognizedTextContentMode
            ? this.config?.initRecognizedTextContentMode
            : RecognizedTextMode.NONE;
        this.subscriptions.unsubscribe();
        this.clearCache();
    }
    setConfig(config) {
        this.config = config;
    }
    showRecognizedTextContentOnly() {
        this.recognizedTextContentMode = RecognizedTextMode.ONLY;
    }
    showRecognizedTextContentInSplitView() {
        this.recognizedTextContentMode = RecognizedTextMode.SPLIT;
    }
    closeRecognizedTextContent() {
        this.recognizedTextContentMode = RecognizedTextMode.NONE;
    }
    getHtml(index) {
        return this.altos && this.altos.length >= index + 1
            ? this.sanitizer.bypassSecurityTrustHtml(this.highlightService.highlight(this.altos[index], index, this.hits))
            : undefined;
    }
    clearCache() {
        this.altos = [];
    }
    addAltoSource(index, sources) {
        if (this.manifest && this.manifest.sequences) {
            const seq = this.manifest.sequences[0];
            if (seq.canvases) {
                const canvas = seq.canvases[index];
                if (canvas && canvas.altoUrl) {
                    sources.push(this.add(index, canvas.altoUrl));
                }
            }
        }
    }
    add(index, url) {
        return new Observable((observer) => {
            if (this.isInCache(index)) {
                this.done(observer);
            }
            else {
                this.load(observer, index, url);
            }
        });
    }
    isInCache(index) {
        return this.altos[index];
    }
    load(observer, index, url) {
        this.http
            .get(url, {
            headers: new HttpHeaders().set('Content-Type', 'text/xml'),
            responseType: 'text',
        })
            .pipe(take(1), catchError((err) => of({ isError: true, error: err })))
            .subscribe((data) => {
            try {
                if (!data.isError) {
                    parseString(data, { explicitChildren: true, preserveChildrenOrder: true }, (error, result) => {
                        const alto = this.altoBuilder.withAltoXml(result.alto).build();
                        this.addToCache(index, alto);
                        this.done(observer);
                    });
                }
                else {
                    throw data.err;
                }
            }
            catch {
                this.error(observer);
            }
        });
    }
    addToCache(index, alto) {
        this.altos[index] = this.htmlFormatter.altoToHtml(alto);
    }
    done(observer) {
        this.textContentReady.next();
        this.complete(observer);
    }
    error(observer) {
        this.textError.next(this.intl.textContentErrorLabel);
        this.complete(observer);
    }
    complete(observer) {
        observer.next();
        observer.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: AltoService, deps: [{ token: MimeViewerIntl }, { token: i2.HttpClient }, { token: IiifManifestService }, { token: HighlightService }, { token: CanvasService }, { token: i6.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: AltoService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: AltoService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: MimeViewerIntl }, { type: i2.HttpClient }, { type: IiifManifestService }, { type: HighlightService }, { type: CanvasService }, { type: i6.DomSanitizer }]; } });

/****************************************************************
 * MIME-viewer options
 ****************************************************************/
const ViewerOptions = {
    zoom: {
        zoomFactor: 1.15,
        dblClickZoomFactor: 2.7,
        // How many pixels since lastDistance before it is considered a pinch
        pinchZoomThreshold: 3,
    },
    pan: {
        // Sensitivity when determining swipe-direction.
        // Higher threshold means that swipe must be more focused in
        // x-direction before the gesture is recognized as "left" or "right"
        swipeDirectionThreshold: 70,
    },
    // All transition times in milliseconds
    transitions: {
        toolbarsEaseInTime: 400,
        toolbarsEaseOutTime: 500,
        OSDAnimationTime: 600, // Animation-time for OSD-animations
    },
    overlays: {
        // Margin between canvas groups in Dashboard View in OpenSeadragon viewport-coordinates
        canvasGroupMarginInDashboardView: 300,
        // Margin between canvas groups in Page View in OpenSeadragon viewport-coordinates
        canvasGroupMarginInPageView: 20,
    },
    padding: {
        // Padding in viewer container in pixels
        header: 80,
        footer: 80, // Placeholder below viewer for footer in Dashboard View
    },
    colors: {
        canvasGroupBackgroundColor: '#fafafa',
    },
};

class Utils {
    static numbersAreClose(thing, realThing, epsilon) {
        return Math.abs(thing - realThing) <= epsilon;
    }
    static shortenDecimals(zoom, precision) {
        const short = Number(zoom).toPrecision(precision);
        return Number(short);
    }
    static getScaleFactor(physicalScale, ignorePhysicalScale = false) {
        return ignorePhysicalScale ? 1 : (physicalScale ? physicalScale : 1) * 400;
    }
}

const canvasRectFromCriteria = (rotation, criteria, x, ignorePhysicalScale) => {
    let rect = {};
    const scale = Utils.getScaleFactor(criteria.canvasSource.service?.service?.physicalScale, ignorePhysicalScale);
    if (rotation === 90 || rotation === 270) {
        rect = {
            height: Math.trunc(criteria.canvasSource.width * scale),
            width: Math.trunc(criteria.canvasSource.height * scale),
            x: x,
            y: Math.trunc((criteria.canvasSource.width * scale) / 2) * -1,
        };
    }
    else {
        rect = {
            height: Math.trunc(criteria.canvasSource.height * scale),
            width: Math.trunc(criteria.canvasSource.width * scale),
            x: x,
            y: Math.trunc((criteria.canvasSource.height * scale) / 2) * -1,
        };
    }
    return new Rect(rect);
};

class OnePageCalculatePagePositionStrategy {
    constructor(config) {
        this.config = config;
    }
    calculateCanvasGroupPosition(criteria, rotation = 0) {
        let x;
        if (!criteria.canvasGroupIndex) {
            if (rotation === 90 || rotation === 270) {
                x = (criteria.canvasSource.height / 2) * -1;
            }
            else {
                x = (criteria.canvasSource.width / 2) * -1;
            }
        }
        else {
            x =
                criteria.viewingDirection === ViewingDirection.LTR
                    ? this.calculateLtrX(criteria)
                    : this.calculateRtlX(criteria);
        }
        return canvasRectFromCriteria(rotation, criteria, x, this.config.ignorePhysicalScale);
    }
    calculateLtrX(criteria) {
        return (criteria.previousCanvasGroupPosition.x +
            criteria.previousCanvasGroupPosition.width +
            ViewerOptions.overlays.canvasGroupMarginInDashboardView);
    }
    calculateRtlX(criteria) {
        return (criteria.previousCanvasGroupPosition.x -
            criteria.previousCanvasGroupPosition.width -
            ViewerOptions.overlays.canvasGroupMarginInDashboardView);
    }
}

class TwoPageCalculateCanvasGroupPositionStrategy {
    constructor(config) {
        this.config = config;
    }
    calculateCanvasGroupPosition(criteria, rotation = 0) {
        let x;
        if (!criteria.canvasGroupIndex) {
            // First page
            x = 0;
        }
        else if (criteria.canvasGroupIndex % 2) {
            // Even page numbers
            x =
                criteria.viewingDirection === ViewingDirection.LTR
                    ? this.calculateEvenLtrX(criteria)
                    : this.calculateEvenRtlX(criteria);
        }
        else {
            // Odd page numbers
            x =
                criteria.viewingDirection === ViewingDirection.LTR
                    ? this.calculateOddLtrX(criteria)
                    : this.calculateOddRtlX(criteria);
        }
        return canvasRectFromCriteria(rotation, criteria, x, this.config.ignorePhysicalScale);
    }
    calculateEvenLtrX(criteria) {
        return (criteria.previousCanvasGroupPosition.x +
            criteria.previousCanvasGroupPosition.width +
            ViewerOptions.overlays.canvasGroupMarginInDashboardView);
    }
    calculateOddLtrX(criteria) {
        return (criteria.previousCanvasGroupPosition.x +
            criteria.previousCanvasGroupPosition.width);
    }
    calculateEvenRtlX(criteria) {
        return (criteria.previousCanvasGroupPosition.x -
            criteria.canvasSource.width -
            ViewerOptions.overlays.canvasGroupMarginInDashboardView);
    }
    calculateOddRtlX(criteria) {
        return criteria.previousCanvasGroupPosition.x - criteria.canvasSource.width;
    }
}

class CalculateCanvasGroupPositionFactory {
    static create(viewerLayout, paged, config) {
        if (viewerLayout === ViewerLayout.ONE_PAGE || !paged) {
            return new OnePageCalculatePagePositionStrategy(config);
        }
        else {
            return new TwoPageCalculateCanvasGroupPositionStrategy(config);
        }
    }
}

class ClickService {
    constructor() {
        this.singleClickHandlers = [];
        this.doubleClickHandlers = [];
        this.clickCount = 0;
        this.click = (event) => {
            event.preventDefaultAction = true;
            if (event.quick) {
                this.clickCount++;
                if (this.clickCount === 1) {
                    this.dblClickTimeOut = setTimeout(() => {
                        this.clickCount = 0;
                        this.triggerSingleClick(event);
                    }, event.tracker.dblClickTimeThreshold);
                }
                else if (this.clickCount === 2) {
                    clearTimeout(this.dblClickTimeOut);
                    this.clickCount = 0;
                    this.triggerDoubleClick(event);
                }
            }
        };
    }
    reset() {
        this.singleClickHandlers = [];
        this.doubleClickHandlers = [];
    }
    addSingleClickHandler(singleClickHandler) {
        this.singleClickHandlers.push(singleClickHandler);
    }
    addDoubleClickHandler(doubleClickHandler) {
        this.doubleClickHandlers.push(doubleClickHandler);
    }
    triggerSingleClick(event) {
        this.singleClickHandlers.forEach((handler) => {
            handler(event);
        });
    }
    triggerDoubleClick(event) {
        this.doubleClickHandlers.forEach((handler) => {
            handler(event);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ClickService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ClickService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ClickService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

// OpenSeadragon SVG Overlay plugin 0.0.4
function createSvgOverlay() {
    if (!OpenSeadragon) {
        console.error('[openseadragon-svg-overlay] requires OpenSeadragon');
        return;
    }
    const svgNS = 'http://www.w3.org/2000/svg';
    // ----------
    class Overlay {
        constructor(viewer) {
            const self = this;
            this._viewer = viewer;
            this._containerWidth = 0;
            this._containerHeight = 0;
            this._svg = document.createElementNS(svgNS, 'svg');
            this._svg.style.position = 'absolute';
            this._svg.style.left = 0;
            this._svg.style.top = 0;
            this._svg.style.width = '100%';
            this._svg.style.height = '100%';
            this._viewer.canvas.appendChild(this._svg);
            this._node = document.createElementNS(svgNS, 'g');
            this._svg.appendChild(this._node);
            this._viewer.addHandler('animation', function () {
                self.resize();
            });
            this._viewer.addHandler('open', function () {
                self.resize();
            });
            this._viewer.addHandler('rotate', function (evt) {
                self.resize();
            });
            this._viewer.addHandler('resize', function () {
                self.resize();
            });
            this.resize();
        }
        node() {
            return this._node;
        }
        // ----------
        resize() {
            if (this._containerWidth !== this._viewer.container.clientWidth) {
                this._containerWidth = this._viewer.container.clientWidth;
                this._svg.setAttribute('width', this._containerWidth);
            }
            if (this._containerHeight !== this._viewer.container.clientHeight) {
                this._containerHeight = this._viewer.container.clientHeight;
                this._svg.setAttribute('height', this._containerHeight);
            }
            const p = this._viewer.viewport.pixelFromPoint(new OpenSeadragon.Point(0, 0), true);
            const zoom = this._viewer.viewport.getZoom(true);
            const rotation = this._viewer.viewport.getRotation();
            // TODO: Expose an accessor for _containerInnerSize in the OSD API so we don't have to use the private variable.
            const scale = this._viewer.viewport._containerInnerSize.x * zoom;
            this._node.setAttribute('transform', 'translate(' +
                p.x +
                ',' +
                p.y +
                ') scale(' +
                scale +
                ') rotate(' +
                rotation +
                ')');
        }
        // ----------
        onClick(node, handler) {
            // TODO: Fast click for mobile browsers
            new OpenSeadragon.MouseTracker({
                element: node,
                clickHandler: handler,
            }).setTracking(true);
        }
    }
    // ----------
    // ----------
    OpenSeadragon.Viewer.prototype.svgOverlay = function () {
        if (this._svgOverlayInfo) {
            return this._svgOverlayInfo;
        }
        this._svgOverlayInfo = new Overlay(this);
        return this._svgOverlayInfo;
    };
}

class HighlightRect extends Rect {
    constructor(fields) {
        super();
        this.canvasIndex = 0;
        if (fields) {
            this.x = fields.x || this.x;
            this.y = fields.y || this.y;
            this.width = fields.width || this.width;
            this.height = fields.height || this.height;
            this.centerX = this.x + this.width / 2;
            this.centerY = this.y + this.height / 2;
            this.canvasIndex = fields.canvasIndex || this.canvasIndex;
        }
    }
}

class Hit {
    constructor(fields) {
        this.id = 0;
        this.index = 0;
        this.label = '';
        this.match = '';
        this.before = '';
        this.after = '';
        this.highlightRects = [];
        if (fields) {
            this.id = fields.id || this.id;
            this.index = fields.index || this.index;
            this.label = fields.label || this.label;
            this.match = fields.match || this.match;
            this.before = fields.before || this.before;
            this.after = fields.after || this.after;
            this.highlightRects = fields.highlightRects || this.highlightRects;
        }
    }
}

class SearchResult {
    constructor(fields) {
        this.q = '';
        this.hits = [];
        if (fields) {
            this.q = fields.q || this.q;
            this.hits = fields.hits || this.hits;
        }
    }
    add(hit) {
        this.hits.push(hit);
    }
    get(index) {
        return new Hit({
            ...this.hits[index],
        });
    }
    size() {
        return this.hits.length;
    }
    last() {
        return this.get(this.size() - 1);
    }
}

class SearchResultBuilder {
    constructor(q, manifest, iiifSearchResult, config) {
        this.q = q;
        this.manifest = manifest;
        this.iiifSearchResult = iiifSearchResult;
        this.config = config;
    }
    build() {
        const searchResult = new SearchResult();
        searchResult.q = this.q;
        if (this.iiifSearchResult && this.iiifSearchResult.hits) {
            this.iiifSearchResult.hits.forEach((hit, index) => {
                const id = index;
                let startCanvasIndex = -1;
                let label;
                const highlightRects = [];
                if (this.manifest.sequences && this.manifest.sequences[0].canvases) {
                    const resources = this.findResources(hit);
                    resources.forEach((resource, index) => {
                        if (index === 0) {
                            startCanvasIndex = this.findSequenceIndex(resource);
                            label = this.findLabel(startCanvasIndex);
                        }
                        const canvasIndex = this.findSequenceIndex(resource);
                        const on = resource.on;
                        if (on) {
                            const scale = this.getScale(canvasIndex);
                            const coords = on.substring(on.indexOf('=') + 1).split(',');
                            const rect = new HighlightRect({
                                x: this.scaleValue(coords[0], scale),
                                y: this.scaleValue(coords[1], scale),
                                width: this.scaleValue(coords[2], scale),
                                height: this.scaleValue(coords[3], scale),
                                canvasIndex
                            });
                            highlightRects.push(rect);
                        }
                    });
                }
                searchResult.add(new Hit({
                    id: id,
                    index: startCanvasIndex,
                    label: label,
                    match: hit.match,
                    before: hit.before,
                    after: hit.after,
                    highlightRects,
                }));
            });
        }
        return searchResult;
    }
    findResources(hit) {
        const resources = [];
        if (hit.annotations) {
            for (const annotation of hit.annotations) {
                if (this.iiifSearchResult.resources) {
                    const res = this.iiifSearchResult.resources.find((r) => r['@id'] === annotation);
                    if (res) {
                        resources.push(res);
                    }
                }
            }
        }
        return resources;
    }
    findSequenceIndex(resource) {
        if (!this.manifest.sequences) {
            throw new Error('No sequences found!');
        }
        const firstSequence = this.getFirstSequence();
        const on = resource.on;
        if (on && firstSequence && firstSequence.canvases) {
            const id = on.substring(0, on.indexOf('#'));
            return firstSequence.canvases.findIndex((c) => c.id === id);
        }
        return -1;
    }
    findLabel(index) {
        if (index === -1) {
            return undefined;
        }
        else {
            const canvas = this.getFirstSequenceCanvas(index);
            return canvas ? canvas.label : undefined;
        }
    }
    getFirstSequence() {
        const sequences = this.manifest.sequences;
        return sequences ? sequences[0] : undefined;
    }
    getFirstSequenceCanvas(index) {
        const firstSequence = this.getFirstSequence();
        return firstSequence && firstSequence.canvases !== undefined
            ? firstSequence.canvases[index]
            : undefined;
    }
    getScale(index) {
        const physicalScale = this.getPhysicalScale(index);
        return Utils.getScaleFactor(physicalScale, this.config?.ignorePhysicalScale);
    }
    getPhysicalScale(index) {
        const canvas = this.getFirstSequenceCanvas(index);
        return canvas?.images?.[0].resource?.service?.service?.physicalScale;
    }
    scaleValue(value, scale) {
        return Math.trunc(parseInt(value, 10) * scale);
    }
}

class IiifContentSearchService {
    constructor(http) {
        this.http = http;
        this._currentSearchResult = new BehaviorSubject(new SearchResult({}));
        this._searching = new BehaviorSubject(false);
        this._currentQ = new BehaviorSubject('');
        this._selected = new BehaviorSubject(null);
    }
    destroy() {
        this._currentSearchResult.next(new SearchResult({}));
        this._searching.next(false);
        this._currentQ.next('');
        this._selected.next(null);
    }
    get onQChange() {
        return this._currentQ.asObservable().pipe(distinctUntilChanged());
    }
    get onChange() {
        return this._currentSearchResult.asObservable();
    }
    get isSearching() {
        return this._searching.asObservable();
    }
    get onSelected() {
        return this._selected.asObservable();
    }
    search(manifest, q) {
        this._currentQ.next(q);
        this._selected.next(null);
        if (q.length === 0) {
            this._currentSearchResult.next(new SearchResult());
            return;
        }
        if (!manifest.service || manifest.service === null) {
            return;
        }
        this._searching.next(true);
        this.http
            .get(`${manifest.service.id}?q=${q}`)
            .pipe(finalize(() => this._searching.next(false)), take(1), switchMap((res) => {
            return of(this.extractData(q, manifest, res));
        }))
            .subscribe((res) => this._currentSearchResult.next(res), (err) => this.handleError);
    }
    selected(hit) {
        this._selected.next(hit);
    }
    setConfig(config) {
        this.config = config;
    }
    extractData(q, manifest, iiifSearchResult) {
        return new SearchResultBuilder(q, manifest, iiifSearchResult, this.config).build();
    }
    handleError(err) {
        let errMsg;
        if (err.error instanceof Error) {
            errMsg = err.error.message;
        }
        else {
            errMsg = err.error;
        }
        return throwError(errMsg);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: IiifContentSearchService, deps: [{ token: i2.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: IiifContentSearchService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: IiifContentSearchService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i2.HttpClient }]; } });

class ManifestUtils {
    static isManifestPaged(manifest) {
        return (ManifestUtils.isManifestViewingHintPaged(manifest) ||
            ManifestUtils.isSequenceViewingHintPaged(manifest));
    }
    static isManifestViewingHintPaged(manifest) {
        return manifest && manifest.viewingHint === 'paged';
    }
    static isSequenceViewingHintPaged(manifest) {
        let firstSequence = null;
        if (manifest && manifest.sequences && manifest.sequences.length > 0) {
            firstSequence = manifest.sequences[0];
        }
        return firstSequence ? firstSequence.viewingHint === 'paged' : false;
    }
    static hasRecognizedTextContent(manifest) {
        if (manifest.sequences && manifest.sequences.length > 0) {
            const firstSequence = manifest.sequences[0];
            if (firstSequence.canvases && firstSequence.canvases.length > 0) {
                return firstSequence.canvases.find((c) => c.altoUrl) !== undefined;
            }
        }
        return false;
    }
}

class PinchStatus {
    constructor() {
        this.active = false;
        this.previousGestureId = 0;
        this.shouldStop = false;
    }
}

var Side;
(function (Side) {
    Side[Side["LEFT"] = 0] = "LEFT";
    Side[Side["RIGHT"] = 1] = "RIGHT";
    Side[Side["TOP"] = 2] = "TOP";
    Side[Side["BOTTOM"] = 3] = "BOTTOM";
})(Side || (Side = {}));

class StyleService {
    constructor(zone) {
        this.zone = zone;
        this.colorSubject = new ReplaySubject();
    }
    get onChange() {
        return this.colorSubject.asObservable().pipe(filter((color) => color !== null), distinctUntilChanged());
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.zone.runOutsideAngular(() => {
            this.subscriptions.add(interval(1000)
                .pipe(tap(() => {
                const previousRgbColor = this.currentRgbColor;
                const currentRgbColor = this.getComputedBackgroundColor(1);
                if (previousRgbColor !== currentRgbColor) {
                    this.currentRgbColor = currentRgbColor;
                    this.colorSubject.next(currentRgbColor);
                }
            }))
                .subscribe());
        });
    }
    destroy() {
        this.subscriptions.unsubscribe();
    }
    convertToRgba(rgbColor, opacity) {
        return rgbColor.replace(/rgb/i, 'rgba').replace(/\)/i, `,${opacity})`);
    }
    getComputedBackgroundColor(opacity) {
        const matAppBackground = document.getElementsByClassName('mat-app-background');
        const matSidenavContainer = document.getElementsByTagName('mat-sidenav-container');
        if (matAppBackground.length > 0) {
            return this.getComputedStyle(matAppBackground[0], 'background-color');
        }
        else if (matSidenavContainer.length > 0) {
            return this.getComputedStyle(matSidenavContainer[0], 'background-color');
        }
        else {
            return undefined;
        }
    }
    getComputedStyle(el, property) {
        return window.getComputedStyle(el, null).getPropertyValue(property);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: StyleService, deps: [{ token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: StyleService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: StyleService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.NgZone }]; } });

class ViewerLayoutService {
    constructor(breakpointObserver) {
        this.breakpointObserver = breakpointObserver;
        this.config = new MimeViewerConfig();
        this.subject = new BehaviorSubject(this.config.initViewerLayout);
    }
    init(isPagedManifest) {
        if (this.config.initViewerLayout === ViewerLayout.TWO_PAGE &&
            isPagedManifest &&
            !this.isHandsetOrTabletInPortrait()) {
            this._layout = ViewerLayout.TWO_PAGE;
            this.change();
        }
        else {
            this._layout = ViewerLayout.ONE_PAGE;
            this.change();
        }
    }
    get onChange() {
        return this.subject.asObservable().pipe(distinctUntilChanged());
    }
    get layout() {
        return this._layout;
    }
    setConfig(config) {
        this.config = config;
    }
    setLayout(viewerLayout) {
        this._layout = viewerLayout;
        this.change();
    }
    toggle() {
        if (this._layout === ViewerLayout.TWO_PAGE) {
            this.setLayout(ViewerLayout.ONE_PAGE);
        }
        else if (this._layout === ViewerLayout.ONE_PAGE) {
            this.setLayout(ViewerLayout.TWO_PAGE);
        }
    }
    change() {
        this.subject.next(this._layout);
    }
    isHandsetOrTabletInPortrait() {
        return this.breakpointObserver.isMatched([
            Breakpoints.Handset,
            Breakpoints.TabletPortrait,
        ]);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerLayoutService, deps: [{ token: i1.BreakpointObserver }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerLayoutService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerLayoutService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.BreakpointObserver }]; } });

var Direction;
(function (Direction) {
    Direction[Direction["UNDEFINED"] = 0] = "UNDEFINED";
    Direction[Direction["LEFT"] = 1] = "LEFT";
    Direction[Direction["RIGHT"] = 2] = "RIGHT";
    Direction[Direction["UP"] = 3] = "UP";
    Direction[Direction["DOWN"] = 4] = "DOWN";
    Direction[Direction["NEXT"] = 5] = "NEXT";
    Direction[Direction["PREVIOUS"] = 6] = "PREVIOUS";
})(Direction || (Direction = {}));

class NavigatorCalculateNextCanvasGroupStrategy {
    calculateNextCanvasGroup(criteria) {
        const direction = criteria.direction;
        const currentCanvasGroupIndex = criteria.currentCanvasGroupIndex;
        let nextCanvasGroup = 1;
        nextCanvasGroup =
            direction === Direction.NEXT ? nextCanvasGroup : nextCanvasGroup * -1;
        nextCanvasGroup = currentCanvasGroupIndex + nextCanvasGroup;
        return nextCanvasGroup;
    }
}

class DashboardModeCalculateNextCanvasGroupStrategy {
    calculateNextCanvasGroup(criteria) {
        const speed = criteria.speed;
        const direction = criteria.direction;
        const currentCanvasGroupIndex = criteria.currentCanvasGroupIndex;
        const currentCanvasGroupCenter = criteria.currentCanvasGroupCenter;
        let nextCanvasGroup;
        let canvasGroupDelta = this.calculateNumberOfCanvasGroupsToGo(speed);
        if (canvasGroupDelta === 0) {
            nextCanvasGroup = currentCanvasGroupCenter;
        }
        else {
            canvasGroupDelta =
                direction === Direction.LEFT ? canvasGroupDelta : canvasGroupDelta * -1;
            nextCanvasGroup =
                criteria.viewingDirection === ViewingDirection.LTR
                    ? currentCanvasGroupIndex + canvasGroupDelta
                    : currentCanvasGroupIndex - canvasGroupDelta;
        }
        return nextCanvasGroup;
    }
    calculateNumberOfCanvasGroupsToGo(speed) {
        let canvasGroupsToGo = 10;
        if (speed !== undefined) {
            if (speed < 500) {
                canvasGroupsToGo = 0;
            }
            else if (speed >= 500 && speed < 1500) {
                canvasGroupsToGo = 1;
            }
            else if (speed >= 1500 && speed < 2500) {
                canvasGroupsToGo = 3;
            }
            else if (speed >= 2500 && speed < 3500) {
                canvasGroupsToGo = 5;
            }
        }
        return canvasGroupsToGo;
    }
}

class PageModeCalculateNextCanvasGroupStrategy {
    calculateNextCanvasGroup(criteria) {
        const isNewCanvasGroupInCenter = criteria.currentCanvasGroupIndex !== criteria.currentCanvasGroupCenter;
        const speed = criteria.speed;
        const direction = criteria.direction;
        let nextCanvasGroup = criteria.currentCanvasGroupIndex;
        if (speed && speed >= 200) {
            const diff = direction === Direction.LEFT ? 1 : -1;
            nextCanvasGroup =
                criteria.viewingDirection === ViewingDirection.LTR
                    ? criteria.currentCanvasGroupIndex + diff
                    : criteria.currentCanvasGroupIndex - diff;
        }
        else if (isNewCanvasGroupInCenter) {
            nextCanvasGroup = criteria.currentCanvasGroupCenter;
        }
        return nextCanvasGroup;
    }
}

class PageZoomedModeCalculateNextCanvasGroupStrategy {
    calculateNextCanvasGroup(criteria) {
        const direction = criteria.direction;
        const currentCanvasGroupIndex = criteria.currentCanvasGroupIndex;
        const canvasGroupEndHitCountReached = criteria.canvasGroupEndHitCountReached;
        let nextCanvasGroup = canvasGroupEndHitCountReached ? 1 : 0;
        nextCanvasGroup =
            direction === Direction.LEFT ? nextCanvasGroup : nextCanvasGroup * -1;
        nextCanvasGroup =
            criteria.viewingDirection === ViewingDirection.LTR
                ? currentCanvasGroupIndex + nextCanvasGroup
                : currentCanvasGroupIndex - nextCanvasGroup;
        return nextCanvasGroup;
    }
}

class CalculateNextCanvasGroupFactory {
    static create(mode) {
        if (mode === ViewerMode.DASHBOARD) {
            return new DashboardModeCalculateNextCanvasGroupStrategy();
        }
        else if (mode === ViewerMode.PAGE) {
            return new PageModeCalculateNextCanvasGroupStrategy();
        }
        else if (mode === ViewerMode.PAGE_ZOOMED) {
            return new PageZoomedModeCalculateNextCanvasGroupStrategy();
        }
        else {
            return new NavigatorCalculateNextCanvasGroupStrategy();
        }
    }
}

class CanvasGroupMask {
    constructor(viewer, styleService) {
        this.styleService = styleService;
        this.canvasGroupRect = new Rect();
        this.disableResize = false;
        this.animationHandler = () => {
            this.resize();
        };
        this.resizeHandler = () => {
            this.setCenter();
            this.resize();
        };
        this.canvasGroupPinchHandler = () => {
            this.disableResize = false;
        };
        this.canvasGroupDragHandler = (e) => {
            if ((e.delta.x || e.delta.y) && e.speed > 0 && e.direction !== 0) {
                this.disableResize = true;
            }
        };
        this.canvasGroupDragEndHandler = () => {
            this.disableResize = false;
            this.resize();
        };
        this.viewer = viewer;
    }
    initialize(pageBounds, visible) {
        this.unsubscribe();
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.styleService.onChange.subscribe((color) => {
            if (color) {
                this.backgroundColor = color;
                if (this.leftMask) {
                    this.leftMask.style('fill', this.backgroundColor);
                }
                if (this.rightMask) {
                    this.rightMask.style('fill', this.backgroundColor);
                }
            }
        }));
        this.canvasGroupRect = pageBounds;
        this.addCanvasGroupMask();
        this.setCenter();
        this.resize();
        if (visible) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    destroy() {
        this.unsubscribe();
    }
    changeCanvasGroup(pageBounds) {
        this.canvasGroupRect = pageBounds;
        this.resize();
    }
    show() {
        this.addHandlers();
        if (!this.leftMask || !this.rightMask) {
            return;
        }
        this.setCenter();
        this.resize();
        this.leftMask.attr('height', '100%');
        this.rightMask.attr('height', '100%');
    }
    hide() {
        this.removeHandlers();
        if (!this.leftMask || !this.rightMask) {
            return;
        }
        this.leftMask.attr('height', '0');
        this.rightMask.attr('height', '0');
    }
    addHandlers() {
        this.viewer.addHandler('animation', this.animationHandler);
        this.viewer.addHandler('resize', this.resizeHandler);
        this.viewer.addHandler('canvas-pinch', this.canvasGroupPinchHandler);
        this.viewer.addHandler('canvas-drag', this.canvasGroupDragHandler);
        this.viewer.addHandler('canvas-drag-end', this.canvasGroupDragEndHandler);
    }
    removeHandlers() {
        this.viewer.removeHandler('animation', this.animationHandler);
        this.viewer.removeHandler('resize', this.resizeHandler);
        this.viewer.removeHandler('canvas-pinch', this.canvasGroupPinchHandler);
        this.viewer.removeHandler('canvas-drag', this.canvasGroupDragHandler);
        this.viewer.removeHandler('canvas-drag-end', this.canvasGroupDragEndHandler);
    }
    addCanvasGroupMask() {
        const overlays = d3.select(this.viewer.svgOverlay().node().parentNode);
        const mask = overlays.append('g').attr('data-testid', 'page-mask');
        this.leftMask = mask
            .append('rect')
            .attr('data-testid', 'mime-left-page-mask')
            .attr('height', '100%')
            .attr('y', 0)
            .style('fill', this.backgroundColor);
        this.rightMask = mask
            .append('rect')
            .attr('data-testid', 'mime-right-page-mask')
            .attr('height', '100%')
            .attr('y', 0)
            .style('fill', this.backgroundColor);
    }
    setCenter() {
        this.center = new OpenSeadragon$1.Point(this.viewer.viewport._containerInnerSize.x / 2, this.viewer.viewport._containerInnerSize.y / 2);
    }
    resize() {
        if (this.disableResize || !this.leftMask || !this.rightMask) {
            return;
        }
        const leftMaskRect = this.getLeftMaskRect();
        const rightMaskRect = this.getRightMaskRect();
        this.leftMask.attr('width', leftMaskRect.width).attr('x', leftMaskRect.x);
        this.rightMask
            .attr('width', rightMaskRect.width)
            .attr('x', Math.round(rightMaskRect.x));
    }
    getLeftMaskRect() {
        const imgBounds = new OpenSeadragon$1.Rect(this.canvasGroupRect.x, this.canvasGroupRect.y, this.canvasGroupRect.width, this.canvasGroupRect.height);
        const topLeft = this.viewer.viewport.viewportToViewerElementCoordinates(imgBounds.getTopLeft());
        let width = topLeft.x - ViewerOptions.overlays.canvasGroupMarginInPageView;
        if (width < 0) {
            width = 0;
        }
        return new Rect({
            x: 0,
            width: width,
        });
    }
    getRightMaskRect() {
        const imgBounds = new OpenSeadragon$1.Rect(this.canvasGroupRect.x, this.canvasGroupRect.y, this.canvasGroupRect.width, this.canvasGroupRect.height);
        const topRight = this.viewer.viewport.viewportToViewerElementCoordinates(imgBounds.getTopRight());
        let width = this.viewer.viewport._containerInnerSize.x - topRight.x;
        const x = this.viewer.viewport._containerInnerSize.x -
            width +
            ViewerOptions.overlays.canvasGroupMarginInPageView;
        if (width < 0) {
            width = 0;
        }
        return new Rect({
            x: x,
            width: width,
        });
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
}

class DefaultGoToCanvasGroupStrategy {
    constructor(viewer, zoomStrategy, canvasService, modeService, config, viewingDirection) {
        this.viewer = viewer;
        this.zoomStrategy = zoomStrategy;
        this.canvasService = canvasService;
        this.modeService = modeService;
        this.config = config;
        this.viewingDirection = viewingDirection;
    }
    goToCanvasGroup(canvasGroup) {
        const oldCanvasGroupIndex = this.canvasService.currentCanvasGroupIndex;
        this.canvasService.currentCanvasGroupIndex =
            this.canvasService.constrainToRange(canvasGroup.canvasGroupIndex);
        const newCanvasGroup = this.canvasService.getCanvasGroupRect(this.canvasService.currentCanvasGroupIndex);
        if (this.modeService.isPageZoomed() &&
            this.config.preserveZoomOnCanvasGroupChange) {
            let x;
            if (oldCanvasGroupIndex > canvasGroup.canvasGroupIndex) {
                if (this.config.startOnTopOnCanvasGroupChange) {
                    const canvasGroupIndexes = this.canvasService.getCanvasesPerCanvasGroup(canvasGroup.canvasGroupIndex);
                    const previousCanvasIndex = canvasGroupIndexes[canvasGroupIndexes.length - 1];
                    const previousCanvasRect = this.canvasService.getCanvasRect(previousCanvasIndex);
                    x =
                        this.viewingDirection === ViewingDirection.LTR
                            ? this.leftX(previousCanvasRect)
                            : this.rightX(newCanvasGroup);
                }
                else {
                    x =
                        this.viewingDirection === ViewingDirection.LTR
                            ? this.rightX(newCanvasGroup)
                            : this.leftX(newCanvasGroup);
                }
            }
            else {
                x =
                    this.viewingDirection === ViewingDirection.LTR
                        ? this.leftX(newCanvasGroup)
                        : this.rightX(newCanvasGroup);
            }
            const y = this.config.startOnTopOnCanvasGroupChange &&
                oldCanvasGroupIndex !== canvasGroup.canvasGroupIndex
                ? newCanvasGroup.y +
                    this.getViewportBounds().height / 2 -
                    this.viewer.collectionTileMargin
                : this.getViewportCenter().y;
            this.panTo(x, y, canvasGroup.immediately);
        }
        else if (this.modeService.isPageZoomed()) {
            const oldCanvasGroupCenter = this.canvasService.getCanvasGroupRect(oldCanvasGroupIndex);
            this.panToCenter(oldCanvasGroupCenter, canvasGroup.immediately);
            this.zoomStrategy.goToHomeZoom();
            setTimeout(() => {
                this.panToCenter(newCanvasGroup, canvasGroup.immediately);
                this.modeService.mode = ViewerMode.PAGE;
            }, ViewerOptions.transitions.OSDAnimationTime);
        }
        else {
            this.panToCenter(newCanvasGroup, canvasGroup.immediately);
        }
    }
    goToPreviousCanvasGroup(currentCanvasIndex) {
        if (this.canvasService.currentCanvasGroupIndex > 0) {
            const viewportCenter = this.getViewportCenter();
            const currentCanvasGroupIndex = this.canvasService.findClosestCanvasGroupIndex(viewportCenter);
            const calculateNextCanvasGroupStrategy = CalculateNextCanvasGroupFactory.create(ViewerMode.NAVIGATOR);
            const newCanvasGroupIndex = calculateNextCanvasGroupStrategy.calculateNextCanvasGroup({
                direction: Direction.PREVIOUS,
                currentCanvasGroupIndex: currentCanvasGroupIndex,
                currentCanvasGroupCenter: currentCanvasIndex,
                viewingDirection: this.viewingDirection,
            });
            this.goToCanvasGroup({
                canvasGroupIndex: newCanvasGroupIndex,
                immediately: false,
            });
        }
    }
    goToNextCanvasGroup(currentCanvasIndex) {
        if (this.canvasService.currentCanvasGroupIndex <
            this.canvasService.numberOfCanvasGroups) {
            const viewportCenter = this.getViewportCenter();
            const currentCanvasGroupIndex = this.canvasService.findClosestCanvasGroupIndex(viewportCenter);
            const calculateNextCanvasGroupStrategy = CalculateNextCanvasGroupFactory.create(ViewerMode.NAVIGATOR);
            const newCanvasGroupIndex = calculateNextCanvasGroupStrategy.calculateNextCanvasGroup({
                direction: Direction.NEXT,
                currentCanvasGroupIndex: currentCanvasGroupIndex,
                currentCanvasGroupCenter: currentCanvasIndex,
                viewingDirection: this.viewingDirection,
            });
            this.goToCanvasGroup({
                canvasGroupIndex: newCanvasGroupIndex,
                immediately: false,
            });
        }
    }
    centerCurrentCanvas() {
        const currentCanvasGroupIndex = this.canvasService.currentCanvasGroupIndex;
        const currentCanvasGroupCenter = this.canvasService.getCanvasGroupRect(currentCanvasGroupIndex);
        this.panToCenter(currentCanvasGroupCenter, false);
    }
    leftX(canvas) {
        return canvas.x + this.getViewportBounds().width / 2;
    }
    rightX(canvas) {
        return canvas.x + canvas.width - this.getViewportBounds().width / 2;
    }
    panToCenter(canvasGroup, immediately = false) {
        this.panTo(canvasGroup.centerX, canvasGroup.centerY, immediately);
    }
    panTo(x, y, immediately = false) {
        this.viewer.viewport.panTo({
            x: x,
            y: y,
        }, immediately);
    }
    getViewportCenter() {
        return this.viewer.viewport.getCenter(true);
    }
    getViewportBounds() {
        return this.viewer.viewport.getBounds(true);
    }
}

class OptionsFactory {
    static create(id, mimeViewerConfig) {
        let options = OpenSeadragon$1.DEFAULT_SETTINGS;
        return {
            ...options,
            id: id,
            useCanvas: this.canUseCanvas(),
            panVertical: true,
            minZoomImageRatio: 1,
            maxZoomPixelRatio: 5,
            smoothTileEdgesMinZoom: 1,
            preserveImageSizeOnResize: true,
            visibilityRatio: 0,
            showNavigationControl: false,
            animationTime: ViewerOptions.transitions.OSDAnimationTime / 1000,
            ajaxWithCredentials: mimeViewerConfig.withCredentials,
            loadTilesWithAjax: mimeViewerConfig.loadTilesWithAjax,
            crossOriginPolicy: mimeViewerConfig.crossOriginPolicy,
            ajaxHeaders: mimeViewerConfig.ajaxHeaders,
            gestureSettingsMouse: {
                ...options.gestureSettingsMouse,
                scrollToZoom: false,
                clickToZoom: false,
            },
            gestureSettingsTouch: {
                ...options.gestureSettingsTouch,
                dblClickToZoom: false,
                pinchToZoom: false,
                flickEnabled: false,
            },
            gestureSettingsPen: {
                ...options.gestureSettingsPen,
                clickToZoom: false,
            },
            gestureSettingsUnknown: {
                ...options.gestureSettingsUnknown,
                scrollToZoom: false,
                dblClickToZoom: false,
                pinchToZoom: false,
                flickEnabled: false,
            },
        };
    }
    static canUseCanvas() {
        const isHandheldIOS = /iPad|iPhone|iPod/.test(navigator.platform ?? '') ||
            (navigator.platform === 'MacIntel' &&
                typeof navigator.standalone !== 'undefined');
        return !isHandheldIOS;
    }
}

class SwipeDragEndCounter {
    constructor() {
        this.leftCount = 0;
        this.rightCount = 0;
        this.reset();
    }
    reset() {
        this.leftCount = 0;
        this.rightCount = 0;
    }
    /**
     * @param direction of swipe / pan
     * @param side hit by swipe
     */
    addHit(side, dir) {
        if (side !== null) {
            this.incrementSide(side);
        }
        if (dir !== null) {
            this.clearOppositeSideOfDragDirection(dir);
        }
    }
    hitCountReached() {
        return this.leftCount >= 2 || this.rightCount >= 2;
    }
    incrementSide(side) {
        if (side === Side.LEFT) {
            this.leftCount++;
            this.rightCount = 0;
        }
        else if (side === Side.RIGHT) {
            this.rightCount++;
            this.leftCount = 0;
        }
    }
    /**
     * Clear opposite side if swiping in the other direction
     * @param Direction of swipe / pan
     */
    clearOppositeSideOfDragDirection(dir) {
        if (dir === Direction.LEFT) {
            this.leftCount = 0;
        }
        else if (dir === Direction.RIGHT) {
            this.rightCount = 0;
        }
    }
}

class SwipeUtils {
    // Added threshold to prevent sensitive direction-calculation when zoomed in
    static getSwipeDirection(start, end, useThreshold) {
        let deltaX = Math.abs(start.x - end.x);
        const deltaY = Math.abs(start.y - end.y);
        deltaX = useThreshold
            ? deltaX - ViewerOptions.pan.swipeDirectionThreshold
            : deltaX;
        if (start.x > end.x && deltaX >= deltaY) {
            return Direction.LEFT;
        }
        else if (start.x < end.x && deltaX >= deltaY) {
            return Direction.RIGHT;
        }
        else {
            return Direction.UNDEFINED;
        }
    }
    static getSideIfPanningPastEndOfCanvasGroup(canvasGroupRect, vpBounds) {
        if (this.isPanningOutsideLeft(canvasGroupRect, vpBounds)) {
            return Side.LEFT;
        }
        else if (this.isPanningOutsideRight(canvasGroupRect, vpBounds)) {
            return Side.RIGHT;
        }
        else {
            return null;
        }
    }
    static isPanningOutsideCanvasGroup(canvasGroupRect, vpBounds) {
        return (this.isPanningOutsideLeft(canvasGroupRect, vpBounds) ||
            this.isPanningOutsideRight(canvasGroupRect, vpBounds));
    }
    static isPanningOutsideLeft(canvasGroupRect, vpBounds) {
        return vpBounds.x < canvasGroupRect.x;
    }
    static isPanningOutsideRight(canvasGroupRect, vpBounds) {
        return (vpBounds.x + vpBounds.width > canvasGroupRect.x + canvasGroupRect.width);
    }
    /**
     *
     * @param direction Current computed direction, expressed as an
     * angle counterclockwise relative to the positive X axis (-pi to pi, in radians).
     * Only valid if speed > 0.
     */
    static isDirectionInRightSemicircle(direction) {
        return direction > -Math.PI / 2 && direction < Math.PI / 2;
    }
    /**
     * @param direction @see isDirectionInRightSemicircle
     */
    static isDirectionInLeftSemicircle(direction) {
        return !this.isDirectionInRightSemicircle(direction) || direction === 0; // fix for speed = 0
    }
}

class IiifTileSourceStrategy {
    getTileSource(resource) {
        let tileSource;
        if (resource?.service?.service) {
            tileSource = resource.service;
        }
        else {
            tileSource = resource.service['@id'];
            if (!tileSource) {
                tileSource = resource['@id'];
            }
            tileSource =
                tileSource && tileSource.startsWith('//')
                    ? `${location.protocol}${tileSource}`
                    : tileSource;
            tileSource =
                tileSource && !tileSource.endsWith('/info.json')
                    ? `${tileSource}/info.json`
                    : tileSource;
        }
        return tileSource;
    }
}

class IiifV3TileSourceStrategy {
    getTileSource(resource) {
        return resource.service.id;
    }
}

class StaticImageTileSourceStrategy {
    getTileSource(resource) {
        return {
            type: 'image',
            url: resource['@id'] || resource['id'],
        };
    }
}

class TileSourceStrategyFactory {
    static create(resource) {
        if (resource.service) {
            if (resource.type === 'Image') {
                return new IiifV3TileSourceStrategy();
            }
            else {
                return new IiifTileSourceStrategy();
            }
        }
        else {
            return new StaticImageTileSourceStrategy();
        }
    }
}

class Dimensions {
    constructor(fields) {
        this.bottom = 0;
        this.height = 0;
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.width = 0;
        if (fields) {
            this.bottom = fields.bottom || this.bottom;
            this.height = fields.height || this.height;
            this.left = fields.left || this.left;
            this.right = fields.right || this.right;
            this.top = fields.top || this.top;
            this.width = fields.width || this.width;
        }
    }
}

class ZoomUtils {
    /**
     *
     * @param Point in OSD-viewport-coordinates
     * @param Rect canvasGroupBounds
     */
    static constrainPositionToCanvasGroup(point, canvasGroupBounds) {
        if (point.x < canvasGroupBounds.x) {
            point.x = canvasGroupBounds.x;
        }
        else if (point.x > canvasGroupBounds.x + canvasGroupBounds.width) {
            point.x = canvasGroupBounds.x + canvasGroupBounds.width;
        }
        return point;
    }
    static constraintZoomFactor(zoomFactor, currentZoom, maxZoom) {
        const target = currentZoom * zoomFactor;
        return target > maxZoom ? (maxZoom / target) * zoomFactor : zoomFactor;
    }
}

class ZoomStrategy {
    constructor(viewer, canvasService, modeService, viewerLayoutService) {
        this.viewer = viewer;
        this.canvasService = canvasService;
        this.modeService = modeService;
        this.viewerLayoutService = viewerLayoutService;
    }
    setMinZoom(mode) {
        this.viewer.viewport.minZoomLevel = this.getHomeZoomLevel(mode);
    }
    getMinZoom() {
        return Utils.shortenDecimals(this.viewer.viewport.getMinZoom(), 5);
    }
    getMaxZoom() {
        return Utils.shortenDecimals(this.viewer.viewport.getMaxZoom(), 5);
    }
    getZoom() {
        return Utils.shortenDecimals(this.viewer.viewport.getZoom(true), 5);
    }
    goToHomeZoom() {
        this.zoomTo(this.getHomeZoomLevel(this.modeService.mode));
        if (this.modeService.isPageZoomed()) {
            this.modeService.mode = ViewerMode.PAGE;
        }
    }
    zoomTo(level, position) {
        if (level !== 0) {
            this.viewer.viewport.zoomTo(level, position);
        }
    }
    getHomeZoomLevel(mode) {
        if (!this.viewer || !this.canvasService || !this.viewer.container) {
            return 1;
        }
        let currentCanvasHeight;
        let currentCanvasWidth;
        let viewportBounds;
        const currentCanvasGroupRect = this.canvasService.getCurrentCanvasGroupRect();
        currentCanvasHeight = currentCanvasGroupRect.height;
        currentCanvasWidth = currentCanvasGroupRect.width;
        viewportBounds =
            mode === ViewerMode.DASHBOARD
                ? this.getDashboardViewportBounds()
                : this.viewer.viewport.getBounds();
        return this.getFittedZoomLevel(viewportBounds, currentCanvasHeight, currentCanvasWidth);
    }
    zoomIn(zoomFactor, position) {
        if (!zoomFactor) {
            zoomFactor = ViewerOptions.zoom.zoomFactor;
        }
        if (position) {
            position = this.viewer.viewport.pointFromPixel(position);
            if (position) {
                position = ZoomUtils.constrainPositionToCanvasGroup(position, this.canvasService.getCurrentCanvasGroupRect());
            }
        }
        if (this.modeService.mode !== ViewerMode.PAGE_ZOOMED) {
            this.modeService.mode = ViewerMode.PAGE_ZOOMED;
        }
        this.zoomBy(zoomFactor, position);
    }
    zoomOut(zoomFactor, position) {
        if (!zoomFactor) {
            zoomFactor = Math.pow(ViewerOptions.zoom.zoomFactor, -1);
        }
        if (position) {
            position = this.viewer.viewport.pointFromPixel(position);
            if (position) {
                position = ZoomUtils.constrainPositionToCanvasGroup(position, this.canvasService.getCurrentCanvasGroupRect());
            }
        }
        if (this.isViewportLargerThanCanvasGroup()) {
            this.modeService.mode = ViewerMode.PAGE;
        }
        else {
            this.zoomBy(zoomFactor, position);
        }
    }
    getDashboardViewportBounds() {
        const homeZoomFactor = this.getHomeZoomFactor();
        const maxViewportDimensions = new Dimensions(d3
            .select(this.viewer.container.parentNode.parentNode)
            .node()
            .getBoundingClientRect());
        const viewportHeight = maxViewportDimensions.height -
            ViewerOptions.padding.header -
            ViewerOptions.padding.footer;
        const viewportWidth = maxViewportDimensions.width * homeZoomFactor;
        const viewportSizeInViewportCoordinates = this.viewer.viewport.deltaPointsFromPixels(new OpenSeadragon$1.Point(viewportWidth, viewportHeight));
        return new OpenSeadragon$1.Rect(0, 0, viewportSizeInViewportCoordinates.x, viewportSizeInViewportCoordinates.y);
    }
    getFittedZoomLevel(viewportBounds, canvasGroupHeight, canvasGroupWidth) {
        const currentZoom = this.viewer.viewport.getZoom();
        const resizeRatio = viewportBounds.height / canvasGroupHeight;
        if (resizeRatio * canvasGroupWidth <= viewportBounds.width) {
            return Utils.shortenDecimals(resizeRatio * currentZoom, 5);
        }
        else {
            // Canvas group at full height is wider than viewport.  Return fit by width instead.
            return Utils.shortenDecimals((viewportBounds.width / canvasGroupWidth) * currentZoom, 5);
        }
    }
    zoomBy(zoomFactor, position) {
        const currentZoom = this.viewer.viewport.getZoom(false);
        zoomFactor = ZoomUtils.constraintZoomFactor(zoomFactor, currentZoom, this.getMaxZoom());
        this.viewer.viewport.zoomBy(zoomFactor, position);
    }
    isViewportLargerThanCanvasGroup() {
        const canvasGroupRec = this.canvasService.getCurrentCanvasGroupRect();
        const viewportBounds = this.viewer.viewport.getBounds();
        const pbWidth = Math.round(canvasGroupRec.width);
        const pbHeight = Math.round(canvasGroupRec.height);
        const vpWidth = Math.round(viewportBounds.width);
        const vpHeight = Math.round(viewportBounds.height);
        return vpHeight >= pbHeight || vpWidth >= pbWidth;
    }
    getHomeZoomFactor() {
        return this.modeService.mode === ViewerMode.DASHBOARD
            ? this.getDashboardZoomHomeFactor()
            : 1;
    }
    getDashboardZoomHomeFactor() {
        return this.viewerLayoutService.layout === ViewerLayout.ONE_PAGE
            ? 0.85
            : 0.66;
    }
}
class DefaultZoomStrategy extends ZoomStrategy {
    constructor(viewer, canvasService, modeService, viewerLayoutService) {
        super(viewer, canvasService, modeService, viewerLayoutService);
    }
}

class ViewerService {
    constructor(zone, clickService, canvasService, modeService, viewerLayoutService, iiifContentSearchService, styleService, altoService, snackBar, intl) {
        this.zone = zone;
        this.clickService = clickService;
        this.canvasService = canvasService;
        this.modeService = modeService;
        this.viewerLayoutService = viewerLayoutService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.styleService = styleService;
        this.altoService = altoService;
        this.snackBar = snackBar;
        this.intl = intl;
        this.overlays = [];
        this.tileSources = [];
        this.isCanvasPressed = new BehaviorSubject(false);
        this.currentCenter = new Subject();
        this.currentCanvasIndex = new BehaviorSubject(0);
        this.currentHit = null;
        this.osdIsReady = new BehaviorSubject(false);
        this.swipeDragEndCounter = new SwipeDragEndCounter();
        this.pinchStatus = new PinchStatus();
        this.isManifestPaged = false;
        this.currentSearch = null;
        this.rotation = new BehaviorSubject(0);
        this.dragStatus = false;
        this.id = 'ngx-mime-mimeViewer';
        this.openseadragonId = 'openseadragon';
        /**
         * Scroll-handler
         */
        this.scrollHandler = (event) => {
            const zoomFactor = Math.pow(ViewerOptions.zoom.zoomFactor, event.scroll);
            // Scrolling up
            if (event.scroll > 0) {
                this.zoomInGesture(event.position, zoomFactor);
                // Scrolling down
            }
            else if (event.scroll < 0) {
                this.zoomOutGesture(event.position, zoomFactor);
            }
        };
        /**
         * Pinch-handler
         */
        this.pinchHandler = (event) => {
            this.pinchStatus.active = true;
            const zoomFactor = event.distance / event.lastDistance;
            // Pinch Out
            if (event.distance >
                event.lastDistance + ViewerOptions.zoom.pinchZoomThreshold) {
                this.zoomInPinchGesture(event, zoomFactor);
                // Pinch In
            }
            else if (event.distance + ViewerOptions.zoom.pinchZoomThreshold <
                event.lastDistance) {
                this.zoomOutPinchGesture(event, zoomFactor);
            }
        };
        /**
         * Single-click-handler
         * Single-click toggles between page/dashboard-mode if a page is hit
         */
        this.singleClickHandler = (event) => {
            const tileIndex = this.getOverlayIndexFromClickEvent(event);
            const requestedCanvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(tileIndex);
            if (requestedCanvasGroupIndex !== -1) {
                this.canvasService.currentCanvasGroupIndex = requestedCanvasGroupIndex;
            }
            else {
                this.calculateCurrentCanvasGroup(this.viewer?.viewport.getCenter(true));
            }
            this.modeService.toggleMode();
        };
        /**
         * Double-click-handler
         * Double-click dashboard-mode should go to page-mode
         * Double-click page-mode should
         *    a) Zoom in if page is fitted vertically, or
         *    b) Fit vertically if page is already zoomed in
         */
        this.dblClickHandler = (event) => {
            // Page is fitted vertically, so dbl-click zooms in
            if (this.modeService.mode === ViewerMode.PAGE) {
                this.modeService.mode = ViewerMode.PAGE_ZOOMED;
                this.zoomStrategy.zoomIn(ViewerOptions.zoom.dblClickZoomFactor, event.position);
            }
            else {
                this.modeService.mode = ViewerMode.PAGE;
                const canvasIndex = this.getOverlayIndexFromClickEvent(event);
                const requestedCanvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(canvasIndex);
                if (requestedCanvasGroupIndex >= 0) {
                    this.canvasService.currentCanvasGroupIndex = requestedCanvasGroupIndex;
                }
                else {
                    this.calculateCurrentCanvasGroup(this.viewer?.viewport.getCenter(true));
                }
            }
        };
        this.dragHandler = (e) => {
            this.viewer.panHorizontal = true;
            if (this.modeService.isPageZoomed()) {
                const canvasGroupRect = this.canvasService.getCurrentCanvasGroupRect();
                const vpBounds = this.getViewportBounds();
                const pannedPastCanvasGroup = SwipeUtils.getSideIfPanningPastEndOfCanvasGroup(canvasGroupRect, vpBounds);
                const direction = e.direction;
                if ((pannedPastCanvasGroup === Side.LEFT &&
                    SwipeUtils.isDirectionInRightSemicircle(direction)) ||
                    (pannedPastCanvasGroup === Side.RIGHT &&
                        SwipeUtils.isDirectionInLeftSemicircle(direction))) {
                    this.viewer.panHorizontal = false;
                }
            }
        };
        this.id = this.generateRandomId('ngx-mime-mimeViewer');
        this.openseadragonId = this.generateRandomId('openseadragon');
    }
    get onRotationChange() {
        return this.rotation.asObservable().pipe(distinctUntilChanged());
    }
    get onCenterChange() {
        return this.currentCenter.asObservable();
    }
    get onCanvasGroupIndexChange() {
        return this.currentCanvasIndex.asObservable().pipe(distinctUntilChanged());
    }
    get onOsdReadyChange() {
        return this.osdIsReady.asObservable().pipe(distinctUntilChanged());
    }
    initialize() {
        this.unsubscribe();
        this.subscriptions = new Subscription();
    }
    setConfig(config) {
        this.config = config;
    }
    getViewer() {
        return this.viewer;
    }
    getTilesources() {
        return this.tileSources;
    }
    getOverlays() {
        return this.overlays;
    }
    getZoom() {
        return this.zoomStrategy.getZoom();
    }
    getMinZoom() {
        return this.zoomStrategy.getMinZoom();
    }
    getMaxZoom() {
        return this.zoomStrategy.getMaxZoom();
    }
    home() {
        if (!this.osdIsReady.getValue()) {
            return;
        }
        this.zoomStrategy.setMinZoom(this.modeService.mode);
        this.goToCanvasGroupStrategy.centerCurrentCanvas();
        this.zoomStrategy.goToHomeZoom();
    }
    goToPreviousCanvasGroup() {
        this.goToCanvasGroupStrategy.goToPreviousCanvasGroup(this.currentCanvasIndex.getValue());
    }
    goToNextCanvasGroup() {
        this.goToCanvasGroupStrategy.goToNextCanvasGroup(this.currentCanvasIndex.getValue());
    }
    goToCanvasGroup(canvasGroupIndex, immediately) {
        this.goToCanvasGroupStrategy.goToCanvasGroup({
            canvasGroupIndex: canvasGroupIndex,
            immediately: immediately,
        });
    }
    goToCanvas(canvasIndex, immediately) {
        const canvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(canvasIndex);
        this.goToCanvasGroupStrategy.goToCanvasGroup({
            canvasGroupIndex: canvasGroupIndex,
            immediately: immediately,
        });
    }
    highlight(searchResult) {
        this.clearHightlight();
        if (this.viewer) {
            if (searchResult.q) {
                this.currentSearch = searchResult;
            }
            const rotation = this.rotation.getValue();
            for (const hit of searchResult.hits) {
                for (const highlightRect of hit.highlightRects) {
                    const canvasRect = this.canvasService.getCanvasRect(highlightRect.canvasIndex);
                    if (canvasRect) {
                        const currentHitStrokeOffset = 8;
                        let width = highlightRect.width + currentHitStrokeOffset;
                        let height = highlightRect.height + currentHitStrokeOffset;
                        let x = canvasRect.x - currentHitStrokeOffset / 2;
                        let y = canvasRect.y - currentHitStrokeOffset / 2;
                        /* hit rect are relative to each unrotated page canvasRect so x,y must be adjusted by the remaining space */
                        switch (rotation) {
                            case 0:
                                x += highlightRect.x;
                                y += highlightRect.y;
                                break;
                            case 90:
                                x += canvasRect.width - highlightRect.y - highlightRect.height;
                                y += highlightRect.x;
                                /* Flip height & width */
                                width = highlightRect.height + currentHitStrokeOffset;
                                height = highlightRect.width + currentHitStrokeOffset;
                                break;
                            case 180:
                                x += canvasRect.width - (highlightRect.x + highlightRect.width);
                                y += canvasRect.height - (highlightRect.y + highlightRect.height);
                                break;
                            case 270:
                                x += highlightRect.y;
                                y += canvasRect.height - highlightRect.x - highlightRect.width;
                                /* Flip height & width */
                                width = highlightRect.height + currentHitStrokeOffset;
                                height = highlightRect.width + currentHitStrokeOffset;
                                break;
                        }
                        const currentOverlay = this.svgNode
                            .append('rect')
                            .attr('mimeHitIndex', hit.id)
                            .attr('x', x)
                            .attr('y', y)
                            .attr('width', width)
                            .attr('height', height)
                            .attr('class', 'hit');
                    }
                }
            }
        }
    }
    highlightCurrentHit() {
        if (this.currentHit) {
            this.svgNode.selectAll(`g > rect.selected`).attr('class', 'hit');
            this.svgNode
                .selectAll(`g > rect[mimeHitIndex='${this.currentHit.id}']`)
                .attr('class', 'hit selected');
        }
    }
    clearHightlight() {
        if (this.svgNode) {
            this.svgNode.selectAll('.hit').remove();
            this.currentSearch = null;
        }
    }
    setUpViewer(manifest, config) {
        this.config = config;
        if (manifest && manifest.tileSource) {
            this.tileSources = manifest.tileSource;
            this.zone.runOutsideAngular(() => {
                this.manifest = manifest;
                this.isManifestPaged = ManifestUtils.isManifestPaged(this.manifest);
                this.viewer = new OpenSeadragon.Viewer(OptionsFactory.create(this.openseadragonId, this.config));
                createSvgOverlay();
                this.zoomStrategy = new DefaultZoomStrategy(this.viewer, this.canvasService, this.modeService, this.viewerLayoutService);
                this.goToCanvasGroupStrategy = new DefaultGoToCanvasGroupStrategy(this.viewer, this.zoomStrategy, this.canvasService, this.modeService, this.config, this.manifest.viewingDirection);
                /*
                  This disables keyboard navigation in openseadragon.
                  We use s for opening search dialog and OSD use the same key for panning.
                  Issue: https://github.com/openseadragon/openseadragon/issues/794
                 */
                this.defaultKeyDownHandler = this.viewer.innerTracker.keyDownHandler;
                this.disableKeyDownHandler();
                this.viewer.innerTracker.keyHandler = null;
                this.canvasService.reset();
                this.canvasGroupMask = new CanvasGroupMask(this.viewer, this.styleService);
            });
            this.addToWindow();
            this.setupOverlays();
            this.createOverlays();
            this.addEvents();
            this.addSubscriptions();
        }
    }
    addSubscriptions() {
        this.initialize();
        this.subscriptions.add(this.modeService.onChange.subscribe((mode) => {
            this.modeChanged(mode);
        }));
        this.zone.runOutsideAngular(() => {
            this.subscriptions.add(this.onCenterChange
                .pipe(sample(interval(500)))
                .subscribe((center) => {
                this.calculateCurrentCanvasGroup(center);
                if (center && center !== null) {
                    this.osdIsReady.next(true);
                }
            }));
        });
        this.subscriptions.add(this.canvasService.onCanvasGroupIndexChange.subscribe((canvasGroupIndex) => {
            this.swipeDragEndCounter.reset();
            if (canvasGroupIndex !== -1) {
                this.canvasGroupMask.changeCanvasGroup(this.canvasService.getCanvasGroupRect(canvasGroupIndex));
                if (this.modeService.mode === ViewerMode.PAGE ||
                    this.modeService.mode === ViewerMode.DASHBOARD) {
                    this.zoomStrategy.goToHomeZoom();
                }
            }
        }));
        this.subscriptions.add(this.onOsdReadyChange.subscribe((state) => {
            if (state) {
                this.initialCanvasGroupLoaded();
                this.currentCenter.next(this.viewer?.viewport.getCenter(true));
            }
        }));
        this.subscriptions.add(this.viewerLayoutService.onChange.subscribe((state) => {
            this.layoutPages();
        }));
        this.subscriptions.add(this.iiifContentSearchService.onSelected.subscribe((hit) => {
            if (hit) {
                this.currentHit = hit;
                this.highlightCurrentHit();
                this.goToCanvas(hit.index, false);
            }
        }));
        this.subscriptions.add(this.onRotationChange.subscribe((rotation) => {
            this.layoutPages();
        }));
        this.subscriptions.add(this.altoService.onRecognizedTextContentModeChange$.subscribe((recognizedTextModeChanges) => {
            if (recognizedTextModeChanges.currentValue === RecognizedTextMode.ONLY) {
                this.hidePages();
            }
            if (recognizedTextModeChanges.previousValue === RecognizedTextMode.ONLY) {
                this.showPages();
            }
            if (recognizedTextModeChanges.previousValue ===
                RecognizedTextMode.ONLY &&
                recognizedTextModeChanges.currentValue === RecognizedTextMode.SPLIT) {
                setTimeout(() => {
                    this.home();
                }, ViewerOptions.transitions.OSDAnimationTime);
            }
        }));
    }
    hidePages() {
        this.setOpacityOnPages(0);
    }
    showPages() {
        this.setOpacityOnPages(1);
    }
    layoutPages() {
        if (this.osdIsReady.getValue()) {
            const currentCanvasIndex = this.canvasService.currentCanvasIndex;
            this.destroy(true);
            this.setUpViewer(this.manifest, this.config);
            this.goToCanvasGroupStrategy.goToCanvasGroup({
                canvasGroupIndex: this.canvasService.findCanvasGroupByCanvasIndex(currentCanvasIndex),
                immediately: false,
            });
            // Recreate highlights if there is an active search going on
            if (this.currentSearch) {
                this.highlight(this.currentSearch);
            }
        }
    }
    addToWindow() {
        window.openSeadragonViewer = this.viewer;
    }
    setupOverlays() {
        this.svgOverlay = this.viewer.svgOverlay();
        this.svgNode = d3.select(this.svgOverlay.node());
    }
    disableKeyDownHandler() {
        this.viewer.innerTracker.keyDownHandler = null;
    }
    resetKeyDownHandler() {
        this.viewer.innerTracker.keyDownHandler = this.defaultKeyDownHandler;
    }
    /**
     *
     * @param layoutSwitch true if switching between layouts
     * to keep current search-state and rotation
     */
    destroy(layoutSwitch) {
        this.osdIsReady.next(false);
        this.currentCenter.next({ x: 0, y: 0 });
        if (this.viewer != null && this.viewer.isOpen()) {
            if (this.viewer.container != null) {
                d3.select(this.viewer.container.parentNode).style('opacity', '0');
            }
            this.viewer.destroy();
            this.viewer = null;
        }
        this.overlays = [];
        this.canvasService.reset();
        if (this.canvasGroupMask) {
            this.canvasGroupMask.destroy();
        }
        // Keep search-state and rotation only if layout-switch
        if (!layoutSwitch) {
            this.altoService.destroy();
            this.currentSearch = null;
            this.iiifContentSearchService.destroy();
            this.rotation.next(0);
            this.modeService.destroy();
            this.unsubscribe();
        }
    }
    addEvents() {
        this.clickService.reset();
        this.clickService.addSingleClickHandler(this.singleClickHandler);
        this.clickService.addDoubleClickHandler(this.dblClickHandler);
        this.viewer.addHandler('animation-finish', () => {
            this.currentCenter.next(this.viewer?.viewport.getCenter(true));
        });
        this.viewer.addHandler('canvas-click', this.clickService.click);
        this.viewer.addHandler('canvas-double-click', (e) => (e.preventDefaultAction = true));
        this.viewer.addHandler('canvas-press', (e) => {
            this.pinchStatus.active = false;
            this.dragStartPosition = e.position;
            this.isCanvasPressed.next(true);
        });
        this.viewer.addHandler('canvas-release', () => this.isCanvasPressed.next(false));
        this.viewer.addHandler('canvas-scroll', this.scrollHandler);
        this.viewer.addHandler('canvas-pinch', this.pinchHandler);
        this.viewer.addHandler('canvas-drag', (e) => {
            this.dragStatus = true;
            this.dragHandler(e);
        });
        this.viewer.addHandler('canvas-drag-end', (e) => {
            if (this.dragStatus) {
                this.constraintCanvas();
                this.swipeToCanvasGroup(e);
            }
            this.dragStatus = false;
        });
        this.viewer.addHandler('animation', (e) => {
            this.currentCenter.next(this.viewer?.viewport.getCenter(true));
        });
    }
    zoomIn(zoomFactor, position) {
        this.zoomStrategy.zoomIn(zoomFactor, position);
    }
    zoomOut(zoomFactor, position) {
        this.zoomStrategy.zoomOut(zoomFactor, position);
    }
    rotate() {
        if (this.osdIsReady.getValue()) {
            if (this.viewer.useCanvas) {
                this.rotateToRight();
                this.highlightCurrentHit();
            }
            else {
                this.showRotationIsNotSupportetMessage();
            }
        }
    }
    /**
     * Callback for mode-change
     * @param mode ViewerMode
     */
    modeChanged(mode) {
        if (!this.viewer) {
            return;
        }
        if (mode.currentValue === ViewerMode.DASHBOARD) {
            this.viewer.panVertical = false;
            this.toggleToDashboard();
            this.disableKeyDownHandler();
        }
        else if (mode.currentValue === ViewerMode.PAGE) {
            this.viewer.panVertical = false;
            this.toggleToPage();
            this.disableKeyDownHandler();
        }
        else if (mode.currentValue === ViewerMode.PAGE_ZOOMED) {
            this.viewer.panVertical = true;
            this.resetKeyDownHandler();
        }
    }
    generateRandomId(prefix) {
        const randomString = Math.random().toString(16).slice(2);
        return `${prefix}-${randomString}`;
    }
    /**
     * Switches to DASHBOARD-mode, repositions canvas group and removes max-width on viewer
     */
    toggleToDashboard() {
        if (!this.canvasService.isCurrentCanvasGroupValid()) {
            return;
        }
        this.goToCanvasGroupStrategy.goToCanvasGroup({
            canvasGroupIndex: this.canvasService.currentCanvasGroupIndex,
            immediately: false,
        });
        this.canvasGroupMask.hide();
        this.zoomStrategy.setMinZoom(ViewerMode.DASHBOARD);
        this.zoomStrategy.goToHomeZoom();
    }
    /**
     * Switches to PAGE-mode, centers current canvas group and repositions other canvas groups
     */
    toggleToPage() {
        if (!this.canvasService.isCurrentCanvasGroupValid()) {
            return;
        }
        this.goToCanvasGroupStrategy.goToCanvasGroup({
            canvasGroupIndex: this.canvasService.currentCanvasGroupIndex,
            immediately: false,
        });
        this.canvasGroupMask.show();
        this.zoomStrategy.setMinZoom(ViewerMode.PAGE);
        this.zoomStrategy.goToHomeZoom();
    }
    /**
     *
     * @param point to zoom to. If not set, the viewer will zoom to center
     */
    zoomInGesture(position, zoomFactor) {
        if (this.modeService.mode === ViewerMode.DASHBOARD) {
            this.modeService.mode = ViewerMode.PAGE;
        }
        else {
            if (position) {
                this.zoomStrategy.zoomIn(zoomFactor, position);
            }
            else {
                this.zoomStrategy.zoomIn();
            }
        }
    }
    zoomOutGesture(position, zoomFactor) {
        if (this.modeService.isPageZoomed()) {
            this.zoomStrategy.zoomOut(zoomFactor, position);
        }
        else if (this.modeService.mode === ViewerMode.PAGE) {
            this.modeService.mode = ViewerMode.DASHBOARD;
        }
    }
    /**
     * Process zoom in pinch gesture (pinch out)
     *
     * Toggle to page mode and Zoom in
     *
     * @param event from pinch gesture
     */
    zoomInPinchGesture(event, zoomFactor) {
        if (this.modeService.mode === ViewerMode.DASHBOARD) {
            this.modeService.mode = ViewerMode.PAGE;
        }
        else {
            this.zoomIn(zoomFactor, this.dragStartPosition || event.center);
        }
    }
    /**
     * Process zoom out pinch gesture (pinch in)
     *
     * Zoom out and toggle to dashboard when all zoomed out.
     * Stop between zooming out and toggling to dashboard.
     *
     * @param event from pinch gesture
     */
    zoomOutPinchGesture(event, zoomFactor) {
        const gestureId = event.gesturePoints[0].id;
        if (this.modeService.isPageZoomed()) {
            this.pinchStatus.shouldStop = true;
            this.zoomStrategy.zoomOut(zoomFactor, event.center);
        }
        else if (this.modeService.mode === ViewerMode.PAGE) {
            if (!this.pinchStatus.shouldStop ||
                gestureId === this.pinchStatus.previousGestureId + 2) {
                this.pinchStatus.shouldStop = false;
                this.modeService.toggleMode();
            }
            this.pinchStatus.previousGestureId = gestureId;
        }
    }
    goToHomeZoom() {
        this.zoomStrategy.goToHomeZoom();
    }
    /**
     * Checks if hit element is a <rect>-element
     * @param target
     */
    isCanvasGroupHit(target) {
        return target instanceof SVGRectElement;
    }
    /**
     * Iterates tilesources and adds them to viewer
     * Creates svg clickable overlays for each tile
     */
    createOverlays() {
        this.overlays = [];
        const canvasRects = [];
        const calculateCanvasGroupPositionStrategy = CalculateCanvasGroupPositionFactory.create(this.viewerLayoutService.layout, this.isManifestPaged, this.config);
        const isTwoPageView = this.viewerLayoutService.layout === ViewerLayout.TWO_PAGE;
        const rotation = this.rotation.getValue();
        let group = this.svgNode.append('g').attr('class', 'page-group');
        this.tileSources.forEach((tile, i) => {
            const position = calculateCanvasGroupPositionStrategy.calculateCanvasGroupPosition({
                canvasGroupIndex: i,
                canvasSource: tile,
                previousCanvasGroupPosition: canvasRects[i - 1],
                viewingDirection: this.manifest.viewingDirection,
            }, rotation);
            canvasRects.push(position);
            const tileSourceStrategy = TileSourceStrategyFactory.create(tile);
            const tileSource = tileSourceStrategy.getTileSource(tile);
            this.zone.runOutsideAngular(() => {
                const rotated = rotation === 90 || rotation === 270;
                let bounds;
                /* Because image scaling is performed before rotation,
                 * we must invert width & height and translate position so that tile rotation ends up correct
                 */
                if (rotated) {
                    bounds = new OpenSeadragon.Rect(position.x + (position.width - position.height) / 2, position.y - (position.width - position.height) / 2, position.height, position.width);
                }
                else {
                    bounds = new OpenSeadragon.Rect(position.x, position.y, position.width, position.height);
                }
                this.viewer.addTiledImage({
                    index: i,
                    tileSource: tileSource,
                    fitBounds: bounds,
                    degrees: rotation,
                });
            });
            if (isTwoPageView && i % 2 !== 0) {
                group = this.svgNode.append('g').attr('class', 'page-group');
            }
            const currentOverlay = group
                .append('rect')
                .attr('x', position.x)
                .attr('y', position.y)
                .attr('width', position.width)
                .attr('height', position.height)
                .attr('class', 'tile');
            // Make custom borders if current layout is two-paged
            if (isTwoPageView) {
                if (i % 2 === 0 && i !== 0) {
                    const noLeftStrokeStyle = Number(position.width * 2 + position.height) +
                        ', ' +
                        position.width * 2;
                    currentOverlay.style('stroke-dasharray', noLeftStrokeStyle);
                }
                else if (i % 2 !== 0 && i !== 0) {
                    const noRightStrokeStyle = position.width +
                        ', ' +
                        position.height +
                        ', ' +
                        Number(position.width * 2 + position.height);
                    currentOverlay.style('stroke-dasharray', noRightStrokeStyle);
                }
            }
            const currentOverlayNode = currentOverlay.node();
            this.overlays[i] = currentOverlayNode;
        });
        const layout = this.viewerLayoutService.layout === ViewerLayout.ONE_PAGE ||
            !this.isManifestPaged
            ? ViewerLayout.ONE_PAGE
            : ViewerLayout.TWO_PAGE;
        this.canvasService.addAll(canvasRects, layout);
    }
    /**
     * Sets viewer size and opacity once the first canvas group has fully loaded
     */
    initialCanvasGroupLoaded() {
        this.home();
        this.canvasGroupMask.initialize(this.canvasService.getCurrentCanvasGroupRect(), this.modeService.mode !== ViewerMode.DASHBOARD);
        if (this.viewer) {
            d3.select(this.viewer.container.parentNode)
                .transition()
                .duration(ViewerOptions.transitions.OSDAnimationTime)
                .style('opacity', '1');
        }
    }
    /**
     * Returns overlay-index for click-event if hit
     * @param target hit <rect>
     */
    getOverlayIndexFromClickEvent(event) {
        const target = this.getOriginalTarget(event);
        if (this.isCanvasGroupHit(target)) {
            const requestedCanvasGroup = this.overlays.indexOf(target);
            if (requestedCanvasGroup >= 0) {
                return requestedCanvasGroup;
            }
        }
        return -1;
    }
    calculateCurrentCanvasGroup(center) {
        if (center) {
            const currentCanvasGroupIndex = this.canvasService.findClosestCanvasGroupIndex(center);
            this.currentCanvasIndex.next(currentCanvasGroupIndex);
        }
    }
    constraintCanvas() {
        if (this.modeService.isPageZoomed()) {
            const viewportBounds = this.getViewportBounds();
            const currentCanvasBounds = this.getCurrentCanvasBounds();
            this.isCanvasOutsideViewport(viewportBounds, currentCanvasBounds)
                ? this.constraintCanvasOutsideViewport(viewportBounds, currentCanvasBounds)
                : this.constraintCanvasInsideViewport(viewportBounds);
        }
    }
    getCurrentCanvasBounds() {
        return this.viewer.world
            .getItemAt(this.canvasService.currentCanvasGroupIndex)
            .getBounds();
    }
    isCanvasOutsideViewport(viewportBounds, canvasBounds) {
        return viewportBounds.height < canvasBounds.height;
    }
    constraintCanvasOutsideViewport(viewportBounds, canvasBounds) {
        let rect = undefined;
        if (this.isCanvasBelowViewportTop(viewportBounds, canvasBounds)) {
            rect = new Rect({
                x: viewportBounds.x + viewportBounds.width / 2,
                y: canvasBounds.y + viewportBounds.height / 2,
            });
        }
        else if (this.isCanvasAboveViewportBottom(viewportBounds, canvasBounds)) {
            rect = new Rect({
                x: viewportBounds.x + viewportBounds.width / 2,
                y: canvasBounds.y + canvasBounds.height - viewportBounds.height / 2,
            });
        }
        this.panTo(rect, true);
    }
    constraintCanvasInsideViewport(viewportBounds) {
        const canvasGroupRect = this.canvasService.getCanvasGroupRect(this.canvasService.currentCanvasGroupIndex);
        const rect = new Rect({
            x: viewportBounds.x + viewportBounds.width / 2,
            y: canvasGroupRect.centerY,
        });
        this.panTo(rect, true);
    }
    isCanvasBelowViewportTop(viewportBounds, canvasBounds) {
        return viewportBounds.y < canvasBounds.y;
    }
    isCanvasAboveViewportBottom(viewportBounds, canvasBounds) {
        return (canvasBounds.y + canvasBounds.height <
            viewportBounds.y + viewportBounds.height);
    }
    swipeToCanvasGroup(e) {
        // Don't swipe on pinch actions
        if (this.pinchStatus.active) {
            return;
        }
        const speed = e.speed;
        const dragEndPosision = e.position;
        const canvasGroupRect = this.canvasService.getCurrentCanvasGroupRect();
        const viewportBounds = this.getViewportBounds();
        const direction = SwipeUtils.getSwipeDirection(this.dragStartPosition, dragEndPosision, this.modeService.isPageZoomed());
        const currentCanvasGroupIndex = this.canvasService.currentCanvasGroupIndex;
        const calculateNextCanvasGroupStrategy = CalculateNextCanvasGroupFactory.create(this.modeService.mode);
        let pannedPastSide;
        let canvasGroupEndHitCountReached = false;
        if (this.modeService.isPageZoomed()) {
            pannedPastSide = SwipeUtils.getSideIfPanningPastEndOfCanvasGroup(canvasGroupRect, viewportBounds);
            this.swipeDragEndCounter.addHit(pannedPastSide, direction);
            canvasGroupEndHitCountReached =
                this.swipeDragEndCounter.hitCountReached();
        }
        const newCanvasGroupIndex = this.canvasService.constrainToRange(calculateNextCanvasGroupStrategy.calculateNextCanvasGroup({
            currentCanvasGroupCenter: this.currentCanvasIndex.getValue(),
            speed: speed,
            direction: direction,
            currentCanvasGroupIndex: currentCanvasGroupIndex,
            canvasGroupEndHitCountReached: canvasGroupEndHitCountReached,
            viewingDirection: this.manifest.viewingDirection,
        }));
        if (this.modeService.mode === ViewerMode.DASHBOARD ||
            this.modeService.mode === ViewerMode.PAGE ||
            (canvasGroupEndHitCountReached && direction)) {
            this.goToCanvasGroupStrategy.goToCanvasGroup({
                canvasGroupIndex: newCanvasGroupIndex,
                immediately: false,
                direction: direction,
            });
        }
    }
    getViewportBounds() {
        return this.viewer?.viewport.getBounds();
    }
    getOriginalTarget(event) {
        return event.originalTarget
            ? event.originalTarget
            : event.originalEvent.target;
    }
    panTo(rect, immediately = false) {
        if (rect) {
            this.viewer.viewport.panTo({
                x: rect.x,
                y: rect.y,
            }, immediately);
        }
    }
    rotateToRight() {
        this.rotation.next((this.rotation.getValue() + 90) % 360);
    }
    showRotationIsNotSupportetMessage() {
        this.snackBar.open(this.intl.rotationIsNotSupported, undefined, {
            duration: 3000,
        });
    }
    setOpacityOnPages(opacity) {
        if (this.viewer) {
            const itemCount = this.viewer.world.getItemCount();
            for (let i = 0; i < itemCount; i++) {
                const item = this.viewer.world.getItemAt(i);
                item.setOpacity(opacity);
            }
        }
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerService, deps: [{ token: i0.NgZone }, { token: ClickService }, { token: CanvasService }, { token: ModeService }, { token: ViewerLayoutService }, { token: IiifContentSearchService }, { token: StyleService }, { token: AltoService }, { token: i8.MatSnackBar }, { token: MimeViewerIntl }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: ClickService }, { type: CanvasService }, { type: ModeService }, { type: ViewerLayoutService }, { type: IiifContentSearchService }, { type: StyleService }, { type: AltoService }, { type: i8.MatSnackBar }, { type: MimeViewerIntl }]; } });

class MimeResizeService {
    constructor(viewerService) {
        this.viewerService = viewerService;
        this.resizeSubject = new ReplaySubject();
    }
    set el(el) {
        this._el = el;
    }
    get el() {
        return this._el;
    }
    get onResize() {
        return this.resizeSubject.pipe(debounceTime$1(200), map((contentRect) => {
            return {
                bottom: contentRect.bottom,
                height: contentRect.height,
                left: contentRect.left,
                right: contentRect.right,
                top: contentRect.top,
                width: contentRect.width,
            };
        }));
    }
    initialize() {
        if (this.isResizeObserverSupported()) {
            this.initializeResizeObserver();
        }
    }
    destroy() {
        this.observer?.disconnect();
    }
    isResizeObserverSupported() {
        return 'ResizeObserver' in window;
    }
    initializeResizeObserver() {
        this.observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                this.handleResizeEntry(entry);
            }
        });
        const el = this.el.nativeElement.querySelector(`#${this.viewerService.id}`);
        if (el) {
            this.observer?.observe(el);
        }
    }
    handleResizeEntry(entry) {
        this.resizeSubject.next(entry.contentRect);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeResizeService, deps: [{ token: ViewerService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeResizeService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeResizeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: ViewerService }]; } });

class FullscreenService {
    constructor() {
        this.changeSubject = new ReplaySubject();
        this.onchange();
    }
    get onChange() {
        return this.changeSubject.asObservable();
    }
    isEnabled() {
        const d = document;
        return (d.fullscreenEnabled ||
            d.webkitFullscreenEnabled ||
            d.mozFullScreenEnabled ||
            d.msFullscreenEnabled);
    }
    isFullscreen() {
        const d = document;
        return (d.fullscreenElement ||
            d.webkitFullscreenElement ||
            d.mozFullScreenElement ||
            d.msFullscreenElement);
    }
    toggle(el) {
        this.isFullscreen() ? this.closeFullscreen(el) : this.openFullscreen(el);
    }
    onchange() {
        const d = document;
        const func = () => {
            this.changeSubject.next(true);
        };
        if (d.fullscreenEnabled) {
            document.addEventListener('fullscreenchange', func);
        }
        else if (d.webkitFullscreenEnabled) {
            document.addEventListener('webkitfullscreenchange', func);
        }
        else if (d.mozFullScreenEnabled) {
            document.addEventListener('mozfullscreenchange', func);
        }
        else if (d.msFullscreenEnabled) {
            document.addEventListener('msfullscreenchange', func);
        }
    }
    openFullscreen(elem) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        }
        else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
        else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }
    closeFullscreen(elem) {
        const d = document;
        if (d.exitFullscreen) {
            d.exitFullscreen();
        }
        else if (d.mozCancelFullScreen) {
            d.mozCancelFullScreen();
        }
        else if (d.webkitExitFullscreen) {
            d.webkitExitFullscreen();
        }
        else if (d.msExitFullscreen) {
            d.msExitFullscreen();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: FullscreenService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: FullscreenService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: FullscreenService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class MimeDomHelper {
    constructor(fullscreen, viewerService) {
        this.fullscreen = fullscreen;
        this.viewerService = viewerService;
    }
    getBoundingClientRect(el) {
        try {
            if (this.isDocumentInFullScreenMode() &&
                el.nativeElement.nodeName === 'MIME-VIEWER') {
                return this.createFullscreenDimensions(el);
            }
            else {
                return this.createDimensions(el);
            }
        }
        catch (e) {
            return new Dimensions();
        }
    }
    isDocumentInFullScreenMode() {
        return this.fullscreen.isFullscreen();
    }
    toggleFullscreen() {
        const el = this.getViewerElement();
        if (el && this.fullscreen.isEnabled()) {
            this.fullscreen.toggle(el);
        }
    }
    setFocusOnViewer() {
        const el = this.getViewerElement();
        if (el) {
            el.focus();
        }
    }
    getViewerElement() {
        return document.querySelector(`#${this.viewerService.id}`);
    }
    createFullscreenDimensions(el) {
        const dimensions = el.nativeElement.getBoundingClientRect();
        const width = this.getFullscreenWidth();
        const height = this.getFullscreenHeight();
        return new Dimensions({
            ...dimensions,
            top: 0,
            bottom: height,
            width: width,
            height: height,
            left: 0,
            right: width,
        });
    }
    createDimensions(el) {
        const dimensions = el.nativeElement.getBoundingClientRect();
        return new Dimensions({
            top: dimensions.top,
            bottom: dimensions.bottom,
            width: dimensions.width,
            height: dimensions.height,
            left: dimensions.left,
            right: dimensions.right,
        });
    }
    getFullscreenWidth() {
        return (window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth);
    }
    getFullscreenHeight() {
        return (window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeDomHelper, deps: [{ token: FullscreenService }, { token: ViewerService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeDomHelper }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeDomHelper, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: FullscreenService }, { type: ViewerService }]; } });

class MobileContentSearchDialogConfigStrategy {
    getConfig(elementRef, viewContainerRef) {
        return {
            hasBackdrop: false,
            autoFocus: false,
            width: '100%',
            height: '100%',
            maxWidth: '100% !important',
            panelClass: 'content-search-panel',
            viewContainerRef: viewContainerRef,
        };
    }
}
class DesktopContentSearchDialogConfigStrategy {
    static { this.dialogWidth = 350; }
    static { this.paddingRight = 20; }
    constructor(mimeDomHelper) {
        this.mimeDomHelper = mimeDomHelper;
    }
    getConfig(el, viewContainerRef) {
        const dimensions = this.getPosition(el);
        return {
            hasBackdrop: false,
            autoFocus: false,
            width: `${DesktopContentSearchDialogConfigStrategy.dialogWidth}px`,
            position: {
                top: dimensions.top + 'px',
                left: dimensions.left + 'px',
            },
            maxWidth: '100% !important',
            panelClass: 'content-search-panel',
            viewContainerRef: viewContainerRef,
        };
    }
    getPosition(el) {
        const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
        return new Dimensions({
            top: dimensions.top + 64,
            left: dimensions.right -
                DesktopContentSearchDialogConfigStrategy.dialogWidth -
                DesktopContentSearchDialogConfigStrategy.paddingRight,
        });
    }
}

class ContentSearchDialogConfigStrategyFactory {
    constructor(breakpointObserver, mimeDomHelper) {
        this.breakpointObserver = breakpointObserver;
        this.mimeDomHelper = mimeDomHelper;
    }
    create() {
        const isHandsetOrTabletInPortrait = this.breakpointObserver.isMatched([
            Breakpoints.Handset,
            Breakpoints.TabletPortrait,
        ]);
        return isHandsetOrTabletInPortrait
            ? new MobileContentSearchDialogConfigStrategy()
            : new DesktopContentSearchDialogConfigStrategy(this.mimeDomHelper);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ContentSearchDialogConfigStrategyFactory, deps: [{ token: i1.BreakpointObserver }, { token: MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ContentSearchDialogConfigStrategyFactory }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ContentSearchDialogConfigStrategyFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.BreakpointObserver }, { type: MimeDomHelper }]; } });

class ContentSearchNavigationService {
    constructor(canvasService, iiifContentSearchService) {
        this.canvasService = canvasService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.currentIndex = 0;
        this.lastHitIndex = 0;
        this.isHitOnActiveCanvasGroup = false;
        this.currentHit = null;
        this.canvasesPerCanvasGroup = [-1];
        this.searchResult = null;
        this._currentHitCounter$ = new Subject();
        this.initialize();
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((result) => {
            this.searchResult = result;
            this.currentHit = null;
            this.update(this.canvasService.currentCanvasGroupIndex);
        }));
    }
    destroy() {
        this.subscriptions.unsubscribe();
    }
    update(canvasGroupIndex) {
        this.canvasesPerCanvasGroup =
            this.canvasService.getCanvasesPerCanvasGroup(canvasGroupIndex);
        this.currentIndex = this.findCurrentHitIndex(this.canvasesPerCanvasGroup);
        this.lastHitIndex = this.findLastHitIndex(this.canvasesPerCanvasGroup);
        this.isHitOnActiveCanvasGroup = this.findHitOnActiveCanvasGroup();
        this._currentHitCounter$.next(this.updateCurrentHitCounter());
    }
    get currentHitCounter() {
        return this._currentHitCounter$.pipe(distinctUntilChanged());
    }
    getHitOnActiveCanvasGroup() {
        return this.isHitOnActiveCanvasGroup;
    }
    goToNextHit() {
        if (this.isCurrentHitOnCurrentCanvasGroup()) {
            this.goToNextCurrentCanvasHit();
        }
        else {
            this.goToNextCanvasHit();
        }
    }
    goToPreviousHit() {
        if (this.isCurrentHitOnCurrentCanvasGroup()) {
            this.goToPreviousCurrentCanvasHit();
        }
        else {
            this.goToPreviousCanvasHit();
        }
    }
    selected(hit) {
        this.currentHit = hit;
        this._currentHitCounter$.next(this.currentHit.id);
        this.currentIndex = this.currentHit.index;
        this.iiifContentSearchService.selected(hit);
    }
    updateCurrentHitCounter() {
        if (this.isCurrentHitOnCurrentCanvasGroup()) {
            if (this.currentHit) {
                return this.currentHit.id;
            }
        }
        if (this.isHitOnActiveCanvasGroup) {
            return this.currentIndex;
        }
        else {
            return this.lastHitIndex;
        }
    }
    goToNextCurrentCanvasHit() {
        if (this.searchResult && this.currentHit) {
            const currentHitId = this.currentHit.id;
            if (currentHitId < this.searchResult.hits.length - 1) {
                this.selected(this.searchResult.hits[currentHitId + 1]);
            }
        }
    }
    goToPreviousCurrentCanvasHit() {
        if (this.searchResult && this.currentHit) {
            const currentHitId = this.currentHit.id;
            if (currentHitId > 0) {
                this.selected(this.searchResult.hits[this.currentHit.id - 1]);
            }
        }
    }
    goToNextCanvasHit() {
        if (this.searchResult) {
            let nextHit;
            if (this.currentIndex === -1) {
                nextHit = this.searchResult.get(0);
            }
            else {
                if (this.isHitOnActiveCanvasGroup) {
                    nextHit = this.searchResult.hits.find((hit) => hit.id === this.currentIndex);
                }
                else {
                    const current = this.searchResult.get(this.currentIndex);
                    const canvasGroup = this.canvasService.findCanvasGroupByCanvasIndex(current.index);
                    const canvasesPerCanvasGroup = this.canvasService.getCanvasesPerCanvasGroup(canvasGroup);
                    const lastCanvasGroupIndex = this.getLastCanvasGroupIndex(canvasesPerCanvasGroup);
                    nextHit = this.searchResult.hits.find((h) => h.index > lastCanvasGroupIndex);
                }
            }
            if (nextHit) {
                this.selected(nextHit);
            }
        }
    }
    goToPreviousCanvasHit() {
        if (this.searchResult) {
            if (this.isHitOnActiveCanvasGroup) {
                this.selected(this.searchResult.hits[this.currentIndex]);
            }
            else {
                this.selected(this.searchResult.hits[this.lastHitIndex]);
            }
        }
    }
    findHitOnActiveCanvasGroup() {
        if (!this.searchResult) {
            return false;
        }
        return (this.canvasesPerCanvasGroup?.indexOf(this.searchResult.get(this.currentIndex).index) >= 0);
    }
    findCurrentHitIndex(canvasGroupIndexes) {
        if (!this.searchResult) {
            return -1;
        }
        if (canvasGroupIndexes) {
            for (let i = 0; i < this.searchResult.size(); i++) {
                const hit = this.searchResult.get(i);
                if (canvasGroupIndexes.indexOf(hit.index) >= 0) {
                    return i;
                }
                if (hit.index >= canvasGroupIndexes[canvasGroupIndexes.length - 1]) {
                    if (i === 0) {
                        return -1;
                    }
                    else {
                        const phit = this.searchResult.get(i - 1);
                        return this.searchResult.hits.findIndex((sr) => sr.index === phit.index);
                    }
                }
            }
        }
        return this.searchResult.size() - 1;
    }
    findLastHitIndex(canvasGroupIndexes) {
        if (!this.searchResult || !canvasGroupIndexes) {
            return -1;
        }
        const hits = this.searchResult.hits.filter((hit) => hit.index < canvasGroupIndexes[0]);
        return hits.length > 0 ? hits[hits.length - 1].id : -1;
    }
    getLastCanvasGroupIndex(canvasesPerCanvasGroup) {
        return canvasesPerCanvasGroup.length === 1
            ? canvasesPerCanvasGroup[0]
            : canvasesPerCanvasGroup[1];
    }
    isCurrentHitOnCurrentCanvasGroup() {
        if (this.currentHit) {
            const canvasGroup = this.canvasService.findCanvasGroupByCanvasIndex(this.canvasService.currentCanvasIndex);
            const canvasesPerCanvasGroup = this.canvasService.getCanvasesPerCanvasGroup(canvasGroup);
            return canvasesPerCanvasGroup.indexOf(this.currentHit.index) !== -1;
        }
        else {
            return false;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ContentSearchNavigationService, deps: [{ token: CanvasService }, { token: IiifContentSearchService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ContentSearchNavigationService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ContentSearchNavigationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: CanvasService }, { type: IiifContentSearchService }]; } });

class ContentSearchDialogComponent {
    constructor(dialogRef, intl, breakpointObserver, cdr, mimeResizeService, iiifManifestService, iiifContentSearchService, contentSearchNavigationService) {
        this.dialogRef = dialogRef;
        this.intl = intl;
        this.breakpointObserver = breakpointObserver;
        this.cdr = cdr;
        this.mimeResizeService = mimeResizeService;
        this.iiifManifestService = iiifManifestService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.contentSearchNavigationService = contentSearchNavigationService;
        this.q = '';
        this.hits = [];
        this.currentHit = null;
        this.currentSearch = null;
        this.numberOfHits = 0;
        this.isSearching = false;
        this.tabHeight = { maxHeight: '100px' };
        this.isHandsetOrTabletInPortrait = false;
        this.manifest = null;
        this.mimeHeight = 0;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.breakpointObserver
            .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
            .subscribe((value) => (this.isHandsetOrTabletInPortrait = value.matches)));
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe((dimensions) => {
            this.mimeHeight = dimensions.height;
            this.resizeTabHeight();
        }));
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
        }));
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((sr) => {
            this.hits = sr.hits;
            this.currentSearch = sr.q ? sr.q : '';
            this.q = sr.q;
            this.numberOfHits = sr.size();
            if (this.resultContainer !== null && this.numberOfHits > 0) {
                this.resultContainer.nativeElement.focus();
            }
            else if (this.q.length === 0 || this.numberOfHits === 0) {
                this.qEl.nativeElement.focus();
            }
        }));
        this.subscriptions.add(this.iiifContentSearchService.isSearching.subscribe((s) => {
            this.isSearching = s;
        }));
        this.subscriptions.add(this.iiifContentSearchService.onSelected.subscribe((hit) => {
            if (hit === null) {
                this.currentHit = hit;
            }
            else {
                if (!this.currentHit || this.currentHit.id !== hit.id) {
                    this.currentHit = hit;
                    this.scrollCurrentHitIntoView();
                }
            }
        }));
        this.resizeTabHeight();
    }
    ngAfterViewInit() {
        this.scrollCurrentHitIntoView();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    onSubmit(event) {
        event.preventDefault();
        this.search();
    }
    clear() {
        this.q = '';
        this.search();
    }
    goToHit(hit) {
        this.currentHit = hit;
        this.contentSearchNavigationService.selected(hit);
        if (this.isHandsetOrTabletInPortrait) {
            this.dialogRef.close();
        }
    }
    search() {
        this.currentSearch = this.q;
        if (this.manifest) {
            this.iiifContentSearchService.search(this.manifest, this.q);
        }
    }
    resizeTabHeight() {
        let height = this.mimeHeight;
        if (this.isHandsetOrTabletInPortrait) {
            this.tabHeight = {
                maxHeight: window.innerHeight - 128 + 'px',
            };
        }
        else {
            height -= 272;
            this.tabHeight = {
                maxHeight: height + 'px',
            };
        }
        this.cdr.detectChanges();
    }
    scrollCurrentHitIntoView() {
        this.iiifContentSearchService.onSelected
            .pipe(take(1))
            .subscribe((hit) => {
            if (hit !== null) {
                const selected = this.findSelected(hit);
                if (selected) {
                    selected.nativeElement.focus();
                }
            }
        });
    }
    findSelected(selectedHit) {
        if (this.hitList) {
            const selectedList = this.hitList.filter((item, index) => index === selectedHit.id);
            return selectedList.length > 0 ? selectedList[0] : null;
        }
        else {
            return null;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ContentSearchDialogComponent, deps: [{ token: i1$1.MatDialogRef }, { token: MimeViewerIntl }, { token: i1.BreakpointObserver }, { token: i0.ChangeDetectorRef }, { token: MimeResizeService }, { token: IiifManifestService }, { token: IiifContentSearchService }, { token: ContentSearchNavigationService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: ContentSearchDialogComponent, selector: "mime-search", viewQueries: [{ propertyName: "resultContainer", first: true, predicate: ["contentSearchResult"], descendants: true, static: true }, { propertyName: "qEl", first: true, predicate: ["query"], descendants: true, static: true }, { propertyName: "hitList", predicate: ["hitButton"], descendants: true, read: ElementRef }], ngImport: i0, template: "<div class=\"content-search-container\">\n  <ng-container [ngSwitch]=\"isHandsetOrTabletInPortrait\">\n    <mat-toolbar *ngSwitchCase=\"true\" color=\"primary\">\n      <button\n        mat-icon-button\n        class=\"close-content-search-dialog-button\"\n        [aria-label]=\"intl.closeLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        [matDialogClose]=\"true\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n      <h1 mat-dialog-title class=\"heading\">{{ intl.searchLabel }}</h1>\n    </mat-toolbar>\n    <mat-toolbar *ngSwitchDefault class=\"justify-between\">\n      <h1 mat-dialog-title class=\"heading heading-desktop\">{{\n        intl.searchLabel\n      }}</h1>\n      <button\n        mat-icon-button\n        class=\"close-content-search-dialog-button\"\n        [aria-label]=\"intl.closeLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        [matDialogClose]=\"true\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n    </mat-toolbar>\n  </ng-container>\n  <mat-dialog-content class=\"content-search-form\">\n    <form (ngSubmit)=\"onSubmit($event)\" #searchForm=\"ngForm\">\n      <mat-form-field class=\"content-search-box\">\n        <button\n          type=\"submit\"\n          matPrefix\n          mat-icon-button\n          [attr.aria-label]=\"intl.searchLabel\"\n          [matTooltip]=\"intl.searchLabel\"\n        >\n          <mat-icon class=\"icon\">search</mat-icon>\n        </button>\n        <input\n          #query\n          cdkFocusInitial\n          matInput\n          class=\"content-search-input\"\n          [(ngModel)]=\"q\"\n          [attr.aria-label]=\"intl.searchLabel\"\n          name=\"q\"\n          autocomplete=\"off\"\n        />\n        <button\n          *ngIf=\"q\"\n          type=\"button\"\n          class=\"clearSearchButton\"\n          matSuffix\n          mat-icon-button\n          [attr.aria-label]=\"intl.clearSearchLabel\"\n          [matTooltip]=\"intl.clearSearchLabel\"\n          [disabled]=\"isSearching\"\n          (click)=\"clear()\"\n        >\n          <mat-icon class=\"icon\">clear</mat-icon>\n        </button>\n      </mat-form-field>\n    </form>\n    <div\n      #contentSearchResult\n      class=\"content-search-result-container\"\n      [ngStyle]=\"tabHeight\"\n    >\n      <div class=\"content-search-result\">\n        <ng-container *ngIf=\"!isSearching\">\n          <input type=\"hidden\" class=\"numberOfHits\" [value]=\"numberOfHits\" />\n          <ng-container *ngIf=\"currentSearch && currentSearch.length > 0\">\n            <div\n              *ngIf=\"numberOfHits > 0\"\n              [innerHTML]=\"intl.resultsFoundLabel(numberOfHits, currentSearch)\"\n            ></div>\n            <div\n              *ngIf=\"numberOfHits === 0\"\n              [innerHTML]=\"intl.noResultsFoundLabel(currentSearch)\"\n            ></div>\n          </ng-container>\n          <ng-container *ngFor=\"let hit of hits; let last = last\">\n            <button\n              #hitButton\n              mat-button\n              [color]=\"currentHit && hit.id === currentHit.id ? 'accent' : null\"\n              [ngClass]=\"'hit'\"\n              (click)=\"goToHit(hit)\"\n              (keydown.enter)=\"goToHit(hit)\"\n            >\n              <div class=\"flex items-start justify-between\">\n                <div class=\"summary\"\n                  >{{ hit.before }} <em>{{ hit.match }}</em>\n                  {{ hit.after }}</div\n                >\n                <div class=\"canvasGroup ml-2\">{{ hit.index + 1 }}</div>\n              </div>\n            </button>\n            <mat-divider *ngIf=\"!last\"></mat-divider>\n          </ng-container>\n        </ng-container>\n        <mat-progress-bar\n          *ngIf=\"isSearching\"\n          mode=\"indeterminate\"\n        ></mat-progress-bar>\n      </div>\n    </div>\n  </mat-dialog-content>\n</div>\n", styles: [".content-search-container .mat-mdc-dialog-title{color:inherit;padding:0 2px 16px}.content-search-container ::ng-deep mat-form-field .mdc-text-field{background:transparent!important}.content-search-container .content-search-box{width:100%}.content-search-container .content-search-input{font-size:20px}.content-search-container .content-search-result-container{overflow:auto;margin-bottom:8px}.content-search-container .content-search-result{padding:8px 16px}.content-search-container .content-search-result .mat-mdc-button{line-height:initial;height:auto;white-space:initial;word-wrap:initial;max-width:none;padding:8px 0;text-align:left;font-size:14px}.content-search-container ::ng-deep .current-content-search{font-weight:700}.content-search-container em{font-weight:700}.content-search-container .canvasGroupLabel{text-align:right;opacity:.54}.content-search-container .mat-mdc-dialog-content{max-height:none;padding:8px;margin:0}.content-search-container ::ng-deep .mat-mdc-dialog-container{padding:0!important;overflow:initial}.content-search-container .icon{font-size:22px!important}\n"], dependencies: [{ kind: "directive", type: i6$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i6$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6$1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i6$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i6$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i6$1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "directive", type: i2$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i2$1.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: i8$1.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { kind: "component", type: i8$2.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i8$2.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i9.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i10.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "directive", type: i1$1.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "component", type: i14.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "directive", type: i15.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i16.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i16.MatPrefix, selector: "[matPrefix], [matIconPrefix], [matTextPrefix]", inputs: ["matTextPrefix"] }, { kind: "directive", type: i16.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "component", type: i17.MatProgressBar, selector: "mat-progress-bar", inputs: ["color", "value", "bufferValue", "mode"], outputs: ["animationEnd"], exportAs: ["matProgressBar"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ContentSearchDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-search', template: "<div class=\"content-search-container\">\n  <ng-container [ngSwitch]=\"isHandsetOrTabletInPortrait\">\n    <mat-toolbar *ngSwitchCase=\"true\" color=\"primary\">\n      <button\n        mat-icon-button\n        class=\"close-content-search-dialog-button\"\n        [aria-label]=\"intl.closeLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        [matDialogClose]=\"true\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n      <h1 mat-dialog-title class=\"heading\">{{ intl.searchLabel }}</h1>\n    </mat-toolbar>\n    <mat-toolbar *ngSwitchDefault class=\"justify-between\">\n      <h1 mat-dialog-title class=\"heading heading-desktop\">{{\n        intl.searchLabel\n      }}</h1>\n      <button\n        mat-icon-button\n        class=\"close-content-search-dialog-button\"\n        [aria-label]=\"intl.closeLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        [matDialogClose]=\"true\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n    </mat-toolbar>\n  </ng-container>\n  <mat-dialog-content class=\"content-search-form\">\n    <form (ngSubmit)=\"onSubmit($event)\" #searchForm=\"ngForm\">\n      <mat-form-field class=\"content-search-box\">\n        <button\n          type=\"submit\"\n          matPrefix\n          mat-icon-button\n          [attr.aria-label]=\"intl.searchLabel\"\n          [matTooltip]=\"intl.searchLabel\"\n        >\n          <mat-icon class=\"icon\">search</mat-icon>\n        </button>\n        <input\n          #query\n          cdkFocusInitial\n          matInput\n          class=\"content-search-input\"\n          [(ngModel)]=\"q\"\n          [attr.aria-label]=\"intl.searchLabel\"\n          name=\"q\"\n          autocomplete=\"off\"\n        />\n        <button\n          *ngIf=\"q\"\n          type=\"button\"\n          class=\"clearSearchButton\"\n          matSuffix\n          mat-icon-button\n          [attr.aria-label]=\"intl.clearSearchLabel\"\n          [matTooltip]=\"intl.clearSearchLabel\"\n          [disabled]=\"isSearching\"\n          (click)=\"clear()\"\n        >\n          <mat-icon class=\"icon\">clear</mat-icon>\n        </button>\n      </mat-form-field>\n    </form>\n    <div\n      #contentSearchResult\n      class=\"content-search-result-container\"\n      [ngStyle]=\"tabHeight\"\n    >\n      <div class=\"content-search-result\">\n        <ng-container *ngIf=\"!isSearching\">\n          <input type=\"hidden\" class=\"numberOfHits\" [value]=\"numberOfHits\" />\n          <ng-container *ngIf=\"currentSearch && currentSearch.length > 0\">\n            <div\n              *ngIf=\"numberOfHits > 0\"\n              [innerHTML]=\"intl.resultsFoundLabel(numberOfHits, currentSearch)\"\n            ></div>\n            <div\n              *ngIf=\"numberOfHits === 0\"\n              [innerHTML]=\"intl.noResultsFoundLabel(currentSearch)\"\n            ></div>\n          </ng-container>\n          <ng-container *ngFor=\"let hit of hits; let last = last\">\n            <button\n              #hitButton\n              mat-button\n              [color]=\"currentHit && hit.id === currentHit.id ? 'accent' : null\"\n              [ngClass]=\"'hit'\"\n              (click)=\"goToHit(hit)\"\n              (keydown.enter)=\"goToHit(hit)\"\n            >\n              <div class=\"flex items-start justify-between\">\n                <div class=\"summary\"\n                  >{{ hit.before }} <em>{{ hit.match }}</em>\n                  {{ hit.after }}</div\n                >\n                <div class=\"canvasGroup ml-2\">{{ hit.index + 1 }}</div>\n              </div>\n            </button>\n            <mat-divider *ngIf=\"!last\"></mat-divider>\n          </ng-container>\n        </ng-container>\n        <mat-progress-bar\n          *ngIf=\"isSearching\"\n          mode=\"indeterminate\"\n        ></mat-progress-bar>\n      </div>\n    </div>\n  </mat-dialog-content>\n</div>\n", styles: [".content-search-container .mat-mdc-dialog-title{color:inherit;padding:0 2px 16px}.content-search-container ::ng-deep mat-form-field .mdc-text-field{background:transparent!important}.content-search-container .content-search-box{width:100%}.content-search-container .content-search-input{font-size:20px}.content-search-container .content-search-result-container{overflow:auto;margin-bottom:8px}.content-search-container .content-search-result{padding:8px 16px}.content-search-container .content-search-result .mat-mdc-button{line-height:initial;height:auto;white-space:initial;word-wrap:initial;max-width:none;padding:8px 0;text-align:left;font-size:14px}.content-search-container ::ng-deep .current-content-search{font-weight:700}.content-search-container em{font-weight:700}.content-search-container .canvasGroupLabel{text-align:right;opacity:.54}.content-search-container .mat-mdc-dialog-content{max-height:none;padding:8px;margin:0}.content-search-container ::ng-deep .mat-mdc-dialog-container{padding:0!important;overflow:initial}.content-search-container .icon{font-size:22px!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: MimeViewerIntl }, { type: i1.BreakpointObserver }, { type: i0.ChangeDetectorRef }, { type: MimeResizeService }, { type: IiifManifestService }, { type: IiifContentSearchService }, { type: ContentSearchNavigationService }]; }, propDecorators: { resultContainer: [{
                type: ViewChild,
                args: ['contentSearchResult', { static: true }]
            }], qEl: [{
                type: ViewChild,
                args: ['query', { static: true }]
            }], hitList: [{
                type: ViewChildren,
                args: ['hitButton', { read: ElementRef }]
            }] } });

class ContentSearchDialogService {
    constructor(dialog, contentSearchDialogConfigStrategyFactory, mimeResizeService) {
        this.dialog = dialog;
        this.contentSearchDialogConfigStrategyFactory = contentSearchDialogConfigStrategyFactory;
        this.mimeResizeService = mimeResizeService;
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe((rect) => {
            if (this.isOpen()) {
                const config = this.getDialogConfig();
                this.dialogRef?.updatePosition(config.position);
                this.dialogRef?.updateSize(config.width, config.height);
            }
        }));
    }
    destroy() {
        this.close();
        this.unsubscribe();
    }
    set el(el) {
        this._el = el;
    }
    set viewContainerRef(viewContainerRef) {
        this._viewContainerRef = viewContainerRef;
    }
    open() {
        if (!this.isOpen()) {
            const config = this.getDialogConfig();
            this.dialogRef = this.dialog.open(ContentSearchDialogComponent, config);
        }
    }
    close() {
        if (this.isOpen()) {
            this.dialogRef?.close();
        }
    }
    toggle() {
        this.isOpen() ? this.close() : this.open();
    }
    isOpen() {
        return this.dialogRef?.getState() === 0 /* MatDialogState.OPEN */;
    }
    getDialogConfig() {
        if (!this._el || !this._viewContainerRef) {
            throw new Error('No element or viewContainerRef');
        }
        return this.contentSearchDialogConfigStrategyFactory
            .create()
            .getConfig(this._el, this._viewContainerRef);
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ContentSearchDialogService, deps: [{ token: i1$1.MatDialog }, { token: ContentSearchDialogConfigStrategyFactory }, { token: MimeResizeService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ContentSearchDialogService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ContentSearchDialogService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.MatDialog }, { type: ContentSearchDialogConfigStrategyFactory }, { type: MimeResizeService }]; } });

class MobileInformationDialogConfigStrategy {
    getConfig(elementRef, viewContainerRef) {
        return {
            hasBackdrop: false,
            width: '100%',
            height: '100%',
            maxWidth: '100% !important',
            panelClass: 'information-panel',
            viewContainerRef: viewContainerRef,
        };
    }
}
class DesktopInformationDialogConfigStrategy {
    static { this.dialogWidth = 350; }
    static { this.paddingRight = 20; }
    constructor(mimeDomHelper) {
        this.mimeDomHelper = mimeDomHelper;
    }
    getConfig(el, viewContainerRef) {
        const dimensions = this.getPosition(el);
        return {
            hasBackdrop: false,
            width: `${DesktopInformationDialogConfigStrategy.dialogWidth}px`,
            position: {
                top: dimensions.top + 'px',
                left: dimensions.left + 'px',
            },
            maxWidth: '100% !important',
            panelClass: 'information-panel',
            viewContainerRef: viewContainerRef,
        };
    }
    getPosition(el) {
        const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
        return new Dimensions({
            top: dimensions.top + 64,
            left: dimensions.right -
                DesktopInformationDialogConfigStrategy.dialogWidth -
                DesktopInformationDialogConfigStrategy.paddingRight,
        });
    }
}

class InformationDialogConfigStrategyFactory {
    constructor(breakpointObserver, mimeDomHelper) {
        this.breakpointObserver = breakpointObserver;
        this.mimeDomHelper = mimeDomHelper;
    }
    create() {
        const isHandsetOrTabletInPortrait = this.breakpointObserver.isMatched([
            Breakpoints.Handset,
            Breakpoints.TabletPortrait,
        ]);
        return isHandsetOrTabletInPortrait
            ? new MobileInformationDialogConfigStrategy()
            : new DesktopInformationDialogConfigStrategy(this.mimeDomHelper);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: InformationDialogConfigStrategyFactory, deps: [{ token: i1.BreakpointObserver }, { token: MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: InformationDialogConfigStrategyFactory }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: InformationDialogConfigStrategyFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.BreakpointObserver }, { type: MimeDomHelper }]; } });

class MetadataComponent {
    constructor(intl, changeDetectorRef, iiifManifestService) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.iiifManifestService = iiifManifestService;
        this.manifest = null;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
            this.changeDetectorRef.markForCheck();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MetadataComponent, deps: [{ token: MimeViewerIntl }, { token: i0.ChangeDetectorRef }, { token: IiifManifestService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: MetadataComponent, selector: "mime-metadata", ngImport: i0, template: "<div *ngIf=\"manifest\" class=\"ngx-mime-metadata-container\">\n  <div *ngFor=\"let metadata of manifest.metadata\" class=\"metadata\">\n    <div class=\"title\">{{ metadata.label }}</div>\n    <span class=\"content\" [innerHTML]=\"metadata.value\"></span>\n  </div>\n  <div *ngIf=\"manifest.attribution\">\n    <div class=\"title\">{{ intl.attributionLabel }}</div>\n    <span class=\"content attribution\" [innerHTML]=\"manifest.attribution\"></span>\n  </div>\n  <div *ngIf=\"manifest.license\">\n    <div class=\"title\">{{ intl.licenseLabel }}</div>\n    <span class=\"content license\"\n      ><a [href]=\"manifest.license\" target=\"_blank\">{{\n        manifest.license\n      }}</a></span\n    >\n  </div>\n  <div *ngIf=\"manifest.logo\" aria-hidden=\"true\">\n    <span><img class=\"content logo\" [src]=\"manifest.logo\" /></span>\n  </div>\n</div>\n", styles: [".title{font-size:14px!important;font-weight:400;margin-bottom:4px}.content{display:block;font-size:12px;word-break:break-all;margin-bottom:8px}.logo{max-width:300px;max-height:64px}\n"], dependencies: [{ kind: "directive", type: i6$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MetadataComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-metadata', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngIf=\"manifest\" class=\"ngx-mime-metadata-container\">\n  <div *ngFor=\"let metadata of manifest.metadata\" class=\"metadata\">\n    <div class=\"title\">{{ metadata.label }}</div>\n    <span class=\"content\" [innerHTML]=\"metadata.value\"></span>\n  </div>\n  <div *ngIf=\"manifest.attribution\">\n    <div class=\"title\">{{ intl.attributionLabel }}</div>\n    <span class=\"content attribution\" [innerHTML]=\"manifest.attribution\"></span>\n  </div>\n  <div *ngIf=\"manifest.license\">\n    <div class=\"title\">{{ intl.licenseLabel }}</div>\n    <span class=\"content license\"\n      ><a [href]=\"manifest.license\" target=\"_blank\">{{\n        manifest.license\n      }}</a></span\n    >\n  </div>\n  <div *ngIf=\"manifest.logo\" aria-hidden=\"true\">\n    <span><img class=\"content logo\" [src]=\"manifest.logo\" /></span>\n  </div>\n</div>\n", styles: [".title{font-size:14px!important;font-weight:400;margin-bottom:4px}.content{display:block;font-size:12px;word-break:break-all;margin-bottom:8px}.logo{max-width:300px;max-height:64px}\n"] }]
        }], ctorParameters: function () { return [{ type: MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: IiifManifestService }]; } });

class TocComponent {
    constructor(intl, changeDetectorRef, iiifManifestService, viewerService, canvasService) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.iiifManifestService = iiifManifestService;
        this.viewerService = viewerService;
        this.canvasService = canvasService;
        this.canvasChanged = new EventEmitter();
        this.manifest = null;
        this.currentCanvasGroupIndex = 0;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
            this.currentCanvasGroupIndex =
                this.canvasService.currentCanvasGroupIndex;
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.viewerService.onCanvasGroupIndexChange.subscribe((canvasGroupIndex) => {
            this.currentCanvasGroupIndex = canvasGroupIndex;
            this.changeDetectorRef.detectChanges();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    goToCanvas(event, canvasIndex) {
        if (canvasIndex !== undefined) {
            event.preventDefault();
            this.viewerService.goToCanvas(canvasIndex, false);
            this.canvasChanged.emit(canvasIndex);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: TocComponent, deps: [{ token: MimeViewerIntl }, { token: i0.ChangeDetectorRef }, { token: IiifManifestService }, { token: ViewerService }, { token: CanvasService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: TocComponent, selector: "mime-toc", outputs: { canvasChanged: "canvasChanged" }, ngImport: i0, template: "<div class=\"ngx-mime-toc-container\">\n  <a\n    *ngFor=\"let structure of manifest?.structures\"\n    class=\"toc-link flex justify-between\"\n    href=\"\"\n    [class.currentCanvasGroup]=\"\n      currentCanvasGroupIndex === structure.canvasIndex\n    \"\n    (click)=\"goToCanvas($event, structure.canvasIndex)\"\n  >\n    <span class=\"label\">{{ structure.label }}</span>\n    <span class=\"canvasGroupIndex\">{{ structure.canvasIndex + 1 }}</span>\n  </a>\n</div>\n", styles: [".toc-link{text-decoration:none;font-size:14px!important;font-weight:400;margin-bottom:8px}.currentCanvasGroup{font-weight:700}\n"], dependencies: [{ kind: "directive", type: i6$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: TocComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-toc', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ngx-mime-toc-container\">\n  <a\n    *ngFor=\"let structure of manifest?.structures\"\n    class=\"toc-link flex justify-between\"\n    href=\"\"\n    [class.currentCanvasGroup]=\"\n      currentCanvasGroupIndex === structure.canvasIndex\n    \"\n    (click)=\"goToCanvas($event, structure.canvasIndex)\"\n  >\n    <span class=\"label\">{{ structure.label }}</span>\n    <span class=\"canvasGroupIndex\">{{ structure.canvasIndex + 1 }}</span>\n  </a>\n</div>\n", styles: [".toc-link{text-decoration:none;font-size:14px!important;font-weight:400;margin-bottom:8px}.currentCanvasGroup{font-weight:700}\n"] }]
        }], ctorParameters: function () { return [{ type: MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: IiifManifestService }, { type: ViewerService }, { type: CanvasService }]; }, propDecorators: { canvasChanged: [{
                type: Output
            }] } });

class InformationDialogComponent {
    constructor(intl, breakpointObserver, dialogRef, changeDetectorRef, iiifManifestService, mimeResizeService) {
        this.intl = intl;
        this.breakpointObserver = breakpointObserver;
        this.dialogRef = dialogRef;
        this.changeDetectorRef = changeDetectorRef;
        this.iiifManifestService = iiifManifestService;
        this.mimeResizeService = mimeResizeService;
        this.manifest = null;
        this.tabHeight = {};
        this.showToc = false;
        this.selectedIndex = 0;
        this.isHandsetOrTabletInPortrait = false;
        this.mimeHeight = 0;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.breakpointObserver
            .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
            .subscribe((value) => (this.isHandsetOrTabletInPortrait = value.matches)));
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
            this.showToc =
                this.manifest !== null &&
                    this.manifest.structures !== undefined &&
                    this.manifest.structures.length > 0;
        }));
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe((dimensions) => {
            this.mimeHeight = dimensions.height;
            this.resizeTabHeight();
        }));
        this.resizeTabHeight();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    onCanvasChanged() {
        if (this.isHandsetOrTabletInPortrait) {
            this.dialogRef.close();
        }
    }
    resizeTabHeight() {
        let height = this.mimeHeight;
        if (this.isHandsetOrTabletInPortrait) {
            this.tabHeight = {
                maxHeight: window.innerHeight - 128 + 'px',
            };
        }
        else {
            height -= 278;
            this.tabHeight = {
                maxHeight: height + 'px',
            };
        }
        this.changeDetectorRef.detectChanges();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: InformationDialogComponent, deps: [{ token: MimeViewerIntl }, { token: i1.BreakpointObserver }, { token: i1$1.MatDialogRef }, { token: i0.ChangeDetectorRef }, { token: IiifManifestService }, { token: MimeResizeService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: InformationDialogComponent, selector: "mime-information", ngImport: i0, template: "<div class=\"information-container\">\n  <ng-container [ngSwitch]=\"isHandsetOrTabletInPortrait\">\n    <mat-toolbar\n      *ngSwitchCase=\"true\"\n      color=\"primary\"\n      data-testid=\"mobile-toolbar\"\n    >\n      <button\n        mat-icon-button\n        [aria-label]=\"intl.closeLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        [matDialogClose]=\"true\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n      <h1 mat-dialog-title>{{ intl.informationLabel }}</h1>\n    </mat-toolbar>\n    <mat-toolbar\n      *ngSwitchDefault\n      data-testid=\"desktop-toolbar\"\n      class=\"justify-between\"\n    >\n      <h1 mat-dialog-title>{{ intl.informationLabel }}</h1>\n      <button\n        mat-icon-button\n        [aria-label]=\"intl.closeLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        [matDialogClose]=\"true\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n    </mat-toolbar>\n  </ng-container>\n  <div mat-dialog-content>\n    <mat-tab-group [(selectedIndex)]=\"selectedIndex\">\n      <mat-tab [label]=\"intl.metadataLabel\">\n        <div class=\"tab-container\" [ngStyle]=\"tabHeight\">\n          <mime-metadata></mime-metadata>\n        </div>\n      </mat-tab>\n      <mat-tab *ngIf=\"showToc\" [label]=\"intl.tocLabel\">\n        <div class=\"tab-container\" [ngStyle]=\"tabHeight\">\n          <mime-toc (canvasChanged)=\"onCanvasChanged()\"></mime-toc>\n        </div>\n      </mat-tab>\n    </mat-tab-group>\n  </div>\n</div>\n", styles: [".mat-mdc-dialog-title{color:inherit;padding:0 2px 16px}::ng-deep .information-panel>.mat-mdc-dialog-container{padding:0!important;overflow:initial}::ng-deep .information-container>div>div>.mat-toolbar{padding:0!important}.tab-container{overflow:auto;padding:8px 16px}.mat-mdc-dialog-content{max-height:none;padding:0}\n"], dependencies: [{ kind: "directive", type: i6$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6$1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i6$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i6$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i6$1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i8$1.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { kind: "component", type: i8$2.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i9.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i10.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "directive", type: i1$1.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "component", type: i11.MatTab, selector: "mat-tab", inputs: ["disabled"], exportAs: ["matTab"] }, { kind: "component", type: i11.MatTabGroup, selector: "mat-tab-group", inputs: ["color", "disableRipple", "fitInkBarToContent", "mat-stretch-tabs"], exportAs: ["matTabGroup"] }, { kind: "component", type: MetadataComponent, selector: "mime-metadata" }, { kind: "component", type: TocComponent, selector: "mime-toc", outputs: ["canvasChanged"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: InformationDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-information', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"information-container\">\n  <ng-container [ngSwitch]=\"isHandsetOrTabletInPortrait\">\n    <mat-toolbar\n      *ngSwitchCase=\"true\"\n      color=\"primary\"\n      data-testid=\"mobile-toolbar\"\n    >\n      <button\n        mat-icon-button\n        [aria-label]=\"intl.closeLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        [matDialogClose]=\"true\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n      <h1 mat-dialog-title>{{ intl.informationLabel }}</h1>\n    </mat-toolbar>\n    <mat-toolbar\n      *ngSwitchDefault\n      data-testid=\"desktop-toolbar\"\n      class=\"justify-between\"\n    >\n      <h1 mat-dialog-title>{{ intl.informationLabel }}</h1>\n      <button\n        mat-icon-button\n        [aria-label]=\"intl.closeLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        [matDialogClose]=\"true\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n    </mat-toolbar>\n  </ng-container>\n  <div mat-dialog-content>\n    <mat-tab-group [(selectedIndex)]=\"selectedIndex\">\n      <mat-tab [label]=\"intl.metadataLabel\">\n        <div class=\"tab-container\" [ngStyle]=\"tabHeight\">\n          <mime-metadata></mime-metadata>\n        </div>\n      </mat-tab>\n      <mat-tab *ngIf=\"showToc\" [label]=\"intl.tocLabel\">\n        <div class=\"tab-container\" [ngStyle]=\"tabHeight\">\n          <mime-toc (canvasChanged)=\"onCanvasChanged()\"></mime-toc>\n        </div>\n      </mat-tab>\n    </mat-tab-group>\n  </div>\n</div>\n", styles: [".mat-mdc-dialog-title{color:inherit;padding:0 2px 16px}::ng-deep .information-panel>.mat-mdc-dialog-container{padding:0!important;overflow:initial}::ng-deep .information-container>div>div>.mat-toolbar{padding:0!important}.tab-container{overflow:auto;padding:8px 16px}.mat-mdc-dialog-content{max-height:none;padding:0}\n"] }]
        }], ctorParameters: function () { return [{ type: MimeViewerIntl }, { type: i1.BreakpointObserver }, { type: i1$1.MatDialogRef }, { type: i0.ChangeDetectorRef }, { type: IiifManifestService }, { type: MimeResizeService }]; } });

class InformationDialogService {
    constructor(dialog, informationDialogConfigStrategyFactory, mimeResizeService) {
        this.dialog = dialog;
        this.informationDialogConfigStrategyFactory = informationDialogConfigStrategyFactory;
        this.mimeResizeService = mimeResizeService;
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe((rect) => {
            if (this.isOpen()) {
                const config = this.getDialogConfig();
                this.dialogRef?.updatePosition(config.position);
                this.dialogRef?.updateSize(config.width, config.height);
            }
        }));
    }
    destroy() {
        this.close();
        this.unsubscribe();
    }
    set el(el) {
        this._el = el;
    }
    set viewContainerRef(viewContainerRef) {
        this._viewContainerRef = viewContainerRef;
    }
    open(selectedIndex) {
        if (!this.isOpen()) {
            const config = this.getDialogConfig();
            this.dialogRef = this.dialog.open(InformationDialogComponent, config);
            if (selectedIndex) {
                this.dialogRef.componentInstance.selectedIndex = selectedIndex;
            }
        }
    }
    close() {
        if (this.isOpen()) {
            this.dialogRef?.close();
        }
    }
    toggle() {
        this.isOpen() ? this.close() : this.open();
    }
    isOpen() {
        return this.dialogRef?.getState() === 0 /* MatDialogState.OPEN */;
    }
    getSelectedIndex() {
        return this.dialogRef?.componentInstance?.selectedIndex ?? 0;
    }
    getDialogConfig() {
        if (!this._el || !this._viewContainerRef) {
            throw new Error('No element or viewContainerRef');
        }
        return this.informationDialogConfigStrategyFactory
            .create()
            .getConfig(this._el, this._viewContainerRef);
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: InformationDialogService, deps: [{ token: i1$1.MatDialog }, { token: InformationDialogConfigStrategyFactory }, { token: MimeResizeService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: InformationDialogService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: InformationDialogService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.MatDialog }, { type: InformationDialogConfigStrategyFactory }, { type: MimeResizeService }]; } });

class MobileViewDialogConfigStrategy {
    getConfig(elementRef, viewContainerRef) {
        return {
            hasBackdrop: false,
            autoFocus: false,
            width: '100%',
            height: '100%',
            maxWidth: '100% !important',
            panelClass: 'view-panel',
            viewContainerRef: viewContainerRef,
        };
    }
}
class DesktopViewDialogConfigStrategy {
    static { this.dialogWidth = 250; }
    static { this.paddingRight = 20; }
    constructor(mimeDomHelper) {
        this.mimeDomHelper = mimeDomHelper;
    }
    getConfig(el, viewContainerRef) {
        const dimensions = this.getPosition(el);
        return {
            hasBackdrop: false,
            autoFocus: true,
            width: `${DesktopViewDialogConfigStrategy.dialogWidth}px`,
            position: {
                top: dimensions.top + 'px',
                left: dimensions.left + 'px',
            },
            panelClass: 'view-panel',
            maxWidth: '100% !important',
            viewContainerRef: viewContainerRef,
        };
    }
    getPosition(el) {
        const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
        return new Dimensions({
            top: dimensions.top + 64,
            left: dimensions.right -
                DesktopViewDialogConfigStrategy.dialogWidth -
                DesktopViewDialogConfigStrategy.paddingRight,
        });
    }
}

class ViewDialogConfigStrategyFactory {
    constructor(breakpointObserver, mimeDomHelper) {
        this.breakpointObserver = breakpointObserver;
        this.mimeDomHelper = mimeDomHelper;
    }
    create() {
        const isHandsetOrTabletInPortrait = this.breakpointObserver.isMatched([
            Breakpoints.Handset,
            Breakpoints.TabletPortrait,
        ]);
        return isHandsetOrTabletInPortrait
            ? new MobileViewDialogConfigStrategy()
            : new DesktopViewDialogConfigStrategy(this.mimeDomHelper);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewDialogConfigStrategyFactory, deps: [{ token: i1.BreakpointObserver }, { token: MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewDialogConfigStrategyFactory }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewDialogConfigStrategyFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.BreakpointObserver }, { type: MimeDomHelper }]; } });

class IconComponent {
    constructor() {
        this.iconName = '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: IconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: IconComponent, selector: "mime-icon", inputs: { iconName: "iconName" }, ngImport: i0, template: "<div class=\"mat-icon\">\n  <ng-container *ngIf=\"iconName === 'single_page_display'\">\n    <div class=\"single-page-display\">\n      <svg\n        version=\"1.1\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        viewBox=\"0 0 90 90\"\n        preserveAspectRatio=\"xMidYMin slice\"\n      >\n        <style type=\"text/css\">\n          .st0 {\n            clip-path: url(#SVGID_2_);\n          }\n        </style>\n        <g>\n          <defs><rect width=\"100%\" height=\"100%\" /></defs>\n          <clipPath>\n            <use xlink:href=\"#SVGID_1_\" style=\"overflow: visible\" />\n          </clipPath>\n          <path\n            class=\"st0\"\n            d=\"M21.7,25.2H8.3v2.7h13.4V25.2z M21.7,18.1H8.3v2.7h13.4V18.1z M26.1,31.8H4V4.1h13.6v8.4h8.5V31.8z M30,31.6\n          V11.4L18.7,0H4.3C4.3,0,0,0,0,4.3v27.4c0,0,0,4.3,4.3,4.3h21.5C25.8,35.9,30,35.9,30,31.6\"\n          />\n        </g>\n      </svg>\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"iconName === 'two_page_display'\">\n    <svg\n      version=\"1.1\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n      xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n      viewBox=\"0 0 90 90\"\n      preserveAspectRatio=\"xMidYMin slice\"\n    >\n      <style type=\"text/css\">\n        .st0 {\n          clip-path: url(#SVGID_2_);\n        }\n      </style>\n      <g>\n        <defs><rect width=\"100%\" height=\"100%\" /></defs>\n        <clipPath>\n          <use xlink:href=\"#SVGID_3_\" style=\"overflow: visible\" />\n        </clipPath>\n        <path\n          class=\"st0\"\n          d=\"M52.5,25.2H39.1v2.7h13.4V25.2z M52.5,18.1H39.1v2.7h13.4V18.1z M56.8,31.8H34.7V4.1h13.6v8.4h8.5V31.8z\n        M60.8,31.6V11.4L49.4,0H35c0,0-4.3,0-4.3,4.3v27.4c0,0,0,4.3,4.3,4.3h21.5C56.6,35.9,60.8,35.9,60.8,31.6\"\n        />\n        <path\n          class=\"st0\"\n          d=\"M21.7,25.2H8.3v2.7h13.4V25.2z M21.7,18.1H8.3v2.7h13.4V18.1z M21.7,11.1H8.3v2.7h13.4V11.1z M26.1,31.8H4V4.1\n       h22.1V31.8z M30,31.6V4.3c0,0,0-4.3-4.3-4.3H4.3C4.3,0,0,0,0,4.3v27.4c0,0,0,4.3,4.3,4.3h21.5C25.8,35.9,30,35.9,30,31.6\"\n        />\n      </g>\n    </svg>\n  </ng-container>\n</div>\n", styles: [".mat-icon{vertical-align:middle}.single-page-display{margin-left:5px}svg{height:40px;width:40px}\n"], dependencies: [{ kind: "directive", type: i6$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: IconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-icon', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mat-icon\">\n  <ng-container *ngIf=\"iconName === 'single_page_display'\">\n    <div class=\"single-page-display\">\n      <svg\n        version=\"1.1\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        viewBox=\"0 0 90 90\"\n        preserveAspectRatio=\"xMidYMin slice\"\n      >\n        <style type=\"text/css\">\n          .st0 {\n            clip-path: url(#SVGID_2_);\n          }\n        </style>\n        <g>\n          <defs><rect width=\"100%\" height=\"100%\" /></defs>\n          <clipPath>\n            <use xlink:href=\"#SVGID_1_\" style=\"overflow: visible\" />\n          </clipPath>\n          <path\n            class=\"st0\"\n            d=\"M21.7,25.2H8.3v2.7h13.4V25.2z M21.7,18.1H8.3v2.7h13.4V18.1z M26.1,31.8H4V4.1h13.6v8.4h8.5V31.8z M30,31.6\n          V11.4L18.7,0H4.3C4.3,0,0,0,0,4.3v27.4c0,0,0,4.3,4.3,4.3h21.5C25.8,35.9,30,35.9,30,31.6\"\n          />\n        </g>\n      </svg>\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"iconName === 'two_page_display'\">\n    <svg\n      version=\"1.1\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n      xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n      viewBox=\"0 0 90 90\"\n      preserveAspectRatio=\"xMidYMin slice\"\n    >\n      <style type=\"text/css\">\n        .st0 {\n          clip-path: url(#SVGID_2_);\n        }\n      </style>\n      <g>\n        <defs><rect width=\"100%\" height=\"100%\" /></defs>\n        <clipPath>\n          <use xlink:href=\"#SVGID_3_\" style=\"overflow: visible\" />\n        </clipPath>\n        <path\n          class=\"st0\"\n          d=\"M52.5,25.2H39.1v2.7h13.4V25.2z M52.5,18.1H39.1v2.7h13.4V18.1z M56.8,31.8H34.7V4.1h13.6v8.4h8.5V31.8z\n        M60.8,31.6V11.4L49.4,0H35c0,0-4.3,0-4.3,4.3v27.4c0,0,0,4.3,4.3,4.3h21.5C56.6,35.9,60.8,35.9,60.8,31.6\"\n        />\n        <path\n          class=\"st0\"\n          d=\"M21.7,25.2H8.3v2.7h13.4V25.2z M21.7,18.1H8.3v2.7h13.4V18.1z M21.7,11.1H8.3v2.7h13.4V11.1z M26.1,31.8H4V4.1\n       h22.1V31.8z M30,31.6V4.3c0,0,0-4.3-4.3-4.3H4.3C4.3,0,0,0,0,4.3v27.4c0,0,0,4.3,4.3,4.3h21.5C25.8,35.9,30,35.9,30,31.6\"\n        />\n      </g>\n    </svg>\n  </ng-container>\n</div>\n", styles: [".mat-icon{vertical-align:middle}.single-page-display{margin-left:5px}svg{height:40px;width:40px}\n"] }]
        }], propDecorators: { iconName: [{
                type: Input
            }] } });

class ViewDialogComponent {
    constructor(intl, breakpointObserver, cdr, viewerLayoutService, iiifManifestService, altoService, mimeResizeService) {
        this.intl = intl;
        this.breakpointObserver = breakpointObserver;
        this.cdr = cdr;
        this.viewerLayoutService = viewerLayoutService;
        this.iiifManifestService = iiifManifestService;
        this.altoService = altoService;
        this.mimeResizeService = mimeResizeService;
        this.isHandsetOrTabletInPortrait = false;
        this.viewerLayout = ViewerLayout.ONE_PAGE;
        this.ViewerLayout = ViewerLayout;
        this.isPagedManifest = false;
        this.hasRecognizedTextContent = false;
        this.recognizedTextMode = RecognizedTextMode.NONE;
        this.RecognizedTextMode = RecognizedTextMode;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.breakpointObserver
            .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
            .subscribe((value) => (this.isHandsetOrTabletInPortrait = value.matches)));
        this.subscriptions.add(this.viewerLayoutService.onChange.subscribe((viewerLayout) => {
            this.viewerLayout = viewerLayout;
        }));
        this.subscriptions.add(this.altoService.onRecognizedTextContentModeChange$.subscribe((recognizedTextModeChanges) => {
            this.recognizedTextMode = recognizedTextModeChanges.currentValue;
        }));
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.isPagedManifest = manifest
                ? ManifestUtils.isManifestPaged(manifest)
                : false;
            this.hasRecognizedTextContent = manifest
                ? ManifestUtils.hasRecognizedTextContent(manifest)
                : false;
        }));
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe((rect) => {
            this.resizeHeight(rect);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    setLayoutOnePage() {
        this.viewerLayoutService.setLayout(ViewerLayout.ONE_PAGE);
    }
    setLayoutTwoPage() {
        this.viewerLayoutService.setLayout(ViewerLayout.TWO_PAGE);
    }
    closeRecognizedTextContent() {
        this.altoService.closeRecognizedTextContent();
    }
    showRecognizedTextContentInSplitView() {
        this.altoService.showRecognizedTextContentInSplitView();
    }
    showRecognizedTextContentOnly() {
        this.altoService.showRecognizedTextContentOnly();
    }
    resizeHeight(rect) {
        let maxHeight = rect.height - 192 + 'px';
        if (this.isHandsetOrTabletInPortrait) {
            maxHeight = rect.height + 'px';
        }
        this.contentStyle = {
            maxHeight,
        };
        this.cdr.detectChanges();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewDialogComponent, deps: [{ token: MimeViewerIntl }, { token: i1.BreakpointObserver }, { token: i0.ChangeDetectorRef }, { token: ViewerLayoutService }, { token: IiifManifestService }, { token: AltoService }, { token: MimeResizeService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: ViewDialogComponent, selector: "mime-view-dialog", ngImport: i0, template: "<ng-container [ngSwitch]=\"isHandsetOrTabletInPortrait\">\n  <mat-toolbar\n    *ngSwitchCase=\"true\"\n    color=\"primary\"\n    data-testid=\"mobile-toolbar\"\n  >\n    <button\n      data-testid=\"ngx-mime-view-dialog-close-button\"\n      mat-icon-button\n      [aria-label]=\"intl.closeLabel\"\n      [matTooltip]=\"intl.closeLabel\"\n      [matDialogClose]=\"true\"\n    >\n      <mat-icon>close</mat-icon>\n    </button>\n    <h1 mat-dialog-title>{{ intl.layoutMenuLabel }}</h1>\n  </mat-toolbar>\n  <mat-toolbar\n    *ngSwitchDefault\n    class=\"justify-between\"\n    data-testid=\"desktop-toolbar\"\n  >\n    <h1 mat-dialog-title data-testid=\"ngx-mime-heading-desktop\">{{\n      intl.layoutMenuLabel\n    }}</h1>\n    <button\n      data-testid=\"ngx-mime-view-dialog-close-button\"\n      mat-icon-button\n      [aria-label]=\"intl.closeLabel\"\n      [matTooltip]=\"intl.closeLabel\"\n      [matDialogClose]=\"true\"\n    >\n      <mat-icon>close</mat-icon>\n    </button>\n  </mat-toolbar>\n</ng-container>\n<mat-dialog-content [ngStyle]=\"contentStyle\">\n  <ng-container *ngIf=\"isPagedManifest\">\n    <section data-testid=\"page-layout\">\n      <h2>{{ intl.pageLayoutLabel }}</h2>\n      <div\n        class=\"flex flex-col gap-y-2\"\n        role=\"group\"\n        [attr.aria-label]=\"intl.pageLayoutLabel\"\n      >\n        <div class=\"flex items-center\">\n          <mat-button-toggle\n            data-testid=\"ngx-mime-single-page-view-button\"\n            [aria-label]=\"intl.singlePageViewLabel\"\n            [value]=\"ViewerLayout.ONE_PAGE\"\n            [checked]=\"viewerLayout === ViewerLayout.ONE_PAGE\"\n            (click)=\"setLayoutOnePage()\"\n          >\n            <mime-icon [iconName]=\"'single_page_display'\"> </mime-icon>\n          </mat-button-toggle>\n          <div class=\"label\">{{ intl.singlePageViewLabel }}</div>\n        </div>\n        <div class=\"flex items-center\">\n          <mat-button-toggle\n            data-testid=\"ngx-mime-two-page-view-button\"\n            [aria-label]=\"intl.twoPageViewLabel\"\n            [value]=\"ViewerLayout.TWO_PAGE\"\n            [checked]=\"viewerLayout === ViewerLayout.TWO_PAGE\"\n            (click)=\"setLayoutTwoPage()\"\n          >\n            <mime-icon [iconName]=\"'two_page_display'\"> </mime-icon>\n          </mat-button-toggle>\n          <div class=\"label\">{{ intl.twoPageViewLabel }}</div>\n        </div>\n      </div>\n    </section>\n  </ng-container>\n  <ng-container *ngIf=\"hasRecognizedTextContent\">\n    <mat-divider></mat-divider>\n    <section data-testid=\"recognized-text-content\">\n      <h2>{{ intl.digitalTextLabel }}</h2>\n      <div\n        class=\"flex flex-col gap-y-2\"\n        role=\"group\"\n        [attr.aria-label]=\"intl.digitalTextLabel\"\n      >\n        <div class=\"flex items-center\">\n          <mat-button-toggle\n            data-testid=\"ngx-mime-recognized-text-content-close-button\"\n            [aria-label]=\"intl.recognizedTextContentCloseLabel\"\n            [value]=\"RecognizedTextMode.NONE\"\n            [checked]=\"recognizedTextMode === RecognizedTextMode.NONE\"\n            (click)=\"closeRecognizedTextContent()\"\n          >\n            <mat-icon>hide_source</mat-icon>\n          </mat-button-toggle>\n          <div class=\"label\">{{ intl.recognizedTextContentCloseLabel }}</div>\n        </div>\n        <div class=\"flex items-center\">\n          <mat-button-toggle\n            data-testid=\"ngx-mime-recognized-text-content-split-view-button\"\n            [aria-label]=\"intl.recognizedTextContentInSplitViewLabel\"\n            [value]=\"RecognizedTextMode.SPLIT\"\n            [checked]=\"recognizedTextMode === RecognizedTextMode.SPLIT\"\n            (click)=\"showRecognizedTextContentInSplitView()\"\n          >\n            <mat-icon>view_sidebar</mat-icon>\n          </mat-button-toggle>\n          <div class=\"label\">{{\n            intl.recognizedTextContentInSplitViewLabel\n          }}</div>\n        </div>\n        <div class=\"flex items-center\">\n          <mat-button-toggle\n            data-testid=\"ngx-mime-recognized-text-content-only-button\"\n            [aria-label]=\"intl.showRecognizedTextContentLabel\"\n            [value]=\"RecognizedTextMode.ONLY\"\n            [checked]=\"recognizedTextMode === RecognizedTextMode.ONLY\"\n            (click)=\"showRecognizedTextContentOnly()\"\n          >\n            <mat-icon>article</mat-icon>\n          </mat-button-toggle>\n          <div class=\"label\">{{ intl.showRecognizedTextContentLabel }}</div>\n        </div>\n      </div>\n    </section>\n  </ng-container>\n</mat-dialog-content>\n", styles: [".mat-mdc-dialog-title{color:inherit;padding:0 2px 16px}::ng-deep .view-panel>.mat-mdc-dialog-container{padding:0!important;overflow:initial}section{padding:16px 0}.label{margin-left:16px}.mat-mdc-dialog-content{margin:0;padding:0 16px}\n"], dependencies: [{ kind: "directive", type: i6$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6$1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i6$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i6$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i6$1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i8$1.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { kind: "component", type: i8$2.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i10$1.MatButtonToggle, selector: "mat-button-toggle", inputs: ["disableRipple", "aria-label", "aria-labelledby", "id", "name", "value", "tabIndex", "appearance", "checked", "disabled"], outputs: ["change"], exportAs: ["matButtonToggle"] }, { kind: "component", type: i9.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i10.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "directive", type: i1$1.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "component", type: i14.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "component", type: IconComponent, selector: "mime-icon", inputs: ["iconName"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-view-dialog', template: "<ng-container [ngSwitch]=\"isHandsetOrTabletInPortrait\">\n  <mat-toolbar\n    *ngSwitchCase=\"true\"\n    color=\"primary\"\n    data-testid=\"mobile-toolbar\"\n  >\n    <button\n      data-testid=\"ngx-mime-view-dialog-close-button\"\n      mat-icon-button\n      [aria-label]=\"intl.closeLabel\"\n      [matTooltip]=\"intl.closeLabel\"\n      [matDialogClose]=\"true\"\n    >\n      <mat-icon>close</mat-icon>\n    </button>\n    <h1 mat-dialog-title>{{ intl.layoutMenuLabel }}</h1>\n  </mat-toolbar>\n  <mat-toolbar\n    *ngSwitchDefault\n    class=\"justify-between\"\n    data-testid=\"desktop-toolbar\"\n  >\n    <h1 mat-dialog-title data-testid=\"ngx-mime-heading-desktop\">{{\n      intl.layoutMenuLabel\n    }}</h1>\n    <button\n      data-testid=\"ngx-mime-view-dialog-close-button\"\n      mat-icon-button\n      [aria-label]=\"intl.closeLabel\"\n      [matTooltip]=\"intl.closeLabel\"\n      [matDialogClose]=\"true\"\n    >\n      <mat-icon>close</mat-icon>\n    </button>\n  </mat-toolbar>\n</ng-container>\n<mat-dialog-content [ngStyle]=\"contentStyle\">\n  <ng-container *ngIf=\"isPagedManifest\">\n    <section data-testid=\"page-layout\">\n      <h2>{{ intl.pageLayoutLabel }}</h2>\n      <div\n        class=\"flex flex-col gap-y-2\"\n        role=\"group\"\n        [attr.aria-label]=\"intl.pageLayoutLabel\"\n      >\n        <div class=\"flex items-center\">\n          <mat-button-toggle\n            data-testid=\"ngx-mime-single-page-view-button\"\n            [aria-label]=\"intl.singlePageViewLabel\"\n            [value]=\"ViewerLayout.ONE_PAGE\"\n            [checked]=\"viewerLayout === ViewerLayout.ONE_PAGE\"\n            (click)=\"setLayoutOnePage()\"\n          >\n            <mime-icon [iconName]=\"'single_page_display'\"> </mime-icon>\n          </mat-button-toggle>\n          <div class=\"label\">{{ intl.singlePageViewLabel }}</div>\n        </div>\n        <div class=\"flex items-center\">\n          <mat-button-toggle\n            data-testid=\"ngx-mime-two-page-view-button\"\n            [aria-label]=\"intl.twoPageViewLabel\"\n            [value]=\"ViewerLayout.TWO_PAGE\"\n            [checked]=\"viewerLayout === ViewerLayout.TWO_PAGE\"\n            (click)=\"setLayoutTwoPage()\"\n          >\n            <mime-icon [iconName]=\"'two_page_display'\"> </mime-icon>\n          </mat-button-toggle>\n          <div class=\"label\">{{ intl.twoPageViewLabel }}</div>\n        </div>\n      </div>\n    </section>\n  </ng-container>\n  <ng-container *ngIf=\"hasRecognizedTextContent\">\n    <mat-divider></mat-divider>\n    <section data-testid=\"recognized-text-content\">\n      <h2>{{ intl.digitalTextLabel }}</h2>\n      <div\n        class=\"flex flex-col gap-y-2\"\n        role=\"group\"\n        [attr.aria-label]=\"intl.digitalTextLabel\"\n      >\n        <div class=\"flex items-center\">\n          <mat-button-toggle\n            data-testid=\"ngx-mime-recognized-text-content-close-button\"\n            [aria-label]=\"intl.recognizedTextContentCloseLabel\"\n            [value]=\"RecognizedTextMode.NONE\"\n            [checked]=\"recognizedTextMode === RecognizedTextMode.NONE\"\n            (click)=\"closeRecognizedTextContent()\"\n          >\n            <mat-icon>hide_source</mat-icon>\n          </mat-button-toggle>\n          <div class=\"label\">{{ intl.recognizedTextContentCloseLabel }}</div>\n        </div>\n        <div class=\"flex items-center\">\n          <mat-button-toggle\n            data-testid=\"ngx-mime-recognized-text-content-split-view-button\"\n            [aria-label]=\"intl.recognizedTextContentInSplitViewLabel\"\n            [value]=\"RecognizedTextMode.SPLIT\"\n            [checked]=\"recognizedTextMode === RecognizedTextMode.SPLIT\"\n            (click)=\"showRecognizedTextContentInSplitView()\"\n          >\n            <mat-icon>view_sidebar</mat-icon>\n          </mat-button-toggle>\n          <div class=\"label\">{{\n            intl.recognizedTextContentInSplitViewLabel\n          }}</div>\n        </div>\n        <div class=\"flex items-center\">\n          <mat-button-toggle\n            data-testid=\"ngx-mime-recognized-text-content-only-button\"\n            [aria-label]=\"intl.showRecognizedTextContentLabel\"\n            [value]=\"RecognizedTextMode.ONLY\"\n            [checked]=\"recognizedTextMode === RecognizedTextMode.ONLY\"\n            (click)=\"showRecognizedTextContentOnly()\"\n          >\n            <mat-icon>article</mat-icon>\n          </mat-button-toggle>\n          <div class=\"label\">{{ intl.showRecognizedTextContentLabel }}</div>\n        </div>\n      </div>\n    </section>\n  </ng-container>\n</mat-dialog-content>\n", styles: [".mat-mdc-dialog-title{color:inherit;padding:0 2px 16px}::ng-deep .view-panel>.mat-mdc-dialog-container{padding:0!important;overflow:initial}section{padding:16px 0}.label{margin-left:16px}.mat-mdc-dialog-content{margin:0;padding:0 16px}\n"] }]
        }], ctorParameters: function () { return [{ type: MimeViewerIntl }, { type: i1.BreakpointObserver }, { type: i0.ChangeDetectorRef }, { type: ViewerLayoutService }, { type: IiifManifestService }, { type: AltoService }, { type: MimeResizeService }]; } });

class ViewDialogService {
    constructor(dialog, viewDialogConfigStrategyFactory, mimeResizeService) {
        this.dialog = dialog;
        this.viewDialogConfigStrategyFactory = viewDialogConfigStrategyFactory;
        this.mimeResizeService = mimeResizeService;
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe((rect) => {
            if (this.isOpen()) {
                const config = this.getDialogConfig();
                this.dialogRef?.updatePosition(config.position);
                this.dialogRef?.updateSize(config.width, config.height);
            }
        }));
    }
    destroy() {
        this.close();
        this.unsubscribe();
    }
    set el(el) {
        this._el = el;
    }
    set viewContainerRef(viewContainerRef) {
        this._viewContainerRef = viewContainerRef;
    }
    open() {
        if (!this.isOpen()) {
            const config = this.getDialogConfig();
            this.dialogRef = this.dialog.open(ViewDialogComponent, config);
        }
    }
    close() {
        if (this.isOpen()) {
            this.dialogRef?.close();
        }
    }
    toggle() {
        this.isOpen() ? this.close() : this.open();
    }
    isOpen() {
        return this.dialogRef?.getState() === 0 /* MatDialogState.OPEN */;
    }
    getDialogConfig() {
        if (!this._el || !this._viewContainerRef) {
            throw new Error('No element or viewContainerRef');
        }
        return this.viewDialogConfigStrategyFactory
            .create()
            .getConfig(this._el, this._viewContainerRef);
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewDialogService, deps: [{ token: i1$1.MatDialog }, { token: ViewDialogConfigStrategyFactory }, { token: MimeResizeService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewDialogService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewDialogService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.MatDialog }, { type: ViewDialogConfigStrategyFactory }, { type: MimeResizeService }]; } });

class AccessKeys {
    static { this.PAGEDOWN = [34]; }
    static { this.PAGEUP = [33]; }
    static { this.ARROWRIGHT = [39]; }
    static { this.ARROWLEFT = [37]; }
    static { this.firstCanvasGroupCodes = [36]; } // Home
    static { this.lastCanvasGroupCodes = [35]; } // End
    static { this.zoomInCodes = [107, 187, 171]; } // +, numpad and standard position, Firefox uses 171 for standard position
    static { this.zoomOutCodes = [109, 189, 173]; } // -, numpad and standard position, Firefox uses 173 for standard position
    static { this.zoomHomeCodes = [96, 48]; } // 0
    static { this.nextHit = [78]; } // n
    static { this.previousHit = [80]; } // p
    static { this.toggleSearchDialogCodes = [83]; } // s
    static { this.toggleInformationDialogCodes = [67]; } // C
    static { this.toggleFullscreenCodes = [70]; } // f
    static { this.resetSearch = [83]; } // s
    static { this.rotateCwCodes = [82]; } // r
    static { this.recognizedTextContentCodes = [84]; } // t
    constructor(event) {
        this.altKey = false;
        this.shiftKey = false;
        this.ctrlkey = false;
        this.metaKey = false;
        this.event = event;
        this.keyCode = event.keyCode;
        this.altKey = event.altKey;
        this.shiftKey = event.shiftKey;
        this.ctrlkey = event.ctrlKey;
        this.metaKey = event.metaKey;
    }
    isArrowRightKeys() {
        return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.ARROWRIGHT);
    }
    isArrowLeftKeys() {
        return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.ARROWLEFT);
    }
    isPageUpKeys() {
        return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.PAGEUP);
    }
    isPageDownKeys() {
        return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.PAGEDOWN);
    }
    isFirstCanvasGroupKeys() {
        return (!this.isMultiKeys() &&
            this.arrayContainsKeys(AccessKeys.firstCanvasGroupCodes));
    }
    isLastCanvasGroupKeys() {
        return (!this.isMultiKeys() &&
            this.arrayContainsKeys(AccessKeys.lastCanvasGroupCodes));
    }
    isSliderKeys() {
        return (this.isArrowLeftKeys() ||
            this.isArrowRightKeys() ||
            this.isPageDownKeys() ||
            this.isPageUpKeys() ||
            this.isFirstCanvasGroupKeys() ||
            this.isLastCanvasGroupKeys());
    }
    isZoomInKeys() {
        return (!this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.zoomInCodes));
    }
    isZoomOutKeys() {
        return (!this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.zoomOutCodes));
    }
    isZoomHomeKeys() {
        return (!this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.zoomHomeCodes));
    }
    isNextHitKeys() {
        return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.nextHit);
    }
    isPreviousHitKeys() {
        return (!this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.previousHit));
    }
    isSearchDialogKeys() {
        return (!this.isMultiKeys() &&
            this.arrayContainsKeys(AccessKeys.toggleSearchDialogCodes));
    }
    isInformationDialogKeys() {
        return (!this.isMultiKeys() &&
            this.arrayContainsKeys(AccessKeys.toggleInformationDialogCodes));
    }
    isFullscreenKeys() {
        return (!this.isMultiKeys() &&
            this.arrayContainsKeys(AccessKeys.toggleFullscreenCodes));
    }
    isResetSearchKeys() {
        return (!this.isMetaPressed() &&
            this.isShiftPressed() &&
            this.arrayContainsKeys(AccessKeys.resetSearch));
    }
    isRotateKeys() {
        return (!this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.rotateCwCodes));
    }
    isRecognizedTextContentKeys() {
        return (!this.isMultiKeys() &&
            this.arrayContainsKeys(AccessKeys.recognizedTextContentCodes));
    }
    execute(fn) {
        this.event.preventDefault();
        fn();
    }
    isMultiKeys() {
        return this.altKey || this.shiftKey || this.ctrlkey;
    }
    arrayContainsKeys(keys) {
        return keys.indexOf(this.keyCode) > -1;
    }
    isShiftPressed() {
        return this.shiftKey;
    }
    isMetaPressed() {
        return this.metaKey;
    }
}

class AccessKeysService {
    constructor(viewerService, canvasService, modeService, iiifManifestService, iiifContentSearchService, contentSearchDialogService, informationDialogService, viewDialogService, mimeDomHelper, contentSearchNavigationService, altoService) {
        this.viewerService = viewerService;
        this.canvasService = canvasService;
        this.modeService = modeService;
        this.iiifManifestService = iiifManifestService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.contentSearchDialogService = contentSearchDialogService;
        this.informationDialogService = informationDialogService;
        this.viewDialogService = viewDialogService;
        this.mimeDomHelper = mimeDomHelper;
        this.contentSearchNavigationService = contentSearchNavigationService;
        this.altoService = altoService;
        this.isSearchable = false;
        this.hasHits = false;
        this.disabledKeys = [];
        this.subscriptions = new Subscription();
        this.invert = false;
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            if (manifest) {
                this.isSearchable = this.isManifestSearchable(manifest);
                this.invert = manifest.viewingDirection === ViewingDirection.RTL;
            }
        }));
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((result) => {
            this.hasHits = result.hits.length > 0;
        }));
    }
    destroy() {
        this.unsubscribe();
    }
    handleKeyEvents(event) {
        const accessKeys = new AccessKeys(event);
        if (!this.isKeyDisabled(event.keyCode)) {
            if (accessKeys.isArrowLeftKeys()) {
                if (!this.isZoomedIn()) {
                    this.invert
                        ? accessKeys.execute(() => this.goToNextCanvasGroup())
                        : accessKeys.execute(() => this.goToPreviousCanvasGroup());
                }
            }
            else if (accessKeys.isArrowRightKeys()) {
                if (!this.isZoomedIn()) {
                    this.invert
                        ? accessKeys.execute(() => this.goToPreviousCanvasGroup())
                        : accessKeys.execute(() => this.goToNextCanvasGroup());
                }
            }
            else if (accessKeys.isFirstCanvasGroupKeys()) {
                accessKeys.execute(() => this.goToFirstCanvasGroup());
            }
            else if (accessKeys.isLastCanvasGroupKeys()) {
                accessKeys.execute(() => this.goToLastCanvasGroup());
            }
            else if (accessKeys.isNextHitKeys() && this.hasHits) {
                accessKeys.execute(() => this.goToNextHit());
            }
            else if (accessKeys.isPreviousHitKeys() && this.hasHits) {
                accessKeys.execute(() => this.goToPreviousHit());
            }
            else if (accessKeys.isFullscreenKeys()) {
                accessKeys.execute(() => this.toggleFullscreen());
            }
            else if (accessKeys.isSearchDialogKeys() && this.isSearchable) {
                accessKeys.execute(() => {
                    this.toggleSearchDialog();
                });
            }
            else if (accessKeys.isInformationDialogKeys()) {
                accessKeys.execute(() => this.toggleInformationDialog());
            }
            else if (accessKeys.isResetSearchKeys()) {
                accessKeys.execute(() => this.resetSearch());
            }
            else if (accessKeys.isPageDownKeys()) {
                accessKeys.execute(() => this.goToNextCanvasGroup());
            }
            else if (accessKeys.isPageUpKeys()) {
                accessKeys.execute(() => this.goToPreviousCanvasGroup());
            }
            else if (accessKeys.isZoomInKeys()) {
                accessKeys.execute(() => this.zoomIn());
            }
            else if (accessKeys.isZoomOutKeys()) {
                accessKeys.execute(() => this.zoomOut());
            }
            else if (accessKeys.isZoomHomeKeys()) {
                accessKeys.execute(() => this.zoomHome());
            }
            else if (accessKeys.isRotateKeys()) {
                accessKeys.execute(() => this.rotateClockWise());
            }
            else if (accessKeys.isRecognizedTextContentKeys()) {
                accessKeys.execute(() => this.toggleRecognizedTextContentInSplitView());
            }
        }
    }
    goToNextCanvasGroup() {
        this.viewerService.goToNextCanvasGroup();
    }
    goToPreviousCanvasGroup() {
        this.viewerService.goToPreviousCanvasGroup();
    }
    goToFirstCanvasGroup() {
        this.viewerService.goToCanvasGroup(0, false);
    }
    goToLastCanvasGroup() {
        this.viewerService.goToCanvasGroup(this.canvasService.numberOfCanvasGroups - 1, false);
    }
    rotateClockWise() {
        this.viewerService.rotate();
        this.mimeDomHelper.setFocusOnViewer();
    }
    toggleRecognizedTextContentInSplitView() {
        if (this.altoService.recognizedTextContentMode !== RecognizedTextMode.SPLIT) {
            this.altoService.showRecognizedTextContentInSplitView();
        }
        else {
            this.altoService.closeRecognizedTextContent();
        }
    }
    goToNextHit() {
        this.contentSearchNavigationService.goToNextHit();
    }
    goToPreviousHit() {
        this.contentSearchNavigationService.goToPreviousHit();
    }
    zoomIn() {
        if (this.modeService.mode === ViewerMode.DASHBOARD) {
            this.modeService.toggleMode();
        }
        else {
            this.viewerService.zoomIn();
        }
    }
    zoomOut() {
        if (this.modeService.mode === ViewerMode.PAGE) {
            this.modeService.toggleMode();
        }
        else if (this.modeService.isPageZoomed()) {
            this.viewerService.zoomOut();
        }
    }
    zoomHome() {
        if (this.modeService.isPageZoomed()) {
            this.viewerService.home();
        }
    }
    toggleSearchDialog() {
        if (this.modeService.mode === ViewerMode.PAGE ||
            this.modeService.isPageZoomed()) {
            this.modeService.mode = ViewerMode.DASHBOARD;
            this.contentSearchDialogService.open();
        }
        else {
            if (this.contentSearchDialogService.isOpen()) {
                this.contentSearchDialogService.close();
            }
            else {
                this.contentSearchDialogService.open();
            }
        }
        this.informationDialogService.close();
        this.viewDialogService.close();
    }
    toggleInformationDialog() {
        if (this.modeService.mode === ViewerMode.PAGE ||
            this.modeService.isPageZoomed()) {
            this.modeService.mode = ViewerMode.DASHBOARD;
            this.informationDialogService.open();
        }
        else {
            if (this.informationDialogService.isOpen()) {
                this.informationDialogService.close();
            }
            else {
                this.informationDialogService.open();
            }
        }
        this.contentSearchDialogService.close();
        this.viewDialogService.close();
    }
    toggleFullscreen() {
        this.mimeDomHelper.toggleFullscreen();
        this.mimeDomHelper.setFocusOnViewer();
    }
    resetSearch() {
        this.iiifContentSearchService.destroy();
    }
    isManifestSearchable(manifest) {
        return manifest.service ? true : false;
    }
    isZoomedIn() {
        return this.modeService.isPageZoomed();
    }
    updateDisabledKeys() {
        this.resetDisabledKeys();
        if (this.informationDialogService.isOpen()) {
            this.disableKeysForContentDialog();
        }
        else if (this.contentSearchDialogService.isOpen()) {
            this.diableKeysForContentSearchDialog();
        }
        if (this.isRecognizedTextContentModeOnly()) {
            this.disableKeysForRecognizedTextContentOnly();
        }
    }
    disableKeysForContentDialog() {
        this.disabledKeys = this.disabledKeys
            .concat(AccessKeys.ARROWLEFT)
            .concat(AccessKeys.ARROWRIGHT);
    }
    diableKeysForContentSearchDialog() {
        this.disabledKeys = this.disabledKeys
            .concat(AccessKeys.ARROWLEFT)
            .concat(AccessKeys.ARROWRIGHT)
            .concat(AccessKeys.firstCanvasGroupCodes)
            .concat(AccessKeys.lastCanvasGroupCodes)
            .concat(AccessKeys.zoomInCodes)
            .concat(AccessKeys.zoomOutCodes)
            .concat(AccessKeys.zoomHomeCodes)
            .concat(AccessKeys.nextHit)
            .concat(AccessKeys.previousHit)
            .concat(AccessKeys.toggleSearchDialogCodes)
            .concat(AccessKeys.toggleInformationDialogCodes)
            .concat(AccessKeys.toggleFullscreenCodes);
    }
    isRecognizedTextContentModeOnly() {
        return (this.altoService.recognizedTextContentMode === RecognizedTextMode.ONLY);
    }
    disableKeysForRecognizedTextContentOnly() {
        this.disabledKeys = this.disabledKeys
            .concat(AccessKeys.zoomInCodes)
            .concat(AccessKeys.zoomOutCodes)
            .concat(AccessKeys.zoomHomeCodes);
    }
    resetDisabledKeys() {
        this.disabledKeys = [];
    }
    isKeyDisabled(keyCode) {
        this.updateDisabledKeys();
        return this.disabledKeys.indexOf(keyCode) > -1;
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: AccessKeysService, deps: [{ token: ViewerService }, { token: CanvasService }, { token: ModeService }, { token: IiifManifestService }, { token: IiifContentSearchService }, { token: ContentSearchDialogService }, { token: InformationDialogService }, { token: ViewDialogService }, { token: MimeDomHelper }, { token: ContentSearchNavigationService }, { token: AltoService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: AccessKeysService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: AccessKeysService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: ViewerService }, { type: CanvasService }, { type: ModeService }, { type: IiifManifestService }, { type: IiifContentSearchService }, { type: ContentSearchDialogService }, { type: InformationDialogService }, { type: ViewDialogService }, { type: MimeDomHelper }, { type: ContentSearchNavigationService }, { type: AltoService }]; } });

class AttributionDialogResizeService {
    constructor(mimeDomHelper) {
        this.mimeDomHelper = mimeDomHelper;
        this._el = null;
        this.resizeSubject = new ReplaySubject();
        this.dimensions = new Dimensions();
    }
    set el(el) {
        this._el = el;
    }
    get el() {
        return this._el;
    }
    get onResize() {
        return this.resizeSubject.asObservable();
    }
    markForCheck() {
        if (this.el) {
            const dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);
            if (this.dimensions.bottom !== dimensions.bottom ||
                this.dimensions.height !== dimensions.height ||
                this.dimensions.left !== dimensions.left ||
                this.dimensions.right !== dimensions.right ||
                this.dimensions.top !== dimensions.top ||
                this.dimensions.width !== dimensions.width) {
                this.dimensions = dimensions;
                this.resizeSubject.next({ ...this.dimensions });
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: AttributionDialogResizeService, deps: [{ token: MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: AttributionDialogResizeService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: AttributionDialogResizeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: MimeDomHelper }]; } });

class AttributionDialogComponent {
    constructor(intl, renderer, el, changeDetectorRef, iiifManifestService, attributionDialogResizeService, styleService, accessKeysHandlerService) {
        this.intl = intl;
        this.renderer = renderer;
        this.el = el;
        this.changeDetectorRef = changeDetectorRef;
        this.iiifManifestService = iiifManifestService;
        this.attributionDialogResizeService = attributionDialogResizeService;
        this.styleService = styleService;
        this.accessKeysHandlerService = accessKeysHandlerService;
        this.manifest = null;
        this.subscriptions = new Subscription();
        attributionDialogResizeService.el = el;
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
            this.changeDetectorRef.markForCheck();
        }));
    }
    ngAfterViewInit() {
        this.subscriptions.add(this.styleService.onChange.subscribe((color) => {
            if (color) {
                const backgroundRgbaColor = this.styleService.convertToRgba(color, 0.3);
                this.renderer.setStyle(this.container?.nativeElement, 'background-color', backgroundRgbaColor);
            }
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    handleKeys(event) {
        this.accessKeysHandlerService.handleKeyEvents(event);
    }
    onResize(event) {
        this.attributionDialogResizeService.markForCheck();
    }
    ngAfterViewChecked() {
        this.attributionDialogResizeService.markForCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: AttributionDialogComponent, deps: [{ token: MimeViewerIntl }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: IiifManifestService }, { token: AttributionDialogResizeService }, { token: StyleService }, { token: AccessKeysService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: AttributionDialogComponent, selector: "ng-component", host: { listeners: { "keydown": "handleKeys($event)", "window:resize": "onResize($event)" } }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, static: true }], ngImport: i0, template: "<div #container class=\"attribution-container\">\n  <mat-toolbar class=\"attribution-toolbar justify-between\">\n    <h1 mat-dialog-title>{{ intl.attributionLabel }}</h1>\n    <button\n      mat-icon-button\n      [aria-label]=\"intl.attributonCloseAriaLabel\"\n      [matTooltip]=\"intl.closeLabel\"\n      [matDialogClose]=\"true\"\n    >\n      <mat-icon>close</mat-icon>\n    </button>\n  </mat-toolbar>\n  <p mat-dialog-content [innerHTML]=\"manifest?.attribution\"> </p>\n</div>\n", styles: [".attribution-toolbar{font-size:14px;background:transparent;min-height:20px!important;padding:6px}.mat-mdc-dialog-title{font-size:16px;padding:0 2px 16px}.mat-mdc-dialog-content{padding:8px;margin:0}::ng-deep .attribution-panel .mdc-dialog__surface{background:transparent!important}::ng-deep .attribution-container>.mat-mdc-dialog-content{font-size:11px}::ng-deep .attribution-toolbar>.mat-toolbar-layout>.mat-toolbar-row{height:20px}\n"], dependencies: [{ kind: "component", type: i8$1.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { kind: "component", type: i8$2.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i9.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i10.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "directive", type: i1$1.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: AttributionDialogComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, template: "<div #container class=\"attribution-container\">\n  <mat-toolbar class=\"attribution-toolbar justify-between\">\n    <h1 mat-dialog-title>{{ intl.attributionLabel }}</h1>\n    <button\n      mat-icon-button\n      [aria-label]=\"intl.attributonCloseAriaLabel\"\n      [matTooltip]=\"intl.closeLabel\"\n      [matDialogClose]=\"true\"\n    >\n      <mat-icon>close</mat-icon>\n    </button>\n  </mat-toolbar>\n  <p mat-dialog-content [innerHTML]=\"manifest?.attribution\"> </p>\n</div>\n", styles: [".attribution-toolbar{font-size:14px;background:transparent;min-height:20px!important;padding:6px}.mat-mdc-dialog-title{font-size:16px;padding:0 2px 16px}.mat-mdc-dialog-content{padding:8px;margin:0}::ng-deep .attribution-panel .mdc-dialog__surface{background:transparent!important}::ng-deep .attribution-container>.mat-mdc-dialog-content{font-size:11px}::ng-deep .attribution-toolbar>.mat-toolbar-layout>.mat-toolbar-row{height:20px}\n"] }]
        }], ctorParameters: function () { return [{ type: MimeViewerIntl }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: IiifManifestService }, { type: AttributionDialogResizeService }, { type: StyleService }, { type: AccessKeysService }]; }, propDecorators: { container: [{
                type: ViewChild,
                args: ['container', { static: true }]
            }], handleKeys: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], onResize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });

class CanvasGroupDialogComponent {
    constructor(dialogRef, fb, viewerService, canvasService, intl, changeDetectorRef) {
        this.dialogRef = dialogRef;
        this.fb = fb;
        this.viewerService = viewerService;
        this.canvasService = canvasService;
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.subscriptions = new Subscription();
        this.numberOfCanvases = this.canvasService.numberOfCanvases;
        this.canvasGroupForm = this.fb.group({
            canvasGroupControl: new FormControl(null, [
                Validators.required,
                Validators.min(1),
                Validators.max(this.numberOfCanvases),
            ]),
        });
    }
    get canvasGroupControl() {
        return this.canvasGroupForm.get('canvasGroupControl');
    }
    ngOnInit() {
        this.subscriptions.add(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    onSubmit() {
        if (this.canvasGroupForm.valid) {
            const pageNumber = this.canvasGroupControl?.value;
            if (pageNumber !== null && pageNumber !== undefined)
                this.viewerService.goToCanvasGroup(this.canvasService.findCanvasGroupByCanvasIndex(pageNumber - 1), false);
            this.dialogRef.close();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: CanvasGroupDialogComponent, deps: [{ token: i1$1.MatDialogRef }, { token: i2$1.FormBuilder }, { token: ViewerService }, { token: CanvasService }, { token: MimeViewerIntl }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: CanvasGroupDialogComponent, selector: "ng-component", ngImport: i0, template: "<h1 class=\"canvas-group-dialog-title\" mat-dialog-title>{{\n  intl.goToPageLabel\n}}</h1>\n<form\n  [formGroup]=\"canvasGroupForm\"\n  (ngSubmit)=\"onSubmit()\"\n  novalidate\n  autocomplete=\"off\"\n>\n  <div mat-dialog-content>\n    <mat-form-field [floatLabel]=\"'always'\">\n      <mat-label>{{ intl.enterPageNumber }}</mat-label>\n      <input\n        class=\"go-to-canvas-group-input\"\n        type=\"number\"\n        matInput\n        min=\"1\"\n        formControlName=\"canvasGroupControl\"\n      />\n      <mat-error *ngIf=\"canvasGroupControl?.errors?.['max']\">{{\n        intl.pageDoesNotExists\n      }}</mat-error>\n    </mat-form-field>\n  </div>\n  <div mat-dialog-actions [align]=\"'end'\">\n    <button type=\"button\" mat-button matDialogClose>CANCEL</button>\n    <button\n      type=\"submit\"\n      mat-button\n      [disabled]=\"canvasGroupForm.pristine || canvasGroupForm.invalid\"\n      >OK</button\n    >\n  </div>\n</form>\n", styles: [".canvas-group-dialog-title{margin:0 0 20px;display:block}\n"], dependencies: [{ kind: "directive", type: i6$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$1.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2$1.MinValidator, selector: "input[type=number][min][formControlName],input[type=number][min][formControl],input[type=number][min][ngModel]", inputs: ["min"] }, { kind: "directive", type: i2$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i8$2.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i1$1.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "directive", type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: i15.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i16.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i16.MatLabel, selector: "mat-label" }, { kind: "directive", type: i16.MatError, selector: "mat-error, [matError]", inputs: ["id"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: CanvasGroupDialogComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, template: "<h1 class=\"canvas-group-dialog-title\" mat-dialog-title>{{\n  intl.goToPageLabel\n}}</h1>\n<form\n  [formGroup]=\"canvasGroupForm\"\n  (ngSubmit)=\"onSubmit()\"\n  novalidate\n  autocomplete=\"off\"\n>\n  <div mat-dialog-content>\n    <mat-form-field [floatLabel]=\"'always'\">\n      <mat-label>{{ intl.enterPageNumber }}</mat-label>\n      <input\n        class=\"go-to-canvas-group-input\"\n        type=\"number\"\n        matInput\n        min=\"1\"\n        formControlName=\"canvasGroupControl\"\n      />\n      <mat-error *ngIf=\"canvasGroupControl?.errors?.['max']\">{{\n        intl.pageDoesNotExists\n      }}</mat-error>\n    </mat-form-field>\n  </div>\n  <div mat-dialog-actions [align]=\"'end'\">\n    <button type=\"button\" mat-button matDialogClose>CANCEL</button>\n    <button\n      type=\"submit\"\n      mat-button\n      [disabled]=\"canvasGroupForm.pristine || canvasGroupForm.invalid\"\n      >OK</button\n    >\n  </div>\n</form>\n", styles: [".canvas-group-dialog-title{margin:0 0 20px;display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: i2$1.FormBuilder }, { type: ViewerService }, { type: CanvasService }, { type: MimeViewerIntl }, { type: i0.ChangeDetectorRef }]; } });

class HelpDialogComponent {
    constructor(intl, cdr, mimeResizeService, breakpointObserver) {
        this.intl = intl;
        this.cdr = cdr;
        this.mimeResizeService = mimeResizeService;
        this.breakpointObserver = breakpointObserver;
        this.tabHeight = {};
        this.isHandsetOrTabletInPortrait = false;
        this.mimeHeight = 0;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.breakpointObserver
            .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
            .subscribe((value) => (this.isHandsetOrTabletInPortrait = value.matches)));
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe((dimensions) => {
            this.mimeHeight = dimensions.height;
            this.resizeTabHeight();
        }));
        this.resizeTabHeight();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    resizeTabHeight() {
        let height = this.mimeHeight;
        if (this.isHandsetOrTabletInPortrait) {
            this.tabHeight = {
                maxHeight: window.innerHeight - 128 + 'px',
            };
        }
        else {
            height -= 272;
            this.tabHeight = {
                maxHeight: height + 'px',
            };
        }
        this.cdr.detectChanges();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: HelpDialogComponent, deps: [{ token: MimeViewerIntl }, { token: i0.ChangeDetectorRef }, { token: MimeResizeService }, { token: i1.BreakpointObserver }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: HelpDialogComponent, selector: "mime-help", ngImport: i0, template: "<div class=\"help-container\">\n  <ng-container [ngSwitch]=\"isHandsetOrTabletInPortrait\">\n    <mat-toolbar *ngSwitchCase=\"true\" color=\"primary\">\n      <button\n        mat-icon-button\n        [aria-label]=\"intl.helpCloseAriaLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        [matDialogClose]=\"true\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n      <h1 mat-dialog-title>{{ intl.help.helpLabel }}</h1>\n    </mat-toolbar>\n    <mat-toolbar *ngSwitchDefault class=\"justify-between\">\n      <h1 class=\"heading-desktop\" mat-dialog-title>{{\n        intl.help.helpLabel\n      }}</h1>\n      <button\n        mat-icon-button\n        [aria-label]=\"intl.helpCloseAriaLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        [matDialogClose]=\"true\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n    </mat-toolbar>\n  </ng-container>\n  <mat-dialog-content [ngStyle]=\"tabHeight\" class=\"help-content\" tabindex=\"0\">\n    <p [innerHTML]=\"intl.help.line1\"></p>\n    <p [innerHTML]=\"intl.help.line2\"></p>\n    <p [innerHTML]=\"intl.help.line3\"></p>\n    <p [innerHTML]=\"intl.help.line4\"></p>\n    <p [innerHTML]=\"intl.help.line5\"></p>\n    <p [innerHTML]=\"intl.help.line6\"></p>\n    <p [innerHTML]=\"intl.help.line12\"></p>\n    <p [innerHTML]=\"intl.help.line7\"></p>\n    <p [innerHTML]=\"intl.help.line8\"></p>\n    <p [innerHTML]=\"intl.help.line9\"></p>\n    <p [innerHTML]=\"intl.help.line10\"></p>\n    <p [innerHTML]=\"intl.help.line11\"></p>\n  </mat-dialog-content>\n</div>\n", styles: [".mat-mdc-dialog-title{color:inherit;padding:0 2px 16px}.help-container{font-size:14px}.help-content{padding:16px;overflow:auto}::ng-deep .help-panel>.mat-mdc-dialog-container{padding:0!important;overflow:initial}\n"], dependencies: [{ kind: "directive", type: i6$1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i6$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i6$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i6$1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i8$1.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { kind: "component", type: i8$2.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i9.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i10.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "directive", type: i1$1.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: HelpDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-help', template: "<div class=\"help-container\">\n  <ng-container [ngSwitch]=\"isHandsetOrTabletInPortrait\">\n    <mat-toolbar *ngSwitchCase=\"true\" color=\"primary\">\n      <button\n        mat-icon-button\n        [aria-label]=\"intl.helpCloseAriaLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        [matDialogClose]=\"true\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n      <h1 mat-dialog-title>{{ intl.help.helpLabel }}</h1>\n    </mat-toolbar>\n    <mat-toolbar *ngSwitchDefault class=\"justify-between\">\n      <h1 class=\"heading-desktop\" mat-dialog-title>{{\n        intl.help.helpLabel\n      }}</h1>\n      <button\n        mat-icon-button\n        [aria-label]=\"intl.helpCloseAriaLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        [matDialogClose]=\"true\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n    </mat-toolbar>\n  </ng-container>\n  <mat-dialog-content [ngStyle]=\"tabHeight\" class=\"help-content\" tabindex=\"0\">\n    <p [innerHTML]=\"intl.help.line1\"></p>\n    <p [innerHTML]=\"intl.help.line2\"></p>\n    <p [innerHTML]=\"intl.help.line3\"></p>\n    <p [innerHTML]=\"intl.help.line4\"></p>\n    <p [innerHTML]=\"intl.help.line5\"></p>\n    <p [innerHTML]=\"intl.help.line6\"></p>\n    <p [innerHTML]=\"intl.help.line12\"></p>\n    <p [innerHTML]=\"intl.help.line7\"></p>\n    <p [innerHTML]=\"intl.help.line8\"></p>\n    <p [innerHTML]=\"intl.help.line9\"></p>\n    <p [innerHTML]=\"intl.help.line10\"></p>\n    <p [innerHTML]=\"intl.help.line11\"></p>\n  </mat-dialog-content>\n</div>\n", styles: [".mat-mdc-dialog-title{color:inherit;padding:0 2px 16px}.help-container{font-size:14px}.help-content{padding:16px;overflow:auto}::ng-deep .help-panel>.mat-mdc-dialog-container{padding:0!important;overflow:initial}\n"] }]
        }], ctorParameters: function () { return [{ type: MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: MimeResizeService }, { type: i1.BreakpointObserver }]; } });

class MimeMaterialModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeMaterialModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.1", ngImport: i0, type: MimeMaterialModule, exports: [MatToolbarModule,
            MatButtonModule,
            MatButtonToggleModule,
            MatIconModule,
            MatTooltipModule,
            MatDialogModule,
            MatTabsModule,
            MatListModule,
            MatSliderModule,
            MatProgressSpinnerModule,
            MatInputModule,
            MatProgressBarModule,
            MatCardModule,
            MatSnackBarModule,
            MatSidenavModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeMaterialModule, imports: [MatToolbarModule,
            MatButtonModule,
            MatButtonToggleModule,
            MatIconModule,
            MatTooltipModule,
            MatDialogModule,
            MatTabsModule,
            MatListModule,
            MatSliderModule,
            MatProgressSpinnerModule,
            MatInputModule,
            MatProgressBarModule,
            MatCardModule,
            MatSnackBarModule,
            MatSidenavModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeMaterialModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [
                        MatToolbarModule,
                        MatButtonModule,
                        MatButtonToggleModule,
                        MatIconModule,
                        MatTooltipModule,
                        MatDialogModule,
                        MatTabsModule,
                        MatListModule,
                        MatSliderModule,
                        MatProgressSpinnerModule,
                        MatInputModule,
                        MatProgressBarModule,
                        MatCardModule,
                        MatSnackBarModule,
                        MatSidenavModule,
                    ],
                }]
        }] });

class SharedModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: SharedModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.1", ngImport: i0, type: SharedModule, exports: [CommonModule, FormsModule, ReactiveFormsModule, MimeMaterialModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: SharedModule, imports: [CommonModule, FormsModule, ReactiveFormsModule, MimeMaterialModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: SharedModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [CommonModule, FormsModule, ReactiveFormsModule, MimeMaterialModule],
                }]
        }] });

const slideInLeft = trigger('slideInLeft', [
    state('hide', style({
        transform: 'translate(-100%, 0)',
        display: 'none',
    })),
    state('show', style({
        transform: 'translate(0px, 0px)',
        display: 'block',
    })),
    transition('hide => show', animate(`${ViewerOptions.transitions.toolbarsEaseInTime}ms ease-out`)),
    transition('show => hide', animate(`${ViewerOptions.transitions.toolbarsEaseOutTime}ms ease-in`)),
]);
const rotate45 = trigger('rotate45', [
    transition('closed => open', [
        style({ transform: 'rotate(-45deg)', opacity: 0 }),
        animate(`100ms`),
    ]),
    transition('open => closed', [
        style({ transform: 'rotate(45deg)', opacity: 0 }),
        animate(`100ms`),
    ]),
]);
const easeInWithDelay = trigger('easeInWithDelay', [
    state('void', style({ transform: 'scale(0)' })),
    transition(':enter', animate(`1ms {{delayEnter}}ms ease-out`), {
        params: { delayEnter: 0 },
    }),
    transition(':leave', animate(`1ms {{delayLeave}}ms ease-in`), {
        params: { delayLeave: 0 },
    }),
]);

class OsdToolbarComponent {
    constructor(intl, breakpointObserver, changeDetectorRef, viewerService, canvasService, iiifManifestService, modeService) {
        this.intl = intl;
        this.breakpointObserver = breakpointObserver;
        this.changeDetectorRef = changeDetectorRef;
        this.viewerService = viewerService;
        this.canvasService = canvasService;
        this.iiifManifestService = iiifManifestService;
        this.modeService = modeService;
        this.numberOfCanvasGroups = 0;
        this.isFirstCanvasGroup = false;
        this.isLastCanvasGroup = false;
        this.invert = false;
        this.isWeb = false;
        this.fabState = 'closed';
        this.fabIcon = 'menu';
        this.showControlButtons = false;
        this.baseAnimationDelay = 20;
        this.isZoomed = true;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.modeService.onChange.subscribe(() => {
            this.isZoomed = this.modeService.isPageZoomed();
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.breakpointObserver
            .observe([Breakpoints.Web])
            .subscribe((value) => {
            this.isWeb = value.matches;
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            if (manifest) {
                this.invert = manifest.viewingDirection === ViewingDirection.LTR;
                this.changeDetectorRef.detectChanges();
            }
        }));
        this.subscriptions.add(this.viewerService.onCanvasGroupIndexChange.subscribe((currentCanvasGroupIndex) => {
            this.numberOfCanvasGroups = this.canvasService.numberOfCanvasGroups;
            this.isFirstCanvasGroup = this.isOnFirstCanvasGroup(currentCanvasGroupIndex);
            this.isLastCanvasGroup = this.isOnLastCanvasGroup(currentCanvasGroupIndex);
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
    }
    toggleFab() {
        this.showControlButtons = !this.showControlButtons;
        this.fabState = this.fabState === 'closed' ? 'open' : 'closed';
        this.fabIcon = this.fabState === 'closed' ? 'menu' : 'clear';
    }
    zoomIn() {
        this.viewerService.zoomIn();
    }
    zoomOut() {
        this.viewerService.zoomOut();
    }
    home() {
        this.viewerService.home();
    }
    rotate() {
        this.viewerService.rotate();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    goToPreviousCanvasGroup() {
        this.viewerService.goToPreviousCanvasGroup();
    }
    goToNextCanvasGroup() {
        this.viewerService.goToNextCanvasGroup();
    }
    isOnFirstCanvasGroup(currentCanvasGroupIndex) {
        return currentCanvasGroupIndex === 0;
    }
    isOnLastCanvasGroup(currentCanvasGroupIndex) {
        return currentCanvasGroupIndex === this.numberOfCanvasGroups - 1;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: OsdToolbarComponent, deps: [{ token: MimeViewerIntl }, { token: i1.BreakpointObserver }, { token: i0.ChangeDetectorRef }, { token: ViewerService }, { token: CanvasService }, { token: IiifManifestService }, { token: ModeService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: OsdToolbarComponent, selector: "mime-osd-toolbar", viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, static: true }], ngImport: i0, template: "<div #container class=\"osd-toolbar\">\n  <div *ngIf=\"isWeb\" class=\"flex gap-2\">\n    <div class=\"flex flex-col gap-2\">\n      <button\n        mat-fab\n        aria-controls=\"osdControls\"\n        data-testid=\"fabButton\"\n        [attr.aria-expanded]=\"fabState === 'open'\"\n        [attr.aria-label]=\"\n          fabState === 'open'\n            ? intl.closeOsdControlPanelLabel\n            : intl.openOsdControlPanelLabel\n        \"\n        [matTooltip]=\"\n          fabState === 'open'\n            ? intl.closeOsdControlPanelLabel\n            : intl.openOsdControlPanelLabel\n        \"\n        (click)=\"toggleFab()\"\n      >\n        <mat-icon [@rotate45]=\"fabState\">{{ fabIcon }}</mat-icon>\n      </button>\n    </div>\n    <div id=\"osdControls\" class=\"flex items-center gap-2\">\n      <ng-container *ngIf=\"invert\">\n        <button\n          *ngIf=\"showControlButtons\"\n          data-testid=\"navigateBeforeButton\"\n          mat-mini-fab\n          [attr.aria-label]=\"intl.previousPageLabel\"\n          [matTooltip]=\"intl.previousPageLabel\"\n          [disabled]=\"isFirstCanvasGroup\"\n          [@easeInWithDelay]=\"{\n            value: '',\n            params: { delayEnter: 0, delayLeave: baseAnimationDelay * 5 }\n          }\"\n          (click)=\"goToPreviousCanvasGroup()\"\n        >\n          <mat-icon>navigate_before</mat-icon>\n        </button>\n      </ng-container>\n      <ng-container *ngIf=\"!invert\">\n        <button\n          *ngIf=\"showControlButtons\"\n          data-testid=\"navigateNextButton\"\n          mat-mini-fab\n          [attr.aria-label]=\"intl.nextPageLabel\"\n          [matTooltip]=\"intl.nextPageLabel\"\n          [disabled]=\"isLastCanvasGroup\"\n          [@easeInWithDelay]=\"{\n            value: '',\n            params: { delayEnter: 0, delayLeave: baseAnimationDelay * 5 }\n          }\"\n          (click)=\"goToNextCanvasGroup()\"\n        >\n          <mat-icon>navigate_before</mat-icon>\n        </button>\n      </ng-container>\n      <ng-container *ngIf=\"invert\">\n        <button\n          *ngIf=\"showControlButtons\"\n          data-testid=\"navigateNextButton\"\n          mat-mini-fab\n          [attr.aria-label]=\"intl.nextPageLabel\"\n          [matTooltip]=\"intl.nextPageLabel\"\n          [disabled]=\"isLastCanvasGroup\"\n          [@easeInWithDelay]=\"{\n            value: '',\n            params: {\n              delayEnter: baseAnimationDelay,\n              delayLeave: baseAnimationDelay * 4\n            }\n          }\"\n          (click)=\"goToNextCanvasGroup()\"\n        >\n          <mat-icon>navigate_next</mat-icon>\n        </button>\n      </ng-container>\n      <ng-container *ngIf=\"!invert\">\n        <button\n          *ngIf=\"showControlButtons\"\n          data-testid=\"navigateBeforeButton\"\n          mat-mini-fab\n          [attr.aria-label]=\"intl.previousPageLabel\"\n          [matTooltip]=\"intl.previousPageLabel\"\n          [disabled]=\"isFirstCanvasGroup\"\n          [@easeInWithDelay]=\"{\n            value: '',\n            params: {\n              delayEnter: baseAnimationDelay,\n              delayLeave: baseAnimationDelay * 4\n            }\n          }\"\n          (click)=\"goToPreviousCanvasGroup()\"\n        >\n          <mat-icon>navigate_next</mat-icon>\n        </button>\n      </ng-container>\n      <button\n        *ngIf=\"showControlButtons\"\n        (click)=\"zoomIn()\"\n        data-testid=\"zoomInButton\"\n        mat-mini-fab\n        [attr.aria-label]=\"intl.zoomInLabel\"\n        [matTooltip]=\"intl.zoomInLabel\"\n        [@easeInWithDelay]=\"{\n          value: '',\n          params: {\n            delayEnter: baseAnimationDelay * 2,\n            delayLeave: baseAnimationDelay * 3\n          }\n        }\"\n      >\n        <mat-icon>zoom_in</mat-icon>\n      </button>\n      <button\n        *ngIf=\"showControlButtons\"\n        (click)=\"home()\"\n        data-testid=\"homeButton\"\n        mat-mini-fab\n        [attr.aria-label]=\"intl.resetZoomLabel\"\n        [disabled]=\"!isZoomed\"\n        [matTooltip]=\"intl.resetZoomLabel\"\n        [@easeInWithDelay]=\"{\n          value: '',\n          params: {\n            delayEnter: baseAnimationDelay * 3,\n            delayLeave: baseAnimationDelay * 2\n          }\n        }\"\n      >\n        <mat-icon>home</mat-icon>\n      </button>\n      <button\n        *ngIf=\"showControlButtons\"\n        (click)=\"zoomOut()\"\n        data-testid=\"zoomOutButton\"\n        mat-mini-fab\n        [attr.aria-label]=\"intl.zoomOutLabel\"\n        [matTooltip]=\"intl.zoomOutLabel\"\n        [@easeInWithDelay]=\"{\n          value: '',\n          params: {\n            delayEnter: baseAnimationDelay * 4,\n            delayLeave: baseAnimationDelay\n          }\n        }\"\n      >\n        <mat-icon>zoom_out</mat-icon>\n      </button>\n      <button\n        *ngIf=\"showControlButtons\"\n        (click)=\"rotate()\"\n        data-testid=\"rotateButton\"\n        mat-mini-fab\n        [attr.aria-label]=\"intl.rotateCwLabel\"\n        [matTooltip]=\"intl.rotateCwLabel\"\n        [@easeInWithDelay]=\"{\n          value: '',\n          params: { delayEnter: baseAnimationDelay * 5, delayLeave: 0 }\n        }\"\n      >\n        <mat-icon>rotate_right</mat-icon>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [":host{z-index:2}.osd-toolbar{position:absolute;background:transparent;width:auto;border-radius:8px;margin:8px 0 0 8px}\n"], dependencies: [{ kind: "directive", type: i6$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i8$2.MatMiniFabButton, selector: "button[mat-mini-fab]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i8$2.MatFabButton, selector: "button[mat-fab]", inputs: ["disabled", "disableRipple", "color", "tabIndex", "extended"], exportAs: ["matButton"] }, { kind: "component", type: i9.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i10.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }], animations: [rotate45, easeInWithDelay], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: OsdToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-osd-toolbar', changeDetection: ChangeDetectionStrategy.OnPush, animations: [rotate45, easeInWithDelay], template: "<div #container class=\"osd-toolbar\">\n  <div *ngIf=\"isWeb\" class=\"flex gap-2\">\n    <div class=\"flex flex-col gap-2\">\n      <button\n        mat-fab\n        aria-controls=\"osdControls\"\n        data-testid=\"fabButton\"\n        [attr.aria-expanded]=\"fabState === 'open'\"\n        [attr.aria-label]=\"\n          fabState === 'open'\n            ? intl.closeOsdControlPanelLabel\n            : intl.openOsdControlPanelLabel\n        \"\n        [matTooltip]=\"\n          fabState === 'open'\n            ? intl.closeOsdControlPanelLabel\n            : intl.openOsdControlPanelLabel\n        \"\n        (click)=\"toggleFab()\"\n      >\n        <mat-icon [@rotate45]=\"fabState\">{{ fabIcon }}</mat-icon>\n      </button>\n    </div>\n    <div id=\"osdControls\" class=\"flex items-center gap-2\">\n      <ng-container *ngIf=\"invert\">\n        <button\n          *ngIf=\"showControlButtons\"\n          data-testid=\"navigateBeforeButton\"\n          mat-mini-fab\n          [attr.aria-label]=\"intl.previousPageLabel\"\n          [matTooltip]=\"intl.previousPageLabel\"\n          [disabled]=\"isFirstCanvasGroup\"\n          [@easeInWithDelay]=\"{\n            value: '',\n            params: { delayEnter: 0, delayLeave: baseAnimationDelay * 5 }\n          }\"\n          (click)=\"goToPreviousCanvasGroup()\"\n        >\n          <mat-icon>navigate_before</mat-icon>\n        </button>\n      </ng-container>\n      <ng-container *ngIf=\"!invert\">\n        <button\n          *ngIf=\"showControlButtons\"\n          data-testid=\"navigateNextButton\"\n          mat-mini-fab\n          [attr.aria-label]=\"intl.nextPageLabel\"\n          [matTooltip]=\"intl.nextPageLabel\"\n          [disabled]=\"isLastCanvasGroup\"\n          [@easeInWithDelay]=\"{\n            value: '',\n            params: { delayEnter: 0, delayLeave: baseAnimationDelay * 5 }\n          }\"\n          (click)=\"goToNextCanvasGroup()\"\n        >\n          <mat-icon>navigate_before</mat-icon>\n        </button>\n      </ng-container>\n      <ng-container *ngIf=\"invert\">\n        <button\n          *ngIf=\"showControlButtons\"\n          data-testid=\"navigateNextButton\"\n          mat-mini-fab\n          [attr.aria-label]=\"intl.nextPageLabel\"\n          [matTooltip]=\"intl.nextPageLabel\"\n          [disabled]=\"isLastCanvasGroup\"\n          [@easeInWithDelay]=\"{\n            value: '',\n            params: {\n              delayEnter: baseAnimationDelay,\n              delayLeave: baseAnimationDelay * 4\n            }\n          }\"\n          (click)=\"goToNextCanvasGroup()\"\n        >\n          <mat-icon>navigate_next</mat-icon>\n        </button>\n      </ng-container>\n      <ng-container *ngIf=\"!invert\">\n        <button\n          *ngIf=\"showControlButtons\"\n          data-testid=\"navigateBeforeButton\"\n          mat-mini-fab\n          [attr.aria-label]=\"intl.previousPageLabel\"\n          [matTooltip]=\"intl.previousPageLabel\"\n          [disabled]=\"isFirstCanvasGroup\"\n          [@easeInWithDelay]=\"{\n            value: '',\n            params: {\n              delayEnter: baseAnimationDelay,\n              delayLeave: baseAnimationDelay * 4\n            }\n          }\"\n          (click)=\"goToPreviousCanvasGroup()\"\n        >\n          <mat-icon>navigate_next</mat-icon>\n        </button>\n      </ng-container>\n      <button\n        *ngIf=\"showControlButtons\"\n        (click)=\"zoomIn()\"\n        data-testid=\"zoomInButton\"\n        mat-mini-fab\n        [attr.aria-label]=\"intl.zoomInLabel\"\n        [matTooltip]=\"intl.zoomInLabel\"\n        [@easeInWithDelay]=\"{\n          value: '',\n          params: {\n            delayEnter: baseAnimationDelay * 2,\n            delayLeave: baseAnimationDelay * 3\n          }\n        }\"\n      >\n        <mat-icon>zoom_in</mat-icon>\n      </button>\n      <button\n        *ngIf=\"showControlButtons\"\n        (click)=\"home()\"\n        data-testid=\"homeButton\"\n        mat-mini-fab\n        [attr.aria-label]=\"intl.resetZoomLabel\"\n        [disabled]=\"!isZoomed\"\n        [matTooltip]=\"intl.resetZoomLabel\"\n        [@easeInWithDelay]=\"{\n          value: '',\n          params: {\n            delayEnter: baseAnimationDelay * 3,\n            delayLeave: baseAnimationDelay * 2\n          }\n        }\"\n      >\n        <mat-icon>home</mat-icon>\n      </button>\n      <button\n        *ngIf=\"showControlButtons\"\n        (click)=\"zoomOut()\"\n        data-testid=\"zoomOutButton\"\n        mat-mini-fab\n        [attr.aria-label]=\"intl.zoomOutLabel\"\n        [matTooltip]=\"intl.zoomOutLabel\"\n        [@easeInWithDelay]=\"{\n          value: '',\n          params: {\n            delayEnter: baseAnimationDelay * 4,\n            delayLeave: baseAnimationDelay\n          }\n        }\"\n      >\n        <mat-icon>zoom_out</mat-icon>\n      </button>\n      <button\n        *ngIf=\"showControlButtons\"\n        (click)=\"rotate()\"\n        data-testid=\"rotateButton\"\n        mat-mini-fab\n        [attr.aria-label]=\"intl.rotateCwLabel\"\n        [matTooltip]=\"intl.rotateCwLabel\"\n        [@easeInWithDelay]=\"{\n          value: '',\n          params: { delayEnter: baseAnimationDelay * 5, delayLeave: 0 }\n        }\"\n      >\n        <mat-icon>rotate_right</mat-icon>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [":host{z-index:2}.osd-toolbar{position:absolute;background:transparent;width:auto;border-radius:8px;margin:8px 0 0 8px}\n"] }]
        }], ctorParameters: function () { return [{ type: MimeViewerIntl }, { type: i1.BreakpointObserver }, { type: i0.ChangeDetectorRef }, { type: ViewerService }, { type: CanvasService }, { type: IiifManifestService }, { type: ModeService }]; }, propDecorators: { container: [{
                type: ViewChild,
                args: ['container', { static: true }]
            }] } });

class RecognizedTextContentComponent {
    constructor(intl, cdr, canvasService, altoService, iiifManifestService, iiifContentSearchService, highlightService) {
        this.intl = intl;
        this.cdr = cdr;
        this.canvasService = canvasService;
        this.altoService = altoService;
        this.iiifManifestService = iiifManifestService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.highlightService = highlightService;
        this.isLoading = false;
        this.error = undefined;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((sr) => {
            this.altoService.initialize(sr.hits);
        }));
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe(() => {
            this.clearRecognizedText();
            this.cdr.detectChanges();
        }));
        this.subscriptions.add(this.iiifContentSearchService.onSelected.subscribe((hit) => {
            if (hit) {
                this.selectedHit = hit.id;
                this.highlightService.highlightSelectedHit(this.selectedHit);
            }
        }));
        this.subscriptions.add(this.altoService.onTextContentReady$.subscribe(async () => {
            this.clearRecognizedText();
            this.scrollToTop();
            await this.updateRecognizedText();
            this.cdr.detectChanges();
        }));
        this.subscriptions.add(this.altoService.isLoading$.subscribe((isLoading) => {
            this.isLoading = isLoading;
            this.cdr.detectChanges();
        }));
        this.subscriptions.add(this.altoService.hasErrors$.subscribe((error) => {
            this.error = error;
            this.cdr.detectChanges();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.altoService.destroy();
    }
    clearRecognizedText() {
        this.firstCanvasRecognizedTextContent = '';
        this.secondCanvasRecognizedTextContent = '';
    }
    scrollToTop() {
        this.recognizedTextContentContainer.nativeElement.scrollTop = 0;
    }
    async updateRecognizedText() {
        const canvases = this.canvasService.getCanvasesPerCanvasGroup(this.canvasService.currentCanvasGroupIndex);
        await this.updateCanvases(canvases);
        if (this.selectedHit !== undefined) {
            this.highlightService.highlightSelectedHit(this.selectedHit);
        }
    }
    async updateCanvases(canvases) {
        this.firstCanvasRecognizedTextContent = this.altoService.getHtml(canvases[0]);
        if (canvases.length === 2) {
            this.secondCanvasRecognizedTextContent = this.altoService.getHtml(canvases[1]);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: RecognizedTextContentComponent, deps: [{ token: MimeViewerIntl }, { token: i0.ChangeDetectorRef }, { token: CanvasService }, { token: AltoService }, { token: IiifManifestService }, { token: IiifContentSearchService }, { token: HighlightService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: RecognizedTextContentComponent, selector: "mime-recognized-text-content", viewQueries: [{ propertyName: "recognizedTextContentContainer", first: true, predicate: ["recognizedTextContentContainer"], descendants: true, read: ElementRef }], ngImport: i0, template: "<div\n  #recognizedTextContentContainer\n  class=\"recognized-text-content-container flex flex-col items-center\"\n  aria-live=\"polite\"\n>\n  <div *ngIf=\"error\" data-testid=\"error\">{{ error }}</div>\n  <ng-container *ngIf=\"!isLoading\">\n    <div\n      *ngIf=\"firstCanvasRecognizedTextContent\"\n      class=\"content\"\n      data-testid=\"firstCanvasRecognizedTextContent\"\n      [innerHTML]=\"firstCanvasRecognizedTextContent\"\n    >\n    </div>\n    <div\n      *ngIf=\"secondCanvasRecognizedTextContent\"\n      class=\"content\"\n      data-testid=\"secondCanvasRecognizedTextContent\"\n      [innerHTML]=\"secondCanvasRecognizedTextContent\"\n    >\n    </div>\n  </ng-container>\n</div>\n", styles: [".recognized-text-content-container{height:100%;overflow:auto}.recognized-text-content-container>div{padding:1em}::ng-deep .selectedHit{background:rgba(255,137,0,.61);outline:2px solid rgb(97,52,0)}::ng-deep mark{background:rgba(255,255,0,.61)}\n"], dependencies: [{ kind: "directive", type: i6$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: RecognizedTextContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-recognized-text-content', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  #recognizedTextContentContainer\n  class=\"recognized-text-content-container flex flex-col items-center\"\n  aria-live=\"polite\"\n>\n  <div *ngIf=\"error\" data-testid=\"error\">{{ error }}</div>\n  <ng-container *ngIf=\"!isLoading\">\n    <div\n      *ngIf=\"firstCanvasRecognizedTextContent\"\n      class=\"content\"\n      data-testid=\"firstCanvasRecognizedTextContent\"\n      [innerHTML]=\"firstCanvasRecognizedTextContent\"\n    >\n    </div>\n    <div\n      *ngIf=\"secondCanvasRecognizedTextContent\"\n      class=\"content\"\n      data-testid=\"secondCanvasRecognizedTextContent\"\n      [innerHTML]=\"secondCanvasRecognizedTextContent\"\n    >\n    </div>\n  </ng-container>\n</div>\n", styles: [".recognized-text-content-container{height:100%;overflow:auto}.recognized-text-content-container>div{padding:1em}::ng-deep .selectedHit{background:rgba(255,137,0,.61);outline:2px solid rgb(97,52,0)}::ng-deep mark{background:rgba(255,255,0,.61)}\n"] }]
        }], ctorParameters: function () { return [{ type: MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: CanvasService }, { type: AltoService }, { type: IiifManifestService }, { type: IiifContentSearchService }, { type: HighlightService }]; }, propDecorators: { recognizedTextContentContainer: [{
                type: ViewChild,
                args: ['recognizedTextContentContainer', { read: ElementRef }]
            }] } });

class CanvasGroupDialogService {
    constructor(dialog) {
        this.dialog = dialog;
    }
    set viewContainerRef(viewContainerRef) {
        this._viewContainerRef = viewContainerRef;
    }
    initialize() { }
    destroy() {
        this.close();
    }
    open() {
        if (!this.isOpen()) {
            const config = this.getDialogConfig();
            this.dialogRef = this.dialog.open(CanvasGroupDialogComponent, config);
        }
    }
    close() {
        if (this.isOpen()) {
            this.dialogRef?.close();
        }
    }
    toggle() {
        this.isOpen() ? this.close() : this.open();
    }
    isOpen() {
        return this.dialogRef?.getState() === 0 /* MatDialogState.OPEN */;
    }
    getDialogConfig() {
        return {
            panelClass: 'canvas-group-panel',
            viewContainerRef: this._viewContainerRef,
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: CanvasGroupDialogService, deps: [{ token: i1$1.MatDialog }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: CanvasGroupDialogService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: CanvasGroupDialogService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.MatDialog }]; } });

class CanvasGroupNavigatorComponent {
    constructor(intl, changeDetectorRef, viewerService, canvasService, canvasGroupDialogService, iiifManifestService) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.viewerService = viewerService;
        this.canvasService = canvasService;
        this.canvasGroupDialogService = canvasGroupDialogService;
        this.iiifManifestService = iiifManifestService;
        this.numberOfCanvases = 0;
        this.canvasGroupLabel = '';
        this.numberOfCanvasGroups = 0;
        this.currentCanvasGroupIndex = -1;
        this.isFirstCanvasGroup = false;
        this.isLastCanvasGroup = false;
        this.ViewingDirection = ViewingDirection;
        this.currentViewingDirection = ViewingDirection.LTR;
        this.currentSliderCanvasGroupIndex = -1;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            if (manifest) {
                this.currentViewingDirection =
                    manifest.viewingDirection === ViewingDirection.LTR
                        ? ViewingDirection.LTR
                        : ViewingDirection.RTL;
                this.changeDetectorRef.detectChanges();
            }
        }));
        this.subscriptions.add(this.canvasService.onCanvasGroupIndexChange.subscribe((currentCanvasGroupIndex) => {
            if (this.currentSliderCanvasGroupIndex !== -1 &&
                this.currentSliderCanvasGroupIndex === currentCanvasGroupIndex) {
                this.currentSliderCanvasGroupIndex = -1;
            }
            else if (this.currentSliderCanvasGroupIndex === -1) {
                this.currentCanvasGroupIndex = currentCanvasGroupIndex;
                this.canvasGroupLabel = this.canvasService.getCanvasGroupLabel(this.currentCanvasGroupIndex);
            }
            this.isFirstCanvasGroup = this.isOnFirstCanvasGroup(currentCanvasGroupIndex);
            this.isLastCanvasGroup = this.isOnLastCanvasGroup(currentCanvasGroupIndex);
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.canvasService.onNumberOfCanvasGroupsChange.subscribe((numberOfCanvasGroups) => {
            this.numberOfCanvasGroups = numberOfCanvasGroups;
            this.numberOfCanvases = this.canvasService.numberOfCanvases;
            if (this.currentCanvasGroupIndex !== null) {
                this.isFirstCanvasGroup = this.isOnFirstCanvasGroup(this.currentCanvasGroupIndex);
                this.isLastCanvasGroup = this.isOnLastCanvasGroup(this.currentCanvasGroupIndex);
            }
            this.changeDetectorRef.detectChanges();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    goToPreviousCanvasGroup() {
        this.viewerService.goToPreviousCanvasGroup();
    }
    goToNextCanvasGroup() {
        this.viewerService.goToNextCanvasGroup();
    }
    onSliderChange(event) {
        const value = parseInt(event.target.value);
        this.currentSliderCanvasGroupIndex = value;
        this.currentCanvasGroupIndex = value;
        if (this.currentCanvasGroupIndex !== null) {
            this.canvasGroupLabel = this.canvasService.getCanvasGroupLabel(this.currentCanvasGroupIndex);
            this.viewerService.goToCanvasGroup(this.currentCanvasGroupIndex, false);
        }
        this.changeDetectorRef.detectChanges();
    }
    onSliderHotKey(event) {
        const accessKeys = new AccessKeys(event);
        if (accessKeys.isSliderKeys()) {
            event.stopPropagation();
        }
    }
    openCanvasGroupDialog() {
        this.canvasGroupDialogService.toggle();
    }
    isOnFirstCanvasGroup(currentCanvasGroupIndex) {
        return currentCanvasGroupIndex === 0;
    }
    isOnLastCanvasGroup(currentCanvasGroupIndex) {
        return currentCanvasGroupIndex === this.numberOfCanvasGroups - 1;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: CanvasGroupNavigatorComponent, deps: [{ token: MimeViewerIntl }, { token: i0.ChangeDetectorRef }, { token: ViewerService }, { token: CanvasService }, { token: CanvasGroupDialogService }, { token: IiifManifestService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: CanvasGroupNavigatorComponent, selector: "mime-page-navigator", inputs: { searchResult: "searchResult" }, ngImport: i0, template: "<mat-toolbar>\n  <div\n    class=\"w-full\"\n    data-testid=\"navigation-slider-container\"\n    [dir]=\"currentViewingDirection\"\n  >\n    <mat-slider\n      class=\"navigation-slider\"\n      [max]=\"numberOfCanvasGroups - 1\"\n      (keydown)=\"onSliderHotKey($event)\"\n    >\n      <input\n        matSliderThumb\n        [attr.aria-label]=\"intl.currentPageLabel\"\n        [(ngModel)]=\"currentCanvasGroupIndex\"\n        (input)=\"onSliderChange($event)\"\n    /></mat-slider>\n  </div>\n  <button\n    mat-button\n    data-testid=\"canvasGroupDialogButton\"\n    class=\"canvasGroups\"\n    (click)=\"openCanvasGroupDialog()\"\n  >\n    <span data-testid=\"currentCanvasGroupLabel\">{{ canvasGroupLabel }}</span\n    ><span>/</span\n    ><span data-testid=\"numOfCanvasGroups\">{{ numberOfCanvases }}</span>\n  </button>\n  <div class=\"navigation-buttons\">\n    <ng-container *ngIf=\"currentViewingDirection === ViewingDirection.LTR\">\n      <button\n        data-testid=\"footerNavigateBeforeButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.previousPageLabel\"\n        [matTooltip]=\"intl.previousPageLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isFirstCanvasGroup\"\n        (click)=\"goToPreviousCanvasGroup()\"\n      >\n        <mat-icon>navigate_before</mat-icon>\n      </button>\n      <button\n        data-testid=\"footerNavigateNextButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.nextPageLabel\"\n        [matTooltip]=\"intl.nextPageLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isLastCanvasGroup\"\n        (click)=\"goToNextCanvasGroup()\"\n      >\n        <mat-icon>navigate_next</mat-icon>\n      </button>\n    </ng-container>\n    <ng-container *ngIf=\"currentViewingDirection === ViewingDirection.RTL\">\n      <button\n        data-testid=\"footerNavigateNextButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.nextPageLabel\"\n        [matTooltip]=\"intl.nextPageLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isLastCanvasGroup\"\n        (click)=\"goToNextCanvasGroup()\"\n      >\n        <mat-icon>navigate_before</mat-icon>\n      </button>\n      <button\n        data-testid=\"footerNavigateBeforeButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.previousPageLabel\"\n        [matTooltip]=\"intl.previousPageLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isFirstCanvasGroup\"\n        (click)=\"goToPreviousCanvasGroup()\"\n      >\n        <mat-icon>navigate_next</mat-icon>\n      </button>\n    </ng-container>\n  </div>\n</mat-toolbar>\n", styles: [".canvasGroups{font-size:13px;text-align:center;cursor:pointer}.navigation-slider{width:100%;width:-webkit-fill-available}\n"], dependencies: [{ kind: "directive", type: i6$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i8$1.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { kind: "directive", type: i9$1.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { kind: "component", type: i8$2.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i8$2.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i9.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i10.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "component", type: i13.MatSlider, selector: "mat-slider", inputs: ["color", "disableRipple", "disabled", "discrete", "showTickMarks", "min", "max", "step", "displayWith"], exportAs: ["matSlider"] }, { kind: "directive", type: i13.MatSliderThumb, selector: "input[matSliderThumb]", inputs: ["value"], outputs: ["valueChange", "dragStart", "dragEnd"], exportAs: ["matSliderThumb"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: CanvasGroupNavigatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-page-navigator', template: "<mat-toolbar>\n  <div\n    class=\"w-full\"\n    data-testid=\"navigation-slider-container\"\n    [dir]=\"currentViewingDirection\"\n  >\n    <mat-slider\n      class=\"navigation-slider\"\n      [max]=\"numberOfCanvasGroups - 1\"\n      (keydown)=\"onSliderHotKey($event)\"\n    >\n      <input\n        matSliderThumb\n        [attr.aria-label]=\"intl.currentPageLabel\"\n        [(ngModel)]=\"currentCanvasGroupIndex\"\n        (input)=\"onSliderChange($event)\"\n    /></mat-slider>\n  </div>\n  <button\n    mat-button\n    data-testid=\"canvasGroupDialogButton\"\n    class=\"canvasGroups\"\n    (click)=\"openCanvasGroupDialog()\"\n  >\n    <span data-testid=\"currentCanvasGroupLabel\">{{ canvasGroupLabel }}</span\n    ><span>/</span\n    ><span data-testid=\"numOfCanvasGroups\">{{ numberOfCanvases }}</span>\n  </button>\n  <div class=\"navigation-buttons\">\n    <ng-container *ngIf=\"currentViewingDirection === ViewingDirection.LTR\">\n      <button\n        data-testid=\"footerNavigateBeforeButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.previousPageLabel\"\n        [matTooltip]=\"intl.previousPageLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isFirstCanvasGroup\"\n        (click)=\"goToPreviousCanvasGroup()\"\n      >\n        <mat-icon>navigate_before</mat-icon>\n      </button>\n      <button\n        data-testid=\"footerNavigateNextButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.nextPageLabel\"\n        [matTooltip]=\"intl.nextPageLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isLastCanvasGroup\"\n        (click)=\"goToNextCanvasGroup()\"\n      >\n        <mat-icon>navigate_next</mat-icon>\n      </button>\n    </ng-container>\n    <ng-container *ngIf=\"currentViewingDirection === ViewingDirection.RTL\">\n      <button\n        data-testid=\"footerNavigateNextButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.nextPageLabel\"\n        [matTooltip]=\"intl.nextPageLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isLastCanvasGroup\"\n        (click)=\"goToNextCanvasGroup()\"\n      >\n        <mat-icon>navigate_before</mat-icon>\n      </button>\n      <button\n        data-testid=\"footerNavigateBeforeButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.previousPageLabel\"\n        [matTooltip]=\"intl.previousPageLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isFirstCanvasGroup\"\n        (click)=\"goToPreviousCanvasGroup()\"\n      >\n        <mat-icon>navigate_next</mat-icon>\n      </button>\n    </ng-container>\n  </div>\n</mat-toolbar>\n", styles: [".canvasGroups{font-size:13px;text-align:center;cursor:pointer}.navigation-slider{width:100%;width:-webkit-fill-available}\n"] }]
        }], ctorParameters: function () { return [{ type: MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: ViewerService }, { type: CanvasService }, { type: CanvasGroupDialogService }, { type: IiifManifestService }]; }, propDecorators: { searchResult: [{
                type: Input
            }] } });

class ContentSearchNavigatorComponent {
    constructor(intl, changeDetectorRef, canvasService, iiifContentSearchService, contentSearchNavigationService, iiifManifestService) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.canvasService = canvasService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.contentSearchNavigationService = contentSearchNavigationService;
        this.iiifManifestService = iiifManifestService;
        this.isHitOnActiveCanvasGroup = false;
        this.isFirstHit = false;
        this.isLastHit = false;
        this.currentHit = 0;
        this.invert = false;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.contentSearchNavigationService.initialize();
        this.subscriptions.add(this.contentSearchNavigationService.currentHitCounter.subscribe((n) => {
            this.currentHit = n;
            this.updateHitStatus();
        }));
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            if (manifest) {
                this.invert = manifest.viewingDirection === ViewingDirection.LTR;
                this.changeDetectorRef.detectChanges();
            }
        }));
        this.subscriptions.add(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
        this.subscriptions.add(this.canvasService.onCanvasGroupIndexChange.subscribe((canvasGroupIndex) => {
            this.contentSearchNavigationService.update(canvasGroupIndex);
            this.isHitOnActiveCanvasGroup =
                this.contentSearchNavigationService.getHitOnActiveCanvasGroup();
            this.changeDetectorRef.detectChanges();
        }));
    }
    ngOnChanges(changes) {
        this.updateHitStatus();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.contentSearchNavigationService.destroy();
    }
    clear() {
        this.iiifContentSearchService.destroy();
    }
    goToNextHit() {
        this.contentSearchNavigationService.goToNextHit();
    }
    goToPreviousHit() {
        this.contentSearchNavigationService.goToPreviousHit();
    }
    updateHitStatus() {
        this.isFirstHit = this.currentHit <= 0;
        this.isLastHit = this.currentHit === this.searchResult.size() - 1;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ContentSearchNavigatorComponent, deps: [{ token: MimeViewerIntl }, { token: i0.ChangeDetectorRef }, { token: CanvasService }, { token: IiifContentSearchService }, { token: ContentSearchNavigationService }, { token: IiifManifestService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: ContentSearchNavigatorComponent, selector: "mime-content-search-navigator", inputs: { searchResult: "searchResult" }, usesOnChanges: true, ngImport: i0, template: "<mat-toolbar\n  *ngIf=\"searchResult\"\n  class=\"content-search-navigator-toolbar min-w-[275px]\"\n  color=\"primary\"\n>\n  <button\n    data-testid=\"footerNavigateCloseHitsButton\"\n    mat-icon-button\n    [attr.aria-label]=\"intl.closeLabel\"\n    [matTooltip]=\"intl.closeLabel\"\n    matTooltipPosition=\"above\"\n    (click)=\"clear()\"\n  >\n    <mat-icon>close</mat-icon>\n  </button>\n  <div\n    class=\"current-hit-label grow\"\n    [ngClass]=\"{ 'not-on-page': !isHitOnActiveCanvasGroup }\"\n    [innerHTML]=\"intl.currentHitLabel(currentHit + 1, searchResult.size())\"\n  ></div>\n  <div class=\"navigation-buttons\">\n    <ng-container *ngIf=\"invert\">\n      <button\n        data-testid=\"footerNavigatePreviousHitButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.previousHitLabel\"\n        [matTooltip]=\"intl.previousHitLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isFirstHit\"\n        (click)=\"goToPreviousHit()\"\n      >\n        <mat-icon>navigate_before</mat-icon>\n      </button>\n      <button\n        data-testid=\"footerNavigateNextHitButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.nextHitLabel\"\n        [matTooltip]=\"intl.nextHitLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isLastHit\"\n        (click)=\"goToNextHit()\"\n      >\n        <mat-icon>navigate_next</mat-icon>\n      </button>\n    </ng-container>\n    <ng-container *ngIf=\"!invert\">\n      <button\n        data-testid=\"footerNavigateNextHitButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.nextHitLabel\"\n        [matTooltip]=\"intl.nextHitLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isLastHit\"\n        (click)=\"goToNextHit()\"\n      >\n        <mat-icon>navigate_before</mat-icon>\n      </button>\n      <button\n        data-testid=\"footerNavigatePreviousHitButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.previousHitLabel\"\n        [matTooltip]=\"intl.previousHitLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isFirstHit\"\n        (click)=\"goToPreviousHit()\"\n      >\n        <mat-icon>navigate_next</mat-icon>\n      </button>\n    </ng-container>\n  </div>\n</mat-toolbar>\n", styles: [".current-hit-label{font-size:13px;text-align:center}.not-on-page{opacity:.6}\n"], dependencies: [{ kind: "directive", type: i6$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i6$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i8$1.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { kind: "component", type: i8$2.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i9.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i10.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ContentSearchNavigatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-content-search-navigator', changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-toolbar\n  *ngIf=\"searchResult\"\n  class=\"content-search-navigator-toolbar min-w-[275px]\"\n  color=\"primary\"\n>\n  <button\n    data-testid=\"footerNavigateCloseHitsButton\"\n    mat-icon-button\n    [attr.aria-label]=\"intl.closeLabel\"\n    [matTooltip]=\"intl.closeLabel\"\n    matTooltipPosition=\"above\"\n    (click)=\"clear()\"\n  >\n    <mat-icon>close</mat-icon>\n  </button>\n  <div\n    class=\"current-hit-label grow\"\n    [ngClass]=\"{ 'not-on-page': !isHitOnActiveCanvasGroup }\"\n    [innerHTML]=\"intl.currentHitLabel(currentHit + 1, searchResult.size())\"\n  ></div>\n  <div class=\"navigation-buttons\">\n    <ng-container *ngIf=\"invert\">\n      <button\n        data-testid=\"footerNavigatePreviousHitButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.previousHitLabel\"\n        [matTooltip]=\"intl.previousHitLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isFirstHit\"\n        (click)=\"goToPreviousHit()\"\n      >\n        <mat-icon>navigate_before</mat-icon>\n      </button>\n      <button\n        data-testid=\"footerNavigateNextHitButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.nextHitLabel\"\n        [matTooltip]=\"intl.nextHitLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isLastHit\"\n        (click)=\"goToNextHit()\"\n      >\n        <mat-icon>navigate_next</mat-icon>\n      </button>\n    </ng-container>\n    <ng-container *ngIf=\"!invert\">\n      <button\n        data-testid=\"footerNavigateNextHitButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.nextHitLabel\"\n        [matTooltip]=\"intl.nextHitLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isLastHit\"\n        (click)=\"goToNextHit()\"\n      >\n        <mat-icon>navigate_before</mat-icon>\n      </button>\n      <button\n        data-testid=\"footerNavigatePreviousHitButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.previousHitLabel\"\n        [matTooltip]=\"intl.previousHitLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isFirstHit\"\n        (click)=\"goToPreviousHit()\"\n      >\n        <mat-icon>navigate_next</mat-icon>\n      </button>\n    </ng-container>\n  </div>\n</mat-toolbar>\n", styles: [".current-hit-label{font-size:13px;text-align:center}.not-on-page{opacity:.6}\n"] }]
        }], ctorParameters: function () { return [{ type: MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: CanvasService }, { type: IiifContentSearchService }, { type: ContentSearchNavigationService }, { type: IiifManifestService }]; }, propDecorators: { searchResult: [{
                type: Input
            }] } });

class ViewerFooterComponent {
    constructor(breakpointObserver, changeDetectorRef, iiifContentSearchService) {
        this.breakpointObserver = breakpointObserver;
        this.changeDetectorRef = changeDetectorRef;
        this.iiifContentSearchService = iiifContentSearchService;
        this.state = 'hide';
        this.showNavigationToolbar = true;
        this.searchResult = new SearchResult();
        this.showPageNavigator = true;
        this.showContentSearchNavigator = false;
        this.subscriptions = new Subscription();
    }
    get footerState() {
        return this.state;
    }
    ngOnInit() {
        this.setupContentSearchObserver();
        this.setupBreakpointObserver();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    setupContentSearchObserver() {
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((sr) => {
            this.searchResult = sr;
            this.showContentSearchNavigator = this.searchResult.size() > 0;
            this.updateShowPageNavigator();
            this.changeDetectorRef.detectChanges();
        }));
    }
    setupBreakpointObserver() {
        this.subscriptions.add(this.breakpointObserver
            .observe([Breakpoints.XSmall])
            .subscribe((value) => {
            this.showPageNavigator = value.matches
                ? this.searchResult.size() === 0
                : true;
            this.changeDetectorRef.detectChanges();
        }));
    }
    updateShowPageNavigator() {
        this.showPageNavigator =
            this.searchResult.size() === 0 || !this.isHandsetPortrait();
    }
    isHandsetPortrait() {
        return this.breakpointObserver.isMatched(Breakpoints.HandsetPortrait);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerFooterComponent, deps: [{ token: i1.BreakpointObserver }, { token: i0.ChangeDetectorRef }, { token: IiifContentSearchService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: ViewerFooterComponent, selector: "mime-viewer-footer", host: { properties: { "@footerState": "this.footerState" } }, viewQueries: [{ propertyName: "mimeFooterBefore", first: true, predicate: ["mimeFooterBefore"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "mimeFooterAfter", first: true, predicate: ["mimeFooterAfter"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: "<mat-toolbar class=\"footer-toolbar\">\n  <ng-template #mimeFooterBefore></ng-template>\n  <mime-content-search-navigator\n    *ngIf=\"showContentSearchNavigator\"\n    [ngClass]=\"{ 'w-full': !showPageNavigator }\"\n    [searchResult]=\"searchResult\"\n  ></mime-content-search-navigator>\n  <mime-page-navigator\n    class=\"w-full\"\n    [hidden]=\"!showPageNavigator\"\n    [searchResult]=\"searchResult\"\n  ></mime-page-navigator>\n  <ng-template #mimeFooterAfter></ng-template>\n</mat-toolbar>\n", styles: [":host{display:block;width:100%;-webkit-user-select:none;user-select:none}.footer-toolbar{padding:0}[hidden]{display:none}\n"], dependencies: [{ kind: "directive", type: i6$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i6$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i8$1.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { kind: "component", type: CanvasGroupNavigatorComponent, selector: "mime-page-navigator", inputs: ["searchResult"] }, { kind: "component", type: ContentSearchNavigatorComponent, selector: "mime-content-search-navigator", inputs: ["searchResult"] }], animations: [
            trigger('footerState', [
                state('hide', style({
                    transform: 'translate(0, 100%)',
                })),
                state('show', style({
                    transform: 'translate(0, 0)',
                })),
                transition('hide => show', animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in')),
                transition('show => hide', animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out')),
            ]),
        ] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerFooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-viewer-footer', animations: [
                        trigger('footerState', [
                            state('hide', style({
                                transform: 'translate(0, 100%)',
                            })),
                            state('show', style({
                                transform: 'translate(0, 0)',
                            })),
                            transition('hide => show', animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in')),
                            transition('show => hide', animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out')),
                        ]),
                    ], template: "<mat-toolbar class=\"footer-toolbar\">\n  <ng-template #mimeFooterBefore></ng-template>\n  <mime-content-search-navigator\n    *ngIf=\"showContentSearchNavigator\"\n    [ngClass]=\"{ 'w-full': !showPageNavigator }\"\n    [searchResult]=\"searchResult\"\n  ></mime-content-search-navigator>\n  <mime-page-navigator\n    class=\"w-full\"\n    [hidden]=\"!showPageNavigator\"\n    [searchResult]=\"searchResult\"\n  ></mime-page-navigator>\n  <ng-template #mimeFooterAfter></ng-template>\n</mat-toolbar>\n", styles: [":host{display:block;width:100%;-webkit-user-select:none;user-select:none}.footer-toolbar{padding:0}[hidden]{display:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.BreakpointObserver }, { type: i0.ChangeDetectorRef }, { type: IiifContentSearchService }]; }, propDecorators: { mimeFooterBefore: [{
                type: ViewChild,
                args: ['mimeFooterBefore', { read: ViewContainerRef, static: true }]
            }], mimeFooterAfter: [{
                type: ViewChild,
                args: ['mimeFooterAfter', { read: ViewContainerRef, static: true }]
            }], footerState: [{
                type: HostBinding,
                args: ['@footerState']
            }] } });

class MobileHelpDialogConfigStrategy {
    getConfig(elementRef, viewContainerRef) {
        return {
            hasBackdrop: false,
            width: '100%',
            height: '100%',
            maxWidth: '100% !important',
            panelClass: 'help-panel',
            viewContainerRef: viewContainerRef,
        };
    }
}
class DesktopHelpDialogConfigStrategy {
    static { this.dialogWidth = 350; }
    static { this.paddingRight = 20; }
    constructor(mimeDomHelper) {
        this.mimeDomHelper = mimeDomHelper;
    }
    getConfig(el, viewContainerRef) {
        const dimensions = this.getPosition(el);
        return {
            hasBackdrop: false,
            width: `${DesktopHelpDialogConfigStrategy.dialogWidth}px`,
            position: {
                top: dimensions.top + 'px',
                left: dimensions.left + 'px',
            },
            panelClass: 'help-panel',
            maxWidth: '100% !important',
            viewContainerRef: viewContainerRef,
        };
    }
    getPosition(el) {
        const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
        return new Dimensions({
            top: dimensions.top + 64,
            left: dimensions.right -
                DesktopHelpDialogConfigStrategy.dialogWidth -
                DesktopHelpDialogConfigStrategy.paddingRight,
        });
    }
}

class HelpDialogConfigStrategyFactory {
    constructor(breakpointObserver, mimeDomHelper) {
        this.breakpointObserver = breakpointObserver;
        this.mimeDomHelper = mimeDomHelper;
    }
    create() {
        const isHandsetOrTabletInPortrait = this.breakpointObserver.isMatched([
            Breakpoints.Handset,
            Breakpoints.TabletPortrait,
        ]);
        return isHandsetOrTabletInPortrait
            ? new MobileHelpDialogConfigStrategy()
            : new DesktopHelpDialogConfigStrategy(this.mimeDomHelper);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: HelpDialogConfigStrategyFactory, deps: [{ token: i1.BreakpointObserver }, { token: MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: HelpDialogConfigStrategyFactory }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: HelpDialogConfigStrategyFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.BreakpointObserver }, { type: MimeDomHelper }]; } });

class HelpDialogService {
    constructor(dialog, helpDialogConfigStrategyFactory, mimeResizeService) {
        this.dialog = dialog;
        this.helpDialogConfigStrategyFactory = helpDialogConfigStrategyFactory;
        this.mimeResizeService = mimeResizeService;
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe(() => {
            if (this.isOpen()) {
                const config = this.getDialogConfig();
                this.dialogRef?.updatePosition(config.position);
                this.dialogRef?.updateSize(config.width, config.height);
            }
        }));
    }
    destroy() {
        this.close();
        this.unsubscribe();
    }
    set el(el) {
        this._el = el;
    }
    set viewContainerRef(viewContainerRef) {
        this._viewContainerRef = viewContainerRef;
    }
    open() {
        if (!this.isOpen()) {
            const config = this.getDialogConfig();
            this.dialogRef = this.dialog.open(HelpDialogComponent, config);
        }
    }
    close() {
        if (this.isOpen()) {
            this.dialogRef?.close();
        }
    }
    toggle() {
        this.isOpen() ? this.close() : this.open();
    }
    isOpen() {
        return this.dialogRef?.getState() === 0 /* MatDialogState.OPEN */;
    }
    getDialogConfig() {
        if (!this._el || !this._viewContainerRef) {
            throw new Error('No element or viewContainerRef');
        }
        return this._el
            ? this.helpDialogConfigStrategyFactory
                .create()
                .getConfig(this._el, this._viewContainerRef)
            : {};
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: HelpDialogService, deps: [{ token: i1$1.MatDialog }, { token: HelpDialogConfigStrategyFactory }, { token: MimeResizeService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: HelpDialogService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: HelpDialogService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.MatDialog }, { type: HelpDialogConfigStrategyFactory }, { type: MimeResizeService }]; } });

class ViewerHeaderComponent {
    constructor(intl, changeDetectorRef, informationDialogService, contentSearchDialogService, viewDialogService, helpDialogService, iiifManifestService, fullscreenService, mimeDomHelper) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.informationDialogService = informationDialogService;
        this.contentSearchDialogService = contentSearchDialogService;
        this.viewDialogService = viewDialogService;
        this.helpDialogService = helpDialogService;
        this.iiifManifestService = iiifManifestService;
        this.fullscreenService = fullscreenService;
        this.mimeDomHelper = mimeDomHelper;
        this.manifest = null;
        this.state = 'hide';
        this.isContentSearchEnabled = false;
        this.isFullscreenEnabled = false;
        this.isInFullscreen = false;
        this.fullscreenLabel = '';
        this.isPagedManifest = false;
        this.hasRecognizedTextContent = false;
        this.subscriptions = new Subscription();
    }
    get headerState() {
        return this.state;
    }
    ngOnInit() {
        this.isFullscreenEnabled = this.fullscreenService.isEnabled();
        this.subscriptions.add(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
        this.subscriptions.add(this.fullscreenService.onChange.subscribe(() => this.onFullscreenChange()));
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
            this.isContentSearchEnabled =
                manifest && manifest.service ? true : false;
            this.isPagedManifest = manifest
                ? ManifestUtils.isManifestPaged(manifest)
                : false;
            this.hasRecognizedTextContent = manifest
                ? ManifestUtils.hasRecognizedTextContent(manifest)
                : false;
            this.changeDetectorRef.detectChanges();
        }));
        this.onFullscreenChange();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    toggleView() {
        this.informationDialogService.close();
        this.contentSearchDialogService.close();
        this.helpDialogService.close();
        this.viewDialogService.toggle();
    }
    toggleInformationDialog() {
        this.viewDialogService.close();
        this.contentSearchDialogService.close();
        this.helpDialogService.close();
        this.informationDialogService.toggle();
    }
    toggleSearch() {
        this.viewDialogService.close();
        this.informationDialogService.close();
        this.helpDialogService.close();
        this.contentSearchDialogService.toggle();
    }
    toggleHelp() {
        this.viewDialogService.close();
        this.informationDialogService.close();
        this.contentSearchDialogService.close();
        this.helpDialogService.toggle();
    }
    toggleFullscreen() {
        return this.mimeDomHelper.toggleFullscreen();
    }
    isInFullScreen() {
        return this.fullscreenService.isFullscreen();
    }
    onFullscreenChange() {
        this.isInFullscreen = this.fullscreenService.isFullscreen();
        this.fullscreenLabel = this.isInFullscreen
            ? this.intl.exitFullScreenLabel
            : this.intl.fullScreenLabel;
        this.changeDetectorRef.detectChanges();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerHeaderComponent, deps: [{ token: MimeViewerIntl }, { token: i0.ChangeDetectorRef }, { token: InformationDialogService }, { token: ContentSearchDialogService }, { token: ViewDialogService }, { token: HelpDialogService }, { token: IiifManifestService }, { token: FullscreenService }, { token: MimeDomHelper }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: ViewerHeaderComponent, selector: "mime-viewer-header", host: { properties: { "@headerState": "this.headerState" } }, viewQueries: [{ propertyName: "mimeHeaderBefore", first: true, predicate: ["mimeHeaderBefore"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "mimeHeaderAfter", first: true, predicate: ["mimeHeaderAfter"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "viewMenu", first: true, predicate: ["viewMenu"], descendants: true, read: ElementRef, static: true }], ngImport: i0, template: "<mat-toolbar>\n  <ng-template #mimeHeaderBefore></ng-template>\n  <div\n    *ngIf=\"manifest\"\n    data-testid=\"ngx-mime-manifest-label\"\n    class=\"label w-full\"\n    [matTooltip]=\"manifest.label\"\n    >{{ manifest.label }}</div\n  >\n  <button\n    *ngIf=\"isPagedManifest || hasRecognizedTextContent\"\n    data-testid=\"ngx-mime-view-menu-button\"\n    #viewMenu\n    mat-icon-button\n    [attr.aria-label]=\"intl.layoutMenuLabel\"\n    [matTooltip]=\"intl.layoutMenuLabel\"\n    (click)=\"toggleView()\"\n    ><mat-icon aria-hidden=\"true\">view_module</mat-icon></button\n  >\n  <button\n    data-testid=\"ngx-mimeInformationDialogButton\"\n    mat-icon-button\n    [attr.aria-label]=\"intl.informationLabel\"\n    [matTooltip]=\"intl.informationLabel\"\n    (click)=\"toggleInformationDialog()\"\n  >\n    <mat-icon aria-hidden=\"true\">list</mat-icon>\n  </button>\n  <button\n    data-testid=\"ngx-mimeContentSearchDialogButton\"\n    *ngIf=\"isContentSearchEnabled\"\n    mat-icon-button\n    [attr.aria-label]=\"intl.searchLabel\"\n    [matTooltip]=\"intl.searchLabel\"\n    (click)=\"toggleSearch()\"\n  >\n    <mat-icon aria-hidden=\"true\">search</mat-icon>\n  </button>\n  <button\n    data-testid=\"ngx-mimeHelpDialogButton\"\n    mat-icon-button\n    [attr.aria-label]=\"intl.help.helpLabel\"\n    [matTooltip]=\"intl.help.helpLabel\"\n    (click)=\"toggleHelp()\"\n  >\n    <mat-icon aria-hidden=\"true\">help</mat-icon>\n  </button>\n\n  <button\n    data-testid=\"ngx-mimeFullscreenButton\"\n    *ngIf=\"isFullscreenEnabled\"\n    mat-icon-button\n    [attr.aria-label]=\"fullscreenLabel\"\n    [matTooltip]=\"fullscreenLabel\"\n    (click)=\"toggleFullscreen()\"\n  >\n    <mat-icon *ngIf=\"isInFullScreen\" aria-hidden=\"true\"\n      >fullscreen_exit</mat-icon\n    >\n    <mat-icon *ngIf=\"!isInFullScreen\" aria-hidden=\"true\">fullscreen</mat-icon>\n  </button>\n  <ng-template #mimeHeaderAfter></ng-template>\n</mat-toolbar>\n", styles: [":host{max-height:64px}.label{font-size:17px;overflow:hidden;text-overflow:ellipsis}\n"], dependencies: [{ kind: "directive", type: i6$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i8$1.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { kind: "component", type: i8$2.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i9.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i10.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }], animations: [
            trigger('headerState', [
                state('hide', style({
                    transform: 'translate(0, -100%)',
                })),
                state('show', style({
                    transform: 'translate(0px, 0px)',
                })),
                transition('hide => show', animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in')),
                transition('show => hide', animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out')),
            ]),
        ], changeDetection: i0.ChangeDetectionStrategy.Default }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-viewer-header', changeDetection: ChangeDetectionStrategy.Default, animations: [
                        trigger('headerState', [
                            state('hide', style({
                                transform: 'translate(0, -100%)',
                            })),
                            state('show', style({
                                transform: 'translate(0px, 0px)',
                            })),
                            transition('hide => show', animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in')),
                            transition('show => hide', animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out')),
                        ]),
                    ], template: "<mat-toolbar>\n  <ng-template #mimeHeaderBefore></ng-template>\n  <div\n    *ngIf=\"manifest\"\n    data-testid=\"ngx-mime-manifest-label\"\n    class=\"label w-full\"\n    [matTooltip]=\"manifest.label\"\n    >{{ manifest.label }}</div\n  >\n  <button\n    *ngIf=\"isPagedManifest || hasRecognizedTextContent\"\n    data-testid=\"ngx-mime-view-menu-button\"\n    #viewMenu\n    mat-icon-button\n    [attr.aria-label]=\"intl.layoutMenuLabel\"\n    [matTooltip]=\"intl.layoutMenuLabel\"\n    (click)=\"toggleView()\"\n    ><mat-icon aria-hidden=\"true\">view_module</mat-icon></button\n  >\n  <button\n    data-testid=\"ngx-mimeInformationDialogButton\"\n    mat-icon-button\n    [attr.aria-label]=\"intl.informationLabel\"\n    [matTooltip]=\"intl.informationLabel\"\n    (click)=\"toggleInformationDialog()\"\n  >\n    <mat-icon aria-hidden=\"true\">list</mat-icon>\n  </button>\n  <button\n    data-testid=\"ngx-mimeContentSearchDialogButton\"\n    *ngIf=\"isContentSearchEnabled\"\n    mat-icon-button\n    [attr.aria-label]=\"intl.searchLabel\"\n    [matTooltip]=\"intl.searchLabel\"\n    (click)=\"toggleSearch()\"\n  >\n    <mat-icon aria-hidden=\"true\">search</mat-icon>\n  </button>\n  <button\n    data-testid=\"ngx-mimeHelpDialogButton\"\n    mat-icon-button\n    [attr.aria-label]=\"intl.help.helpLabel\"\n    [matTooltip]=\"intl.help.helpLabel\"\n    (click)=\"toggleHelp()\"\n  >\n    <mat-icon aria-hidden=\"true\">help</mat-icon>\n  </button>\n\n  <button\n    data-testid=\"ngx-mimeFullscreenButton\"\n    *ngIf=\"isFullscreenEnabled\"\n    mat-icon-button\n    [attr.aria-label]=\"fullscreenLabel\"\n    [matTooltip]=\"fullscreenLabel\"\n    (click)=\"toggleFullscreen()\"\n  >\n    <mat-icon *ngIf=\"isInFullScreen\" aria-hidden=\"true\"\n      >fullscreen_exit</mat-icon\n    >\n    <mat-icon *ngIf=\"!isInFullScreen\" aria-hidden=\"true\">fullscreen</mat-icon>\n  </button>\n  <ng-template #mimeHeaderAfter></ng-template>\n</mat-toolbar>\n", styles: [":host{max-height:64px}.label{font-size:17px;overflow:hidden;text-overflow:ellipsis}\n"] }]
        }], ctorParameters: function () { return [{ type: MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: InformationDialogService }, { type: ContentSearchDialogService }, { type: ViewDialogService }, { type: HelpDialogService }, { type: IiifManifestService }, { type: FullscreenService }, { type: MimeDomHelper }]; }, propDecorators: { mimeHeaderBefore: [{
                type: ViewChild,
                args: ['mimeHeaderBefore', { read: ViewContainerRef, static: true }]
            }], mimeHeaderAfter: [{
                type: ViewChild,
                args: ['mimeHeaderAfter', { read: ViewContainerRef, static: true }]
            }], viewMenu: [{
                type: ViewChild,
                args: ['viewMenu', { read: ElementRef, static: true }]
            }], headerState: [{
                type: HostBinding,
                args: ['@headerState']
            }] } });

class ViewerSpinnerComponent {
    constructor(spinnerService, changeDetectorRef) {
        this.spinnerService = spinnerService;
        this.changeDetectorRef = changeDetectorRef;
        this.visible = false;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.spinnerService.spinnerState.subscribe((state) => {
            this.visible = state.show;
            this.changeDetectorRef.detectChanges();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerSpinnerComponent, deps: [{ token: SpinnerService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: ViewerSpinnerComponent, selector: "mime-spinner", ngImport: i0, template: "<div class=\"mime-spinner\" [class.mime-spinner--active]=\"visible\">\n  <mat-spinner></mat-spinner>\n</div>\n", styles: [".mime-spinner{display:none;position:absolute;left:50%;top:45%;transform:translate(-50%);z-index:9999}.mime-spinner--active{display:block}\n"], dependencies: [{ kind: "component", type: i2$2.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "mode", "value", "diameter", "strokeWidth"], exportAs: ["matProgressSpinner"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerSpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-spinner', template: "<div class=\"mime-spinner\" [class.mime-spinner--active]=\"visible\">\n  <mat-spinner></mat-spinner>\n</div>\n", styles: [".mime-spinner{display:none;position:absolute;left:50%;top:45%;transform:translate(-50%);z-index:9999}.mime-spinner--active{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: SpinnerService }, { type: i0.ChangeDetectorRef }]; } });

class AttributionDialogService {
    constructor(dialog, mimeResizeService, attributionDialogResizeService, mimeDomHelper) {
        this.dialog = dialog;
        this.mimeResizeService = mimeResizeService;
        this.attributionDialogResizeService = attributionDialogResizeService;
        this.mimeDomHelper = mimeDomHelper;
        this._el = null;
        this.attributionDialogHeight = 0;
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe(() => {
            if (this.isOpen()) {
                const config = this.getDialogConfig();
                this.dialogRef?.updatePosition(config.position);
            }
        }));
        this.subscriptions.add(this.attributionDialogResizeService.onResize.subscribe((dimensions) => {
            if (this.isOpen()) {
                this.attributionDialogHeight = dimensions.height;
                const config = this.getDialogConfig();
                this.dialogRef?.updatePosition(config.position);
            }
        }));
    }
    destroy() {
        this.close();
        this.unsubscribe();
    }
    set el(el) {
        this._el = el;
    }
    set viewContainerRef(viewContainerRef) {
        this._viewContainerRef = viewContainerRef;
    }
    open(timeout) {
        if (!this.isOpen()) {
            const config = this.getDialogConfig();
            this.dialogRef = this.dialog.open(AttributionDialogComponent, config);
            this.dialogRef
                .afterClosed()
                .pipe(take(1))
                .subscribe(() => {
                this.mimeDomHelper.setFocusOnViewer();
            });
            this.closeDialogAfter(timeout);
        }
    }
    close() {
        if (this.isOpen()) {
            this.dialogRef?.close();
        }
    }
    toggle() {
        this.isOpen() ? this.close() : this.open();
    }
    isOpen() {
        return this.dialogRef?.getState() === 0 /* MatDialogState.OPEN */;
    }
    closeDialogAfter(seconds) {
        if (seconds && seconds > 0) {
            interval(seconds * 1000)
                .pipe(take(1))
                .subscribe(() => {
                this.close();
            });
        }
    }
    getDialogConfig() {
        if (!this._viewContainerRef) {
            throw new Error('No viewContainerRef');
        }
        const dimensions = this.getPosition();
        return {
            hasBackdrop: false,
            width: '180px',
            panelClass: 'attribution-panel',
            position: {
                top: dimensions.top + 'px',
                left: dimensions.left + 'px',
            },
            autoFocus: true,
            restoreFocus: false,
            viewContainerRef: this._viewContainerRef,
        };
    }
    getPosition() {
        if (!this._el) {
            throw new Error(`Could not find position because element is missing`);
        }
        const padding = 20;
        const dimensions = this.mimeDomHelper.getBoundingClientRect(this._el);
        return new Dimensions({
            top: dimensions.top + dimensions.height - this.attributionDialogHeight - 68,
            left: dimensions.left + padding,
        });
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: AttributionDialogService, deps: [{ token: i1$1.MatDialog }, { token: MimeResizeService }, { token: AttributionDialogResizeService }, { token: MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: AttributionDialogService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: AttributionDialogService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.MatDialog }, { type: MimeResizeService }, { type: AttributionDialogResizeService }, { type: MimeDomHelper }]; } });

class ContentDialogState {
    constructor(fields) {
        this.isOpen = false;
        this.selectedIndex = 0;
        if (fields) {
            this.isOpen = fields.isOpen !== undefined ? fields.isOpen : this.isOpen;
            this.selectedIndex =
                fields.selectedIndex !== undefined
                    ? fields.selectedIndex
                    : this.selectedIndex;
        }
    }
}

class ContentsSearchDialogState {
    constructor(fields) {
        this.isOpen = false;
        if (fields) {
            this.isOpen = fields.isOpen !== undefined ? fields.isOpen : this.isOpen;
        }
    }
}

class HelpDialogState {
    constructor(fields) {
        this.isOpen = false;
        if (fields) {
            this.isOpen = fields.isOpen !== undefined ? fields.isOpen : this.isOpen;
        }
    }
}

class ViewDialogState {
    constructor(fields) {
        this.isOpen = false;
        if (fields) {
            this.isOpen = fields.isOpen !== undefined ? fields.isOpen : this.isOpen;
        }
    }
}

class ViewerState {
    constructor(fields) {
        this.viewDialogState = new ViewDialogState();
        this.contentDialogState = new ContentDialogState();
        this.contentsSearchDialogState = new ContentsSearchDialogState();
        this.helpDialogState = new HelpDialogState();
        if (fields) {
            this.viewDialogState = fields.viewDialogState
                ? fields.viewDialogState
                : this.viewDialogState;
            this.contentDialogState = fields.contentDialogState
                ? fields.contentDialogState
                : this.contentDialogState;
            this.contentsSearchDialogState = fields.contentsSearchDialogState
                ? fields.contentsSearchDialogState
                : this.contentsSearchDialogState;
            this.helpDialogState = fields.helpDialogState
                ? fields.helpDialogState
                : this.helpDialogState;
        }
    }
}

const VIEWER_PROVIDERS = [
    AccessKeysService,
    AltoService,
    AttributionDialogResizeService,
    AttributionDialogService,
    CanvasGroupDialogService,
    CanvasService,
    ClickService,
    ContentSearchDialogConfigStrategyFactory,
    ContentSearchDialogService,
    ContentSearchNavigationService,
    FullscreenService,
    HelpDialogConfigStrategyFactory,
    HelpDialogService,
    HighlightService,
    IiifContentSearchService,
    IiifManifestService,
    InformationDialogConfigStrategyFactory,
    InformationDialogService,
    MimeDomHelper,
    MimeResizeService,
    ModeService,
    SpinnerService,
    StyleService,
    ViewDialogConfigStrategyFactory,
    ViewDialogService,
    ViewerLayoutService,
    ViewerService,
];

class ViewerComponent {
    constructor(snackBar, intl, iiifManifestService, viewDialogService, informationDialogService, attributionDialogService, contentSearchDialogService, helpDialogService, viewerService, resizeService, changeDetectorRef, modeService, iiifContentSearchService, accessKeysHandlerService, canvasService, viewerLayoutService, styleService, altoService, zone, platform, canvasGroupDialogService, el, viewContainerRef) {
        this.snackBar = snackBar;
        this.intl = intl;
        this.iiifManifestService = iiifManifestService;
        this.viewDialogService = viewDialogService;
        this.informationDialogService = informationDialogService;
        this.attributionDialogService = attributionDialogService;
        this.contentSearchDialogService = contentSearchDialogService;
        this.helpDialogService = helpDialogService;
        this.viewerService = viewerService;
        this.resizeService = resizeService;
        this.changeDetectorRef = changeDetectorRef;
        this.modeService = modeService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.accessKeysHandlerService = accessKeysHandlerService;
        this.canvasService = canvasService;
        this.viewerLayoutService = viewerLayoutService;
        this.styleService = styleService;
        this.altoService = altoService;
        this.zone = zone;
        this.platform = platform;
        this.manifestUri = null;
        this.canvasIndex = 0;
        this.config = new MimeViewerConfig();
        this.tabIndex = 0;
        this.viewerModeChanged = new EventEmitter();
        this.canvasChanged = new EventEmitter();
        this.qChanged = new EventEmitter();
        this.manifestChanged = new EventEmitter();
        this.recognizedTextContentModeChanged = new EventEmitter();
        this.recognizedTextMode = RecognizedTextMode;
        this.id = 'ngx-mime-mimeViewer';
        this.openseadragonId = 'openseadragon';
        this.subscriptions = new Subscription();
        this.isCanvasPressed = false;
        this.viewerLayout = null;
        this.viewerState = new ViewerState();
        this.recognizedTextContentMode = RecognizedTextMode.NONE;
        this.showHeaderAndFooterState = 'hide';
        this.osdToolbarState = 'hide';
        this.errorMessage = null;
        this.id = this.viewerService.id;
        this.openseadragonId = this.viewerService.openseadragonId;
        informationDialogService.el = el;
        informationDialogService.viewContainerRef = viewContainerRef;
        attributionDialogService.el = el;
        attributionDialogService.viewContainerRef = viewContainerRef;
        viewDialogService.el = el;
        viewDialogService.viewContainerRef = viewContainerRef;
        contentSearchDialogService.el = el;
        contentSearchDialogService.viewContainerRef = viewContainerRef;
        helpDialogService.el = el;
        helpDialogService.viewContainerRef = viewContainerRef;
        canvasGroupDialogService.viewContainerRef = viewContainerRef;
        resizeService.el = el;
    }
    get mimeHeaderBeforeRef() {
        return this.header.mimeHeaderBefore;
    }
    get mimeHeaderAfterRef() {
        return this.header.mimeHeaderAfter;
    }
    get mimeFooterBeforeRef() {
        return this.footer.mimeFooterBefore;
    }
    get mimeFooterAfterRef() {
        return this.footer.mimeFooterAfter;
    }
    ngOnInit() {
        this.styleService.initialize();
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            if (manifest) {
                this.initialize();
                this.currentManifest = manifest;
                this.manifestChanged.next(manifest);
                this.viewerLayoutService.init(ManifestUtils.isManifestPaged(manifest));
                this.recognizedTextContentMode =
                    this.altoService.recognizedTextContentMode;
                this.changeDetectorRef.detectChanges();
                this.viewerService.setUpViewer(manifest, this.config);
                if (this.config.attributionDialogEnabled && manifest.attribution) {
                    this.attributionDialogService.open(this.config.attributionDialogHideTimeout);
                }
                if (this.q) {
                    this.iiifContentSearchService.search(manifest, this.q);
                }
            }
        }));
        this.subscriptions.add(this.viewerService.onOsdReadyChange.subscribe((state) => {
            // Don't reset current page when switching layout
            if (state &&
                this.canvasIndex &&
                !this.canvasService.currentCanvasGroupIndex) {
                this.viewerService.goToCanvas(this.canvasIndex, false);
            }
        }));
        this.subscriptions.add(this.iiifManifestService.errorMessage.subscribe((error) => {
            this.resetCurrentManifest();
            this.errorMessage = error;
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.iiifContentSearchService.onQChange.subscribe((q) => {
            this.qChanged.emit(q);
        }));
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((sr) => {
            this.viewerService.highlight(sr);
        }));
        this.subscriptions.add(this.viewerService.isCanvasPressed.subscribe((value) => {
            this.isCanvasPressed = value;
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.modeService.onChange.subscribe((mode) => {
            if (mode.currentValue !== undefined) {
                this.toggleToolbarsState(mode.currentValue);
            }
            if (mode.previousValue === ViewerMode.DASHBOARD &&
                mode.currentValue === ViewerMode.PAGE) {
                this.viewerState.viewDialogState.isOpen =
                    this.viewDialogService.isOpen();
                this.viewerState.contentDialogState.isOpen =
                    this.informationDialogService.isOpen();
                this.viewerState.contentDialogState.selectedIndex =
                    this.informationDialogService.getSelectedIndex();
                this.viewerState.contentsSearchDialogState.isOpen =
                    this.contentSearchDialogService.isOpen();
                this.viewerState.helpDialogState.isOpen =
                    this.helpDialogService.isOpen();
                this.zone.run(() => {
                    this.viewDialogService.close();
                    this.informationDialogService.close();
                    this.contentSearchDialogService.close();
                    this.helpDialogService.close();
                });
            }
            if (mode.currentValue === ViewerMode.DASHBOARD) {
                this.zone.run(() => {
                    if (this.viewerState.viewDialogState.isOpen) {
                        this.viewDialogService.open();
                    }
                    if (this.viewerState.contentDialogState.isOpen) {
                        this.informationDialogService.open(this.viewerState.contentDialogState.selectedIndex);
                    }
                    if (this.viewerState.contentsSearchDialogState.isOpen) {
                        this.contentSearchDialogService.open();
                    }
                    if (this.viewerState.helpDialogState.isOpen) {
                        this.helpDialogService.open();
                    }
                });
            }
            this.zone.run(() => {
                this.viewerModeChanged.emit(mode.currentValue);
            });
        }));
        this.subscriptions.add(this.canvasService.onCanvasGroupIndexChange.subscribe((canvasGroupIndex) => {
            const canvasIndex = this.canvasService.findCanvasByCanvasIndex(canvasGroupIndex);
            if (canvasIndex !== -1) {
                this.canvasChanged.emit(canvasIndex);
            }
        }));
        this.subscriptions.add(this.resizeService.onResize
            .pipe(throttle((val) => interval(ViewerOptions.transitions.OSDAnimationTime)))
            .subscribe(() => {
            setTimeout(() => {
                this.viewerService.home();
                this.changeDetectorRef.markForCheck();
            }, ViewerOptions.transitions.OSDAnimationTime);
        }));
        this.subscriptions.add(this.viewerLayoutService.onChange.subscribe((viewerLayout) => {
            this.viewerLayout = viewerLayout;
        }));
        this.subscriptions.add(this.altoService.onRecognizedTextContentModeChange$.subscribe((recognizedTextModeChanges) => {
            this.recognizedTextContentMode =
                recognizedTextModeChanges.currentValue;
            this.recognizedTextContentModeChanged.emit(this.recognizedTextContentMode);
            this.changeDetectorRef.markForCheck();
        }));
    }
    ngOnChanges(changes) {
        if (changes['config']) {
            this.viewerService.setConfig(this.config);
            this.viewerLayoutService.setConfig(this.config);
            this.iiifContentSearchService.setConfig(this.config);
            this.altoService.setConfig(this.config);
            this.modeService.setConfig(this.config);
            this.modeService.initialize();
        }
        if (changes['manifestUri']) {
            this.cleanup();
            this.modeService.mode = this.config.initViewerMode;
            this.manifestUri = changes['manifestUri'].currentValue;
            this.loadManifest();
        }
        if (changes['q']) {
            this.q = changes['q'].currentValue;
            if (this.currentManifest) {
                this.iiifContentSearchService.search(this.currentManifest, this.q);
            }
        }
        if (changes['canvasIndex']) {
            this.canvasIndex = changes['canvasIndex'].currentValue;
            if (this.currentManifest) {
                this.viewerService.goToCanvas(this.canvasIndex, true);
            }
        }
    }
    handleKeys(event) {
        this.accessKeysHandlerService.handleKeyEvents(event);
    }
    onDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.config.isDropEnabled) {
            const url = event.dataTransfer.getData('URL');
            const params = new URL(url).searchParams;
            const manifestUri = params.get('manifest');
            const startCanvasId = params.get('canvas');
            if (manifestUri) {
                this.manifestUri = manifestUri.startsWith('//')
                    ? `${location.protocol}${manifestUri}`
                    : manifestUri;
                this.cleanup();
                this.loadManifest();
                if (startCanvasId) {
                    this.manifestChanged.pipe(take(1)).subscribe((manifest) => {
                        const canvasIndex = manifest.sequences
                            ? manifest.sequences[0]?.canvases?.findIndex((c) => c.id === startCanvasId)
                            : -1;
                        if (canvasIndex && canvasIndex !== -1) {
                            setTimeout(() => {
                                this.viewerService.goToCanvas(canvasIndex, true);
                            }, 0);
                        }
                    });
                }
            }
        }
        else {
            this.snackBar.open(this.intl.dropDisabled, undefined, {
                duration: 3000,
            });
        }
    }
    onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.cleanup();
        this.iiifManifestService.destroy();
        this.iiifContentSearchService.destroy();
        this.styleService.destroy();
    }
    toggleToolbarsState(mode) {
        if (this.header && this.footer) {
            switch (mode) {
                case ViewerMode.DASHBOARD:
                    this.showHeaderAndFooterState =
                        this.header.state =
                            this.footer.state =
                                'show';
                    if (this.config.navigationControlEnabled && this.osdToolbarState) {
                        this.osdToolbarState = 'hide';
                    }
                    break;
                case ViewerMode.PAGE:
                    this.showHeaderAndFooterState =
                        this.header.state =
                            this.footer.state =
                                'hide';
                    if (this.config.navigationControlEnabled && this.osdToolbarState) {
                        this.osdToolbarState = 'show';
                    }
                    break;
            }
            this.changeDetectorRef.detectChanges();
        }
    }
    loadManifest() {
        this.iiifManifestService.load(this.manifestUri).pipe(take(1)).subscribe();
    }
    initialize() {
        this.accessKeysHandlerService.initialize();
        this.attributionDialogService.initialize();
        this.viewDialogService.initialize();
        this.informationDialogService.initialize();
        this.contentSearchDialogService.initialize();
        this.helpDialogService.initialize();
        this.viewerService.initialize();
        this.resizeService.initialize();
    }
    cleanup() {
        this.viewerState = new ViewerState();
        this.accessKeysHandlerService.destroy();
        this.attributionDialogService.destroy();
        this.viewDialogService.destroy();
        this.informationDialogService.destroy();
        this.contentSearchDialogService.destroy();
        this.helpDialogService.destroy();
        this.viewerService.destroy();
        this.resizeService.destroy();
        this.resetErrorMessage();
    }
    resetCurrentManifest() {
        this.currentManifest = null;
    }
    resetErrorMessage() {
        this.errorMessage = null;
    }
    hasMixBlendModeSupport() {
        return !(this.platform.FIREFOX || this.platform.SAFARI);
    }
    goToHomeZoom() {
        if (this.recognizedTextContentMode !== this.recognizedTextMode.ONLY) {
            this.viewerService.goToHomeZoom();
        }
    }
    setClasses() {
        return {
            'mode-page': this.modeService.mode === ViewerMode.PAGE,
            'mode-page-zoomed': this.modeService.isPageZoomed(),
            'mode-dashboard': this.modeService.mode === ViewerMode.DASHBOARD,
            'layout-one-page': this.viewerLayout === ViewerLayout.ONE_PAGE,
            'layout-two-page': this.viewerLayout === ViewerLayout.TWO_PAGE,
            'canvas-pressed': this.isCanvasPressed,
            'broken-mix-blend-mode': !this.hasMixBlendModeSupport(),
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerComponent, deps: [{ token: i8.MatSnackBar }, { token: MimeViewerIntl }, { token: IiifManifestService }, { token: ViewDialogService }, { token: InformationDialogService }, { token: AttributionDialogService }, { token: ContentSearchDialogService }, { token: HelpDialogService }, { token: ViewerService }, { token: MimeResizeService }, { token: i0.ChangeDetectorRef }, { token: ModeService }, { token: IiifContentSearchService }, { token: AccessKeysService }, { token: CanvasService }, { token: ViewerLayoutService }, { token: StyleService }, { token: AltoService }, { token: i0.NgZone }, { token: i18.Platform }, { token: CanvasGroupDialogService }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: ViewerComponent, selector: "mime-viewer", inputs: { manifestUri: "manifestUri", q: "q", canvasIndex: "canvasIndex", config: "config", tabIndex: "tabIndex" }, outputs: { viewerModeChanged: "viewerModeChanged", canvasChanged: "canvasChanged", qChanged: "qChanged", manifestChanged: "manifestChanged", recognizedTextContentModeChanged: "recognizedTextContentModeChanged" }, host: { listeners: { "keydown": "handleKeys($event)", "drop": "onDrop($event)", "dragover": "onDragOver($event)", "dragleave": "onDragLeave($event)" } }, providers: VIEWER_PROVIDERS, viewQueries: [{ propertyName: "header", first: true, predicate: ["mimeHeader"], descendants: true, static: true }, { propertyName: "footer", first: true, predicate: ["mimeFooter"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div\n  [id]=\"id\"\n  class=\"viewer-container\"\n  [ngClass]=\"setClasses()\"\n  [hidden]=\"errorMessage !== null\"\n  [tabIndex]=\"tabIndex\"\n>\n  <mime-spinner></mime-spinner>\n  <mime-viewer-header\n    class=\"navbar navbar-header\"\n    #mimeHeader\n  ></mime-viewer-header>\n  <mime-osd-toolbar\n    *ngIf=\"config?.navigationControlEnabled\"\n    [@slideInLeft]=\"osdToolbarState\"\n  ></mime-osd-toolbar>\n\n  <mat-drawer-container class=\"viewer-drawer-container\" autosize>\n    <mat-drawer\n      data-testid=\"ngx-mime-recognized-text-content-container\"\n      mode=\"side\"\n      position=\"end\"\n      (openedChange)=\"goToHomeZoom()\"\n      [opened]=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      [ngClass]=\"{\n        only: recognizedTextContentMode === recognizedTextMode.ONLY,\n        split: recognizedTextContentMode === recognizedTextMode.SPLIT,\n        open: showHeaderAndFooterState === 'show'\n      }\"\n      ><mime-recognized-text-content\n        *ngIf=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      ></mime-recognized-text-content\n    ></mat-drawer>\n    <mat-drawer-content>\n      <div [id]=\"openseadragonId\" class=\"openseadragon\"></div>\n    </mat-drawer-content>\n  </mat-drawer-container>\n\n  <mime-viewer-footer\n    class=\"navbar navbar-footer\"\n    #mimeFooter\n  ></mime-viewer-footer>\n</div>\n\n<div\n  *ngIf=\"errorMessage\"\n  class=\"error-container flex items-center justify-center\"\n>\n  {{ intl.somethingHasGoneWrongLabel }}\n</div>\n", styles: [".viewer-container{overflow:hidden;box-sizing:border-box;position:relative;width:100%;height:100%;display:flex;flex-direction:column}.viewer-container.mode-page-zoomed::ng-deep .tile:hover{cursor:-webkit-grab}.viewer-container.canvas-pressed,.viewer-container.canvas-pressed::ng-deep .tile:hover{cursor:grabbing;cursor:-webkit-grabbing}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group .tile{stroke:#00000026;stroke-width:8;transition:.25s ease stroke}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile:hover,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group:hover .tile{stroke:#00000073}.viewer-container.broken-mix-blend-mode ::ng-deep .hit{mix-blend-mode:unset!important;fill:#ff09}.viewer-container.broken-mix-blend-mode ::ng-deep .selected{fill:#ff890099}.viewer-container ::ng-deep .openseadragon-container{flex-grow:1}.viewer-container ::ng-deep .openseadragon-canvas:focus{outline:none}.viewer-container ::ng-deep .tile{cursor:pointer;fill-opacity:0}.viewer-container ::ng-deep .hit{mix-blend-mode:multiply;fill:#ff0}.viewer-container ::ng-deep .selected{fill:#ff8900;stroke:#613400;stroke-width:4px}.viewer-container .viewer-drawer-container{width:100%;height:100%}.openseadragon{display:flex;flex-grow:1;flex-direction:column;opacity:0;width:100%;height:100%}.navbar{position:absolute;width:100%;overflow:hidden;z-index:2}.navbar-header{top:0}.navbar-footer{bottom:0}.error-container{width:100%;height:100%}[hidden]{display:none}mat-drawer.split{width:25%}@media only screen and (max-width: 599px){mat-drawer.split{width:33%}}mat-drawer.only{width:100%}mat-drawer.only ::ng-deep mime-recognized-text-content .content{max-width:980px}.open{height:calc(100% - 128px)!important;top:64px}@media only screen and (max-width: 599px){.open{height:calc(100% - 112px)!important;top:56px}}\n"], dependencies: [{ kind: "directive", type: i6$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i6$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i21.MatDrawer, selector: "mat-drawer", inputs: ["position", "mode", "disableClose", "autoFocus", "opened"], outputs: ["openedChange", "opened", "openedStart", "closed", "closedStart", "positionChanged"], exportAs: ["matDrawer"] }, { kind: "component", type: i21.MatDrawerContainer, selector: "mat-drawer-container", inputs: ["autosize", "hasBackdrop"], outputs: ["backdropClick"], exportAs: ["matDrawerContainer"] }, { kind: "component", type: i21.MatDrawerContent, selector: "mat-drawer-content" }, { kind: "component", type: OsdToolbarComponent, selector: "mime-osd-toolbar" }, { kind: "component", type: RecognizedTextContentComponent, selector: "mime-recognized-text-content" }, { kind: "component", type: ViewerFooterComponent, selector: "mime-viewer-footer" }, { kind: "component", type: ViewerHeaderComponent, selector: "mime-viewer-header" }, { kind: "component", type: ViewerSpinnerComponent, selector: "mime-spinner" }], animations: [slideInLeft], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-viewer', animations: [slideInLeft], changeDetection: ChangeDetectionStrategy.OnPush, providers: VIEWER_PROVIDERS, template: "<div\n  [id]=\"id\"\n  class=\"viewer-container\"\n  [ngClass]=\"setClasses()\"\n  [hidden]=\"errorMessage !== null\"\n  [tabIndex]=\"tabIndex\"\n>\n  <mime-spinner></mime-spinner>\n  <mime-viewer-header\n    class=\"navbar navbar-header\"\n    #mimeHeader\n  ></mime-viewer-header>\n  <mime-osd-toolbar\n    *ngIf=\"config?.navigationControlEnabled\"\n    [@slideInLeft]=\"osdToolbarState\"\n  ></mime-osd-toolbar>\n\n  <mat-drawer-container class=\"viewer-drawer-container\" autosize>\n    <mat-drawer\n      data-testid=\"ngx-mime-recognized-text-content-container\"\n      mode=\"side\"\n      position=\"end\"\n      (openedChange)=\"goToHomeZoom()\"\n      [opened]=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      [ngClass]=\"{\n        only: recognizedTextContentMode === recognizedTextMode.ONLY,\n        split: recognizedTextContentMode === recognizedTextMode.SPLIT,\n        open: showHeaderAndFooterState === 'show'\n      }\"\n      ><mime-recognized-text-content\n        *ngIf=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      ></mime-recognized-text-content\n    ></mat-drawer>\n    <mat-drawer-content>\n      <div [id]=\"openseadragonId\" class=\"openseadragon\"></div>\n    </mat-drawer-content>\n  </mat-drawer-container>\n\n  <mime-viewer-footer\n    class=\"navbar navbar-footer\"\n    #mimeFooter\n  ></mime-viewer-footer>\n</div>\n\n<div\n  *ngIf=\"errorMessage\"\n  class=\"error-container flex items-center justify-center\"\n>\n  {{ intl.somethingHasGoneWrongLabel }}\n</div>\n", styles: [".viewer-container{overflow:hidden;box-sizing:border-box;position:relative;width:100%;height:100%;display:flex;flex-direction:column}.viewer-container.mode-page-zoomed::ng-deep .tile:hover{cursor:-webkit-grab}.viewer-container.canvas-pressed,.viewer-container.canvas-pressed::ng-deep .tile:hover{cursor:grabbing;cursor:-webkit-grabbing}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group .tile{stroke:#00000026;stroke-width:8;transition:.25s ease stroke}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile:hover,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group:hover .tile{stroke:#00000073}.viewer-container.broken-mix-blend-mode ::ng-deep .hit{mix-blend-mode:unset!important;fill:#ff09}.viewer-container.broken-mix-blend-mode ::ng-deep .selected{fill:#ff890099}.viewer-container ::ng-deep .openseadragon-container{flex-grow:1}.viewer-container ::ng-deep .openseadragon-canvas:focus{outline:none}.viewer-container ::ng-deep .tile{cursor:pointer;fill-opacity:0}.viewer-container ::ng-deep .hit{mix-blend-mode:multiply;fill:#ff0}.viewer-container ::ng-deep .selected{fill:#ff8900;stroke:#613400;stroke-width:4px}.viewer-container .viewer-drawer-container{width:100%;height:100%}.openseadragon{display:flex;flex-grow:1;flex-direction:column;opacity:0;width:100%;height:100%}.navbar{position:absolute;width:100%;overflow:hidden;z-index:2}.navbar-header{top:0}.navbar-footer{bottom:0}.error-container{width:100%;height:100%}[hidden]{display:none}mat-drawer.split{width:25%}@media only screen and (max-width: 599px){mat-drawer.split{width:33%}}mat-drawer.only{width:100%}mat-drawer.only ::ng-deep mime-recognized-text-content .content{max-width:980px}.open{height:calc(100% - 128px)!important;top:64px}@media only screen and (max-width: 599px){.open{height:calc(100% - 112px)!important;top:56px}}\n"] }]
        }], ctorParameters: function () { return [{ type: i8.MatSnackBar }, { type: MimeViewerIntl }, { type: IiifManifestService }, { type: ViewDialogService }, { type: InformationDialogService }, { type: AttributionDialogService }, { type: ContentSearchDialogService }, { type: HelpDialogService }, { type: ViewerService }, { type: MimeResizeService }, { type: i0.ChangeDetectorRef }, { type: ModeService }, { type: IiifContentSearchService }, { type: AccessKeysService }, { type: CanvasService }, { type: ViewerLayoutService }, { type: StyleService }, { type: AltoService }, { type: i0.NgZone }, { type: i18.Platform }, { type: CanvasGroupDialogService }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }]; }, propDecorators: { manifestUri: [{
                type: Input
            }], q: [{
                type: Input
            }], canvasIndex: [{
                type: Input
            }], config: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], viewerModeChanged: [{
                type: Output
            }], canvasChanged: [{
                type: Output
            }], qChanged: [{
                type: Output
            }], manifestChanged: [{
                type: Output
            }], recognizedTextContentModeChanged: [{
                type: Output
            }], header: [{
                type: ViewChild,
                args: ['mimeHeader', { static: true }]
            }], footer: [{
                type: ViewChild,
                args: ['mimeFooter', { static: true }]
            }], handleKeys: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }], onDragOver: [{
                type: HostListener,
                args: ['dragover', ['$event']]
            }], onDragLeave: [{
                type: HostListener,
                args: ['dragleave', ['$event']]
            }] } });

class MimeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.1", ngImport: i0, type: MimeModule, declarations: [AttributionDialogComponent,
            CanvasGroupDialogComponent,
            CanvasGroupNavigatorComponent,
            ContentSearchDialogComponent,
            ContentSearchNavigatorComponent,
            HelpDialogComponent,
            IconComponent,
            InformationDialogComponent,
            MetadataComponent,
            OsdToolbarComponent,
            RecognizedTextContentComponent,
            TocComponent,
            ViewDialogComponent,
            ViewerComponent,
            ViewerFooterComponent,
            ViewerHeaderComponent,
            ViewerSpinnerComponent], imports: [SharedModule], exports: [ViewerComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeModule, providers: [MimeViewerIntl], imports: [SharedModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AttributionDialogComponent,
                        CanvasGroupDialogComponent,
                        CanvasGroupNavigatorComponent,
                        ContentSearchDialogComponent,
                        ContentSearchNavigatorComponent,
                        HelpDialogComponent,
                        IconComponent,
                        InformationDialogComponent,
                        MetadataComponent,
                        OsdToolbarComponent,
                        RecognizedTextContentComponent,
                        TocComponent,
                        ViewDialogComponent,
                        ViewerComponent,
                        ViewerFooterComponent,
                        ViewerHeaderComponent,
                        ViewerSpinnerComponent,
                    ],
                    imports: [SharedModule],
                    providers: [MimeViewerIntl],
                    exports: [ViewerComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { Manifest as MimeManifest, MimeModule, ViewerComponent as MimeViewerComponent, MimeViewerConfig, MimeViewerIntl, MimeViewerIntlLt, MimeViewerIntlNoNb, ViewerMode as MimeViewerMode, RecognizedTextMode };
//# sourceMappingURL=nationallibraryofnorway-ngx-mime.mjs.map
