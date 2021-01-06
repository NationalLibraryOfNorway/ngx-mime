(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('d3'), require('openseadragon'), require('@angular/common'), require('@angular/forms'), require('@angular/flex-layout'), require('@angular/material/button'), require('@angular/material/card'), require('@angular/material/dialog'), require('@angular/material/icon'), require('@angular/material/input'), require('@angular/material/list'), require('@angular/material/progress-bar'), require('@angular/material/progress-spinner'), require('@angular/material/slider'), require('@angular/material/snack-bar'), require('@angular/material/tabs'), require('@angular/material/toolbar'), require('@angular/material/tooltip'), require('rxjs/operators'), require('@angular/common/http'), require('@angular/material/core'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('@nationallibraryofnorway/ngx-mime', ['exports', '@angular/core', 'rxjs', 'd3', 'openseadragon', '@angular/common', '@angular/forms', '@angular/flex-layout', '@angular/material/button', '@angular/material/card', '@angular/material/dialog', '@angular/material/icon', '@angular/material/input', '@angular/material/list', '@angular/material/progress-bar', '@angular/material/progress-spinner', '@angular/material/slider', '@angular/material/snack-bar', '@angular/material/tabs', '@angular/material/toolbar', '@angular/material/tooltip', 'rxjs/operators', '@angular/common/http', '@angular/material/core', '@angular/animations'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.nationallibraryofnorway = global.nationallibraryofnorway || {}, global.nationallibraryofnorway['ngx-mime'] = {}), global.ng.core, global.rxjs, global.d3, global.OpenSeadragon, global.ng.common, global.ng.forms, global.ng.flexLayout, global.ng.material.button, global.ng.material.card, global.ng.material.dialog, global.ng.material.icon, global.ng.material.input, global.ng.material.list, global.ng.material.progressBar, global.ng.material.progressSpinner, global.ng.material.slider, global.ng.material.snackBar, global.ng.material.tabs, global.ng.material.toolbar, global.ng.material.tooltip, global.rxjs.operators, global.ng.common.http, global.ng.material.core, global.ng.animations));
}(this, (function (exports, i0, rxjs, d3, OpenSeadragon$1, common, forms, flexLayout, button, card, dialog, icon, input, list, progressBar, progressSpinner, slider, snackBar, tabs, toolbar, tooltip, operators, http, core, animations) { 'use strict';

    var HelpIntl = /** @class */ (function () {
        function HelpIntl() {
            this.helpLabel = 'Help';
            this.line1 = '<strong>ARROW LEFT</strong> or <strong>PAGE UP</strong>: Previous page';
            this.line2 = '<strong>ARROW RIGHT</strong> or <strong>PAGE DOWN</strong>: Next page';
            this.line3 = '<strong>HOME</strong>: Go to first page';
            this.line4 = '<strong>END</strong>: Go to last page';
            this.line5 = '<strong>C</strong>: Contents window with more information/metadata about the object. (Close with <strong>ESC</strong>.)';
            this.line6 = '<strong>S</strong>: Search inside the object. (Close with <strong>ESC</strong>.)';
            this.line7 = '<strong>N</strong>: Next result';
            this.line8 = '<strong>P</strong>: Previous result';
            this.line9 = '<strong>F</strong>: Fullscreen on/off (Close with <strong>F</strong> or <strong>ESC</strong>.)';
            this.line10 = '<strong>R</strong>: Rotate 90°';
        }
        return HelpIntl;
    }());

    var MimeViewerIntl = /** @class */ (function () {
        function MimeViewerIntl() {
            this.changes = new rxjs.Subject();
            this.help = new HelpIntl();
            this.closeLabel = 'Close';
            this.attributionLabel = 'Attribution';
            this.attributonCloseAriaLabel = 'Close attribution dialog';
            this.contentsLabel = 'Contents';
            this.twoPageViewLabel = 'Two page display';
            this.singlePageViewLabel = 'Single page display';
            this.metadataLabel = 'Metadata';
            this.licenseLabel = 'License';
            this.tocLabel = 'Table of Contents';
            this.fullScreenLabel = 'Full screen';
            this.exitFullScreenLabel = 'Exit full screen';
            this.zoomInLabel = 'Zoom in';
            this.zoomOutLabel = 'Zoom out';
            this.previousPageLabel = 'Previous Page';
            this.nextPageLabel = 'Next Page';
            this.homeLabel = 'Go Home';
            this.rotateCwLabel = 'Rotate 90°';
            this.searchLabel = 'Search';
            this.clearSearchLabel = 'Clear';
            this.previousHitLabel = 'Previous Hit';
            this.nextHitLabel = 'Next Hit';
            this.goToPageLabel = 'Go to page';
            this.currentPageLabel = 'Current page';
            this.enterPageNumber = 'Enter page number';
            this.dropDisabled = 'Sorry, but drag and drop is disabled';
            // ERRORS
            this.somethingHasGoneWrongLabel = 'Oh dear, something has gone terribly wrong...';
            this.manifestUriMissingLabel = 'ManifestUri is missing';
            this.manifestNotValidLabel = 'Manifest is not valid';
            this.pageDoesNotExists = 'Sorry, that page does not exist';
            this.noResultsFoundLabel = function (q) {
                return "No results found for <em class=\"current-search\">" + q + "</em>";
            };
            this.resultsFoundLabel = function (numberOfHits, q) {
                return numberOfHits + " results found for <em class=\"current-search\">" + q + "</em>";
            };
            this.currentHitLabel = function (currentHit, numberOfHits) {
                return currentHit + " of " + numberOfHits + " hits";
            };
        }
        return MimeViewerIntl;
    }());
    MimeViewerIntl.decorators = [
        { type: i0.Injectable }
    ];

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var HelpIntlNoNb = /** @class */ (function (_super) {
        __extends(HelpIntlNoNb, _super);
        function HelpIntlNoNb() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.helpLabel = 'Hjelp';
            _this.line1 = '<strong>PIL VENSTRE</strong> eller <strong>PAGE UP</strong>: Gå til forrige side';
            _this.line2 = '<strong>PIL HØYRE</strong> eller <strong>PAGE DOWN</strong>: Gå til neste side';
            _this.line3 = '<strong>HOME</strong>: Gå til første side';
            _this.line4 = '<strong>END</strong>: Gå til siste side';
            _this.line5 = '<strong>C</strong>: Slår innholdsfanen på, og viser mer informasjon/metadata om objektet. (Lukk med <strong>ESC</strong>-tasten.)';
            _this.line6 = '<strong>S</strong>: Åpner søkefeltet for søk i objektet. (Lukk med <strong>ESC</strong>-tasten.)';
            _this.line7 = '<strong>N</strong>: Går til neste treff i objektet';
            _this.line8 = '<strong>P</strong>: Går til forrige treff i objektet';
            _this.line9 = '<strong>F</strong>: Fullskjerm av og på (Lukk med <strong>F</strong> eller <strong>ESC</strong>-tasten.)';
            _this.line10 = '<strong>R</strong>: Rotér 90°';
            return _this;
        }
        return HelpIntlNoNb;
    }(HelpIntl));

    var MimeViewerIntlNoNb = /** @class */ (function (_super) {
        __extends(MimeViewerIntlNoNb, _super);
        function MimeViewerIntlNoNb() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.help = new HelpIntlNoNb();
            _this.closeLabel = 'Lukk';
            _this.attributionLabel = 'Tillatelse';
            _this.attributonCloseAriaLabel = 'Steng tillatelse dialog';
            _this.contentsLabel = 'Innhold';
            _this.twoPageViewLabel = 'Tosidevisning';
            _this.singlePageViewLabel = 'Enkeltsidevisning';
            _this.metadataLabel = 'Metadata';
            _this.licenseLabel = 'Lisens';
            _this.tocLabel = 'Innholdsfortegnelse';
            _this.fullScreenLabel = 'Fullskjerm';
            _this.exitFullScreenLabel = 'Avslutt fullskjerm';
            _this.zoomInLabel = 'Zoom inn';
            _this.zoomOutLabel = 'Zoom ut';
            _this.previousPageLabel = 'Forrige side';
            _this.nextPageLabel = 'Neste side';
            _this.homeLabel = 'Hjem';
            _this.rotateCwLabel = 'Rotér 90°';
            _this.searchLabel = 'Søk';
            _this.clearSearchLabel = 'Tøm';
            _this.previousHitLabel = 'Forrige treff';
            _this.nextHitLabel = 'Neste treff';
            _this.goToPageLabel = 'Gå til side';
            _this.currentPageLabel = 'Nåværende side';
            _this.enterPageNumber = 'Skriv inn sidenummer';
            _this.dropDisabled = 'Beklager, men drag and drop er ikke aktivert';
            // ERRORS
            _this.somethingHasGoneWrongLabel = 'Å nei! Noe har gått galt...';
            _this.manifestUriMissingLabel = 'Lenke til manifest mangler';
            _this.manifestNotValidLabel = 'Manifestet er ikke gyldig';
            _this.pageDoesNotExists = 'Beklager, men den siden finnes ikke';
            _this.noResultsFoundLabel = function (q) {
                return "Ingen treff funnet for <em class=\"current-search\">" + q + "</em>";
            };
            _this.resultsFoundLabel = function (numberOfHits, q) {
                return numberOfHits + " treff funnet for <em class=\"current-search\">" + q + "</em>";
            };
            _this.currentHitLabel = function (currentHit, numberOfHits) {
                return currentHit + " av " + numberOfHits + " treff";
            };
            return _this;
        }
        return MimeViewerIntlNoNb;
    }(MimeViewerIntl));
    MimeViewerIntlNoNb.decorators = [
        { type: i0.Injectable }
    ];

    var HelpIntlLt = /** @class */ (function (_super) {
        __extends(HelpIntlLt, _super);
        function HelpIntlLt() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.helpLabel = 'Pagalba';
            _this.line1 = '<strong>RODYKLĖ KAIRĖN</strong> arba <strong>PAGE UP</strong>: Buvęs puslapis';
            _this.line2 = '<strong>RODYKLĖ DEŠINĖN</strong> arba <strong>PAGE DOWN</strong>: Kitas puslapis';
            _this.line3 = '<strong>HOME</strong>: Pirmas puslapis';
            _this.line4 = '<strong>END</strong>: Paskutinis puslapis';
            _this.line5 = '<strong>C</strong>: Turinio langas su daugiau informacijos apie objektą. (Uždaromas paspaudus <strong>ESC</strong>.)';
            _this.line6 = '<strong>S</strong>: Paieška objekto viduje. (Uždaroma paspaudus <strong>ESC</strong>.)';
            _this.line7 = '<strong>N</strong>: Kitas rezultatas';
            _this.line8 = '<strong>P</strong>: Buvęs rezultatas';
            _this.line9 = '<strong>F</strong>: Pilno ekrano režimas (Uždaroma paspaudus <strong>F</strong> arba <strong>ESC</strong>.)';
            _this.line10 = '<strong>R</strong>: Pasukti 90 laipsnių';
            return _this;
        }
        return HelpIntlLt;
    }(HelpIntl));

    var MimeViewerIntlLt = /** @class */ (function (_super) {
        __extends(MimeViewerIntlLt, _super);
        function MimeViewerIntlLt() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.help = new HelpIntlLt();
            _this.closeLabel = 'Uždaryti';
            _this.attributionLabel = 'Teisių priskyrimas';
            _this.attributonCloseAriaLabel = 'Uždaryti teisių priskyrimo langą';
            _this.contentsLabel = 'Informacija apie objektą';
            _this.twoPageViewLabel = 'Atvaizduoti po du puslapius';
            _this.singlePageViewLabel = 'Atvaizduoti po vieną puslapį';
            _this.metadataLabel = 'Metaduomenys';
            _this.licenseLabel = 'Licencija';
            _this.tocLabel = 'Turinys';
            _this.fullScreenLabel = 'Pilno ekrano režimas';
            _this.exitFullScreenLabel = 'Išeiti iš pilno ekrano režimo';
            _this.zoomInLabel = 'Priartinti';
            _this.zoomOutLabel = 'Atitolinti';
            _this.previousPageLabel = 'Buvęs puslapis';
            _this.nextPageLabel = 'Kitas puslapis';
            _this.homeLabel = 'Grįžti į pradžią';
            _this.rotateCwLabel = 'Pasukti 90°';
            _this.searchLabel = 'Paieška';
            _this.clearSearchLabel = 'Išvalyti';
            _this.previousHitLabel = 'Buvęs rezultatas';
            _this.nextHitLabel = 'Kitas rezultatas';
            _this.goToPageLabel = 'Persikelti į puslapį';
            _this.currentPageLabel = 'Dabartinis puslapis';
            _this.enterPageNumber = 'Įveskite puslapio numerį';
            _this.dropDisabled = 'Atleiskite, bet veiksmas negalimas';
            // ERRORS
            _this.somethingHasGoneWrongLabel = 'Objekto atvaizduoti nepavyko...';
            _this.manifestUriMissingLabel = 'Nerastas objektų sąrašo identifikatorius (ManifestUri)';
            _this.manifestNotValidLabel = 'Netinkamas objektų sąrašas (Manifest)';
            _this.pageDoesNotExists = 'Nepavyko rasti šio paslapio';
            _this.noResultsFoundLabel = function (q) {
                return "Objekte nerasta atitikmen\u0173 <em class=\"current-search\">" + q + "</em>";
            };
            _this.resultsFoundLabel = function (numberOfHits, q) {
                return numberOfHits + " rezultata" + (numberOfHits === 1 ? 's' : 'i') + " su <em class=\"current-search\">" + q + "</em>";
            };
            _this.currentHitLabel = function (currentHit, numberOfHits) {
                return currentHit + " i\u0161 " + numberOfHits + " atitikmen\u0173";
            };
            return _this;
        }
        return MimeViewerIntlLt;
    }(MimeViewerIntl));
    MimeViewerIntlLt.decorators = [
        { type: i0.Injectable }
    ];

    var ViewerLayout;
    (function (ViewerLayout) {
        ViewerLayout[ViewerLayout["ONE_PAGE"] = 0] = "ONE_PAGE";
        ViewerLayout[ViewerLayout["TWO_PAGE"] = 1] = "TWO_PAGE";
    })(ViewerLayout || (ViewerLayout = {}));

    (function (ViewerMode) {
        ViewerMode[ViewerMode["DASHBOARD"] = 0] = "DASHBOARD";
        ViewerMode[ViewerMode["PAGE"] = 1] = "PAGE";
        ViewerMode[ViewerMode["PAGE_ZOOMED"] = 2] = "PAGE_ZOOMED";
    })(exports.MimeViewerMode || (exports.MimeViewerMode = {}));

    var MimeViewerConfig = /** @class */ (function () {
        function MimeViewerConfig(fields) {
            this.attributionDialogEnabled = true;
            this.attributionDialogHideTimeout = -1;
            this.navigationControlEnabled = true;
            this.initViewerMode = exports.MimeViewerMode.PAGE;
            this.initViewerLayout = ViewerLayout.TWO_PAGE;
            this.withCredentials = false;
            this.loadTilesWithAjax = false;
            this.crossOriginPolicy = false;
            this.ajaxHeaders = null;
            this.preserveZoomOnCanvasGroupChange = false;
            this.startOnTopOnCanvasGroupChange = false;
            this.isDropEnabled = false;
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
            }
        }
        return MimeViewerConfig;
    }());

    var ViewingDirection;
    (function (ViewingDirection) {
        ViewingDirection[ViewingDirection["LTR"] = 0] = "LTR";
        ViewingDirection[ViewingDirection["RTL"] = 1] = "RTL";
    })(ViewingDirection || (ViewingDirection = {}));

    var Manifest = /** @class */ (function () {
        function Manifest(fields) {
            this.viewingDirection = ViewingDirection.LTR;
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
        return Manifest;
    }());
    var Metadata = /** @class */ (function () {
        function Metadata(label, value) {
            this.label = label;
            this.value = value;
        }
        return Metadata;
    }());
    var Sequence = /** @class */ (function () {
        function Sequence(fields) {
            if (fields) {
                this.id = fields.id || this.id;
                this.type = fields.type || this.type;
                this.label = fields.label || this.label;
                this.viewingHint = fields.viewingHint || this.viewingHint;
                this.canvases = fields.canvases || this.canvases;
            }
        }
        return Sequence;
    }());
    var Canvas = /** @class */ (function () {
        function Canvas(fields) {
            if (fields) {
                this.id = fields.id || this.id;
                this.type = fields.type || this.type;
                this.label = fields.label || this.label;
                this.thumbnail = fields.thumbnail || this.thumbnail;
                this.height = fields.height || this.height;
                this.width = fields.width || this.width;
                this.images = fields.images || this.images;
            }
        }
        return Canvas;
    }());
    var Images = /** @class */ (function () {
        function Images(fields) {
            if (fields) {
                this.id = fields.id || this.id;
                this.type = fields.type || this.type;
                this.motivation = fields.motivation || this.motivation;
                this.resource = fields.resource || this.resource;
                this.on = fields.on || this.on;
            }
        }
        return Images;
    }());
    var Resource = /** @class */ (function () {
        function Resource(fields) {
            if (fields) {
                this.id = fields.id || this.id;
                this.type = fields.type || this.type;
                this.format = fields.format || this.format;
                this.service = fields.service || this.service;
                this.height = fields.height || this.height;
                this.width = fields.width || this.width;
            }
        }
        return Resource;
    }());
    var Service = /** @class */ (function () {
        function Service(fields) {
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
        return Service;
    }());
    var Size = /** @class */ (function () {
        function Size(width, height) {
            this.width = width;
            this.height = height;
        }
        return Size;
    }());
    var Tile = /** @class */ (function () {
        function Tile(fields) {
            if (fields) {
                this.width = fields.width || this.width;
                this.scaleFactors = fields.scaleFactors || this.scaleFactors;
            }
        }
        return Tile;
    }());
    var Structure = /** @class */ (function () {
        function Structure(fields) {
            if (fields) {
                this.id = fields.id || this.id;
                this.type = fields.type || this.type;
                this.label = fields.label || this.label;
                this.canvases = fields.canvases || this.canvases;
                this.canvasIndex = fields.canvasIndex;
            }
        }
        return Structure;
    }());
    var TileSource = /** @class */ (function () {
        function TileSource() {
        }
        return TileSource;
    }());

    var MimeMaterialModule = /** @class */ (function () {
        function MimeMaterialModule() {
        }
        return MimeMaterialModule;
    }());
    MimeMaterialModule.decorators = [
        { type: i0.NgModule, args: [{
                    exports: [
                        toolbar.MatToolbarModule,
                        button.MatButtonModule,
                        icon.MatIconModule,
                        tooltip.MatTooltipModule,
                        dialog.MatDialogModule,
                        tabs.MatTabsModule,
                        list.MatListModule,
                        slider.MatSliderModule,
                        progressSpinner.MatProgressSpinnerModule,
                        input.MatInputModule,
                        progressBar.MatProgressBarModule,
                        card.MatCardModule,
                        snackBar.MatSnackBarModule
                    ]
                },] }
    ];

    var SpinnerService = /** @class */ (function () {
        function SpinnerService() {
            this.spinnerSubject = new rxjs.Subject();
            this.spinnerState = this.spinnerSubject.asObservable();
        }
        SpinnerService.prototype.show = function () {
            this.spinnerSubject.next({ show: true });
        };
        SpinnerService.prototype.hide = function () {
            this.spinnerSubject.next({ show: false });
        };
        return SpinnerService;
    }());
    SpinnerService.decorators = [
        { type: i0.Injectable }
    ];
    SpinnerService.ctorParameters = function () { return []; };

    var SharedModule = /** @class */ (function () {
        function SharedModule() {
        }
        return SharedModule;
    }());
    SharedModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        forms.FormsModule,
                        forms.ReactiveFormsModule,
                        flexLayout.FlexLayoutModule,
                        MimeMaterialModule
                    ],
                    exports: [
                        common.CommonModule,
                        flexLayout.FlexLayoutModule,
                        forms.FormsModule,
                        forms.ReactiveFormsModule,
                        MimeMaterialModule
                    ],
                    providers: [SpinnerService]
                },] }
    ];

    var ModeChanges = /** @class */ (function () {
        function ModeChanges(fields) {
            if (fields) {
                this.currentValue = fields.currentValue || this.currentValue;
                this.previousValue = fields.previousValue || this.previousValue;
            }
        }
        return ModeChanges;
    }());

    var ModeService = /** @class */ (function () {
        function ModeService() {
            this.toggleModeSubject = new rxjs.ReplaySubject();
            this.modeChanges = new ModeChanges();
        }
        Object.defineProperty(ModeService.prototype, "onChange", {
            get: function () {
                return this.toggleModeSubject.asObservable().pipe(operators.distinctUntilChanged());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ModeService.prototype, "mode", {
            get: function () {
                return this._mode;
            },
            set: function (mode) {
                this._mode = mode;
                this.change();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ModeService.prototype, "initialMode", {
            get: function () {
                return this._initialMode;
            },
            set: function (mode) {
                this._initialMode = mode;
                this.mode = mode;
            },
            enumerable: false,
            configurable: true
        });
        ModeService.prototype.toggleMode = function () {
            if (this.mode === exports.MimeViewerMode.DASHBOARD) {
                this.mode = exports.MimeViewerMode.PAGE;
            }
            else if (this.mode === exports.MimeViewerMode.PAGE ||
                this.mode === exports.MimeViewerMode.PAGE_ZOOMED) {
                this.mode = exports.MimeViewerMode.DASHBOARD;
            }
        };
        ModeService.prototype.change = function () {
            this.modeChanges.previousValue = this.modeChanges.currentValue;
            this.modeChanges.currentValue = this._mode;
            this.toggleModeSubject.next(Object.assign({}, this.modeChanges));
        };
        return ModeService;
    }());
    ModeService.decorators = [
        { type: i0.Injectable }
    ];
    ModeService.ctorParameters = function () { return []; };

    /****************************************************************
     * MIME-viewer options
     ****************************************************************/
    var ViewerOptions = {
        zoom: {
            zoomFactor: 1.15,
            dblClickZoomFactor: 2.7,
            // How many pixels since lastDistance before it is considered a pinch
            pinchZoomThreshold: 3
        },
        pan: {
            // Sensitivity when determining swipe-direction.
            // Higher threshold means that swipe must be more focused in
            // x-direction before the gesture is recognized as "left" or "right"
            swipeDirectionThreshold: 70
        },
        // All transition times in milliseconds
        transitions: {
            toolbarsEaseInTime: 400,
            toolbarsEaseOutTime: 500,
            OSDAnimationTime: 600 // Animation-time for OSD-animations
        },
        overlays: {
            // Margin between canvas groups in Dashboard View in OpenSeadragon viewport-coordinates
            canvasGroupMarginInDashboardView: 300,
            // Margin between canvas groups in Page View in OpenSeadragon viewport-coordinates
            canvasGroupMarginInPageView: 20
        },
        padding: {
            // Padding in viewer container in pixels
            header: 80,
            footer: 80 // Placeholder below viewer for footer in Dashboard View
        },
        colors: {
            canvasGroupBackgroundColor: '#fafafa'
        }
    };

    var Rect = /** @class */ (function () {
        function Rect(fields) {
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
        return Rect;
    }());

    var canvasRectFromCriteria = function (rotation, criteria, x) {
        var rect = {};
        if (rotation === 90 || rotation === 270) {
            rect = {
                height: criteria.canvasSource.width,
                width: criteria.canvasSource.height,
                x: x,
                y: (criteria.canvasSource.width / 2) * -1
            };
        }
        else {
            rect = {
                height: criteria.canvasSource.height,
                width: criteria.canvasSource.width,
                x: x,
                y: (criteria.canvasSource.height / 2) * -1
            };
        }
        return new Rect(rect);
    };

    var OnePageCalculatePagePositionStrategy = /** @class */ (function () {
        function OnePageCalculatePagePositionStrategy() {
        }
        OnePageCalculatePagePositionStrategy.prototype.calculateCanvasGroupPosition = function (criteria, rotation) {
            if (rotation === void 0) { rotation = 0; }
            var x;
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
            return canvasRectFromCriteria(rotation, criteria, x);
        };
        OnePageCalculatePagePositionStrategy.prototype.calculateLtrX = function (criteria) {
            return (criteria.previousCanvasGroupPosition.x +
                criteria.previousCanvasGroupPosition.width +
                ViewerOptions.overlays.canvasGroupMarginInDashboardView);
        };
        OnePageCalculatePagePositionStrategy.prototype.calculateRtlX = function (criteria) {
            return (criteria.previousCanvasGroupPosition.x -
                criteria.previousCanvasGroupPosition.width -
                ViewerOptions.overlays.canvasGroupMarginInDashboardView);
        };
        return OnePageCalculatePagePositionStrategy;
    }());

    var TwoPageCalculateCanvasGroupPositionStrategy = /** @class */ (function () {
        function TwoPageCalculateCanvasGroupPositionStrategy() {
        }
        TwoPageCalculateCanvasGroupPositionStrategy.prototype.calculateCanvasGroupPosition = function (criteria, rotation) {
            if (rotation === void 0) { rotation = 0; }
            var x;
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
            return canvasRectFromCriteria(rotation, criteria, x);
        };
        TwoPageCalculateCanvasGroupPositionStrategy.prototype.calculateEvenLtrX = function (criteria) {
            return (criteria.previousCanvasGroupPosition.x +
                criteria.previousCanvasGroupPosition.width +
                ViewerOptions.overlays.canvasGroupMarginInDashboardView);
        };
        TwoPageCalculateCanvasGroupPositionStrategy.prototype.calculateOddLtrX = function (criteria) {
            return (criteria.previousCanvasGroupPosition.x +
                criteria.previousCanvasGroupPosition.width);
        };
        TwoPageCalculateCanvasGroupPositionStrategy.prototype.calculateEvenRtlX = function (criteria) {
            return (criteria.previousCanvasGroupPosition.x -
                criteria.canvasSource.width -
                ViewerOptions.overlays.canvasGroupMarginInDashboardView);
        };
        TwoPageCalculateCanvasGroupPositionStrategy.prototype.calculateOddRtlX = function (criteria) {
            return criteria.previousCanvasGroupPosition.x - criteria.canvasSource.width;
        };
        return TwoPageCalculateCanvasGroupPositionStrategy;
    }());

    var CalculateCanvasGroupPositionFactory = /** @class */ (function () {
        function CalculateCanvasGroupPositionFactory() {
        }
        CalculateCanvasGroupPositionFactory.create = function (viewerLayout, paged) {
            if (viewerLayout === ViewerLayout.ONE_PAGE || !paged) {
                return new OnePageCalculatePagePositionStrategy();
            }
            else if (viewerLayout === ViewerLayout.TWO_PAGE) {
                return new TwoPageCalculateCanvasGroupPositionStrategy();
            }
        };
        return CalculateCanvasGroupPositionFactory;
    }());

    var CanvasGroups = /** @class */ (function () {
        function CanvasGroups() {
            this.canvasGroupRects = [];
            this.canvasRects = [];
            this.canvasesPerCanvasGroup = [];
        }
        CanvasGroups.prototype.add = function (rect) {
            this.canvasGroupRects.push(rect);
        };
        CanvasGroups.prototype.addRange = function (rects) {
            this.canvasGroupRects = rects;
        };
        CanvasGroups.prototype.get = function (index) {
            return Object.assign({}, this.canvasGroupRects[index]);
        };
        CanvasGroups.prototype.findClosestIndex = function (point) {
            var i = 0;
            var lastDelta;
            if (point === null) {
                return -1;
            }
            this.canvasGroupRects.some(function (rect, index) {
                var delta = Math.abs(point.x - rect.centerX);
                if (delta >= lastDelta) {
                    return true;
                }
                i = index;
                lastDelta = delta;
            });
            return i;
        };
        CanvasGroups.prototype.getMaxHeight = function () {
            return Math.max.apply(Math, this.canvasGroupRects.map(function (rect) {
                return rect.height;
            }));
        };
        CanvasGroups.prototype.getMaxWidth = function () {
            return Math.max.apply(Math, this.canvasGroupRects.map(function (rect) {
                return rect.width;
            }));
        };
        CanvasGroups.prototype.length = function () {
            return this.canvasGroupRects.length;
        };
        return CanvasGroups;
    }());

    var OneCanvasPerCanvasGroupStrategy = /** @class */ (function () {
        function OneCanvasPerCanvasGroupStrategy() {
            this.addAll = function (canvasRects) {
                var canvasGroups = new CanvasGroups();
                canvasGroups.addRange(canvasRects);
                canvasGroups.canvasRects = canvasRects;
                for (var i = 0; i < canvasRects.length; i++) {
                    canvasGroups.canvasesPerCanvasGroup.push([i]);
                }
                return canvasGroups;
            };
        }
        return OneCanvasPerCanvasGroupStrategy;
    }());
    var TwoCanvasPerCanvasGroupStrategy = /** @class */ (function () {
        function TwoCanvasPerCanvasGroupStrategy() {
            this.addAll = function (canvasRects) {
                var canvasGroups = new CanvasGroups();
                // Single first page
                canvasGroups.add(canvasRects[0]);
                canvasGroups.canvasRects = canvasRects;
                canvasGroups.canvasesPerCanvasGroup.push([0]);
                for (var i = 1; i < canvasRects.length; i = i + 2) {
                    if (i + 1 < canvasRects.length) {
                        // Paired pages
                        var thisRect = canvasRects[i];
                        var nextRect = canvasRects[i + 1];
                        var groupedRect = new Rect({
                            x: Math.min(thisRect.x, nextRect.x),
                            y: Math.min(thisRect.y, nextRect.y),
                            height: Math.max(thisRect.height, nextRect.height),
                            width: thisRect.width + nextRect.width
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
        return TwoCanvasPerCanvasGroupStrategy;
    }());

    var CanvasGroupStrategyFactory = /** @class */ (function () {
        function CanvasGroupStrategyFactory() {
        }
        CanvasGroupStrategyFactory.create = function (layout) {
            if (layout === ViewerLayout.ONE_PAGE) {
                return new OneCanvasPerCanvasGroupStrategy();
            }
            else if (layout === ViewerLayout.TWO_PAGE) {
                return new TwoCanvasPerCanvasGroupStrategy();
            }
            return null;
        };
        return CanvasGroupStrategyFactory;
    }());

    var CanvasService = /** @class */ (function () {
        function CanvasService() {
            this._currentNumberOfCanvasGroups = new rxjs.BehaviorSubject(0);
            this._currentCanvasGroupIndex = new rxjs.BehaviorSubject(0);
            this.canvasGroups = new CanvasGroups();
            this._numberOfCanvases = 0;
        }
        CanvasService.prototype.addAll = function (canvasRects, layout) {
            this.numberOfCanvases = canvasRects.length;
            var canvasGroupStrategy = CanvasGroupStrategyFactory.create(layout);
            this.canvasGroups = canvasGroupStrategy.addAll(canvasRects);
            this._currentNumberOfCanvasGroups.next(this.canvasGroups.length());
        };
        CanvasService.prototype.reset = function () {
            this.numberOfCanvases = 0;
            this._currentCanvasGroupIndex.next(0);
            this.canvasGroups = new CanvasGroups();
        };
        Object.defineProperty(CanvasService.prototype, "onCanvasGroupIndexChange", {
            get: function () {
                return this._currentCanvasGroupIndex
                    .asObservable()
                    .pipe(operators.distinctUntilChanged());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CanvasService.prototype, "onNumberOfCanvasGroupsChange", {
            get: function () {
                return this._currentNumberOfCanvasGroups
                    .asObservable()
                    .pipe(operators.distinctUntilChanged());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CanvasService.prototype, "currentCanvasGroupIndex", {
            get: function () {
                return this._currentCanvasGroupIndex.value;
            },
            set: function (currentCanvasGroupIndex) {
                if (!this.isWithinBounds(currentCanvasGroupIndex)) {
                    return;
                }
                this._currentCanvasGroupIndex.next(currentCanvasGroupIndex);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CanvasService.prototype, "numberOfCanvases", {
            get: function () {
                return this._numberOfCanvases;
            },
            set: function (numberOfCanvases) {
                this._numberOfCanvases = numberOfCanvases;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CanvasService.prototype, "numberOfCanvasGroups", {
            get: function () {
                return this.canvasGroups.length();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CanvasService.prototype, "currentCanvasIndex", {
            get: function () {
                return this.canvasGroups.canvasesPerCanvasGroup[this.currentCanvasGroupIndex][0];
            },
            enumerable: false,
            configurable: true
        });
        CanvasService.prototype.isWithinBounds = function (canvasGroupIndex) {
            return (canvasGroupIndex > -1 && canvasGroupIndex <= this.numberOfCanvasGroups - 1);
        };
        CanvasService.prototype.isCurrentCanvasGroupValid = function () {
            return this.isWithinBounds(this.currentCanvasGroupIndex);
        };
        // Returns -1 if next canvas index is out of bounds
        CanvasService.prototype.getNextCanvasGroupIndex = function () {
            if (!this.isWithinBounds(this.currentCanvasGroupIndex + 1)) {
                return -1;
            }
            this.currentCanvasGroupIndex++;
            return this.currentCanvasGroupIndex;
        };
        // Returns -1 if previous canvas index is out of bounds
        CanvasService.prototype.getPrevCanvasGroupIndex = function () {
            if (!this.isWithinBounds(this.currentCanvasGroupIndex - 1)) {
                return -1;
            }
            this.currentCanvasGroupIndex--;
            return this.currentCanvasGroupIndex;
        };
        CanvasService.prototype.constrainToRange = function (canvasGroupsIndex) {
            if (canvasGroupsIndex < 0) {
                return 0;
            }
            else if (canvasGroupsIndex >= this.numberOfCanvasGroups - 1) {
                return this.numberOfCanvasGroups - 1;
            }
            else {
                return canvasGroupsIndex;
            }
        };
        CanvasService.prototype.findClosestCanvasGroupIndex = function (point) {
            return this.canvasGroups.findClosestIndex(point);
        };
        CanvasService.prototype.findCanvasGroupByCanvasIndex = function (canvasIndex) {
            return this.canvasGroups.canvasesPerCanvasGroup.findIndex(function (canvasForCanvasGroup) {
                return canvasForCanvasGroup.indexOf(canvasIndex) >= 0;
            });
        };
        CanvasService.prototype.findCanvasByCanvasIndex = function (canvasIndex) {
            return this.canvasGroups.canvasesPerCanvasGroup.length === 0
                ? -1
                : this.canvasGroups.canvasesPerCanvasGroup[canvasIndex][0];
        };
        CanvasService.prototype.getCanvasGroupLabel = function (canvasGroupIndex) {
            if (!this.canvasGroups.canvasGroupRects ||
                this.canvasGroups.canvasesPerCanvasGroup.length === 0) {
                return '1';
            }
            var canvasGroup = this.canvasGroups.canvasesPerCanvasGroup[canvasGroupIndex];
            var canvasGroupLabel = '' + (canvasGroup[0] + 1);
            if (canvasGroup.length > 1) {
                canvasGroupLabel =
                    canvasGroupLabel + '-' + (canvasGroup[canvasGroup.length - 1] + 1);
            }
            return canvasGroupLabel;
        };
        CanvasService.prototype.getCanvasesPerCanvasGroup = function (canvasIndex) {
            return !this.canvasGroups.canvasGroupRects
                ? [0]
                : this.canvasGroups.canvasesPerCanvasGroup[canvasIndex];
        };
        CanvasService.prototype.getCanvasRect = function (canvasIndex) {
            return this.canvasGroups.canvasRects[canvasIndex];
        };
        CanvasService.prototype.getCurrentCanvasGroupRect = function () {
            return this.getCanvasGroupRect(this.currentCanvasGroupIndex);
        };
        CanvasService.prototype.getCanvasGroupRect = function (canvasGroupIndex) {
            return this.canvasGroups.get(canvasGroupIndex);
        };
        CanvasService.prototype.getMaxHeight = function () {
            return this.canvasGroups.getMaxHeight();
        };
        CanvasService.prototype.getMaxWidth = function () {
            return this.canvasGroups.getMaxWidth();
        };
        return CanvasService;
    }());
    CanvasService.decorators = [
        { type: i0.Injectable }
    ];
    CanvasService.ctorParameters = function () { return []; };

    var ClickService = /** @class */ (function () {
        function ClickService() {
            var _this = this;
            this.clickCount = 0;
            this.click = function (event) {
                event.preventDefaultAction = true;
                if (event.quick) {
                    _this.clickCount++;
                    if (_this.clickCount === 1) {
                        _this.dblClickTimeOut = setTimeout(function () {
                            _this.clickCount = 0;
                            _this.triggerSingleClick(event);
                        }, event.tracker.dblClickTimeThreshold);
                    }
                    else if (_this.clickCount === 2) {
                        clearTimeout(_this.dblClickTimeOut);
                        _this.clickCount = 0;
                        _this.triggerDoubleClick(event);
                    }
                }
            };
            this.reset();
        }
        ClickService.prototype.reset = function () {
            this.singleClickHandlers = [];
            this.doubleClickHandlers = [];
        };
        ClickService.prototype.addSingleClickHandler = function (singleClickHandler) {
            this.singleClickHandlers.push(singleClickHandler);
        };
        ClickService.prototype.addDoubleClickHandler = function (doubleClickHandler) {
            this.doubleClickHandlers.push(doubleClickHandler);
        };
        ClickService.prototype.triggerSingleClick = function (event) {
            this.singleClickHandlers.forEach(function (handler) {
                handler(event);
            });
        };
        ClickService.prototype.triggerDoubleClick = function (event) {
            this.doubleClickHandlers.forEach(function (handler) {
                handler(event);
            });
        };
        return ClickService;
    }());
    ClickService.decorators = [
        { type: i0.Injectable }
    ];
    ClickService.ctorParameters = function () { return []; };

    // OpenSeadragon SVG Overlay plugin 0.0.4
    function createSvgOverlay() {
        if (!OpenSeadragon) {
            console.error('[openseadragon-svg-overlay] requires OpenSeadragon');
            return;
        }
        var svgNS = 'http://www.w3.org/2000/svg';
        // ----------
        var Overlay = /** @class */ (function () {
            function Overlay(viewer) {
                var self = this;
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
            Overlay.prototype.node = function () {
                return this._node;
            };
            // ----------
            Overlay.prototype.resize = function () {
                if (this._containerWidth !== this._viewer.container.clientWidth) {
                    this._containerWidth = this._viewer.container.clientWidth;
                    this._svg.setAttribute('width', this._containerWidth);
                }
                if (this._containerHeight !== this._viewer.container.clientHeight) {
                    this._containerHeight = this._viewer.container.clientHeight;
                    this._svg.setAttribute('height', this._containerHeight);
                }
                var p = this._viewer.viewport.pixelFromPoint(new OpenSeadragon.Point(0, 0), true);
                var zoom = this._viewer.viewport.getZoom(true);
                var rotation = this._viewer.viewport.getRotation();
                // TODO: Expose an accessor for _containerInnerSize in the OSD API so we don't have to use the private variable.
                var scale = this._viewer.viewport._containerInnerSize.x * zoom;
                this._node.setAttribute('transform', 'translate(' +
                    p.x +
                    ',' +
                    p.y +
                    ') scale(' +
                    scale +
                    ') rotate(' +
                    rotation +
                    ')');
            };
            // ----------
            Overlay.prototype.onClick = function (node, handler) {
                // TODO: Fast click for mobile browsers
                new OpenSeadragon.MouseTracker({
                    element: node,
                    clickHandler: handler
                }).setTracking(true);
            };
            return Overlay;
        }());
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

    var Hit = /** @class */ (function () {
        function Hit(fields) {
            this.id = 0;
            this.index = 0;
            if (fields) {
                this.id = fields.id || this.id;
                this.index = fields.index || this.index;
                this.label = fields.label || this.label;
                this.match = fields.match || this.match;
                this.before = fields.before || this.before;
                this.after = fields.after || this.after;
                this.rects = fields.rects || this.rects;
            }
        }
        return Hit;
    }());

    var SearchResult = /** @class */ (function () {
        function SearchResult(fields) {
            this.q = '';
            this.hits = [];
            if (fields) {
                this.q = fields.q || this.q;
                this.hits = fields.hits || this.hits;
            }
        }
        SearchResult.prototype.add = function (hit) {
            this.hits.push(hit);
        };
        SearchResult.prototype.get = function (index) {
            return new Hit(Object.assign({}, this.hits[index]));
        };
        SearchResult.prototype.size = function () {
            return this.hits.length;
        };
        SearchResult.prototype.last = function () {
            return this.get(this.size() - 1);
        };
        return SearchResult;
    }());

    var SearchResultBuilder = /** @class */ (function () {
        function SearchResultBuilder(q, manifest, iiifSearchResult) {
            this.q = q;
            this.manifest = manifest;
            this.iiifSearchResult = iiifSearchResult;
        }
        SearchResultBuilder.prototype.build = function () {
            var _this = this;
            var searchResult = new SearchResult();
            searchResult.q = this.q;
            var hits = [];
            if (this.iiifSearchResult && this.iiifSearchResult.hits) {
                this.iiifSearchResult.hits.forEach(function (hit, index) {
                    var e_1, _a;
                    var id = index;
                    var canvasIndex = -1;
                    var label = null;
                    var rects = [];
                    if (_this.manifest.sequences && _this.manifest.sequences[0].canvases) {
                        var resources = _this.findResources(hit);
                        try {
                            for (var resources_1 = __values(resources), resources_1_1 = resources_1.next(); !resources_1_1.done; resources_1_1 = resources_1.next()) {
                                var resource = resources_1_1.value;
                                canvasIndex = _this.findSequenceIndex(resource);
                                label = _this.findLabel(canvasIndex);
                                var on = resource.on;
                                var coords = on.substring(on.indexOf('=') + 1).split(',');
                                var rect = new Rect({
                                    x: parseInt(coords[0], 10),
                                    y: parseInt(coords[1], 10),
                                    width: parseInt(coords[2], 10),
                                    height: parseInt(coords[3], 10)
                                });
                                rects.push(rect);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (resources_1_1 && !resources_1_1.done && (_a = resources_1.return)) _a.call(resources_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    searchResult.add(new Hit({
                        id: id,
                        index: canvasIndex,
                        label: label,
                        match: hit.match,
                        before: hit.before,
                        after: hit.after,
                        rects: rects
                    }));
                });
                return searchResult;
            }
        };
        SearchResultBuilder.prototype.findResources = function (hit) {
            var e_2, _a;
            var resources = [];
            var _loop_1 = function (annotation) {
                var res = this_1.iiifSearchResult.resources.find(function (r) { return r['@id'] === annotation; });
                resources.push(res);
            };
            var this_1 = this;
            try {
                for (var _b = __values(hit.annotations), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var annotation = _c.value;
                    _loop_1(annotation);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return resources;
        };
        SearchResultBuilder.prototype.findSequenceIndex = function (resource) {
            var firstSequence = this.manifest.sequences[0];
            var on = resource.on;
            var id = on.substring(0, on.indexOf('#'));
            return firstSequence.canvases.findIndex(function (c) { return c.id === id; });
        };
        SearchResultBuilder.prototype.findLabel = function (index) {
            if (index === -1) {
                return null;
            }
            else {
                return this.manifest.sequences[0].canvases[index].label;
            }
        };
        return SearchResultBuilder;
    }());

    var IiifContentSearchService = /** @class */ (function () {
        function IiifContentSearchService(http) {
            this.http = http;
            this._currentSearchResult = new rxjs.BehaviorSubject(new SearchResult({}));
            this._searching = new rxjs.BehaviorSubject(false);
            this._currentQ = new rxjs.Subject();
            this._selected = new rxjs.BehaviorSubject(null);
        }
        IiifContentSearchService.prototype.destroy = function () {
            this._currentSearchResult.next(new SearchResult({}));
            this._selected.next(null);
        };
        Object.defineProperty(IiifContentSearchService.prototype, "onQChange", {
            get: function () {
                return this._currentQ.asObservable().pipe(operators.distinctUntilChanged());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(IiifContentSearchService.prototype, "onChange", {
            get: function () {
                return this._currentSearchResult.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(IiifContentSearchService.prototype, "isSearching", {
            get: function () {
                return this._searching.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(IiifContentSearchService.prototype, "onSelected", {
            get: function () {
                return this._selected.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        IiifContentSearchService.prototype.search = function (manifest, q) {
            var _this = this;
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
                .get(manifest.service.id + "?q=" + q)
                .pipe(operators.finalize(function () { return _this._searching.next(false); }))
                .subscribe(function (res) { return _this._currentSearchResult.next(_this.extractData(q, manifest, res)); }, function (err) { return _this.handleError; });
        };
        IiifContentSearchService.prototype.selected = function (hit) {
            this._selected.next(hit);
        };
        IiifContentSearchService.prototype.extractData = function (q, manifest, iiifSearchResult) {
            return new SearchResultBuilder(q, manifest, iiifSearchResult).build();
        };
        IiifContentSearchService.prototype.handleError = function (err) {
            var errMsg;
            if (err.error instanceof Error) {
                errMsg = err.error.message;
            }
            else {
                errMsg = err.error;
            }
            return rxjs.throwError(errMsg);
        };
        return IiifContentSearchService;
    }());
    IiifContentSearchService.decorators = [
        { type: i0.Injectable }
    ];
    IiifContentSearchService.ctorParameters = function () { return [
        { type: http.HttpClient }
    ]; };

    var ManifestUtils = /** @class */ (function () {
        function ManifestUtils() {
        }
        ManifestUtils.isManifestPaged = function (manifest) {
            return (manifest &&
                (manifest.viewingHint === 'paged' ||
                    (manifest.sequences && manifest.sequences[0].viewingHint === 'paged')));
        };
        return ManifestUtils;
    }());

    var GestureSettings = /** @class */ (function () {
        function GestureSettings() {
            this.scrollToZoom = false;
            this.clickToZoom = false;
            this.dblClickToZoom = false;
            this.pinchToZoom = false;
            this.flickEnabled = false;
            this.flickMinSpeed = 120;
            this.flickMomentum = 0.25;
            this.pinchRotate = false;
        }
        return GestureSettings;
    }());
    var GestureSettingsMouse = /** @class */ (function (_super) {
        __extends(GestureSettingsMouse, _super);
        function GestureSettingsMouse() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GestureSettingsMouse;
    }(GestureSettings));
    var GestureSettingsTouch = /** @class */ (function (_super) {
        __extends(GestureSettingsTouch, _super);
        function GestureSettingsTouch() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GestureSettingsTouch;
    }(GestureSettings));
    var GestureSettingsPen = /** @class */ (function (_super) {
        __extends(GestureSettingsPen, _super);
        function GestureSettingsPen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GestureSettingsPen;
    }(GestureSettings));
    var GestureSettingsUnknown = /** @class */ (function (_super) {
        __extends(GestureSettingsUnknown, _super);
        function GestureSettingsUnknown() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GestureSettingsUnknown;
    }(GestureSettings));

    var ControlAnchor;
    (function (ControlAnchor) {
        ControlAnchor[ControlAnchor["NONE"] = 0] = "NONE";
        ControlAnchor[ControlAnchor["TOP_LEFT"] = 1] = "TOP_LEFT";
        ControlAnchor[ControlAnchor["TOP_RIGHT"] = 2] = "TOP_RIGHT";
        ControlAnchor[ControlAnchor["BOTTOM_RIGHT"] = 3] = "BOTTOM_RIGHT";
        ControlAnchor[ControlAnchor["BOTTOM_LEFT"] = 4] = "BOTTOM_LEFT";
        ControlAnchor[ControlAnchor["ABSOLUTE"] = 5] = "ABSOLUTE";
    })(ControlAnchor || (ControlAnchor = {}));

    var Options = /** @class */ (function () {
        function Options() {
            this.id = 'openseadragon';
            this.tileSources = [];
            this.tabIndex = 0;
            this.xmlPath = null;
            this.prefixUrl = 'https://openseadragon.github.io/openseadragon/images/';
            this.debugMode = false;
            this.debugGridColor = '#08f';
            this.blendTime = 0;
            this.alwaysBlend = false;
            this.autoHideControls = true;
            this.immediateRender = false;
            this.defaultZoomLevel = 0;
            this.opacity = 1;
            this.compositeOperation = null;
            this.placeholderFillStyle = null;
            this.degrees = 0;
            this.minZoomLevel = this.defaultZoomLevel;
            this.maxZoomLevel = null;
            this.homeFillsViewer = false;
            this.panHorizontal = true;
            this.panVertical = false;
            this.constrainDuringPan = false;
            this.wrapHorizontal = false;
            this.wrapVertical = false;
            this.minZoomImageRatio = 1;
            this.maxZoomPixelRatio = 1;
            this.smoothTileEdgesMinZoom = 1;
            this.iOSDevice = true;
            this.autoResize = true;
            this.preserveImageSizeOnResize = true;
            this.minScrollDeltaTime = 50;
            this.pixelsPerWheelLine = 40;
            this.visibilityRatio = 1;
            this.viewportMargins = {};
            this.imageLoaderLimit = 0;
            this.clickTimeThreshold = 300;
            this.clickDistThreshold = 5;
            this.dblClickTimeThreshold = 300;
            this.dblClickDistThreshold = 20;
            this.springStiffness = 6.5;
            this.animationTime = ViewerOptions.transitions.OSDAnimationTime / 1000;
            this.gestureSettingsMouse = new GestureSettingsMouse();
            this.gestureSettingsTouch = new GestureSettingsTouch();
            this.gestureSettingsPen = new GestureSettingsPen();
            this.gestureSettingsUnknown = new GestureSettingsUnknown();
            this.zoomPerClick = 2.0;
            this.zoomPerScroll = 1.2;
            this.zoomPerSecond = 1.0;
            this.showNavigator = false;
            this.navigatorPosition = 'TOP_RIGHT';
            this.navigatorSizeRatio = 0.2;
            this.navigatorMaintainSizeRatio = false;
            this.navigatorTop = null;
            this.navigatorLeft = null;
            this.navigatorHeight = null;
            this.navigatorWidth = null;
            this.navigatorAutoResize = true;
            this.navigatorAutoFade = true;
            this.navigatorRotate = true;
            this.controlsFadeDelay = 2000;
            this.controlsFadeLength = 1500;
            this.maxImageCacheCount = 200;
            this.timeout = 30000;
            this.useCanvas = true;
            this.minPixelRatio = 0.5;
            this.mouseNavEnabled = true;
            this.showNavigationControl = false;
            this.navigationControlAnchor = ControlAnchor.TOP_LEFT;
            this.showZoomControl = true;
            this.showHomeControl = true;
            this.showFullPageControl = false;
            this.showRotationControl = false;
            this.showSequenceControl = false;
            this.sequenceControlAnchor = ControlAnchor.TOP_LEFT;
            this.navPrevNextWrap = false;
            this.zoomInButton = null;
            this.zoomOutButton = null;
            this.homeButton = null;
            this.previousButton = null;
            this.nextButton = null;
            this.sequenceMode = true;
            this.initialPage = 0;
            this.preserveViewport = false;
            this.preserveOverlays = false;
            this.showReferenceStrip = false;
            this.referenceStripScroll = 'horizontal';
            this.referenceStripElement = null;
            this.referenceStripHeight = null;
            this.referenceStripWidth = null;
            this.referenceStripPosition = 'BOTTOM_LEFT';
            this.referenceStripSizeRatio = 0.2;
            this.collectionMode = false;
            this.collectionRows = 1;
            this.collectionColumns = 0;
            this.collectionLayout = 'horizontal';
            this.collectionTileSize = 800;
            this.collectionTileMargin = 80;
            this.crossOriginPolicy = false;
            this.ajaxWithCredentials = false;
            this.loadTilesWithAjax = false;
            this.ajaxHeaders = null;
        }
        return Options;
    }());

    var PinchStatus = /** @class */ (function () {
        function PinchStatus() {
            this.active = false;
            this.previousGestureId = 0;
            this.shouldStop = false;
        }
        return PinchStatus;
    }());

    var Side;
    (function (Side) {
        Side[Side["LEFT"] = 0] = "LEFT";
        Side[Side["RIGHT"] = 1] = "RIGHT";
        Side[Side["TOP"] = 2] = "TOP";
        Side[Side["BOTTOM"] = 3] = "BOTTOM";
    })(Side || (Side = {}));

    var StyleService = /** @class */ (function () {
        function StyleService(zone) {
            this.zone = zone;
            this.colorSubject = new rxjs.ReplaySubject();
        }
        Object.defineProperty(StyleService.prototype, "onChange", {
            get: function () {
                return this.colorSubject.asObservable().pipe(operators.filter(function (c) { return c !== null; }), operators.distinctUntilChanged());
            },
            enumerable: false,
            configurable: true
        });
        StyleService.prototype.init = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                rxjs.interval(1000)
                    .pipe(operators.tap(function () {
                    var previousRgbColor = _this.currentRgbColor;
                    var currentRgbColor = _this.getComputedBackgroundColor(1);
                    if (previousRgbColor !== currentRgbColor) {
                        _this.currentRgbColor = currentRgbColor;
                        _this.colorSubject.next(currentRgbColor);
                    }
                }))
                    .subscribe();
            });
        };
        StyleService.prototype.convertToRgba = function (rgbColor, opacity) {
            return rgbColor.replace(/rgb/i, 'rgba').replace(/\)/i, "," + opacity + ")");
        };
        StyleService.prototype.getComputedBackgroundColor = function (opacity) {
            var matAppBackground = document.getElementsByClassName('mat-app-background');
            var matSidenavContainer = document.getElementsByTagName('mat-sidenav-container');
            if (matAppBackground.length > 0) {
                return this.getComputedStyle(matAppBackground[0], 'background-color');
            }
            else if (matSidenavContainer.length > 0) {
                return this.getComputedStyle(matSidenavContainer[0], 'background-color');
            }
            else {
                return null;
            }
        };
        StyleService.prototype.getComputedStyle = function (el, property) {
            return window.getComputedStyle(el, null).getPropertyValue(property);
        };
        return StyleService;
    }());
    StyleService.ɵprov = i0.ɵɵdefineInjectable({ factory: function StyleService_Factory() { return new StyleService(i0.ɵɵinject(i0.NgZone)); }, token: StyleService, providedIn: "root" });
    StyleService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    StyleService.ctorParameters = function () { return [
        { type: i0.NgZone }
    ]; };

    var ViewerLayoutService = /** @class */ (function () {
        function ViewerLayoutService(mediaObserver) {
            this.mediaObserver = mediaObserver;
            this.mimeConfig = new MimeViewerConfig();
            this.subject = new rxjs.BehaviorSubject(this.mimeConfig.initViewerLayout);
        }
        ViewerLayoutService.prototype.init = function (isPagedManifest) {
            if (this.mimeConfig.initViewerLayout === ViewerLayout.TWO_PAGE &&
                isPagedManifest &&
                !this.isMobile()) {
                this._layout = ViewerLayout.TWO_PAGE;
                this.change();
            }
            else {
                this._layout = ViewerLayout.ONE_PAGE;
                this.change();
            }
        };
        Object.defineProperty(ViewerLayoutService.prototype, "onChange", {
            get: function () {
                return this.subject.asObservable().pipe(operators.distinctUntilChanged());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ViewerLayoutService.prototype, "layout", {
            get: function () {
                return this._layout;
            },
            enumerable: false,
            configurable: true
        });
        ViewerLayoutService.prototype.setLayout = function (viewerLayout) {
            this._layout = viewerLayout;
            this.change();
        };
        ViewerLayoutService.prototype.toggle = function () {
            if (this._layout === ViewerLayout.TWO_PAGE) {
                this.setLayout(ViewerLayout.ONE_PAGE);
            }
            else if (this._layout === ViewerLayout.ONE_PAGE) {
                this.setLayout(ViewerLayout.TWO_PAGE);
            }
        };
        ViewerLayoutService.prototype.change = function () {
            this.subject.next(this._layout);
        };
        ViewerLayoutService.prototype.isMobile = function () {
            return this.mediaObserver.isActive('lt-md');
        };
        return ViewerLayoutService;
    }());
    ViewerLayoutService.decorators = [
        { type: i0.Injectable }
    ];
    ViewerLayoutService.ctorParameters = function () { return [
        { type: flexLayout.MediaObserver }
    ]; };

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

    var NavigatorCalculateNextCanvasGroupStrategy = /** @class */ (function () {
        function NavigatorCalculateNextCanvasGroupStrategy() {
        }
        NavigatorCalculateNextCanvasGroupStrategy.prototype.calculateNextCanvasGroup = function (criteria) {
            var direction = criteria.direction;
            var currentCanvasGroupIndex = criteria.currentCanvasGroupIndex;
            var nextCanvasGroup = 1;
            nextCanvasGroup =
                direction === Direction.NEXT ? nextCanvasGroup : nextCanvasGroup * -1;
            nextCanvasGroup = currentCanvasGroupIndex + nextCanvasGroup;
            return nextCanvasGroup;
        };
        return NavigatorCalculateNextCanvasGroupStrategy;
    }());

    var DashboardModeCalculateNextCanvasGroupStrategy = /** @class */ (function () {
        function DashboardModeCalculateNextCanvasGroupStrategy() {
        }
        DashboardModeCalculateNextCanvasGroupStrategy.prototype.calculateNextCanvasGroup = function (criteria) {
            var speed = criteria.speed;
            var direction = criteria.direction;
            var currentCanvasGroupIndex = criteria.currentCanvasGroupIndex;
            var currentCanvasGroupCenter = criteria.currentCanvasGroupCenter;
            var nextCanvasGroup;
            var canvasGroupDelta = this.calculateNumberOfCanvasGroupsToGo(speed);
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
        };
        DashboardModeCalculateNextCanvasGroupStrategy.prototype.calculateNumberOfCanvasGroupsToGo = function (speed) {
            if (speed < 500) {
                return 0;
            }
            else if (speed >= 500 && speed < 1500) {
                return 1;
            }
            else if (speed >= 1500 && speed < 2500) {
                return 3;
            }
            else if (speed >= 2500 && speed < 3500) {
                return 5;
            }
            else {
                return 10;
            }
        };
        return DashboardModeCalculateNextCanvasGroupStrategy;
    }());

    var PageModeCalculateNextCanvasGroupStrategy = /** @class */ (function () {
        function PageModeCalculateNextCanvasGroupStrategy() {
        }
        PageModeCalculateNextCanvasGroupStrategy.prototype.calculateNextCanvasGroup = function (criteria) {
            var isNewCanvasGroupInCenter = criteria.currentCanvasGroupIndex !== criteria.currentCanvasGroupCenter;
            var speed = criteria.speed;
            var direction = criteria.direction;
            var nextCanvasGroup = criteria.currentCanvasGroupIndex;
            if (speed >= 200) {
                var diff = direction === Direction.LEFT ? 1 : -1;
                nextCanvasGroup =
                    criteria.viewingDirection === ViewingDirection.LTR
                        ? criteria.currentCanvasGroupIndex + diff
                        : criteria.currentCanvasGroupIndex - diff;
            }
            else if (isNewCanvasGroupInCenter) {
                nextCanvasGroup = criteria.currentCanvasGroupCenter;
            }
            return nextCanvasGroup;
        };
        return PageModeCalculateNextCanvasGroupStrategy;
    }());

    var PageZoomedModeCalculateNextCanvasGroupStrategy = /** @class */ (function () {
        function PageZoomedModeCalculateNextCanvasGroupStrategy() {
        }
        PageZoomedModeCalculateNextCanvasGroupStrategy.prototype.calculateNextCanvasGroup = function (criteria) {
            var direction = criteria.direction;
            var currentCanvasGroupIndex = criteria.currentCanvasGroupIndex;
            var canvasGroupEndHitCountReached = criteria.canvasGroupEndHitCountReached;
            var nextCanvasGroup = canvasGroupEndHitCountReached ? 1 : 0;
            nextCanvasGroup =
                direction === Direction.LEFT ? nextCanvasGroup : nextCanvasGroup * -1;
            nextCanvasGroup =
                criteria.viewingDirection === ViewingDirection.LTR
                    ? currentCanvasGroupIndex + nextCanvasGroup
                    : currentCanvasGroupIndex - nextCanvasGroup;
            return nextCanvasGroup;
        };
        return PageZoomedModeCalculateNextCanvasGroupStrategy;
    }());

    var CalculateNextCanvasGroupFactory = /** @class */ (function () {
        function CalculateNextCanvasGroupFactory() {
        }
        CalculateNextCanvasGroupFactory.create = function (mode) {
            if (mode === exports.MimeViewerMode.DASHBOARD) {
                return new DashboardModeCalculateNextCanvasGroupStrategy();
            }
            else if (mode === exports.MimeViewerMode.PAGE) {
                return new PageModeCalculateNextCanvasGroupStrategy();
            }
            else if (mode === exports.MimeViewerMode.PAGE_ZOOMED) {
                return new PageZoomedModeCalculateNextCanvasGroupStrategy();
            }
            else {
                return new NavigatorCalculateNextCanvasGroupStrategy();
            }
        };
        return CalculateNextCanvasGroupFactory;
    }());

    var CanvasGroupMask = /** @class */ (function () {
        function CanvasGroupMask(viewer, styleService) {
            var _this = this;
            this.styleService = styleService;
            this.disableResize = false;
            this.destroyed = new rxjs.Subject();
            this.animationHandler = function () {
                _this.resize();
            };
            this.resizeHandler = function () {
                _this.setCenter();
                _this.resize();
            };
            this.canvasGroupPinchHandler = function () {
                _this.disableResize = false;
            };
            this.canvasGroupDragHandler = function (e) {
                if ((e.delta.x || e.delta.y) && e.speed > 0 && e.direction !== 0) {
                    _this.disableResize = true;
                }
            };
            this.canvasGroupDragEndHandler = function () {
                _this.disableResize = false;
                _this.resize();
            };
            this.viewer = viewer;
            styleService.onChange.pipe(operators.takeUntil(this.destroyed)).subscribe(function (c) {
                _this.backgroundColor = c;
                if (_this.leftMask) {
                    _this.leftMask.style('fill', _this.backgroundColor);
                }
                if (_this.rightMask) {
                    _this.rightMask.style('fill', _this.backgroundColor);
                }
            });
        }
        CanvasGroupMask.prototype.initialise = function (pageBounds, visible) {
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
        };
        CanvasGroupMask.prototype.destroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        CanvasGroupMask.prototype.changeCanvasGroup = function (pageBounds) {
            this.canvasGroupRect = pageBounds;
            this.resize();
        };
        CanvasGroupMask.prototype.show = function () {
            this.addHandlers();
            if (!this.leftMask || !this.rightMask) {
                return;
            }
            this.setCenter();
            this.resize();
            this.leftMask.attr('height', '100%');
            this.rightMask.attr('height', '100%');
        };
        CanvasGroupMask.prototype.hide = function () {
            this.removeHandlers();
            if (!this.leftMask || !this.rightMask) {
                return;
            }
            this.leftMask.attr('height', '0');
            this.rightMask.attr('height', '0');
        };
        CanvasGroupMask.prototype.addHandlers = function () {
            this.viewer.addHandler('animation', this.animationHandler);
            this.viewer.addHandler('resize', this.resizeHandler);
            this.viewer.addHandler('canvas-pinch', this.canvasGroupPinchHandler);
            this.viewer.addHandler('canvas-drag', this.canvasGroupDragHandler);
            this.viewer.addHandler('canvas-drag-end', this.canvasGroupDragEndHandler);
        };
        CanvasGroupMask.prototype.removeHandlers = function () {
            this.viewer.removeHandler('animation', this.animationHandler);
            this.viewer.removeHandler('resize', this.resizeHandler);
            this.viewer.removeHandler('canvas-pinch', this.canvasGroupPinchHandler);
            this.viewer.removeHandler('canvas-drag', this.canvasGroupDragHandler);
            this.viewer.removeHandler('canvas-drag-end', this.canvasGroupDragEndHandler);
        };
        CanvasGroupMask.prototype.addCanvasGroupMask = function () {
            var overlays = d3.select(this.viewer.svgOverlay().node().parentNode);
            var mask = overlays.append('g').attr('id', 'page-mask');
            this.leftMask = mask
                .append('rect')
                .attr('id', 'mime-left-page-mask')
                .attr('height', '100%')
                .attr('y', 0)
                .style('fill', this.backgroundColor);
            this.rightMask = mask
                .append('rect')
                .attr('id', 'mime-right-page-mask')
                .attr('height', '100%')
                .attr('y', 0)
                .style('fill', this.backgroundColor);
        };
        CanvasGroupMask.prototype.setCenter = function () {
            this.center = new OpenSeadragon$1.Point(this.viewer.viewport._containerInnerSize.x / 2, this.viewer.viewport._containerInnerSize.y / 2);
        };
        CanvasGroupMask.prototype.resize = function () {
            if (this.disableResize || !this.leftMask || !this.rightMask) {
                return;
            }
            var leftMaskRect = this.getLeftMaskRect();
            var rightMaskRect = this.getRightMaskRect();
            this.leftMask.attr('width', leftMaskRect.width).attr('x', leftMaskRect.x);
            this.rightMask
                .attr('width', rightMaskRect.width)
                .attr('x', Math.round(rightMaskRect.x));
        };
        CanvasGroupMask.prototype.getLeftMaskRect = function () {
            var imgBounds = new OpenSeadragon$1.Rect(this.canvasGroupRect.x, this.canvasGroupRect.y, this.canvasGroupRect.width, this.canvasGroupRect.height);
            var topLeft = this.viewer.viewport.viewportToViewerElementCoordinates(imgBounds.getTopLeft());
            var width = topLeft.x - ViewerOptions.overlays.canvasGroupMarginInPageView;
            if (width < 0) {
                width = 0;
            }
            return new Rect({
                x: 0,
                width: width
            });
        };
        CanvasGroupMask.prototype.getRightMaskRect = function () {
            var imgBounds = new OpenSeadragon$1.Rect(this.canvasGroupRect.x, this.canvasGroupRect.y, this.canvasGroupRect.width, this.canvasGroupRect.height);
            var topRight = this.viewer.viewport.viewportToViewerElementCoordinates(imgBounds.getTopRight());
            var width = this.viewer.viewport._containerInnerSize.x - topRight.x;
            var x = this.viewer.viewport._containerInnerSize.x -
                width +
                ViewerOptions.overlays.canvasGroupMarginInPageView;
            if (width < 0) {
                width = 0;
            }
            return new Rect({
                x: x,
                width: width
            });
        };
        return CanvasGroupMask;
    }());

    var DefaultGoToCanvasGroupStrategy = /** @class */ (function () {
        function DefaultGoToCanvasGroupStrategy(viewer, zoomStrategy, canvasService, modeService, config, viewingDirection) {
            this.viewer = viewer;
            this.zoomStrategy = zoomStrategy;
            this.canvasService = canvasService;
            this.modeService = modeService;
            this.config = config;
            this.viewingDirection = viewingDirection;
        }
        DefaultGoToCanvasGroupStrategy.prototype.goToCanvasGroup = function (canvasGroup) {
            var _this = this;
            var oldCanvasGroupIndex = this.canvasService.currentCanvasGroupIndex;
            this.canvasService.currentCanvasGroupIndex = this.canvasService.constrainToRange(canvasGroup.canvasGroupIndex);
            var newCanvasGroup = this.canvasService.getCanvasGroupRect(this.canvasService.currentCanvasGroupIndex);
            if (this.modeService.mode === exports.MimeViewerMode.PAGE_ZOOMED &&
                this.config.preserveZoomOnCanvasGroupChange) {
                var x = void 0;
                if (oldCanvasGroupIndex > canvasGroup.canvasGroupIndex) {
                    if (this.config.startOnTopOnCanvasGroupChange) {
                        var canvasGroupIndexes = this.canvasService.getCanvasesPerCanvasGroup(canvasGroup.canvasGroupIndex);
                        var previousCanvasIndex = canvasGroupIndexes[canvasGroupIndexes.length - 1];
                        var previousCanvasRect = this.canvasService.getCanvasRect(previousCanvasIndex);
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
                var y = this.config.startOnTopOnCanvasGroupChange
                    ? newCanvasGroup.y +
                        this.getViewportBounds().height / 2 -
                        new Options().collectionTileMargin
                    : this.getViewportCenter().y;
                this.panTo(x, y, canvasGroup.immediately);
            }
            else if (this.modeService.mode === exports.MimeViewerMode.PAGE_ZOOMED) {
                var oldCanvasGroupCenter = this.canvasService.getCanvasGroupRect(oldCanvasGroupIndex);
                this.panToCenter(oldCanvasGroupCenter, canvasGroup.immediately);
                this.zoomStrategy.goToHomeZoom();
                setTimeout(function () {
                    _this.panToCenter(newCanvasGroup, canvasGroup.immediately);
                    _this.modeService.mode = exports.MimeViewerMode.PAGE;
                }, ViewerOptions.transitions.OSDAnimationTime);
            }
            else {
                this.panToCenter(newCanvasGroup, canvasGroup.immediately);
            }
        };
        DefaultGoToCanvasGroupStrategy.prototype.goToPreviousCanvasGroup = function (currentCanvasIndex) {
            if (this.canvasService.currentCanvasGroupIndex > 0) {
                var viewportCenter = this.getViewportCenter();
                var currentCanvasGroupIndex = this.canvasService.findClosestCanvasGroupIndex(viewportCenter);
                var calculateNextCanvasGroupStrategy = CalculateNextCanvasGroupFactory.create(null);
                var newCanvasGroupIndex = calculateNextCanvasGroupStrategy.calculateNextCanvasGroup({
                    direction: Direction.PREVIOUS,
                    currentCanvasGroupIndex: currentCanvasGroupIndex,
                    currentCanvasGroupCenter: currentCanvasIndex,
                    viewingDirection: this.viewingDirection
                });
                this.goToCanvasGroup({
                    canvasGroupIndex: newCanvasGroupIndex,
                    immediately: false
                });
            }
        };
        DefaultGoToCanvasGroupStrategy.prototype.goToNextCanvasGroup = function (currentCanvasIndex) {
            if (this.canvasService.currentCanvasGroupIndex <
                this.canvasService.numberOfCanvasGroups) {
                var viewportCenter = this.getViewportCenter();
                var currentCanvasGroupIndex = this.canvasService.findClosestCanvasGroupIndex(viewportCenter);
                var calculateNextCanvasGroupStrategy = CalculateNextCanvasGroupFactory.create(null);
                var newCanvasGroupIndex = calculateNextCanvasGroupStrategy.calculateNextCanvasGroup({
                    direction: Direction.NEXT,
                    currentCanvasGroupIndex: currentCanvasGroupIndex,
                    currentCanvasGroupCenter: currentCanvasIndex,
                    viewingDirection: this.viewingDirection
                });
                this.goToCanvasGroup({
                    canvasGroupIndex: newCanvasGroupIndex,
                    immediately: false
                });
            }
        };
        DefaultGoToCanvasGroupStrategy.prototype.centerCurrentCanvas = function () {
            var currentCanvasGroupIndex = this.canvasService.currentCanvasGroupIndex;
            var currentCanvasGroupCenter = this.canvasService.getCanvasGroupRect(currentCanvasGroupIndex);
            this.panToCenter(currentCanvasGroupCenter, false);
        };
        DefaultGoToCanvasGroupStrategy.prototype.leftX = function (canvas) {
            return canvas.x + this.getViewportBounds().width / 2;
        };
        DefaultGoToCanvasGroupStrategy.prototype.rightX = function (canvas) {
            return canvas.x + canvas.width - this.getViewportBounds().width / 2;
        };
        DefaultGoToCanvasGroupStrategy.prototype.panToCenter = function (canvasGroup, immediately) {
            this.panTo(canvasGroup.centerX, canvasGroup.centerY, immediately);
        };
        DefaultGoToCanvasGroupStrategy.prototype.panTo = function (x, y, immediately) {
            this.viewer.viewport.panTo({
                x: x,
                y: y
            }, immediately);
        };
        DefaultGoToCanvasGroupStrategy.prototype.getViewportCenter = function () {
            return this.viewer.viewport.getCenter(true);
        };
        DefaultGoToCanvasGroupStrategy.prototype.getViewportBounds = function () {
            return this.viewer.viewport.getBounds(true);
        };
        return DefaultGoToCanvasGroupStrategy;
    }());

    var SwipeDragEndCounter = /** @class */ (function () {
        function SwipeDragEndCounter() {
            this.reset();
        }
        SwipeDragEndCounter.prototype.reset = function () {
            this.leftCount = 0;
            this.rightCount = 0;
        };
        /**
         * @param direction of swipe / pan
         * @param side hit by swipe
         */
        SwipeDragEndCounter.prototype.addHit = function (side, dir) {
            this.incrementSide(side);
            this.clearOppositeSideOfDragDirection(dir);
        };
        SwipeDragEndCounter.prototype.hitCountReached = function () {
            return this.leftCount >= 2 || this.rightCount >= 2;
        };
        SwipeDragEndCounter.prototype.incrementSide = function (side) {
            if (side === Side.LEFT) {
                this.leftCount++;
                this.rightCount = 0;
            }
            else if (side === Side.RIGHT) {
                this.rightCount++;
                this.leftCount = 0;
            }
        };
        /**
         * Clear opposite side if swiping in the other direction
         * @param Direction of swipe / pan
         */
        SwipeDragEndCounter.prototype.clearOppositeSideOfDragDirection = function (dir) {
            if (dir === Direction.LEFT) {
                this.leftCount = 0;
            }
            else if (dir === Direction.RIGHT) {
                this.rightCount = 0;
            }
        };
        return SwipeDragEndCounter;
    }());

    var SwipeUtils = /** @class */ (function () {
        function SwipeUtils() {
        }
        // Added threshold to prevent sensitive direction-calculation when zoomed in
        SwipeUtils.getSwipeDirection = function (start, end, useThreshold) {
            var deltaX = Math.abs(start.x - end.x);
            var deltaY = Math.abs(start.y - end.y);
            deltaX = useThreshold
                ? deltaX - ViewerOptions.pan.swipeDirectionThreshold
                : deltaX;
            if (start.x > end.x && deltaX >= deltaY) {
                return Direction.LEFT;
            }
            else if (start.x < end.x && deltaX >= deltaY) {
                return Direction.RIGHT;
            }
        };
        SwipeUtils.getSideIfPanningPastEndOfCanvasGroup = function (canvasGroupRect, vpBounds) {
            if (this.isPanningOutsideLeft(canvasGroupRect, vpBounds)) {
                return Side.LEFT;
            }
            else if (this.isPanningOutsideRight(canvasGroupRect, vpBounds)) {
                return Side.RIGHT;
            }
        };
        SwipeUtils.isPanningOutsideCanvasGroup = function (canvasGroupRect, vpBounds) {
            return (this.isPanningOutsideLeft(canvasGroupRect, vpBounds) ||
                this.isPanningOutsideRight(canvasGroupRect, vpBounds));
        };
        SwipeUtils.isPanningOutsideLeft = function (canvasGroupRect, vpBounds) {
            return vpBounds.x < canvasGroupRect.x;
        };
        SwipeUtils.isPanningOutsideRight = function (canvasGroupRect, vpBounds) {
            return (vpBounds.x + vpBounds.width > canvasGroupRect.x + canvasGroupRect.width);
        };
        /**
         *
         * @param direction Current computed direction, expressed as an
         * angle counterclockwise relative to the positive X axis (-pi to pi, in radians).
         * Only valid if speed > 0.
         */
        SwipeUtils.isDirectionInRightSemicircle = function (direction) {
            return direction > -Math.PI / 2 && direction < Math.PI / 2;
        };
        /**
         * @param direction @see isDirectionInRightSemicircle
         */
        SwipeUtils.isDirectionInLeftSemicircle = function (direction) {
            return !this.isDirectionInRightSemicircle(direction) || direction === 0; // fix for speed = 0
        };
        return SwipeUtils;
    }());

    var IiifTileSourceStrategy = /** @class */ (function () {
        function IiifTileSourceStrategy() {
        }
        IiifTileSourceStrategy.prototype.getTileSource = function (resource) {
            var tileSource;
            if (resource.service.service) {
                tileSource = resource.service;
            }
            else {
                tileSource = resource.service['@id'];
                tileSource = tileSource.startsWith('//')
                    ? "" + location.protocol + tileSource
                    : tileSource;
                tileSource = !tileSource.endsWith('/info.json')
                    ? tileSource + "/info.json"
                    : tileSource;
            }
            return tileSource;
        };
        return IiifTileSourceStrategy;
    }());

    var StaticImageTileSourceStrategy = /** @class */ (function () {
        function StaticImageTileSourceStrategy() {
        }
        StaticImageTileSourceStrategy.prototype.getTileSource = function (resource) {
            return {
                type: 'image',
                url: resource['@id']
            };
        };
        return StaticImageTileSourceStrategy;
    }());

    var TileSourceStrategyFactory = /** @class */ (function () {
        function TileSourceStrategyFactory() {
        }
        TileSourceStrategyFactory.create = function (resource) {
            if (resource.service) {
                return new IiifTileSourceStrategy();
            }
            else {
                return new StaticImageTileSourceStrategy();
            }
        };
        return TileSourceStrategyFactory;
    }());

    var Dimensions = /** @class */ (function () {
        function Dimensions(fields) {
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
        return Dimensions;
    }());

    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.numbersAreClose = function (thing, realThing, epsilon) {
            return Math.abs(thing - realThing) <= epsilon;
        };
        Utils.shortenDecimals = function (zoom, precision) {
            var short = Number(zoom).toPrecision(precision);
            return Number(short);
        };
        return Utils;
    }());

    var ZoomUtils = /** @class */ (function () {
        function ZoomUtils() {
        }
        /**
         *
         * @param Point in OSD-viewport-coordinates
         * @param Rect canvasGroupBounds
         */
        ZoomUtils.constrainPositionToCanvasGroup = function (point, canvasGroupBounds) {
            if (point.x < canvasGroupBounds.x) {
                point.x = canvasGroupBounds.x;
            }
            else if (point.x > canvasGroupBounds.x + canvasGroupBounds.width) {
                point.x = canvasGroupBounds.x + canvasGroupBounds.width;
            }
            return point;
        };
        ZoomUtils.constraintZoomFactor = function (zoomFactor, currentZoom, maxZoom) {
            var target = currentZoom * zoomFactor;
            return target > maxZoom ? (maxZoom / target) * zoomFactor : zoomFactor;
        };
        return ZoomUtils;
    }());

    var ZoomStrategy = /** @class */ (function () {
        function ZoomStrategy(viewer, canvasService, modeService, viewerLayoutService) {
            this.viewer = viewer;
            this.canvasService = canvasService;
            this.modeService = modeService;
            this.viewerLayoutService = viewerLayoutService;
        }
        ZoomStrategy.prototype.setMinZoom = function (mode) {
            this.viewer.viewport.minZoomLevel = this.getHomeZoomLevel(mode);
        };
        ZoomStrategy.prototype.getMinZoom = function () {
            return Utils.shortenDecimals(this.viewer.viewport.getMinZoom(), 5);
        };
        ZoomStrategy.prototype.getMaxZoom = function () {
            return Utils.shortenDecimals(this.viewer.viewport.getMaxZoom(), 5);
        };
        ZoomStrategy.prototype.getZoom = function () {
            return Utils.shortenDecimals(this.viewer.viewport.getZoom(true), 5);
        };
        ZoomStrategy.prototype.goToHomeZoom = function () {
            this.zoomTo(this.getHomeZoomLevel(this.modeService.mode));
            if (this.modeService.mode === exports.MimeViewerMode.PAGE_ZOOMED) {
                this.modeService.mode = exports.MimeViewerMode.PAGE;
            }
        };
        ZoomStrategy.prototype.zoomTo = function (level, position) {
            this.viewer.viewport.zoomTo(level, position);
        };
        ZoomStrategy.prototype.getHomeZoomLevel = function (mode) {
            if (!this.viewer || !this.canvasService) {
                return;
            }
            var canvasGroupHeight;
            var canvasGroupWidth;
            var viewportBounds;
            if (mode === exports.MimeViewerMode.DASHBOARD) {
                canvasGroupHeight = this.canvasService.getMaxHeight();
                canvasGroupWidth = this.canvasService.getMaxWidth();
                viewportBounds = this.getDashboardViewportBounds();
            }
            else {
                var currentCanvasGroupRect = this.canvasService.getCurrentCanvasGroupRect();
                canvasGroupHeight = currentCanvasGroupRect.height;
                canvasGroupWidth = currentCanvasGroupRect.width;
                viewportBounds = this.viewer.viewport.getBounds();
            }
            return this.getFittedZoomLevel(viewportBounds, canvasGroupHeight, canvasGroupWidth);
        };
        ZoomStrategy.prototype.zoomIn = function (zoomFactor, position) {
            if (typeof zoomFactor === 'undefined') {
                zoomFactor = ViewerOptions.zoom.zoomFactor;
            }
            if (typeof position !== 'undefined') {
                position = this.viewer.viewport.pointFromPixel(position);
                position = ZoomUtils.constrainPositionToCanvasGroup(position, this.canvasService.getCurrentCanvasGroupRect());
            }
            if (this.modeService.mode !== exports.MimeViewerMode.PAGE_ZOOMED) {
                this.modeService.mode = exports.MimeViewerMode.PAGE_ZOOMED;
            }
            this.zoomBy(zoomFactor, position);
        };
        ZoomStrategy.prototype.zoomOut = function (zoomFactor, position) {
            if (typeof zoomFactor === 'undefined') {
                zoomFactor = Math.pow(ViewerOptions.zoom.zoomFactor, -1);
            }
            if (typeof position !== 'undefined') {
                position = this.viewer.viewport.pointFromPixel(position);
                position = ZoomUtils.constrainPositionToCanvasGroup(position, this.canvasService.getCurrentCanvasGroupRect());
            }
            if (this.isViewportLargerThanCanvasGroup()) {
                this.modeService.mode = exports.MimeViewerMode.PAGE;
            }
            else {
                this.zoomBy(zoomFactor, position);
            }
        };
        ZoomStrategy.prototype.getDashboardViewportBounds = function () {
            if (!this.viewer) {
                return;
            }
            var homeZoomFactor = this.getHomeZoomFactor();
            var maxViewportDimensions = new Dimensions(d3.select(this.viewer.container.parentNode.parentNode)
                .node()
                .getBoundingClientRect());
            var viewportHeight = maxViewportDimensions.height -
                ViewerOptions.padding.header -
                ViewerOptions.padding.footer;
            var viewportWidth = maxViewportDimensions.width * homeZoomFactor;
            var viewportSizeInViewportCoordinates = this.viewer.viewport.deltaPointsFromPixels(new OpenSeadragon$1.Point(viewportWidth, viewportHeight));
            return new OpenSeadragon$1.Rect(0, 0, viewportSizeInViewportCoordinates.x, viewportSizeInViewportCoordinates.y);
        };
        ZoomStrategy.prototype.getFittedZoomLevel = function (viewportBounds, canvasGroupHeight, canvasGroupWidth) {
            var currentZoom = this.viewer.viewport.getZoom();
            var resizeRatio = viewportBounds.height / canvasGroupHeight;
            if (resizeRatio * canvasGroupWidth <= viewportBounds.width) {
                return Utils.shortenDecimals(resizeRatio * currentZoom, 5);
            }
            else {
                // Canvas group at full height is wider than viewport.  Return fit by width instead.
                return Utils.shortenDecimals((viewportBounds.width / canvasGroupWidth) * currentZoom, 5);
            }
        };
        ZoomStrategy.prototype.zoomBy = function (zoomFactor, position) {
            var currentZoom = this.viewer.viewport.getZoom(false);
            zoomFactor = ZoomUtils.constraintZoomFactor(zoomFactor, currentZoom, this.getMaxZoom());
            this.viewer.viewport.zoomBy(zoomFactor, position);
        };
        ZoomStrategy.prototype.isViewportLargerThanCanvasGroup = function () {
            var canvasGroupRec = this.canvasService.getCurrentCanvasGroupRect();
            var viewportBounds = this.viewer.viewport.getBounds();
            var pbWidth = Math.round(canvasGroupRec.width);
            var pbHeight = Math.round(canvasGroupRec.height);
            var vpWidth = Math.round(viewportBounds.width);
            var vpHeight = Math.round(viewportBounds.height);
            return vpHeight >= pbHeight || vpWidth >= pbWidth;
        };
        ZoomStrategy.prototype.getHomeZoomFactor = function () {
            return this.modeService.mode === exports.MimeViewerMode.DASHBOARD
                ? this.getDashboardZoomHomeFactor()
                : 1;
        };
        ZoomStrategy.prototype.getDashboardZoomHomeFactor = function () {
            return this.viewerLayoutService.layout === ViewerLayout.ONE_PAGE
                ? 0.85
                : 0.66;
        };
        return ZoomStrategy;
    }());
    var DefaultZoomStrategy = /** @class */ (function (_super) {
        __extends(DefaultZoomStrategy, _super);
        function DefaultZoomStrategy(viewer, canvasService, modeService, viewerLayoutService) {
            return _super.call(this, viewer, canvasService, modeService, viewerLayoutService) || this;
        }
        return DefaultZoomStrategy;
    }(ZoomStrategy));

    var ViewerService = /** @class */ (function () {
        function ViewerService(zone, clickService, canvasService, modeService, viewerLayoutService, iiifContentSearchService, styleService) {
            var _this = this;
            this.zone = zone;
            this.clickService = clickService;
            this.canvasService = canvasService;
            this.modeService = modeService;
            this.viewerLayoutService = viewerLayoutService;
            this.iiifContentSearchService = iiifContentSearchService;
            this.styleService = styleService;
            this.destroyed = new rxjs.Subject();
            this.isCanvasPressed = new rxjs.BehaviorSubject(false);
            this.currentCenter = new rxjs.Subject();
            this.currentCanvasIndex = new rxjs.BehaviorSubject(0);
            this.currentHit = new rxjs.BehaviorSubject(null);
            this.osdIsReady = new rxjs.BehaviorSubject(false);
            this.swipeDragEndCounter = new SwipeDragEndCounter();
            this.pinchStatus = new PinchStatus();
            this.rotation = new rxjs.BehaviorSubject(0);
            /**
             * Scroll-handler
             */
            this.scrollHandler = function (event) {
                var zoomFactor = Math.pow(ViewerOptions.zoom.zoomFactor, event.scroll);
                // Scrolling up
                if (event.scroll > 0) {
                    _this.zoomInGesture(event.position, zoomFactor);
                    // Scrolling down
                }
                else if (event.scroll < 0) {
                    _this.zoomOutGesture(event.position, zoomFactor);
                }
            };
            /**
             * Pinch-handler
             */
            this.pinchHandler = function (event) {
                _this.pinchStatus.active = true;
                var zoomFactor = event.distance / event.lastDistance;
                // Pinch Out
                if (event.distance >
                    event.lastDistance + ViewerOptions.zoom.pinchZoomThreshold) {
                    _this.zoomInPinchGesture(event, zoomFactor);
                    // Pinch In
                }
                else if (event.distance + ViewerOptions.zoom.pinchZoomThreshold <
                    event.lastDistance) {
                    _this.zoomOutPinchGesture(event, zoomFactor);
                }
            };
            /**
             * Single-click-handler
             * Single-click toggles between page/dashboard-mode if a page is hit
             */
            this.singleClickHandler = function (event) {
                var target = event.originalEvent.target;
                var tileIndex = _this.getOverlayIndexFromClickEvent(target);
                var requestedCanvasGroupIndex = _this.canvasService.findCanvasGroupByCanvasIndex(tileIndex);
                if (requestedCanvasGroupIndex) {
                    _this.canvasService.currentCanvasGroupIndex = requestedCanvasGroupIndex;
                }
                _this.modeService.toggleMode();
            };
            /**
             * Double-click-handler
             * Double-click dashboard-mode should go to page-mode
             * Double-click page-mode should
             *    a) Zoom in if page is fitted vertically, or
             *    b) Fit vertically if page is already zoomed in
             */
            this.dblClickHandler = function (event) {
                var target = event.originalEvent.target;
                // Page is fitted vertically, so dbl-click zooms in
                if (_this.modeService.mode === exports.MimeViewerMode.PAGE) {
                    _this.modeService.mode = exports.MimeViewerMode.PAGE_ZOOMED;
                    _this.zoomStrategy.zoomIn(ViewerOptions.zoom.dblClickZoomFactor, event.position);
                }
                else {
                    _this.modeService.mode = exports.MimeViewerMode.PAGE;
                    var canvasIndex = _this.getOverlayIndexFromClickEvent(target);
                    var requestedCanvasGroupIndex = _this.canvasService.findCanvasGroupByCanvasIndex(canvasIndex);
                    if (requestedCanvasGroupIndex >= 0) {
                        _this.canvasService.currentCanvasGroupIndex = requestedCanvasGroupIndex;
                    }
                }
            };
            this.dragHandler = function (e) {
                _this.viewer.panHorizontal = true;
                if (_this.modeService.mode === exports.MimeViewerMode.PAGE_ZOOMED) {
                    var dragEndPosision = e.position;
                    var canvasGroupRect = _this.canvasService.getCurrentCanvasGroupRect();
                    var vpBounds = _this.getViewportBounds();
                    var pannedPastCanvasGroup = SwipeUtils.getSideIfPanningPastEndOfCanvasGroup(canvasGroupRect, vpBounds);
                    var direction = e.direction;
                    if ((pannedPastCanvasGroup === Side.LEFT &&
                        SwipeUtils.isDirectionInRightSemicircle(direction)) ||
                        (pannedPastCanvasGroup === Side.RIGHT &&
                            SwipeUtils.isDirectionInLeftSemicircle(direction))) {
                        _this.viewer.panHorizontal = false;
                    }
                }
            };
        }
        Object.defineProperty(ViewerService.prototype, "onRotationChange", {
            get: function () {
                return this.rotation.asObservable().pipe(operators.distinctUntilChanged());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ViewerService.prototype, "onCenterChange", {
            get: function () {
                return this.currentCenter.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ViewerService.prototype, "onCanvasGroupIndexChange", {
            get: function () {
                return this.currentCanvasIndex.asObservable().pipe(operators.distinctUntilChanged());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ViewerService.prototype, "onHitChange", {
            get: function () {
                return this.currentHit.asObservable().pipe(operators.distinctUntilChanged());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ViewerService.prototype, "onOsdReadyChange", {
            get: function () {
                return this.osdIsReady.asObservable().pipe(operators.distinctUntilChanged());
            },
            enumerable: false,
            configurable: true
        });
        ViewerService.prototype.getViewer = function () {
            return this.viewer;
        };
        ViewerService.prototype.getTilesources = function () {
            return this.tileSources;
        };
        ViewerService.prototype.getOverlays = function () {
            return this.overlays;
        };
        ViewerService.prototype.getZoom = function () {
            return this.zoomStrategy.getZoom();
        };
        ViewerService.prototype.getMinZoom = function () {
            return this.zoomStrategy.getMinZoom();
        };
        ViewerService.prototype.getMaxZoom = function () {
            return this.zoomStrategy.getMaxZoom();
        };
        ViewerService.prototype.home = function () {
            if (!this.osdIsReady.getValue()) {
                return;
            }
            this.zoomStrategy.setMinZoom(this.modeService.mode);
            this.goToCanvasGroupStrategy.centerCurrentCanvas();
            this.zoomStrategy.goToHomeZoom();
        };
        ViewerService.prototype.goToPreviousCanvasGroup = function () {
            this.goToCanvasGroupStrategy.goToPreviousCanvasGroup(this.currentCanvasIndex.getValue());
        };
        ViewerService.prototype.goToNextCanvasGroup = function () {
            this.goToCanvasGroupStrategy.goToNextCanvasGroup(this.currentCanvasIndex.getValue());
        };
        ViewerService.prototype.goToCanvasGroup = function (canvasGroupIndex, immediately) {
            this.goToCanvasGroupStrategy.goToCanvasGroup({
                canvasGroupIndex: canvasGroupIndex,
                immediately: immediately
            });
        };
        ViewerService.prototype.goToCanvas = function (canvasIndex, immediately) {
            var canvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(canvasIndex);
            this.goToCanvasGroupStrategy.goToCanvasGroup({
                canvasGroupIndex: canvasGroupIndex,
                immediately: immediately
            });
        };
        ViewerService.prototype.highlight = function (searchResult) {
            var e_1, _a, e_2, _b;
            this.clearHightlight();
            if (this.viewer) {
                if (searchResult.q) {
                    this.currentSearch = searchResult;
                }
                var rotation = this.rotation.getValue();
                try {
                    for (var _c = __values(searchResult.hits), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var hit = _d.value;
                        try {
                            for (var _e = (e_2 = void 0, __values(hit.rects)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var rect = _f.value;
                                var canvasRect = this.canvasService.getCanvasRect(hit.index);
                                if (canvasRect) {
                                    var width = rect.width;
                                    var height = rect.height;
                                    var x = canvasRect.x;
                                    var y = canvasRect.y;
                                    /* hit rect are relative to each unrotated page canvasRect so x,y must be adjusted by the remaining space */
                                    switch (rotation) {
                                        case 0:
                                            x += rect.x;
                                            y += rect.y;
                                            break;
                                        case 90:
                                            x += canvasRect.width - rect.y - rect.height;
                                            y += rect.x;
                                            /* Flip height & width */
                                            width = rect.height;
                                            height = rect.width;
                                            break;
                                        case 180:
                                            x += canvasRect.width - (rect.x + rect.width);
                                            y += canvasRect.height - (rect.y + rect.height);
                                            break;
                                        case 270:
                                            x += rect.y;
                                            y += canvasRect.height - rect.x - rect.width;
                                            /* Flip height & width */
                                            width = rect.height;
                                            height = rect.width;
                                            break;
                                    }
                                    var currentOverlay = this.svgNode
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
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        ViewerService.prototype.highlightCurrentHit = function (hit) {
            this.svgNode.selectAll("g > rect.selected").attr('class', 'hit');
            this.svgNode
                .selectAll("g > rect[mimeHitIndex='" + hit.id + "']")
                .attr('class', 'hit selected');
        };
        ViewerService.prototype.clearHightlight = function () {
            if (this.svgNode) {
                this.svgNode.selectAll('.hit').remove();
                this.currentSearch = null;
            }
        };
        ViewerService.prototype.setUpViewer = function (manifest, config) {
            var _this = this;
            this.config = config;
            if (manifest && manifest.tileSource) {
                this.tileSources = manifest.tileSource;
                this.zone.runOutsideAngular(function () {
                    _this.manifest = manifest;
                    _this.isManifestPaged = ManifestUtils.isManifestPaged(_this.manifest);
                    _this.viewer = new OpenSeadragon.Viewer(Object.assign({}, _this.getOptions()));
                    createSvgOverlay();
                    _this.zoomStrategy = new DefaultZoomStrategy(_this.viewer, _this.canvasService, _this.modeService, _this.viewerLayoutService);
                    _this.goToCanvasGroupStrategy = new DefaultGoToCanvasGroupStrategy(_this.viewer, _this.zoomStrategy, _this.canvasService, _this.modeService, _this.config, _this.manifest.viewingDirection);
                    /*
                      This disables keyboard navigation in openseadragon.
                      We use s for opening search dialog and OSD use the same key for panning.
                      Issue: https://github.com/openseadragon/openseadragon/issues/794
                     */
                    _this.defaultKeyDownHandler = _this.viewer.innerTracker.keyDownHandler;
                    _this.disableKeyDownHandler();
                    _this.viewer.innerTracker.keyHandler = null;
                    _this.canvasService.reset();
                    _this.canvasGroupMask = new CanvasGroupMask(_this.viewer, _this.styleService);
                });
                this.addToWindow();
                this.setupOverlays();
                this.createOverlays();
                this.addEvents();
                this.addSubscriptions();
            }
        };
        ViewerService.prototype.addSubscriptions = function () {
            var _this = this;
            this.modeService.onChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (mode) {
                _this.modeChanged(mode);
            });
            this.zone.runOutsideAngular(function () {
                _this.onCenterChange
                    .pipe(operators.takeUntil(_this.destroyed), operators.sample(rxjs.interval(500)))
                    .subscribe(function (center) {
                    _this.calculateCurrentCanvasGroup(center);
                    if (center && center !== null) {
                        _this.osdIsReady.next(true);
                    }
                });
            });
            this.canvasService.onCanvasGroupIndexChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (canvasGroupIndex) {
                _this.swipeDragEndCounter.reset();
                if (canvasGroupIndex !== -1) {
                    _this.canvasGroupMask.changeCanvasGroup(_this.canvasService.getCanvasGroupRect(canvasGroupIndex));
                    if (_this.modeService.mode === exports.MimeViewerMode.PAGE) {
                        _this.zoomStrategy.goToHomeZoom();
                    }
                }
            });
            this.onOsdReadyChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (state) {
                if (state) {
                    _this.initialCanvasGroupLoaded();
                    _this.currentCenter.next(_this.viewer.viewport.getCenter(true));
                }
            });
            this.viewerLayoutService.onChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (state) {
                _this.layoutPages();
            });
            this.iiifContentSearchService.onSelected
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (hit) {
                if (hit) {
                    _this.highlightCurrentHit(hit);
                    _this.goToCanvas(hit.index, false);
                }
            });
            this.onRotationChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (rotation) {
                _this.layoutPages();
            });
        };
        ViewerService.prototype.layoutPages = function () {
            if (this.osdIsReady.getValue()) {
                var currentCanvasIndex = this.canvasService.currentCanvasIndex;
                this.destroy(true);
                this.setUpViewer(this.manifest, this.config);
                this.goToCanvasGroupStrategy.goToCanvasGroup({
                    canvasGroupIndex: this.canvasService.findCanvasGroupByCanvasIndex(currentCanvasIndex),
                    immediately: false
                });
                // Recreate highlights if there is an active search going on
                if (this.currentSearch) {
                    this.highlight(this.currentSearch);
                }
            }
        };
        ViewerService.prototype.addToWindow = function () {
            window.openSeadragonViewer = this.viewer;
        };
        ViewerService.prototype.setupOverlays = function () {
            this.svgOverlay = this.viewer.svgOverlay();
            this.svgNode = d3.select(this.svgOverlay.node());
        };
        ViewerService.prototype.disableKeyDownHandler = function () {
            this.viewer.innerTracker.keyDownHandler = null;
        };
        ViewerService.prototype.resetKeyDownHandler = function () {
            this.viewer.innerTracker.keyDownHandler = this.defaultKeyDownHandler;
        };
        /**
         *
         * @param layoutSwitch true if switching between layouts
         * to keep current search-state and rotation
         */
        ViewerService.prototype.destroy = function (layoutSwitch) {
            this.osdIsReady.next(false);
            this.currentCenter.next(null);
            if (this.viewer != null && this.viewer.isOpen()) {
                if (this.viewer.container != null) {
                    d3.select(this.viewer.container.parentNode).style('opacity', '0');
                }
                this.viewer.destroy();
            }
            this.destroyed.next();
            this.overlays = null;
            this.canvasService.reset();
            if (this.canvasGroupMask) {
                this.canvasGroupMask.destroy();
            }
            // Keep search-state and rotation only if layout-switch
            if (!layoutSwitch) {
                this.currentSearch = null;
                this.iiifContentSearchService.destroy();
                this.rotation.next(0);
            }
        };
        ViewerService.prototype.addEvents = function () {
            var _this = this;
            this.clickService.reset();
            this.clickService.addSingleClickHandler(this.singleClickHandler);
            this.clickService.addDoubleClickHandler(this.dblClickHandler);
            this.viewer.addHandler('animation-finish', function () {
                _this.currentCenter.next(_this.viewer.viewport.getCenter(true));
            });
            this.viewer.addHandler('canvas-click', this.clickService.click);
            this.viewer.addHandler('canvas-double-click', function (e) { return (e.preventDefaultAction = true); });
            this.viewer.addHandler('canvas-press', function (e) {
                _this.pinchStatus.active = false;
                _this.dragStartPosition = e.position;
                _this.isCanvasPressed.next(true);
            });
            this.viewer.addHandler('canvas-release', function () { return _this.isCanvasPressed.next(false); });
            this.viewer.addHandler('canvas-scroll', this.scrollHandler);
            this.viewer.addHandler('canvas-pinch', this.pinchHandler);
            this.viewer.addHandler('canvas-drag', function (e) { return _this.dragHandler(e); });
            this.viewer.addHandler('canvas-drag-end', function (e) { return _this.swipeToCanvasGroup(e); });
            this.viewer.addHandler('animation', function (e) {
                _this.currentCenter.next(_this.viewer.viewport.getCenter(true));
            });
        };
        ViewerService.prototype.zoomIn = function (zoomFactor, position) {
            this.zoomStrategy.zoomIn(zoomFactor, position);
        };
        ViewerService.prototype.zoomOut = function (zoomFactor, position) {
            this.zoomStrategy.zoomOut(zoomFactor, position);
        };
        ViewerService.prototype.rotate = function () {
            if (this.osdIsReady.getValue()) {
                this.rotation.next((this.rotation.getValue() + 90) % 360);
            }
        };
        /**
         * Callback for mode-change
         * @param mode ViewerMode
         */
        ViewerService.prototype.modeChanged = function (mode) {
            if (mode.currentValue === exports.MimeViewerMode.DASHBOARD) {
                this.viewer.panVertical = false;
                this.toggleToDashboard();
                this.disableKeyDownHandler();
            }
            else if (mode.currentValue === exports.MimeViewerMode.PAGE) {
                this.viewer.panVertical = false;
                this.toggleToPage();
                this.disableKeyDownHandler();
            }
            else if (mode.currentValue === exports.MimeViewerMode.PAGE_ZOOMED) {
                this.viewer.panVertical = true;
                this.resetKeyDownHandler();
            }
        };
        /**
         * Switches to DASHBOARD-mode, repositions canvas group and removes max-width on viewer
         */
        ViewerService.prototype.toggleToDashboard = function () {
            if (!this.canvasService.isCurrentCanvasGroupValid()) {
                return;
            }
            this.goToCanvasGroupStrategy.goToCanvasGroup({
                canvasGroupIndex: this.canvasService.currentCanvasGroupIndex,
                immediately: false
            });
            this.canvasGroupMask.hide();
            this.zoomStrategy.setMinZoom(exports.MimeViewerMode.DASHBOARD);
            this.zoomStrategy.goToHomeZoom();
        };
        /**
         * Switches to PAGE-mode, centers current canvas group and repositions other canvas groups
         */
        ViewerService.prototype.toggleToPage = function () {
            if (!this.canvasService.isCurrentCanvasGroupValid()) {
                return;
            }
            this.goToCanvasGroupStrategy.goToCanvasGroup({
                canvasGroupIndex: this.canvasService.currentCanvasGroupIndex,
                immediately: false
            });
            this.canvasGroupMask.show();
            this.zoomStrategy.setMinZoom(exports.MimeViewerMode.PAGE);
            this.zoomStrategy.goToHomeZoom();
        };
        /**
         *
         * @param point to zoom to. If not set, the viewer will zoom to center
         */
        ViewerService.prototype.zoomInGesture = function (position, zoomFactor) {
            if (this.modeService.mode === exports.MimeViewerMode.DASHBOARD) {
                this.modeService.mode = exports.MimeViewerMode.PAGE;
            }
            else {
                if (position) {
                    this.zoomStrategy.zoomIn(zoomFactor, position);
                }
                else {
                    this.zoomStrategy.zoomIn();
                }
            }
        };
        ViewerService.prototype.zoomOutGesture = function (position, zoomFactor) {
            if (this.modeService.mode === exports.MimeViewerMode.PAGE_ZOOMED) {
                this.zoomStrategy.zoomOut(zoomFactor, position);
            }
            else if (this.modeService.mode === exports.MimeViewerMode.PAGE) {
                this.modeService.mode = exports.MimeViewerMode.DASHBOARD;
            }
        };
        /**
         * Process zoom in pinch gesture (pinch out)
         *
         * Toggle to page mode and Zoom in
         *
         * @param event from pinch gesture
         */
        ViewerService.prototype.zoomInPinchGesture = function (event, zoomFactor) {
            if (this.modeService.mode === exports.MimeViewerMode.DASHBOARD) {
                this.modeService.mode = exports.MimeViewerMode.PAGE;
            }
            else {
                this.zoomIn(zoomFactor, this.dragStartPosition || event.center);
            }
        };
        /**
         * Process zoom out pinch gesture (pinch in)
         *
         * Zoom out and toggle to dashboard when all zoomed out.
         * Stop between zooming out and toggling to dashboard.
         *
         * @param event from pinch gesture
         */
        ViewerService.prototype.zoomOutPinchGesture = function (event, zoomFactor) {
            var gestureId = event.gesturePoints[0].id;
            if (this.modeService.mode === exports.MimeViewerMode.PAGE_ZOOMED) {
                this.pinchStatus.shouldStop = true;
                this.zoomStrategy.zoomOut(zoomFactor, event.center);
            }
            else if (this.modeService.mode === exports.MimeViewerMode.PAGE) {
                if (!this.pinchStatus.shouldStop ||
                    gestureId === this.pinchStatus.previousGestureId + 2) {
                    this.pinchStatus.shouldStop = false;
                    this.modeService.toggleMode();
                }
                this.pinchStatus.previousGestureId = gestureId;
            }
        };
        /**
         * Checks if hit element is a <rect>-element
         * @param target
         */
        ViewerService.prototype.isCanvasGroupHit = function (target) {
            return target instanceof SVGRectElement;
        };
        /**
         * Iterates tilesources and adds them to viewer
         * Creates svg clickable overlays for each tile
         */
        ViewerService.prototype.createOverlays = function () {
            var _this = this;
            this.overlays = [];
            var canvasRects = [];
            var calculateCanvasGroupPositionStrategy = CalculateCanvasGroupPositionFactory.create(this.viewerLayoutService.layout, this.isManifestPaged);
            var isTwoPageView = this.viewerLayoutService.layout === ViewerLayout.TWO_PAGE;
            var rotation = this.rotation.getValue();
            var group = this.svgNode.append('g').attr('class', 'page-group');
            this.tileSources.forEach(function (tile, i) {
                var position = calculateCanvasGroupPositionStrategy.calculateCanvasGroupPosition({
                    canvasGroupIndex: i,
                    canvasSource: tile,
                    previousCanvasGroupPosition: canvasRects[i - 1],
                    viewingDirection: _this.manifest.viewingDirection
                }, rotation);
                canvasRects.push(position);
                var tileSourceStrategy = TileSourceStrategyFactory.create(tile);
                var tileSource = tileSourceStrategy.getTileSource(tile);
                _this.zone.runOutsideAngular(function () {
                    var rotated = rotation === 90 || rotation === 270;
                    var bounds;
                    /* Because image scaling is performed before rotation,
                     * we must invert width & height and translate position so that tile rotation ends up correct
                     */
                    if (rotated) {
                        bounds = new OpenSeadragon.Rect(position.x + (position.width - position.height) / 2, position.y - (position.width - position.height) / 2, position.height, position.width);
                    }
                    else {
                        bounds = new OpenSeadragon.Rect(position.x, position.y, position.width, position.height);
                    }
                    _this.viewer.addTiledImage({
                        index: i,
                        tileSource: tileSource,
                        fitBounds: bounds,
                        degrees: rotation
                    });
                });
                if (isTwoPageView && i % 2 !== 0) {
                    group = _this.svgNode.append('g').attr('class', 'page-group');
                }
                var currentOverlay = group
                    .append('rect')
                    .attr('x', position.x)
                    .attr('y', position.y)
                    .attr('width', position.width)
                    .attr('height', position.height)
                    .attr('class', 'tile');
                // Make custom borders if current layout is two-paged
                if (isTwoPageView) {
                    if (i % 2 === 0 && i !== 0) {
                        var noLeftStrokeStyle = Number(position.width * 2 + position.height) +
                            ', ' +
                            position.width * 2;
                        currentOverlay.style('stroke-dasharray', noLeftStrokeStyle);
                    }
                    else if (i % 2 !== 0 && i !== 0) {
                        var noRightStrokeStyle = position.width +
                            ', ' +
                            position.height +
                            ', ' +
                            Number(position.width * 2 + position.height);
                        currentOverlay.style('stroke-dasharray', noRightStrokeStyle);
                    }
                }
                var currentOverlayNode = currentOverlay.node();
                _this.overlays[i] = currentOverlayNode;
            });
            var layout = this.viewerLayoutService.layout === ViewerLayout.ONE_PAGE ||
                !this.isManifestPaged
                ? ViewerLayout.ONE_PAGE
                : ViewerLayout.TWO_PAGE;
            this.canvasService.addAll(canvasRects, layout);
        };
        /**
         * Sets viewer size and opacity once the first canvas group has fully loaded
         */
        ViewerService.prototype.initialCanvasGroupLoaded = function () {
            this.home();
            this.canvasGroupMask.initialise(this.canvasService.getCurrentCanvasGroupRect(), this.modeService.mode !== exports.MimeViewerMode.DASHBOARD);
            d3.select(this.viewer.container.parentNode)
                .transition()
                .duration(ViewerOptions.transitions.OSDAnimationTime)
                .style('opacity', '1');
        };
        /**
         * Returns overlay-index for click-event if hit
         * @param target hit <rect>
         */
        ViewerService.prototype.getOverlayIndexFromClickEvent = function (target) {
            if (this.isCanvasGroupHit(target)) {
                var requestedCanvasGroup = this.overlays.indexOf(target);
                if (requestedCanvasGroup >= 0) {
                    return requestedCanvasGroup;
                }
            }
            return -1;
        };
        ViewerService.prototype.getOptions = function () {
            var options = new Options();
            options.ajaxWithCredentials = this.config.withCredentials;
            options.loadTilesWithAjax = this.config.loadTilesWithAjax;
            options.crossOriginPolicy = this.config.crossOriginPolicy;
            options.ajaxHeaders = this.config.ajaxHeaders;
            return options;
        };
        ViewerService.prototype.calculateCurrentCanvasGroup = function (center) {
            if (center) {
                var currentCanvasGroupIndex = this.canvasService.findClosestCanvasGroupIndex(center);
                this.currentCanvasIndex.next(currentCanvasGroupIndex);
            }
        };
        ViewerService.prototype.swipeToCanvasGroup = function (e) {
            // Don't swipe on pinch actions
            if (this.pinchStatus.active) {
                return;
            }
            var speed = e.speed;
            var dragEndPosision = e.position;
            var isCanvasGroupZoomed = this.modeService.mode === exports.MimeViewerMode.PAGE_ZOOMED;
            var canvasGroupRect = this.canvasService.getCurrentCanvasGroupRect();
            var viewportBounds = this.getViewportBounds();
            var direction = SwipeUtils.getSwipeDirection(this.dragStartPosition, dragEndPosision, isCanvasGroupZoomed);
            var currentCanvasGroupIndex = this.canvasService
                .currentCanvasGroupIndex;
            var calculateNextCanvasGroupStrategy = CalculateNextCanvasGroupFactory.create(this.modeService.mode);
            var pannedPastSide, canvasGroupEndHitCountReached;
            if (this.modeService.mode === exports.MimeViewerMode.PAGE_ZOOMED) {
                pannedPastSide = SwipeUtils.getSideIfPanningPastEndOfCanvasGroup(canvasGroupRect, viewportBounds);
                this.swipeDragEndCounter.addHit(pannedPastSide, direction);
                canvasGroupEndHitCountReached = this.swipeDragEndCounter.hitCountReached();
            }
            var newCanvasGroupIndex = calculateNextCanvasGroupStrategy.calculateNextCanvasGroup({
                currentCanvasGroupCenter: this.currentCanvasIndex.getValue(),
                speed: speed,
                direction: direction,
                currentCanvasGroupIndex: currentCanvasGroupIndex,
                canvasGroupEndHitCountReached: canvasGroupEndHitCountReached,
                viewingDirection: this.manifest.viewingDirection
            });
            if (this.modeService.mode === exports.MimeViewerMode.DASHBOARD ||
                this.modeService.mode === exports.MimeViewerMode.PAGE ||
                (canvasGroupEndHitCountReached && direction)) {
                this.goToCanvasGroupStrategy.goToCanvasGroup({
                    canvasGroupIndex: newCanvasGroupIndex,
                    immediately: false,
                    direction: direction
                });
            }
        };
        ViewerService.prototype.getViewportBounds = function () {
            return this.viewer.viewport.getBounds();
        };
        return ViewerService;
    }());
    ViewerService.decorators = [
        { type: i0.Injectable }
    ];
    ViewerService.ctorParameters = function () { return [
        { type: i0.NgZone },
        { type: ClickService },
        { type: CanvasService },
        { type: ModeService },
        { type: ViewerLayoutService },
        { type: IiifContentSearchService },
        { type: StyleService }
    ]; };

    var BuilderUtils = /** @class */ (function () {
        function BuilderUtils() {
        }
        BuilderUtils.extractId = function (value) {
            return value['@id'];
        };
        BuilderUtils.extracType = function (value) {
            return value['@type'];
        };
        BuilderUtils.extractContext = function (value) {
            return value['@context'];
        };
        BuilderUtils.extractViewingDirection = function (value) {
            if (value['viewingDirection'] === 'left-to-right') {
                return ViewingDirection.LTR;
            }
            else if (value['viewingDirection'] === 'right-to-left') {
                return ViewingDirection.RTL;
            }
        };
        BuilderUtils.findCanvasIndex = function (canvases, sequences) {
            var index = -1;
            if (sequences[0] && sequences[0].canvases && canvases[0]) {
                index = sequences[0].canvases.findIndex(function (canvas) { return canvas.id === canvases[0]; });
            }
            return index;
        };
        return BuilderUtils;
    }());

    var SizesBuilder = /** @class */ (function () {
        function SizesBuilder(sizes) {
            this.sizes = sizes;
        }
        SizesBuilder.prototype.build = function () {
            var sizes = [];
            if (this.sizes) {
                for (var i = 0; i < this.sizes.length; i++) {
                    var size = this.sizes[i];
                    sizes.push(new Size(size.width, size.height));
                }
            }
            return sizes;
        };
        return SizesBuilder;
    }());

    var TilesBuilder = /** @class */ (function () {
        function TilesBuilder(tiles) {
            this.tiles = tiles;
        }
        TilesBuilder.prototype.build = function () {
            var tiles = [];
            if (this.tiles) {
                for (var i = 0; i < this.tiles.length; i++) {
                    var tile = this.tiles[i];
                    tiles.push(new Tile({
                        width: tile.width,
                        scaleFactors: tile.scaleFactors
                    }));
                }
            }
            return tiles;
        };
        return TilesBuilder;
    }());

    var ServiceBuilder = /** @class */ (function () {
        function ServiceBuilder(service) {
            this.service = service;
        }
        ServiceBuilder.prototype.build = function () {
            if (this.service) {
                return new Service({
                    id: BuilderUtils.extractId(this.service),
                    context: BuilderUtils.extractContext(this.service),
                    protocol: this.service.protocol,
                    width: this.service.width,
                    height: this.service.height,
                    sizes: new SizesBuilder(this.service.sizes).build(),
                    tiles: new TilesBuilder(this.service.tiles).build(),
                    profile: this.service.profile,
                    physicalScale: this.service.physicalScale,
                    physicalUnits: this.service.physicalUnits,
                    service: new ServiceBuilder(this.service.service).build()
                });
            }
            return null;
        };
        return ServiceBuilder;
    }());

    var ResourceBuilder = /** @class */ (function () {
        function ResourceBuilder(resource) {
            this.resource = resource;
        }
        ResourceBuilder.prototype.build = function () {
            if (this.resource) {
                return new Resource({
                    id: BuilderUtils.extractId(this.resource),
                    type: BuilderUtils.extracType(this.resource),
                    format: this.resource.format,
                    service: new ServiceBuilder(this.resource.service).build(),
                    height: this.resource.height,
                    width: this.resource.width
                });
            }
            return null;
        };
        return ResourceBuilder;
    }());

    var ImagesBuilder = /** @class */ (function () {
        function ImagesBuilder(images) {
            this.images = images;
        }
        ImagesBuilder.prototype.build = function () {
            var images = [];
            if (this.images) {
                for (var i = 0; i < this.images.length; i++) {
                    var image = this.images[i];
                    images.push(new Images({
                        id: BuilderUtils.extractId(image),
                        type: BuilderUtils.extracType(image),
                        motivation: image.motivation,
                        resource: new ResourceBuilder(image.resource).build(),
                        on: image.on
                    }));
                }
            }
            return images;
        };
        return ImagesBuilder;
    }());

    var CanvasBuilder = /** @class */ (function () {
        function CanvasBuilder(canvases) {
            this.canvases = canvases;
        }
        CanvasBuilder.prototype.build = function () {
            var canvases = [];
            if (this.canvases) {
                for (var i = 0; i < this.canvases.length; i++) {
                    var canvas = this.canvases[i];
                    canvases.push(new Canvas({
                        id: BuilderUtils.extractId(canvas),
                        type: BuilderUtils.extracType(canvas),
                        label: canvas.label,
                        thumbnail: canvas.thumbnail,
                        height: canvas.height,
                        width: canvas.width,
                        images: new ImagesBuilder(canvas.images).build()
                    }));
                }
            }
            return canvases;
        };
        return CanvasBuilder;
    }());

    var SequenceBuilder = /** @class */ (function () {
        function SequenceBuilder(sequences) {
            this.sequences = sequences;
        }
        SequenceBuilder.prototype.build = function () {
            var sequences = [];
            if (this.sequences) {
                for (var i = 0; i < this.sequences.length; i++) {
                    var seq = this.sequences[i];
                    sequences.push(new Sequence({
                        id: BuilderUtils.extractId(seq),
                        type: BuilderUtils.extracType(seq),
                        label: seq.label,
                        viewingHint: seq.viewingHint,
                        canvases: new CanvasBuilder(seq.canvases).build()
                    }));
                }
            }
            return sequences;
        };
        return SequenceBuilder;
    }());

    var MetadataBuilder = /** @class */ (function () {
        function MetadataBuilder(metadatas) {
            this.metadatas = metadatas;
        }
        MetadataBuilder.prototype.build = function () {
            var metadatas = [];
            if (this.metadatas) {
                for (var i = 0; i < this.metadatas.length; i++) {
                    var data = this.metadatas[i];
                    metadatas.push(new Metadata(data.label, data.value));
                }
            }
            return metadatas;
        };
        return MetadataBuilder;
    }());

    var StructureBuilder = /** @class */ (function () {
        function StructureBuilder(structures, sequences) {
            this.structures = structures;
            this.sequences = sequences;
        }
        StructureBuilder.prototype.build = function () {
            var structures = [];
            if (this.structures) {
                for (var i = 0; i < this.structures.length; i++) {
                    var structure = this.structures[i];
                    structures.push(new Structure({
                        id: BuilderUtils.extractId(structure),
                        type: BuilderUtils.extracType(structure),
                        label: structure.label,
                        canvases: structure.canvases,
                        canvasIndex: BuilderUtils.findCanvasIndex(structure.canvases, this.sequences)
                    }));
                }
            }
            return structures;
        };
        return StructureBuilder;
    }());

    var TileSourceBuilder = /** @class */ (function () {
        function TileSourceBuilder(sequences) {
            this.sequences = sequences;
        }
        TileSourceBuilder.prototype.build = function () {
            var tilesources = [];
            if (this.sequences && this.sequences.length > 0) {
                var canvases = this.sequences[0].canvases;
                for (var i = 0; i < canvases.length; i++) {
                    var canvas = canvases[i];
                    if (canvas) {
                        tilesources.push(canvas.images[0].resource);
                    }
                }
            }
            return tilesources;
        };
        return TileSourceBuilder;
    }());

    var ManifestBuilder = /** @class */ (function () {
        function ManifestBuilder(data) {
            this.data = data;
        }
        ManifestBuilder.prototype.build = function () {
            var sequences = new SequenceBuilder(this.data.sequences).build();
            return new Manifest({
                context: BuilderUtils.extractContext(this.data),
                type: BuilderUtils.extracType(this.data),
                id: BuilderUtils.extractId(this.data),
                viewingDirection: BuilderUtils.extractViewingDirection(this.data),
                label: this.data.label,
                metadata: new MetadataBuilder(this.data.metadata).build(),
                license: this.data.license,
                logo: this.data.logo,
                attribution: this.data.attribution,
                service: new ServiceBuilder(this.data.service).build(),
                sequences: sequences,
                structures: new StructureBuilder(this.data.structures, sequences).build(),
                tileSource: new TileSourceBuilder(this.data.sequences).build(),
                viewingHint: this.data.viewingHint
            });
        };
        return ManifestBuilder;
    }());

    var IiifManifestService = /** @class */ (function () {
        function IiifManifestService(intl, http, spinnerService) {
            this.intl = intl;
            this.http = http;
            this.spinnerService = spinnerService;
            this._currentManifest = new rxjs.BehaviorSubject(null);
            this._errorMessage = new rxjs.BehaviorSubject(null);
        }
        Object.defineProperty(IiifManifestService.prototype, "currentManifest", {
            get: function () {
                return this._currentManifest.asObservable().pipe(operators.filter(function (m) { return m !== null; }), operators.distinctUntilChanged());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(IiifManifestService.prototype, "errorMessage", {
            get: function () {
                return this._errorMessage.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        IiifManifestService.prototype.load = function (manifestUri) {
            var _this = this;
            if (manifestUri === null) {
                this._errorMessage.next(this.intl.manifestUriMissingLabel);
            }
            else {
                this.spinnerService.show();
                this.http
                    .get(manifestUri)
                    .pipe(operators.finalize(function () { return _this.spinnerService.hide(); }))
                    .subscribe(function (response) {
                    var manifest = _this.extractData(response);
                    if (_this.isManifestValid(manifest)) {
                        _this._currentManifest.next(manifest);
                    }
                    else {
                        _this._errorMessage.next(_this.intl.manifestNotValidLabel);
                    }
                }, function (err) {
                    _this._errorMessage.next(_this.handleError(err));
                });
            }
        };
        IiifManifestService.prototype.destroy = function () {
            this.resetCurrentManifest();
            this.resetErrorMessage();
        };
        IiifManifestService.prototype.resetCurrentManifest = function () {
            this._currentManifest.next(null);
        };
        IiifManifestService.prototype.resetErrorMessage = function () {
            this._errorMessage.next(null);
        };
        IiifManifestService.prototype.extractData = function (response) {
            return new ManifestBuilder(response).build();
        };
        IiifManifestService.prototype.isManifestValid = function (manifest) {
            return manifest && manifest.tileSource && manifest.tileSource.length > 0;
        };
        IiifManifestService.prototype.handleError = function (err) {
            var errMsg;
            if (err.error instanceof Object) {
                errMsg = err.message;
            }
            else {
                errMsg = err.error;
            }
            return errMsg;
        };
        return IiifManifestService;
    }());
    IiifManifestService.decorators = [
        { type: i0.Injectable }
    ];
    IiifManifestService.ctorParameters = function () { return [
        { type: MimeViewerIntl },
        { type: http.HttpClient },
        { type: SpinnerService }
    ]; };

    var FullscreenService = /** @class */ (function () {
        function FullscreenService() {
            this.changeSubject = new rxjs.ReplaySubject();
            this.onchange();
        }
        Object.defineProperty(FullscreenService.prototype, "onChange", {
            get: function () {
                return this.changeSubject.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        FullscreenService.prototype.isEnabled = function () {
            var d = document;
            return (d.fullscreenEnabled ||
                d.webkitFullscreenEnabled ||
                d.mozFullScreenEnabled ||
                d.msFullscreenEnabled);
        };
        FullscreenService.prototype.isFullscreen = function () {
            var d = document;
            return (d.fullscreenElement ||
                d.webkitFullscreenElement ||
                d.mozFullScreenElement ||
                d.msFullscreenElement);
        };
        FullscreenService.prototype.toggle = function (el) {
            this.isFullscreen() ? this.closeFullscreen(el) : this.openFullscreen(el);
        };
        FullscreenService.prototype.onchange = function () {
            var _this = this;
            var d = document;
            var func = function () {
                _this.changeSubject.next(true);
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
        };
        FullscreenService.prototype.openFullscreen = function (elem) {
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
        };
        FullscreenService.prototype.closeFullscreen = function (elem) {
            var d = document;
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
        };
        return FullscreenService;
    }());
    FullscreenService.decorators = [
        { type: i0.Injectable }
    ];
    FullscreenService.ctorParameters = function () { return []; };

    var MimeDomHelper = /** @class */ (function () {
        function MimeDomHelper(fullscreen) {
            this.fullscreen = fullscreen;
        }
        MimeDomHelper.prototype.getBoundingClientRect = function (el) {
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
        };
        MimeDomHelper.prototype.isDocumentInFullScreenMode = function () {
            return this.fullscreen.isFullscreen();
        };
        MimeDomHelper.prototype.toggleFullscreen = function () {
            var el = document.getElementById('mimeViewer');
            if (this.fullscreen.isEnabled()) {
                this.fullscreen.toggle(el);
            }
        };
        MimeDomHelper.prototype.setFocusOnViewer = function () {
            var el = document.getElementById('mimeViewer');
            if (el) {
                el.focus();
            }
        };
        MimeDomHelper.prototype.createFullscreenDimensions = function (el) {
            var dimensions = el.nativeElement.getBoundingClientRect();
            var width = this.getFullscreenWidth();
            var height = this.getFullscreenHeight();
            return new Dimensions(Object.assign(Object.assign({}, dimensions), { top: 0, bottom: height, width: width, height: height, left: 0, right: width }));
        };
        MimeDomHelper.prototype.createDimensions = function (el) {
            var dimensions = el.nativeElement.getBoundingClientRect();
            return new Dimensions({
                top: dimensions.top,
                bottom: dimensions.bottom,
                width: dimensions.width,
                height: dimensions.height,
                left: dimensions.left,
                right: dimensions.right
            });
        };
        MimeDomHelper.prototype.getFullscreenWidth = function () {
            return (window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth);
        };
        MimeDomHelper.prototype.getFullscreenHeight = function () {
            return (window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight);
        };
        return MimeDomHelper;
    }());
    MimeDomHelper.decorators = [
        { type: i0.Injectable }
    ];
    MimeDomHelper.ctorParameters = function () { return [
        { type: FullscreenService }
    ]; };

    var MimeResizeService = /** @class */ (function () {
        function MimeResizeService(mimeDomHelper) {
            this.mimeDomHelper = mimeDomHelper;
            this.resizeSubject = new rxjs.ReplaySubject();
            this.dimensions = new Dimensions();
        }
        Object.defineProperty(MimeResizeService.prototype, "el", {
            get: function () {
                return this._el;
            },
            set: function (el) {
                this._el = el;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MimeResizeService.prototype, "onResize", {
            get: function () {
                return this.resizeSubject.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        MimeResizeService.prototype.markForCheck = function () {
            var dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);
            if (this.dimensions.bottom !== dimensions.bottom ||
                this.dimensions.height !== dimensions.height ||
                this.dimensions.left !== dimensions.left ||
                this.dimensions.right !== dimensions.right ||
                this.dimensions.top !== dimensions.top ||
                this.dimensions.width !== dimensions.width) {
                this.dimensions = dimensions;
                this.resizeSubject.next(Object.assign({}, this.dimensions));
            }
        };
        return MimeResizeService;
    }());
    MimeResizeService.decorators = [
        { type: i0.Injectable }
    ];
    MimeResizeService.ctorParameters = function () { return [
        { type: MimeDomHelper }
    ]; };

    var ContentSearchDialogComponent = /** @class */ (function () {
        function ContentSearchDialogComponent(dialogRef, intl, mediaObserver, mimeResizeService, iiifManifestService, iiifContentSearchService, el, mimeDomHelper) {
            this.dialogRef = dialogRef;
            this.intl = intl;
            this.mediaObserver = mediaObserver;
            this.mimeResizeService = mimeResizeService;
            this.iiifManifestService = iiifManifestService;
            this.iiifContentSearchService = iiifContentSearchService;
            this.el = el;
            this.mimeDomHelper = mimeDomHelper;
            this.hits = [];
            this.currentSearch = '';
            this.numberOfHits = 0;
            this.isSearching = false;
            this.tabHeight = {};
            this.mimeHeight = 0;
            this.destroyed = new rxjs.Subject();
        }
        ContentSearchDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.mimeResizeService.onResize
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (dimensions) {
                _this.mimeHeight = dimensions.height;
                _this.resizeTabHeight();
            });
            this.iiifManifestService.currentManifest
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (manifest) {
                _this.manifest = manifest;
            });
            this.iiifContentSearchService.onChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (sr) {
                _this.hits = sr.hits;
                _this.currentSearch = sr.q ? sr.q : '';
                _this.q = sr.q;
                _this.numberOfHits = sr.size();
                if (_this.resultContainer !== null && _this.numberOfHits > 0) {
                    _this.resultContainer.nativeElement.focus();
                }
                else if (_this.q.length === 0 || _this.numberOfHits === 0) {
                    _this.qEl.nativeElement.focus();
                }
            });
            this.iiifContentSearchService.isSearching
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (s) {
                _this.isSearching = s;
            });
            this.iiifContentSearchService.onSelected
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (hit) {
                if (hit === null) {
                    _this.currentHit = hit;
                }
                else {
                    if (!_this.currentHit || _this.currentHit.id !== hit.id) {
                        _this.currentHit = hit;
                        _this.scrollCurrentHitIntoView();
                    }
                }
            });
            this.resizeTabHeight();
        };
        ContentSearchDialogComponent.prototype.ngAfterViewInit = function () {
            this.scrollCurrentHitIntoView();
        };
        ContentSearchDialogComponent.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        ContentSearchDialogComponent.prototype.onResize = function (event) {
            this.resizeTabHeight();
        };
        ContentSearchDialogComponent.prototype.onSubmit = function (event) {
            event.preventDefault();
            this.search();
        };
        ContentSearchDialogComponent.prototype.clear = function () {
            this.q = '';
            this.search();
        };
        ContentSearchDialogComponent.prototype.goToHit = function (hit) {
            this.currentHit = hit;
            this.iiifContentSearchService.selected(hit);
            if (this.mediaObserver.isActive('lt-md')) {
                this.dialogRef.close();
            }
        };
        ContentSearchDialogComponent.prototype.search = function () {
            this.currentSearch = this.q;
            this.iiifContentSearchService.search(this.manifest, this.q);
        };
        ContentSearchDialogComponent.prototype.resizeTabHeight = function () {
            var dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);
            var height = this.mimeHeight;
            if (this.mediaObserver.isActive('lt-md')) {
                this.tabHeight = {
                    maxHeight: window.innerHeight - 128 + 'px'
                };
            }
            else {
                height -= 272;
                this.tabHeight = {
                    maxHeight: height + 'px'
                };
            }
        };
        ContentSearchDialogComponent.prototype.scrollCurrentHitIntoView = function () {
            var _this = this;
            this.iiifContentSearchService.onSelected
                .pipe(operators.take(1), operators.filter(function (s) { return s !== null; }))
                .subscribe(function (hit) {
                var selected = _this.findSelected(hit);
                if (selected) {
                    selected.nativeElement.focus();
                }
            });
        };
        ContentSearchDialogComponent.prototype.findSelected = function (selectedHit) {
            if (this.hitList) {
                var selectedList = this.hitList.filter(function (item, index) { return index === selectedHit.id; });
                return selectedList.length > 0 ? selectedList[0] : null;
            }
            else {
                return null;
            }
        };
        return ContentSearchDialogComponent;
    }());
    ContentSearchDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mime-search',
                    template: "<div class=\"content-search-container\">\n  <div [ngSwitch]=\"mediaObserver.isActive('lt-md')\">\n    <div *ngSwitchCase=\"true\">\n      <mat-toolbar color=\"primary\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n          <button\n            id=\"close-content-search-dialog-button\"\n            mat-icon-button\n            [aria-label]=\"intl.closeLabel\"\n            [matTooltip]=\"intl.closeLabel\"\n            [matDialogClose]=\"true\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n          <div mat-dialog-title class=\"heading\">{{ intl.searchLabel }}</div>\n        </div>\n      </mat-toolbar>\n    </div>\n    <div *ngSwitchDefault>\n      <mat-toolbar>\n        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxFlex>\n          <div mat-dialog-title class=\"heading heading-desktop\">{{ intl.searchLabel }}</div>\n          <button\n            id=\"close-content-search-dialog-button\"\n            mat-icon-button\n            [aria-label]=\"intl.closeLabel\"\n            [matTooltip]=\"intl.closeLabel\"\n            [matDialogClose]=\"true\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n        </div>\n      </mat-toolbar>\n    </div>\n  </div>\n  <mat-dialog-content>\n    <div class=\"content-search-form\">\n      <form (ngSubmit)=\"onSubmit($event)\" #searchForm=\"ngForm\">\n        <mat-form-field class=\"content-search-box\">\n          <button\n            id=\"content-search-form-submit\"\n            type=\"submit\"\n            matPrefix\n            mat-icon-button\n            [attr.aria-label]=\"intl.searchLabel\"\n            [matTooltip]=\"intl.searchLabel\"\n          >\n            <mat-icon class=\"icon\">search</mat-icon>\n          </button>\n          <input\n            #query\n            cdkFocusInitial\n            matInput\n            class=\"content-search-input\"\n            [(ngModel)]=\"q\"\n            name=\"q\"\n            autocomplete=\"off\"\n            aria-labelledby=\"content-search-form-submit\"\n          />\n          <button\n            *ngIf=\"q\"\n            id=\"clearSearchButton\"\n            type=\"button\"\n            matSuffix\n            mat-icon-button\n            [attr.aria-label]=\"intl.clearSearchLabel\"\n            [matTooltip]=\"intl.clearSearchLabel\"\n            (click)=\"clear()\"\n          >\n            <mat-icon class=\"icon\">clear</mat-icon>\n          </button>\n        </mat-form-field>\n      </form>\n    </div>\n    <div\n      #contentSearchResult\n      class=\"content-search-result-container\"\n      [ngStyle]=\"tabHeight\"\n    >\n      <div *ngIf=\"!isSearching\" class=\"content-search-result\" fxLayout=\"column\">\n        <input type=\"hidden\" id=\"numberOfHits\" [value]=\"numberOfHits\" />\n        <div *ngIf=\"currentSearch && currentSearch.length > 0\">\n          <div\n            *ngIf=\"numberOfHits > 0\"\n            [innerHTML]=\"intl.resultsFoundLabel(numberOfHits, currentSearch)\"\n          ></div>\n          <div\n            *ngIf=\"numberOfHits === 0\"\n            [innerHTML]=\"intl.noResultsFoundLabel(currentSearch)\"\n          ></div>\n        </div>\n        <ng-container *ngFor=\"let hit of hits; let last = last\">\n          <button\n            #hitButton\n            mat-button\n            [color]=\"currentHit && hit.id === currentHit.id ? 'accent' : null\"\n            [ngClass]=\"'hit'\"\n            (click)=\"goToHit(hit)\"\n            (keyup.enter)=\"goToHit(hit)\"\n          >\n            <div fxLayout=\"row\" fxLayoutAlign=\"space-between start\">\n              <div fxFlex class=\"summary\">\n                {{ hit.before }} <em>{{ hit.match }}</em> {{ hit.after }}\n              </div>\n              <div fxFlex=\"40px\" class=\"canvasGroup\">{{ hit.index + 1 }}</div>\n            </div>\n          </button>\n          <mat-divider *ngIf=\"!last\"></mat-divider>\n        </ng-container>\n      </div>\n      <div *ngIf=\"isSearching\" class=\"content-search-result\" fxLayout=\"column\">\n        <mat-progress-bar mode=\"indeterminate\"></mat-progress-bar>\n      </div>\n    </div>\n  </mat-dialog-content>\n</div>\n",
                    styles: [".heading{font-size:17px}.heading-desktop{padding-left:16px}.label{text-decoration:underline}.content-search-form{padding:0 16px}.content-search-box{width:100%}.content-search-input{font-size:20px}.content-search-result-container{font-family:Roboto,Helvetica Neue,sans-serif;margin-bottom:8px;overflow:auto}.content-search-result{padding:8px 16px}.content-search-result .mat-button{font-size:14px;line-height:normal;max-width:none;padding:8px;text-align:left;white-space:normal;word-wrap:normal}::ng-deep .content-search-container .current-content-search,em{font-weight:700}.canvasGroupLabel{opacity:.54;text-align:right}::ng-deep .content-search-panel{max-width:none!important}::ng-deep .content-search-panel>.mat-dialog-container{overflow:initial;padding:0!important}::ng-deep .content-search-container>div>div>.mat-toolbar{padding:0!important}input{font-family:Roboto,Helvetica Neue,sans-serif}.icon{font-size:22px!important}"]
                },] }
    ];
    ContentSearchDialogComponent.ctorParameters = function () { return [
        { type: dialog.MatDialogRef },
        { type: MimeViewerIntl },
        { type: flexLayout.MediaObserver },
        { type: MimeResizeService },
        { type: IiifManifestService },
        { type: IiifContentSearchService },
        { type: i0.ElementRef },
        { type: MimeDomHelper }
    ]; };
    ContentSearchDialogComponent.propDecorators = {
        resultContainer: [{ type: i0.ViewChild, args: ['contentSearchResult', { static: true },] }],
        qEl: [{ type: i0.ViewChild, args: ['query', { static: true },] }],
        hitList: [{ type: i0.ViewChildren, args: ['hitButton', { read: i0.ElementRef },] }],
        onResize: [{ type: i0.HostListener, args: ['window:resize', ['$event'],] }]
    };

    var MobileContentSearchDialogConfigStrategy = /** @class */ (function () {
        function MobileContentSearchDialogConfigStrategy() {
        }
        MobileContentSearchDialogConfigStrategy.prototype.getConfig = function (elementRef) {
            return {
                hasBackdrop: false,
                disableClose: false,
                autoFocus: false,
                width: '100%',
                height: '100%',
                panelClass: 'content-search-panel'
            };
        };
        return MobileContentSearchDialogConfigStrategy;
    }());
    var DesktopContentSearchDialogConfigStrategy = /** @class */ (function () {
        function DesktopContentSearchDialogConfigStrategy(mimeDomHelper) {
            this.mimeDomHelper = mimeDomHelper;
        }
        DesktopContentSearchDialogConfigStrategy.prototype.getConfig = function (el) {
            var dimensions = this.getPosition(el);
            return {
                hasBackdrop: false,
                disableClose: false,
                autoFocus: false,
                width: DesktopContentSearchDialogConfigStrategy.dialogWidth + "px",
                position: {
                    top: dimensions.top + 'px',
                    left: dimensions.left + 'px'
                },
                panelClass: 'content-search-panel'
            };
        };
        DesktopContentSearchDialogConfigStrategy.prototype.getPosition = function (el) {
            var dimensions = this.mimeDomHelper.getBoundingClientRect(el);
            return new Dimensions({
                top: dimensions.top + 64,
                left: dimensions.right -
                    DesktopContentSearchDialogConfigStrategy.dialogWidth -
                    DesktopContentSearchDialogConfigStrategy.paddingRight
            });
        };
        return DesktopContentSearchDialogConfigStrategy;
    }());
    DesktopContentSearchDialogConfigStrategy.dialogWidth = 350;
    DesktopContentSearchDialogConfigStrategy.paddingRight = 20;

    var ContentSearchDialogConfigStrategyFactory = /** @class */ (function () {
        function ContentSearchDialogConfigStrategyFactory(mediaObserver, mimeDomHelper) {
            this.mediaObserver = mediaObserver;
            this.mimeDomHelper = mimeDomHelper;
        }
        ContentSearchDialogConfigStrategyFactory.prototype.create = function () {
            return this.mediaObserver.isActive('lt-md')
                ? new MobileContentSearchDialogConfigStrategy()
                : new DesktopContentSearchDialogConfigStrategy(this.mimeDomHelper);
        };
        return ContentSearchDialogConfigStrategyFactory;
    }());
    ContentSearchDialogConfigStrategyFactory.decorators = [
        { type: i0.Injectable }
    ];
    ContentSearchDialogConfigStrategyFactory.ctorParameters = function () { return [
        { type: flexLayout.MediaObserver },
        { type: MimeDomHelper }
    ]; };

    var ContentSearchDialogService = /** @class */ (function () {
        function ContentSearchDialogService(dialog, contentSearchDialogConfigStrategyFactory, mimeResizeService) {
            this.dialog = dialog;
            this.contentSearchDialogConfigStrategyFactory = contentSearchDialogConfigStrategyFactory;
            this.mimeResizeService = mimeResizeService;
            this.isContentSearchDialogOpen = false;
            this.destroyed = new rxjs.Subject();
        }
        ContentSearchDialogService.prototype.initialize = function () {
            var _this = this;
            this.mimeResizeService.onResize
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (rect) {
                if (_this.isContentSearchDialogOpen) {
                    var config = _this.getDialogConfig();
                    _this.dialogRef.updatePosition(config.position);
                    _this.dialogRef.updateSize(config.width, config.height);
                }
            });
        };
        ContentSearchDialogService.prototype.destroy = function () {
            this.close();
            this.destroyed.next();
        };
        Object.defineProperty(ContentSearchDialogService.prototype, "el", {
            set: function (el) {
                this._el = el;
            },
            enumerable: false,
            configurable: true
        });
        ContentSearchDialogService.prototype.open = function () {
            var _this = this;
            if (!this.isContentSearchDialogOpen) {
                var config = this.getDialogConfig();
                this.dialogRef = this.dialog.open(ContentSearchDialogComponent, config);
                this.dialogRef.afterClosed().subscribe(function (result) {
                    _this.isContentSearchDialogOpen = false;
                });
                this.isContentSearchDialogOpen = true;
            }
        };
        ContentSearchDialogService.prototype.close = function () {
            if (this.dialogRef) {
                this.dialogRef.close();
            }
            this.isContentSearchDialogOpen = false;
        };
        ContentSearchDialogService.prototype.toggle = function () {
            this.isContentSearchDialogOpen ? this.close() : this.open();
        };
        ContentSearchDialogService.prototype.isOpen = function () {
            return this.isContentSearchDialogOpen;
        };
        ContentSearchDialogService.prototype.getDialogConfig = function () {
            return this.contentSearchDialogConfigStrategyFactory
                .create()
                .getConfig(this._el);
        };
        return ContentSearchDialogService;
    }());
    ContentSearchDialogService.decorators = [
        { type: i0.Injectable }
    ];
    ContentSearchDialogService.ctorParameters = function () { return [
        { type: dialog.MatDialog },
        { type: ContentSearchDialogConfigStrategyFactory },
        { type: MimeResizeService }
    ]; };

    var ContentsDialogComponent = /** @class */ (function () {
        function ContentsDialogComponent(intl, mediaObserver, dialogRef, el, mimeDomHelper, changeDetectorRef, iiifManifestService, mimeResizeService) {
            var _this = this;
            this.intl = intl;
            this.mediaObserver = mediaObserver;
            this.dialogRef = dialogRef;
            this.el = el;
            this.mimeDomHelper = mimeDomHelper;
            this.changeDetectorRef = changeDetectorRef;
            this.iiifManifestService = iiifManifestService;
            this.tabHeight = {};
            this.showToc = false;
            this.selectedIndex = 0;
            this.mimeHeight = 0;
            this.destroyed = new rxjs.Subject();
            mimeResizeService.onResize
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (dimensions) {
                _this.mimeHeight = dimensions.height;
                _this.resizeTabHeight();
            });
        }
        ContentsDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.iiifManifestService.currentManifest
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (manifest) {
                _this.manifest = manifest;
                _this.showToc = _this.manifest && _this.manifest.structures.length > 0;
                _this.changeDetectorRef.detectChanges();
            });
            this.resizeTabHeight();
        };
        ContentsDialogComponent.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        ContentsDialogComponent.prototype.onResize = function (event) {
            this.resizeTabHeight();
        };
        ContentsDialogComponent.prototype.onCanvasChanged = function () {
            if (this.mediaObserver.isActive('lt-md')) {
                this.dialogRef.close();
            }
        };
        ContentsDialogComponent.prototype.resizeTabHeight = function () {
            var dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);
            var height = this.mimeHeight;
            if (this.mediaObserver.isActive('lt-md')) {
                height -= 104;
                this.tabHeight = {
                    maxHeight: window.innerHeight - 128 + 'px'
                };
            }
            else {
                height -= 278;
                this.tabHeight = {
                    maxHeight: height + 'px'
                };
            }
        };
        return ContentsDialogComponent;
    }());
    ContentsDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mime-contents',
                    template: "<div class=\"contents-container\">\n  <ng-container [ngSwitch]=\"mediaObserver.isActive('lt-md')\">\n    <ng-container *ngSwitchCase=\"true\">\n      <mat-toolbar color=\"primary\" data-test-id=\"mobile-toolbar\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n          <button\n            mat-icon-button\n            [aria-label]=\"intl.closeLabel\"\n            [matTooltip]=\"intl.closeLabel\"\n            [matDialogClose]=\"true\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n          <h1 mat-dialog-title>{{ intl.contentsLabel }}</h1>\n        </div>\n      </mat-toolbar>\n    </ng-container>\n    <ng-container *ngSwitchDefault>\n      <mat-toolbar data-test-id=\"desktop-toolbar\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxFlex>\n          <h1 mat-dialog-title>{{ intl.contentsLabel }}</h1>\n          <button\n            mat-icon-button\n            [aria-label]=\"intl.closeLabel\"\n            [matTooltip]=\"intl.closeLabel\"\n            [matDialogClose]=\"true\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n        </div>\n      </mat-toolbar>\n    </ng-container>\n  </ng-container>\n  <div mat-dialog-content>\n    <mat-tab-group [(selectedIndex)]=\"selectedIndex\">\n      <mat-tab [label]=\"intl.metadataLabel\">\n        <div class=\"tab-container\" [ngStyle]=\"tabHeight\">\n          <mime-metadata></mime-metadata>\n        </div>\n      </mat-tab>\n      <mat-tab *ngIf=\"showToc\" [label]=\"intl.tocLabel\">\n        <div class=\"tab-container\" [ngStyle]=\"tabHeight\">\n          <mime-toc (canvasChanged)=\"onCanvasChanged()\"></mime-toc>\n        </div>\n      </mat-tab>\n    </mat-tab-group>\n  </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".label{text-decoration:underline}::ng-deep .contents-panel{max-width:none!important}::ng-deep .contents-panel>.mat-dialog-container{overflow:initial;padding:0!important}::ng-deep .contents-container>div>div>.mat-toolbar{padding:0!important}.tab-container{overflow:auto;padding:8px 16px}.mat-dialog-content{max-height:none}"]
                },] }
    ];
    ContentsDialogComponent.ctorParameters = function () { return [
        { type: MimeViewerIntl },
        { type: flexLayout.MediaObserver },
        { type: dialog.MatDialogRef },
        { type: i0.ElementRef },
        { type: MimeDomHelper },
        { type: i0.ChangeDetectorRef },
        { type: IiifManifestService },
        { type: MimeResizeService }
    ]; };
    ContentsDialogComponent.propDecorators = {
        onResize: [{ type: i0.HostListener, args: ['window:resize', ['$event'],] }]
    };

    var MobileContentsDialogConfigStrategy = /** @class */ (function () {
        function MobileContentsDialogConfigStrategy() {
        }
        MobileContentsDialogConfigStrategy.prototype.getConfig = function (elementRef) {
            return {
                hasBackdrop: false,
                disableClose: false,
                width: '100%',
                height: '100%',
                panelClass: 'contents-panel'
            };
        };
        return MobileContentsDialogConfigStrategy;
    }());
    var DesktopContentsDialogConfigStrategy = /** @class */ (function () {
        function DesktopContentsDialogConfigStrategy(mimeDomHelper) {
            this.mimeDomHelper = mimeDomHelper;
        }
        DesktopContentsDialogConfigStrategy.prototype.getConfig = function (el) {
            var dimensions = this.getPosition(el);
            return {
                hasBackdrop: false,
                disableClose: false,
                width: DesktopContentsDialogConfigStrategy.dialogWidth + "px",
                position: {
                    top: dimensions.top + 'px',
                    left: dimensions.left + 'px'
                },
                panelClass: 'contents-panel'
            };
        };
        DesktopContentsDialogConfigStrategy.prototype.getPosition = function (el) {
            var dimensions = this.mimeDomHelper.getBoundingClientRect(el);
            return new Dimensions({
                top: dimensions.top + 64,
                left: dimensions.right -
                    DesktopContentsDialogConfigStrategy.dialogWidth -
                    DesktopContentsDialogConfigStrategy.paddingRight
            });
        };
        return DesktopContentsDialogConfigStrategy;
    }());
    DesktopContentsDialogConfigStrategy.dialogWidth = 350;
    DesktopContentsDialogConfigStrategy.paddingRight = 20;

    var ContentsDialogConfigStrategyFactory = /** @class */ (function () {
        function ContentsDialogConfigStrategyFactory(mediaObserver, mimeDomHelper) {
            this.mediaObserver = mediaObserver;
            this.mimeDomHelper = mimeDomHelper;
        }
        ContentsDialogConfigStrategyFactory.prototype.create = function () {
            return this.mediaObserver.isActive('lt-md')
                ? new MobileContentsDialogConfigStrategy()
                : new DesktopContentsDialogConfigStrategy(this.mimeDomHelper);
        };
        return ContentsDialogConfigStrategyFactory;
    }());
    ContentsDialogConfigStrategyFactory.decorators = [
        { type: i0.Injectable }
    ];
    ContentsDialogConfigStrategyFactory.ctorParameters = function () { return [
        { type: flexLayout.MediaObserver },
        { type: MimeDomHelper }
    ]; };

    var ContentsDialogService = /** @class */ (function () {
        function ContentsDialogService(dialog, contentsDialogConfigStrategyFactory, mimeResizeService) {
            this.dialog = dialog;
            this.contentsDialogConfigStrategyFactory = contentsDialogConfigStrategyFactory;
            this.mimeResizeService = mimeResizeService;
            this.isContentsDialogOpen = false;
            this.destroyed = new rxjs.Subject();
        }
        ContentsDialogService.prototype.initialize = function () {
            var _this = this;
            this.mimeResizeService.onResize
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (rect) {
                if (_this.isContentsDialogOpen) {
                    var config = _this.getDialogConfig();
                    _this.dialogRef.updatePosition(config.position);
                    _this.dialogRef.updateSize(config.width, config.height);
                }
            });
        };
        ContentsDialogService.prototype.destroy = function () {
            this.close();
            this.destroyed.next();
        };
        Object.defineProperty(ContentsDialogService.prototype, "el", {
            set: function (el) {
                this._el = el;
            },
            enumerable: false,
            configurable: true
        });
        ContentsDialogService.prototype.open = function (selectedIndex) {
            var _this = this;
            if (!this.isContentsDialogOpen) {
                var config = this.getDialogConfig();
                this.dialogRef = this.dialog.open(ContentsDialogComponent, config);
                if (selectedIndex) {
                    this.dialogRef.componentInstance.selectedIndex = selectedIndex;
                }
                this.dialogRef.afterClosed().subscribe(function (result) {
                    _this.isContentsDialogOpen = false;
                });
                this.isContentsDialogOpen = true;
            }
        };
        ContentsDialogService.prototype.close = function () {
            if (this.dialogRef) {
                this.dialogRef.close();
                this.isContentsDialogOpen = false;
            }
            this.isContentsDialogOpen = false;
        };
        ContentsDialogService.prototype.toggle = function () {
            this.isContentsDialogOpen ? this.close() : this.open();
        };
        ContentsDialogService.prototype.isOpen = function () {
            return this.isContentsDialogOpen;
        };
        ContentsDialogService.prototype.getSelectedIndex = function () {
            return this.dialogRef && this.dialogRef.componentInstance
                ? this.dialogRef.componentInstance.selectedIndex
                : 0;
        };
        ContentsDialogService.prototype.getDialogConfig = function () {
            return this.contentsDialogConfigStrategyFactory
                .create()
                .getConfig(this._el);
        };
        return ContentsDialogService;
    }());
    ContentsDialogService.decorators = [
        { type: i0.Injectable }
    ];
    ContentsDialogService.ctorParameters = function () { return [
        { type: dialog.MatDialog },
        { type: ContentsDialogConfigStrategyFactory },
        { type: MimeResizeService }
    ]; };

    var AccessKeys = /** @class */ (function () {
        function AccessKeys(event) {
            this.altKey = false;
            this.shiftKey = false;
            this.ctrlkey = false;
            this.keyCode = event.keyCode;
            this.altKey = event.altKey;
            this.shiftKey = event.shiftKey;
            this.ctrlkey = event.ctrlKey;
        }
        AccessKeys.prototype.isArrowRightKeys = function () {
            return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.ARROWRIGHT);
        };
        AccessKeys.prototype.isArrowLeftKeys = function () {
            return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.ARROWLEFT);
        };
        AccessKeys.prototype.isPageUpKeys = function () {
            return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.PAGEUP);
        };
        AccessKeys.prototype.isPageDownKeys = function () {
            return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.PAGEDOWN);
        };
        AccessKeys.prototype.isFirstCanvasGroupKeys = function () {
            return (!this.isMultiKeys() &&
                this.arrayContainsKeys(AccessKeys.firstCanvasGroupCodes));
        };
        AccessKeys.prototype.isLastCanvasGroupKeys = function () {
            return (!this.isMultiKeys() &&
                this.arrayContainsKeys(AccessKeys.lastCanvasGroupCodes));
        };
        AccessKeys.prototype.isSliderKeys = function () {
            return (this.isArrowLeftKeys() ||
                this.isArrowRightKeys() ||
                this.isPageDownKeys() ||
                this.isPageUpKeys() ||
                this.isFirstCanvasGroupKeys() ||
                this.isLastCanvasGroupKeys());
        };
        AccessKeys.prototype.isZoomInKeys = function () {
            return (!this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.zoomInCodes));
        };
        AccessKeys.prototype.isZoomOutKeys = function () {
            return (!this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.zoomOutCodes));
        };
        AccessKeys.prototype.isZoomHomeKeys = function () {
            return (!this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.zoomHomeCodes));
        };
        AccessKeys.prototype.isNextHitKeys = function () {
            return !this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.nextHit);
        };
        AccessKeys.prototype.isPreviousHitKeys = function () {
            return (!this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.previousHit));
        };
        AccessKeys.prototype.isSearchDialogKeys = function () {
            return (!this.isMultiKeys() &&
                this.arrayContainsKeys(AccessKeys.toggleSearchDialogCodes));
        };
        AccessKeys.prototype.isContentsDialogKeys = function () {
            return (!this.isMultiKeys() &&
                this.arrayContainsKeys(AccessKeys.toggleContentsDialogCodes));
        };
        AccessKeys.prototype.isFullscreenKeys = function () {
            return (!this.isMultiKeys() &&
                this.arrayContainsKeys(AccessKeys.toggleFullscreenCodes));
        };
        AccessKeys.prototype.isResetSearchKeys = function () {
            return (this.isShiftPressed() && this.arrayContainsKeys(AccessKeys.resetSearch));
        };
        AccessKeys.prototype.isRotateKeys = function () {
            return (!this.isMultiKeys() && this.arrayContainsKeys(AccessKeys.rotateCwCodes));
        };
        AccessKeys.prototype.isMultiKeys = function () {
            return this.altKey || this.shiftKey || this.ctrlkey;
        };
        AccessKeys.prototype.arrayContainsKeys = function (keys) {
            return keys.indexOf(this.keyCode) > -1;
        };
        AccessKeys.prototype.isShiftPressed = function () {
            return this.shiftKey;
        };
        return AccessKeys;
    }());
    AccessKeys.PAGEDOWN = [34];
    AccessKeys.PAGEUP = [33];
    AccessKeys.ARROWRIGHT = [39];
    AccessKeys.ARROWLEFT = [37];
    AccessKeys.firstCanvasGroupCodes = [36]; // Home
    AccessKeys.lastCanvasGroupCodes = [35]; // End
    AccessKeys.zoomInCodes = [107, 187, 171]; // +, numpad and standard position, Firefox uses 171 for standard position
    AccessKeys.zoomOutCodes = [109, 189, 173]; // -, numpad and standard position, Firefox uses 173 for standard position
    AccessKeys.zoomHomeCodes = [96, 48]; // 0
    AccessKeys.nextHit = [78]; // n
    AccessKeys.previousHit = [80]; // p
    AccessKeys.toggleSearchDialogCodes = [83]; // s
    AccessKeys.toggleContentsDialogCodes = [67]; // C
    AccessKeys.toggleFullscreenCodes = [70]; // f
    AccessKeys.resetSearch = [83]; // s
    AccessKeys.rotateCwCodes = [82]; // r

    var ContentSearchNavigationService = /** @class */ (function () {
        function ContentSearchNavigationService(canvasService, iiifContentSearchService) {
            var _this = this;
            this.canvasService = canvasService;
            this.iiifContentSearchService = iiifContentSearchService;
            this.currentIndex = 0;
            this.isHitOnActiveCanvasGroup = false;
            this._isFirstHitOnCanvasGroup = false;
            this._isLastHitOnCanvasGroup = false;
            this.canvasesPerCanvasGroup = [-1];
            this.iiifContentSearchService.onChange.subscribe(function (result) {
                _this.searchResult = result;
            });
        }
        ContentSearchNavigationService.prototype.update = function (canvasGroupIndex) {
            this.canvasesPerCanvasGroup = this.canvasService.getCanvasesPerCanvasGroup(canvasGroupIndex);
            this.currentIndex = this.findCurrentHitIndex(this.canvasesPerCanvasGroup);
            this.isHitOnActiveCanvasGroup = this.findHitOnActiveCanvasGroup();
            this._isFirstHitOnCanvasGroup = this.isFirstHitOnCanvasGroup();
            this._isLastHitOnCanvasGroup = this.findLastHitOnCanvasGroup();
        };
        ContentSearchNavigationService.prototype.getCurrentIndex = function () {
            return this.currentIndex;
        };
        ContentSearchNavigationService.prototype.getHitOnActiveCanvasGroup = function () {
            return this.isHitOnActiveCanvasGroup;
        };
        ContentSearchNavigationService.prototype.getFirstHitCanvasGroup = function () {
            return this._isFirstHitOnCanvasGroup;
        };
        ContentSearchNavigationService.prototype.getLastHitCanvasGroup = function () {
            return this._isLastHitOnCanvasGroup;
        };
        ContentSearchNavigationService.prototype.goToNextCanvasGroupHit = function () {
            if (!this._isLastHitOnCanvasGroup) {
                var nextHit = void 0;
                if (this.currentIndex === -1) {
                    nextHit = this.searchResult.get(0);
                }
                else {
                    var current = this.searchResult.get(this.currentIndex);
                    var canvasGroup = this.canvasService.findCanvasGroupByCanvasIndex(current.index);
                    var canvasesPerCanvasGroup = this.canvasService.getCanvasesPerCanvasGroup(canvasGroup);
                    var lastCanvasGroupIndex_1 = this.getLastCanvasGroupIndex(canvasesPerCanvasGroup);
                    nextHit = this.searchResult.hits.find(function (h) { return h.index > lastCanvasGroupIndex_1; });
                }
                if (nextHit) {
                    this.goToCanvasIndex(nextHit);
                }
            }
        };
        ContentSearchNavigationService.prototype.goToPreviousCanvasGroupHit = function () {
            var previousIndex = this.isHitOnActiveCanvasGroup
                ? this.currentIndex - 1
                : this.currentIndex;
            var previousHit = this.findFirstHitOnCanvasGroup(previousIndex);
            this.goToCanvasIndex(previousHit);
        };
        ContentSearchNavigationService.prototype.goToCanvasIndex = function (hit) {
            this.currentIndex = this.findCurrentHitIndex([hit.index]);
            this.iiifContentSearchService.selected(hit);
        };
        ContentSearchNavigationService.prototype.findLastHitOnCanvasGroup = function () {
            var lastCanvasIndex = this.searchResult.get(this.searchResult.size() - 1)
                .index;
            var currentHit = this.searchResult.get(this.currentIndex);
            return currentHit.index === lastCanvasIndex;
        };
        ContentSearchNavigationService.prototype.findFirstHitOnCanvasGroup = function (previousIndex) {
            var previousHit = this.searchResult.get(previousIndex);
            var canvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(previousHit.index);
            var canvasesPerCanvasGroup = this.canvasService.getCanvasesPerCanvasGroup(canvasGroupIndex);
            var leftCanvas = canvasesPerCanvasGroup[0];
            var leftCanvasHit = this.searchResult.hits.find(function (h) { return h.index === leftCanvas; });
            if (leftCanvasHit) {
                previousHit = leftCanvasHit;
            }
            else if (canvasesPerCanvasGroup.length === 2) {
                var rightCanvas_1 = canvasesPerCanvasGroup[1];
                previousHit = this.searchResult.hits.find(function (h) { return h.index === rightCanvas_1; });
            }
            return previousHit;
        };
        ContentSearchNavigationService.prototype.findHitOnActiveCanvasGroup = function () {
            return (this.canvasesPerCanvasGroup.indexOf(this.searchResult.get(this.currentIndex).index) >= 0);
        };
        ContentSearchNavigationService.prototype.findCurrentHitIndex = function (canvasGroupIndexes) {
            var _loop_1 = function (i) {
                var hit = this_1.searchResult.get(i);
                if (canvasGroupIndexes.indexOf(hit.index) >= 0) {
                    return { value: i };
                }
                if (hit.index >= canvasGroupIndexes[canvasGroupIndexes.length - 1]) {
                    if (i === 0) {
                        return { value: -1 };
                    }
                    else {
                        var phit_1 = this_1.searchResult.get(i - 1);
                        return { value: this_1.searchResult.hits.findIndex(function (sr) { return sr.index === phit_1.index; }) };
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.searchResult.size(); i++) {
                var state_1 = _loop_1(i);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return this.searchResult.size() - 1;
        };
        ContentSearchNavigationService.prototype.isFirstHitOnCanvasGroup = function () {
            return this.currentIndex <= 0;
        };
        ContentSearchNavigationService.prototype.getLastCanvasGroupIndex = function (canvasesPerCanvasGroup) {
            return canvasesPerCanvasGroup.length === 1
                ? canvasesPerCanvasGroup[0]
                : canvasesPerCanvasGroup[1];
        };
        return ContentSearchNavigationService;
    }());
    ContentSearchNavigationService.decorators = [
        { type: i0.Injectable }
    ];
    ContentSearchNavigationService.ctorParameters = function () { return [
        { type: CanvasService },
        { type: IiifContentSearchService }
    ]; };

    var AccessKeysService = /** @class */ (function () {
        function AccessKeysService(viewerService, canvasService, modeService, iiifManifestService, iiifContentSearchService, contentSearchDialogService, contentsDialogService, mimeDomHelper, contentSearchNavigationService) {
            var _this = this;
            this.viewerService = viewerService;
            this.canvasService = canvasService;
            this.modeService = modeService;
            this.iiifManifestService = iiifManifestService;
            this.iiifContentSearchService = iiifContentSearchService;
            this.contentSearchDialogService = contentSearchDialogService;
            this.contentsDialogService = contentsDialogService;
            this.mimeDomHelper = mimeDomHelper;
            this.contentSearchNavigationService = contentSearchNavigationService;
            this.isSearchable = false;
            this.hasHits = false;
            this.disabledKeys = [];
            this.destroyed = new rxjs.Subject();
            this.invert = false;
            this.iiifManifestService.currentManifest
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (manifest) {
                _this.isSearchable = _this.isManifestSearchable(manifest);
                _this.invert = manifest.viewingDirection === ViewingDirection.RTL;
            });
            this.iiifContentSearchService.onChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (result) {
                _this.hasHits = result.hits.length > 0;
            });
        }
        AccessKeysService.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        AccessKeysService.prototype.handleKeyEvents = function (event) {
            var accessKeys = new AccessKeys(event);
            if (!this.isKeyDisabled(event.keyCode)) {
                if (accessKeys.isArrowLeftKeys()) {
                    if (!this.isZoomedIn()) {
                        this.invert
                            ? this.goToNextCanvasGroup()
                            : this.goToPreviousCanvasGroup();
                    }
                }
                else if (accessKeys.isArrowRightKeys()) {
                    if (!this.isZoomedIn()) {
                        this.invert
                            ? this.goToPreviousCanvasGroup()
                            : this.goToNextCanvasGroup();
                    }
                }
                else if (accessKeys.isFirstCanvasGroupKeys()) {
                    this.goToFirstCanvasGroup();
                }
                else if (accessKeys.isLastCanvasGroupKeys()) {
                    this.goToLastCanvasGroup();
                }
                else if (accessKeys.isNextHitKeys() && this.hasHits) {
                    this.goToNextHit();
                }
                else if (accessKeys.isPreviousHitKeys() && this.hasHits) {
                    this.goToPreviousHit();
                }
                else if (accessKeys.isFullscreenKeys()) {
                    this.toggleFullscreen();
                }
                else if (accessKeys.isSearchDialogKeys() && this.isSearchable) {
                    this.toggleSearchDialog();
                }
                else if (accessKeys.isContentsDialogKeys()) {
                    this.toggleContentsDialog();
                }
                else if (accessKeys.isResetSearchKeys()) {
                    this.resetSearch();
                }
                else if (accessKeys.isPageDownKeys()) {
                    this.goToNextCanvasGroup();
                }
                else if (accessKeys.isPageUpKeys()) {
                    this.goToPreviousCanvasGroup();
                }
                else if (accessKeys.isZoomInKeys()) {
                    this.zoomIn();
                }
                else if (accessKeys.isZoomOutKeys()) {
                    this.zoomOut();
                }
                else if (accessKeys.isZoomHomeKeys()) {
                    this.zoomHome();
                }
                else if (accessKeys.isRotateKeys()) {
                    this.rotateClockWise();
                }
            }
        };
        AccessKeysService.prototype.goToNextCanvasGroup = function () {
            this.viewerService.goToNextCanvasGroup();
        };
        AccessKeysService.prototype.goToPreviousCanvasGroup = function () {
            this.viewerService.goToPreviousCanvasGroup();
        };
        AccessKeysService.prototype.goToFirstCanvasGroup = function () {
            this.viewerService.goToCanvasGroup(0, false);
        };
        AccessKeysService.prototype.goToLastCanvasGroup = function () {
            this.viewerService.goToCanvasGroup(this.canvasService.numberOfCanvasGroups - 1, false);
        };
        AccessKeysService.prototype.rotateClockWise = function () {
            this.viewerService.rotate();
            this.mimeDomHelper.setFocusOnViewer();
        };
        AccessKeysService.prototype.goToNextHit = function () {
            this.contentSearchNavigationService.goToNextCanvasGroupHit();
        };
        AccessKeysService.prototype.goToPreviousHit = function () {
            this.contentSearchNavigationService.goToPreviousCanvasGroupHit();
        };
        AccessKeysService.prototype.zoomIn = function () {
            if (this.modeService.mode === exports.MimeViewerMode.DASHBOARD) {
                this.modeService.toggleMode();
            }
            else {
                this.viewerService.zoomIn();
            }
        };
        AccessKeysService.prototype.zoomOut = function () {
            if (this.modeService.mode === exports.MimeViewerMode.PAGE) {
                this.modeService.toggleMode();
            }
            else if (this.modeService.mode === exports.MimeViewerMode.PAGE_ZOOMED) {
                this.viewerService.zoomOut();
            }
        };
        AccessKeysService.prototype.zoomHome = function () {
            if (this.modeService.mode === exports.MimeViewerMode.PAGE_ZOOMED) {
                this.viewerService.home();
            }
        };
        AccessKeysService.prototype.toggleSearchDialog = function () {
            if (this.modeService.mode === exports.MimeViewerMode.PAGE ||
                this.modeService.mode === exports.MimeViewerMode.PAGE_ZOOMED) {
                this.modeService.mode = exports.MimeViewerMode.DASHBOARD;
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
            this.contentsDialogService.close();
        };
        AccessKeysService.prototype.toggleContentsDialog = function () {
            if (this.modeService.mode === exports.MimeViewerMode.PAGE ||
                this.modeService.mode === exports.MimeViewerMode.PAGE_ZOOMED) {
                this.modeService.mode = exports.MimeViewerMode.DASHBOARD;
                this.contentsDialogService.open();
            }
            else {
                if (this.contentsDialogService.isOpen()) {
                    this.contentsDialogService.close();
                }
                else {
                    this.contentsDialogService.open();
                }
            }
            this.contentSearchDialogService.close();
        };
        AccessKeysService.prototype.toggleFullscreen = function () {
            this.mimeDomHelper.toggleFullscreen();
            this.mimeDomHelper.setFocusOnViewer();
        };
        AccessKeysService.prototype.resetSearch = function () {
            this.iiifContentSearchService.destroy();
        };
        AccessKeysService.prototype.isManifestSearchable = function (manifest) {
            return manifest.service ? true : false;
        };
        AccessKeysService.prototype.isZoomedIn = function () {
            return this.modeService.mode === exports.MimeViewerMode.PAGE_ZOOMED;
        };
        AccessKeysService.prototype.updateDisabledKeys = function () {
            this.resetDisabledKeys();
            if (this.contentsDialogService.isOpen()) {
                this.disableKeysForContentDialog();
            }
            else if (this.contentSearchDialogService.isOpen()) {
                this.diableKeysForContentSearchDialog();
            }
        };
        AccessKeysService.prototype.disableKeysForContentDialog = function () {
            this.disabledKeys = this.disabledKeys
                .concat(AccessKeys.ARROWLEFT)
                .concat(AccessKeys.ARROWRIGHT);
        };
        AccessKeysService.prototype.diableKeysForContentSearchDialog = function () {
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
                .concat(AccessKeys.toggleContentsDialogCodes)
                .concat(AccessKeys.toggleFullscreenCodes);
        };
        AccessKeysService.prototype.resetDisabledKeys = function () {
            this.disabledKeys = [];
        };
        AccessKeysService.prototype.isKeyDisabled = function (keyCode) {
            this.updateDisabledKeys();
            return this.disabledKeys.indexOf(keyCode) > -1;
        };
        return AccessKeysService;
    }());
    AccessKeysService.decorators = [
        { type: i0.Injectable }
    ];
    AccessKeysService.ctorParameters = function () { return [
        { type: ViewerService },
        { type: CanvasService },
        { type: ModeService },
        { type: IiifManifestService },
        { type: IiifContentSearchService },
        { type: ContentSearchDialogService },
        { type: ContentsDialogService },
        { type: MimeDomHelper },
        { type: ContentSearchNavigationService }
    ]; };

    var AttributionDialogResizeService = /** @class */ (function () {
        function AttributionDialogResizeService(mimeDomHelper) {
            this.mimeDomHelper = mimeDomHelper;
            this.resizeSubject = new rxjs.ReplaySubject();
            this.dimensions = new Dimensions();
        }
        Object.defineProperty(AttributionDialogResizeService.prototype, "el", {
            get: function () {
                return this._el;
            },
            set: function (el) {
                this._el = el;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AttributionDialogResizeService.prototype, "onResize", {
            get: function () {
                return this.resizeSubject.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        AttributionDialogResizeService.prototype.markForCheck = function () {
            var dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);
            if (this.dimensions.bottom !== dimensions.bottom ||
                this.dimensions.height !== dimensions.height ||
                this.dimensions.left !== dimensions.left ||
                this.dimensions.right !== dimensions.right ||
                this.dimensions.top !== dimensions.top ||
                this.dimensions.width !== dimensions.width) {
                this.dimensions = dimensions;
                this.resizeSubject.next(Object.assign({}, this.dimensions));
            }
        };
        return AttributionDialogResizeService;
    }());
    AttributionDialogResizeService.decorators = [
        { type: i0.Injectable }
    ];
    AttributionDialogResizeService.ctorParameters = function () { return [
        { type: MimeDomHelper }
    ]; };

    var AttributionDialogComponent = /** @class */ (function () {
        function AttributionDialogComponent(intl, renderer, el, changeDetectorRef, iiifManifestService, attributionDialogResizeService, styleService, accessKeysHandlerService) {
            this.intl = intl;
            this.renderer = renderer;
            this.el = el;
            this.changeDetectorRef = changeDetectorRef;
            this.iiifManifestService = iiifManifestService;
            this.attributionDialogResizeService = attributionDialogResizeService;
            this.styleService = styleService;
            this.accessKeysHandlerService = accessKeysHandlerService;
            this.destroyed = new rxjs.Subject();
            attributionDialogResizeService.el = el;
        }
        AttributionDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.iiifManifestService.currentManifest
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (manifest) {
                _this.manifest = manifest;
                _this.changeDetectorRef.markForCheck();
            });
        };
        AttributionDialogComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.styleService.onChange.pipe(operators.takeUntil(this.destroyed)).subscribe(function (c) {
                var backgroundRgbaColor = _this.styleService.convertToRgba(c, 0.3);
                _this.renderer.setStyle(_this.container.nativeElement, 'background-color', backgroundRgbaColor);
            });
        };
        AttributionDialogComponent.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        AttributionDialogComponent.prototype.handleKeys = function (event) {
            this.accessKeysHandlerService.handleKeyEvents(event);
        };
        AttributionDialogComponent.prototype.onResize = function (event) {
            this.attributionDialogResizeService.markForCheck();
        };
        AttributionDialogComponent.prototype.ngAfterViewChecked = function () {
            this.attributionDialogResizeService.markForCheck();
        };
        return AttributionDialogComponent;
    }());
    AttributionDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div #container id=\"attribution-container\" class=\"attribution-container\">\n  <mat-toolbar class=\"attribution-toolbar\">\n    <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxFlex>\n      <h1 mat-dialog-title>{{ intl.attributionLabel }}</h1>\n      <button\n        mat-icon-button\n        [aria-label]=\"intl.attributonCloseAriaLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        [matDialogClose]=\"true\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n    </div>\n  </mat-toolbar>\n  <p mat-dialog-content [innerHTML]=\"manifest?.attribution\"> </p>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".attribution-toolbar{background:transparent;font-size:14px;min-height:20px!important;padding:8px}.mat-dialog-title{font-size:16px}.mat-dialog-content{margin:0;padding:8px}::ng-deep .attribution-panel{font-family:Roboto,Helvetica Neue,sans-serif}::ng-deep .attribution-panel>.mat-dialog-container{background:transparent!important;font-size:11px;padding:0}::ng-deep .attribution-toolbar>.mat-toolbar-layout>.mat-toolbar-row{height:20px}"]
                },] }
    ];
    AttributionDialogComponent.ctorParameters = function () { return [
        { type: MimeViewerIntl },
        { type: i0.Renderer2 },
        { type: i0.ElementRef },
        { type: i0.ChangeDetectorRef },
        { type: IiifManifestService },
        { type: AttributionDialogResizeService },
        { type: StyleService },
        { type: AccessKeysService }
    ]; };
    AttributionDialogComponent.propDecorators = {
        container: [{ type: i0.ViewChild, args: ['container', { static: true },] }],
        handleKeys: [{ type: i0.HostListener, args: ['keyup', ['$event'],] }],
        onResize: [{ type: i0.HostListener, args: ['window:resize', ['$event'],] }]
    };

    var AttributionDialogService = /** @class */ (function () {
        function AttributionDialogService(dialog, mimeResizeService, attributionDialogResizeService, mimeDomHelper) {
            this.dialog = dialog;
            this.mimeResizeService = mimeResizeService;
            this.attributionDialogResizeService = attributionDialogResizeService;
            this.mimeDomHelper = mimeDomHelper;
            this.isAttributionDialogOpen = false;
            this.attributionDialogHeight = 0;
            this.destroyed = new rxjs.Subject();
        }
        AttributionDialogService.prototype.initialize = function () {
            var _this = this;
            this.mimeResizeService.onResize
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (dimensions) {
                if (_this.isAttributionDialogOpen) {
                    var config = _this.getDialogConfig();
                    _this.dialogRef.updatePosition(config.position);
                }
            });
            this.attributionDialogResizeService.onResize
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (dimensions) {
                if (_this.isAttributionDialogOpen) {
                    _this.attributionDialogHeight = dimensions.height;
                    var config = _this.getDialogConfig();
                    _this.dialogRef.updatePosition(config.position);
                }
            });
        };
        AttributionDialogService.prototype.destroy = function () {
            this.close();
            this.destroyed.next();
        };
        Object.defineProperty(AttributionDialogService.prototype, "el", {
            set: function (el) {
                this._el = el;
            },
            enumerable: false,
            configurable: true
        });
        AttributionDialogService.prototype.open = function (timeout) {
            var _this = this;
            if (!this.isAttributionDialogOpen) {
                /**
                 * Sleeping for material animations to finish
                 * fix: https://github.com/angular/material2/issues/7438
                 */
                rxjs.interval(1000)
                    .pipe(operators.take(1))
                    .subscribe(function () {
                    var config = _this.getDialogConfig();
                    _this.dialogRef = _this.dialog.open(AttributionDialogComponent, config);
                    _this.dialogRef.afterClosed().subscribe(function (result) {
                        _this.isAttributionDialogOpen = false;
                        _this.mimeDomHelper.setFocusOnViewer();
                    });
                    _this.isAttributionDialogOpen = true;
                    _this.closeDialogAfter(timeout);
                });
            }
        };
        AttributionDialogService.prototype.close = function () {
            if (this.dialogRef) {
                this.dialogRef.close();
                this.isAttributionDialogOpen = false;
            }
        };
        AttributionDialogService.prototype.toggle = function () {
            this.isAttributionDialogOpen ? this.close() : this.open();
        };
        AttributionDialogService.prototype.closeDialogAfter = function (seconds) {
            var _this = this;
            if (seconds > 0) {
                rxjs.interval(seconds * 1000)
                    .pipe(operators.take(1))
                    .subscribe(function () {
                    _this.close();
                });
            }
        };
        AttributionDialogService.prototype.getDialogConfig = function () {
            var dimensions = this.getPosition(this._el);
            return {
                hasBackdrop: false,
                width: '180px',
                panelClass: 'attribution-panel',
                position: {
                    top: dimensions.top + 'px',
                    left: dimensions.left + 'px'
                },
                autoFocus: true,
                restoreFocus: false
            };
        };
        AttributionDialogService.prototype.getPosition = function (el) {
            var padding = 20;
            var dimensions = this.mimeDomHelper.getBoundingClientRect(el);
            return new Dimensions({
                top: dimensions.top + dimensions.height - this.attributionDialogHeight - 68,
                left: dimensions.left + padding
            });
        };
        return AttributionDialogService;
    }());
    AttributionDialogService.decorators = [
        { type: i0.Injectable }
    ];
    AttributionDialogService.ctorParameters = function () { return [
        { type: dialog.MatDialog },
        { type: MimeResizeService },
        { type: AttributionDialogResizeService },
        { type: MimeDomHelper }
    ]; };

    var AttributionDialogModule = /** @class */ (function () {
        function AttributionDialogModule() {
        }
        return AttributionDialogModule;
    }());
    AttributionDialogModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [SharedModule],
                    declarations: [AttributionDialogComponent],
                    providers: [
                        AttributionDialogService,
                        AttributionDialogResizeService,
                        MimeDomHelper
                    ]
                },] }
    ];

    var CanvasGroupDialogComponent = /** @class */ (function () {
        function CanvasGroupDialogComponent(dialogRef, fb, viewerService, canvasService, intl, changeDetectorRef) {
            this.dialogRef = dialogRef;
            this.fb = fb;
            this.viewerService = viewerService;
            this.canvasService = canvasService;
            this.intl = intl;
            this.changeDetectorRef = changeDetectorRef;
            this.destroyed = new rxjs.Subject();
            this.numberOfCanvases = this.canvasService.numberOfCanvases;
            this.createForm();
        }
        CanvasGroupDialogComponent.prototype.createForm = function () {
            this.canvasGroupControl = new forms.FormControl('', [
                forms.Validators.required,
                forms.Validators.min(1),
                forms.Validators.max(this.numberOfCanvases)
            ]);
            this.canvasGroupForm = this.fb.group({
                canvasGroupControl: this.canvasGroupControl
            });
        };
        CanvasGroupDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.intl.changes
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function () { return _this.changeDetectorRef.markForCheck(); });
        };
        CanvasGroupDialogComponent.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        CanvasGroupDialogComponent.prototype.onSubmit = function () {
            if (this.canvasGroupForm.valid) {
                var pageNumber = this.canvasGroupForm.get('canvasGroupControl').value - 1;
                this.viewerService.goToCanvasGroup(this.canvasService.findCanvasGroupByCanvasIndex(pageNumber), false);
                this.dialogRef.close();
            }
        };
        return CanvasGroupDialogComponent;
    }());
    CanvasGroupDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div fxLayout=\"column\">\n  <h1 class=\"canvas-group-dialog-title\">{{ intl.goToPageLabel }}</h1>\n  <form\n    [formGroup]=\"canvasGroupForm\"\n    (ngSubmit)=\"onSubmit()\"\n    novalidate\n    autocomplete=\"off\"\n  >\n    <mat-form-field [floatLabel]=\"'always'\">\n      <input\n        id=\"goToCanvasGroupInput\"\n        type=\"number\"\n        matInput\n        min=\"1\"\n        [placeholder]=\"intl.enterPageNumber\"\n        formControlName=\"canvasGroupControl\"\n      />\n      <mat-error\n        id=\"canvasGroupDoesNotExistsError\"\n        *ngIf=\"canvasGroupControl.errors?.max\"\n        >{{ intl.pageDoesNotExists }}</mat-error\n      >\n    </mat-form-field>\n    <div fxLayout=\"row\" fxLayoutAlign=\"end center\">\n      <button id=\"cancelButton\" type=\"button\" mat-button matDialogClose>\n        CANCEL\n      </button>\n      <button\n        id=\"goToCanvasGroupSubmitButton\"\n        type=\"submit\"\n        mat-button\n        [disabled]=\"canvasGroupForm.pristine || canvasGroupForm.invalid\"\n      >\n        OK\n      </button>\n    </div>\n  </form>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".canvas-group-dialog-title{display:block;margin:0 0 20px}"]
                },] }
    ];
    CanvasGroupDialogComponent.ctorParameters = function () { return [
        { type: dialog.MatDialogRef },
        { type: forms.FormBuilder },
        { type: ViewerService },
        { type: CanvasService },
        { type: MimeViewerIntl },
        { type: i0.ChangeDetectorRef }
    ]; };

    var CanvasGroupDialogService = /** @class */ (function () {
        function CanvasGroupDialogService(dialog) {
            this.dialog = dialog;
            this.isCanvasGroupDialogOpen = false;
            this.destroyed = new rxjs.Subject();
        }
        CanvasGroupDialogService.prototype.initialize = function () { };
        CanvasGroupDialogService.prototype.destroy = function () {
            this.close();
            this.destroyed.next();
        };
        CanvasGroupDialogService.prototype.open = function (timeout) {
            var _this = this;
            if (!this.isCanvasGroupDialogOpen) {
                var config = this.getDialogConfig();
                this.dialogRef = this.dialog.open(CanvasGroupDialogComponent, config);
                this.dialogRef.afterClosed().subscribe(function (result) {
                    _this.isCanvasGroupDialogOpen = false;
                });
                this.isCanvasGroupDialogOpen = true;
            }
        };
        CanvasGroupDialogService.prototype.close = function () {
            if (this.dialogRef) {
                this.dialogRef.close();
                this.isCanvasGroupDialogOpen = false;
            }
        };
        CanvasGroupDialogService.prototype.toggle = function () {
            this.isCanvasGroupDialogOpen ? this.close() : this.open();
        };
        CanvasGroupDialogService.prototype.getDialogConfig = function () {
            return {
                hasBackdrop: false,
                disableClose: true,
                panelClass: 'canvas-group-panel'
            };
        };
        return CanvasGroupDialogService;
    }());
    CanvasGroupDialogService.decorators = [
        { type: i0.Injectable }
    ];
    CanvasGroupDialogService.ctorParameters = function () { return [
        { type: dialog.MatDialog }
    ]; };

    var CanvasGroupDialogModule = /** @class */ (function () {
        function CanvasGroupDialogModule() {
        }
        return CanvasGroupDialogModule;
    }());
    CanvasGroupDialogModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [SharedModule],
                    declarations: [CanvasGroupDialogComponent],
                    providers: [CanvasGroupDialogService]
                },] }
    ];

    var ContentSearchDialogModule = /** @class */ (function () {
        function ContentSearchDialogModule() {
        }
        return ContentSearchDialogModule;
    }());
    ContentSearchDialogModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [SharedModule],
                    declarations: [ContentSearchDialogComponent],
                    providers: [
                        ContentSearchDialogService,
                        ContentSearchDialogConfigStrategyFactory
                    ]
                },] }
    ];

    var HelpDialogComponent = /** @class */ (function () {
        function HelpDialogComponent(mediaObserver, intl, mimeResizeService) {
            this.mediaObserver = mediaObserver;
            this.intl = intl;
            this.mimeResizeService = mimeResizeService;
            this.tabHeight = {};
            this.mimeHeight = 0;
            this.destroyed = new rxjs.Subject();
        }
        HelpDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.mimeResizeService.onResize
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (dimensions) {
                _this.mimeHeight = dimensions.height;
                _this.resizeTabHeight();
            });
            this.resizeTabHeight();
        };
        HelpDialogComponent.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        HelpDialogComponent.prototype.resizeTabHeight = function () {
            var height = this.mimeHeight;
            if (this.mediaObserver.isActive('lt-md')) {
                this.tabHeight = {
                    maxHeight: window.innerHeight - 128 + 'px'
                };
            }
            else {
                height -= 272;
                this.tabHeight = {
                    maxHeight: height + 'px'
                };
            }
        };
        return HelpDialogComponent;
    }());
    HelpDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mime-help',
                    template: "<div id=\"help-container\" class=\"help-container\">\n  <div [ngSwitch]=\"mediaObserver.isActive('lt-md')\">\n    <div *ngSwitchCase=\"true\">\n      <mat-toolbar color=\"primary\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n          <button\n            mat-icon-button\n            [matDialogClose]=\"true\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n          <h1 mat-dialog-title>{{intl.help.helpLabel}}</h1>\n        </div>\n      </mat-toolbar>\n    </div>\n    <div *ngSwitchDefault>\n      <mat-toolbar>\n        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxFlex>\n          <h1 class=\"heading-desktop\" mat-dialog-title>{{intl.help.helpLabel}}</h1>\n          <button\n            mat-icon-button\n            [matDialogClose]=\"true\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n        </div>\n      </mat-toolbar>\n    </div>\n  </div>\n  <div [ngStyle]=\"tabHeight\" class=\"help-content\">\n    <p [innerHTML]=\"intl.help.line1\"></p>\n    <p [innerHTML]=\"intl.help.line2\"></p>\n    <p [innerHTML]=\"intl.help.line3\"></p>\n    <p [innerHTML]=\"intl.help.line4\"></p>\n    <p [innerHTML]=\"intl.help.line5\"></p>\n    <p [innerHTML]=\"intl.help.line6\"></p>\n    <p [innerHTML]=\"intl.help.line7\"></p>\n    <p [innerHTML]=\"intl.help.line8\"></p>\n    <p [innerHTML]=\"intl.help.line9\"></p>\n    <p [innerHTML]=\"intl.help.line10\"></p>\n  </div>\n</div>\n",
                    styles: [".help-container{font-family:Roboto,Helvetica Neue,sans-serif;font-size:14px}.help-content{overflow:auto;padding:16px}::ng-deep .help-panel{max-width:none!important}::ng-deep .help-panel>.mat-dialog-container{overflow:initial;padding:0!important}"]
                },] }
    ];
    HelpDialogComponent.ctorParameters = function () { return [
        { type: flexLayout.MediaObserver },
        { type: MimeViewerIntl },
        { type: MimeResizeService }
    ]; };

    var MobileHelpDialogConfigStrategy = /** @class */ (function () {
        function MobileHelpDialogConfigStrategy() {
        }
        MobileHelpDialogConfigStrategy.prototype.getConfig = function (elementRef) {
            return {
                hasBackdrop: false,
                disableClose: false,
                autoFocus: false,
                width: '100%',
                height: '100%',
                panelClass: 'help-panel'
            };
        };
        return MobileHelpDialogConfigStrategy;
    }());
    var DesktopHelpDialogConfigStrategy = /** @class */ (function () {
        function DesktopHelpDialogConfigStrategy(mimeDomHelper) {
            this.mimeDomHelper = mimeDomHelper;
        }
        DesktopHelpDialogConfigStrategy.prototype.getConfig = function (el) {
            var dimensions = this.getPosition(el);
            return {
                hasBackdrop: false,
                disableClose: false,
                autoFocus: false,
                width: DesktopHelpDialogConfigStrategy.dialogWidth + "px",
                position: {
                    top: dimensions.top + 'px',
                    left: dimensions.left + 'px'
                },
                panelClass: 'help-panel'
            };
        };
        DesktopHelpDialogConfigStrategy.prototype.getPosition = function (el) {
            var dimensions = this.mimeDomHelper.getBoundingClientRect(el);
            return new Dimensions({
                top: dimensions.top + 64,
                left: dimensions.right -
                    DesktopHelpDialogConfigStrategy.dialogWidth -
                    DesktopHelpDialogConfigStrategy.paddingRight
            });
        };
        return DesktopHelpDialogConfigStrategy;
    }());
    DesktopHelpDialogConfigStrategy.dialogWidth = 350;
    DesktopHelpDialogConfigStrategy.paddingRight = 20;

    var HelpDialogConfigStrategyFactory = /** @class */ (function () {
        function HelpDialogConfigStrategyFactory(mediaObserver, mimeDomHelper) {
            this.mediaObserver = mediaObserver;
            this.mimeDomHelper = mimeDomHelper;
        }
        HelpDialogConfigStrategyFactory.prototype.create = function () {
            return this.mediaObserver.isActive('lt-md')
                ? new MobileHelpDialogConfigStrategy()
                : new DesktopHelpDialogConfigStrategy(this.mimeDomHelper);
        };
        return HelpDialogConfigStrategyFactory;
    }());
    HelpDialogConfigStrategyFactory.decorators = [
        { type: i0.Injectable }
    ];
    HelpDialogConfigStrategyFactory.ctorParameters = function () { return [
        { type: flexLayout.MediaObserver },
        { type: MimeDomHelper }
    ]; };

    var HelpDialogService = /** @class */ (function () {
        function HelpDialogService(dialog, helpDialogConfigStrategyFactory, mimeResizeService) {
            this.dialog = dialog;
            this.helpDialogConfigStrategyFactory = helpDialogConfigStrategyFactory;
            this.mimeResizeService = mimeResizeService;
            this.isHelpDialogOpen = false;
            this.destroyed = new rxjs.Subject();
        }
        HelpDialogService.prototype.initialize = function () {
            var _this = this;
            this.mimeResizeService.onResize
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function () {
                if (_this.isHelpDialogOpen) {
                    var config = _this.getDialogConfig();
                    _this.dialogRef.updatePosition(config.position);
                    _this.dialogRef.updateSize(config.width, config.height);
                }
            });
        };
        HelpDialogService.prototype.destroy = function () {
            this.close();
            this.destroyed.next();
        };
        Object.defineProperty(HelpDialogService.prototype, "el", {
            set: function (el) {
                this._el = el;
            },
            enumerable: false,
            configurable: true
        });
        HelpDialogService.prototype.open = function () {
            var _this = this;
            if (!this.isHelpDialogOpen) {
                var config = this.getDialogConfig();
                this.dialogRef = this.dialog.open(HelpDialogComponent, config);
                this.dialogRef.afterClosed().subscribe(function () {
                    _this.isHelpDialogOpen = false;
                });
                this.isHelpDialogOpen = true;
            }
        };
        HelpDialogService.prototype.close = function () {
            if (this.dialogRef) {
                this.dialogRef.close();
            }
            this.isHelpDialogOpen = false;
        };
        HelpDialogService.prototype.toggle = function () {
            this.isHelpDialogOpen ? this.close() : this.open();
        };
        HelpDialogService.prototype.isOpen = function () {
            return this.isHelpDialogOpen;
        };
        HelpDialogService.prototype.getDialogConfig = function () {
            return this.helpDialogConfigStrategyFactory
                .create()
                .getConfig(this._el);
        };
        return HelpDialogService;
    }());
    HelpDialogService.decorators = [
        { type: i0.Injectable }
    ];
    HelpDialogService.ctorParameters = function () { return [
        { type: dialog.MatDialog },
        { type: HelpDialogConfigStrategyFactory },
        { type: MimeResizeService }
    ]; };

    var HelpDialogModule = /** @class */ (function () {
        function HelpDialogModule() {
        }
        return HelpDialogModule;
    }());
    HelpDialogModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [SharedModule],
                    declarations: [HelpDialogComponent],
                    providers: [
                        HelpDialogService,
                        HelpDialogConfigStrategyFactory
                    ]
                },] }
    ];

    var MetadataComponent = /** @class */ (function () {
        function MetadataComponent(intl, changeDetectorRef, iiifManifestService) {
            this.intl = intl;
            this.changeDetectorRef = changeDetectorRef;
            this.iiifManifestService = iiifManifestService;
            this.destroyed = new rxjs.Subject();
        }
        MetadataComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.iiifManifestService.currentManifest
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (manifest) {
                _this.manifest = manifest;
                _this.changeDetectorRef.markForCheck();
            });
        };
        MetadataComponent.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        return MetadataComponent;
    }());
    MetadataComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mime-metadata',
                    template: "<div id=\"metadata-container\" class=\"metadata-container\">\n  <div *ngFor=\"let metadata of manifest?.metadata\" class=\"metadata\">\n    <div class=\"title\">{{ metadata.label }}</div>\n    <span class=\"content\" [innerHTML]=\"metadata.value\"></span>\n  </div>\n  <div *ngIf=\"manifest?.attribution\">\n    <div class=\"title\">{{ intl.attributionLabel }}</div>\n    <span\n      id=\"metadata-attribution\"\n      class=\"content attribution\"\n      [innerHTML]=\"manifest?.attribution\"\n    ></span>\n  </div>\n  <div *ngIf=\"manifest?.license\">\n    <div class=\"title\">{{ intl.licenseLabel }}</div>\n    <span id=\"metadata-license\" class=\"content license\"\n      ><a [href]=\"manifest?.license\" target=\"_blank\">{{\n        manifest?.license\n      }}</a></span\n    >\n  </div>\n  <div *ngIf=\"manifest?.logo\">\n    <span id=\"metadata-logo\"\n      ><img class=\"content logo\" [src]=\"manifest?.logo\"\n    /></span>\n  </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".title{font-size:14px!important;font-weight:400;margin-bottom:4px}.content{display:block;font-size:12px;margin-bottom:8px;word-break:break-all}.logo{max-height:64px;max-width:300px}"]
                },] }
    ];
    MetadataComponent.ctorParameters = function () { return [
        { type: MimeViewerIntl },
        { type: i0.ChangeDetectorRef },
        { type: IiifManifestService }
    ]; };

    var TocComponent = /** @class */ (function () {
        function TocComponent(intl, changeDetectorRef, iiifManifestService, viewerService, canvasService) {
            this.intl = intl;
            this.changeDetectorRef = changeDetectorRef;
            this.iiifManifestService = iiifManifestService;
            this.viewerService = viewerService;
            this.canvasService = canvasService;
            this.canvasChanged = new i0.EventEmitter();
            this.destroyed = new rxjs.Subject();
        }
        TocComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.iiifManifestService.currentManifest
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (manifest) {
                _this.manifest = manifest;
                _this.currentCanvasGroupIndex = _this.canvasService.currentCanvasGroupIndex;
                _this.changeDetectorRef.detectChanges();
            });
            this.viewerService.onCanvasGroupIndexChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (canvasGroupIndex) {
                _this.currentCanvasGroupIndex = canvasGroupIndex;
                _this.changeDetectorRef.detectChanges();
            });
        };
        TocComponent.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        TocComponent.prototype.goToCanvas = function (event, canvasIndex) {
            event.preventDefault();
            this.viewerService.goToCanvas(canvasIndex, false);
            this.canvasChanged.emit(canvasIndex);
        };
        return TocComponent;
    }());
    TocComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mime-toc',
                    template: "<div id=\"toc-container\" class=\"toc-container\">\n  <div *ngFor=\"let structure of manifest?.structures\">\n    <a\n      href=\"\"\n      class=\"toc-link\"\n      [class.currentCanvasGroup]=\"\n        currentCanvasGroupIndex === structure.canvasIndex\n      \"\n      (click)=\"goToCanvas($event, structure.canvasIndex)\"\n      fxLayout=\"row\"\n      fxLayoutAlign=\"space-between center\"\n    >\n      <span class=\"label\">{{ structure.label }}</span>\n      <span class=\"canvasGroupIndex\">{{ structure.canvasIndex + 1 }}</span>\n    </a>\n  </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".toc-link{font-size:14px!important;font-weight:400;margin-bottom:8px;text-decoration:none}.currentCanvasGroup{font-weight:700}"]
                },] }
    ];
    TocComponent.ctorParameters = function () { return [
        { type: MimeViewerIntl },
        { type: i0.ChangeDetectorRef },
        { type: IiifManifestService },
        { type: ViewerService },
        { type: CanvasService }
    ]; };
    TocComponent.propDecorators = {
        canvasChanged: [{ type: i0.Output }]
    };

    var ContentsDialogModule = /** @class */ (function () {
        function ContentsDialogModule() {
        }
        return ContentsDialogModule;
    }());
    ContentsDialogModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [SharedModule],
                    declarations: [ContentsDialogComponent, MetadataComponent, TocComponent],
                    providers: [
                        ContentsDialogService,
                        ContentsDialogConfigStrategyFactory,
                        { provide: core.ErrorStateMatcher, useClass: core.ShowOnDirtyErrorStateMatcher }
                    ]
                },] }
    ];

    var CoreModule = /** @class */ (function () {
        function CoreModule() {
        }
        return CoreModule;
    }());
    CoreModule.decorators = [
        { type: i0.NgModule, args: [{
                    providers: [
                        MimeViewerIntl,
                        IiifManifestService,
                        IiifContentSearchService,
                        MimeResizeService,
                        FullscreenService,
                        ViewerService,
                        ClickService,
                        CanvasService,
                        ModeService,
                        SpinnerService,
                        AccessKeysService,
                        ViewerLayoutService,
                        ContentSearchNavigationService,
                        StyleService
                    ]
                },] }
    ];

    var OsdToolbarComponent = /** @class */ (function () {
        function OsdToolbarComponent(intl, renderer, changeDetectorRef, mimeService, viewerService, canvasService, styleService, iiifManifestService) {
            this.intl = intl;
            this.renderer = renderer;
            this.changeDetectorRef = changeDetectorRef;
            this.mimeService = mimeService;
            this.viewerService = viewerService;
            this.canvasService = canvasService;
            this.styleService = styleService;
            this.iiifManifestService = iiifManifestService;
            this.osdToolbarStyle = {};
            this.state = 'hide';
            this.invert = false;
            this.destroyed = new rxjs.Subject();
        }
        Object.defineProperty(OsdToolbarComponent.prototype, "osdToolbarState", {
            get: function () {
                return this.state;
            },
            enumerable: false,
            configurable: true
        });
        OsdToolbarComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.iiifManifestService.currentManifest
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (manifest) {
                _this.invert = manifest.viewingDirection === ViewingDirection.LTR;
                _this.changeDetectorRef.detectChanges();
            });
            this.mimeService.onResize
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (dimensions) {
                _this.osdToolbarStyle = {
                    top: dimensions.top + 110 + 'px'
                };
                _this.changeDetectorRef.detectChanges();
            });
            this.viewerService.onCanvasGroupIndexChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (currentCanvasGroupIndex) {
                _this.numberOfCanvasGroups = _this.canvasService.numberOfCanvasGroups;
                _this.isFirstCanvasGroup = _this.isOnFirstCanvasGroup(currentCanvasGroupIndex);
                _this.isLastCanvasGroup = _this.isOnLastCanvasGroup(currentCanvasGroupIndex);
                _this.changeDetectorRef.detectChanges();
            });
            this.intl.changes
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function () { return _this.changeDetectorRef.markForCheck(); });
        };
        OsdToolbarComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.styleService.onChange.pipe(operators.takeUntil(this.destroyed)).subscribe(function (c) {
                var backgroundRgbaColor = _this.styleService.convertToRgba(c, 0.3);
                _this.renderer.setStyle(_this.container.nativeElement, 'background-color', backgroundRgbaColor);
            });
        };
        OsdToolbarComponent.prototype.zoomIn = function () {
            this.viewerService.zoomIn();
        };
        OsdToolbarComponent.prototype.zoomOut = function () {
            this.viewerService.zoomOut();
        };
        OsdToolbarComponent.prototype.home = function () {
            this.viewerService.home();
        };
        OsdToolbarComponent.prototype.rotate = function () {
            this.viewerService.rotate();
        };
        OsdToolbarComponent.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        OsdToolbarComponent.prototype.goToPreviousCanvasGroup = function () {
            this.viewerService.goToPreviousCanvasGroup();
        };
        OsdToolbarComponent.prototype.goToNextCanvasGroup = function () {
            this.viewerService.goToNextCanvasGroup();
        };
        OsdToolbarComponent.prototype.isOnFirstCanvasGroup = function (currentCanvasGroupIndex) {
            return currentCanvasGroupIndex === 0;
        };
        OsdToolbarComponent.prototype.isOnLastCanvasGroup = function (currentCanvasGroupIndex) {
            return currentCanvasGroupIndex === this.numberOfCanvasGroups - 1;
        };
        return OsdToolbarComponent;
    }());
    OsdToolbarComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mime-osd-toolbar',
                    template: "<div #container class=\"osd-toolbar\" [ngStyle]=\"osdToolbarStyle\">\n  <div fxHide fxShow.gt-sm=\"true\">\n    <div\n      class=\"osd-toolbar-container\"\n      fxLayout=\"column\"\n      fxLayoutAlign=\"center center\"\n    >\n      <div class=\"osd-toolbar-row\"> </div>\n      <div class=\"osd-toolbar-row\">\n        <ng-container *ngIf=\"invert\">\n          <button\n            id=\"navigateBeforeButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.previousPageLabel\"\n            [matTooltip]=\"intl.previousPageLabel\"\n            [disabled]=\"isFirstCanvasGroup\"\n            (click)=\"goToPreviousCanvasGroup()\"\n          >\n            <mat-icon>navigate_before</mat-icon>\n          </button>\n        </ng-container>\n        <ng-container *ngIf=\"!invert\">\n          <button\n            id=\"navigateNextButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.nextPageLabel\"\n            [matTooltip]=\"intl.nextPageLabel\"\n            [disabled]=\"isLastCanvasGroup\"\n            (click)=\"goToNextCanvasGroup()\"\n          >\n            <mat-icon>navigate_before</mat-icon>\n          </button>\n        </ng-container>\n        <button\n          (click)=\"home()\"\n          id=\"homeButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.homeLabel\"\n          [matTooltip]=\"intl.homeLabel\"\n        >\n          <mat-icon>home</mat-icon>\n        </button>\n        <ng-container *ngIf=\"invert\">\n          <button\n            id=\"navigateNextButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.nextPageLabel\"\n            [matTooltip]=\"intl.nextPageLabel\"\n            [disabled]=\"isLastCanvasGroup\"\n            (click)=\"goToNextCanvasGroup()\"\n          >\n            <mat-icon>navigate_next</mat-icon>\n          </button>\n        </ng-container>\n        <ng-container *ngIf=\"!invert\">\n          <button\n            id=\"navigateBeforeButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.previousPageLabel\"\n            [matTooltip]=\"intl.previousPageLabel\"\n            [disabled]=\"isFirstCanvasGroup\"\n            (click)=\"goToPreviousCanvasGroup()\"\n          >\n            <mat-icon>navigate_next</mat-icon>\n          </button>\n        </ng-container>\n      </div>\n\n      <div class=\"osd-toolbar-row\">\n        <button\n          (click)=\"zoomIn()\"\n          id=\"zoomInButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.zoomInLabel\"\n          [matTooltip]=\"intl.zoomInLabel\"\n        >\n          <mat-icon>zoom_in</mat-icon>\n        </button>\n\n        <button\n          (click)=\"rotate()\"\n          id=\"rotateButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.rotateCwLabel\"\n          [matTooltip]=\"intl.rotateCwLabel\"\n        >\n          <mat-icon>rotate_right</mat-icon>\n        </button>\n        <button\n          (click)=\"zoomOut()\"\n          id=\"zoomOutButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.zoomOutLabel\"\n          [matTooltip]=\"intl.zoomOutLabel\"\n        >\n          <mat-icon>zoom_out</mat-icon>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    animations: [
                        animations.trigger('osdToolbarState', [
                            animations.state('hide', animations.style({
                                transform: 'translate(-120px, 0)',
                                display: 'none'
                            })),
                            animations.state('show', animations.style({
                                transform: 'translate(0px, 0px)',
                                display: 'block'
                            })),
                            animations.transition('hide => show', [
                                animations.group([
                                    animations.style({ display: 'block' }),
                                    animations.animate(ViewerOptions.transitions.toolbarsEaseInTime + "ms ease-out")
                                ])
                            ]),
                            animations.transition('show => hide', animations.animate(ViewerOptions.transitions.toolbarsEaseOutTime + "ms ease-in"))
                        ])
                    ],
                    styles: [":host{z-index:1}::ng-deep .osd-toolbar-row>.mat-toolbar-row{height:40px}.osd-toolbar{background:transparent;border-radius:8px;margin-left:16px;position:absolute;width:auto;z-index:2}"]
                },] }
    ];
    OsdToolbarComponent.ctorParameters = function () { return [
        { type: MimeViewerIntl },
        { type: i0.Renderer2 },
        { type: i0.ChangeDetectorRef },
        { type: MimeResizeService },
        { type: ViewerService },
        { type: CanvasService },
        { type: StyleService },
        { type: IiifManifestService }
    ]; };
    OsdToolbarComponent.propDecorators = {
        container: [{ type: i0.ViewChild, args: ['container', { static: true },] }],
        osdToolbarState: [{ type: i0.HostBinding, args: ['@osdToolbarState',] }]
    };

    var CanvasGroupNavigatorComponent = /** @class */ (function () {
        function CanvasGroupNavigatorComponent(intl, changeDetectorRef, viewerService, canvasService, pageDialogService, iiifManifestService) {
            this.intl = intl;
            this.changeDetectorRef = changeDetectorRef;
            this.viewerService = viewerService;
            this.canvasService = canvasService;
            this.pageDialogService = pageDialogService;
            this.iiifManifestService = iiifManifestService;
            this.invert = false;
            this.currentSliderCanvasGroupIndex = -1;
            this.destroyed = new rxjs.Subject();
        }
        CanvasGroupNavigatorComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.iiifManifestService.currentManifest
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (manifest) {
                _this.invert = manifest.viewingDirection === ViewingDirection.LTR;
                _this.changeDetectorRef.detectChanges();
            });
            this.canvasService.onCanvasGroupIndexChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (currentCanvasGroupIndex) {
                if (_this.currentSliderCanvasGroupIndex !== -1 &&
                    _this.currentSliderCanvasGroupIndex === currentCanvasGroupIndex) {
                    _this.currentSliderCanvasGroupIndex = -1;
                }
                else if (_this.currentSliderCanvasGroupIndex === -1) {
                    _this.currentCanvasGroupIndex = currentCanvasGroupIndex;
                    _this.canvasGroupLabel = _this.canvasService.getCanvasGroupLabel(_this.currentCanvasGroupIndex);
                }
                _this.isFirstCanvasGroup = _this.isOnFirstCanvasGroup(currentCanvasGroupIndex);
                _this.isLastCanvasGroup = _this.isOnLastCanvasGroup(currentCanvasGroupIndex);
                _this.changeDetectorRef.detectChanges();
            });
            this.canvasService.onNumberOfCanvasGroupsChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (numberOfCanvasGroups) {
                _this.numberOfCanvasGroups = numberOfCanvasGroups;
                _this.numberOfCanvases = _this.canvasService.numberOfCanvases;
                _this.isFirstCanvasGroup = _this.isOnFirstCanvasGroup(_this.currentCanvasGroupIndex);
                _this.isLastCanvasGroup = _this.isOnLastCanvasGroup(_this.currentCanvasGroupIndex);
                _this.changeDetectorRef.detectChanges();
            });
        };
        CanvasGroupNavigatorComponent.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        CanvasGroupNavigatorComponent.prototype.goToPreviousCanvasGroup = function () {
            this.viewerService.goToPreviousCanvasGroup();
        };
        CanvasGroupNavigatorComponent.prototype.goToNextCanvasGroup = function () {
            this.viewerService.goToNextCanvasGroup();
        };
        CanvasGroupNavigatorComponent.prototype.onSliderChange = function (change) {
            this.currentSliderCanvasGroupIndex = change.value;
            this.currentCanvasGroupIndex = change.value;
            this.canvasGroupLabel = this.canvasService.getCanvasGroupLabel(this.currentCanvasGroupIndex);
            this.viewerService.goToCanvasGroup(change.value, false);
            this.changeDetectorRef.detectChanges();
        };
        CanvasGroupNavigatorComponent.prototype.onSliderHotKey = function (event) {
            var accessKeys = new AccessKeys(event);
            if (accessKeys.isSliderKeys()) {
                event.stopPropagation();
            }
        };
        CanvasGroupNavigatorComponent.prototype.openCanvasGroupDialog = function () {
            this.pageDialogService.toggle();
        };
        CanvasGroupNavigatorComponent.prototype.isOnFirstCanvasGroup = function (currentCanvasGroupIndex) {
            return currentCanvasGroupIndex === 0;
        };
        CanvasGroupNavigatorComponent.prototype.isOnLastCanvasGroup = function (currentCanvasGroupIndex) {
            return currentCanvasGroupIndex === this.numberOfCanvasGroups - 1;
        };
        return CanvasGroupNavigatorComponent;
    }());
    CanvasGroupNavigatorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mime-page-navigator',
                    template: "<mat-toolbar>\n  <div fxLayout=\"row\" fxFlex fxLayoutAlign=\"start center\">\n    <div fxFlex>\n      <mat-slider\n        id=\"navigationSlider\"\n        class=\"navigation-slider\"\n        [invert]=\"!invert\"\n        [max]=\"numberOfCanvasGroups - 1\"\n        [value]=\"currentCanvasGroupIndex\"\n        [attr.aria-label]=\"intl.currentPageLabel\"\n        (input)=\"onSliderChange($event)\"\n        (keyup)=\"onSliderHotKey($event)\"\n        fxFlex\n      ></mat-slider>\n    </div>\n    <button\n      mat-button\n      id=\"goToCanvasGroupButton\"\n      class=\"canvasGroups\"\n      (click)=\"openCanvasGroupDialog()\"\n    >\n      <div fxLayout=\"row\" fxLayoutGap=\"1px\">\n        <span id=\"currentCanvasGroupLabel\">{{ canvasGroupLabel }}</span\n        ><span>/</span\n        ><span id=\"numOfCanvasGroups\">{{ numberOfCanvases }}</span>\n      </div>\n    </button>\n    <div class=\"navigation-buttons\">\n      <ng-container *ngIf=\"invert\">\n        <button\n          id=\"footerNavigateBeforeButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.previousPageLabel\"\n          [matTooltip]=\"intl.previousPageLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isFirstCanvasGroup\"\n          (click)=\"goToPreviousCanvasGroup()\"\n        >\n          <mat-icon>navigate_before</mat-icon>\n        </button>\n        <button\n          id=\"footerNavigateNextButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.nextPageLabel\"\n          [matTooltip]=\"intl.nextPageLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isLastCanvasGroup\"\n          (click)=\"goToNextCanvasGroup()\"\n        >\n          <mat-icon>navigate_next</mat-icon>\n        </button>\n      </ng-container>\n      <ng-container *ngIf=\"!invert\">\n        <button\n          id=\"footerNavigateNextButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.nextPageLabel\"\n          [matTooltip]=\"intl.nextPageLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isLastCanvasGroup\"\n          (click)=\"goToNextCanvasGroup()\"\n        >\n          <mat-icon>navigate_before</mat-icon>\n        </button>\n        <button\n          id=\"footerNavigateBeforeButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.previousPageLabel\"\n          [matTooltip]=\"intl.previousPageLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isFirstCanvasGroup\"\n          (click)=\"goToPreviousCanvasGroup()\"\n        >\n          <mat-icon>navigate_next</mat-icon>\n        </button>\n      </ng-container>\n    </div>\n  </div>\n</mat-toolbar>\n",
                    styles: [".canvasGroups{cursor:pointer;font-size:13px;text-align:center}.navigation-slider{width:100%}"]
                },] }
    ];
    CanvasGroupNavigatorComponent.ctorParameters = function () { return [
        { type: MimeViewerIntl },
        { type: i0.ChangeDetectorRef },
        { type: ViewerService },
        { type: CanvasService },
        { type: CanvasGroupDialogService },
        { type: IiifManifestService }
    ]; };
    CanvasGroupNavigatorComponent.propDecorators = {
        searchResult: [{ type: i0.Input }]
    };

    var ContentSearchNavigatorComponent = /** @class */ (function () {
        function ContentSearchNavigatorComponent(intl, changeDetectorRef, canvasService, iiifContentSearchService, contentSearchNavigationService, iiifManifestService) {
            this.intl = intl;
            this.changeDetectorRef = changeDetectorRef;
            this.canvasService = canvasService;
            this.iiifContentSearchService = iiifContentSearchService;
            this.contentSearchNavigationService = contentSearchNavigationService;
            this.iiifManifestService = iiifManifestService;
            this.isHitOnActiveCanvasGroup = false;
            this.isFirstCanvasGroupHit = false;
            this.isLastCanvasGroupHit = false;
            this.currentIndex = 0;
            this.invert = false;
            this.destroyed = new rxjs.Subject();
        }
        ContentSearchNavigatorComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.iiifManifestService.currentManifest
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (manifest) {
                _this.invert = manifest.viewingDirection === ViewingDirection.LTR;
                _this.changeDetectorRef.detectChanges();
            });
            this.intl.changes
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function () { return _this.changeDetectorRef.markForCheck(); });
            this.canvasService.onCanvasGroupIndexChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (canvasGroupIndex) {
                _this.contentSearchNavigationService.update(canvasGroupIndex);
                _this.currentIndex = _this.contentSearchNavigationService.getCurrentIndex();
                _this.isHitOnActiveCanvasGroup = _this.contentSearchNavigationService.getHitOnActiveCanvasGroup();
                _this.isFirstCanvasGroupHit = _this.contentSearchNavigationService.getFirstHitCanvasGroup();
                _this.isLastCanvasGroupHit = _this.contentSearchNavigationService.getLastHitCanvasGroup();
                _this.changeDetectorRef.detectChanges();
            });
        };
        ContentSearchNavigatorComponent.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        ContentSearchNavigatorComponent.prototype.clear = function () {
            this.iiifContentSearchService.destroy();
        };
        ContentSearchNavigatorComponent.prototype.goToPreviousCanvasGroupHit = function () {
            this.contentSearchNavigationService.goToPreviousCanvasGroupHit();
        };
        ContentSearchNavigatorComponent.prototype.goToNextCanvasGroupHit = function () {
            this.contentSearchNavigationService.goToNextCanvasGroupHit();
        };
        return ContentSearchNavigatorComponent;
    }());
    ContentSearchNavigatorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mime-content-search-navigator',
                    template: "<mat-toolbar id=\"content-search-navigator-toolbar\" color=\"primary\">\n  <div\n    *ngIf=\"searchResult\"\n    fxLayout=\"row\"\n    fxFlex\n    fxLayoutAlign=\"space-between center\"\n  >\n    <div>\n      <button\n        id=\"footerNavigateCloseHitsButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.closeLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        matTooltipPosition=\"above\"\n        (click)=\"clear()\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n    </div>\n    <div\n      fxFlex\n      class=\"current-hit-label\"\n      [ngClass]=\"{ 'not-on-page': !isHitOnActiveCanvasGroup }\"\n      fxFlex\n      [innerHTML]=\"intl.currentHitLabel(currentIndex + 1, searchResult.size())\"\n    ></div>\n    <div class=\"navigation-buttons\">\n      <ng-container *ngIf=\"invert\">\n        <button\n          id=\"footerNavigatePreviousHitButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.previousHitLabel\"\n          [matTooltip]=\"intl.previousHitLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isFirstCanvasGroupHit\"\n          (click)=\"goToPreviousCanvasGroupHit()\"\n        >\n          <mat-icon>navigate_before</mat-icon>\n        </button>\n        <button\n          id=\"footerNavigateNextHitButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.nextHitLabel\"\n          [matTooltip]=\"intl.nextHitLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isLastCanvasGroupHit\"\n          (click)=\"goToNextCanvasGroupHit()\"\n        >\n          <mat-icon>navigate_next</mat-icon>\n        </button>\n      </ng-container>\n      <ng-container *ngIf=\"!invert\">\n        <button\n          id=\"footerNavigateNextHitButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.nextHitLabel\"\n          [matTooltip]=\"intl.nextHitLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isLastCanvasGroupHit\"\n          (click)=\"goToNextCanvasGroupHit()\"\n        >\n          <mat-icon>navigate_before</mat-icon>\n        </button>\n        <button\n          id=\"footerNavigatePreviousHitButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.previousHitLabel\"\n          [matTooltip]=\"intl.previousHitLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isFirstCanvasGroupHit\"\n          (click)=\"goToPreviousCanvasGroupHit()\"\n        >\n          <mat-icon>navigate_next</mat-icon>\n        </button>\n      </ng-container>\n    </div>\n  </div>\n</mat-toolbar>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".current-hit-label{font-size:13px;text-align:center}.not-on-page{opacity:.6}"]
                },] }
    ];
    ContentSearchNavigatorComponent.ctorParameters = function () { return [
        { type: MimeViewerIntl },
        { type: i0.ChangeDetectorRef },
        { type: CanvasService },
        { type: IiifContentSearchService },
        { type: ContentSearchNavigationService },
        { type: IiifManifestService }
    ]; };
    ContentSearchNavigatorComponent.propDecorators = {
        searchResult: [{ type: i0.Input }]
    };

    var ViewerFooterComponent = /** @class */ (function () {
        function ViewerFooterComponent(iiifContentSearchService, mediaObserver, changeDetectorRef) {
            this.iiifContentSearchService = iiifContentSearchService;
            this.mediaObserver = mediaObserver;
            this.changeDetectorRef = changeDetectorRef;
            this.state = 'hide';
            this.showNavigationToolbar = true;
            this.searchResult = new SearchResult();
            this.showPageNavigator = true;
            this.showContentSearchNavigator = false;
            this.destroyed = new rxjs.Subject();
        }
        Object.defineProperty(ViewerFooterComponent.prototype, "footerState", {
            get: function () {
                return this.state;
            },
            enumerable: false,
            configurable: true
        });
        ViewerFooterComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.iiifContentSearchService.onChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (sr) {
                _this.searchResult = sr;
                _this.showContentSearchNavigator = _this.searchResult.size() > 0;
                _this.showPageNavigator =
                    _this.searchResult.size() === 0 || !_this.isMobile();
                _this.changeDetectorRef.detectChanges();
            });
            this.mediaSubscription = this.mediaObserver.asObservable().subscribe(function (changes) {
                _this.showPageNavigator =
                    _this.searchResult.size() === 0 || !_this.isMobile();
                _this.changeDetectorRef.detectChanges();
            });
        };
        ViewerFooterComponent.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
            this.mediaSubscription.unsubscribe();
        };
        ViewerFooterComponent.prototype.isMobile = function () {
            return this.mediaObserver.isActive('lt-md');
        };
        return ViewerFooterComponent;
    }());
    ViewerFooterComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mime-viewer-footer',
                    template: "<mat-toolbar class=\"footer-toolbar\">\n  <div fxLayout=\"row\" fxFlex fxLayoutAlign=\"start center\">\n    <div><ng-template #mimeFooterBefore></ng-template></div>\n    <div fxFlex=\"250px\" fxFlex.lt-md=\"100%\" *ngIf=\"searchResult.size() > 0\">\n      <mime-content-search-navigator\n        *ngIf=\"showContentSearchNavigator\"\n        [searchResult]=\"searchResult\"\n      ></mime-content-search-navigator>\n    </div>\n    <div fxFlex [hidden]=\"!showPageNavigator\">\n      <mime-page-navigator [searchResult]=\"searchResult\"></mime-page-navigator>\n    </div>\n  </div>\n  <div><ng-template #mimeFooterAfter></ng-template></div>\n</mat-toolbar>\n",
                    animations: [
                        animations.trigger('footerState', [
                            animations.state('hide', animations.style({
                                transform: 'translate(0, 100%)'
                            })),
                            animations.state('show', animations.style({
                                transform: 'translate(0, 0)'
                            })),
                            animations.transition('hide => show', animations.animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in')),
                            animations.transition('show => hide', animations.animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out'))
                        ])
                    ],
                    styles: [":host{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;display:block;user-select:none;width:100%}.footer-toolbar{padding:0}[hidden]{display:none}"]
                },] }
    ];
    ViewerFooterComponent.ctorParameters = function () { return [
        { type: IiifContentSearchService },
        { type: flexLayout.MediaObserver },
        { type: i0.ChangeDetectorRef }
    ]; };
    ViewerFooterComponent.propDecorators = {
        mimeFooterBefore: [{ type: i0.ViewChild, args: ['mimeFooterBefore', { read: i0.ViewContainerRef, static: true },] }],
        mimeFooterAfter: [{ type: i0.ViewChild, args: ['mimeFooterAfter', { read: i0.ViewContainerRef, static: true },] }],
        footerState: [{ type: i0.HostBinding, args: ['@footerState',] }]
    };

    var IconComponent = /** @class */ (function () {
        function IconComponent() {
        }
        IconComponent.prototype.ngOnInit = function () { };
        return IconComponent;
    }());
    IconComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mime-icon',
                    template: "<div class=\"mat-icon\">\n  <ng-container *ngIf=\"iconName === 'single_page_display'\">\n    <div class=\"single-page-display\">\n      <svg\n        version=\"1.1\"\n        id=\"Layer_1\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        viewBox=\"0 0 90 90\"\n        preserveAspectRatio=\"xMidYMin slice\"\n      >\n        <style type=\"text/css\">\n          .st0 {\n            clip-path: url(#SVGID_2_);\n          }\n        </style>\n        <g>\n          <defs><rect id=\"SVGID_1_\" width=\"100%\" height=\"100%\" /></defs>\n          <clipPath id=\"SVGID_2_\">\n            <use xlink:href=\"#SVGID_1_\" style=\"overflow:visible;\" />\n          </clipPath>\n          <path\n            class=\"st0\"\n            d=\"M21.7,25.2H8.3v2.7h13.4V25.2z M21.7,18.1H8.3v2.7h13.4V18.1z M26.1,31.8H4V4.1h13.6v8.4h8.5V31.8z M30,31.6\n          V11.4L18.7,0H4.3C4.3,0,0,0,0,4.3v27.4c0,0,0,4.3,4.3,4.3h21.5C25.8,35.9,30,35.9,30,31.6\"\n          />\n        </g>\n      </svg>\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"iconName === 'two_page_display'\">\n    <svg\n      version=\"1.1\"\n      id=\"Layer_1\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n      xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n      viewBox=\"0 0 90 90\"\n      preserveAspectRatio=\"xMidYMin slice\"\n    >\n      <style type=\"text/css\">\n        .st0 {\n          clip-path: url(#SVGID_2_);\n        }\n      </style>\n      <g>\n        <defs><rect id=\"SVGID_1_\" width=\"100%\" height=\"100%\" /></defs>\n        <clipPath id=\"SVGID_2_\">\n          <use xlink:href=\"#SVGID_1_\" style=\"overflow:visible;\" />\n        </clipPath>\n        <path\n          class=\"st0\"\n          d=\"M52.5,25.2H39.1v2.7h13.4V25.2z M52.5,18.1H39.1v2.7h13.4V18.1z M56.8,31.8H34.7V4.1h13.6v8.4h8.5V31.8z\n        M60.8,31.6V11.4L49.4,0H35c0,0-4.3,0-4.3,4.3v27.4c0,0,0,4.3,4.3,4.3h21.5C56.6,35.9,60.8,35.9,60.8,31.6\"\n        />\n        <path\n          class=\"st0\"\n          d=\"M21.7,25.2H8.3v2.7h13.4V25.2z M21.7,18.1H8.3v2.7h13.4V18.1z M21.7,11.1H8.3v2.7h13.4V11.1z M26.1,31.8H4V4.1\n       h22.1V31.8z M30,31.6V4.3c0,0,0-4.3-4.3-4.3H4.3C4.3,0,0,0,0,4.3v27.4c0,0,0,4.3,4.3,4.3h21.5C25.8,35.9,30,35.9,30,31.6\"\n        />\n      </g>\n    </svg>\n  </ng-container>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".mat-icon{left:7px;position:absolute;top:12px;vertical-align:middle}.single-page-display{margin-left:5px}svg{height:40px;width:40px}"]
                },] }
    ];
    IconComponent.ctorParameters = function () { return []; };
    IconComponent.propDecorators = {
        iconName: [{ type: i0.Input }]
    };

    var ViewerHeaderComponent = /** @class */ (function () {
        function ViewerHeaderComponent(intl, changeDetectorRef, contentsDialogService, contentSearchDialogService, helpDialogService, iiifManifestService, fullscreenService, mimeDomHelper, viewerLayoutService) {
            this.intl = intl;
            this.changeDetectorRef = changeDetectorRef;
            this.contentsDialogService = contentsDialogService;
            this.contentSearchDialogService = contentSearchDialogService;
            this.helpDialogService = helpDialogService;
            this.iiifManifestService = iiifManifestService;
            this.fullscreenService = fullscreenService;
            this.mimeDomHelper = mimeDomHelper;
            this.viewerLayoutService = viewerLayoutService;
            this.state = 'hide';
            this.isContentSearchEnabled = false;
            this.isFullscreenEnabled = false;
            this.isInFullscreen = false;
            this.fullscreenLabel = this.intl.fullScreenLabel;
            this.isPagedManifest = false;
            this.viewerLayout = ViewerLayout.ONE_PAGE;
            this.ViewerLayout = ViewerLayout; // enables parsing of enum in template
            this.destroyed = new rxjs.Subject();
        }
        Object.defineProperty(ViewerHeaderComponent.prototype, "headerState", {
            get: function () {
                return this.state;
            },
            enumerable: false,
            configurable: true
        });
        ViewerHeaderComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.isFullscreenEnabled = this.fullscreenService.isEnabled();
            this.intl.changes
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function () { return _this.changeDetectorRef.markForCheck(); });
            this.fullscreenService.onChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function () {
                _this.isInFullscreen = _this.fullscreenService.isFullscreen();
                _this.fullscreenLabel = _this.isInFullscreen
                    ? _this.intl.exitFullScreenLabel
                    : _this.intl.fullScreenLabel;
                _this.changeDetectorRef.detectChanges();
            });
            this.iiifManifestService.currentManifest
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (manifest) {
                _this.manifest = manifest;
                _this.isContentSearchEnabled = manifest.service ? true : false;
                _this.isPagedManifest = ManifestUtils.isManifestPaged(manifest);
                _this.changeDetectorRef.detectChanges();
            });
            this.viewerLayoutService.onChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (viewerLayout) {
                _this.viewerLayout = viewerLayout;
            });
        };
        ViewerHeaderComponent.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        ViewerHeaderComponent.prototype.toggleContents = function () {
            this.contentSearchDialogService.close();
            this.helpDialogService.close();
            this.contentsDialogService.toggle();
        };
        ViewerHeaderComponent.prototype.toggleSearch = function () {
            this.contentsDialogService.close();
            this.helpDialogService.close();
            this.contentSearchDialogService.toggle();
        };
        ViewerHeaderComponent.prototype.toggleHelp = function () {
            this.contentsDialogService.close();
            this.contentSearchDialogService.close();
            this.helpDialogService.toggle();
        };
        ViewerHeaderComponent.prototype.toggleFullscreen = function () {
            return this.mimeDomHelper.toggleFullscreen();
        };
        ViewerHeaderComponent.prototype.isInFullScreen = function () {
            return this.fullscreenService.isFullscreen();
        };
        ViewerHeaderComponent.prototype.toggleViewerLayout = function () {
            this.viewerLayoutService.toggle();
        };
        ViewerHeaderComponent.prototype.setLayoutOnePage = function () {
            this.viewerLayoutService.setLayout(ViewerLayout.ONE_PAGE);
        };
        ViewerHeaderComponent.prototype.setLayoutTwoPage = function () {
            this.viewerLayoutService.setLayout(ViewerLayout.TWO_PAGE);
        };
        return ViewerHeaderComponent;
    }());
    ViewerHeaderComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mime-viewer-header',
                    template: "<mat-toolbar>\n  <div\n    class=\"header-container\"\n    fxLayout=\"row\"\n    fxLayoutAlign=\"space-between center\"\n  >\n    <div><ng-template #mimeHeaderBefore></ng-template></div>\n    <div fxFlexOffset=\"16px\" class=\"label\" [matTooltip]=\"manifest?.label\">{{\n      manifest?.label\n    }}</div>\n    <div\n      fxFlex=\"noshrink\"\n      fxLayout=\"row\"\n      fxLayoutAlign=\"end center\"\n      class=\"buttons-container\"\n    >\n      <button\n        *ngIf=\"isPagedManifest\"\n        mat-icon-button\n        [id]=\"\n          viewerLayout === ViewerLayout.ONE_PAGE\n            ? 'toggleTwoPageViewButton'\n            : 'toggleSinglePageViewButton'\n        \"\n        [attr.aria-label]=\"\n          viewerLayout === ViewerLayout.ONE_PAGE\n            ? intl.twoPageViewLabel\n            : intl.singlePageViewLabel\n        \"\n        [matTooltip]=\"\n          viewerLayout === ViewerLayout.ONE_PAGE\n            ? intl.twoPageViewLabel\n            : intl.singlePageViewLabel\n        \"\n        (click)=\"toggleViewerLayout()\"\n      >\n        <mime-icon\n          [iconName]=\"\n            viewerLayout === ViewerLayout.ONE_PAGE\n              ? 'two_page_display'\n              : 'single_page_display'\n          \"\n        >\n        </mime-icon>\n      </button>\n      <button\n        id=\"contentsDialogButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.contentsLabel\"\n        [matTooltip]=\"intl.contentsLabel\"\n        (click)=\"toggleContents()\"\n      >\n        <mat-icon aria-hidden=\"true\">list</mat-icon>\n      </button>\n      <button\n        id=\"contentSearchDialogButton\"\n        *ngIf=\"isContentSearchEnabled\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.searchLabel\"\n        [matTooltip]=\"intl.searchLabel\"\n        (click)=\"toggleSearch()\"\n      >\n        <mat-icon aria-hidden=\"true\">search</mat-icon>\n      </button>\n      <button\n        id=\"helpDialogButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.help.helpLabel\"\n        [matTooltip]=\"intl.help.helpLabel\"\n        (click)=\"toggleHelp()\"\n      >\n        <mat-icon aria-hidden=\"true\">help</mat-icon>\n      </button>\n\n      <button\n        id=\"fullscreenButton\"\n        *ngIf=\"isFullscreenEnabled\"\n        mat-icon-button\n        [attr.aria-label]=\"fullscreenLabel\"\n        [matTooltip]=\"fullscreenLabel\"\n        (click)=\"toggleFullscreen()\"\n      >\n        <mat-icon *ngIf=\"isInFullScreen\" aria-hidden=\"true\"\n          >fullscreen_exit</mat-icon\n        >\n        <mat-icon *ngIf=\"!isInFullScreen\" aria-hidden=\"true\"\n          >fullscreen</mat-icon\n        >\n      </button>\n    </div>\n    <div><ng-template #mimeHeaderAfter></ng-template></div>\n  </div>\n</mat-toolbar>\n",
                    changeDetection: i0.ChangeDetectionStrategy.Default,
                    animations: [
                        animations.trigger('headerState', [
                            animations.state('hide', animations.style({
                                transform: 'translate(0, -100%)'
                            })),
                            animations.state('show', animations.style({
                                transform: 'translate(0px, 0px)'
                            })),
                            animations.transition('hide => show', animations.animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in')),
                            animations.transition('show => hide', animations.animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out'))
                        ])
                    ],
                    styles: [":host{max-height:64px}.header-container{width:100%}.label{font-size:17px;overflow:hidden;text-overflow:ellipsis}mat-toolbar{padding:0}.buttons-container{padding:0 16px}"]
                },] }
    ];
    ViewerHeaderComponent.ctorParameters = function () { return [
        { type: MimeViewerIntl },
        { type: i0.ChangeDetectorRef },
        { type: ContentsDialogService },
        { type: ContentSearchDialogService },
        { type: HelpDialogService },
        { type: IiifManifestService },
        { type: FullscreenService },
        { type: MimeDomHelper },
        { type: ViewerLayoutService }
    ]; };
    ViewerHeaderComponent.propDecorators = {
        mimeHeaderBefore: [{ type: i0.ViewChild, args: ['mimeHeaderBefore', { read: i0.ViewContainerRef, static: true },] }],
        mimeHeaderAfter: [{ type: i0.ViewChild, args: ['mimeHeaderAfter', { read: i0.ViewContainerRef, static: true },] }],
        headerState: [{ type: i0.HostBinding, args: ['@headerState',] }]
    };

    var ViewerSpinnerComponent = /** @class */ (function () {
        function ViewerSpinnerComponent(spinnerService, changeDetectorRef) {
            this.spinnerService = spinnerService;
            this.changeDetectorRef = changeDetectorRef;
            this.visible = false;
        }
        ViewerSpinnerComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.spinnerSub = this.spinnerService.spinnerState.subscribe(function (state) {
                _this.visible = state.show;
                _this.changeDetectorRef.detectChanges();
            });
        };
        ViewerSpinnerComponent.prototype.ngOnDestroy = function () {
            this.spinnerSub.unsubscribe();
        };
        return ViewerSpinnerComponent;
    }());
    ViewerSpinnerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mime-spinner',
                    template: "<div class=\"mime-spinner\" [class.mime-spinner--active]=\"visible\">\n  <mat-spinner></mat-spinner>\n</div>\n",
                    styles: [".mime-spinner{display:none;left:50%;position:absolute;top:45%;transform:translate(-50%);z-index:9999}.mime-spinner--active{display:block}"]
                },] }
    ];
    ViewerSpinnerComponent.ctorParameters = function () { return [
        { type: SpinnerService },
        { type: i0.ChangeDetectorRef }
    ]; };

    var ContentDialogState = /** @class */ (function () {
        function ContentDialogState(fields) {
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
        return ContentDialogState;
    }());

    var ContentsSearchDialogState = /** @class */ (function () {
        function ContentsSearchDialogState(fields) {
            this.isOpen = false;
            if (fields) {
                this.isOpen = fields.isOpen !== undefined ? fields.isOpen : this.isOpen;
            }
        }
        return ContentsSearchDialogState;
    }());

    var HelpDialogState = /** @class */ (function () {
        function HelpDialogState(fields) {
            this.isOpen = false;
            if (fields) {
                this.isOpen = fields.isOpen !== undefined ? fields.isOpen : this.isOpen;
            }
        }
        return HelpDialogState;
    }());

    var ViewerState = /** @class */ (function () {
        function ViewerState(fields) {
            this.contentDialogState = new ContentDialogState();
            this.contentsSearchDialogState = new ContentsSearchDialogState();
            this.helpDialogState = new HelpDialogState();
            if (fields) {
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
        return ViewerState;
    }());

    var ViewerComponent = /** @class */ (function () {
        function ViewerComponent(snackBar, intl, el, iiifManifestService, contentsDialogService, attributionDialogService, contentSearchDialogService, helpDialogService, viewerService, mimeService, changeDetectorRef, modeService, iiifContentSearchService, accessKeysHandlerService, canvasService, viewerLayoutService, styleService, zone) {
            this.snackBar = snackBar;
            this.intl = intl;
            this.el = el;
            this.iiifManifestService = iiifManifestService;
            this.contentsDialogService = contentsDialogService;
            this.attributionDialogService = attributionDialogService;
            this.contentSearchDialogService = contentSearchDialogService;
            this.helpDialogService = helpDialogService;
            this.viewerService = viewerService;
            this.mimeService = mimeService;
            this.changeDetectorRef = changeDetectorRef;
            this.modeService = modeService;
            this.iiifContentSearchService = iiifContentSearchService;
            this.accessKeysHandlerService = accessKeysHandlerService;
            this.canvasService = canvasService;
            this.viewerLayoutService = viewerLayoutService;
            this.styleService = styleService;
            this.zone = zone;
            this.config = new MimeViewerConfig();
            this.tabIndex = 0;
            this.viewerModeChanged = new i0.EventEmitter();
            this.canvasChanged = new i0.EventEmitter();
            this.qChanged = new i0.EventEmitter();
            this.manifestChanged = new i0.EventEmitter();
            this.destroyed = new rxjs.Subject();
            this.isCanvasPressed = false;
            this.viewerState = new ViewerState();
            this.errorMessage = null;
            contentsDialogService.el = el;
            attributionDialogService.el = el;
            contentSearchDialogService.el = el;
            helpDialogService.el = el;
            mimeService.el = el;
        }
        Object.defineProperty(ViewerComponent.prototype, "mimeHeaderBeforeRef", {
            get: function () {
                return this.header.mimeHeaderBefore;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ViewerComponent.prototype, "mimeHeaderAfterRef", {
            get: function () {
                return this.header.mimeHeaderAfter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ViewerComponent.prototype, "mimeFooterBeforeRef", {
            get: function () {
                return this.footer.mimeFooterBefore;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ViewerComponent.prototype, "mimeFooterAfterRef", {
            get: function () {
                return this.footer.mimeFooterAfter;
            },
            enumerable: false,
            configurable: true
        });
        ViewerComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.styleService.init();
            this.modeService.initialMode = this.config.initViewerMode;
            this.iiifManifestService.currentManifest
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (manifest) {
                if (manifest) {
                    _this.initialize();
                    _this.currentManifest = manifest;
                    _this.manifestChanged.next(manifest);
                    _this.viewerLayoutService.init(ManifestUtils.isManifestPaged(manifest));
                    _this.changeDetectorRef.detectChanges();
                    _this.viewerService.setUpViewer(manifest, _this.config);
                    if (_this.config.attributionDialogEnabled && manifest.attribution) {
                        _this.attributionDialogService.open(_this.config.attributionDialogHideTimeout);
                    }
                    if (_this.q) {
                        _this.iiifContentSearchService.search(manifest, _this.q);
                    }
                }
            });
            this.viewerService.onOsdReadyChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (state) {
                // Don't reset current page when switching layout
                if (state &&
                    _this.canvasIndex &&
                    !_this.canvasService.currentCanvasGroupIndex) {
                    _this.viewerService.goToCanvas(_this.canvasIndex, false);
                }
            });
            this.iiifManifestService.errorMessage
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (error) {
                _this.resetCurrentManifest();
                _this.errorMessage = error;
                _this.changeDetectorRef.detectChanges();
            });
            this.iiifContentSearchService.onQChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (q) {
                _this.qChanged.emit(q);
            });
            this.iiifContentSearchService.onChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (sr) {
                _this.viewerService.highlight(sr);
            });
            this.viewerService.isCanvasPressed
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (value) {
                _this.isCanvasPressed = value;
                _this.changeDetectorRef.detectChanges();
            });
            this.modeService.onChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (mode) {
                _this.toggleToolbarsState(mode.currentValue);
                if (mode.previousValue === exports.MimeViewerMode.DASHBOARD &&
                    mode.currentValue === exports.MimeViewerMode.PAGE) {
                    _this.viewerState.contentDialogState.isOpen = _this.contentsDialogService.isOpen();
                    _this.viewerState.contentDialogState.selectedIndex = _this.contentsDialogService.getSelectedIndex();
                    _this.viewerState.contentsSearchDialogState.isOpen = _this.contentSearchDialogService.isOpen();
                    _this.viewerState.helpDialogState.isOpen = _this.helpDialogService.isOpen();
                    _this.zone.run(function () {
                        _this.contentsDialogService.close();
                        _this.contentSearchDialogService.close();
                        _this.helpDialogService.close();
                    });
                }
                if (mode.currentValue === exports.MimeViewerMode.DASHBOARD) {
                    _this.zone.run(function () {
                        if (_this.viewerState.contentDialogState.isOpen) {
                            _this.contentsDialogService.open(_this.viewerState.contentDialogState.selectedIndex);
                        }
                        if (_this.viewerState.contentsSearchDialogState.isOpen) {
                            _this.contentSearchDialogService.open();
                        }
                        if (_this.viewerState.helpDialogState.isOpen) {
                            _this.helpDialogService.open();
                        }
                    });
                }
                _this.viewerModeChanged.emit(mode.currentValue);
            });
            this.canvasService.onCanvasGroupIndexChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (canvasGroupIndex) {
                var canvasIndex = _this.canvasService.findCanvasByCanvasIndex(canvasGroupIndex);
                if (canvasIndex !== -1) {
                    _this.canvasChanged.emit(canvasIndex);
                }
            });
            this.mimeService.onResize
                .pipe(operators.takeUntil(this.destroyed), operators.throttle(function (val) { return rxjs.interval(ViewerOptions.transitions.OSDAnimationTime); }))
                .subscribe(function () {
                setTimeout(function () {
                    _this.viewerService.home();
                }, ViewerOptions.transitions.OSDAnimationTime);
            });
            this.viewerLayoutService.onChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (viewerLayout) {
                _this.viewerLayout = viewerLayout;
            });
            this.loadManifest();
        };
        ViewerComponent.prototype.ngOnChanges = function (changes) {
            var manifestUriIsChanged = false;
            var qIsChanged = false;
            var canvasIndexChanged = false;
            if (changes['q']) {
                var qChanges = changes['q'];
                if (!qChanges.isFirstChange() &&
                    qChanges.currentValue !== qChanges.firstChange) {
                    this.q = qChanges.currentValue;
                    qIsChanged = true;
                }
            }
            if (changes['canvasIndex']) {
                var canvasIndexChanges = changes['canvasIndex'];
                if (!canvasIndexChanges.isFirstChange() &&
                    canvasIndexChanges.currentValue !== canvasIndexChanges.firstChange) {
                    this.canvasIndex = canvasIndexChanges.currentValue;
                    canvasIndexChanged = true;
                }
            }
            if (changes['manifestUri']) {
                var manifestUriChanges = changes['manifestUri'];
                if (!manifestUriChanges.isFirstChange() &&
                    manifestUriChanges.currentValue !== manifestUriChanges.previousValue) {
                    this.modeService.mode = this.config.initViewerMode;
                    this.manifestUri = manifestUriChanges.currentValue;
                    manifestUriIsChanged = true;
                }
            }
            if (manifestUriIsChanged) {
                this.loadManifest();
            }
            else {
                if (qIsChanged) {
                    this.iiifContentSearchService.search(this.currentManifest, this.q);
                }
                if (canvasIndexChanged) {
                    this.viewerService.goToCanvas(this.canvasIndex, true);
                }
            }
        };
        ViewerComponent.prototype.handleKeys = function (event) {
            this.accessKeysHandlerService.handleKeyEvents(event);
        };
        ViewerComponent.prototype.onDrop = function (event) {
            var _this = this;
            event.preventDefault();
            event.stopPropagation();
            if (this.config.isDropEnabled) {
                var url = event.dataTransfer.getData('URL');
                var params = new URL(url).searchParams;
                var manifestUri = params.get('manifest');
                var startCanvasId_1 = params.get('canvas');
                if (manifestUri) {
                    this.manifestUri = manifestUri.startsWith('//')
                        ? "" + location.protocol + manifestUri
                        : manifestUri;
                    this.loadManifest();
                    if (startCanvasId_1) {
                        this.manifestChanged.pipe(operators.take(1)).subscribe(function (manifest) {
                            var canvasIndex = manifest.sequences[0].canvases.findIndex(function (c) { return c.id === startCanvasId_1; });
                            if (canvasIndex !== -1) {
                                setTimeout(function () {
                                    _this.viewerService.goToCanvas(canvasIndex, true);
                                }, 0);
                            }
                        });
                    }
                }
            }
            else {
                this.snackBar.open(this.intl.dropDisabled, null, {
                    duration: 3000
                });
            }
        };
        ViewerComponent.prototype.onDragOver = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
        ViewerComponent.prototype.onDragLeave = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
        ViewerComponent.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
            this.cleanup();
            this.iiifManifestService.destroy();
            this.iiifContentSearchService.destroy();
        };
        ViewerComponent.prototype.toggleToolbarsState = function (mode) {
            if (this.header && this.footer) {
                switch (mode) {
                    case exports.MimeViewerMode.DASHBOARD:
                        this.header.state = this.footer.state = 'show';
                        if (this.config.navigationControlEnabled && this.osdToolbar) {
                            this.osdToolbar.state = 'hide';
                        }
                        break;
                    case exports.MimeViewerMode.PAGE:
                        this.header.state = this.footer.state = 'hide';
                        if (this.config.navigationControlEnabled && this.osdToolbar) {
                            this.osdToolbar.state = 'show';
                        }
                        break;
                }
                this.changeDetectorRef.detectChanges();
            }
        };
        ViewerComponent.prototype.ngAfterViewChecked = function () {
            this.mimeService.markForCheck();
        };
        ViewerComponent.prototype.loadManifest = function () {
            this.cleanup();
            this.iiifManifestService.load(this.manifestUri);
        };
        ViewerComponent.prototype.initialize = function () {
            this.attributionDialogService.initialize();
            this.contentsDialogService.initialize();
            this.contentSearchDialogService.initialize();
            this.helpDialogService.initialize();
        };
        ViewerComponent.prototype.cleanup = function () {
            this.viewerState = new ViewerState();
            this.attributionDialogService.destroy();
            this.contentsDialogService.destroy();
            this.contentSearchDialogService.destroy();
            this.helpDialogService.destroy();
            this.viewerService.destroy();
            this.resetErrorMessage();
        };
        ViewerComponent.prototype.resetCurrentManifest = function () {
            this.currentManifest = null;
        };
        ViewerComponent.prototype.resetErrorMessage = function () {
            this.errorMessage = null;
        };
        ViewerComponent.prototype.setClasses = function () {
            return {
                'mode-page': this.modeService.mode === exports.MimeViewerMode.PAGE,
                'mode-page-zoomed': this.modeService.mode === exports.MimeViewerMode.PAGE_ZOOMED,
                'mode-dashboard': this.modeService.mode === exports.MimeViewerMode.DASHBOARD,
                'layout-one-page': this.viewerLayout === ViewerLayout.ONE_PAGE,
                'layout-two-page': this.viewerLayout === ViewerLayout.TWO_PAGE,
                'canvas-pressed': this.isCanvasPressed
            };
        };
        return ViewerComponent;
    }());
    ViewerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'mime-viewer',
                    template: "<div\n  id=\"mimeViewer\"\n  class=\"viewer-container\"\n  [ngClass]=\"setClasses()\"\n  [hidden]=\"errorMessage !== null\"\n  [tabIndex]=\"tabIndex\"\n>\n  <mime-spinner></mime-spinner>\n  <mime-viewer-header\n    class=\"navbar navbar-header\"\n    #mimeHeader\n  ></mime-viewer-header>\n  <mime-osd-toolbar\n    *ngIf=\"config?.navigationControlEnabled\"\n    #mimeOsdToolbar\n  ></mime-osd-toolbar>\n  <div id=\"openseadragon\"></div>\n  <mime-viewer-footer\n    class=\"navbar navbar-footer\"\n    #mimeFooter\n  ></mime-viewer-footer>\n</div>\n\n<div\n  class=\"error-container\"\n  *ngIf=\"errorMessage\"\n  fxLayout=\"column\"\n  fxLayoutAlign=\"center center\"\n>\n  <span>{{ intl.somethingHasGoneWrongLabel }}</span>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".viewer-container{box-sizing:border-box;display:flex;flex-direction:column;height:100%;overflow:hidden;position:relative;width:100%}:host::ng-deep.openseadragon-container{flex-grow:1}:host::ng-deep.openseadragon-canvas:focus{outline:none}#openseadragon{display:flex;flex-direction:column;flex-grow:1;opacity:0;width:100%}::ng-deep .viewer-container.mode-page-zoomed .tile:hover{cursor:-webkit-grab}.viewer-container.canvas-pressed,.viewer-container.canvas-pressed::ng-deep.tile:hover{cursor:grabbing;cursor:-webkit-grabbing}::ng-deep .viewer-container .tile{cursor:pointer;fill-opacity:0}::ng-deep .viewer-container.mode-dashboard.layout-one-page .tile,::ng-deep .viewer-container.mode-dashboard.layout-two-page .page-group .tile{stroke:rgba(0,0,0,.15);stroke-width:8;transition:stroke .25s ease}::ng-deep .viewer-container.mode-dashboard.layout-one-page .tile:hover,::ng-deep .viewer-container.mode-dashboard.layout-two-page .page-group:hover .tile{stroke:rgba(0,0,0,.45)}::ng-deep .viewer-container .hit{fill:rgba(255,255,0,.6)}::ng-deep .viewer-container .selected{fill:rgba(255,225,0,.6)}.navbar{overflow:hidden;position:absolute;width:100%;z-index:2}.navbar-header{top:0;width:100%}.navbar-footer{bottom:0}::ng-deep .cdk-overlay-container{z-index:2147483647}.error-container{height:100%;width:100%}[hidden]{display:none}"]
                },] }
    ];
    ViewerComponent.ctorParameters = function () { return [
        { type: snackBar.MatSnackBar },
        { type: MimeViewerIntl },
        { type: i0.ElementRef },
        { type: IiifManifestService },
        { type: ContentsDialogService },
        { type: AttributionDialogService },
        { type: ContentSearchDialogService },
        { type: HelpDialogService },
        { type: ViewerService },
        { type: MimeResizeService },
        { type: i0.ChangeDetectorRef },
        { type: ModeService },
        { type: IiifContentSearchService },
        { type: AccessKeysService },
        { type: CanvasService },
        { type: ViewerLayoutService },
        { type: StyleService },
        { type: i0.NgZone }
    ]; };
    ViewerComponent.propDecorators = {
        manifestUri: [{ type: i0.Input }],
        q: [{ type: i0.Input }],
        canvasIndex: [{ type: i0.Input }],
        config: [{ type: i0.Input }],
        tabIndex: [{ type: i0.Input }],
        viewerModeChanged: [{ type: i0.Output }],
        canvasChanged: [{ type: i0.Output }],
        qChanged: [{ type: i0.Output }],
        manifestChanged: [{ type: i0.Output }],
        header: [{ type: i0.ViewChild, args: ['mimeHeader', { static: true },] }],
        footer: [{ type: i0.ViewChild, args: ['mimeFooter', { static: true },] }],
        osdToolbar: [{ type: i0.ViewChild, args: ['mimeOsdToolbar',] }],
        handleKeys: [{ type: i0.HostListener, args: ['keyup', ['$event'],] }],
        onDrop: [{ type: i0.HostListener, args: ['drop', ['$event'],] }],
        onDragOver: [{ type: i0.HostListener, args: ['dragover', ['$event'],] }],
        onDragLeave: [{ type: i0.HostListener, args: ['dragleave', ['$event'],] }]
    };

    var MimeModule = /** @class */ (function () {
        function MimeModule() {
        }
        return MimeModule;
    }());
    MimeModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [
                        ViewerComponent,
                        ViewerHeaderComponent,
                        ViewerFooterComponent,
                        OsdToolbarComponent,
                        ContentSearchNavigatorComponent,
                        CanvasGroupNavigatorComponent,
                        ViewerSpinnerComponent,
                        IconComponent
                    ],
                    imports: [
                        CoreModule,
                        SharedModule,
                        ContentsDialogModule,
                        AttributionDialogModule,
                        HelpDialogModule,
                        ContentSearchDialogModule,
                        CanvasGroupDialogModule
                    ],
                    exports: [ViewerComponent]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MimeManifest = Manifest;
    exports.MimeModule = MimeModule;
    exports.MimeViewerComponent = ViewerComponent;
    exports.MimeViewerConfig = MimeViewerConfig;
    exports.MimeViewerIntl = MimeViewerIntl;
    exports.MimeViewerIntlLt = MimeViewerIntlLt;
    exports.MimeViewerIntlNoNb = MimeViewerIntlNoNb;
    exports.ɵa = IiifManifestService;
    exports.ɵb = SpinnerService;
    exports.ɵba = ContentSearchNavigatorComponent;
    exports.ɵbb = CanvasGroupNavigatorComponent;
    exports.ɵbc = CanvasGroupDialogService;
    exports.ɵbd = ViewerSpinnerComponent;
    exports.ɵbe = IconComponent;
    exports.ɵbf = CoreModule;
    exports.ɵbg = SharedModule;
    exports.ɵbh = MimeMaterialModule;
    exports.ɵbi = ContentsDialogModule;
    exports.ɵbj = ContentsDialogComponent;
    exports.ɵbk = MetadataComponent;
    exports.ɵbl = TocComponent;
    exports.ɵbm = AttributionDialogModule;
    exports.ɵbn = AttributionDialogComponent;
    exports.ɵbo = HelpDialogModule;
    exports.ɵbp = HelpDialogComponent;
    exports.ɵbq = ContentSearchDialogModule;
    exports.ɵbr = ContentSearchDialogComponent;
    exports.ɵbs = CanvasGroupDialogModule;
    exports.ɵbt = CanvasGroupDialogComponent;
    exports.ɵc = ContentsDialogService;
    exports.ɵd = ContentsDialogConfigStrategyFactory;
    exports.ɵe = MimeDomHelper;
    exports.ɵf = FullscreenService;
    exports.ɵg = MimeResizeService;
    exports.ɵh = AttributionDialogService;
    exports.ɵi = AttributionDialogResizeService;
    exports.ɵj = ContentSearchDialogService;
    exports.ɵk = ContentSearchDialogConfigStrategyFactory;
    exports.ɵl = HelpDialogService;
    exports.ɵm = HelpDialogConfigStrategyFactory;
    exports.ɵn = ViewerService;
    exports.ɵo = ClickService;
    exports.ɵp = CanvasService;
    exports.ɵq = ModeService;
    exports.ɵr = ViewerLayoutService;
    exports.ɵs = IiifContentSearchService;
    exports.ɵt = StyleService;
    exports.ɵu = AccessKeysService;
    exports.ɵv = ContentSearchNavigationService;
    exports.ɵw = ViewerHeaderComponent;
    exports.ɵx = ViewerOptions;
    exports.ɵy = ViewerFooterComponent;
    exports.ɵz = OsdToolbarComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=nationallibraryofnorway-ngx-mime.umd.js.map
