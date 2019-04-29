import { Component, OnInit, ElementRef, Renderer2, Input } from "@angular/core";

@Component({
    // tslint:disable-next-line: component-selector
    selector: "container",
    template: "<ng-content></ng-content>",
    styles: []
})
export class ContainerComponent implements OnInit {

    @Input() private readonly flex: string = "false";

    constructor(
        private readonly element: ElementRef,
        private readonly renderer: Renderer2
    ) { }

    public ngOnInit(): void {
        this.addClass("d-block");
        if (this.flex === "true") {
            this.addClass("container-flex");
        } else {
            this.addClass("container");
        }
    }

    private addClass(css: string): void {
        this.renderer.addClass(this.element.nativeElement, css);
    }
}
