import { Directive, ElementRef, Renderer2, OnInit, Input, HostListener } from "@angular/core";
import { Render } from "../../../../lib/extend/componment/render";

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: "[height]"
})
export class HeightDirective extends Render implements OnInit {

    @Input() private readonly height: string;

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
        if (this.height === "auto") {
            this.addStyle("height", "auto");
        } else {
            this.addStyle("height", "calc(" + this.height + ")");
        }
    }

}
