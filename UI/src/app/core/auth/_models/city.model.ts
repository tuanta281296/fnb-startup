export class City {
    id: number;
    code: string;
    descr: string;

    clear() {
        this.id = undefined;
        this.code = '';
        this.descr = '';
    }
}
