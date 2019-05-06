import { Component, OnInit } from "@angular/core";
import { RouterService, HttpService } from "../../services/_services";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color } from "ng2-charts";
import { rand, delay } from "../../../lib/helper/_helper";

@Component({
    selector: "page-home",
    templateUrl: "./home.component.html",
    styles: []
})
export class PageHomeComponent implements OnInit {

    // Charts Data
        // Chart Temp
    public isloadTemp: boolean = true;
    public dataTemp: ChartDataSets[] = [
        { data: [], label: "Temperatur" }
    ];
    public nowTemp: number = 0;
    public labelTemp: string[] = [];
    public requestTemp: any = {
        intervall: "day"
    };
        // Chart Height
    public isloadHeight: boolean = true;
    public dataHeight: ChartDataSets[] = [
        { data: [], label: "Wasserabstand" }
    ];
    public nowHeight: number = 0;
    public labelHeight: string[] = [];
    public requestHeight: any = {
        intervall: "day"
    };
    // Generell Chart Options
    public chartOptions: ChartOptions = {
        responsive: true,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };
    public chartColor: Color[] = [
        { // blue
            backgroundColor: "rgba(72, 99, 255, 0.2)",
            borderColor: "rgba(72, 99, 255, 1)",
            pointBackgroundColor: "rgba(72, 99, 255, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(72, 99, 255, 0.5)"
        }
    ];

    public configTemp: any = {
        intervall: null,
        colorHeight: null,
        colorNorm: null,
        colorLow: null,
        color: null,
        valueHigh: null,
        valueLow: null
    };
    public configHeight: any = {
        intervall: null,
        colorHeight: null,
        colorNorm: null,
        colorLow: null,
        color: null,
        valueHigh: null,
        valueLow: null
    };

    constructor(
        public readonly router: RouterService,
        public readonly http: HttpService
    ) { }

    public async ngOnInit(): Promise<void> {
        await this.loadSettings();
        await Promise.all([
            this.loadTemp(),
            this.loadHeight()
        ]);
        // tslint:disable-next-line: no-string-literal
        this.router.timer["live"] = setInterval(async () => {
            await Promise.all([
                this.liveTemp(),
                this.liveHeight()
            ]);
        }, 5000);
    }

    // Funktionen Temp
    public async loadTemp(): Promise<void> {
        try {
            this.isloadTemp = true;
            await delay(250);
            await this.liveTemp();
            await this.chartTemp();
            this.isloadTemp = false;
        } catch (oErr) {
            console.log(oErr);
        }
    }

    public async liveTemp(): Promise<void> {
        try {
            const data: any = await this.http.get("/TemperaturLiveData");
            this.nowTemp = data;
            if (this.nowTemp >= this.configTemp.valueHigh) {
                await this.http.put("/RGBLedSetColor/1/" + String(this.configTemp.colorHeight));
            } else if (this.nowTemp <= this.configTemp.valueLow) {
                await this.http.put("/RGBLedSetColor/1/" + String(this.configTemp.colorLow));
            } else {
                await this.http.put("/RGBLedSetColor/1/" + String(this.configTemp.colorNorm));
            }
        } catch (oErr) {
            console.log(oErr);
            // alert("Livedaten für Wassertemperatur konnten nicht geladen werden");
        }
    }

