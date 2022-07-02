import request from 'request';
import AdminController from './controllers/AdminController';
import ImportCitizensController from './controllers/ImportCitizensController';
import ImportVehiclesController from './controllers/ImportVehiclesController';
import ImportWeaponsController from './controllers/ImportWeaponsController';
import AdminManageBusinessesController from './controllers/AdminManageBusinessesController';
import AdminManageCitizensController from './controllers/AdminManageCitizensController';
import AdminManageCustomFieldsController from './controllers/AdminManageCustomFieldsController';
import { discordId, steamId } from '../types/index';

/**
 * 
 * 
 * @export
 * @class Client
 */
export default class Client {
    public url: string;
    public token: string;
    public version: number;
    private AdminController: AdminController;
    private ImportCitizensController: ImportCitizensController;
    private ImportVehiclesController: ImportVehiclesController;
    private ImportWeaponsController: ImportWeaponsController;
    private AdminManageBusinessesController: AdminManageBusinessesController;
    private AdminManageCitizensController: AdminManageCitizensController;
    private AdminManageCustomFieldsController: AdminManageCustomFieldsController
    constructor() {
        this.url = '';
        this.token = '';
        this.version = 1;
        this.AdminController = new AdminController();
        this.ImportCitizensController = new ImportCitizensController();
        this.ImportVehiclesController = new ImportVehiclesController();
        this.ImportWeaponsController = new ImportWeaponsController();
        this.AdminManageBusinessesController =
            new AdminManageBusinessesController();
        this.AdminManageCitizensController =
            new AdminManageCitizensController();
            this.AdminManageCustomFieldsController = new AdminManageCustomFieldsController();
    }

    /**
     * 
     * 
     * @param {{
     *         url: string;
     *         token: string;
     *         version: 1;
     *     }} options 
     * @returns {(void | Error)} 
     * 
     * @memberOf Client
     */
    public login(options: {
        url: string;
        token: string;
        version: 1;
    }): void | Error {
        this.url = options.url;
        this.token = options.token;
        this.version = options.version;
        request(
            this.url + '/',
            { method: 'GET', headers: { 'snaily-cad-api-token': this.token } },
            (err: any) => {
                if (err)
                    throw (
                        new Error(
                            'Could Not Connect To Given API: ' + this.url
                        ) && this.destroy()
                    );
            }
        );
    }

    private destroy(): void {}

