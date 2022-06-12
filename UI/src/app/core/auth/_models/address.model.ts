export class Address {
    addressLine: string;
    city: number;
    district: number;
    ward: string;

    clear() {
        this.addressLine = '';
        this.city = undefined;
        this.district = undefined;
        this.ward = '';
    }
}
