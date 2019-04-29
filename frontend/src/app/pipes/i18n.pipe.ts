import { Pipe, PipeTransform } from "@angular/core";
import { I18nService } from "../services/_services";

@Pipe({
    name: "i18n"
})
export class I18nPipe implements PipeTransform {

    constructor(
        private readonly i18n: I18nService
    ) { }

    public transform(text: any, pack: any): string {
        return this.i18n.getLocale(text, pack);
    }

}
