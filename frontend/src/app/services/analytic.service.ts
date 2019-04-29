import { Injectable } from "@angular/core";
import { Angulartics2 } from "angulartics2";
import { appSettings } from "../../environments/environment";

export enum EventAction {
    download = "DownloadClick"
}

@Injectable({
    providedIn: "root"
})
export class AnalyticService {

    private globalProp: object = {};

    constructor(
        private readonly angulartics: Angulartics2
    ) { }

    public devMatomo(): boolean {
        return !appSettings.matomo;
    }

    public trackPage(url: string): void {
        if (this.devMatomo()) {
            return;
        }
        this.angulartics.pageTrack.next({
            path: url
        });
    }

    public trackEvent(actionEvent: EventAction, prop: any = {}): void {
        if (this.devMatomo()) {
            return;
        }
        this.angulartics.eventTrack.next({
            action: actionEvent,
            properties: {
                ...this.globalProp,
                ...prop
            }
        });
    }

    public trackException(error: string): void {
        if (this.devMatomo()) {
            return;
        }
        this.angulartics.exceptionTrack.next({
            error: error,
            properties: {
                ...this.globalProp
            }
        });
    }

    public addProperty(name: string, value: any): void {
        this.globalProp[name] = value;
    }

    public deleteProperty(name: string): void {
        const global: object = {};
        Object.keys(this.globalProp).forEach((sKey: string) => {
            if (sKey !== name) {
                global[sKey] = this.globalProp[sKey];
            }
        });
        this.globalProp = global;
    }
}
