import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Import Components/Directives
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { ContainerComponent } from "./components/container.component";
import { RowComponent } from "./components/row.component";
import { ColComponent } from "./components/col.component";
const APP_ELEMENTS: any[] = [
    ContainerComponent,
    RowComponent,
    ColComponent,
];
import { ContainerDirective } from "./directives/container.directive";
import { RowDirective } from "./directives/row.directive";
import { ColDirective } from "./directives/col.directive";
const APP_DIRECTIVES: any[] = [
    ContainerDirective,
    RowDirective,
    ColDirective
];


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Modul
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...APP_ELEMENTS,
        ...APP_DIRECTIVES
    ],
    exports: [
        CommonModule,
        ...APP_ELEMENTS,
        ...APP_DIRECTIVES
    ]
})
export class GridModule { }
