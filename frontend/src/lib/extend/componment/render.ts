import { ElementRef, Renderer2 } from "@angular/core";


export class Render {

    constructor(
        private readonly el: ElementRef,
        private readonly ren: Renderer2
    ) { }

    public addStyle(style: string, value: any): void {
        this.ren.setStyle(this.el.nativeElement, style, value);
    }

    public addClass(css: string): void {
        this.ren.addClass(this.el.nativeElement, css);
    }

}
