import * as base from "./_environment";
import { Ienvironment, IappSettings, IapiSettings, IlocalStorageSettings, IthemeDesigns } from "./environment.types";
import { deepMergeObject } from "../lib/helper/_helper";

export const environment: Ienvironment = {...deepMergeObject(base.environment, {
    production: true
})};

export const appSettings: IappSettings = {...deepMergeObject(base.appSettings, {
    matomo: true
})};

export const apiSettings: IapiSettings = {...deepMergeObject(base.apiSettings, {})};

export const localStorageSettings: IlocalStorageSettings = {...deepMergeObject(base.localStorageSettings, {})};

export const themeDesigns: IthemeDesigns = {...deepMergeObject(base.themeDesigns, {})};
