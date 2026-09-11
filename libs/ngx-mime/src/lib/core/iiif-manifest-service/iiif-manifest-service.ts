import { HttpErrorResponse, httpResource } from '@angular/common/http';
import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  Signal,
} from '@angular/core';
import { ManifestBuilder as IiifV2ManifestBuilder } from '../builders/iiif/v2/manifest.builder';
import { ManifestBuilder as IiifV3ManifestBuilder } from '../builders/iiif/v3/manifest.builder';
import { MimeViewerIntl } from '../intl';
import { Manifest } from '../models/manifest';
import { SpinnerService } from '../spinner-service/spinner.service';

class InvalidManifestError extends Error {}

@Injectable()
export class IiifManifestService {
  readonly manifest: Signal<Manifest | null>;
  readonly error: Signal<string | null>;
  private readonly intl = inject(MimeViewerIntl);
  private readonly spinnerService = inject(SpinnerService);
  private readonly manifestUri = signal<string | undefined>(undefined);
  private readonly missingManifestUri = signal(false, {
    equal: () => false,
  });
  private readonly manifestResource = httpResource<Manifest>(
    () => this.manifestUri(),
    {
      parse: (response) => {
        const manifest = this.extractData(response);
        if (!this.isManifestValid(manifest)) {
          throw new InvalidManifestError();
        }
        return manifest;
      },
    },
  );

  constructor() {
    this.manifest = computed(() =>
      this.manifestResource.hasValue() ? this.manifestResource.value() : null,
    );
    this.error = computed(() => {
      if (this.missingManifestUri()) {
        return this.intl.manifestUriMissingLabel;
      }

      const error = this.manifestResource.error();
      if (error instanceof InvalidManifestError) {
        return this.intl.manifestNotValidLabel;
      }

      return error ? this.handleError(error) : null;
    });

    effect(() => {
      if (this.manifestResource.isLoading()) {
        this.spinnerService.show();
      } else {
        this.spinnerService.hide();
      }
    });
  }

  load(manifestUri: string | null): void {
    this.manifestResource.set(undefined);

    if (!manifestUri || manifestUri.length === 0) {
      this.manifestUri.set(undefined);
      this.missingManifestUri.set(true);
      return;
    }

    this.missingManifestUri.set(false);
    if (manifestUri === this.manifestUri()) {
      this.manifestResource.reload();
    } else {
      this.manifestUri.set(manifestUri);
    }
  }

  destroy(): void {
    this.manifestUri.set(undefined);
    this.manifestResource.set(undefined);
    this.missingManifestUri.set(false);
  }

  private extractData(response: unknown): Manifest {
    const manifestResponse = response as Record<string, unknown>;
    if (manifestResponse['type'] === 'Manifest') {
      return new IiifV3ManifestBuilder(manifestResponse).build();
    } else {
      return new IiifV2ManifestBuilder(manifestResponse).build();
    }
  }

  private isManifestValid(manifest: Manifest): boolean {
    return (
      manifest &&
      manifest.tileSource !== undefined &&
      manifest.tileSource.length > 0
    );
  }

  private handleError(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
      return error instanceof Error ? error.message : String(error);
    }

    return error.error instanceof Object ? error.message : String(error.error);
  }
}
