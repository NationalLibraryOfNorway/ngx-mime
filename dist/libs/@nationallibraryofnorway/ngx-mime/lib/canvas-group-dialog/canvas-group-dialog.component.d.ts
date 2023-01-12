import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { MimeViewerIntl } from '../core/intl';
import { ViewerService } from '../core/viewer-service/viewer.service';
import * as i0 from "@angular/core";
export declare class CanvasGroupDialogComponent implements OnInit, OnDestroy {
    private dialogRef;
    private fb;
    private viewerService;
    private canvasService;
    intl: MimeViewerIntl;
    private changeDetectorRef;
    numberOfCanvases: number;
    canvasGroupForm: FormGroup<{
        canvasGroupControl: FormControl<number | null>;
    }>;
    private subscriptions;
    constructor(dialogRef: MatDialogRef<CanvasGroupDialogComponent>, fb: FormBuilder, viewerService: ViewerService, canvasService: CanvasService, intl: MimeViewerIntl, changeDetectorRef: ChangeDetectorRef);
    get canvasGroupControl(): import("@angular/forms").AbstractControl<number, number>;
    ngOnInit(): void;
    ngOnDestroy(): void;
    onSubmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CanvasGroupDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CanvasGroupDialogComponent, "ng-component", never, {}, {}, never, never, false>;
}
