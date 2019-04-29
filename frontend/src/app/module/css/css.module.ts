import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Import
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { HeightDirective } from "./directives/height.directive";
import { WidthDirective } from "./directives/width.directive";
const APP_DIRECTIVES: any[] = [
    HeightDirective,
    WidthDirective
];


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Modul
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...APP_DIRECTIVES
    ],
    exports: [
        CommonModule,
        ...APP_DIRECTIVES
    ]
})
export class CssModule { }
