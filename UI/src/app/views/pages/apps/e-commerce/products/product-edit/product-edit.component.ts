// Angular
import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	OnDestroy,
	ChangeDetectorRef,
	Input,
	Inject,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// Material
import { MatDialog } from "@angular/material";
// RxJS
import { Observable, BehaviorSubject, Subscription, of } from "rxjs";
import { map, startWith, delay, first, finalize } from "rxjs/operators";
// NGRX
import { Store, select } from "@ngrx/store";
import { Dictionary, Update } from "@ngrx/entity";
import { AppState } from "../../../../../../core/reducers";
// Layout
import {
	SubheaderService,
	LayoutConfigService,
} from "../../../../../../core/_base/layout";
// CRUD
import {
	LayoutUtilsService,
	TypesUtilsService,
	MessageType,
} from "../../../../../../core/_base/crud";
// Services and Models
import {
	selectLastCreatedProductId,
	selectProductById,
	SPECIFICATIONS_DICTIONARY,
	ProductModel,
	ProductOnServerCreated,
	ProductUpdated,
	ProductsService,
	PO_ProductType,
	SI_Unit,
} from "../../../../../../core/e-commerce";
import { AuthServiceApp } from "../../../../../pages/service.auth";
import { CurrencyPipe } from "@angular/common";
import { HttpClient, HttpEventType } from "@angular/common/http";

const AVAILABLE_COLORS: string[] = [
	"Red",
	"CadetBlue",
	"Gold",
	"LightSlateGrey",
	"RoyalBlue",
	"Crimson",
	"Blue",
	"Sienna",
	"Indigo",
	"Green",
	"Violet",
	"GoldenRod",
	"OrangeRed",
	"Khaki",
	"Teal",
	"Purple",
	"Orange",
	"Pink",
	"Black",
	"DarkTurquoise",
];

const AVAILABLE_MANUFACTURES: string[] = [
	"Pontiac",
	"Subaru",
	"Mitsubishi",
	"Oldsmobile",
	"Chevrolet",
	"Chrysler",
	"Suzuki",
	"GMC",
	"Cadillac",
	"Mercury",
	"Dodge",
	"Ram",
	"Lexus",
	"Lamborghini",
	"Honda",
	"Nissan",
	"Ford",
	"Hyundai",
	"Saab",
	"Toyota",
];

