import { BaseModel } from "../../_base/crud";
import { ProductSpecificationModel } from "./product-specification.model";
import { ProductRemarkModel } from "./product-remark.model";

export class ProductModel extends BaseModel {
	id: number;
	productTypeID: number;
	productID: string;
	productName: string;
	image: string;
	defaultUnit: number;
	defaultPrice: number;
	active: boolean;

	clear() {
		this.id = undefined;
		this.productTypeID = undefined;
		this.productID = "";
		this.productName = "";
		this.image = "";
		this.defaultUnit = undefined;
		this.defaultPrice = 0;
		this.active = true;
	}
}
