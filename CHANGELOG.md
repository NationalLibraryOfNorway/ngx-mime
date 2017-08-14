# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.1.6"></a>
## [0.1.6](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.5...v0.1.6) (2017-08-14)


### Bug Fixes

* withCredentials for nb.no ([cfe1cdf](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/cfe1cdf))



<a name="0.1.5"></a>
## [0.1.5](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.4...v0.1.5) (2017-08-08)


### Bug Fixes

* using icons from openseadragon site ([41c7ea5](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/41c7ea5))



<a name="0.1.4"></a>
## [0.1.4](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.3...v0.1.4) (2017-08-08)



<a name="0.1.3"></a>
## [0.1.3](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.3-alpha.3...v0.1.3) (2017-08-08)


### Bug Fixes

* added cdk to deps ([#28](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/28)) ([af84358](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/af84358))
* closing sidenavn when mode is over ([a089bee](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/a089bee))
* http module must be imported in app ([#30](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/30)) ([1670e74](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/1670e74))
* relative manifest paths ([2b27031](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/2b27031))
* update viewer on manifesturi changes ([43384bb](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/43384bb))


### ci

* npm script for coverage ([#31](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/31)) ([de4be18](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/de4be18))


### BREAKING CHANGES

* Changed "url" paramater to "manifestUri"
fix: Didn't need CUSTOM_ELEMENTS_SCHEMA. Problem was ngx-mime in node_modules that didn't update correctly

* fix: Wrong path to mime-viewer

* ci: npm script for coverage

Coverage shouldn't be the default with running npm test since it increases the time it takes to run unit tests.

* ci: coverage instead of test:once

No need to test it twice

* ci: test

* ci: test outside sauce labs

* ci: test
* Changed "url" paramater to "manifestUri"
fix: Didn't need CUSTOM_ELEMENTS_SCHEMA. Problem was ngx-mime in node_modules that didn't update correctly

* fix: Wrong path to mime-viewer

* fix: remove http module import

- HttpModule must be imported in app
- Import openseadragon in module.ts
- Styles

* fix: import openseadragon

Import openseadragon



<a name="0.1.3-alpha.3"></a>
## [0.1.3-alpha.3](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.3-alpha.2...v0.1.3-alpha.3) (2017-06-29)



<a name="0.1.3-alpha.2"></a>
## [0.1.3-alpha.2](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.3-alpha.1...v0.1.3-alpha.2) (2017-06-23)



<a name="0.1.3-alpha.1"></a>
## [0.1.3-alpha.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.3-alpha.0...v0.1.3-alpha.1) (2017-06-23)



<a name="0.1.3-alpha.0"></a>
## [0.1.3-alpha.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.2...v0.1.3-alpha.0) (2017-06-23)
