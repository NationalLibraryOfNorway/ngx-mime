import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Manifest } from '../models/manifest';
import { ManifestBuilder } from '../builders/manifest.builder';
import { SpinnerService } from '../spinner-service/spinner.service';
import { MimeViewerIntl } from '../viewer-intl';

@Injectable()
export class IiifManifestService {
  protected _currentManifest: Subject<Manifest> = new BehaviorSubject<Manifest>(null);
  protected _errorMessage: Subject<string> = new BehaviorSubject(null);

  constructor(
    public intl: MimeViewerIntl,
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) { }

  get currentManifest(): Observable<Manifest> {
    return this._currentManifest.asObservable().filter(m => m !== null).distinctUntilChanged();
  }

  get errorMessage(): Observable<string> {
    return this._errorMessage.asObservable();
  }

  load(manifestUri: string): void {
    if (manifestUri === null) {
      this._errorMessage.next(this.intl.manifestUriMissing);
    } else {
      this.spinnerService.show();
      this.http.get(manifestUri)
        .finally(() => this.spinnerService.hide())
        .subscribe(
          (response: Response) => {
            const manifest = this.extractData(response);
            if (this.isManifestValid(manifest)) {
              this._currentManifest.next(manifest);
            } else {
              this._errorMessage.next(this.intl.manifestNotValid);
            }
          },
          (err: HttpErrorResponse) => {
            this._errorMessage.next(this.handleError(err));
          }
        );
    }
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

  private extractData(response: Response) {
    return new ManifestBuilder(response).build();
  }

  private isManifestValid(manifest: Manifest): boolean {
    return (manifest && manifest.tileSource && manifest.tileSource.length > 0);
  }

  private handleError(err: HttpErrorResponse | any): string {
    let errMsg: string;
    if (err.error instanceof Error) {
      errMsg = err.error.message;
    } else {
      errMsg = err.error;
    }
    return errMsg;
  }

}