    public async chartTemp(): Promise<void> {
        try {
            const data: string[][] = await this.http.get("/TemperatureHistory");
            let aData: {
                value: number;
                time: Date;
                values: number[];
            }[] = [];
            data.forEach((value: any, index: number) => {
                const date: Date = new Date(value.p2);
                switch (this.requestHeight.intervall) {
                    case "hour": {
                        if (index === 0 || aData[aData.length - 1].time.getTime() + 1000 * 60 <= date.getTime()) {
                            aData.push({
                                value: 0,
                                time: new Date(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    date.getDate(),
                                    date.getHours(),
                                    date.getMinutes()),
                                values: []
                            });
                        }
                        aData[aData.length - 1].values.push(parseFloat(value.p1));
                        break;
                    }
                    case "day": {
                        if (index === 0 || aData[aData.length - 1].time.getTime() + 1000 * 60 * 10 <= date.getTime()) {
                            aData.push({
                                value: 0,
                                time: new Date(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    date.getDate(),
                                    date.getHours(),
                                    parseInt(date.getMinutes() >= 10 ? String(date.getMinutes()).charAt(0) + "0" : "0", 10)),
                                values: []
                            });
                        }
                        aData[aData.length - 1].values.push(parseFloat(value.p1));
                        break;
                    }
                    case "week": {
                        if (index === 0 || aData[aData.length - 1].time.getTime() + 1000 * 60 * 60 <= date.getTime()) {
                            aData.push({
                                value: 0,
                                time: new Date(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    date.getDate(),
                                    date.getHours()),
                                values: []
                            });
                        }
                        aData[aData.length - 1].values.push(parseFloat(value[0]));
                        break;
                    }
                    case "month": {
                        if (index === 0 || aData[aData.length - 1].time.getTime() + 1000 * 60 * 60 * 24 <= date.getTime()) {
                            aData.push({
                                value: 0,
                                time: new Date(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    date.getDate()),
                                values: []
                            });
                        }
                        aData[aData.length - 1].values.push(parseFloat(value.p1));
                        break;
                    }
                    case "year": {
                        if (index === 0 || aData[aData.length - 1].time.getTime() + 1000 * 60 * 60 * 24 * 7 <= date.getTime()) {
                            aData.push({
                                value: 0,
                                time: new Date(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    date.getDate()),
                                values: []
                            });
                        }
                        aData[aData.length - 1].values.push(parseFloat(value[0]));
                        break;
                    }
                    default: {
                        aData.push({
                            value: 0,
                            time: new Date(value.p2),
                            values: [parseFloat(value.p1)]
                        });
                    }
                }
            });
            aData = aData.map((value: { value: number; time: Date; values: number[] }) => {
                let sum: number = 0;
                value.values.forEach((num: number) => {
                    sum += num;
                });
                value.value = sum / value.values.length;
                return value;
            });
            this.dataTemp[0].data = [];
            this.labelTemp = [];
            aData.forEach((value: { value: number; time: Date; values: number[] }, index: number) => {
                this.dataTemp[0].data[index] = value.value;
                const date: Date = new Date(value.time);
                let sFormat: string = "";
                switch (this.requestHeight.intervall) {
                    case "hour": {
                        sFormat += String(date.getHours()) + ":" + String(date.getMinutes());
                        break;
                    }
                    case "day": {
                        sFormat += String(date.getHours()) + ":" + String(date.getMinutes());
                        break;
                    }
                    case "week": {
                        sFormat += String(date.getHours()) + " Uhr";
                        break;
                    }
                    case "month": {
                        sFormat += String(date.getDate()) + "." + String(date.getMonth() + 1) + "." + String(date.getFullYear());
                        break;
                    }
                    case "year": {
                        sFormat += String(date.getDate()) + "." + String(date.getMonth() + 1) + "." + String(date.getFullYear());
                        break;
                    }
                    default: {
                        sFormat += String(index);
                    }
                }
                this.labelTemp.push(sFormat);
            });
        } catch (oErr) {
            console.log(oErr);
            // alert("Tabellendaten für Wassertemperatur konnten nicht geladen werden");
        }
    }

    // Funktionen Height
    public async loadHeight(): Promise<void> {
        try {
            this.isloadHeight = true;
            await delay(250);
            await this.liveHeight();
            await this.chartHeight();
            this.isloadHeight = false;
        } catch (oErr) {
            console.log(oErr);
        }
    }

    public async liveHeight(): Promise<void> {
        try {
            const data: any = await this.http.get("/UltrasonicLiveData");
            this.nowHeight = data[0];
            if (this.nowHeight >= this.configHeight.valueHigh) {
                await this.http.put("/RGBLedSetColor/2/" + String(this.configHeight.colorHeight));
            } else if (this.nowHeight <= this.configHeight.valueLow) {
                await this.http.put("/RGBLedSetColor/2/" + String(this.configHeight.colorLow));
            } else {
                await this.http.put("/RGBLedSetColor/2/" + String(this.configHeight.colorNorm));
            }
        } catch (oErr) {
            console.log(oErr);
            // alert("Livedaten für Wasserabstand konnten nicht geladen werden");
        }
    }

