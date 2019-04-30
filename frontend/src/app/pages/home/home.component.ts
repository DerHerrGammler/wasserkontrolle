import { Component, OnInit } from "@angular/core";
import { RouterService } from "../../services/_services";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color } from "ng2-charts";
import { delay } from "../../../lib/helper/_helper";

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
    public labelTemp: number[] = [];
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
        public readonly router: RouterService
    ) { }

    public async ngOnInit(): Promise<void> {
        await Promise.all([
            this.loadTemp(),
            this.loadHeight()
        ]);
    }

    public async loadTemp(): Promise<void> {
        try {
            this.isloadTemp = true;
            await delay(750);
            this.isloadTemp = false;
        } catch (oErr) {
            console.log(oErr);
        }
    }

    public async loadHeight(): Promise<void> {
        try {
            this.isloadHeight = true;
            await delay(500);
            this.isloadHeight = false;
        } catch (oErr) {
            console.log(oErr);
        }
    }

}
