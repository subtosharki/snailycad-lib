import request from "request";
import { Client } from "../Client";
export class ImportCitizensController extends Client {
  constructor() {
    super();
  }
  public ImportCitizensRoute(): Promise<JSON> {
    return new Promise((resolve, reject) => {
      request(
        `${this.url}/v${this.version}/admin/import/citizens`,
        {
          method: 'POST',
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
