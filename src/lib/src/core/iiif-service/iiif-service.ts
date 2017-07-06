import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Manifest } from '../models/manifest';
import { ManifestBuilder } from '../builders/manifest-builder';

@Injectable()
export class IiifService {
  constructor(private http: Http) { }

  getManifest(url: string): Observable<Manifest> {
    return this.http.get(url)
      .map(this.extractData)
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }

  private extractData(response: Response) {
    return new ManifestBuilder(response.json()).build();
  }
}
