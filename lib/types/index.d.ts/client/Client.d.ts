import type { discordId, steamId } from "./controllers/AdminManageCitizensController";
export declare class Client {
    url: string;
    token: string;
    version: number;
    private AdminController;
    private ImportCitizensController;
    private ImportVehiclesController;
    private ImportWeaponsController;
    private AdminManageBusinessesController;
    private AdminManageCitizensController;
    constructor();
    login(options: {
        url: string;
        token: string;
        version: 1;
    }): void;
    customRoute(route: string, method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE"): Promise<JSON>;
    Admin(): Promise<JSON>;
    ImportCitizens(): Promise<JSON>;
    ImportVehicles(method: 'GET' | 'POST', options: {
        file: string;
    } | {
        skip?: number | undefined | null;
        query?: string | undefined | null;
        includeAll?: boolean | undefined | null;
    }): Promise<JSON>;
    ImportWeapons(method: 'GET' | 'POST', options: {
        file: string;
    } | {
        skip?: number | undefined | null;
        query?: string | undefined | null;
        includeAll?: boolean | undefined | null;
    }): Promise<JSON>;
    ManageBusinesses(method: 'GET' | 'POST' | 'DELETE', options: {} | {
        id: string;
    }): Promise<JSON>;
    GetCitizens(options: {
        includeAll?: boolean;
        skip?: number;
        query?: string;
    }): Promise<JSON>;
    GetRecordLogs(): Promise<JSON>;
    GetCitizenById(options: {
        id: string | discordId | steamId;
    }): Promise<JSON>;
    ManageCitizen(options: {
        id: string;
        body: string;
    }): Promise<JSON>;
    DeleteCitizen(options: {
        id: string;
        reason: string;
    }): Promise<JSON>;
    ManageCitizenRecordLogs(options: {
        id: string;
        type: string;
    }): Promise<JSON>;
}
