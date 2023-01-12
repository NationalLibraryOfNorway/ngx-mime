# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [14.0.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v14.0.0...v14.0.1) (2023-01-12)


### Bug Fixes

* wrong peerDependencies ([84922a7](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/84922a7559e69845de7b0de35f3862b571f1f5d0))

## [14.0.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v13.3.2...v14.0.0) (2022-12-16)


### ⚠ BREAKING CHANGES

* Angular 14

### Features

* angular v14 and migrate from protractor to playwright ([df28909](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/df289090da3243f124b2f839c0aad279eb2e2704)), closes [#431](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/431)


### Bug Fixes

* contents-dialog should now resize on objects without toc ([#436](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/436)) ([52da246](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/52da246dc43b454dd1cde6b427eacb60e4442f7b))
* handle empty margins in recognized text ([5470001](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/5470001ce9c463315564eb5ee3b33f0915cd2b3b))

### [13.3.2](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v13.3.1...v13.3.2) (2022-09-19)


### Bug Fixes

* removed unnecessary labels ([495f2e7](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/495f2e776171273b9d3a98e1b6943ea410f53821)), closes [#429](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/429)
* various jasmine 4.0 deprecations ([4292e88](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/4292e88fcfe540719ee701d27b86bf580eb3b725))

### [13.3.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v13.3.0...v13.3.1) (2022-06-10)


### Bug Fixes

* make highlighting compatible with firefox & safari ([#426](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/426)) ([901cff1](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/901cff1dc5498d68de71cdd18232f168b3728385))

## [13.3.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v13.2.1...v13.3.0) (2022-05-25)


### Features

* narrower view dialog ([8e41df6](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/8e41df6140f8782111fe63fcca9fbd318d87492a))


### Bug Fixes

* e2e mobile tests ([d57d2e9](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/d57d2e9943e9ff8bf88ad626a41d583b0a860307))

### [13.2.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v13.2.0...v13.2.1) (2022-05-20)


### Bug Fixes

* providers ([2b2a8be](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/2b2a8bee8229937abcf353672a7d355d78f5db81))

## [13.2.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v13.1.1...v13.2.0) (2022-05-20)


### Features

* Make highlighting more visually strong ([e3757d7](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/e3757d72a4378488f0fbf9aad426592fa83066ba))
* Mark recognized text from when selecting hit from content search ([a7b553a](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/a7b553a3723e1edf225b4e7c4f1f58d16c6c9649))
* navigate between hits on current canvas with content-search-navigator ([#409](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/409)) ([15a4310](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/15a4310116b33f9b2eca0fdae8f948fcf28f8661))
* show digital text only ([#417](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/417)) ([6f3e0e0](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/6f3e0e0e4688905a2b5d50a153aa26cbd09b9fd9)), closes [#416](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/416)


### Bug Fixes

* add help text for shift-s ([#418](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/418)) ([d17f55b](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/d17f55b597bb432566004c590c975edfcd4c3925))
* changed keyup events in templates to keydown ([f00d815](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/f00d815079623d5584a48acc4171de8054c49313)), closes [#413](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/413)
* only run preventDefault on active keybinds ([688c203](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/688c2039b90cca03988549e9b7483d6ffcffb133))
* resetsearch hotkey ([#412](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/412)) ([0e3d212](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/0e3d21245d12dceef230380e226308d9985b1de5))
* should now rotate on Mac iOS but not on handheld iOS ([#419](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/419)) ([3cb6be4](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/3cb6be4127fda6474e6e56376a6f8b6abb2c8936))
* various bugs with dialogs and change detection ([c04db5c](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/c04db5c64ef44a3f9922629cfd3036e2d15a7bc7))

### [13.1.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v13.1.0...v13.1.1) (2022-03-09)


### Bug Fixes

* show rotation is not supported message for non canvas devices ([701d2bf](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/701d2bf3dfd2d93b2187de59a36c6406b70d9d22))

## [13.1.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v13.0.1...v13.1.0) (2022-02-28)

### Features

- Add support for IIIF Presentation API v3.0 ([de34aff](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/de34afffa123155dca0825354867852d002e10ef))
- change maxZoomPixelRatio to 5 ([6008c3b](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/6008c3bb73be13f9e1979bee6945933c92b3609c)), closes [#391](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/391)
- hightlight text in recognize text tab ([bce6740](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/bce674068e53e29b358d5d291338f2e876c9d5fc))
- update openseadragon to v3 ([8e39d2b](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/8e39d2bd0e8404e47f88d448136eab0d2b5aefc9)), closes [#378](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/378)
- zoom to current page size in dashboard mode ([5c80a28](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/5c80a28e5ed7bd6f387a50915ce9ce0707fb3dd6)), closes [#388](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/388)

### Bug Fixes

- cleanup on destroy ([5e28676](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/5e286769c2ce5b437bf5d203caed970d5bbb064e))
- Modern "ios" devices report as Macintosh, so disable canvas also for Mac ([8dccd51](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/8dccd518ed059e9db0403905b0fa39eac889018d))
- npe ([846d330](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/846d33029b5e6964b0ba623db18b70d403f449f2))

### [13.0.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v13.0.0...v13.0.1) (2021-12-06)

### Bug Fixes

- peer dependencies ([4657f18](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/4657f18ad0f5d4993237f6601f444b0da49777f9))

## [13.0.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v12.4.0...v13.0.0) (2021-12-06)

### Features

- angular 13 ([058cdc8](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/058cdc8e041eaad69384527c19c827c2e7b7f8b7))

### Bug Fixes

- search dialog not filling height of dialog with scrollable content ([5581107](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/5581107ee212b72ad7844bee96c273ff5691a7c5)), closes [#375](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/375)
- search dialog title should be h1 ([9046a18](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/9046a1866ebc864657e877df1a6b753ecf329473)), closes [#372](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/372)

## [12.4.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v12.3.0...v12.4.0) (2021-11-16)

### Features

- ignorePhysicalScale toggle in MimeViewerConfig ([#367](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/367)) ([1388543](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/138854312b9a5bb389c360ebbd87ec91a1b37ed3))

### Bug Fixes

- scale highlight rectangles based on physicalScale ([f9e28a6](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/f9e28a6a5a20950cb8f2ebb9fb0152857a2c7041))
- Use SUBS_CONTENT when parsing ALTO files ([d4ece27](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/d4ece279130b0b2f8097c27ec35c65dc0bee1905))

## [12.3.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v12.2.8...v12.3.0) (2021-11-02)

### Features

- openseadragon v3 support ([91d9df7](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/91d9df73caec8ffdd7e5b147838d14c1f07b283e))

### Bug Fixes

- physicalScale ([bfb5126](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/bfb5126a31cb2d7fc6006ed66642b4a6e6151b9c))
- re-initialize subscriptions before adding ([#360](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/360)) ([1bb493d](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/1bb493d4c4aafecc8b5fc5fed115806fbb0d372a))

### [12.2.8](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v12.2.7...v12.2.8) (2021-09-23)

### Bug Fixes

- double scrollbar for recognized-text ([da93d5f](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/da93d5f9b579ce9ae881b48a91f3756f590e41e0)), closes [#355](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/355)
- useCanvas set to false for iOS devices ([#358](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/358)) ([c1bb0b9](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/c1bb0b989d3b357ee1090d58b4b18c244579239d)), closes [#357](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/357)

### [12.2.7](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v12.2.6...v12.2.7) (2021-09-16)

### [12.2.6](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v12.2.3...v12.2.6) (2021-09-16)

### Bug Fixes

- release version ([c72bad7](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/c72bad7))

### [12.2.5](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v12.2.3...v12.2.5) (2021-09-16)

### Bug Fixes

- release version ([c72bad7](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/c72bad762ef946b56af4165994dbc31763297af7))

### [12.2.4](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v12.2.3...v12.2.4) (2021-09-16)

### Bug Fixes

- release version ([c72bad7](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/c72bad762ef946b56af4165994dbc31763297af7))

### [12.2.3](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v12.2.2...v12.2.3) (2021-09-16)

### Bug Fixes

- release script ([ef3d01d](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/ef3d01d0b114283694ca5286ccd3ad9bcbd66593))

### [12.2.2](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v12.2.1...v12.2.2) (2021-09-16)

### Bug Fixes

- Traversing nested ComposeBlocks to get all TextBlocks ([#352](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/352)) ([9139c94](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/9139c940301e0fe0c9d7ca4db173641311a2545e)), closes [#351](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/351)

### [12.2.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v12.2.0...v12.2.1) (2021-09-15)

### Bug Fixes

- recognized text content is not opened ([bd066f5](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/bd066f574824b1411bd54341b14ece3b23dd5623)), closes [#349](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/349)

## [12.2.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v12.1.1...v12.2.0) (2021-09-13)

### Features

- access key for recognized text content ([0fc3cb0](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/0fc3cb0603c3a5a2cdda5c702b12f403bfcc16a1))

### Bug Fixes

- “extractCss is deprecated” ([88d39d8](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/88d39d8171cd50ae01cbd488097d316c723d541c))
- karma-coverage instead of karma-coverage-istanbul-reporter ([142238a](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/142238ad2df316251efd2d3fba453deb409d92c3))
- apps is missing material typography styles ([a19294a](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/a19294a6f6dd61f9e5e3721b8ae54fe4907168d7))
- **demo:** correct header size on mobile devices ([8e756aa](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/8e756aa33f6955d5b503d8005d2680bf2cbcbdbc))
- padding on top and bottom on recognized text container ([828bd67](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/828bd678167bb4876072f667424e73717758ceeb))
- xml2js changed to peerDependency ([2331808](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/23318089ba474e4f7038a7f7d4b55c2b4dbd6a3e))

### [12.1.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v12.1.0...v12.1.1) (2021-09-02)

### Bug Fixes

- return 0 canvas groups to if speed is 0 ([#339](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/339)) ([4a3f970](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/4a3f9707e2b7a5801b6956084dfc1c0be5826f62))

## [12.1.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v12.0.0...v12.1.0) (2021-08-26)

### Features

- show recognized text content ([3fb5982](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/3fb5982734738e478fb75a91c0ccf99566b9c33c))

### Bug Fixes

- wallabyjs ([4956c69](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/4956c691db3db46af60eaf19f66aaecb97099389))

## [12.0.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v11.0.3...v12.0.0) (2021-06-02)

### ⚠ BREAKING CHANGES

- Upgrade to Angular v12
  feat: Migrate from TSLint to ESLint
  build: nx cloud (https://nx.app/)
  chore: update sauce-connector

### Features

- angular 12 ([a75baf4](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/a75baf42e9b19e346e5fca5f993c731638343695))

### Bug Fixes

- removed deprecated node-sass ([a3c5226](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/a3c522689c8a9f08ea3cc245905ac901bfd91168))

### [11.0.3](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v11.0.2...v11.0.3) (2021-03-31)

### [11.0.2](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v11.0.1...v11.0.2) (2021-03-31)

### Bug Fixes

- avoid leaking generic css rules ([b5162de](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/b5162de976f58d9aeb73610af5c4713fed8db5be))
- free all OpenSeadragon resources on destroy ([b88d8c7](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/b88d8c7b9205fecb0c6b412c6f3db301d5cf32e9))
- recalculate current canvas group on click outside a canvas group ([3e21034](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/3e21034801f06eda782dfd8ae39edf03ab5cdb76))
- **e2e:** disable w3c mode ([6e8eed0](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/6e8eed05e5d63b408e3353fa38e74157db8e0d1f))
- setting default tileOverlap to 0.1 ([#314](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/314)) ([aefcf38](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/aefcf3899aed8228f28e356bf7ed2f9e3a31488b)), closes [#313](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/313)

### [11.0.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v11.0.0...v11.0.1) (2021-01-14)

## [11.0.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v10.1.0...v11.0.0) (2021-01-06)

### ⚠ BREAKING CHANGES

- Update to Angular 11

### Features

- nx migrate to angular 11 ([ee9a326](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/ee9a3262e60eddadd9305c6f26ccdab90c697f03))

## [10.1.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v10.0.0...v10.1.0) (2020-12-08)

### Features

- dark theme for elements ([5b03ba5](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/5b03ba5ba4bdd26a4bef4ef4bc1165deb32fd338))

## [10.0.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v9.3.0...v10.0.0) (2020-11-26)

## [9.3.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v9.2.0...v9.3.0) (2020-11-26)

### Features

- custom element ([2b43866](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/2b43866d402d469c34fddebc95a332396b153835))
- upgrade to angular 10 ([235f143](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/235f143ebbb25a633315630d3a1f828b86ecfe12))

### Bug Fixes

- highlight rotation ([a8cdfa0](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/a8cdfa03b644abfa8caabaf4b2417e61fadfe840)), closes [#298](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/298)

## [9.2.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v9.1.0...v9.2.0) (2020-07-10)

### Features

- page rotation ([3d0cc82](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/3d0cc823a97d1b551df0b28981d0393e92b76364)), closes [#290](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/290)

### Bug Fixes

- cannot read property 'focus' of null ([b268f43](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/b268f435df31fe89c1361563d9562695f0d7cd81))
- changed help label ([e480951](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/e4809519afce8c79aba1859e231dc9b05f8ec2ac))

## [9.1.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v9.0.3...v9.1.0) (2020-06-04)

### Features

- added lithuanian label translations ([649dd51](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/649dd5113d91d9a18d15c5f947ce1accb7199fab))
- hotkey dialog ([#285](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/285)) ([fcc2f72](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/fcc2f7290aa68dee9b8b9dae17ffa5f5347657dc))

### Bug Fixes

- avoid buttons overflowing on IE ([6555bcf](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/6555bcf6b076ca4629b04d299eeb2d14d6e7f55c))
- hotkeys ([620ed08](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/620ed0837747a1e4930989a8b5b4eb88f80848f4)), closes [#266](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/266)

### [9.0.3](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v9.0.2...v9.0.3) (2020-04-30)

### Bug Fixes

- **a11y:** fix a11y in contents dialog ([#284](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/284)) ([4692be3](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/4692be369d3af44363f58906f9680ca066a01be7))
- disable next/previous canvas button in footer for single page ([815b1ab](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/815b1ab34bf2d7fdf7a148a6402ce104595baa56))
- e2e is using wrong build step ([#280](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/280)) ([6980652](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/6980652b52adc9b6780efda0559729f4f102acf8))
- ie11 styling on attribution dialog ([#282](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/282)) ([6b4c42a](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/6b4c42aff7056fdd6c4ed9f2e7609330f63347fa))
- override libs build ([#279](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/279)) ([5518a5a](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/5518a5a4b22423ea324d81e2a8fbc469ffc933dd))

### [9.0.2](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v9.0.1...v9.0.2) (2020-04-22)

### [9.0.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v9.0.0...v9.0.1) (2020-04-21)

## [9.0.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v8.0.0...v9.0.0) (2020-04-21)

### ⚠ BREAKING CHANGES

- Require Angular 9

### Bug Fixes

- shortcut keys is not working when toggling fullscreen ([#275](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/275)) ([3811f44](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/3811f44))
- use fullscreenoverlaycontainer ([#273](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/273)) ([b3e2391](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/b3e2391))
- **demo:** fixed a11y issues ([#271](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/271)) ([0d7fdfc](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/0d7fdfc))
- added 'display: none' to OSD toolbar in hidden state ([ffd8a54](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/ffd8a54))
- added aria-label for pagenavigator ([#268](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/268)) ([40deb3f](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/40deb3f)), closes [#260](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/260)
- correct aria-label for dialogclose buttons ([#267](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/267)) ([cbcd65d](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/cbcd65d))

### Features

- Added a11y feature ([644c0d4](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/644c0d4))
- upgrade to angular 9 ([#276](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/276)) ([e56d387](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/e56d387))
- **a11y:** fix attribute dialog ([ce416e4](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/ce416e4))

## [8.0.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v7.3.1...v8.0.0) (2019-09-17)

### ⚠ BREAKING CHANGES

- Upgrade to angular 8

### Features

- angular 8 ([d53c673](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/d53c673))

### [7.3.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v7.3.0...v7.3.1) (2019-09-06)

## [7.3.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v7.2.0...v7.3.0) (2019-09-06)

### Features

- better scaling in dashboard view ([#254](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/254)) ([532ead8](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/532ead8))

<a name="7.2.0"></a>

# [7.2.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v7.1.0...v7.2.0) (2019-01-16)

### Bug Fixes

- align navigation button label ([01aae15](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/01aae15))

### Features

- rigth to left viewing direction ([4f6fc2e](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/4f6fc2e))
- show partial previous and next page in dashboard view ([1fccba9](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/1fccba9))

<a name="7.1.0"></a>

# [7.1.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v7.0.0...v7.1.0) (2018-12-20)

### Bug Fixes

- fullscreen in chrome 71 ([520dc63](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/520dc63)), closes [#240](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/240)
- Safari is missing DragEvent ([78f5049](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/78f5049)), closes [#238](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/238)

### Features

- enable polyfills for IE in demo app ([e4ba136](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/e4ba136))

<a name="7.0.0"></a>

# [7.0.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v6.0.5...v7.0.0) (2018-11-09)

### Features

- support for static or non-IIIF image viewing ([c85f2e6](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/c85f2e6)), closes [#223](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/223)
- upgrade to angular 7 ([4106e7c](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/4106e7c))

<a name="6.1.2"></a>

## [6.1.2](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v6.1.1...v6.1.2) (2018-06-29)

<a name="6.1.1"></a>

## [6.1.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v6.1.0...v6.1.1) (2018-06-29)

<a name="6.1.0"></a>

# [6.1.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v6.0.5...v6.1.0) (2018-06-29)

### Bug Fixes

- prettier ([453ffeb](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/453ffeb))
- wallabyjs alias ([b8c0cd8](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/b8c0cd8))

### Features

- support for static or non-IIIF image viewing ([c85f2e6](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/c85f2e6)), closes [#223](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/223)

<a name="6.0.5"></a>

## [6.0.5](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v6.0.4...v6.0.5) (2018-06-04)

### Bug Fixes

- number of pages is wrong on two page display ([#220](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/220)) ([962c74a](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/962c74a)), closes [#219](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/219)

<a name="6.0.4"></a>

## [6.0.4](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v6.0.2...v6.0.4) (2018-05-23)

<a name="6.0.3"></a>

## [6.0.3](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v6.0.2...v6.0.3) (2018-05-23)

<a name="6.0.2"></a>

## [6.0.2](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v6.0.1...v6.0.2) (2018-05-22)

<a name="6.0.1"></a>

## [6.0.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v6.0.0...v6.0.1) (2018-05-22)

<a name="6.0.0"></a>

# [6.0.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v6.0.0-rc.1...v6.0.0) (2018-05-22)

### Bug Fixes

- constraining keyhandler to viewer component ([#210](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/210)) ([b5f30dc](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/b5f30dc))
- fixing lint error ([#211](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/211)) ([ae44e97](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/ae44e97))
- Page Up and Page Down keys should change page when zoomed in ([#218](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/218)) ([690e7a7](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/690e7a7)), closes [#217](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/217)

### Features

- iiif drag and drop api ([#214](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/214)) ([7fbc5fe](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/7fbc5fe)), closes [#215](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/215)
- preserve zoom level on page change ([#212](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/212)) ([277d534](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/277d534))
- upgrade angular to v6.0.0 ([#213](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/213)) ([49a6d53](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/49a6d53))

<a name="6.0.0-rc.1"></a>

# [6.0.0-rc.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.13.0...v6.0.0-rc.1) (2018-04-18)

### Bug Fixes

- replace spread operator ([51429a3](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/51429a3))

### Features

- added prettier code formatter ([3830511](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/3830511))
- upgrade angular ([f7d9134](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/f7d9134))
- upgrade rollup to v0.56.3 ([#205](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/205)) ([1388876](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/1388876))

<a name="0.13.0"></a>

# [0.13.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.12.0...v0.13.0) (2018-02-13)

### Features

- access keys ([d20bb18](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/d20bb18)), closes [#143](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/143)

<a name="0.12.0"></a>

# [0.12.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.11.0...v0.12.0) (2017-12-19)

### Features

- have a input field for going to a page ([4d2989e](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/4d2989e)), closes [#157](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/157)
- upgraded to angular v5.1.1 ([163f749](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/163f749))

<a name="0.11.0"></a>

# [0.11.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.10.1...v0.11.0) (2017-12-08)

### Bug Fixes

- OSD toolbar takes full width in IE11 ([#198](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/198)) ([10d4729](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/10d4729)), closes [#197](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/197)

### Features

- toc is not reopened after returning to dashboard mode ([#196](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/196)) ([b985b72](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/b985b72)), closes [#195](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/195)

<a name="0.10.1"></a>

## [0.10.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.10.0...v0.10.1) (2017-12-04)

### Bug Fixes

- handling npe ([#194](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/194)) ([8bf8fda](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/8bf8fda))

<a name="0.10.0"></a>

# [0.10.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.9.0...v0.10.0) (2017-12-04)

### Bug Fixes

- close dialogs when switching to page mode ([#175](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/175)) ([967dc89](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/967dc89)), closes [#172](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/172)

### Features

- button for emptying search string ([#189](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/189)) ([a1aa742](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/a1aa742)), closes [#188](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/188)
- empty search string should empty search result ([#187](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/187)) ([1f9c585](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/1f9c585)), closes [#185](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/185)
- hide empty toc ([#193](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/193)) ([06386ca](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/06386ca)), closes [#167](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/167)
- highlighting current hit differently ([#165](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/165)) ([7ec2831](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/7ec2831)), closes [#134](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/134)
- import individual rx operators ([#183](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/183)) ([fb16eaa](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/fb16eaa)), closes [#182](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/182)
- mark and scroll to selected hit when opening Search dialog ([#179](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/179)) ([9c868c7](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/9c868c7)), closes [#166](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/166)
- mark first hit on page when navigation with previous hits ([#184](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/184)) ([1908af7](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/1908af7)), closes [#176](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/176)
- search dialog should be reopened ([#190](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/190)) ([f3165ec](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/f3165ec)), closes [#178](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/178)
- Skip second page with hits when in two page display mode ([#186](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/186)) ([2f7040f](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/2f7040f)), closes [#177](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/177)
- upgrade to angular 5 ([#181](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/181)) ([e85780e](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/e85780e))

<a name="0.9.0"></a>

# [0.9.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.8.0...v0.9.0) (2017-10-27)

### Bug Fixes

- constraining to max zoom ([#159](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/159)) ([c984534](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/c984534)), closes [#158](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/158)
- header and footer is null in ngAfterViewInit ([#164](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/164)) ([4d55e8e](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/4d55e8e)), closes [#161](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/161)
- more-stable-two-up-view-test ([3973035](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/3973035))

### Features

- keyboard should be closed on mobile after content search ([#154](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/154)) ([fd1685b](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/fd1685b)), closes [#150](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/150)

<a name="0.8.0"></a>

# [0.8.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.7.1...v0.8.0) (2017-10-20)

### Bug Fixes

- better fast swiping in page-mode ([#118](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/118)) ([d9901f0](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/d9901f0)), closes [#117](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/117)
- emitting pagenumber too many times when opening viewer ([4120a30](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/4120a30)), closes [#121](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/121)
- no pages are displayed on load ([d335b65](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/d335b65)), closes [#147](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/147)
- Viewer zoom in on swipe in landscape mode ([#127](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/127)) ([2443e37](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/2443e37)), closes [#110](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/110)

### Features

- cors support ([71f8408](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/71f8408)), closes [#130](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/130)
- emit manifest model on change ([4c66888](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/4c66888)), closes [#144](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/144)
- make it easy for developers to dynamically add components to the header and footer ([985604a](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/985604a)), closes [#132](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/132)
- show individual or organization logo associated with the resource ([bee087a](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/bee087a)), closes [#135](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/135)
- show manifest label in header ([2f0fed8](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/2f0fed8))
- table of contents ([0e46cad](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/0e46cad))
- two up view ([28451aa](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/28451aa))

<a name="0.7.1"></a>

## [0.7.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.7.0...v0.7.1) (2017-10-10)

### Bug Fixes

- cleanup viewer on destroy ([faa666d](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/faa666d))
- page mask covers entire screen ([2aa3774](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/2aa3774))
- page no longer zooms out before going to next page in zoomed in mode ([0bdee93](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/0bdee93))
- page numbers is not always updated ([a1e53e9](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/a1e53e9))
- page-mask center is calculated incorrectly during pan events ([7e67d7d](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/7e67d7d))
- possible to go outside right side when zoomed in ([882124c](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/882124c))
- previousHitLabel and nextHitLabel for intl norwegian ([df8a728](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/df8a728))
- set navbars to hidden initially ([8167de0](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/8167de0)), closes [#109](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/109) [#111](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/111)
- single long press causes error on android device ([55dec2d](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/55dec2d))

<a name="0.7.0"></a>

# [0.7.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.6.0...v0.7.0) (2017-10-06)

### Bug Fixes

- page-slider disappears after window resize ([9fca275](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/9fca275))
- panning does not stop when hitting the edge of the page if panning diagonal ([4f56fa4](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/4f56fa4))
- remove api error massages to users ([a74e753](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/a74e753))
- setting mime header and footer toolbar to angular material toolbar height ([c521d6e](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/c521d6e))
- viewport doesn't pan on first/last page ([db027e7](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/db027e7))

### Features

- better pinch-zooming ([f3a3c76](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/f3a3c76))
- improved scrolling ([880cfc4](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/880cfc4))
- reset zoom level on browser resize and page change ([a4f9736](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/a4f9736))

<a name="0.6.0"></a>

# [0.6.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.5.0...v0.6.0) (2017-10-05)

### Bug Fixes

- added missing contents and search content labels ([9fae622](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/9fae622))
- better panning in zoomed-in-mode + remove speed-criteria from zoomed-mode when calculating next page ([8473a82](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/8473a82))
- dispose attribution observable ([6d44611](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/6d44611))
- material dialog bug ([fdca465](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/fdca465))
- open viewer on canvas index if present ([11b1afe](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/11b1afe))

### Features

- improve zooming ([bf1280f](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/bf1280f))

<a name="0.5.0"></a>

# [0.5.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.4.0...v0.5.0) (2017-10-03)

### Bug Fixes

- pan to center of previous page before zooming out when going to a new page in zoomed-in-mode ([9cc967f](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/9cc967f))
- recreate and update yarn lockfile to fix previous merge problem ([aef1b92](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/aef1b92))

### Features

- emit page mode change ([7d2277d](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/7d2277d))
- emit page number change ([bc201f8](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/bc201f8))
- hide all pages except for the current page in page view ([7f81cd3](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/7f81cd3))
- internationalization provider for norwegian bokmål ([2829836](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/2829836))
- navigate through search hits ([1c3b731](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/1c3b731))
- show error message if manifest fails to load ([08cab63](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/08cab63))

<a name="0.4.0"></a>

# [0.4.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.3.0...v0.4.0) (2017-09-29)

### Features

- Browsing through a publication in page view ([#70](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/70)) ([5e6d23c](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/5e6d23c))
- it should be possible to set the startup canvas ([#69](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/69)) ([dad6f5a](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/dad6f5a))

<a name="0.3.0"></a>

# [0.3.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.2.0...v0.3.0) (2017-09-28)

### Bug Fixes

- cleanup manifest service on destroy ([f269091](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/f269091))
- multiple annotations on single hit ([379263e](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/379263e))
- previous/next page button in page navigator don't work ([dc1d68c](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/dc1d68c))
- Toggling fullscreen mode makes browser hangs ([a2d40bf](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/a2d40bf))

### Features

- browse through a publication in dashboard view ([97a1ffd](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/97a1ffd))
- content search ([#62](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/62)) ([97ded80](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/97ded80))
- hide page navigation in dashboard mode ([c77cba7](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/c77cba7))
- keyboard navigation in content search ([b9210ad](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/b9210ad))
- keyboard navigation in contents ([66f7a0f](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/66f7a0f))
- landscape manifest in demo app ([b7b4d64](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/b7b4d64))
- loading different manifest in integration app ([#61](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/61)) ([1acfcb4](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/1acfcb4))
- slider navigation in dashboard view ([59ec6ce](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/59ec6ce))
- Switching between page and dashboard view ([fa429f6](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/fa429f6))
- upgrade material to beta 11 ([bff44ca](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/bff44ca))

<a name="0.2.0"></a>

# [0.2.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.6...v0.2.0) (2017-09-07)

### Bug Fixes

- displaying metadata on small devices in landscape mode ([#44](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/44)) ([3a0595c](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/3a0595c))

### Features

- rights notices ([#45](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/45)) ([ab750b9](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/ab750b9))
- viewing publications in full screen mode ([fb85e0b](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/fb85e0b))
- zoom ([04e2290](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/04e2290))

<a name="0.1.6"></a>

## [0.1.6](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.5...v0.1.6) (2017-08-14)

### Bug Fixes

- withCredentials for nb.no ([cfe1cdf](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/cfe1cdf))

<a name="0.1.5"></a>

## [0.1.5](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.4...v0.1.5) (2017-08-08)

### Bug Fixes

- using icons from openseadragon site ([41c7ea5](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/41c7ea5))

<a name="0.1.4"></a>

## [0.1.4](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.3...v0.1.4) (2017-08-08)

<a name="0.1.3"></a>

## [0.1.3](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.3-alpha.3...v0.1.3) (2017-08-08)

### Bug Fixes

- added cdk to deps ([#28](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/28)) ([af84358](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/af84358))
- closing sidenavn when mode is over ([a089bee](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/a089bee))
- http module must be imported in app ([#30](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/30)) ([1670e74](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/1670e74))
- relative manifest paths ([2b27031](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/2b27031))
- update viewer on manifesturi changes ([43384bb](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/43384bb))

### ci

- npm script for coverage ([#31](https://github.com/NationalLibraryOfNorway/ngx-mime/issues/31)) ([de4be18](https://github.com/NationalLibraryOfNorway/ngx-mime/commit/de4be18))

### BREAKING CHANGES

- Changed "url" paramater to "manifestUri"
  fix: Didn't need CUSTOM_ELEMENTS_SCHEMA. Problem was ngx-mime in node_modules that didn't update correctly

- fix: Wrong path to mime-viewer

- ci: npm script for coverage

Coverage shouldn't be the default with running npm test since it increases the time it takes to run unit tests.

- ci: coverage instead of test:once

No need to test it twice

- ci: test

- ci: test outside sauce labs

- ci: test
- Changed "url" paramater to "manifestUri"
  fix: Didn't need CUSTOM_ELEMENTS_SCHEMA. Problem was ngx-mime in node_modules that didn't update correctly

- fix: Wrong path to mime-viewer

- fix: remove http module import

* HttpModule must be imported in app
* Import openseadragon in module.ts
* Styles

- fix: import openseadragon

Import openseadragon

<a name="0.1.3-alpha.3"></a>

## [0.1.3-alpha.3](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.3-alpha.2...v0.1.3-alpha.3) (2017-06-29)

<a name="0.1.3-alpha.2"></a>

## [0.1.3-alpha.2](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.3-alpha.1...v0.1.3-alpha.2) (2017-06-23)

<a name="0.1.3-alpha.1"></a>

## [0.1.3-alpha.1](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.3-alpha.0...v0.1.3-alpha.1) (2017-06-23)

<a name="0.1.3-alpha.0"></a>

## [0.1.3-alpha.0](https://github.com/NationalLibraryOfNorway/ngx-mime/compare/v0.1.2...v0.1.3-alpha.0) (2017-06-23)
