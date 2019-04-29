// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Functions
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function isTrue(oValue: any, bAsInteger: boolean): boolean | number {
    const bIsTrue: boolean = oValue === "true" || oValue === "1" || oValue === true || oValue === 1;
    if (bAsInteger) {
        if (bIsTrue) {
            return 1;
        } else {
            return 0;
        }
    } else {
        return bIsTrue;
    }
}
