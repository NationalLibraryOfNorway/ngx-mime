import { SpinnerService } from '../spinner-service/spinner.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Manifest } from '../models/manifest';
import { ManifestBuilder } from '../builders/manifest.builder';

@Injectable()
export class IiifManifestService {
  protected _currentManifest: Subject<Manifest> = new BehaviorSubject<Manifest>(new Manifest());

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) { }

  get currentManifest(): Observable<Manifest> {
    return this._currentManifest.asObservable();
  }

  load(manifestUri: string): void {
    if (manifestUri === null) {
      return;
    }
    this.spinnerService.show();
    this.http.get(manifestUri)
      .finally(() => this.spinnerService.hide())
      .subscribe(
      (res: Response) => this._currentManifest.next(this.extractData(res)),
      (err: HttpErrorResponse) => this.handleError
      );
  }

  private extractData(response: Response) {
    return new ManifestBuilder(response).build();
  }

  private handleError(err: HttpErrorResponse | any) {
    let errMsg: string;
    if (err.error instanceof Error) {
      errMsg = err.error.message;
    } else {
      errMsg = err.error;
    }
    return Observable.throw(errMsg);
  }

}
