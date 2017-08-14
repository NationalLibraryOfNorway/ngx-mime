import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Manifest } from '../models/manifest';
import { ManifestBuilder } from '../builders/manifest.builder';
import './../../rxjs-extension';

@Injectable()
export class IiifService {
  constructor(private http: HttpClient) { }

  getManifest(manifestUri: string): Observable<Manifest> {
    return this.http.get(manifestUri)
      .map(this.extractData)
      .catch(this.handleError);
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