    /**
     * 
     * 
     * @param {string} route 
     * @param {('POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE')} method 
     * @returns {Promise<JSON>} 
     * 
     * @memberOf Client
     */
    public customRoute(
        route: string,
        method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
    ): Promise<JSON> {
        return new Promise((resolve, reject) => {
            request(
                `${this.url}/v${this.version}${route}`,
                {
                    method: method,
                    headers: {
                        'snaily-cad-api-token': this.token,
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

    /**
     * 
     * @route /v1/admin
     * 
     * @returns {Promise<JSON>} 
     * 
     * @memberOf Client
     */
    public Admin(): Promise<JSON> {
        return this.AdminController.AdminRoute();
    }

    /**
     * 
     * @route /v1/admin/import/citizens
     * 
     * @returns {Promise<JSON>} 
     * 
     * @memberOf Client
     */
    public ImportCitizens(): Promise<JSON> {
        return this.ImportCitizensController.ImportCitizensRoute();
    }

    /**
     * 
     * @route /v1/admin/import/vehicles
     * 
     * @param {('GET' | 'POST')} method 
     * @param {({
     *                   file: string;
     *               }
     *             | {
     *                   skip?: number | undefined | null;
     *                   query?: string | undefined | null;
     *                   includeAll?: boolean | undefined | null;
     *               })} options 
     * @returns {Promise<JSON>} 
     * 
     * @memberOf Client
     */
    public ImportVehicles(
        method: 'GET' | 'POST',
        options:
            | {
                  file: string;
              }
            | {
                  skip?: number | undefined | null;
                  query?: string | undefined | null;
                  includeAll?: boolean | undefined | null;
              }
    ): Promise<JSON> {
        return this.ImportVehiclesController.ImportVehiclesRoute(
            method,
            options
        );
    }

    /**
     * 
     * @route /v1/admin/import/weapons
     * 
     * @param {('GET' | 'POST')} method 
     * @param {({
     *                   file: string;
     *               }
     *             | {
     *                   skip?: number | undefined | null;
     *                   query?: string | undefined | null;
     *                   includeAll?: boolean | undefined | null;
     *               })} options 
     * @returns {Promise<JSON>} 
     * 
     * @memberOf Client
     */
    public ImportWeapons(
        method: 'GET' | 'POST',
        options:
            | {
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

    /**
     * 
     * /v1/admin/manage/businesses
     * 
     * @param {('GET' | 'POST' | 'DELETE')} method 
     * @param {({}
     *             | {
     *                   id: string;
     *               })} options 
     * @returns {Promise<JSON>} 
     * 
     * @memberOf Client
     */
    public ManageBusinesses(
        method: 'GET' | 'POST' | 'DELETE',
        options:
            | {}
            | {
                  id: string;
              }
    ): Promise<JSON> {
        return this.AdminManageBusinessesController.ManageBusinesses(
            method,
            options
        );
    }

    /**
     * @route /v1/admin/manage/citizens
     * 
     * @param {{
     *         includeAll?: boolean;
     *         skip?: number;
     *         query?: string;
     *     }} options 
     * @returns {Promise<JSON>} 
     * 
     * @memberOf Client
     */
    public GetCitizens(options: {
        includeAll?: boolean;
        skip?: number;
        query?: string;
    }): Promise<JSON> {
        if (options)
            return this.AdminManageCitizensController.GetCitizensRoute(options);
        return this.AdminManageCitizensController.GetCitizensRoute({});
    }

    /**
     * 
     * @route /v1/admin/manage/citizens/record-logs
     * 
     * @returns {Promise<JSON>} 
     * 
     * @memberOf Client
     */
    public GetRecordLogs(): Promise<JSON> {
        return this.AdminManageCitizensController.GetRecordLogsRoute();
    }

    /**
     * 
     * @route /v1/admin/manage/citizens/{id}
     * 
     * @param {({
     *         id: string | discordId | steamId;
     *     })} options 
     * @returns {Promise<JSON>} 
     * 
     * @memberOf Client
     */
    public GetCitizenById(options: {
        id: string | discordId | steamId;
    }): Promise<JSON> {
        return this.AdminManageCitizensController.GetCitizenByIdRoute(options);
    }

    /**
     * 
     * @route /v1/admin/manage/citizens/{id}
     * 
     * @param {{ id: string; body: string }} options 
     * @returns {Promise<JSON>} 
     * 
     * @memberOf Client
     */
    public ManageCitizen(options: { id: string; body: string }): Promise<JSON> {
        return this.AdminManageCitizensController.ManageCitizenRoute(options);
    }

    /**
     * 
     * @route /v1/admin/manage/citizens/{id}
     * 
     * @param {{
     *         id: string;
     *         reason: string;
     *     }} options 
     * @returns {Promise<JSON>} 
     * 
     * @memberOf Client
     */
    public DeleteCitizen(options: {
        id: string;
        reason: string;
    }): Promise<JSON> {
        return this.AdminManageCitizensController.DeleteCitizensRoute(options);
    }

    /**
     * 
     * @route /v1/admin/manage/citizens/record-logs/{id}
     * 
     * @param {{
     *         id: string;
     *         type: string;
     *     }} options 
     * @returns {Promise<JSON>} 
     * 
     * @memberOf Client
     */
    public ManageCitizenRecordLogs(options: {
        id: string;
        type: string;
    }): Promise<JSON> {
        return this.AdminManageCitizensController.ManageCitizenRecordLogsRoute(
            options
        );
    }

    public GetCustomFields(): Promise<JSON> {
      return this.AdminManageCustomFieldsController.GetCustomFieldsRoute();
    }
}
