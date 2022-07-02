import request from "request";
import { Client } from "../Client";
export class ImportVehiclesController extends Client {
  constructor() {
    super();
  }
  public ImportVehiclesRoute(
    method: 'GET' | 'POST',
    options: {
      file: string;
    } | {
      skip?: number | undefined | null;
      query?: string | undefined | null;
      includeAll?: boolean | undefined | null;
    }
  ): Promise<JSON> {
    return new Promise((resolve, reject) => {
      switch (method) {
        case "GET":
          let url = `${this.url}/v${this.version}/admin/import/vehicles`;
          // @ts-ignore
          if (options?.skip) url = url + "?skip=" + options.skip + "&";
          //@ts-ignore
          if (options.query) url = url + "?query=" + options.query + "&";
          //@ts-ignore
          if (options.includeAll)
            //@ts-ignore
            url = url + "?includeAll=" + options.includeAll;
          request(
            `${url}`,
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
        case "POST":
          request(
            `${this.url}/v${this.version}/admin/import/vehicles`,
            {
              method: method,
              headers: {
                "snaily-cad-api-token": this.token,
              },
              //@ts-ignore
              body: JSON.stringify({ file: options.file }),
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
