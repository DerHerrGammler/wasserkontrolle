import { Component, OnInit } from "@angular/core";
import { RouterService } from "../../services/_services";

@Component({
    selector: "page-home",
    templateUrl: "./home.component.html",
    styles: []
})
export class PageHomeComponent implements OnInit {

    constructor(
        public readonly router: RouterService
    ) { }

    public ngOnInit(): void {
    }

}
