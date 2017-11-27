import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter } from 'rxjs/operators/filter';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { finalize } from 'rxjs/operators/finalize';

import { Manifest } from '../models/manifest';
import { ManifestBuilder } from '../builders/manifest.builder';
import { SpinnerService } from '../spinner-service/spinner.service';
import { MimeViewerIntl } from '../intl/viewer-intl';

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
    return this._currentManifest.asObservable()
      .pipe(
        filter(m => m !== null),
        distinctUntilChanged()
      );
  }

  get errorMessage(): Observable<string> {
    return this._errorMessage.asObservable();
  }

  load(manifestUri: string): void {
    if (manifestUri === null) {
      this._errorMessage.next(this.intl.manifestUriMissingLabel);
    } else {
      this.spinnerService.show();
      this.http.get(manifestUri)
        .pipe(
          finalize(() => this.spinnerService.hide())
        ).subscribe(
          (response: Response) => {
            const manifest = this.extractData(response);
            if (this.isManifestValid(manifest)) {
              this._currentManifest.next(manifest);
            } else {
              this._errorMessage.next(this.intl.manifestNotValidLabel);
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

  private resetCurrentManifest() {
    this._currentManifest.next(null);
  }

  private resetErrorMessage() {
    this._errorMessage.next(null);
  }

  private extractData(response: Response) {
    return new ManifestBuilder(response).build();
  }

  private isManifestValid(manifest: Manifest): boolean {
    return (manifest && manifest.tileSource && manifest.tileSource.length > 0);
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
