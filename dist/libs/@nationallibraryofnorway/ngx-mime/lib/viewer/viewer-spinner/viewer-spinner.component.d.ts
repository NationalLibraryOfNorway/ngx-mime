import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { SpinnerService } from '../../core/spinner-service/spinner.service';
import * as i0 from "@angular/core";
export declare class ViewerSpinnerComponent implements OnDestroy, OnInit {
    private spinnerService;
    private changeDetectorRef;
    visible: boolean;
    private subscriptions;
    constructor(spinnerService: SpinnerService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewerSpinnerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ViewerSpinnerComponent, "mime-spinner", never, {}, {}, never, never>;
}
