import { Hit } from './../../core/models/hit';
import * as i0 from "@angular/core";
export declare class HighlightService {
    highlightSelectedHit(id: number): void;
    highlight(html: string, currentIndex: number, hits?: Hit[] | undefined): string;
    private markHtml;
    private escapeSpecialCharacters;
    static ɵfac: i0.ɵɵFactoryDeclaration<HighlightService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HighlightService>;
}
//# sourceMappingURL=highlight.service.d.ts.map