import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Import
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { CoreModule } from "../core/core.module";
import { WidgetThemePickerComponent } from "./theme-picker/theme-picker.component";
import { WidgetWipComponent } from "./wip/wip.component";
import { WidgetScreenPicComponent } from "./screen-pic/screen-pic.component";
const APP_ELEMENTS: any[] = [
    WidgetThemePickerComponent,
    WidgetWipComponent,
    WidgetScreenPicComponent
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
        ...APP_ELEMENTS
    ],
    exports: [
        CommonModule,
        ...APP_ELEMENTS
    ]
})
export class WidgetModule { }
