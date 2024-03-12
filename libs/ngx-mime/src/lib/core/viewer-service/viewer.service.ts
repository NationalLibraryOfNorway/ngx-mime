import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as d3 from 'd3';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  interval,
} from 'rxjs';
import { distinctUntilChanged, sample } from 'rxjs/operators';
import { ModeService } from '../../core/mode-service/mode.service';
import { AltoService } from '../alto-service/alto.service';
import { CalculateCanvasGroupPositionFactory } from '../canvas-group-position/calculate-canvas-group-position-factory';
import { CanvasService } from '../canvas-service/canvas-service';
import { ClickService } from '../click-service/click.service';
import { createSvgOverlay } from '../ext/svg-overlay';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';
import { ManifestUtils } from '../iiif-manifest-service/iiif-manifest-utils';
import { MimeViewerIntl } from '../intl';
import { MimeViewerConfig } from '../mime-viewer-config';
import {
  ModeChanges,
  RecognizedTextMode,
  RecognizedTextModeChanges,
} from '../models';
import { Direction } from '../models/direction';
import { Manifest, Resource } from '../models/manifest';
import { PinchStatus } from '../models/pinchStatus';
import { Side } from '../models/side';
import { ViewerLayout } from '../models/viewer-layout';
import { ViewerMode } from '../models/viewer-mode';
import { ViewerOptions } from '../models/viewer-options';
import { StyleService } from '../style-service/style.service';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { Hit } from './../models/hit';
import { Point } from './../models/point';
import { Rect } from './../models/rect';
import { SearchResult } from './../models/search-result';
import { CalculateNextCanvasGroupFactory } from './calculate-next-canvas-group-factory';
import { CanvasGroupMask } from './canvas-group-mask';
import {
  DefaultGoToCanvasGroupStrategy,
  GoToCanvasGroupStrategy,
} from './go-to-canvas-group-strategy';
import { OptionsFactory } from './options.factory';
import { SwipeDragEndCounter } from './swipe-drag-end-counter';
import { SwipeUtils } from './swipe-utils';
import { TileSourceStrategyFactory } from './tile-source-strategy-factory';
import { DefaultZoomStrategy, ZoomStrategy } from './zoom-strategy';

declare const OpenSeadragon: any;

@Injectable()
export class ViewerService {
  config!: MimeViewerConfig;
  private viewer?: any;
  private svgOverlay: any;
  private svgNode: any;

  private overlays: Array<SVGRectElement> = [];
  private tileSources: Array<Resource> = [];
  private subscriptions!: Subscription;

  public isCanvasPressed: Subject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private currentCenter: Subject<Point> = new Subject();
  private currentCanvasIndex: BehaviorSubject<number> = new BehaviorSubject(0);
  private currentHit: Hit | null = null;
  private osdIsReady = new BehaviorSubject<boolean>(false);
  private swipeDragEndCounter = new SwipeDragEndCounter();
  private canvasGroupMask!: CanvasGroupMask;
  private pinchStatus = new PinchStatus();
  private dragStartPosition: any;
  private manifest!: Manifest;
  private isManifestPaged = false;
  private defaultKeyDownHandler: any;

  public currentSearch: SearchResult | null = null;
  private zoomStrategy!: ZoomStrategy;
  private goToCanvasGroupStrategy!: GoToCanvasGroupStrategy;

  private rotation: BehaviorSubject<number> = new BehaviorSubject(0);
  private dragStatus = false;
  public id = 'ngx-mime-mimeViewer';
  public openseadragonId = 'openseadragon';

  constructor(
    private zone: NgZone,
    private clickService: ClickService,
    private canvasService: CanvasService,
    private modeService: ModeService,
    private viewerLayoutService: ViewerLayoutService,
    private iiifContentSearchService: IiifContentSearchService,
    private styleService: StyleService,
    private altoService: AltoService,
    private snackBar: MatSnackBar,
    private intl: MimeViewerIntl
  ) {
    this.id = this.generateRandomId('ngx-mime-mimeViewer');
    this.openseadragonId = this.generateRandomId('openseadragon');
  }

  get onRotationChange(): Observable<number> {
    return this.rotation.asObservable().pipe(distinctUntilChanged());
  }

  get onCenterChange(): Observable<Point> {
    return this.currentCenter.asObservable();
  }

  get onCanvasGroupIndexChange(): Observable<number> {
    return this.currentCanvasIndex.asObservable().pipe(distinctUntilChanged());
  }

