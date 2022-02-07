import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, finalize, take } from 'rxjs/operators';
import { ManifestBuilder as IiifV2ManifestBuilder } from '../builders/iiif/v2/manifest.builder';
import { ManifestBuilder as IiifV3ManifestBuilder } from '../builders/iiif/v3/manifest.builder';
import { MimeViewerIntl } from '../intl/viewer-intl';
import { Manifest } from '../models/manifest';
import { SpinnerService } from '../spinner-service/spinner.service';

@Injectable()
export class IiifManifestService {
  protected _currentManifest = new BehaviorSubject<Manifest | null>(null);
  protected _errorMessage = new BehaviorSubject<string | null>(null);

  constructor(
    public intl: MimeViewerIntl,
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) {}

  get currentManifest(): Observable<Manifest | null> {
    return this._currentManifest.asObservable().pipe(distinctUntilChanged());
  }

  get errorMessage(): Observable<string | null> {
    return this._errorMessage.asObservable();
  }

  load(manifestUri: string): Observable<boolean> {
    return new Observable((observer) => {
      if (manifestUri.length === 0) {
        this._errorMessage.next(this.intl.manifestUriMissingLabel);
        observer.next(false);
      } else {
        this.spinnerService.show();
        this.http
          .get<Response>(manifestUri)
          .pipe(
            finalize(() => this.spinnerService.hide()),
            take(1)
          )
          .subscribe(
            (response: Response) => {
              const manifest = this.extractData(response);
              if (this.isManifestValid(manifest)) {
                this._currentManifest.next(manifest);
                observer.next(true);
              } else {
                this._errorMessage.next(this.intl.manifestNotValidLabel);
                observer.next(false);
              }
            },
            (err: HttpErrorResponse) => {
              this._errorMessage.next(this.handleError(err));
              observer.next(false);
            }
          );
      }
    });
  }

  destroy() {
    this.resetCurrentManifest();
    this.resetErrorMessage();
  }

  private resetCurrentManifest() {
    this._currentManifest.next(null);
  }

  private resetErrorMessage() {
    this._errorMessage.next(null);
  }

  private extractData(response: any) {
    if (response.type === 'Manifest') {
      return new IiifV3ManifestBuilder(response).build();
    } else {
      return new IiifV2ManifestBuilder(response).build();
    }
  }

  private isManifestValid(manifest: Manifest): boolean {
    return (
      manifest &&
      manifest.tileSource !== undefined &&
      manifest.tileSource.length > 0
    );
  }

  private handleError(err: HttpErrorResponse): string {
    let errMsg: string;
    if (err.error instanceof Object) {
      errMsg = err.message;
    } else {
      errMsg = err.error;
    }
    return errMsg;
  }
}
