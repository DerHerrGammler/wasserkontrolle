import { Injectable } from "@angular/core";
import { localStorageSettings, themeDesigns, appSettings } from "../../environments/environment";
import { isset } from "../../lib/helper/_helper";

@Injectable({
    providedIn: "root"
})
export class ThemeService {

    public readonly themes: any = Object.values(themeDesigns);

    constructor() { }

    public init(): void {
        let sTheme: string = appSettings.defaultTheme;
        if (isset(localStorage.getItem(localStorageSettings.theme))) {
            sTheme = this.getTheme();
        }
        this.setTheme(sTheme);
    }

    public setTheme(theme: string): void {
        if (!isset(theme) || theme === "") {
            theme = appSettings.defaultTheme;
        }
        const oBody: HTMLElement = document.body;
        let i: number = 0;
        while (i < oBody.classList.length) {
            if (oBody.classList[i].indexOf("theme") !== -1) {
                oBody.classList.remove(oBody.classList[i]);
            }
            i += 1;
        }
        oBody.classList.add("theme-" + theme);
        if (isset(theme) && theme !== "") {
            localStorage.setItem(localStorageSettings.theme, theme);
        }
    }

    public getTheme(): string {
        return localStorage.getItem(localStorageSettings.theme);
    }

}
