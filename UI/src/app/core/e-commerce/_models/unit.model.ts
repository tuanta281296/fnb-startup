import { BaseModel } from "../../_base/crud";

export class SI_Unit extends BaseModel {
	id: number;
	unitType: string;
	unitID: string;
	unitName: string;
	active: boolean;

	clear(): void {
		this.id = undefined;
		this.unitID = "";
		this.unitName = "";
		this.unitType = "";
		this.active = false;
	}
}
