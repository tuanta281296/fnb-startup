// Angular
import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// RxJS
import { Observable, BehaviorSubject } from "rxjs";
// CRUD
import {
	HttpUtilsService,
	QueryParamsModel,
	QueryResultsModel,
} from "../../_base/crud";
// Models
import { ProductModel } from "../_models/product.model";

const API_PRODUCTS_URL = "api/poproduct";
// Real REST API
@Injectable()
export class ProductsService {
	lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(
		new QueryParamsModel({}, "asc", "", 0, 10)
	);

	constructor(
		private http: HttpClient,
		private httpUtils: HttpUtilsService,
		@Inject("BASE_URL") private baseUrl: string
	) {}

	// CREATE =>  POST: add a new product to the server
	createProduct(product): Observable<ProductModel> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<ProductModel>(
			this.baseUrl + API_PRODUCTS_URL,
			product,
			{
				headers: httpHeaders,
			}
		);
	}

	// READ
	getAllProducts(): Observable<ProductModel[]> {
		return this.http.get<ProductModel[]>(this.baseUrl + API_PRODUCTS_URL);
	}

	getProductById(productId: number): Observable<ProductModel> {
		return this.http.get<ProductModel>(
			this.baseUrl + API_PRODUCTS_URL + `/${productId}`
		);
	}

	// Server should return filtered/sorted result
	findProducts(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

		const url = this.baseUrl + API_PRODUCTS_URL + "/find";
		return this.http.post<QueryResultsModel>(url, queryParams, {
			headers: httpHeaders,
		});
	}

	// UPDATE => PUT: update the product on the server
	updateProduct(product: ProductModel): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpOptions = this.httpUtils.setAuthorizeHTTPHeaders();
		return this.http.put(
			this.baseUrl + API_PRODUCTS_URL,
			product,
			httpOptions
		);
	}

	// UPDATE Status
	// Comment this when you start work with real server
	// This code imitates server calls
	updateStatusForProduct(
		products: ProductModel[],
		active: boolean
	): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			productsForUpdate: products,
			newStatus: active,
		};
		const url = API_PRODUCTS_URL + "/updateStatus";
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the product from the server
	deleteProduct(productId: number): Observable<ProductModel> {
		const url = `${API_PRODUCTS_URL}/${productId}`;
		return this.http.delete<ProductModel>(url);
	}

	deleteProducts(ids: number[] = []): Observable<any> {
		const url = API_PRODUCTS_URL + "/delete";
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = { prdocutIdsForDelete: ids };
		return this.http.put<QueryResultsModel>(url, body, {
			headers: httpHeaders,
		});
	}

	getDataSelect(value: any, apiUrl): Observable<any[]> {
		var url = this.baseUrl + apiUrl;
		return this.http.get<typeof value[]>(url);
	}
}
