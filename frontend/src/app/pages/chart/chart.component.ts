import { Component, ViewChild } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { BaseChartDirective, Label, Color } from "ng2-charts";

@Component({
    selector: "page-chart",
    templateUrl: "./chart.component.html",
    styles: []
})
export class ChartComponent {
    public lineChartData: ChartDataSets[] = [{
        data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
        label: "Series A"
    }];
    public lineChartLabels: Label[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    public lineChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            yAxes: [
                {
                    id: "y-axis-0",
                    position: "left",
                },
                {
                    id: "y-axis-1",
                    position: "right",
                    gridLines: {
                        color: "rgba(255,0,0,0.3)",
                    },
                    ticks: {
                        fontColor: "red",
                    }
                }
            ]
        }
    };
    public lineChartColors: Color[] = [
        { // grey
          backgroundColor: "rgba(148,159,177,0.2)",
          borderColor: "rgba(148,159,177,1)",
          pointBackgroundColor: "rgba(148,159,177,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(148,159,177,0.8)"
        },
        { // dark grey
          backgroundColor: "rgba(77,83,96,0.2)",
          borderColor: "rgba(77,83,96,1)",
          pointBackgroundColor: "rgba(77,83,96,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(77,83,96,1)"
        },
        { // red
          backgroundColor: "rgba(255,0,0,0.3)",
          borderColor: "red",
          pointBackgroundColor: "rgba(148,159,177,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(148,159,177,0.8)"
        }
      ];

    @ViewChild(BaseChartDirective) private readonly chart: BaseChartDirective;

    constructor() {}

    // tslint:disable-next-line: prefer-function-over-method
    private generateNumber(i: number): number {
        return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
    }

    public pushOne(): void {
        this.lineChartData.forEach((x: ChartDataSets, i: number) => {
            const num: number = this.generateNumber(i);
            const data: number[] = x.data as number[];
            data.push(num);
        });
        this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
    }
}