  get onOsdReadyChange(): Observable<boolean> {
    return this.osdIsReady.asObservable().pipe(distinctUntilChanged());
  }

  initialize() {
    this.unsubscribe();
    this.subscriptions = new Subscription();
  }

  setConfig(config: MimeViewerConfig) {
    this.config = config;
  }

  public getViewer(): any {
    return this.viewer;
  }

  public getTilesources(): Resource[] {
    return this.tileSources;
  }

  public getOverlays(): SVGRectElement[] {
    return this.overlays;
  }

  public getZoom(): number {
    return this.zoomStrategy.getZoom();
  }

  public getMinZoom(): number {
    return this.zoomStrategy.getMinZoom();
  }

  public getMaxZoom(): number {
    return this.zoomStrategy.getMaxZoom();
  }

  public home(): void {
    if (!this.osdIsReady.getValue()) {
      return;
    }
    this.zoomStrategy.setMinZoom(this.modeService.mode);

    this.goToCanvasGroupStrategy.centerCurrentCanvas();

    this.zoomStrategy.goToHomeZoom();
  }

  public goToPreviousCanvasGroup(): void {
    this.goToCanvasGroupStrategy.goToPreviousCanvasGroup(
      this.currentCanvasIndex.getValue()
    );
  }

  public goToNextCanvasGroup(): void {
    this.goToCanvasGroupStrategy.goToNextCanvasGroup(
      this.currentCanvasIndex.getValue()
    );
  }

  public goToCanvasGroup(canvasGroupIndex: number, immediately: boolean): void {
    this.goToCanvasGroupStrategy.goToCanvasGroup({
      canvasGroupIndex: canvasGroupIndex,
      immediately: immediately,
    });
  }

  public goToCanvas(canvasIndex: number, immediately: boolean): void {
    const canvasGroupIndex =
      this.canvasService.findCanvasGroupByCanvasIndex(canvasIndex);
    this.goToCanvasGroupStrategy.goToCanvasGroup({
      canvasGroupIndex: canvasGroupIndex,
      immediately: immediately,
    });
  }

  public highlight(searchResult: SearchResult): void {
    this.clearHightlight();
    if (this.viewer) {
      if (searchResult.q) {
        this.currentSearch = searchResult;
      }

      const rotation = this.rotation.getValue();

      for (const hit of searchResult.hits) {
        for (const highlightRect of hit.highlightRects) {
          const canvasRect = this.canvasService.getCanvasRect(highlightRect.canvasIndex);
          if (canvasRect) {
            const currentHitStrokeOffset = 8;
            let width = highlightRect.width + currentHitStrokeOffset;
            let height = highlightRect.height + currentHitStrokeOffset;
            let x = canvasRect.x - currentHitStrokeOffset / 2;
            let y = canvasRect.y - currentHitStrokeOffset / 2;

            /* hit rect are relative to each unrotated page canvasRect so x,y must be adjusted by the remaining space */
            switch (rotation) {
              case 0:
                x += highlightRect.x;
                y += highlightRect.y;
                break;

              case 90:
                x += canvasRect.width - highlightRect.y - highlightRect.height;
                y += highlightRect.x;
                /* Flip height & width */
                width = highlightRect.height + currentHitStrokeOffset;
                height = highlightRect.width + currentHitStrokeOffset;
                break;

              case 180:
                x += canvasRect.width - (highlightRect.x + highlightRect.width);
                y += canvasRect.height - (highlightRect.y + highlightRect.height);
                break;

              case 270:
                x += highlightRect.y;
                y += canvasRect.height - highlightRect.x - highlightRect.width;
                /* Flip height & width */
                width = highlightRect.height + currentHitStrokeOffset;
                height = highlightRect.width + currentHitStrokeOffset;
                break;
            }

            const currentOverlay: SVGRectElement = this.svgNode
              .append('rect')
              .attr('mimeHitIndex', hit.id)
              .attr('x', x)
              .attr('y', y)
              .attr('width', width)
              .attr('height', height)
              .attr('class', 'hit');
          }
        }
      }
    }
  }

  private highlightCurrentHit() {
    if (this.currentHit) {
      this.svgNode.selectAll(`g > rect.selected`).attr('class', 'hit');
      this.svgNode
        .selectAll(`g > rect[mimeHitIndex='${this.currentHit.id}']`)
        .attr('class', 'hit selected');
    }
  }

  public clearHightlight(): void {
    if (this.svgNode) {
      this.svgNode.selectAll('.hit').remove();
      this.currentSearch = null;
    }
  }

