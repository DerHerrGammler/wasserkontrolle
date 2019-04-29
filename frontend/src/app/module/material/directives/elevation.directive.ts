import { Directive, ElementRef, Renderer2, Input, OnInit } from "@angular/core";

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: "[elevation]"
})
export class ElevationDirective implements OnInit {

    @Input() private readonly elevation: string = "2";

    constructor(
        private readonly element: ElementRef,
        private readonly renderer: Renderer2
    ) { }

    public ngOnInit(): void {
        const iElevation: number = parseInt(this.elevation, 10);
        if (iElevation >= 0 && iElevation <= 24) {
            this.addClass("mat-elevation-z" + String(iElevation));
        }
    }

    private addClass(css: string): void {
        this.renderer.addClass(this.element.nativeElement, css);
    }

}
