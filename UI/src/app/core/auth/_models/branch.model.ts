export class Branch {
    index: number;
    id: number;
    branchID: string;
    branchName: string;
    address: string;
    disctrict: number;
    city: number;
    active: boolean;

    clear() {
        this.index = undefined;
        this.id = undefined;
        this.branchID = '';
        this.branchName = '';
        this.address = '';
        this.disctrict = undefined;
        this.city = undefined;
        this.active = true;
    }
}