@Component({
	// tslint:disable-next-line:component-selector
	selector: "kt-product-edit",
	templateUrl: "./product-edit.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditComponent implements OnInit, OnDestroy {
	// Public properties
	product: ProductModel;
	productId$: Observable<number>;
	oldProduct: ProductModel;
	selectedTab: number = 0;
	loadingSubject = new BehaviorSubject<boolean>(true);
	loading$: Observable<boolean>;
	productForm: FormGroup;
	hasFormErrors: boolean = false;
	filteredColors: Observable<string[]>;
	filteredManufactures: Observable<string[]>;
	// Private password
	private componentSubscriptions: Subscription;
	// sticky portlet header margin
	private headerMargin: number;

	//ds combobox
	productType: Observable<any[]>;
	unitData: Observable<any[]>;
	imagePath: any;

	// Image
	@Input() requiredFileType: string;
	fileName = "";
	uploadProgress: number;
	uploadSub: Subscription;
	locationImage: string = this.baseUrl + "Images/Product/";
	clock_tick: string;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 * @param activatedRoute: ActivatedRoute
	 * @param router: Router
	 * @param typesUtilsService: TypesUtilsService
	 * @param productFB: FormBuilder
	 * @param dialog: MatDialog
	 * @param subheaderService: SubheaderService
	 * @param layoutUtilsService: SubheaderService
	 * @param layoutConfigService: LayoutConfigService
	 * @param productService: ProductsService
	 * @param cdr: ChangeDetectorRef
	 */
	constructor(
		private store: Store<AppState>,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private typesUtilsService: TypesUtilsService,
		private productFB: FormBuilder,
		public dialog: MatDialog,
		private subheaderService: SubheaderService,
		private layoutUtilsService: LayoutUtilsService,
		private layoutConfigService: LayoutConfigService,
		private productService: ProductsService,
		private cdr: ChangeDetectorRef,
		private authServiceApp: AuthServiceApp,
		@Inject("BASE_URL") private baseUrl: string,
		private http: HttpClient
	) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.productType = this.authServiceApp.getDataSelect(
			PO_ProductType,
			"api/masterdata/producttype"
		);

		this.unitData = this.authServiceApp.getDataSelect(
			SI_Unit,
			"api/masterdata/unit"
		);
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		this.activatedRoute.params.subscribe((params) => {
			this.clock_tick = Math.random().toString();
			const id = params["id"];
			if (id && id > 0) {
				this.store
					.pipe(select(selectProductById(id)))
					.subscribe((result) => {
						if (!result) {
							this.loadProductFromService(id);
							return;
						}

						this.loadProduct(result);
					});
			} else {
				const newProduct = new ProductModel();
				newProduct.clear();
				newProduct.image =
					this.baseUrl + "Images/Product/product-default.png";
				this.loadProduct(newProduct);
			}
		});

		// sticky portlet header
		window.onload = () => {
			const style = getComputedStyle(
				document.getElementById("kt_header")
			);
			this.headerMargin = parseInt(style.height, 0);
		};
	}

	loadProduct(_product, fromService: boolean = false) {
		if (!_product) {
			this.goBack("");
		}
		this.product = _product;
		this.imagePath = _product.image;
		this.productId$ = of(_product.id);
		this.oldProduct = Object.assign({}, _product);
		this.initProduct();
		if (fromService) {
			this.cdr.detectChanges();
		}
	}

	// If product didn't find in store
	loadProductFromService(productId) {
		this.productService.getProductById(productId).subscribe((res) => {
			this.loadProduct(res, true);
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy() {
		if (this.componentSubscriptions) {
			this.componentSubscriptions.unsubscribe();
		}
	}

	/**
	 * Init product
	 */
	initProduct() {
		this.createForm();
		this.loadingSubject.next(false);
		if (!this.product.id) {
			this.subheaderService.setBreadcrumbs([
				{ title: "eCommerce", page: `/ecommerce` },
				{ title: "Products", page: `/ecommerce/products` },
				{ title: "Create product", page: `/ecommerce/products/add` },
			]);
			return;
		}
		this.subheaderService.setTitle("Edit product");
		this.subheaderService.setBreadcrumbs([
			{ title: "eCommerce", page: `/ecommerce` },
			{ title: "Products", page: `/ecommerce/products` },
			{
				title: "Edit product",
				page: `/ecommerce/products/edit`,
				queryParams: { id: this.product.id },
			},
		]);
	}

	/**
	 * Create form
	 */
	createForm() {
		this.productForm = this.productFB.group({
			productTypeID: [this.product.productTypeID, Validators.required],
			productID: [this.product.productID, Validators.required],
			productName: [this.product.productName, Validators.required],
			image: [this.product.image],
			defaultUnit: [this.product.defaultUnit, Validators.required],
			defaultPrice: [
				Number(this.product.defaultPrice).toLocaleString(undefined, {
					minimumFractionDigits: 0,
				}),
				[Validators.required, Validators.pattern(/^\d+(\,\d+)*$/)],
			],
			active: [
				this.product.active.toString(),
				[Validators.required, Validators.min(0), Validators.max(1)],
			],
		});
	}

	transformAmount(element) {
		element.target.value = Number(element.target.value).toLocaleString(
			undefined,
			{ minimumFractionDigits: 0 }
		);
	}

	onFocus(element) {
		// on focus remove currency formatting
		element.target.value = element.target.value.replace(/[^0-9.]+/g, "");
	}

	/**
	 * Go back to the list
	 *
	 * @param id: any
	 */
	goBack(id) {
		this.loadingSubject.next(false);
		const url = `/ecommerce/products?id=${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	goBackWithoutId() {
		this.router.navigateByUrl("/ecommerce/products", {
			relativeTo: this.activatedRoute,
		});
	}

	/**
	 * Refresh product
	 *
	 * @param isNew: boolean
	 * @param id: number
	 */
	refreshProduct(isNew: boolean = false, id = 0) {
		this.loadingSubject.next(false);
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute });
			return;
		}

		url = `/ecommerce/products/edit/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Reset
	 */
	reset() {
		this.product = Object.assign({}, this.oldProduct);
		this.createForm();
		this.hasFormErrors = false;
		this.productForm.markAsPristine();
		this.productForm.markAsUntouched();
		this.productForm.updateValueAndValidity();
	}

	/**
	 * Save data
	 *
	 * @param withBack: boolean
	 */
	onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.productForm.controls;
		/** check form */
		if (this.productForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}

		// tslint:disable-next-line:prefer-const
		let editedProduct = this.prepareProduct();

		if (editedProduct.id > 0) {
			this.updateProduct(editedProduct, withBack);
			return;
		}

		this.addProduct(editedProduct, withBack);
	}

	/**
	 * Returns object for saving
	 */
	prepareProduct(): ProductModel {
		const controls = this.productForm.controls;
		const _product = new ProductModel();
		_product.id = this.product.id;
		_product.productTypeID = controls["productTypeID"].value;
		_product.productID = controls["productID"].value;
		_product.productName = controls["productName"].value;
		_product.image = this.imagePath;
		_product.defaultUnit = controls["defaultUnit"].value;
		_product.defaultPrice = controls["defaultPrice"].value.replace(
			/[^0-9.]+/g,
			""
		);
		_product.active = Boolean(controls["active"].value === "true");
		_product._userId = 1; // TODO: get version from userId
		_product._createdDate = this.product._createdDate;
		_product._updatedDate = this.product._updatedDate;
		_product._updatedDate = this.typesUtilsService.getDateStringFromDate();
		_product._createdDate =
			this.product.id > 0 ? _product._createdDate : _product._updatedDate;
		return _product;
	}

	/**
	 * Add product
	 *
	 * @param _product: ProductModel
	 * @param withBack: boolean
	 */
	addProduct(_product: ProductModel, withBack: boolean = false) {
		this.loadingSubject.next(true);
		this.store.dispatch(new ProductOnServerCreated({ product: _product }));
		this.componentSubscriptions = this.store
			.pipe(delay(1000), select(selectLastCreatedProductId))
			.subscribe((newId) => {
				if (!newId) {
					return;
				}

				this.loadingSubject.next(false);
				if (withBack) {
					this.goBack(newId);
				} else {
					const message = `New product successfully has been added.`;
					this.layoutUtilsService.showActionNotification(
						message,
						MessageType.Create,
						10000,
						true,
						true
					);
					this.refreshProduct(true, newId);
				}
			});
	}

	/**
	 * Update product
	 *
	 * @param _product: ProductModel
	 * @param withBack: boolean
	 */
	updateProduct(_product: ProductModel, withBack: boolean = false) {
		this.loadingSubject.next(true);

		const updateProduct: Update<ProductModel> = {
			id: _product.id,
			changes: _product,
		};

		this.store.dispatch(
			new ProductUpdated({
				partialProduct: updateProduct,
				product: _product,
			})
		);

		of(undefined)
			.pipe(delay(3000))
			.subscribe(() => {
				// Remove this line
				if (withBack) {
					this.goBack(_product.id);
				} else {
					const message = `Product successfully has been saved.`;
					this.layoutUtilsService.showActionNotification(
						message,
						MessageType.Update,
						10000,
						true,
						true
					);
					this.refreshProduct(false);
				}
			}); // Remove this line
	}

	/**
	 * Returns component title
	 */
	getComponentTitle() {
		let result = "Create product";
		if (!this.product || !this.product.id) {
			return result;
		}

		// result = `Edit product - ${this.product.manufacture} ${this.product.model}, ${this.product.modelYear}`;
		return result;
	}

	/**
	 * Close alert
	 *
	 * @param $event
	 */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	/**
	 * Close alert
	 *
	 * @param $event
	 */
	onFileSelected(event) {
		const file: File = event.target.files[0];

		if (file) {
			this.fileName = this.product.productID;
			let fileExtension: string = file.name
				.split("?")[0]
				.split(".")
				.pop();
			const formData = new FormData();
			formData.append(
				"thumbnail",
				file,
				this.fileName + "." + fileExtension
			);
			const upload$ = this.http
				.post(this.baseUrl + "api/poproduct/upload-image", formData, {
					reportProgress: true,
					observe: "events",
				})
				.pipe(finalize(() => this.resetFileUpload()));

			this.uploadSub = upload$.subscribe((event) => {
				if (event.type == HttpEventType.UploadProgress) {
					this.uploadProgress = Math.round(
						100 * (event.loaded / event.total)
					);
					this.imagePath =
						this.locationImage +
						this.fileName +
						"." +
						fileExtension;
					this.clock_tick = Math.random().toString();
					this.cdr.detectChanges();
				}
			});
		}
	}

	cancelUpload() {
		this.uploadSub.unsubscribe();
		this.resetFileUpload();
	}

	resetFileUpload() {
		this.uploadProgress = null;
		this.uploadSub = null;
	}
}
