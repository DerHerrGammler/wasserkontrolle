// import { compareObject } from "./_object";


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Functions
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function arrayMoveItem(aArray: any[], iFrom: number, iTo: number): void {
    aArray.splice(iTo, 0, aArray.splice(iFrom, 1)[0]);
}

// export function compareArray(aArr1: any[], aArr2: any[]): boolean {
//     // Compare two Array and returns true if they are the same.
//     if (!aArr1 || !aArr2) {
//         return false;
//     }

//     if (aArr1.length !== aArr2.length) {
//         return false;
//     }

//     let n: number = 0;
//     while (n < aArr1.length) {
//         if (aArr1[n] instanceof Array &&
//             aArr2[n] instanceof Array) {
//             if (!compareArray(aArr1[n], aArr2[n])) {
//                 return false;
//             }
//         } else if (aArr1[n] instanceof Object &&
//             aArr2[n] instanceof Object) {
//             /* REQUIRES compareObject */
//             if (!compareObject(aArr1[n], aArr2[n])) {
//                 return false;
//             }
//         } else if (aArr1[n] !== aArr2[n]) {
//             return false;
//         }
//         n += 1;
//     }
//     return true;
// }

export function arrayDelete(aArray: any[], index: number): void {
    aArray.splice(index, 1);
}

export function uniqueArray(aArray: any[]): any[] {
    const oSeen: any = {};
    return aArray.filter((oItem: any) => {
        if (oSeen.hasOwnProperty(oItem)) {
            return false;
        }
        oSeen[oItem] = true;
        return true;
    });
}

export function uniqueObjectArray(aArray: object[], sKey: string): object[] {
    const oSeen: any = {};
    return aArray.filter((oItem: object) => {
        if (oSeen.hasOwnProperty(oItem[sKey])) {
            return false;
        } else {
            oSeen[oItem[sKey]] = true;
            return true;
        }
    });
}

export function shuffleArray(aArray: any[]): void {
    let i: number = aArray.length;
    let j: number = 0;
    let x: number = 0;
    while (i > 0) {
        j = Math.floor(Math.random() * i);
        x = aArray[i - 1];
        aArray[i - 1] = aArray[j];
        aArray[j] = x;
        i -= 1;
    }
}
