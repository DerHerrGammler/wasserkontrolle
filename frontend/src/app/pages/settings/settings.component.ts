import { Component, OnInit } from "@angular/core";

@Component({
    selector: "page-settings",
    templateUrl: "./settings.component.html",
    styles: []
})
export class SettingsComponent implements OnInit {

    public isLogged: boolean = false;
    public oUser: any = {
        username: "",
        password: ""
    };

    constructor() { }

    public ngOnInit(): void {
    }

    public async login(): Promise<void> {
        try {
            if (this.oUser.username === "admin" && this.oUser.password === "admin") {
                this.isLogged = true;
            } else {
                alert("Benutzername oder Passwort falsch!");
            }
        } catch (oErr) {
            console.log(oErr);
        }
    }
}