  setUpViewer(manifest: Manifest, config: MimeViewerConfig) {
    this.config = config;

    if (manifest && manifest.tileSource) {
      this.tileSources = manifest.tileSource;
      this.zone.runOutsideAngular(() => {
        this.manifest = manifest;
        this.isManifestPaged = ManifestUtils.isManifestPaged(this.manifest);
        this.viewer = new OpenSeadragon.Viewer(
          OptionsFactory.create(this.openseadragonId, this.config)
        );
        createSvgOverlay();
        this.zoomStrategy = new DefaultZoomStrategy(
          this.viewer,
          this.canvasService,
          this.modeService,
          this.viewerLayoutService
        );
        this.goToCanvasGroupStrategy = new DefaultGoToCanvasGroupStrategy(
          this.viewer,
          this.zoomStrategy,
          this.canvasService,
          this.modeService,
          this.config,
          this.manifest.viewingDirection
        );

        /*
          This disables keyboard navigation in openseadragon.
          We use s for opening search dialog and OSD use the same key for panning.
          Issue: https://github.com/openseadragon/openseadragon/issues/794
         */
        this.defaultKeyDownHandler = this.viewer.innerTracker.keyDownHandler;
        this.disableKeyDownHandler();
        this.viewer.innerTracker.keyHandler = null;
        this.canvasService.reset();
        this.canvasGroupMask = new CanvasGroupMask(
          this.viewer,
          this.styleService
        );
      });

      this.addToWindow();
      this.setupOverlays();
      this.createOverlays();
      this.addEvents();
      this.addSubscriptions();
    }
  }

  addSubscriptions(): void {
    this.initialize();
    this.subscriptions.add(
      this.modeService.onChange.subscribe((mode: ModeChanges) => {
        this.modeChanged(mode);
      })
    );

    this.zone.runOutsideAngular(() => {
      this.subscriptions.add(
        this.onCenterChange
          .pipe(sample(interval(500)))
          .subscribe((center: Point) => {
            this.calculateCurrentCanvasGroup(center);
            if (center && center !== null) {
              this.osdIsReady.next(true);
            }
          })
      );
    });

    this.subscriptions.add(
      this.canvasService.onCanvasGroupIndexChange.subscribe(
        (canvasGroupIndex: number) => {
          this.swipeDragEndCounter.reset();
          if (canvasGroupIndex !== -1) {
            this.canvasGroupMask.changeCanvasGroup(
              this.canvasService.getCanvasGroupRect(canvasGroupIndex)
            );
            if (
              this.modeService.mode === ViewerMode.PAGE ||
              this.modeService.mode === ViewerMode.DASHBOARD
            ) {
              this.zoomStrategy.goToHomeZoom();
            }
          }
        }
      )
    );

    this.subscriptions.add(
      this.onOsdReadyChange.subscribe((state: boolean) => {
        if (state) {
          this.initialCanvasGroupLoaded();
          this.currentCenter.next(this.viewer?.viewport.getCenter(true));
        }
      })
    );

    this.subscriptions.add(
      this.viewerLayoutService.onChange.subscribe((state: ViewerLayout) => {
        this.layoutPages();
      })
    );

    this.subscriptions.add(
      this.iiifContentSearchService.onSelected.subscribe((hit: Hit | null) => {
        if (hit) {
          this.currentHit = hit;
          this.highlightCurrentHit();
          this.goToCanvas(hit.index, false);
        }
      })
    );

    this.subscriptions.add(
      this.onRotationChange.subscribe((rotation: number) => {
        this.layoutPages();
      })
    );

    this.subscriptions.add(
      this.altoService.onRecognizedTextContentModeChange$.subscribe(
        (recognizedTextModeChanges: RecognizedTextModeChanges) => {
          if (
            recognizedTextModeChanges.currentValue === RecognizedTextMode.ONLY
          ) {
            this.hidePages();
          }

          if (
            recognizedTextModeChanges.previousValue === RecognizedTextMode.ONLY
          ) {
            this.showPages();
          }

          if (
            recognizedTextModeChanges.previousValue ===
              RecognizedTextMode.ONLY &&
            recognizedTextModeChanges.currentValue === RecognizedTextMode.SPLIT
          ) {
            setTimeout(() => {
              this.home();
            }, ViewerOptions.transitions.OSDAnimationTime);
          }
        }
      )
    );
  }

  hidePages() {
    this.setOpacityOnPages(0);
  }

  showPages() {
    this.setOpacityOnPages(1);
  }

