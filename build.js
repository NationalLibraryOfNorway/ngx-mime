'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const camelCase = require('camelcase');
const ngc = require('@angular/compiler-cli/src/main').main;
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const sourcemaps = require('rollup-plugin-sourcemaps');
const execa = require('execa');

const inlineResources = require('./inline-resources');

const libNameWithScope = require('./package.json').name;
const libName = libNameWithScope.slice(libNameWithScope.indexOf('/') + 1);
const rootFolder = path.join(__dirname);
const compilationFolder = path.join(rootFolder, 'out-tsc');
const srcFolder = path.join(rootFolder, 'src/lib');
const distFolder = path.join(rootFolder, 'dist');
const tempLibFolder = path.join(compilationFolder, 'lib');
const es5OutputFolder = path.join(compilationFolder, 'lib-es5');
const es2015OutputFolder = path.join(compilationFolder, 'lib-es2015');

return Promise.resolve()
  // Copy library to temporary folder and inline html/css.
  .then(() => _relativeCopy(`**/*`, srcFolder, tempLibFolder)
    .then(() => inlineResources(tempLibFolder))
    .then(() => console.log('Inlining succeeded.'))
  )
  // Compile to ES2015.
  .then(() => ngc(['--project', `${tempLibFolder}/tsconfig.lib.json`]))
  .then(exitCode => exitCode === 0 ? Promise.resolve() : Promise.reject())
  .then(() => console.log('ES2015 compilation succeeded.'))
  // Compile to ES5.
  .then(() => ngc(['--project', `${tempLibFolder}/tsconfig.es5.json`]))
  .then(exitCode => exitCode === 0 ? Promise.resolve() : Promise.reject())
  .then(() => console.log('ES5 compilation succeeded.'))
  // Copy typings and metadata to `dist/` folder.
  .then(() => Promise.resolve()
    .then(() => _relativeCopy('**/*.d.ts', es2015OutputFolder, distFolder))
    .then(() => _relativeCopy('**/*.metadata.json', es2015OutputFolder, distFolder))
    .then(() => console.log('Typings and metadata copy succeeded.'))
  )
  // Bundle lib.
  .then(() => {
    // Base configuration.
    const es5Entry = path.join(es5OutputFolder, `${libName}.js`);
    const es2015Entry = path.join(es2015OutputFolder, `${libName}.js`);
    const rollupBaseConfig = {
      moduleName: camelCase(libName),
      sourceMap: true,
      // ATTENTION:
      // Add any dependency or peer dependency your library to `globals` and `external`.
      // This is required for UMD bundle users.
      globals: {
        // The key here is library name, and the value is the the name of the global variable name
        // the window object.
        // See https://github.com/rollup/rollup/wiki/JavaScript-API#globals for more.
        'tslib': 'tslib',
        'openseadragon': 'ng.opensedragon',
        'd3': 'd3',

        '@angular/animations': 'ng.animations',
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        '@angular/forms': 'ng.forms',
        '@angular/common/http': 'ng.common.http',
        '@angular/router': 'ng.router',
        '@angular/platform-browser': 'ng.platformBrowser',
        '@angular/platform-server': 'ng.platformServer',
        '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
        '@angular/platform-browser/animations': 'ng.platformBrowser.animations',
        '@angular/core/testing': 'ng.core.testing',
        '@angular/common/testing': 'ng.common.testing',
        '@angular/common/http/testing': 'ng.common.http.testing',
        '@angular/flex-layout': 'ng.flex-layout',

        // Some packages are not really needed for the UMD bundles, but for the missingRollupGlobals rule.
        '@angular/material': 'ng.material',
        '@angular/cdk': 'ng.cdk',

        // Include secondary entry-points of the cdk and material packages

        'rxjs/BehaviorSubject': 'Rx',
        'rxjs/ReplaySubject': 'Rx',
        'rxjs/Observable': 'Rx',
        'rxjs/Subject': 'Rx',
        'rxjs/Subscription': 'Rx',
        'rxjs/Observer': 'Rx',
        'rxjs/Subscriber': 'Rx',
        'rxjs/Scheduler': 'Rx',

        'rxjs/observable/combineLatest': 'Rx.Observable',
        'rxjs/observable/forkJoin': 'Rx.Observable',
        'rxjs/observable/fromEvent': 'Rx.Observable',
        'rxjs/observable/merge': 'Rx.Observable',
        'rxjs/observable/of': 'Rx.Observable',
        'rxjs/observable/throw': 'Rx.Observable',
        'rxjs/observable/defer': 'Rx.Observable',
        'rxjs/observable/fromEventPattern': 'Rx.Observable',
        'rxjs/observable/empty': 'Rx.Observable',

        'rxjs/operators/debounceTime': 'Rx.Observable',
        'rxjs/operators/takeUntil': 'Rx.Observable',
        'rxjs/operators/first': 'Rx.Observable',
        'rxjs/operators/filter': 'Rx.Observable',
        'rxjs/operators/map': 'Rx.Observable',
        'rxjs/operators/tap': 'Rx.Observable',
        'rxjs/operators/startWith': 'Rx.Observable',
        'rxjs/operators/auditTime': 'Rx.Observable',
        'rxjs/operators/switchMap': 'Rx.Observable',
        'rxjs/operators/finalize': 'Rx.Observable',
        'rxjs/operators/catchError': 'Rx.Observable',
        'rxjs/operators/share': 'Rx.Observable',
        'rxjs/operators/delay': 'Rx.Observable',
        'rxjs/operators/combineLatest': 'Rx.Observable',
        'rxjs/operators/throttle': 'Rx.Observable',
        'rxjs/operators/interval': 'Rx.Observable',
        'rxjs/operators/val': 'Rx.Observable',
        'rxjs/operators/take': 'Rx.Observable',
        'rxjs/operators/sample': 'Rx.Observable',
        'rxjs/operators/distinctUntilChanged': 'Rx.Observable',
        'rxjs/operators/finally': 'Rx.Observable',
        'rxjs/observable/interval': 'Rx.Observable',
      },
      external: [
        // List of dependencies
        // See https://github.com/rollup/rollup/wiki/JavaScript-API#external for more.
        'd3',
        '@angular/core',
        '@angular/animations',
        '@angular/common',
        '@angular/common/http',
        '@angular/forms',
        '@angular/material',
        '@angular/flex-layout',
        'openseadragon',
        'rxjs/Observable',
        'rxjs/BehaviorSubject',
        'rxjs/Subject',
        'rxjs/ReplaySubject',
        'rxjs/Subscription',
        'rxjs/observable/interval',
        'rxjs/operators/throttle',
        'rxjs/operators/filter',
        'rxjs/operators/distinctUntilChanged',
        'rxjs/operators/finalize',
        'rxjs/operators/take',
        'rxjs/operators/takeUntil',
        'rxjs/operators/sample'
      ],
      plugins: [
        sourcemaps()
      ],
      onwarn: function (warning) {
        // Skip certain warnings

        // should intercept ... but doesn't in some rollup versions
        if (warning.code === 'THIS_IS_UNDEFINED') {
          return;
        }
        // console.warn everything else
        console.warn(warning.message);
      }
    };

    // UMD bundle.
    const umdConfig = Object.assign({}, rollupBaseConfig, {
      entry: es5Entry,
      dest: path.join(distFolder, `bundles`, `${libName}.umd.js`),
      format: 'umd',
    });

    // Minified UMD bundle.
    const minifiedUmdConfig = Object.assign({}, rollupBaseConfig, {
      entry: es5Entry,
      dest: path.join(distFolder, `bundles`, `${libName}.umd.min.js`),
      format: 'umd',
      plugins: rollupBaseConfig.plugins.concat([uglify({})])
    });

    // ESM+ES5 flat module bundle.
    const fesm5config = Object.assign({}, rollupBaseConfig, {
      entry: es5Entry,
      dest: path.join(distFolder, `${libName}.es5.js`),
      format: 'es'
    });

    // ESM+ES2015 flat module bundle.
    const fesm2015config = Object.assign({}, rollupBaseConfig, {
      entry: es2015Entry,
      dest: path.join(distFolder, `${libName}.js`),
      format: 'es'
    });

    const allBundles = [
      umdConfig,
      minifiedUmdConfig,
      fesm5config,
      fesm2015config
    ].map(cfg => rollup.rollup(cfg).then(bundle => bundle.write(cfg)));

    return Promise.all(allBundles)
      .then(() => console.log('All bundles generated successfully.'))
  })
  // Copy package files
  .then(() => Promise.resolve()
    .then(() => _relativeCopy('LICENSE', rootFolder, distFolder))
    .then(() => _relativeCopy('package.json', rootFolder, distFolder))
    .then(() => _relativeCopy('README.md', rootFolder, distFolder))
    .then(() => console.log('Package files copy succeeded.'))
  )
  .catch(e => {
    console.error('\Build failed. See below for errors.\n');
    console.error(e);
    process.exit(1);
  });


// Copy files maintaining relative paths.
function _relativeCopy(fileGlob, from, to) {
  return new Promise((resolve, reject) => {
    glob(fileGlob, { cwd: from, nodir: true }, (err, files) => {
      if (err) {
        reject(err);
      }
      files.forEach(file => {
        const origin = path.join(from, file);
        const dest = path.join(to, file);
        const data = fs.readFileSync(origin, 'utf-8');
        _recursiveMkDir(path.dirname(dest));
        fs.writeFileSync(dest, data);
        resolve();
      })
    })
  });
}

// Recursively create a dir.
function _recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    _recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}

function compileSassFiles() {
  return execa('node-sass', [
    tempLibFolder,
    '-o', tempLibFolder,
    '--output-style',
    'compressed',
    '--source-map',
    true,
    '--source-map-contents'
  ]);
}
