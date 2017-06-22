For help getting started with a new Angular app, check out the
[Angular CLI](https://cli.angular.io/).

For existing apps, follow these steps to begin using Angular Material.

## Step 1: Install Mime

```bash
npm install --save @nationallibraryofnorway/ngx-mime
```

## Step 2: Animations

Mime depend on the Angular animations module in order to be able to do
more advanced transitions. If you want these animations to work in your app, you have to
install the `@angular/animations` module and include the `BrowserAnimationsModule` in your app.

```bash
npm install --save @angular/animations
```

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [BrowserAnimationsModule],
  ...
})
export class LibraryAppModule { }
```

If you don't want to add another dependency to your project, you can use the `NoopAnimationsModule`.

```ts
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [NoopAnimationsModule],
  ...
})
export class LibraryAppModule { }
```

## Step 3: Import the component modules

Import the NgModule for the component: 

```ts
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';

@NgModule({
  ...
  imports: [MimeModule],
  ...
})
export class LibraryAppModule { }
```

Be sure to import the Mime module _after_ Angular's 
`BrowserModule`, as the import order matters for NgModules.

## Step 4: Gesture Support

Mime rely on
[HammerJS](http://hammerjs.github.io/) for gestures. In order to get the full feature-set of these
components, HammerJS must be loaded into the application.

You can add HammerJS to your application via [npm](https://www.npmjs.com/package/hammerjs), a CDN
(such as the [Google CDN](https://developers.google.com/speed/libraries/#hammerjs)), or served
directly from your app.

To install via npm, use the following command:
```bash
npm install --save hammerjs
```

After installing, import it on your app's root module.
```ts
import 'hammerjs';
```

## Step 5: Add Material Icons

load the icon font [Material Design Icons](https://material.io/icons/) in your `index.html`.

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

## Step 6: Add Mime Viewer to the component

```html
<mime-viewer></mime-viewer>
```

## Appendix: Configuring SystemJS

If your project is using SystemJS for module loading, you will need to add `@nationallibraryofnorway/ngx-mime`
to the SystemJS configuration:

```js
System.config({
  // existing configuration options
  map: {
    // ...
    '@nationallibraryofnorway/ngx-mime': 'npm:@nationallibraryofnorway/ngx-mime/bundles/material.umd.js',
    // ...
  }
});
```
