import request from "request";
import { Client } from "../Client";

export type discordId = string 
export type steamId = string

export class AdminManageCitizensController extends Client {
  constructor() {
    super();
  }

  public GetCitizensRoute(options: { includeAll?: boolean; skip?: number; query?: string }): Promise<JSON> {
    return new Promise((resolve, reject) => {
        let url = `${this.url}/v${this.version}/admin/manage/citizens`;
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
    })

  }

  public GetRecordLogsRoute(): Promise<JSON> {
    return new Promise((resolve, reject) => {
        request(
            `${this.url}/v${this.version}/admin/manage/citizens/record-logs`,
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
    })
  }

  public GetCitizenByIdRoute(options: { id: string | discordId | steamId }): Promise<JSON> {
    return new Promise((resolve, reject) => {
        request(
            `${this.url}/v${this.version}/admin/manage/citizens/` + options.id,
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
          )
    })
  }
  public ManageCitizenRoute(options: { id: string, body: string }): Promise<JSON> {
    return new Promise((resolve, reject) => {
        request(
            `${this.url}/v${this.version}/admin/manage/citizens/` + options.id,
            {
              method: 'PUT',
              headers: {
                "snaily-cad-api-token": this.token,
              },
              body: options.body
            },
            (err: any, res: request.RequestResponse, body: any) => {
              if (err) reject(err);
              if (res) {
                resolve(body);
              }
            }
          )
    })
  }
  public DeleteCitizensRoute(options: {
    id: string;
    reason: string;
  }): Promise<JSON> {
    return new Promise((resolve, reject) => {
        request(
            `${this.url}/v${this.version}/admin/manage/citizens/` + options.id,
            {
              method: 'DELETE',
              headers: {
                "snaily-cad-api-token": this.token,
              },
              body: `{"reason": ${options.reason}}`
            },
            (err: any, res: request.RequestResponse, body: any) => {
              if (err) reject(err);
              if (res) {
                resolve(body);
              }
            }
          )
    })
  }
  public ManageCitizenRecordLogsRoute(options: {id: string, type: string}): Promise<JSON> {
    return new Promise((resolve, reject) => {
        request(
            `${this.url}/v${this.version}/admin/manage/citizens/record-logs/` + options.id,
            {
              method: 'DELETE',
              headers: {
                "snaily-cad-api-token": this.token,
              },
              body: `{"type": ${options.type}}`
            },
            (err: any, res: request.RequestResponse, body: any) => {
              if (err) reject(err);
              if (res) {
                resolve(body);
              }
            }
          )
    })
  }
}
