import { BaseModel } from "../../_base/crud";

export class PO_ProductType extends BaseModel {
	id: number;
	code: string;
	descr: string;

	clear(): void {
		this.id = undefined;
		this.code = "";
		this.descr = "";
	}
}
