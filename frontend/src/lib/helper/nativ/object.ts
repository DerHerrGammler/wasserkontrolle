// import { compareArray } from "./_array";
import { isObject } from "./util";


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Functions
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function deepMergeObject(obj1: object, obj2: object): any {
    const obj3: object = {};
    Object.keys(obj1).forEach((key: string) => {
        if (isObject(obj1[key])) {
            obj3[key] = deepMergeObject({}, obj1[key]);
        } else {
            obj3[key] = obj1[key];
        }
    });
    Object.keys(obj2).forEach((key: string) => {
        if (obj3[key]) {
            if (isObject(obj2[key])) {
                if (isObject(obj3[key])) {
                    obj3[key] = deepMergeObject(obj3[key], obj2[key]);
                } else {
                    obj3[key] = deepMergeObject({}, obj2[key]);
                }
            } else {
                obj3[key] = obj2[key];
            }
        } else {
            if (isObject(obj2[key])) {
                obj3[key] = deepMergeObject({}, obj2[key]);
            } else {
                obj3[key] = obj2[key];
            }
        }
    });
    return obj3;
}

export function cloneObject(oObject: any): any {
    const jsonString: string = JSON.stringify(oObject);
    return JSON.parse(jsonString);
}

// export function compareObject(oObj1: object, oObj2: object): boolean {
//     // Compare two Object and returns true if they are the same.
//     if (!oObj1 || !oObj2) {
//         return false;
//     }

//     let propName: string;
//     for (propName in oObj1) {
//         if (oObj1.hasOwnProperty(propName) !== oObj2.hasOwnProperty(propName)) {
//             return false;
//         } else if (typeof oObj1[propName] !== typeof oObj2[propName]) {
//             return false;
//         }
//     }

//     for (propName in oObj2) {
//         if (oObj2.hasOwnProperty(propName)) {
//             if (oObj1.hasOwnProperty(propName) !== oObj2.hasOwnProperty(propName)) {
//                 return false;
//             } else if (typeof oObj1[propName] !== typeof oObj2[propName]) {
//                 return false;
//             }

//             if (!oObj1.hasOwnProperty(propName)) {
//                 continue;
//             }

//             if (oObj1[propName] instanceof Array &&
//                 oObj2[propName] instanceof Array) {
//                 /* REQUIRES compareArray */
//                 if (!compareArray(oObj1[propName], oObj2[propName])) {
//                     return false;
//                 }
//             } else if (oObj1[propName] instanceof Object &&
//                 oObj2[propName] instanceof Object) {
//                 if (compareObject(oObj1[propName], oObj2[propName])) {
//                     return false;
//                 }
//             } else if (oObj1[propName] !== oObj2[propName]) {
//                 return false;
//             }
//         }
//     }
//     return true;
// }

export function objectCountKeys(oObject: object): number {
    return Object.keys(oObject).length;
}

export function objectKeys(oObject: object): string[] {
    return Object.keys(oObject);
}

export function convertJSONToString(oObject: object): string {
    let sJSON: string = "";
    try {
        if (typeof oObject === "object") {
            sJSON = JSON.stringify(oObject);
            const map: any = {
                "'": "&#039;"
            };
            sJSON = sJSON.replace(/[']/g, (m: any) => map[m]);
        }
    } catch (e) {
        console.log(e);
    }
    return sJSON;
}
