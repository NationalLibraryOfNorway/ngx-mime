import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { CanvasService } from '../canvas-service/canvas-service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../intl/viewer-intl';
import { Hit } from './../../core/models/hit';
import * as i0 from "@angular/core";
export declare class AltoService {
    intl: MimeViewerIntl;
    private http;
    private iiifManifestService;
    private canvasService;
    private sanitizer;
    private altos;
    private recognizedTextContentToggle;
    private isLoading;
    private textContentReady;
    private textError;
    private manifest;
    private subscriptions;
    private altoBuilder;
    private htmlFormatter;
    constructor(intl: MimeViewerIntl, http: HttpClient, iiifManifestService: IiifManifestService, canvasService: CanvasService, sanitizer: DomSanitizer);
    get onRecognizedTextContentToggleChange$(): Observable<boolean>;
    get onTextContentReady$(): Observable<void>;
    get isLoading$(): Observable<boolean>;
    get hasErrors$(): Observable<string>;
    get onRecognizedTextContentToggle(): boolean;
    set onRecognizedTextContentToggle(value: boolean);
    initialize(hits?: Hit[]): void;
    destroy(): void;
    toggle(): void;
    getHtml(index: number): SafeHtml | undefined;
    clearCache(): void;
    private addAltoSource;
    private add;
    private isInCache;
    private load;
    private addToCache;
    private done;
    private error;
    private complete;
    static ɵfac: i0.ɵɵFactoryDeclaration<AltoService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AltoService>;
}
