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
        { data: [], label: "Wasserstand" }
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

    constructor(
        public readonly router: RouterService,
        public readonly http: HttpService
    ) { }

    public async ngOnInit(): Promise<void> {
        await Promise.all([
            this.loadTemp(),
            this.loadHeight()
        ]);
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
            data.forEach((value: string[], index: number) => {
                const date: Date = new Date(value[1]);
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
                        aData[aData.length - 1].values.push(parseFloat(value[0]));
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
                        aData[aData.length - 1].values.push(parseFloat(value[0]));
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
                        aData[aData.length - 1].values.push(parseFloat(value[0]));
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
                            time: new Date(value[1]),
                            values: [parseFloat(value[0])]
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
        } catch (oErr) {
            console.log(oErr);
            // alert("Livedaten für Wasserstand konnten nicht geladen werden");
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
            data.forEach((value: string[], index: number) => {
                const date: Date = new Date(value[1]);
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
                        aData[aData.length - 1].values.push(parseFloat(value[0]));
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
                        aData[aData.length - 1].values.push(parseFloat(value[0]));
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
                        aData[aData.length - 1].values.push(parseFloat(value[0]));
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
                            time: new Date(value[1]),
                            values: [parseFloat(value[0])]
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
            // alert("Tabellendaten für Wasserstand konnten nicht geladen werden");
        }
    }

}
