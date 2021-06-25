import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MimeViewerIntl } from '../intl/viewer-intl';
import { Manifest } from '../models/manifest';
import { SpinnerService } from '../spinner-service/spinner.service';
export declare class IiifManifestService {
    intl: MimeViewerIntl;
    private http;
    private spinnerService;
    protected _currentManifest: BehaviorSubject<Manifest>;
    protected _errorMessage: BehaviorSubject<string>;
    constructor(intl: MimeViewerIntl, http: HttpClient, spinnerService: SpinnerService);
    get currentManifest(): Observable<Manifest | null>;
    get errorMessage(): Observable<string | null>;
    load(manifestUri: string): Observable<boolean>;
    destroy(): void;
    private resetCurrentManifest;
    private resetErrorMessage;
    private extractData;
    private isManifestValid;
    private handleError;
}
