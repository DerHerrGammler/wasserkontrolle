import { Injectable } from "@angular/core";
import { User, UserService } from "./classes/_classes";

@Injectable({
  providedIn: "root"
})
export class UsersessionService {

    public oUser: User = new User();

    constructor(
        private readonly user: UserService
    ) { }

    public async login(user: User): Promise<any> {
        const data: any = await this.user.sessionLogin(user);
    }
}
