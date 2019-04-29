import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd, Event, NavigationStart, NavigationCancel, NavigationError, UrlSegment, UrlTree, ActivatedRouteSnapshot, Data } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Angulartics2Piwik } from "angulartics2/piwik";
import { appSettings } from "../environments/environment";
import { RouterService, AnalyticService } from "./services/_services";
import { isset, cloneObject } from "../lib/helper/_helper";
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from "@angular/common";

@Component({
    // tslint:disable-next-line
    selector: "body",
    template: `
    <mat-progress-bar *ngIf="bNavigation" mode="indeterminate" color="accent" style="position: fixed; z-index: 9999"></mat-progress-bar>
    <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit {

    public bNavigation: boolean = false;

    constructor(
        private readonly angulartics2Piwik: Angulartics2Piwik,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly title: Title,
        private readonly routerService: RouterService,
        private readonly analytic: AnalyticService,
        private readonly strategy: LocationStrategy
    ) {
        this.angulartics2Piwik.startTracking();
    }

    public ngOnInit(): void {
        this.navigationActions();
    }

    // Observers
    private navigationActions(): void {
        this.router.events.subscribe((event: Event) => {
            // Ladebalken für Navigation am oberen Rand
            this.actionNavigationLoader(event);
            if (event instanceof NavigationEnd) {
                // Nach oben Scrollen
                window.scrollTo(0, 0);
                // Routen Daten laden
                this.routeData();
                // Routen Pfad laden
                this.routePath();
                // Update Titel der Seite
                this.updateTitle();
                // Seiten analytics für Virtual Pages
                this.pageAnalytic();
            }
        });
    }

    // Actions
    private actionNavigationLoader(event: Event): void {
        switch (true) {
            case event instanceof NavigationStart: {
                this.bNavigation = true;
                break;
            }
            case event instanceof NavigationEnd:
            case event instanceof NavigationCancel:
            case event instanceof NavigationError: {
                this.bNavigation = false;
            }
        }
    }

    private updateTitle(): void {
        const data: Data = this.routerService.data;
        let sTitle: string = "";
        const sMainTitle: string = appSettings.TITLE;
        if (data.title) {
            sTitle = data.title;
        } else {
            sTitle = "No Title";
        }
        if (isset(sMainTitle) && sMainTitle !== "") {
            sTitle += " | " + sMainTitle;
        }
        this.title.setTitle(sTitle);
    }

    private routeData(): void {
        this.routerService.data = this.activeRoute().data;
        this.routerService.params = this.activeRoute().params;
    }

    private routePath(): void {
        const urlTree: UrlTree = this.router.parseUrl(this.router.url);
        const aUrl: string[] = urlTree.root.children.primary.segments.map((segment: UrlSegment) => segment.path);
        this.routerService.path = cloneObject(aUrl);
        Object.keys(this.routerService.params).forEach((key: string) => {
            let i: number = 0;
            while (i < aUrl.length) {
                if (aUrl[i] === this.routerService.params[key]) {
                    aUrl[i] = ":" + key;
                    break;
                }
                i += 1;
            }
        });
        this.routerService.pathParam = aUrl;
    }

    private pageAnalytic(): void {
        let sPath: string = "";
        switch (true) {
            case this.strategy instanceof HashLocationStrategy: {
                sPath += "/#/";
                break;
            }
            case this.strategy instanceof PathLocationStrategy:
            default: {
                sPath += "/";
            }
        }
        sPath += this.routerService.pathParam.join("/");
        this.analytic.trackPage(sPath);
    }

    // Functions
    private activeRoute(): ActivatedRouteSnapshot {
        let route: ActivatedRoute = this.activatedRoute;
        while (route.firstChild) {
            route = route.firstChild;
        }
        if (route.outlet === "primary") {
            return route.snapshot;
        }
    }

}
