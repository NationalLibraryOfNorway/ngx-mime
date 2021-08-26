import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Alto } from './alto.model';
export declare class HtmlFormatter {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    altoToHtml(alto: Alto): SafeHtml;
}
