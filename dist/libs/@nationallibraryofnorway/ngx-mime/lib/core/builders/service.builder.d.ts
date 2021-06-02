import { Service } from '../models/manifest';
export declare class ServiceBuilder {
    private service;
    constructor(service: any);
    build(): Service | undefined;
}
