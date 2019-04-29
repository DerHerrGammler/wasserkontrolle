import { cloneObject, isset } from "../../../lib/helper/_helper";

export class DBHandler {

    // Datebankfelder
    public fields: any = {};
    private mirror: any = {};

    constructor() {
        this.mirror = cloneObject(this.fields);
    }

    // Funktionen
    public get(sFieldname: string): any {
        let nValue: any;
        // Prüfen ob das Feld in der Klasse vorhanden ist
        if (!isset(this.fields[sFieldname])) {
            // Prüfen ob ein field-feld mit dem Inhalt gibt
            const oFields: any = this.get("fielddata");
            if (!isset(oFields[sFieldname])) {
                oFields[sFieldname] = "";
            }
            nValue = oFields[sFieldname];
        } else {
            nValue = this.fields[sFieldname].value;
        }
        // Wert Anpassen für bestimmte Typen
        switch (typeof nValue) {
            case "string":
                nValue.trim();
        }
        // Feld aus Klasse zurück geben
        return nValue;
    }

    public getFields(aFields: string[]): any {
        let i: number = 0;
        const oReturn: any = {};
        while (i < aFields.length) {
            oReturn[aFields[i]] = this.get(aFields[i]);
            i += 1;
        }
    }

    public getChangedKeys(): string[] {
        const aKeys: string[] = [];
        Object.keys(this.fields).forEach((key: string) => {
            if (this.fields[key] && this.mirror[key]) {
                if (JSON.stringify(this.fields[key].value) !== JSON.stringify(this.mirror[key].value)) {
                    aKeys.push(key);
                }
            }
        });
        return aKeys;
    }

    public getPrimarykey(): string {
        let sKey: string = "";
        Object.keys(this.fields).map((key: string) => {
            if (this.fields[key].type === "primaryid") {
                sKey = key;
            }
        });
        return sKey;
    }

    public set(sFieldname: string, val: any): void {
        // Prüfen ob das Feld in der Klasse vorhanden ist
        if (isset(this.fields[sFieldname])) {
            this.fields[sFieldname].value = val;
        } else {
            // Das field als neues field in den fields anlegen
            const oFields: any = this.get("fielddata");
            oFields[sFieldname] = val;
            this.set("fielddata", oFields);
        }
    }

    public setFields(oFields: any): void {
        const aKeys: string[] =  Object.keys(oFields);
        let i: number = 0;
        while (i < aKeys.length) {
            if (aKeys[i] !== "fielddata" &&
                isset(oFields[aKeys[i]])) {
                this.set(aKeys[i], oFields[aKeys[i]]);
            }
            i += 1;
        }
    }

    public reset(sFieldname: string): void {
        this.set(sFieldname, "");
    }

    public toJSON(aFields?: string[]): any {
        // Ein JSON-Object für die Rückgabe erstellen
        const oReturn: any = {};
        // Alle Felder der Klasse durchgehen
        Object.keys(this.fields).forEach((key: string) => {
            if (key !== "fielddata") {
                if (!aFields || aFields.indexOf(key) !== -1) {
                    oReturn[key] = this.get(key);
                }
            } else {
                // Alle Felder der fields durchgehen
                const oFields: any = this.get(key);
                Object.keys(oFields).forEach((field: string) => {
                    if (!aFields || aFields.indexOf(field) !== -1) {
                        oReturn[field] = oFields[field];
                    }
                });
            }
        });
        return oReturn;
    }

    public fromJSON(oJSON: any): void {
        const aKeys: string[] =  Object.keys(oJSON);
        let i: number = 0;
        while (i < aKeys.length) {
            this.set(aKeys[i], oJSON[aKeys[i]]);
            i += 1;
        }
        this.mirror = cloneObject(this.fields);
    }
}

export class DBField {
    public name: string = "";
    public type: string = "string";
    public value: string = "";
    public chars: number = 0;
    public key: string = "N"; // P = Primary; U = Unique; K = Key; N = None
    public keygroup: number = 0;
    public min: number = 0;
    public max: number = 0;
    public reference: string = "";

    constructor(
        type: string = "",
        defaultvalue: any = "",
        chars: number = 0,
        key: string = "N",
        keygroup: number = 0,
        min: number = 0,
        max: number = 0,
        reference: string = ""
    ) {
        if (type === "object" || defaultvalue === "{}") {
            defaultvalue = {};
        } else if (type === "array" || defaultvalue === "[]") {
            defaultvalue = [];
        }
        // Felder setzen
        this.type = type;
        this.value = defaultvalue;
        this.chars = chars;
        this.key = key;
        this.keygroup = keygroup;
        this.min = min;
        this.max = max;
        this.reference = reference;
    }

    public toJSON(): object {
        return {
            "name": this.name,
            "type": this.type,
            "value": this.value,
            "chars": this.chars,
            "key": this.key,
            "keygroup": this.keygroup,
            "min": this.min,
            "max": this.max,
            "reference": this.reference
        };
    }
}