  layoutPages() {
    if (this.osdIsReady.getValue()) {
      const currentCanvasIndex = this.canvasService.currentCanvasIndex;
      this.destroy(true);
      this.setUpViewer(this.manifest, this.config);
      this.goToCanvasGroupStrategy.goToCanvasGroup({
        canvasGroupIndex:
          this.canvasService.findCanvasGroupByCanvasIndex(currentCanvasIndex),
        immediately: false,
      });

      // Recreate highlights if there is an active search going on
      if (this.currentSearch) {
        this.highlight(this.currentSearch);
      }
    }
  }

  addToWindow() {
    (<any>window).openSeadragonViewer = this.viewer;
  }

  setupOverlays(): void {
    this.svgOverlay = this.viewer.svgOverlay();
    this.svgNode = d3.select(this.svgOverlay.node());
  }

  disableKeyDownHandler() {
    this.viewer.innerTracker.keyDownHandler = null;
  }

  resetKeyDownHandler() {
    this.viewer.innerTracker.keyDownHandler = this.defaultKeyDownHandler;
  }

  /**
   *
   * @param layoutSwitch true if switching between layouts
   * to keep current search-state and rotation
   */
  destroy(layoutSwitch?: boolean) {
    this.osdIsReady.next(false);
    this.currentCenter.next({ x: 0, y: 0 });
    if (this.viewer != null && this.viewer.isOpen()) {
      if (this.viewer.container != null) {
        d3.select(this.viewer.container.parentNode).style('opacity', '0');
      }
      this.viewer.destroy();
      this.viewer = null;
    }
    this.overlays = [];
    this.canvasService.reset();
    if (this.canvasGroupMask) {
      this.canvasGroupMask.destroy();
    }
    // Keep search-state and rotation only if layout-switch
    if (!layoutSwitch) {
      this.altoService.destroy();
      this.currentSearch = null;
      this.iiifContentSearchService.destroy();
      this.rotation.next(0);
      this.modeService.destroy();
      this.unsubscribe();
    }
  }

  addEvents(): void {
    this.clickService.reset();
    this.clickService.addSingleClickHandler(this.singleClickHandler);
    this.clickService.addDoubleClickHandler(this.dblClickHandler);
    this.viewer.addHandler('animation-finish', () => {
      this.currentCenter.next(this.viewer?.viewport.getCenter(true));
    });
    this.viewer.addHandler('canvas-click', this.clickService.click);
    this.viewer.addHandler(
      'canvas-double-click',
      (e: any) => (e.preventDefaultAction = true)
    );
    this.viewer.addHandler('canvas-press', (e: any) => {
      this.pinchStatus.active = false;
      this.dragStartPosition = e.position;
      this.isCanvasPressed.next(true);
    });
    this.viewer.addHandler('canvas-release', () =>
      this.isCanvasPressed.next(false)
    );
    this.viewer.addHandler('canvas-scroll', this.scrollHandler);
    this.viewer.addHandler('canvas-pinch', this.pinchHandler);

    this.viewer.addHandler('canvas-drag', (e: any) => {
      this.dragStatus = true;
      this.dragHandler(e);
    });
    this.viewer.addHandler('canvas-drag-end', (e: any) => {
      if (this.dragStatus) {
        this.constraintCanvas();
        this.swipeToCanvasGroup(e);
      }
      this.dragStatus = false;
    });
    this.viewer.addHandler('animation', (e: any) => {
      this.currentCenter.next(this.viewer?.viewport.getCenter(true));
    });
  }

  zoomIn(zoomFactor?: number, position?: Point): void {
    this.zoomStrategy.zoomIn(zoomFactor, position);
  }

  zoomOut(zoomFactor?: number, position?: Point): void {
    this.zoomStrategy.zoomOut(zoomFactor, position);
  }

  rotate(): void {
    if (this.osdIsReady.getValue()) {
      if (this.viewer.useCanvas) {
        this.rotateToRight();
        this.highlightCurrentHit();
      } else {
        this.showRotationIsNotSupportetMessage();
      }
    }
  }

  /**
   * Callback for mode-change
   * @param mode ViewerMode
   */
  modeChanged(mode: ModeChanges): void {
    if (!this.viewer) {
      return;
    }

    if (mode.currentValue === ViewerMode.DASHBOARD) {
      this.viewer.panVertical = false;
      this.toggleToDashboard();
      this.disableKeyDownHandler();
    } else if (mode.currentValue === ViewerMode.PAGE) {
      this.viewer.panVertical = false;
      this.toggleToPage();
      this.disableKeyDownHandler();
    } else if (mode.currentValue === ViewerMode.PAGE_ZOOMED) {
      this.viewer.panVertical = true;
      this.resetKeyDownHandler();
    }
  }

