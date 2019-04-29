import { Component } from "@angular/core";
import { ThemeService } from "../../../services/_services";

@Component({
    selector: "widget-theme-picker",
    templateUrl: "./theme-picker.component.html",
    styles: []
})
export class WidgetThemePickerComponent {

    public themes: any[];
    public selected: string = "";

    constructor(
        private readonly theme: ThemeService
    ) {
        this.themes = theme.themes;
        this.selected = theme.getTheme();
    }

    public changeTheme(): void {
        this.theme.setTheme(this.selected);
    }

}
