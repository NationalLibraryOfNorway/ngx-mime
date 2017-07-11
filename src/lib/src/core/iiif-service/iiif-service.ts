import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Manifest } from '../models/manifest';
import { ManifestBuilder } from '../builders/manifest.builder';
import './../../rxjs-extension';

@Injectable()
export class IiifService {
  constructor(private http: Http) { }

  getManifest(url: string): Observable<Manifest> {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    return new ManifestBuilder(response.json()).build();
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
