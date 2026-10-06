# `@nationallibraryofnorway/ngx-mime`

[![npm version](https://badge.fury.io/js/@nationallibraryofnorway%2Fngx-mime.svg)](https://badge.fury.io/js/@nationallibraryofnorway%2Fngx-mime)

An Angular component library for displaying and navigating IIIF manifests.

## Compatibility

The current major release supports Angular 22. See the package's peer
dependencies for the complete compatibility requirements.

## Installation

Install the package from npm:

```bash
npm install @nationallibraryofnorway/ngx-mime
```

## Application setup

Provide Angular's HTTP client in your application configuration:

```ts
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()],
};
```

### Internationalization

English labels are used by default. To select another bundled locale, add
`provideMimeViewerIntl` to the application configuration:

```ts
import { ApplicationConfig } from '@angular/core';
import { Locales, provideMimeViewerIntl } from '@nationallibraryofnorway/ngx-mime';

export const appConfig: ApplicationConfig = {
  providers: [provideMimeViewerIntl({ locale: Locales.NORWEGIAN })],
};
```

Supported locales:

- English (`Locales.ENGLISH`, default)
- Norwegian Bokmål (`Locales.NORWEGIAN`)
- Lithuanian (`Locales.LITHUANIAN`)

The configured locale applies to every viewer in the application, while each
viewer receives its own `MimeViewerIntl` instance. Runtime label changes in one
viewer therefore do not affect other viewers.

Add OpenSeadragon to the application's `scripts` build option in
`angular.json`:

```json
{
  "scripts": ["node_modules/openseadragon/build/openseadragon/openseadragon.min.js"]
}
```

## Display a manifest

Import `MimeModule` in a standalone component and pass a IIIF manifest URL to
`<mime-viewer>`:

```ts
import { Component } from '@angular/core';
import { MimeModule, MimeViewerConfig, MimeViewerMode } from '@nationallibraryofnorway/ngx-mime';

@Component({
  selector: 'app-viewer',
  imports: [MimeModule],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss',
})
export class ViewerComponent {
  readonly manifestUri = 'https://example.org/iiif/manifest.json';
  readonly config = new MimeViewerConfig({
    initViewerMode: MimeViewerMode.PAGE,
    navigationControlEnabled: true,
  });

  onCanvasChanged(canvasIndex: number): void {
    console.log('Current canvas:', canvasIndex);
  }
}
```

```html
<mime-viewer class="viewer" [manifestUri]="manifestUri" [config]="config" (canvasChanged)="onCanvasChanged($event)"></mime-viewer>
```

```scss
.viewer {
  display: block;
  height: 100vh;
}
```

## Theming

Include the Mime theme mixin alongside your Angular Material theme:

```scss
@use '@nationallibraryofnorway/ngx-mime/ngx-mime-theme' as ngx-mime;

@include ngx-mime.theme($theme);
```

The `$theme` value is an Angular Material theme created with
`mat.define-theme`. See the
[demo themes](https://github.com/NationalLibraryOfNorway/ngx-mime/tree/main/apps/demo/src/themes)
for complete examples.

## Viewer bindings

Common inputs:

| Input         | Description                                    |
| ------------- | ---------------------------------------------- |
| `manifestUri` | URL of the IIIF manifest to display            |
| `config`      | Viewer options created with `MimeViewerConfig` |
| `canvasIndex` | Initial or selected canvas index               |
| `q`           | Search query                                   |
| `tabIndex`    | Viewer tab order                               |

Common outputs:

| Output                             | Description                                 |
| ---------------------------------- | ------------------------------------------- |
| `canvasChanged`                    | Emits the current canvas index              |
| `manifestChanged`                  | Emits the loaded manifest                   |
| `viewerModeChanged`                | Emits when the viewer mode changes          |
| `qChanged`                         | Emits when the search query changes         |
| `recognizedTextContentModeChanged` | Emits when the recognized-text view changes |

## Authenticated tile requests

Enable OpenSeadragon's AJAX tile loading and pass authorization headers through
`MimeViewerConfig`. Supply a new config when the access token changes; ngx-mime
propagates the new headers to existing tiled images and queued tile requests.

```ts
this.mimeViewerConfig = new MimeViewerConfig({
  ...this.mimeViewerConfig,
  loadTilesWithAjax: true,
  ajaxHeaders: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

ngx-mime is authentication-library agnostic. If an authentication library must
transform the header or add a request-specific proof, do that in the
application's request layer rather than storing the proof in `ajaxHeaders`.

OpenSeadragon sends viewer-level `ajaxHeaders` to every configured tile source.
Only use authorization headers with manifests and tile origins that you trust.

## More documentation

- [Getting Started Guide](https://github.com/NationalLibraryOfNorway/ngx-mime/wiki/Getting-Started)
- [Demo application source](https://github.com/NationalLibraryOfNorway/ngx-mime/tree/main/apps/demo)
- [Issues and feature requests](https://github.com/NationalLibraryOfNorway/ngx-mime/issues)
- [Repository and contribution guide](https://github.com/NationalLibraryOfNorway/ngx-mime)

## License

Mime is available under the
[MIT License](https://github.com/NationalLibraryOfNorway/ngx-mime/blob/main/LICENSE).
