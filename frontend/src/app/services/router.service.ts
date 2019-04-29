import { Injectable, Inject } from "@angular/core";
import { Router, Data, Params } from "@angular/router";
import { Location, DOCUMENT } from "@angular/common";
import { PageScrollService, PageScrollInstance } from "ngx-page-scroll";
import { isset } from "../../lib/helper/_helper";
import { Platform } from "@angular/cdk/platform";
import { HttpService } from "./http.service";
import { HttpClient } from "@angular/common/http";


export interface IMailOptions {
    cc: string[];
    bcc: string[];
    subject: string;
    body: string;
}

export enum BPlatform {
    EDGE = "Edge",
    TRIDENT = "Trident",
    BLINK = "Blink",
    WEBKIT = "Webkit",
    FIREFOX = "Firefox",
    SAFARI = "Safari"
}

export enum SPlatform {
    IOS = "IOS",
    ANDROID = "Android",
    BROWSER = "Browser"
}


@Injectable({
    providedIn: "root"
})
export class RouterService {

    public path: string[] = [];
    public pathParam: string[] = [];
    public data: Data = {};
    public params: Params = {};

    constructor(
        private readonly router: Router,
        private readonly location: Location,
        private readonly pageScoll: PageScrollService,
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly platform: Platform,
        private readonly http: HttpClient
    ) { }

    public async go(sPathIntern: string): Promise<void> {
        // this.location.go(sPathIntern);
        await this.router.navigateByUrl(sPathIntern);
    }

    public goBack(): void {
        this.location.back();
    }

    public goForward(): void {
        this.location.forward();
    }

    public goExtern(sFullURL: string, bBlank: boolean): Window {
        let sTarget: string = "_self";
        if (bBlank) {
            sTarget = "_blank";
        }
        return window.open(sFullURL, sTarget);
    }

    public scrollId(sID: string, offset: number = 0): void {
        const scrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
            document: this.document,
            scrollTarget: "#" + sID,
            verticalScrolling: true,
            pageScrollSpeed: 1000,
            pageScrollInterruptible: true,
            pageScrollOffset: offset
        });
        this.pageScoll.start(scrollInstance);
    }

    public mailto(MAIL: string | string[], oOptions?: IMailOptions): void {
        // Mail erstellen
        const mail: HTMLAnchorElement = this.document.createElement("a");
        mail.href = "mailto:";
        // Funktion zum adden eines multielementes
        function adding(sAdd: string | string[]): void {
            if (sAdd instanceof Array) {
                let i: number = 0;
                while (i < sAdd.length) {
                    if (i !== 0) {
                        mail.href += ",";
                    }
                    mail.href += sAdd[i];
                    i += 1;
                }
            } else {
                mail.href += sAdd;
            }
        }
        // Mail mit gesetzem Template belegen
        adding(MAIL);
        if (oOptions.cc) {
            mail.href += "&cc=";
            adding(oOptions.cc);
        }
        if (oOptions.bcc) {
            mail.href += "&bcc=";
            adding(oOptions.bcc);
        }
        if (isset(oOptions.subject)) {
            mail.href += "&subject=" + encodeURI(oOptions.subject);
        }
        if (isset(oOptions.body)) {
            mail.href += "&body=" + encodeURI(oOptions.body);
        }
        // Mail ausführen
        mail.click();
    }

    public getPlatformBrowser(): string {
        switch (true) {
            case this.platform.BLINK: {
                return BPlatform.BLINK;
            }
            case this.platform.EDGE: {
                return BPlatform.EDGE;
            }
            case this.platform.FIREFOX: {
                return BPlatform.FIREFOX;
            }
            case this.platform.SAFARI: {
                return BPlatform.SAFARI;
            }
            case this.platform.TRIDENT: {
                return BPlatform.TRIDENT;
            }
            case this.platform.WEBKIT: {
                return BPlatform.WEBKIT;
            }
        }
    }

    public getPlatformSystem(): string {
        switch (true) {
            case this.platform.ANDROID: {
                return SPlatform.ANDROID;
            }
            case this.platform.IOS: {
                return SPlatform.IOS;
            }
            case this.platform.isBrowser: {
                return SPlatform.BROWSER;
            }
        }
    }

    public newHttp(sUrl: string): HttpService {
        const http: HttpService = new HttpService(this.http);
        http.setApi(sUrl);
        return http;
    }

    public getSize(): service.IScreen {
        let bTouch: boolean = false;
        if ("ontouchstart" in document.documentElement) {
            bTouch = true;
        }
        return {
            height: window.innerHeight,
            width: window.innerWidth,
            touch: bTouch
        };
    }
}
