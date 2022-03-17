import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Alto } from './alto.model';
import { Hit } from './../../core/models/hit';
export declare class HtmlFormatter {
    private sanitizer;
    private hits?;
    constructor(sanitizer: DomSanitizer, hits?: Hit[]);
    altoToHtml(alto: Alto): SafeHtml;
    private transform;
    private highlight;
    private escapeSpecialCharacters;
}
