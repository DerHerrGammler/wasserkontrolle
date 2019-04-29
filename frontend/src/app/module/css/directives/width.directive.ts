import { Directive, OnInit, ElementRef, Renderer2, Input, HostListener } from "@angular/core";
import { Render } from "../../../../lib/extend/componment/render";

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: "[width]"
})
export class WidthDirective extends Render implements OnInit {

    @Input() private readonly width: string;

    @HostListener("window:resize")
    public onResize(): void {
        this.resize();
    }

    constructor(
        element: ElementRef,
        renderer: Renderer2
    ) {
        super(element, renderer);
    }

    public ngOnInit(): void {
        this.resize();
    }

    private resize(): void {
        if (this.width === "auto") {
            this.addStyle("width", "auto");
        } else {
            this.addStyle("width", "calc(" + this.width + ")");
        }
    }
}
