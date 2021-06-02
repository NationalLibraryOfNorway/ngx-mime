import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { ViewerService } from '../core/viewer-service/viewer.service';
export declare class CanvasGroupDialogComponent implements OnInit, OnDestroy {
    private dialogRef;
    private fb;
    private viewerService;
    private canvasService;
    intl: MimeViewerIntl;
    private changeDetectorRef;
    numberOfCanvases: number;
    canvasGroupForm: FormGroup;
    canvasGroupControl: FormControl;
    private subscriptions;
    constructor(dialogRef: MatDialogRef<CanvasGroupDialogComponent>, fb: FormBuilder, viewerService: ViewerService, canvasService: CanvasService, intl: MimeViewerIntl, changeDetectorRef: ChangeDetectorRef);
    createForm(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    onSubmit(): void;
}
