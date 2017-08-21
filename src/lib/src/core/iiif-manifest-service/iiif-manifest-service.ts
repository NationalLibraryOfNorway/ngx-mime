import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Manifest } from '../models/manifest';
import { ManifestBuilder } from '../builders/manifest.builder';
import './../../rxjs-extension';

@Injectable()
export class IiifManifestService {
  currentManifest: Subject<Manifest> = new BehaviorSubject<Manifest>(null);

  constructor(private http: HttpClient) { }

  load(manifestUri: string): void {
    if (manifestUri === null) {
      return;
    }
    this.http.get(manifestUri)
      .subscribe(
      (res: Response) => this.currentManifest.next(this.extractData(res)),
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
