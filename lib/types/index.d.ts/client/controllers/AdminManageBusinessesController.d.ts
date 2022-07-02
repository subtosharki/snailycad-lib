import { Client } from "../Client";
export declare class AdminManageBusinessesController extends Client {
    constructor();
    ManageBusninessesRoute(method: 'GET' | 'PUT' | 'DELETE', options: {
        id: string;
    } | {}): Promise<JSON>;
}
