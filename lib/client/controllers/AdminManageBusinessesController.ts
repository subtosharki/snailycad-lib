import { Client } from "../Client";
import request from "request";

export class AdminManageBusinessesController extends Client {
  constructor() {
    super();
  }

  public ManageBusninessesRoute(
    method: 'GET' | 'PUT' | 'DELETE',
    options: {
        id: string;
      } | {}
  ): Promise<JSON> {
    return new Promise((resolve, reject) => {
      switch (method) {
        case "GET":
          request(
            `${this.url}/v${this.version}/admin/manage/businesses`,
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
          break;
        case "PUT":
          request(
            //@ts-ignore
            `${this.url}/v${this.version}/admin/import/businesses/` + options.id,
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
          break;
        case "DELETE":
          request(
            //@ts-ignore
            `${this.url}/v${this.version}/admin/import/businesses/` + options.id,
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
          break;
      }
    });
  }
}
