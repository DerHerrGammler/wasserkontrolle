import { Component, OnInit } from "@angular/core";
import { Platform } from "@angular/cdk/platform";


@Component({
    selector: "widget-wip",
    templateUrl: "./wip.component.html",
    styles: []
})
export class WidgetWipComponent implements OnInit {

    constructor(
        public readonly platform: Platform
    ) { }

    public ngOnInit(): void { }

}
