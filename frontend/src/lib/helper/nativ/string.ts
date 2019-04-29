

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Functions
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function stringIndicesOf(sString: string, sIndex: string): number[] {
    let i: number = 0;
    const aIndices: number[] = [];
    while (i < sString.length) {
        if (sString.substr(i, sIndex.length) === sIndex) {
            aIndices.push(i);
        }
        i += 1;
    }
    return aIndices;
}

export function capitalizeFirstLetter(sString: string): string {
    return sString.charAt(0).toUpperCase() + sString.slice(1);
}

export function randomString(iLength: number, sChars: string, oOptions: any): string {
    let sMask: string = "";
    let sResult: string = "";
    let iMaskLength: number = 0;
    if (oOptions === undefined) {
        oOptions = {};
    }
    if (sChars.indexOf("a") > -1) {
        sMask += "abcdefghijklmnopqrstuvwxyz";
    }
    if (sChars.indexOf("A") > -1) {
        sMask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (sChars.indexOf("#") > -1) {
        sMask += "0123456789";
    }
    if (sChars.indexOf("!") > -1) {
        sMask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
    }
    iMaskLength = sMask.length - 1;
    if (oOptions.prefix !== undefined) {
        sResult = oOptions.prefix;
        iLength -= oOptions.prefix.length;
    }
    if (oOptions.suffix !== undefined) {
        iLength -= oOptions.suffix.length;
    }
    while (iLength > 0) {
        sResult += sMask[Math.round(Math.random() * iMaskLength)];
        iLength -= 1;
    }
    if (oOptions.suffix !== undefined) {
        sResult += oOptions.suffix;
    }
    return sResult;
}

export function replaceAt(str: string, index: number, character: string): string {
    return str.substr(0, index) + character + str.substr(index + character.length);
}

export function convertStringToJSON(sJSON: string, oDefault: object): object {
    try {
        if (sJSON !== undefined && sJSON.length > 0) {
            sJSON = sJSON.replace(/(?:\r\n|\r|\n)/g, "");
            oDefault = JSON.parse(sJSON);
        }
    } catch (e) {
        console.log(e);
    }
    return oDefault;
}
