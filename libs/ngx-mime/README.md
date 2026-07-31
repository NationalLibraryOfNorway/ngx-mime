# `@nationallibraryofnorway/ngx-mime`

[![npm version](https://badge.fury.io/js/@nationallibraryofnorway%2Fngx-mime.svg)](https://badge.fury.io/js/@nationallibraryofnorway%2Fngx-mime)

An Angular component library for displaying and navigating IIIF manifests.

## Compatibility

The current major release supports Angular 20. See the package's peer
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

## More documentation

- [Getting Started Guide](https://github.com/NationalLibraryOfNorway/ngx-mime/wiki/Getting-Started)
- [Demo application source](https://github.com/NationalLibraryOfNorway/ngx-mime/tree/main/apps/demo)
- [Issues and feature requests](https://github.com/NationalLibraryOfNorway/ngx-mime/issues)
- [Repository and contribution guide](https://github.com/NationalLibraryOfNorway/ngx-mime)

## License

Mime is available under the
[MIT License](https://github.com/NationalLibraryOfNorway/ngx-mime/blob/main/LICENSE).
