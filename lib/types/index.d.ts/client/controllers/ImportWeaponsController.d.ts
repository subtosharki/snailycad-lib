import { Client } from "../Client";
export declare class ImportWeaponsController extends Client {
    constructor();
    ImportWeaponsRoute(method: 'GET' | 'POST', options: {
        file: string;
    } | {
        skip?: number | undefined | null;
        query?: string | undefined | null;
        includeAll?: boolean | undefined | null;
    }): Promise<JSON>;
}
