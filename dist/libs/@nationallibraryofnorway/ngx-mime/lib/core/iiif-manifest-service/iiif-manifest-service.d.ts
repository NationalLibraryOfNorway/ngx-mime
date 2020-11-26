import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Manifest } from '../models/manifest';
import { SpinnerService } from '../spinner-service/spinner.service';
import { MimeViewerIntl } from '../intl/viewer-intl';
export declare class IiifManifestService {
    intl: MimeViewerIntl;
    private http;
    private spinnerService;
    protected _currentManifest: Subject<Manifest>;
    protected _errorMessage: Subject<string>;
    constructor(intl: MimeViewerIntl, http: HttpClient, spinnerService: SpinnerService);
    get currentManifest(): Observable<Manifest>;
    get errorMessage(): Observable<string>;
    load(manifestUri: string): void;
    destroy(): void;
    private resetCurrentManifest;
    private resetErrorMessage;
    private extractData;
    private isManifestValid;
    private handleError;
}
