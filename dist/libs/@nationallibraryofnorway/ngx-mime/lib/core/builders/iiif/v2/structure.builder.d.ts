import { Sequence, Structure } from '../../../models/manifest';
export declare class StructureBuilder {
    private structures;
    private sequences;
    constructor(structures: any[], sequences: Sequence[]);
    build(): Structure[];
}
