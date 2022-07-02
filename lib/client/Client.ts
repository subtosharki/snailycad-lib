import request from "request";
import AdminController from "./controllers/AdminController";
import ImportCitizensController from "./controllers/ImportCitizensController";
import ImportVehiclesController from "./controllers/ImportVehiclesController";
import ImportWeaponsController from "./controllers/ImportWeaponsController";
import AdminManageBusinessesController from "./controllers/AdminManageBusinessesController";
import AdminManageCitizensController from "./controllers/AdminManageCitizensController";
import type {discordId, steamId} from "../types/index";
export class Client {
  public url: string;
  public token: string;
  public version: number;
  private AdminController: AdminController;
  private ImportCitizensController: ImportCitizensController;
  private ImportVehiclesController: ImportVehiclesController;
  private ImportWeaponsController: ImportWeaponsController;
  private AdminManageBusinessesController: AdminManageBusinessesController;
  private AdminManageCitizensController: AdminManageCitizensController;
  constructor() {
    this.url = "";
    this.token = "";
    this.version = 1;
    this.AdminController = new AdminController();
    this.ImportCitizensController = new ImportCitizensController();
    this.ImportVehiclesController = new ImportVehiclesController();
    this.ImportWeaponsController = new ImportWeaponsController();
    this.AdminManageBusinessesController =
      new AdminManageBusinessesController();
      this.AdminManageCitizensController = new AdminManageCitizensController();
  }

  public login(options: { url: string; token: string; version: 1 }): void {
    this.url = options.url;
    this.token = options.token;
    this.version = options.version;
  }

  public customRoute(route: string, method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE"): Promise<JSON> {
    return new Promise((resolve, reject) => {
      request(
        `${this.url}/v${this.version}${route}`,
        {
          method: method,
          headers: {
            "snaily-cad-api-token": this.token,
          },
        },
        (err: any, res: request.RequestResponse, body: any) => {
          if (err) reject(err);
          if (res) {
            resolve(body);
          }
        }
      );
    });
  }

  public Admin(): Promise<JSON> {
    return this.AdminController.AdminRoute();
  }

  public ImportCitizens(): Promise<JSON> {
    return this.ImportCitizensController.ImportCitizensRoute();
  }

  public ImportVehicles(
    method: 'GET' | 'POST',
    options: {
      file: string;
    } | {
      skip?: number | undefined | null;
      query?: string | undefined | null;
      includeAll?: boolean | undefined | null;
    }
  ): Promise<JSON> {
    return this.ImportVehiclesController.ImportVehiclesRoute(method, options);
  }

  public ImportWeapons(
    method: 'GET' | 'POST',
    options: {
      file: string;
    }
  | {
      skip?: number | undefined | null;
      query?: string | undefined | null;
      includeAll?: boolean | undefined | null;
    }
  ): Promise<JSON> {
    return this.ImportWeaponsController.ImportWeaponsRoute(method, options);
  }

  public ManageBusinesses(
    method: 'GET' | 'POST' | 'DELETE',
    options: {}
    | {
        id: string;
      }
  ): Promise<JSON> {
    return this.AdminManageBusinessesController.ManageBusinesses(
      method,
      options
    );
  }

  public GetCitizens(options: { includeAll?: boolean; skip?: number; query?: string }): Promise<JSON> {
    if(options) return this.AdminManageCitizensController.GetCitizensRoute(options);
    return this.AdminManageCitizensController.GetCitizensRoute({});
  }

  public GetRecordLogs(): Promise<JSON> {
    return this.AdminManageCitizensController.GetRecordLogsRoute();
  }

  public GetCitizenById(options: { id: string | discordId | steamId }): Promise<JSON> {
    return this.AdminManageCitizensController.GetCitizenByIdRoute(options)
  }

  public ManageCitizen(options: { id: string, body: string }): Promise<JSON> {
    return this.AdminManageCitizensController.ManageCitizenRoute(options)
  }

  public DeleteCitizen(options: {
    id: string;
    reason: string;
  }): Promise<JSON> {
    return this.AdminManageCitizensController.DeleteCitizensRoute(options)
  }

  public ManageCitizenRecordLogs(options: {id: string, type: string}): Promise<JSON> {
    return this.AdminManageCitizensController.ManageCitizenRecordLogsRoute(options)
  }
}
