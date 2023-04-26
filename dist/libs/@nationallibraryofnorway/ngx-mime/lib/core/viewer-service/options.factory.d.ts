import * as OpenSeadragon from 'openseadragon';
import { MimeViewerConfig } from '../mime-viewer-config';
export declare class OptionsFactory {
    static create(id: string, mimeViewerConfig: MimeViewerConfig): OpenSeadragon.Options;
    private static canUseCanvas;
}
