import * as OpenSeadragon from 'openseadragon';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerOptions } from '../models/viewer-options';

export class OptionsFactory {
  public static create(
    mimeViewerConfig: MimeViewerConfig
  ): OpenSeadragon.Options {
    let options: OpenSeadragon.Options = OpenSeadragon.DEFAULT_SETTINGS;

    return {
      ...options,
      id: 'openseadragon',
      useCanvas: this.canUseCanvas(),
      panVertical: true,
      minZoomImageRatio: 1,
      maxZoomPixelRatio: 5,
      smoothTileEdgesMinZoom: 1,
      preserveImageSizeOnResize: true,
      visibilityRatio: 0,
      showNavigationControl: false,
      animationTime: ViewerOptions.transitions.OSDAnimationTime / 1000,
      ajaxWithCredentials: mimeViewerConfig.withCredentials,
      loadTilesWithAjax: mimeViewerConfig.loadTilesWithAjax,
      crossOriginPolicy: mimeViewerConfig.crossOriginPolicy,
      ajaxHeaders: mimeViewerConfig.ajaxHeaders,
      gestureSettingsMouse: {
        ...options.gestureSettingsMouse,
        scrollToZoom: false,
        clickToZoom: false,
      },
      gestureSettingsTouch: {
        ...options.gestureSettingsTouch,
        dblClickToZoom: false,
        pinchToZoom: false,
        flickEnabled: false,
      },
      gestureSettingsPen: {
        ...options.gestureSettingsPen,
        clickToZoom: false,
      },
      gestureSettingsUnknown: {
        ...options.gestureSettingsUnknown,
        scrollToZoom: false,
        dblClickToZoom: false,
        pinchToZoom: false,
        flickEnabled: false,
      },
    };
  }

  private static canUseCanvas() {
    const isHandheldIOS =
      /iPad|iPhone|iPod/.test(navigator.platform ?? '') ||
      (navigator.platform === 'MacIntel' &&
        typeof (navigator as any).standalone !== 'undefined');

    return !isHandheldIOS;
  }
}
