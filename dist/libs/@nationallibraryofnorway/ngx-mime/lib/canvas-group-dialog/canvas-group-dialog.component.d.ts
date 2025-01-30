import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { MimeViewerIntl } from '../core/intl';
import { ViewerService } from '../core/viewer-service/viewer.service';
import * as i0 from "@angular/core";
export declare class CanvasGroupDialogComponent implements OnInit, OnDestroy {
    private readonly dialogRef;
    private readonly fb;
    private readonly viewerService;
    private readonly canvasService;
    readonly intl: MimeViewerIntl;
    private readonly changeDetectorRef;
    numberOfCanvases: number;
    canvasGroupForm: FormGroup<{
        canvasGroupControl: FormControl<number | null>;
    }>;
    private readonly subscriptions;
    constructor(dialogRef: MatDialogRef<CanvasGroupDialogComponent>, fb: FormBuilder, viewerService: ViewerService, canvasService: CanvasService, intl: MimeViewerIntl, changeDetectorRef: ChangeDetectorRef);
    get canvasGroupControl(): import("@angular/forms").AbstractControl<number | null, number | null> | null;
    ngOnInit(): void;
    ngOnDestroy(): void;
    onSubmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CanvasGroupDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CanvasGroupDialogComponent, "ng-component", never, {}, {}, never, never, false, never>;
}
