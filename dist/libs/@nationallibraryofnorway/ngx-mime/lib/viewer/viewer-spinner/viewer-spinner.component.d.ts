import { ChangeDetectorRef } from '@angular/core';
import { OnDestroy, OnInit } from '@angular/core';
import { SpinnerService } from '../../core/spinner-service/spinner.service';
export declare class ViewerSpinnerComponent implements OnDestroy, OnInit {
    private spinnerService;
    private changeDetectorRef;
    visible: boolean;
    private spinnerSub;
    constructor(spinnerService: SpinnerService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
