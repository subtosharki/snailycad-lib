import request from 'request';
import Client from '../Client';

export default class AdminManageCustomFieldsController extends Client {
    constructor() {
        super();
    }

    public GetCustomFieldsRoute(): Promise<JSON> {
        return new Promise((resolve, reject) => {
            request(
                `${this.url}/v${this.version}/admin/manage/custom-fields`,
                {
                    method: 'GET',
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
}
