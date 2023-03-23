import { Manifest } from '../models/manifest';
export declare class ManifestUtils {
    static isManifestPaged(manifest: Manifest): boolean;
    static isManifestViewingHintPaged(manifest: Manifest): boolean;
    static isSequenceViewingHintPaged(manifest: Manifest): boolean;
    static hasRecognizedTextContent(manifest: Manifest): boolean;
}
