import { DBHandler, DBField } from "./dbhandler.class";

export class User extends DBHandler {
    // Datebankfelder
    public fields: any = {
        "userid": new DBField("primaryid", "0", 20, "P"),
        "name": new DBField("email", ""),
        "email": new DBField("email", "", 0, "U"),
        "password": new DBField("password", ""),
        "fielddata": new DBField("fields", "{}")
    };
}

import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";

export interface IUSession {
    sessionid: string;
}

@Injectable({
    providedIn: "root"
})
export class UserService {

    constructor(
        private readonly http: HttpService
    ) { }

    public async sessionRegister(oUser: User): Promise<User> {
        oUser.fromJSON(await this.http.post("/user/register", oUser.toJSON([
            "name",
            "email",
            "password",
            "passwordrepeat"
        ])));
        return oUser;
    }

    public async sessionLogin(oUser: User): Promise<IUSession> {
        return this.http.post("/user/login", oUser.toJSON([
            "email",
            "password"
        ]));
    }

    public async sessionLogout(): Promise<void> {
        await this.http.post("/user/logout");
    }

    public async sessionLoad(): Promise<User> {
        const oUser: User = new User();
        oUser.fromJSON(await this.http.get("/user/user"));
        return oUser;
    }
}
