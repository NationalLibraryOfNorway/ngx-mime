import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { ManifestBuilder as IiifV2ManifestBuilder } from '../builders/iiif/v2/manifest.builder';
import { ManifestBuilder as IiifV3ManifestBuilder } from '../builders/iiif/v3/manifest.builder';
import { MimeViewerIntl } from '../intl';
import { Manifest } from '../models/manifest';
import { SpinnerService } from '../spinner-service/spinner.service';

@Injectable()
export class IiifManifestService {
  intl = inject(MimeViewerIntl);
  readonly manifest: Signal<Manifest | null>;
  readonly error: Signal<string | null>;
  private readonly http = inject(HttpClient);
  private readonly spinnerService = inject(SpinnerService);
  private readonly manifestState = signal<Manifest | null>(null);
  private readonly errorState = signal<string | null>(null, {
    equal: () => false,
  });

  constructor() {
    this.manifest = this.manifestState.asReadonly();
    this.error = this.errorState.asReadonly();
  }

  load(manifestUri: string | null): Observable<boolean> {
    return new Observable((observer) => {
      if (!manifestUri || manifestUri.length === 0) {
        this.errorState.set(this.intl.manifestUriMissingLabel);
        observer.next(false);
      } else {
        this.spinnerService.show();
        this.http
          .get<Response>(manifestUri)
          .pipe(
            finalize(() => this.spinnerService.hide()),
            take(1),
          )
          .subscribe(
            (response: Response) => {
              const manifest = this.extractData(response);
              if (this.isManifestValid(manifest)) {
                this.manifestState.set(manifest);
                observer.next(true);
              } else {
                this.errorState.set(this.intl.manifestNotValidLabel);
                observer.next(false);
              }
            },
            (err: HttpErrorResponse) => {
              this.errorState.set(this.handleError(err));
              observer.next(false);
            },
          );
      }
    });
  }

  destroy() {
    this.resetCurrentManifest();
    this.resetErrorMessage();
  }

  private resetCurrentManifest() {
    this.manifestState.set(null);
  }

  private resetErrorMessage() {
    this.errorState.set(null);
  }

  private extractData(response: any) {
    if (response.type === 'Manifest') {
      return new IiifV3ManifestBuilder(response).build();
    } else {
      return new IiifV2ManifestBuilder(response).build();
    }
  }

  private isManifestValid(manifest: Manifest): boolean {
    return (
      manifest &&
      manifest.tileSource !== undefined &&
      manifest.tileSource.length > 0
    );
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
