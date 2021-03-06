import Client from '../Client';
import request from 'request';

export default class AdminManageBusinessesController extends Client {
    constructor() {
        super();
    }

    public ManageBusninessesRoute(
        method: 'GET' | 'PUT' | 'DELETE',
        options:
            | {
                  id: string;
              }
            | {}
    ): Promise<JSON> {
        return new Promise((resolve, reject) => {
            switch (method) {
                case 'GET':
                    request(
                        `${this.url}/v${this.version}/admin/manage/businesses`,
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
                    break;
                case 'PUT':
                    request(
                        `${this.url}/v${this.version}/admin/import/businesses/` +
                            //@ts-ignore
                            options.id,
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
                    break;
                case 'DELETE':
                    request(
                        `${this.url}/v${this.version}/admin/import/businesses/` +
                            //@ts-ignore
                            options.id,
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
                    break;
            }
        });
    }
}
