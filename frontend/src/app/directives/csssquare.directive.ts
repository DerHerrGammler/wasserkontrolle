import { Directive, HostListener, ElementRef, AfterContentChecked, AfterViewInit, Input } from "@angular/core";

/**
 * Verwendung:
 *      <div cssSquare [cssHeight]="'35px'">Sqare</div>
 * oder
 *      <div cssSquare [cssWidth]="'35%'">Sqare</div>
 */

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: "[cssSquare]"
})
export class CssSquareDirective implements AfterViewInit, AfterContentChecked {

    private el: HTMLElement;
    private sAdjustment: string;
    private sClientWidth: number;
    private sClientHeight: number;

    @Input("adjustment")
    protected get adjustment(): string {
        return this.sAdjustment;
    }
    protected set adjustment(val: string) {
        switch (val) {
            case "height":
            case "width": {
                this.sAdjustment = val;
                break;
            }
            default: {
                this.sAdjustment = "width";
            }
        }
    }

    @HostListener("window:resize", ["$event.target"])
    public onResize(element: HTMLElement): void {
        // Only apply adjustment if element size changed
        if (this.el.clientWidth === this.sClientWidth
            && this.el.clientHeight === this.sClientHeight) {
            return;
        }
        this.sClientWidth = this.element.nativeElement.clientWidth;
        this.sClientHeight = this.element.nativeElement.clientHeight;
        this.adjust();
    }

    constructor(
        public element: ElementRef
    ) {
        this.el = element.nativeElement;
        this.sClientWidth = this.el.clientWidth;
        this.sClientHeight = this.el.clientHeight;
    }

    public ngAfterViewInit(): void {
        // set element resize allowed manually by user
        const style: CSSStyleDeclaration = window.getComputedStyle(this.el, null);
        if (style.resize === "both") {
            this.el.style.resize = "horizontal";
        } else if (style.resize === "vertical") {
            this.el.style.resize = "none";
        }
        // run first adjust
        this.adjust();
    }

    public ngAfterContentChecked(): void {
        if (this.el.clientHeight !== 0) {
            this.sClientHeight = this.el.clientHeight;
        }
        if (this.el.clientWidth !== 0) {
            this.sClientWidth = this.el.clientWidth;
        }
        // run adjust after loaded contend
        this.adjust();
    }

    private adjust(): void {
        switch (this.sAdjustment) {
            case "height": {
                this.setHeight();
                break;
            }
            case "width": {
                this.setWidth();
            }
        }
    }

    private setHeight(): void {
        this.el.style.height = String(this.sClientWidth) + "px";
    }

    private setWidth(): void {
        this.el.style.width = String(this.sClientHeight) + "px";
    }
}
