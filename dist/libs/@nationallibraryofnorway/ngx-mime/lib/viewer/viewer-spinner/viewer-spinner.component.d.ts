import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { SpinnerService } from '../../core/spinner-service/spinner.service';
export declare class ViewerSpinnerComponent implements OnDestroy, OnInit {
    private spinnerService;
    private changeDetectorRef;
    visible: boolean;
    private subscriptions;
    constructor(spinnerService: SpinnerService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
