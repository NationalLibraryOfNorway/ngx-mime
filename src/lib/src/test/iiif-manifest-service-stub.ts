import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { testManifest } from './testManifest';
import { ManifestBuilder } from './../core/builders/manifest.builder';
import { Manifest } from './../core/models/manifest';

export class IiifManifestServiceStub {
  public _currentManifest: Subject<Manifest> = new BehaviorSubject<Manifest>(new Manifest());

  get currentManifest(): Observable<Manifest> {
    return this._currentManifest.asObservable();
  }

  load(manifestUri: string): void {
    if (manifestUri === null) {
      return;
    }
    this._currentManifest.next(new ManifestBuilder(testManifest).build());
  }
}
