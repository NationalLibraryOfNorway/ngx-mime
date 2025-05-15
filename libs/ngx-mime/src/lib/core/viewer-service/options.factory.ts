import * as OpenSeadragon from 'openseadragon';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerOptions } from '../models/viewer-options';
import { getDrawerType } from './drawer-utils';

export class OptionsFactory {
  public static create(
    id: string,
    mimeViewerConfig: MimeViewerConfig,
  ): OpenSeadragon.Options {
    let options: OpenSeadragon.Options = OpenSeadragon.DEFAULT_SETTINGS;

    return <any>{
      ...options,
      id: id,
      panVertical: true,
      drawer: getDrawerType(),
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
}
