import { Observable } from 'rxjs';
import { CanvasService } from '../../canvas-service/canvas-service';
import { IiifContentSearchService } from '../../iiif-content-search-service/iiif-content-search.service';
import { Hit } from '../../models/hit';
import * as i0 from "@angular/core";
export declare class ContentSearchNavigationService {
    private canvasService;
    private iiifContentSearchService;
    private currentIndex;
    private lastHitIndex;
    private isHitOnActiveCanvasGroup;
    private currentHit;
    private canvasesPerCanvasGroup;
    private searchResult;
    private subscriptions;
    private _currentHitCounter$;
    constructor(canvasService: CanvasService, iiifContentSearchService: IiifContentSearchService);
    initialize(): void;
    destroy(): void;
    update(canvasGroupIndex: number): void;
    get currentHitCounter(): Observable<number>;
    private updateCurrentHitCounter;
    getHitOnActiveCanvasGroup(): boolean;
    goToNextHit(): void;
    goToPreviousHit(): void;
    selected(hit: Hit): void;
    private goToNextCurrentCanvasHit;
    private goToPreviousCurrentCanvasHit;
    private goToNextCanvasHit;
    private goToPreviousCanvasHit;
    private findHitOnActiveCanvasGroup;
    private findCurrentHitIndex;
    private findLastHitIndex;
    private getLastCanvasGroupIndex;
    private isCurrentHitOnCurrentCanvasGroup;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContentSearchNavigationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ContentSearchNavigationService>;
}
//# sourceMappingURL=content-search-navigation.service.d.ts.map