  private generateRandomId(prefix: string): string {
    const randomString = Math.random().toString(16).slice(2);
    return `${prefix}-${randomString}`;
  }

  /**
   * Switches to DASHBOARD-mode, repositions canvas group and removes max-width on viewer
   */
  private toggleToDashboard(): void {
    if (!this.canvasService.isCurrentCanvasGroupValid()) {
      return;
    }
    this.goToCanvasGroupStrategy.goToCanvasGroup({
      canvasGroupIndex: this.canvasService.currentCanvasGroupIndex,
      immediately: false,
    });

    this.canvasGroupMask.hide();

    this.zoomStrategy.setMinZoom(ViewerMode.DASHBOARD);
    this.zoomStrategy.goToHomeZoom();
  }

  /**
   * Switches to PAGE-mode, centers current canvas group and repositions other canvas groups
   */
  private toggleToPage(): void {
    if (!this.canvasService.isCurrentCanvasGroupValid()) {
      return;
    }
    this.goToCanvasGroupStrategy.goToCanvasGroup({
      canvasGroupIndex: this.canvasService.currentCanvasGroupIndex,
      immediately: false,
    });

    this.canvasGroupMask.show();

    this.zoomStrategy.setMinZoom(ViewerMode.PAGE);
    this.zoomStrategy.goToHomeZoom();
  }

  /**
   * Scroll-handler
   */
  scrollHandler = (event: any) => {
    const zoomFactor = Math.pow(ViewerOptions.zoom.zoomFactor, event.scroll);
    // Scrolling up
    if (event.scroll > 0) {
      this.zoomInGesture(event.position, zoomFactor);
      // Scrolling down
    } else if (event.scroll < 0) {
      this.zoomOutGesture(event.position, zoomFactor);
    }
  };

  /**
   * Pinch-handler
   */
  pinchHandler = (event: any) => {
    this.pinchStatus.active = true;
    const zoomFactor = event.distance / event.lastDistance;
    // Pinch Out
    if (
      event.distance >
      event.lastDistance + ViewerOptions.zoom.pinchZoomThreshold
    ) {
      this.zoomInPinchGesture(event, zoomFactor);
      // Pinch In
    } else if (
      event.distance + ViewerOptions.zoom.pinchZoomThreshold <
      event.lastDistance
    ) {
      this.zoomOutPinchGesture(event, zoomFactor);
    }
  };

  /**
   *
   * @param point to zoom to. If not set, the viewer will zoom to center
   */
  zoomInGesture(position: Point, zoomFactor?: number): void {
    if (this.modeService.mode === ViewerMode.DASHBOARD) {
      this.modeService.mode = ViewerMode.PAGE;
    } else {
      if (position) {
        this.zoomStrategy.zoomIn(zoomFactor, position);
      } else {
        this.zoomStrategy.zoomIn();
      }
    }
  }

  zoomOutGesture(position: Point, zoomFactor?: number): void {
    if (this.modeService.isPageZoomed()) {
      this.zoomStrategy.zoomOut(zoomFactor, position);
    } else if (this.modeService.mode === ViewerMode.PAGE) {
      this.modeService.mode = ViewerMode.DASHBOARD;
    }
  }

  /**
   * Process zoom in pinch gesture (pinch out)
   *
   * Toggle to page mode and Zoom in
   *
   * @param event from pinch gesture
   */
  zoomInPinchGesture(event: any, zoomFactor: number): void {
    if (this.modeService.mode === ViewerMode.DASHBOARD) {
      this.modeService.mode = ViewerMode.PAGE;
    } else {
      this.zoomIn(zoomFactor, this.dragStartPosition || event.center);
    }
  }

  /**
   * Process zoom out pinch gesture (pinch in)
   *
   * Zoom out and toggle to dashboard when all zoomed out.
   * Stop between zooming out and toggling to dashboard.
   *
   * @param event from pinch gesture
   */
  zoomOutPinchGesture(event: any, zoomFactor: number): void {
    const gestureId = event.gesturePoints[0].id;
    if (this.modeService.isPageZoomed()) {
      this.pinchStatus.shouldStop = true;
      this.zoomStrategy.zoomOut(zoomFactor, event.center);
    } else if (this.modeService.mode === ViewerMode.PAGE) {
      if (
        !this.pinchStatus.shouldStop ||
        gestureId === this.pinchStatus.previousGestureId + 2
      ) {
        this.pinchStatus.shouldStop = false;
        this.modeService.toggleMode();
      }
      this.pinchStatus.previousGestureId = gestureId;
    }
  }

