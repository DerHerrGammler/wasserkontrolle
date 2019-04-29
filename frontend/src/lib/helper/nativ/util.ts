import { toInteger } from "./number";


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Functions
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function isset(item: any): boolean {
    return (item !== undefined && item !== null);
}

export function isNumber(item: any): boolean {
    return !Number.isNaN(parseFloat(item.toString())) && isFinite(item);
}

export function isObject(item: any): boolean {
    return (item && typeof item === "object" && !Array.isArray(item));
}

export function isArray(oItem: any): boolean {
    return oItem instanceof Array;
}
