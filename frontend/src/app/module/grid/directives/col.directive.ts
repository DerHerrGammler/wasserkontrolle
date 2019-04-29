import { Directive, Input, ElementRef, Renderer2, OnInit } from "@angular/core";
import { isset } from "../../../../lib/helper/_helper";

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: "[col]"
})
export class ColDirective implements OnInit {

    private readonly aSize: string[] = ["", "sm", "md", "lg", "xl"];
    // Size
    @Input() private readonly col: string;
    @Input() private readonly sm: string;
    @Input() private readonly md: string;
    @Input() private readonly lg: string;
    @Input() private readonly xl: string;
    // Offset
    @Input() private readonly offset: string;
    @Input() private readonly smOffset: string;
    @Input() private readonly mdOffset: string;
    @Input() private readonly lgOffset: string;
    @Input() private readonly xlOffset: string;
    // Alignment
    @Input() private readonly align: "start" | "center" | "end";
    // Order
    @Input() private readonly order: string;
    @Input() private readonly smOrder: string;
    @Input() private readonly mdOrder: string;
    @Input() private readonly lgOrder: string;
    @Input() private readonly xlOrder: string;

    constructor(
        private readonly element: ElementRef,
        private readonly renderer: Renderer2
    ) { }

    public ngOnInit(): void {
        this.setCol();
        this.setOffset();
        this.setAlignment();
        this.setOrder();
    }

    private setCol(): void {
        const aCol: string[] = [this.col, this.sm, this.md, this.lg, this.xl];
        aCol.forEach((value: string, index: number) => {
            if (isset(value) && value !== "none") {
                if (value === "flex") {
                    this.addClass("col" + this.responsive(index));
                } else {
                    this.addClass("col" + this.responsive(index) + "-" + value);
                }
            }
        });
    }

    private setOffset(): void {
        const aOffset: string[] = [this.offset, this.smOffset, this.mdOffset, this.lgOffset, this.xlOffset];
        aOffset.forEach((value: string, index: number) => {
            if (isset(value) && value !== "") {
                this.addClass("offset" + this.responsive(index) + "-" + value);
            }
        });
    }

    private setAlignment(): void {
        if (isset(this.align)) {
            this.addClass("align-self-" + this.align);
        }
    }

    private setOrder(): void {
        const aOrder: string[] = [this.order, this.smOrder, this.mdOrder, this.lgOrder, this.xlOrder];
        aOrder.forEach((value: string, index: number) => {
            if (isset(value) && value !== "") {
                this.addClass("order" + this.responsive(index) + "-" + value);
            }
        });
    }

    private responsive(index: number): string {
        let additional: string = "";
        if (this.aSize[index].length !== 0) {
            additional += "-";
        }
        return additional + this.aSize[index];
    }

    private addClass(css: string): void {
        this.renderer.addClass(this.element.nativeElement, css);
    }

}
