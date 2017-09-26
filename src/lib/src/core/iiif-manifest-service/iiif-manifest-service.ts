import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Manifest } from '../models/manifest';
import { ManifestBuilder } from '../builders/manifest.builder';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class IiifManifestService {
  protected _currentManifest: Subject<Manifest> = new BehaviorSubject<Manifest>(null);

  constructor(private http: HttpClient) { }

  get currentManifest(): Observable<Manifest> {
    return this._currentManifest.asObservable().filter(m => m !== null).distinctUntilChanged();
  }

  load(manifestUri: string): void {
    if (manifestUri === null) {
      this._currentManifest.error(new HttpErrorResponse({error: 'ManifestUri is missing'}));
    }
    this.http.get(manifestUri)
      .subscribe(
      (res: Response) => this._currentManifest.next(this.extractData(res)),
      (err: HttpErrorResponse) => this._currentManifest.error(this.handleError(err))
      );
  }

  destroy() {
    this._currentManifest.next(null);
  }

  private extractData(response: Response) {
    return new ManifestBuilder(response).build();
  }

  private handleError(err: HttpErrorResponse | any): ErrorObservable {
    let errMsg: string;
    if (err.error instanceof Error) {
      errMsg = err.error.message;
    } else {
      errMsg = err.error;
    }
    return Observable.throw(errMsg);
  }

}
