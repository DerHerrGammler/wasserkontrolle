import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Import
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { ElevationDirective } from "./directives/elevation.directive";
const APP_DIRECTIVES: any[] = [
    ElevationDirective
];


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Import 3rd party components
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatCardModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatListModule, MatStepperModule, MatTabsModule, MatTreeModule, MatButtonModule, MatButtonToggleModule, MatBadgeModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatRippleModule, MatBottomSheetModule, MatDialogModule, MatSnackBarModule, MatTooltipModule, MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";
const aMaterial: any[] = [
    // Form Controls
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    // Navigation
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    // Layout
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    // Buttons & Indicators
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    // Popups & Modals
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    // Data table
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
];
import { A11yModule } from "@angular/cdk/a11y";
import { BidiModule } from "@angular/cdk/bidi";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { LayoutModule } from "@angular/cdk/layout";
import { ObserversModule } from "@angular/cdk/observers";
import { OverlayModule } from "@angular/cdk/overlay";
import { PlatformModule } from "@angular/cdk/platform";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { TextFieldModule } from "@angular/cdk/text-field";
const aCDK: any[] = [
    // Common Behaviors
    A11yModule,
    BidiModule,
    DragDropModule,
    LayoutModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    ScrollingModule,
    TextFieldModule
    // Components
];


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Modul Declaration
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const aImports: any[] = [
    ...aMaterial,
    ...aCDK
];

@NgModule({
    imports: [
        CommonModule,
        ...aImports
    ],
    declarations: [
        ...APP_DIRECTIVES
    ],
    exports: [
        CommonModule,
        ...aImports,
        ...APP_DIRECTIVES
    ]
})
export class MaterialModule { }
