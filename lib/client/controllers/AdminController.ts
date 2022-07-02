import request from "request";
import { Client } from "../Client";

export default class AdminController extends Client {
  constructor() {
    super();
  }
  public AdminRoute(): Promise<JSON> {
    return new Promise((resolve, reject) => {
      request(
        `${this.url}/v${this.version}/admin`,
        {
          method: 'GET',
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
