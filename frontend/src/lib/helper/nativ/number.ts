// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Functions
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}

export function ceilNumber(n: number): number {
    return Math.ceil(n);
}

export function difference(iValue1: number, iValue2: number): number {
    if (iValue1 > iValue2) {
        return iValue1 - iValue2;
    }
    return iValue2 - iValue1;
}

export function rand(iFrom: number, iTo: number): number {
    return Math.floor((Math.random() * (iTo + 1)) + iFrom);
}
