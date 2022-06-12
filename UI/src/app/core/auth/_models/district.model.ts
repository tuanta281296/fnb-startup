export class District {
    id: number;
    code: string;
    descr: string;
    cityId: number;

    clear() {
        this.id = undefined;
        this.code = '';
        this.descr = '';
        this.cityId = undefined;
    }
}