    public async chartHeight(): Promise<void> {
        try {
            const data: string[][] = await this.http.get("/WaterLevelHistory");
            let aData: {
                value: number;
                time: Date;
                values: number[];
            }[] = [];
            data.forEach((value: any, index: number) => {
                const date: Date = new Date(value.p2);
                switch (this.requestHeight.intervall) {
                    case "hour": {
                        if (index === 0 || aData[aData.length - 1].time.getTime() + 1000 * 60 <= date.getTime()) {
                            aData.push({
                                value: 0,
                                time: new Date(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    date.getDate(),
                                    date.getHours(),
                                    date.getMinutes()),
                                values: []
                            });
                        }
                        aData[aData.length - 1].values.push(parseFloat(value.p1));
                        break;
                    }
                    case "day": {
                        if (index === 0 || aData[aData.length - 1].time.getTime() + 1000 * 60 * 10 <= date.getTime()) {
                            aData.push({
                                value: 0,
                                time: new Date(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    date.getDate(),
                                    date.getHours(),
                                    parseInt(date.getMinutes() >= 10 ? String(date.getMinutes()).charAt(0) + "0" : "0", 10)),
                                values: []
                            });
                        }
                        aData[aData.length - 1].values.push(parseFloat(value.p1));
                        break;
                    }
                    case "week": {
                        if (index === 0 || aData[aData.length - 1].time.getTime() + 1000 * 60 * 60 <= date.getTime()) {
                            aData.push({
                                value: 0,
                                time: new Date(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    date.getDate(),
                                    date.getHours()),
                                values: []
                            });
                        }
                        aData[aData.length - 1].values.push(parseFloat(value.p1));
                        break;
                    }
                    case "month": {
                        if (index === 0 || aData[aData.length - 1].time.getTime() + 1000 * 60 * 60 * 24 <= date.getTime()) {
                            aData.push({
                                value: 0,
                                time: new Date(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    date.getDate()),
                                values: []
                            });
                        }
                        aData[aData.length - 1].values.push(parseFloat(value.p1));
                        break;
                    }
                    case "year": {
                        if (index === 0 || aData[aData.length - 1].time.getTime() + 1000 * 60 * 60 * 24 * 7 <= date.getTime()) {
                            aData.push({
                                value: 0,
                                time: new Date(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    date.getDate()),
                                values: []
                            });
                        }
                        aData[aData.length - 1].values.push(parseFloat(value.p1));
                        break;
                    }
                    default: {
                        aData.push({
                            value: 0,
                            time: new Date(value.p2),
                            values: [parseFloat(value.p1)]
                        });
                    }
                }
            });
            aData = aData.map((value: { value: number; time: Date; values: number[] }) => {
                let sum: number = 0;
                value.values.forEach((num: number) => {
                    sum += num;
                });
                value.value = sum / value.values.length;
                return value;
            });
            this.dataHeight[0].data = [];
            this.labelHeight = [];
            aData.forEach((value: { value: number; time: Date; values: number[] }, index: number) => {
                this.dataHeight[0].data[index] = value.value;
                const date: Date = new Date(value.time);
                let sFormat: string = "";
                switch (this.requestHeight.intervall) {
                    case "hour": {
                        sFormat += String(date.getHours()) + ":" + String(date.getMinutes());
                        break;
                    }
                    case "day": {
                        sFormat += String(date.getHours()) + ":" + String(date.getMinutes());
                        break;
                    }
                    case "week": {
                        sFormat += String(date.getHours()) + " Uhr";
                        break;
                    }
                    case "month": {
                        sFormat += String(date.getDate()) + "." + String(date.getMonth() + 1) + "." + String(date.getFullYear());
                        break;
                    }
                    case "year": {
                        sFormat += String(date.getDate()) + "." + String(date.getMonth() + 1) + "." + String(date.getFullYear());
                        break;
                    }
                    default: {
                        sFormat += String(index);
                    }
                }
                this.labelHeight.push(sFormat);
            });
        } catch (oErr) {
            console.log(oErr);
            // alert("Tabellendaten für Wasserabstand konnten nicht geladen werden");
        }
    }

    // BLA
    public async loadSettings(): Promise<void> {
        try {
            const data: any[] = await this.http.get("/Configurations");
            console.log(data);
            if (data[0]) {
                this.configTemp = {
                    intervall: data[0].measuringIntervalTemperatur,
                    colorHeight: data[0].highColor,
                    colorNorm: data[0].mediumColor,
                    colorLow: data[0].lowColor,
                    color: this.configTemp.color,
                    valueHigh: data[0].highValue,
                    valueLow: data[0].lowValue
                };
                this.router.logTemp(data[0].measuringIntervalTemperatur);
            }
            if (data[1]) {
                this.configHeight = {
                    intervall: data[1].measuringIntervalWaterLevel,
                    colorHeight: data[1].highColor,
                    colorNorm: data[1].mediumColor,
                    colorLow: data[1].lowColor,
                    color: this.configHeight.color,
                    valueHigh: data[1].highValue,
                    valueLow: data[1].lowValue
                };
                this.router.logTemp(data[0].measuringIntervalWaterLevel);
            }
        } catch (oErr) {
            console.log(oErr);
        }
    }
}
