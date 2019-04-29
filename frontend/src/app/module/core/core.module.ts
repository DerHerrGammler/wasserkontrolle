import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Import Angular Module
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { RouterModule } from "@angular/router";


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Import 3rd party components
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
// Own 3rd Party
import { GridModule } from "../grid/grid.module";
import { MaterialModule } from "../material/material.module";
import { CssModule } from "../css/css.module";


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Modul Declaration
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const aImports: any[] = [
    RouterModule,

    GridModule,
    MaterialModule,
    CssModule
];

@NgModule({
    imports: [
        CommonModule,
        ...aImports
    ],
    exports: [
        CommonModule,
        ...aImports
    ]
})
export class CoreModule {

    constructor(
        private readonly matIcon: MatIconRegistry,
        private readonly domSanitizer: DomSanitizer
    ) {
        this.matIcon.registerFontClassAlias("mi", "material-icons");
        this.matIcon.setDefaultFontSetClass("material-icons");
        this.matIcon.addSvgIconSetInNamespace("mdi", this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icons/mdi.svg"));
    }

}
