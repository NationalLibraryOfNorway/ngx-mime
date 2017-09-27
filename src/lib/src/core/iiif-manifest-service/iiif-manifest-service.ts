import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Manifest } from '../models/manifest';
import { ManifestBuilder } from '../builders/manifest.builder';
import { MimeViewerIntl } from '../viewer-intl';

@Injectable()
export class IiifManifestService {
  protected _currentManifest: Subject<Manifest> = new BehaviorSubject<Manifest>(null);
  protected _errorMessage: Subject<string> = new BehaviorSubject(null);

  constructor(public intl: MimeViewerIntl, private http: HttpClient) { }

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
      this.http.get(manifestUri).subscribe(
        (res: Response) => this._currentManifest.next(this.extractData(res)),
        (err: HttpErrorResponse) => this._errorMessage.next(this.handleError(err))
      );
    }
  }

  resetCurrentManifest() {
    this._currentManifest.next(null);
  }

  resetErrorMessage() {
    this._errorMessage.next(null);
  }

  destroy() {
    this._currentManifest.next(null);
  }

  private extractData(response: Response) {
    return new ManifestBuilder(response).build();
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
