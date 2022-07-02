import { Client } from "../Client";
export declare type discordId = string;
export declare type steamId = string;
export declare class AdminManageCitizensController extends Client {
    constructor();
    GetCitizensRoute(options: {
        includeAll?: boolean;
        skip?: number;
        query?: string;
    }): Promise<JSON>;
    GetRecordLogsRoute(): Promise<JSON>;
    GetCitizenByIdRoute(options: {
        id: string | discordId | steamId;
    }): Promise<JSON>;
    ManageCitizenRoute(options: {
        id: string;
        body: string;
    }): Promise<JSON>;
    DeleteCitizensRoute(options: {
        id: string;
        reason: string;
    }): Promise<JSON>;
    ManageCitizenRecordLogsRoute(options: {
        id: string;
        type: string;
    }): Promise<JSON>;
}
