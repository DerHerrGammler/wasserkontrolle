import { Component, OnInit, ElementRef, Renderer2, Input } from "@angular/core";
import { isset } from "../../../../lib/helper/_helper";

@Component({
    // tslint:disable-next-line: component-selector
    selector: "column",
    template: "<ng-content></ng-content>",
    styles: []
})
export class ColComponent implements OnInit {

    private readonly aSizes: string[] = ["xs", "sm", "md", "lg", "xl"];
    private readonly aFormat: string[] = ["", "sm", "md", "lg", "xl"];
    // Size
    @Input() private readonly xs: string;
    @Input() private readonly sm: string;
    @Input() private readonly md: string;
    @Input() private readonly lg: string;
    @Input() private readonly xl: string;
    @Input() private readonly size: string; // Format xs-sm-md-lg-xl
    // Offset
    @Input() private readonly xsoffset: string;
    @Input() private readonly smOffset: string;
    @Input() private readonly mdOffset: string;
    @Input() private readonly lgOffset: string;
    @Input() private readonly xlOffset: string;
    // Alignment
    @Input() private readonly align: "start" | "center" | "end";
    // Order
    @Input() private readonly xsOrder: string;
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
        let aSizes: string[] = [];
        if (isset(this.size)) {
            aSizes = this.size.replace(/---/g, "-").split("-");
        }
        aSizes.forEach((size: string, index: number) => {
            if (isset(size) && !isset(this[this.aSizes[index]])) {
                this[this.aSizes[index]] = size;
            }
        });
        let bNone: boolean = true;
        const aCol: string[] = [this.xs, this.sm, this.md, this.lg, this.xl];
        aCol.forEach((value: string, index: number) => {
            if (isset(value) && value !== "none") {
                bNone = false;
                if (value === "flex" || value === "") {
                    this.addClass("col" + this.responsive(index));
                } else {
                    this.addClass("col" + this.responsive(index) + "-" + value);
                }
            }
        });
        if (bNone) {
            this.addClass("col");
        }
    }

    private setOffset(): void {
        const aOffset: string[] = [this.xsoffset, this.smOffset, this.mdOffset, this.lgOffset, this.xlOffset];
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
        const aOrder: string[] = [this.xsOrder, this.smOrder, this.mdOrder, this.lgOrder, this.xlOrder];
        aOrder.forEach((value: string, index: number) => {
            if (isset(value) && value !== "") {
                this.addClass("order" + this.responsive(index) + "-" + value);
            }
        });
    }

    private responsive(index: number): string {
        let additional: string = "";
        if (this.aFormat[index].length !== 0) {
            additional += "-";
        }
        return additional + this.aFormat[index];
    }

    private addClass(css: string): void {
        this.renderer.addClass(this.element.nativeElement, css);
    }
}
