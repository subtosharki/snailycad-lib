import type { HTTPMethods, ClientOptions, ClientTypes } from '../types/index'

import request from 'request';

/**
 * 
 * 
 * @export
 * @class Client
 * @implements {ClientTypes}
 */
export class Client implements ClientTypes {
    url: string;
    token: string;
    version: number;
  /**
   * Creates an instance of Client.
   * @param {ClientOptions} options 
   * 
   * @memberOf Client
   */
  constructor(options: ClientOptions) {
      this.url = options.url
      this.token = options.token
      this.version = options.version
  }

  /**
   * 
   * 
   * @param {string} route 
   * @param {HTTPMethods} method 
   * @returns {Promise<JSON>} 
   * 
   * @memberOf Client
   */
  public customRoute(route: string, method: HTTPMethods): Promise<JSON> {
    return new Promise((resolve, reject) => {
        request(`${this.url}/v${this.version}${route}`, {
            method: method,
            headers: {
                'snaily-cad-api-token': this.token
            }
        }, (err: any, res: request.RequestResponse, body: any) => {
            if(err) reject(err)
            if(res) {
                resolve(body)
            }
        })
        
    })
  }
}