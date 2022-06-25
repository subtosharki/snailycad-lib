import request from "request";
import { Client } from "../Client";
import type { HTTPMethods } from '../Client'

export class ImportCitizensController extends Client {
  constructor() {
    super();
  }
  public importCitizensRoute(method: HTTPMethods): Promise<JSON> {
    return new Promise((resolve, reject) => {
      request(
        `${this.url}/v${this.version}/admin/import/citizens`,
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
}
