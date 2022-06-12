import { BaseModel } from '../../_base/crud';

export class Occupation extends BaseModel {
    id: number;
    occupation: string;
    descr: string;

    clear(): void {
        this.id = undefined;
        this.occupation = '';
        this.descr = '';
	}
}
