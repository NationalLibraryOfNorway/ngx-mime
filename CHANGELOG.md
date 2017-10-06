# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.7.0"></a>
# [0.7.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.6.0...v0.7.0) (2017-10-06)


### Bug Fixes

* page-slider disappears after window resize ([9fca275](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/9fca275))
* panning does not stop when hitting the edge of the page if panning diagonal ([4f56fa4](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/4f56fa4))
* remove api error massages to users ([a74e753](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/a74e753))
* setting mime header and footer toolbar to angular material toolbar height ([c521d6e](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/c521d6e))
* viewport doesn't pan on first/last page ([db027e7](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/db027e7))


### Features

* better pinch-zooming ([f3a3c76](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/f3a3c76))
* improved scrolling ([880cfc4](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/880cfc4))
* reset zoom level on browser resize and page change ([a4f9736](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/a4f9736))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.5.0...v0.6.0) (2017-10-05)


### Bug Fixes

* added missing contents and search content labels ([9fae622](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/9fae622))
* better panning in zoomed-in-mode + remove speed-criteria from zoomed-mode when calculating next page ([8473a82](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/8473a82))
* dispose attribution observable ([6d44611](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/6d44611))
* material dialog bug ([fdca465](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/fdca465))
* open viewer on canvas index if present ([11b1afe](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/11b1afe))


### Features

* improve zooming ([bf1280f](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/bf1280f))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.4.0...v0.5.0) (2017-10-03)


### Bug Fixes

* pan to center of previous page before zooming out when going to a new page in zoomed-in-mode ([9cc967f](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/9cc967f))
* recreate and update yarn lockfile to fix previous merge problem ([aef1b92](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/aef1b92))


### Features

* emit page mode change ([7d2277d](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/7d2277d))
* emit page number change ([bc201f8](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/bc201f8))
* hide all pages except for the current page in page view ([7f81cd3](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/7f81cd3))
* internationalization provider for norwegian bokmål ([2829836](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/2829836))
* navigate through search hits ([1c3b731](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/1c3b731))
* show error message if manifest fails to load ([08cab63](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/08cab63))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.3.0...v0.4.0) (2017-09-29)


### Features

* Browsing through a publication in page view ([#70](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/70)) ([5e6d23c](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/5e6d23c))
* it should be possible to set the startup canvas ([#69](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/69)) ([dad6f5a](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/dad6f5a))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.2.0...v0.3.0) (2017-09-28)


### Bug Fixes

* cleanup manifest service on destroy ([f269091](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/f269091))
* multiple annotations on single hit ([379263e](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/379263e))
* previous/next page button in page navigator don't work ([dc1d68c](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/dc1d68c))
* Toggling fullscreen mode makes browser hangs ([a2d40bf](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/a2d40bf))


### Features

* browse through a publication in dashboard view ([97a1ffd](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/97a1ffd))
* content search ([#62](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/62)) ([97ded80](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/97ded80))
* hide page navigation in dashboard mode ([c77cba7](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/c77cba7))
* keyboard navigation in content search ([b9210ad](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/b9210ad))
* keyboard navigation in contents ([66f7a0f](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/66f7a0f))
* landscape manifest in demo app ([b7b4d64](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/b7b4d64))
* loading different manifest in integration app ([#61](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/61)) ([1acfcb4](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/1acfcb4))
* slider navigation in dashboard view ([59ec6ce](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/59ec6ce))
* Switching between page and dashboard view ([fa429f6](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/fa429f6))
* upgrade material to beta 11 ([bff44ca](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/bff44ca))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.6...v0.2.0) (2017-09-07)


### Bug Fixes

* displaying metadata on small devices in landscape mode ([#44](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/44)) ([3a0595c](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/3a0595c))


### Features

* rights notices ([#45](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/45)) ([ab750b9](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/ab750b9))
* viewing publications in full screen mode ([fb85e0b](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/fb85e0b))
* zoom ([04e2290](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/04e2290))



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
