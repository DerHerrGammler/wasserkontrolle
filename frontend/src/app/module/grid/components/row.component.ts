import { Component, OnInit, ElementRef, Renderer2, Input } from "@angular/core";
import { isset } from "../../../../lib/helper/_helper";

@Component({
    // tslint:disable-next-line: component-selector
    selector: "row",
    template: "<ng-content></ng-content>",
    styles: []
})
export class RowComponent implements OnInit {

    @Input() private readonly gutter: string = "true";
    @Input() private readonly align: "start" | "center" | "end";
    @Input() private readonly justify: "start" | "center" | "end" | "around" | "between";

    constructor(
        private readonly element: ElementRef,
        private readonly renderer: Renderer2
    ) { }

    public ngOnInit(): void {
        this.addClass("row");
        if (this.gutter === "false") {
            this.addClass("no-gutters");
        }
        if (isset(this.align)) {
            this.addClass("align-items-" + this.align);
        }
        if (isset(this.justify)) {
            this.addClass("justify-content-" + this.justify);
        }
    }

    private addClass(css: string): void {
        this.renderer.addClass(this.element.nativeElement, css);
    }

}
