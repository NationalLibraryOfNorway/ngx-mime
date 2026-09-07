import { signal, Signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ManifestBuilder } from '../core/builders/iiif/v2/manifest.builder';
import { Manifest } from './../core/models/manifest';
import { testManifest } from './testManifest';

export class IiifManifestServiceStub {
  readonly manifest: Signal<Manifest | null>;
  readonly error: Signal<string | null>;
  private readonly manifestSignal = signal<Manifest | null>(new Manifest());
  private readonly errorSignal = signal<string | null>(null);

  constructor() {
    this.manifest = this.manifestSignal.asReadonly();
    this.error = this.errorSignal.asReadonly();
  }

  load(manifestUri: string): Observable<boolean> {
    if (manifestUri) {
      const manifest = new ManifestBuilder(testManifest).build();
      if (manifest && manifest.tileSource) {
        this.setManifest(manifest);

        return of(true);
      } else {
        this.setError('Manifest is not valid');

        return of(false);
      }
    } else {
      this.setError('ManifestUri is missing');

      return of(false);
    }
  }

  resetCurrentManifest() {
    this.setManifest(null);
  }

  resetErrorMessage() {
    this.setError(null);
  }

  destroy(): void {}

  public search(_manifest: Manifest, _q: string): void {}

  setManifest(manifest: Manifest | null): void {
    this.manifestSignal.set(manifest);
  }

  setError(error: string | null): void {
    this.errorSignal.set(error);
  }
}
