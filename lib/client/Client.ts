import request from "request";
import { AdminController } from "./controllers/AdminController";
import { ImportCitizensController } from "./controllers/ImportCitizensController";
import { ImportVehiclesController } from "./controllers/ImportVehiclesController";
import type { ImportVehiclesOptions } from './controllers/ImportVehiclesController'

export type HTTPMethods = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

type Versions = 1;

type ClientOptions = { url: string; token: string; version: Versions };
export class Client {
  public url: string;
  public token: string;
  public version: number;
  private AdminController: AdminController;
  private ImportCitizensController: ImportCitizensController;
  private ImportVehiclesController: ImportVehiclesController
  constructor() {
    this.url = "";
    this.token = "";
    this.version = 1;
    this.AdminController = new AdminController();
    this.ImportCitizensController = new ImportCitizensController();
    this.ImportVehiclesController = new ImportVehiclesController()
  }

  public login(options: ClientOptions): void {
    this.url = options.url;
    this.token = options.token;
    this.version = options.version;
  }

  public customRoute(route: string, method: HTTPMethods): Promise<JSON> {
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

  public Admin(method: HTTPMethods): Promise<JSON> {
    return this.AdminController.adminRoute(method);
  }

  public ImportCitizens(method: HTTPMethods): Promise<JSON> {
    return this.ImportCitizensController.importCitizensRoute(method);
  }

  public ImportVehicles(method: HTTPMethods, options: ImportVehiclesOptions): Promise<JSON> {
    return this.ImportVehiclesController.importVehiclesRoute(method, options)
  }
}