  goToHomeZoom(): void {
    this.zoomStrategy.goToHomeZoom();
  }

  /**
   * Single-click-handler
   * Single-click toggles between page/dashboard-mode if a page is hit
   */
  singleClickHandler = (event: any) => {
    const tileIndex = this.getOverlayIndexFromClickEvent(event);
    const requestedCanvasGroupIndex =
      this.canvasService.findCanvasGroupByCanvasIndex(tileIndex);
    if (requestedCanvasGroupIndex !== -1) {
      this.canvasService.currentCanvasGroupIndex = requestedCanvasGroupIndex;
    } else {
      this.calculateCurrentCanvasGroup(this.viewer?.viewport.getCenter(true));
    }
    this.modeService.toggleMode();
  };

  /**
   * Double-click-handler
   * Double-click dashboard-mode should go to page-mode
   * Double-click page-mode should
   *    a) Zoom in if page is fitted vertically, or
   *    b) Fit vertically if page is already zoomed in
   */
  dblClickHandler = (event: any) => {
    // Page is fitted vertically, so dbl-click zooms in
    if (this.modeService.mode === ViewerMode.PAGE) {
      this.modeService.mode = ViewerMode.PAGE_ZOOMED;
      this.zoomStrategy.zoomIn(
        ViewerOptions.zoom.dblClickZoomFactor,
        event.position
      );
    } else {
      this.modeService.mode = ViewerMode.PAGE;
      const canvasIndex: number = this.getOverlayIndexFromClickEvent(event);
      const requestedCanvasGroupIndex =
        this.canvasService.findCanvasGroupByCanvasIndex(canvasIndex);
      if (requestedCanvasGroupIndex >= 0) {
        this.canvasService.currentCanvasGroupIndex = requestedCanvasGroupIndex;
      } else {
        this.calculateCurrentCanvasGroup(this.viewer?.viewport.getCenter(true));
      }
    }
  };

  /**
   * Checks if hit element is a <rect>-element
   * @param target
   */
  isCanvasGroupHit(target: HTMLElement): boolean {
    return target instanceof SVGRectElement;
  }

  /**
   * Iterates tilesources and adds them to viewer
   * Creates svg clickable overlays for each tile
   */
  createOverlays(): void {
    this.overlays = [];
    const canvasRects: Rect[] = [];
    const calculateCanvasGroupPositionStrategy =
      CalculateCanvasGroupPositionFactory.create(
        this.viewerLayoutService.layout,
        this.isManifestPaged,
        this.config
      );

    const isTwoPageView: boolean =
      this.viewerLayoutService.layout === ViewerLayout.TWO_PAGE;
    const rotation = this.rotation.getValue();
    let group: any = this.svgNode.append('g').attr('class', 'page-group');

    this.tileSources.forEach((tile, i) => {
      const position =
        calculateCanvasGroupPositionStrategy.calculateCanvasGroupPosition(
          {
            canvasGroupIndex: i,
            canvasSource: tile,
            previousCanvasGroupPosition: canvasRects[i - 1],
            viewingDirection: this.manifest.viewingDirection,
          },
          rotation
        );

      canvasRects.push(position);

      const tileSourceStrategy = TileSourceStrategyFactory.create(tile);
      const tileSource = tileSourceStrategy.getTileSource(tile);

      this.zone.runOutsideAngular(() => {
        const rotated = rotation === 90 || rotation === 270;

        let bounds;

        /* Because image scaling is performed before rotation,
         * we must invert width & height and translate position so that tile rotation ends up correct
         */
        if (rotated) {
          bounds = new OpenSeadragon.Rect(
            position.x + (position.width - position.height) / 2,
            position.y - (position.width - position.height) / 2,
            position.height,
            position.width
          );
        } else {
          bounds = new OpenSeadragon.Rect(
            position.x,
            position.y,
            position.width,
            position.height
          );
        }

        this.viewer.addTiledImage({
          index: i,
          tileSource: tileSource,
          fitBounds: bounds,
          degrees: rotation,
        });
      });

      if (isTwoPageView && i % 2 !== 0) {
        group = this.svgNode.append('g').attr('class', 'page-group');
      }

      const currentOverlay = group
        .append('rect')
        .attr('x', position.x)
        .attr('y', position.y)
        .attr('width', position.width)
        .attr('height', position.height)
        .attr('class', 'tile');

      // Make custom borders if current layout is two-paged
      if (isTwoPageView) {
        if (i % 2 === 0 && i !== 0) {
          const noLeftStrokeStyle =
            Number(position.width * 2 + position.height) +
            ', ' +
            position.width * 2;
          currentOverlay.style('stroke-dasharray', noLeftStrokeStyle);
        } else if (i % 2 !== 0 && i !== 0) {
          const noRightStrokeStyle =
            position.width +
            ', ' +
            position.height +
            ', ' +
            Number(position.width * 2 + position.height);
          currentOverlay.style('stroke-dasharray', noRightStrokeStyle);
        }
      }

      const currentOverlayNode: SVGRectElement = currentOverlay.node();
      this.overlays[i] = currentOverlayNode;
    });

    const layout =
      this.viewerLayoutService.layout === ViewerLayout.ONE_PAGE ||
      !this.isManifestPaged
        ? ViewerLayout.ONE_PAGE
        : ViewerLayout.TWO_PAGE;
    this.canvasService.addAll(canvasRects, layout);
  }

