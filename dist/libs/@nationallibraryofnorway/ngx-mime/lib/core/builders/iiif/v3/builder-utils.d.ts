import { ViewingDirection } from '../../../models/viewing-direction';
export declare class BuilderUtils {
    static extractId(value: any): any;
    static extracType(value: any): any;
    static extractContext(value: any): any;
    static extractViewingDirection(value: any): ViewingDirection;
    static extractViewingHint(value: any): string | undefined;
    static findCanvasIndex(canvases: any[], sequences: any[]): number;
    static extractLogo(provider: any[] | undefined): string | undefined;
    static extractLanguageValue(data: Record<string, string[]>, preferredLanguage?: string): string;
    static extractDefaultLanguage(data: Record<string, string[]>): string;
}
//# sourceMappingURL=builder-utils.d.ts.map