import { Directive, Input, ElementRef, Renderer2, OnInit } from "@angular/core";

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: "div [container]"
})
export class ContainerDirective implements OnInit {

    @Input() private readonly container: string;

    constructor(
        private readonly element: ElementRef,
        private readonly renderer: Renderer2
    ) { }

    public ngOnInit(): void {
        if (this.container === "flex") {
            this.addClass("container-flex");
        } else {
            this.addClass("container");
        }
    }

    private addClass(css: string): void {
        this.renderer.addClass(this.element.nativeElement, css);
    }

}