  /**
   * Sets viewer size and opacity once the first canvas group has fully loaded
   */
  private initialCanvasGroupLoaded(): void {
    this.home();
    this.canvasGroupMask.initialize(
      this.canvasService.getCurrentCanvasGroupRect(),
      this.modeService.mode !== ViewerMode.DASHBOARD
    );
    if (this.viewer) {
      d3.select(this.viewer.container.parentNode)
        .transition()
        .duration(ViewerOptions.transitions.OSDAnimationTime)
        .style('opacity', '1');
    }
  }

  /**
   * Returns overlay-index for click-event if hit
   * @param target hit <rect>
   */
  getOverlayIndexFromClickEvent(event: any) {
    const target = this.getOriginalTarget(event);
    if (this.isCanvasGroupHit(target)) {
      const requestedCanvasGroup: number = this.overlays.indexOf(target);
      if (requestedCanvasGroup >= 0) {
        return requestedCanvasGroup;
      }
    }
    return -1;
  }

  private calculateCurrentCanvasGroup(center: Point) {
    if (center) {
      const currentCanvasGroupIndex =
        this.canvasService.findClosestCanvasGroupIndex(center);
      this.currentCanvasIndex.next(currentCanvasGroupIndex);
    }
  }

  private dragHandler = (e: any) => {
    this.viewer.panHorizontal = true;
    if (this.modeService.isPageZoomed()) {
      const canvasGroupRect: Rect =
        this.canvasService.getCurrentCanvasGroupRect();
      const vpBounds: Rect = this.getViewportBounds();
      const pannedPastCanvasGroup =
        SwipeUtils.getSideIfPanningPastEndOfCanvasGroup(
          canvasGroupRect,
          vpBounds
        );
      const direction: number = e.direction;
      if (
        (pannedPastCanvasGroup === Side.LEFT &&
          SwipeUtils.isDirectionInRightSemicircle(direction)) ||
        (pannedPastCanvasGroup === Side.RIGHT &&
          SwipeUtils.isDirectionInLeftSemicircle(direction))
      ) {
        this.viewer.panHorizontal = false;
      }
    }
  };

  private constraintCanvas() {
    if (this.modeService.isPageZoomed()) {
      const viewportBounds: Rect = this.getViewportBounds();
      const currentCanvasBounds = this.getCurrentCanvasBounds();
      this.isCanvasOutsideViewport(viewportBounds, currentCanvasBounds)
        ? this.constraintCanvasOutsideViewport(
            viewportBounds,
            currentCanvasBounds
          )
        : this.constraintCanvasInsideViewport(viewportBounds);
    }
  }

  private getCurrentCanvasBounds(): Rect {
    return this.viewer.world
      .getItemAt(this.canvasService.currentCanvasGroupIndex)
      .getBounds();
  }

  private isCanvasOutsideViewport(
    viewportBounds: Rect,
    canvasBounds: Rect
  ): boolean {
    return viewportBounds.height < canvasBounds.height;
  }

