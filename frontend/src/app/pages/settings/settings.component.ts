import { Component, OnInit } from "@angular/core";
import { HttpService, RouterService } from "../../services/_services";

@Component({
    selector: "page-settings",
    templateUrl: "./settings.component.html",
    styles: []
})
export class SettingsComponent implements OnInit {

    public isLogged: boolean = false;
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
        color: null,
        valueHigh: null,
        valueLow: null
    };
    public dataHeight: any = {
        intervall: null,
        colorHeight: null,
        colorNorm: null,
        colorLow: null,
        color: null,
        valueHigh: null,
        valueLow: null
    };

    constructor(
        private readonly http: HttpService,
        private readonly router: RouterService
    ) { }

    public async ngOnInit(): Promise<void> {
        await Promise.all([
            this.loadSettings(),
            this.colorTempLoad(),
            this.colorHeightLoad()
        ]);
    }

    public async login(): Promise<void> {
        try {
            if (this.oUser.username === "admin" && this.oUser.password === "admin") {
                this.isLogged = true;
            } else {
                // alert("Benutzername oder Passwort falsch!");
            }
        } catch (oErr) {
            console.log(oErr);
        }
    }

    public async loadSettings(): Promise<void> {
        try {
            const data: any[] = await this.http.get("/Configurations");
            if (data[0]) {
                this.dataTemp = {
                    intervall: data[0].measuringIntervalTemperatur,
                    colorHeight: data[0].highColor,
                    colorNorm: data[0].mediumColor,
                    colorLow: data[0].lowColor,
                    color: this.dataTemp.color,
                    valueHigh: data[0].highValue,
                    valueLow: data[0].lowValue
                };
                this.router.logTemp(data[0].measuringIntervalTemperatur);
            }
            if (data[1]) {
                this.dataHeight = {
                    intervall: data[1].measuringIntervalWaterLevel,
                    colorHeight: data[1].highColor,
                    colorNorm: data[1].mediumColor,
                    colorLow: data[1].lowColor,
                    color: this.dataHeight.color,
                    valueHigh: data[1].highValue,
                    valueLow: data[1].lowValue
                };
                this.router.logTemp(data[1].measuringIntervalWaterLevel);
            }
        } catch (oErr) {
            console.log(oErr);
        }
    }

    // Funktionen für Temp
    public async saveTemp(): Promise<void> {
        try {
            await this.http.put("/Configurations/1", {
                Id: 1,
                measuringIntervalTemperatur: this.dataTemp.intervall,
                HighColor: this.dataTemp.colorHeight,
                MediumColor: this.dataTemp.colorNorm,
                LowColor: this.dataTemp.colorLow,
                HighValue: this.dataTemp.valueHigh,
                LowValue: this.dataTemp.valueLow
            });
            this.router.logTemp(this.dataTemp.intervall);
        } catch (oErr) {
            console.log(oErr);
        }
    }

    public async colorTempLoad(): Promise<void> {
        try {
            const data: any = await this.http.get("/RGBLedGetColor/1/");
            this.dataTemp.color = data;
        } catch (oErr) {
            console.log(oErr);
            // alert("Farbe konnte nicht geladen werden");
        }
    }

    public async colorTemp(): Promise<void> {
        try {
            if (this.dataTemp.color !== null) {
                await this.http.put("/RGBLedSetColor/1/" + String(this.dataTemp.color));
            }
        } catch (oErr) {
            console.log(oErr);
            // alert("Farbe konnte nicht gesetzt werden");
        }
    }

    // Funktionen für Height
    public async saveHeight(): Promise<void> {
        try {
            await this.http.put("/Configurations/2", {
                Id: 2,
                measuringIntervalWaterLevel: this.dataHeight.intervall,
                HighColor: this.dataHeight.colorHeight,
                MediumColor: this.dataHeight.colorNorm,
                LowColor: this.dataHeight.colorLow,
                HighValue: this.dataHeight.valueHigh,
                LowValue: this.dataHeight.valueLow
            });
            this.router.logHeight(this.dataHeight.intervall);
        } catch (oErr) {
            console.log(oErr);
        }
    }

    public async colorHeightLoad(): Promise<void> {
        try {
            const data: any = await this.http.get("/RGBLedGetColor/2/");
            this.dataHeight.color = data;
        } catch (oErr) {
            console.log(oErr);
            // alert("Farbe konnte nicht geladen werden");
        }
    }

    public async colorHeight(): Promise<void> {
        try {
            if (this.dataHeight.color !== null) {
                await this.http.put("/RGBLedSetColor/2/" + String(this.dataHeight.color));
            }
        } catch (oErr) {
            console.log(oErr);
            // alert("Farbe konnte nicht gesetzt werden");
        }
    }
}
