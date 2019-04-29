import { Input, AfterViewInit, ElementRef, HostListener, Directive, AfterContentChecked } from "@angular/core";

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: "textarea [autosize]"
})
export class AutosizeDirective implements AfterViewInit, AfterContentChecked {

    private el: HTMLElement;
    private sMinHeight: string;
    private sMaxHeight: string;
    private sLastHeight: number;
    private sClientWidth: number;

    @Input("minHeight")
    protected get minHeight(): string {
        return this.sMinHeight;
    }
    protected set minHeight(val: string) {
        this.sMinHeight = val;
        this.updateMinHeight();
    }

    @Input("maxHeight")
    protected get maxHeight(): string {
        return this.sMaxHeight;
    }
    protected set maxHeight(val: string) {
        this.sMaxHeight = val;
        this.updateMaxHeight();
    }

    @HostListener("window:resize", ["$event.target"])
    public onResize(textArea: HTMLTextAreaElement): void {
        // Only apply adjustment if element width had changed.
        if (this.el.clientWidth === this.sClientWidth) {
            return;
        }
        this.sClientWidth = this.element.nativeElement.clientWidth;
        this.adjust();
    }

    @HostListener("input", ["$event.target"])
    public onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }

    constructor(public element: ElementRef) {
        this.el = element.nativeElement;
        this.sClientWidth = this.el.clientWidth;
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
        // run secound adjust for model init
        this.adjust();
    }

    private adjust(): void {
        // perform height adjustments after input changes, if height is different
        if (this.el.style.height === this.element.nativeElement.scrollHeight + "px") {
            return;
        }
        this.el.style.overflow = "hidden";
        this.el.style.height = "auto";
        this.el.style.height = this.el.scrollHeight + "px";
    }

    private updateMinHeight(): void {
        // Set textarea min height if input defined
        this.el.style.minHeight = this.sMinHeight + "px";
    }

    private updateMaxHeight(): void {
        // Set textarea max height if input defined
        this.el.style.maxHeight = this.sMaxHeight + "px";
    }

}
