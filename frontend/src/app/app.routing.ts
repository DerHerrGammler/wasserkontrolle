import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import * as guards from "./guards.guard";


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    Import Layouts/Pages
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { PageHomeComponent } from "./pages/_pages";
import { LayoutNavComponent } from "./module/layouts/nav/nav.component";
import { ChartComponent } from "./pages/chart/chart.component";
import { SettingsComponent } from "./pages/settings/settings.component";

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "/home" },
    {
        path: "test",
        component: ChartComponent,
        data: {
            title: "Testing of Components"
        }
    },
    {
        path: "",
        component: LayoutNavComponent,
        children: [
            {
                path: "home",
                component: PageHomeComponent,
                data: {
                    title: "Homepage"
                }
            },
            {
                path: "settings",
                component: SettingsComponent,
                data: {
                    title: "Einstellungen"
                }
            }
        ]
    },
    { path: "**", pathMatch: "full", redirectTo: "/home" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
