import { Component, OnInit, ElementRef, Renderer2, HostListener, Input, AfterViewChecked } from "@angular/core";
import { Render } from "../../../../lib/extend/componment/render";
import { isset } from "../../../../lib/helper/_helper";
import { RouterService } from "../../../services/_services";

@Component({
    selector: "widget-screen-pic",
    template: "<ng-content></ng-content>",
    styles: []
})
export class WidgetScreenPicComponent extends Render implements OnInit, AfterViewChecked {

    @Input() private readonly src: string;
    @Input() private readonly margin: string;

    @HostListener("window:resize")
    public onResize(): void {
        this.resize();
    }
    @HostListener("click")
    public onClick(): void {
        const element: HTMLElement = this.element.nativeElement;
        if (element.id !== "") {
            this.router.scrollId(element.id);
        }
    }

    constructor(
        private readonly element: ElementRef,
        renderer: Renderer2,
        private readonly router: RouterService
    ) {
        super(element, renderer);
    }

    public ngOnInit(): void {
        this.addClass("d-block");
        this.resize();

        this.addClass("background-img");
        this.addStyle("background-image", "url(" + this.src + ")");
        if (isset(this.margin)) {
            this.addStyle("margin-left", this.margin + "px");
            this.addStyle("margin-right", this.margin + "px");
        }
    }

    public ngAfterViewChecked(): void {
        this.resize();
    }

    private resize(): void {
        const element: HTMLElement = this.element.nativeElement;
        if (element.scrollHeight > window.innerHeight) {
            this.addStyle("height", String(element.scrollHeight) + "px");
        } else {
            this.addStyle("height", String(window.innerHeight) + "px");
        }
    }

}
