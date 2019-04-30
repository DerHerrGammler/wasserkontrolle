// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Import Angular Module
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from "@angular/common";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Import Layouts/Components/Pipes/Directives/Providers
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { PageHomeComponent } from "./pages/_pages";
import { ChartComponent } from "./pages/chart/chart.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { AutosizeDirective, CssSquareDirective } from "./directives/_directives";
import { I18nPipe } from "./pipes/_pipes";
import {  } from "./providers/_providers";
import { ThemeService } from "./services/_services";

const APP_PAGES: any[] = [
    PageHomeComponent,
    ChartComponent,
    SettingsComponent
];
const APP_DIRECTIVES: any[] = [
    AutosizeDirective,
    CssSquareDirective
];
const APP_PIPES: any[] = [
    I18nPipe
];


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Import important Own
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { appSettings, environment } from "../environments/environment";
import { CoreModule } from "./module/core/core.module";
import { LayoutModule } from "./module/layouts/layout.module";
import { WidgetModule } from "./module/widgets/widget.module";
import { delay } from "../lib/helper/_helper";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Import 3rd party components
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { Angulartics2Module } from "angulartics2";
import { Angulartics2Piwik } from "angulartics2/piwik";
const aAngulartics: any[] = [
    Angulartics2Module.forRoot({
        pageTracking: {
            autoTrackVirtualPages: false
        }
    })
];
import { NgxPageScrollModule } from "ngx-page-scroll";
const aScroll: any[] = [
    NgxPageScrollModule
];


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,

        AppRoutingModule,

        CoreModule,
        LayoutModule,
        WidgetModule,
        ...aAngulartics,
        ...aScroll
    ],
    declarations: [
        AppComponent,
        ...APP_PAGES,
        ...APP_DIRECTIVES,
        ...APP_PIPES
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        { // Initialisierung wichtiger Daten bei Modul Aktivierung
            provide: APP_INITIALIZER,
            deps: [
                ThemeService
            ],
            useFactory: (
                theme: ThemeService
            ): Function => async (): Promise<any> => {
                try {
                    if (environment.production) {
                        await delay(0);
                    }
                    theme.init();
                } catch (oErr) {
                    console.log(oErr);
                }
            },
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
