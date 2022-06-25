import request from "request";
import type { HTTPMethods } from "../Client";
import {Client} from "../Client"

export class AdminController extends Client {
  constructor() {
    super();
  }
  public adminRoute(method: HTTPMethods): Promise<JSON> {
    return new Promise((resolve, reject) => {
      request(
        `${this.url}/v${this.version}/admin`,
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