  private constraintCanvasOutsideViewport(
    viewportBounds: Rect,
    canvasBounds: Rect
  ): void {
    let rect: Rect | undefined = undefined;
    if (this.isCanvasBelowViewportTop(viewportBounds, canvasBounds)) {
      rect = new Rect({
        x: viewportBounds.x + viewportBounds.width / 2,
        y: canvasBounds.y + viewportBounds.height / 2,
      });
    } else if (this.isCanvasAboveViewportBottom(viewportBounds, canvasBounds)) {
      rect = new Rect({
        x: viewportBounds.x + viewportBounds.width / 2,
        y: canvasBounds.y + canvasBounds.height - viewportBounds.height / 2,
      });
    }
    this.panTo(rect, true);
  }

  private constraintCanvasInsideViewport(viewportBounds: Rect): void {
    const canvasGroupRect = this.canvasService.getCanvasGroupRect(
      this.canvasService.currentCanvasGroupIndex
    );
    const rect = new Rect({
      x: viewportBounds.x + viewportBounds.width / 2,
      y: canvasGroupRect.centerY,
    });
    this.panTo(rect, true);
  }

  private isCanvasBelowViewportTop(
    viewportBounds: Rect,
    canvasBounds: Rect
  ): boolean {
    return viewportBounds.y < canvasBounds.y;
  }

  private isCanvasAboveViewportBottom(
    viewportBounds: Rect,
    canvasBounds: Rect
  ): boolean {
    return (
      canvasBounds.y + canvasBounds.height <
      viewportBounds.y + viewportBounds.height
    );
  }

  private swipeToCanvasGroup(e: any) {
    // Don't swipe on pinch actions
    if (this.pinchStatus.active) {
      return;
    }

    const speed: number = e.speed;
    const dragEndPosision = e.position;

    const canvasGroupRect: Rect =
      this.canvasService.getCurrentCanvasGroupRect();
    const viewportBounds: Rect = this.getViewportBounds();

    const direction: Direction = SwipeUtils.getSwipeDirection(
      this.dragStartPosition,
      dragEndPosision,
      this.modeService.isPageZoomed()
    );

    const currentCanvasGroupIndex: number =
      this.canvasService.currentCanvasGroupIndex;
    const calculateNextCanvasGroupStrategy =
      CalculateNextCanvasGroupFactory.create(this.modeService.mode);

    let pannedPastSide: Side | null;
    let canvasGroupEndHitCountReached = false;
    if (this.modeService.isPageZoomed()) {
      pannedPastSide = SwipeUtils.getSideIfPanningPastEndOfCanvasGroup(
        canvasGroupRect,
        viewportBounds
      );
      this.swipeDragEndCounter.addHit(pannedPastSide, direction);
      canvasGroupEndHitCountReached =
        this.swipeDragEndCounter.hitCountReached();
    }

    const newCanvasGroupIndex = this.canvasService.constrainToRange(
      calculateNextCanvasGroupStrategy.calculateNextCanvasGroup({
        currentCanvasGroupCenter: this.currentCanvasIndex.getValue(),
        speed: speed,
        direction: direction,
        currentCanvasGroupIndex: currentCanvasGroupIndex,
        canvasGroupEndHitCountReached: canvasGroupEndHitCountReached,
        viewingDirection: this.manifest.viewingDirection,
      })
    );
    if (
      this.modeService.mode === ViewerMode.DASHBOARD ||
      this.modeService.mode === ViewerMode.PAGE ||
      (canvasGroupEndHitCountReached && direction)
    ) {
      this.goToCanvasGroupStrategy.goToCanvasGroup({
        canvasGroupIndex: newCanvasGroupIndex,
        immediately: false,
        direction: direction,
      });
    }
  }

  private getViewportBounds(): Rect {
    return this.viewer?.viewport.getBounds();
  }

  private getOriginalTarget(event: any) {
    return event.originalTarget
      ? event.originalTarget
      : event.originalEvent.target;
  }

  private panTo(rect: Rect | undefined, immediately = false): void {
    if (rect) {
      this.viewer.viewport.panTo(
        {
          x: rect.x,
          y: rect.y,
        },
        immediately
      );
    }
  }

  private rotateToRight() {
    this.rotation.next((this.rotation.getValue() + 90) % 360);
  }

  private showRotationIsNotSupportetMessage() {
    this.snackBar.open(this.intl.rotationIsNotSupported, undefined, {
      duration: 3000,
    });
  }

  private setOpacityOnPages(opacity: number): void {
    if (this.viewer) {
      const itemCount = this.viewer.world.getItemCount();
      for (let i = 0; i < itemCount; i++) {
        const item = this.viewer.world.getItemAt(i);
        item.setOpacity(opacity);
      }
    }
  }

  private unsubscribe() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
