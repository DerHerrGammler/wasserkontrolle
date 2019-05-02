import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../services/_services";

@Component({
    selector: "page-settings",
    templateUrl: "./settings.component.html",
    styles: []
})
export class SettingsComponent implements OnInit {

    public isLogged: boolean = true;
    public oUser: any = {
        username: "",
        password: ""
    };

    public ledColors: any[] = [
        {
            label: "Aus",
            color: "black"
        },
        {
            label: "Rot",
            color: "red"
        },
        {
            label: "Blau",
            color: "blue"
        },
        {
            label: "Grün",
            color: "green"
        },
        {
            label: "Gelb",
            color: "yellow"
        },
        {
            label: "Cyan",
            color: "cyan"
        },
        {
            label: "Magenta",
            color: "magenta"
        },
        {
            label: "Weiß",
            color: "white"
        }
    ];

    public dataTemp: any = {
        intervall: null,
        colorHeight: null,
        colorNorm: null,
        colorLow: null,
        color: null
    };
    public dataHeight: any = {
        intervall: null,
        colorHeight: null,
        colorNorm: null,
        colorLow: null,
        color: null
    };

    constructor(
        private readonly http: HttpService
    ) { }

    public ngOnInit(): void {
    }

    public async login(): Promise<void> {
        try {
            if (this.oUser.username === "admin" && this.oUser.password === "admin") {
                this.isLogged = true;
            } else {
                alert("Benutzername oder Passwort falsch!");
            }
        } catch (oErr) {
            console.log(oErr);
        }
    }

    // Funktionen für Temp
    public async saveTemp(): Promise<void> {
        try {
            await Promise.all([

            ]);
        } catch (oErr) {
            console.log(oErr);
        }
    }

    public async colorTemp(): Promise<void> {
        try {
            if (this.dataTemp.color !== null) {
                await this.http.get("/RGBLedSetColor/1/" + String(this.dataTemp.color));
            }
        } catch (oErr) {
            console.log(oErr);
            alert("Farbe konnte nicht gesetzt werden");
        }
    }

    // Funktionen für Height
    public async saveHeight(): Promise<void> {
        try {
            await Promise.all([

            ]);
        } catch (oErr) {
            console.log(oErr);
        }
    }

    public async colorHeight(): Promise<void> {
        try {
            if (this.dataHeight.color !== null) {
                await this.http.get("/RGBLedSetColor/2/" + String(this.dataHeight.color));
            }
        } catch (oErr) {
            console.log(oErr);
            alert("Farbe konnte nicht gesetzt werden");
        }
    }
}
