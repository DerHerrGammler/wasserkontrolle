import { Injectable } from "@angular/core";
import * as defaultPack from "../../assets/i18n/__default.json";


@Injectable({
    providedIn: "root"
})
export class I18nService {

    private readonly defaultPack: any = defaultPack.default;
    private readonly localePack: any = null;

    constructor() { }

    private getDefault(text: string, key?: string): string {
        if (this.defaultPack[key] && this.defaultPack[key][text]) {
            return this.defaultPack[key][text];
        } else if (this.defaultPack[text]) {
            return this.defaultPack[text];
        } else {
            return "";
        }
    }

    public getLocale(text: string, key?: string): string {
        let pack: any = this.defaultPack;
        // Wenn andere Sprache geladen ist.
        if (this.localePack) {
            pack = this.localePack;
        }
        // Rückgabe des Wertes
        if (pack[key] && pack[key][text]) {
            if (pack[key][text] !== "") {
                return pack[key][text];
            } else {
                return this.getDefault(text, key);
            }
        } else if (pack[text]) {
            if (pack[text] !== "") {
                return pack[text];
            } else {
                return this.getDefault(text, key);
            }
        } else {
            return "";
        }
    }
}
