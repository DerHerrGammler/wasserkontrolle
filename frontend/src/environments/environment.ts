import * as base from "./_environment";
import { Ienvironment, IappSettings, IapiSettings, IlocalStorageSettings, IthemeDesigns } from "./environment.types";
import { deepMergeObject } from "../lib/helper/_helper";

export const environment: Ienvironment = {...deepMergeObject(base.environment, {})};

export const appSettings: IappSettings = {...deepMergeObject(base.appSettings, {
    matomo: false
})};

export const apiSettings: IapiSettings = {...deepMergeObject(base.apiSettings, {})};

export const localStorageSettings: IlocalStorageSettings = {...deepMergeObject(base.localStorageSettings, {})};

export const themeDesigns: IthemeDesigns = {...deepMergeObject(base.themeDesigns, {})};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import "zone.js/dist/zone-error";  // Included with Angular CLI.

