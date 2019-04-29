import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { apiSettings } from "../../environments/environment";
import { saveAs } from "file-saver";

export enum HttpMethods {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    PUT = "PUT",
    DELETE = "DELETE"
}

export enum HttpStatusCodes {
    OK = 200,

    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    Conflict = 409,
    Gone = 410,
    Locked = 423,

    InernalServerError = 500,
    ServiceUnavailable = 503
}

@Injectable({
    providedIn: "root"
})
export class HttpService {

    private sBaseurl: string = apiSettings.main;

    constructor(
        private readonly http: HttpClient
    ) { }

    public setApi(baseUrl: string = apiSettings.main): void {
        this.sBaseurl = baseUrl;
    }

    public async get(sUrl: string, oRequest: Object = null, bFullUrl: boolean = false): Promise<any> {
        return this.request(sUrl, HttpMethods.GET, oRequest, bFullUrl);
    }

    public async post(sUrl: string, oRequest: Object = null, bFullUrl: boolean = false): Promise<any> {
        return this.request(sUrl, HttpMethods.POST, oRequest, bFullUrl);
    }

    public async patch(sUrl: string, oRequest: Object = null, bFullUrl: boolean = false): Promise<any> {
        return this.request(sUrl, HttpMethods.PATCH, oRequest, bFullUrl);
    }

    public async put(sUrl: string, oRequest: Object = null, bFullUrl: boolean = false): Promise<any> {
        return this.request(sUrl, HttpMethods.PUT, oRequest, bFullUrl);
    }

    public async delete(sUrl: string, oRequest: Object = null, bFullUrl: boolean = false): Promise<any> {
        return this.request(sUrl, HttpMethods.DELETE, oRequest, bFullUrl);
    }

    public download(sURL: string, sFilename: string): void {
        this.http.get(sURL,
            {
                responseType: "blob"
            }
        ).subscribe((data: any) => saveAs(data, sFilename));
    }

    public async request(
        sUrl: string,
        sMethode: HttpMethods,
        oRequest: Object = null,
        bFullUrl: boolean = false,
        oOpt: any = null
    ): Promise<any> {

        let sEndpoint: string = null;
        if (bFullUrl) {
            sEndpoint = sUrl;
        } else {
            sEndpoint = `${this.sBaseurl}${sUrl}`;
        }

        // Setup headers
        if (!oOpt) {
            oOpt = {
                headers: {}
            };
            oOpt.headers["Access-Control-Allow-Origin"] = "*";
        }

        let fRequest: Promise<ArrayBuffer> = null;
        switch (sMethode) {
            case HttpMethods.GET: {
                fRequest = this._get(sEndpoint, oRequest, oOpt);
                break;
            }
            case HttpMethods.POST: {
                fRequest = this._post(sEndpoint, oRequest, oOpt);
                break;
            }
            case HttpMethods.PATCH: {
                fRequest = this._patch(sEndpoint, oRequest, oOpt);
                break;
            }
            case HttpMethods.PUT: {
                fRequest = this._put(sEndpoint, oRequest, oOpt);
                break;
            }
            case HttpMethods.DELETE: {
                fRequest = this._delete(sEndpoint, oRequest, oOpt);
            }
        }
        return fRequest;
    }

    private async _get(sUrl: string, oRequest: any, oOptions: any): Promise<ArrayBuffer> {
        oOptions.params = oRequest;
        return this.http.get(sUrl, oOptions)
            .toPromise();
    }

    private async _post(sUrl: string, oRequest: any, oOptions: any): Promise<ArrayBuffer> {
        return this.http.post(sUrl, oRequest, oOptions)
            .toPromise();
    }

    private async _patch(sUrl: string, oRequest: any, oOptions: any): Promise<ArrayBuffer> {
        return this.http.patch(sUrl, oRequest, oOptions)
            .toPromise();
    }

    private async _put(sUrl: string, oRequest: any, oOptions: any): Promise<ArrayBuffer> {
        return this.http.put(sUrl, oRequest, oOptions)
            .toPromise();
    }

    private async _delete(sUrl: string, oRequest: any, oOptions: any): Promise<ArrayBuffer> {
        oOptions.params = oRequest;
        return this.http.delete(sUrl, oOptions)
            .toPromise();
    }
}
