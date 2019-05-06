import { Ienvironment, IappSettings, IapiSettings, IlocalStorageSettings, IthemeDesigns } from "./environment.types";

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: Ienvironment = {
    production: false
};

export const appSettings: IappSettings = {
    TITLE: "Wasserkontrolle",
    matomo: false,
    defaultTheme: "default-light"
};

export const apiSettings: IapiSettings = {
    main: "http://10.14.221.65/api",
    test: "https://better-bee.ml"
};

export const localStorageSettings: IlocalStorageSettings = {
    theme: "THEME"
};

export const themeDesigns: IthemeDesigns = {
    LIGHT: {
        name: "Light",
        tag: "default-light"
    },
    DARK: {
        name: "Dark",
        tag: "default-dark"
    }
};
