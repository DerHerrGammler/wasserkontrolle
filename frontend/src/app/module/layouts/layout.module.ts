import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Import
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { CoreModule } from "../core/core.module";
import { LayoutNavComponent } from "./nav/nav.component";
const APP_LAYOUTS: any[] = [
    LayoutNavComponent
];


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Modul
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
@NgModule({
    imports: [
        CommonModule,
        CoreModule
    ],
    declarations: [
        ...APP_LAYOUTS
    ],
    exports: [
        CommonModule,
        ...APP_LAYOUTS
    ]
})
export class LayoutModule { }
