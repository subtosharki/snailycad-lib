export type HTTPMethods = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

type Versions = 1

type ClientOptions  = { url: string; token: string; version: Versions }

export interface ClientTypes {
    url: string;
    token: string;
    version: number;
    
    customRoute: (route: string, method: HTTPMethods) => Promise<JSON>
}