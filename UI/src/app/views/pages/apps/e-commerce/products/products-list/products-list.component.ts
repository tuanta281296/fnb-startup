// Angular
import {
	Component,
	OnInit,
	ElementRef,
	ViewChild,
	ChangeDetectionStrategy,
	OnDestroy,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
// Material
import { MatPaginator, MatSort, MatDialog } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
// RXJS
import {
	debounceTime,
	distinctUntilChanged,
	tap,
	skip,
	delay,
} from "rxjs/operators";
import { each, find } from "lodash";
import { fromEvent, merge, Observable, of, Subscription } from "rxjs";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../../../../core/reducers";
// UI
import { SubheaderService } from "../../../../../../core/_base/layout";
// CRUD
import {
	LayoutUtilsService,
	MessageType,
	QueryParamsModel,
} from "../../../../../../core/_base/crud";
// Services and Models
import {
	ProductModel,
	PO_ProductType,
	ProductsDataSource,
	ProductsPageRequested,
	OneProductDeleted,
	ManyProductsDeleted,
	ProductsStatusUpdated,
	selectProductsPageLastQuery,
	SI_Unit,
} from "../../../../../../core/e-commerce";
import { AuthServiceApp } from "../../../../../pages/service.auth";

// Table with EDIT item in new page
// ARTICLE for table with sort/filter/paginator
// https://blog.angular-university.io/angular-material-data-table/
// https://v5.material.angular.io/components/table/overview
// https://v5.material.angular.io/components/sort/overview
// https://v5.material.angular.io/components/table/overview#sorting
// https://www.youtube.com/watch?v=NSt9CI3BXv4
@Component({
	// tslint:disable-next-line:component-selector
	selector: "kt-products-list",
	templateUrl: "./products-list.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit, OnDestroy {
	// Table fields
	dataSource: ProductsDataSource;
	displayedColumns = [
		"select",
		"image",
		"productTypeID",
		"productID",
		"productName",
		"defaultUnit",
		"defaultPrice",
		"active",
		"actions",
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild("sort1", { static: true }) sort: MatSort;
	// Filter fields
	@ViewChild("searchInput", { static: true }) searchInput: ElementRef;
	filterStatus: string = "";
	filterCondition: string = "";
	lastQuery: QueryParamsModel;
	// Selection
	selection = new SelectionModel<ProductModel>(true, []);
	productsResult: ProductModel[] = [];
	private subscriptions: Subscription[] = [];

	//ds combobox
	productType: PO_ProductType[] = [];
	unitData: SI_Unit[] = [];
	clock_tick: string;

	/**
	 * Component constructor
	 *
	 * @param dialog: MatDialog
	 * @param activatedRoute: ActivatedRoute
	 * @param router: Router
	 * @param subheaderService: SubheaderService
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param store: Store<AppState>
	 */
	constructor(
		public dialog: MatDialog,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private subheaderService: SubheaderService,
		private layoutUtilsService: LayoutUtilsService,
		private store: Store<AppState>,
		private authServiceApp: AuthServiceApp
	) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		// If the user changes the sort order, reset back to the first page.
		const sortSubscription = this.sort.sortChange.subscribe(
			() => (this.paginator.pageIndex = 0)
		);
		this.subscriptions.push(sortSubscription);

		/* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
		const paginatorSubscriptions = merge(
			this.sort.sortChange,
			this.paginator.page
		)
			.pipe(tap(() => this.loadProductsList()))
			.subscribe();
		this.subscriptions.push(paginatorSubscriptions);

		this.authServiceApp
			.getDataSelect(PO_ProductType, "api/masterdata/producttype")
			.subscribe((res) => {
				if (res) {
					this.productType = res;
				}
			});

		this.authServiceApp
			.getDataSelect(SI_Unit, "api/masterdata/unit")
			.subscribe((res) => {
				if (res) {
					this.unitData = res;
				}
			});

		// Filtration, bind to searchInput
		const searchSubscription = fromEvent(
			this.searchInput.nativeElement,
			"keyup"
		)
			.pipe(
				debounceTime(150),
				distinctUntilChanged(),
				tap(() => {
					this.paginator.pageIndex = 0;
					this.loadProductsList();
				})
			)
			.subscribe();
		this.subscriptions.push(searchSubscription);

		// Set title to page breadCrumbs
		this.subheaderService.setTitle("Products");
		this.clock_tick = Math.random().toString();
		// Init DataSource
		this.dataSource = new ProductsDataSource(this.store);
		const entitiesSubscription = this.dataSource.entitySubject
			.pipe(skip(1), distinctUntilChanged())
			.subscribe((res) => {
				this.productsResult = res;
			});
		this.subscriptions.push(entitiesSubscription);
		const lastQuerySubscription = this.store
			.pipe(select(selectProductsPageLastQuery))
			.subscribe((res) => (this.lastQuery = res));
		// Load last query from store
		this.subscriptions.push(lastQuerySubscription);

		// Read from URL itemId, for restore previous state
		const routeSubscription = this.activatedRoute.queryParams.subscribe(
			(params) => {
				if (params.id) {
					this.restoreState(this.lastQuery, +params.id);
				}

				// First load
				of(undefined)
					.pipe(delay(1000))
					.subscribe(() => {
						// Remove this line, just loading imitation
						this.loadProductsList();
					}); // Remove this line, just loading imitation
			}
		);
		this.subscriptions.push(routeSubscription);
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.subscriptions.forEach((el) => el.unsubscribe());
	}

	/**
	 * Load Products List
	 */
	loadProductsList() {
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		// Call request from server
		this.store.dispatch(new ProductsPageRequested({ page: queryParams }));
		this.selection.clear();
	}

	/**
	 * Returns object for filter
	 */
	filterConfiguration(): any {
		const filter: any = {};
		const searchText: string = this.searchInput.nativeElement.value;

		if (this.filterStatus && this.filterStatus.length > 0) {
			filter.active = Boolean(this.filterStatus === "1");
		}

		if (this.filterCondition && this.filterCondition.length > 0) {
			filter.productTypeID = Number(this.filterCondition);
		}
		filter.productName = searchText;
		return filter;
	}

	/**
	 * Restore state
	 *
	 * @param queryParams: QueryParamsModel
	 * @param id: number
	 */
	restoreState(queryParams: QueryParamsModel, id: number) {
		if (!queryParams.filter) {
			return;
		}

		if ("condition" in queryParams.filter) {
			this.filterCondition = queryParams.filter.condition.toString();
		}

		if ("status" in queryParams.filter) {
			this.filterStatus = queryParams.filter.active.toString();
		}

		if (queryParams.filter.model) {
			this.searchInput.nativeElement.value = queryParams.filter.model;
		}
	}

	/** ACTIONS */
	/**
	 * Delete product
	 *
	 * @param _item: ProductModel
	 */
	deleteProduct(_item: ProductModel) {
		const _title: string = "Product Delete";
		const _description: string =
			"Are you sure to permanently delete this product?";
		const _waitDesciption: string = "Product is deleting...";
		const _deleteMessage = `Product has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(
			_title,
			_description,
			_waitDesciption
		);
		dialogRef.afterClosed().subscribe((res) => {
			if (!res) {
				return;
			}

			this.store.dispatch(new OneProductDeleted({ id: _item.id }));
			this.layoutUtilsService.showActionNotification(
				_deleteMessage,
				MessageType.Delete
			);
		});
	}

	/**
	 * Delete products
	 */
	deleteProducts() {
		const _title: string = "Products Delete";
		const _description: string =
			"Are you sure to permanently delete selected products?";
		const _waitDesciption: string = "Products are deleting...";
		const _deleteMessage = "Selected products have been deleted";

		const dialogRef = this.layoutUtilsService.deleteElement(
			_title,
			_description,
			_waitDesciption
		);
		dialogRef.afterClosed().subscribe((res) => {
			if (!res) {
				return;
			}

			const idsForDeletion: number[] = [];
			// tslint:disable-next-line:prefer-for-of
			for (let i = 0; i < this.selection.selected.length; i++) {
				idsForDeletion.push(this.selection.selected[i].id);
			}
			this.store.dispatch(
				new ManyProductsDeleted({ ids: idsForDeletion })
			);
			this.layoutUtilsService.showActionNotification(
				_deleteMessage,
				MessageType.Delete
			);
			this.selection.clear();
		});
	}

	/**
	 * Fetch selected products
	 */
	fetchProducts() {
		// tslint:disable-next-line:prefer-const
		let messages = [];
		this.selection.selected.forEach((elem) => {
			messages.push({
				text: `${elem.productTypeID} ${elem.productID} ${elem.defaultUnit}`,
				id: elem.productID,
				status: elem.active,
			});
		});
		this.layoutUtilsService.fetchElements(messages);
	}

	/**
	 * Update status dialog
	 */
	updateStatusForProducts() {
		const _title = "Update status for selected products";
		const _updateMessage = "Status has been updated for selected products";
		const _statuses = [
			{ value: 0, text: "Selling" },
			{ value: 1, text: "Sold" },
		];
		const _messages = [];

		this.selection.selected.forEach((elem) => {
			_messages.push({
				text: `${elem.productTypeID} ${elem.productID} ${elem.defaultUnit}`,
				id: elem.productID,
				status: elem.active,
				statusTitle: this.getItemStatusString(elem.active),
				statusCssClass: this.getItemCssClassByStatus(elem.active),
			});
		});

		const dialogRef = this.layoutUtilsService.updateStatusForEntities(
			_title,
			_statuses,
			_messages
		);
		dialogRef.afterClosed().subscribe((res) => {
			if (!res) {
				this.selection.clear();
				return;
			}

			// this.store.dispatch(
			// 	new ProductsStatusUpdated({
			// 		status: +res,
			// 		products: this.selection.selected,
			// 	})
			// );

			this.layoutUtilsService.showActionNotification(
				_updateMessage,
				MessageType.Update
			);
			this.selection.clear();
		});
	}

	/**
	 * Redirect to edit page
	 *
	 * @param id: any
	 */
	editProduct(id) {
		this.router.navigate(["../products/edit", id], {
			relativeTo: this.activatedRoute,
		});
	}

	createProduct() {
		this.router.navigateByUrl("/ecommerce/products/add");
	}

	/**
	 * Check all rows are selected
	 */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.productsResult.length;
		return numSelected === numRows;
	}

	/**
	 * Selects all rows if they are not all selected; otherwise clear selection
	 */
	masterToggle() {
		if (this.isAllSelected()) {
			this.selection.clear();
		} else {
			this.productsResult.forEach((row) => this.selection.select(row));
		}
	}

	/* UI */
	/**
	 * Returns status string
	 *
	 * @param status: number
	 */
	getItemStatusString(status: boolean = true): string {
		switch (status) {
			case true:
				return "Selling";
			case false:
				return "Cancelled";
		}
		return "";
	}

	/**
	 * Returns CSS Class by status
	 *
	 * @param status: number
	 */
	getItemCssClassByStatus(status: boolean = true): string {
		switch (status) {
			case true:
				return "success";
			case false:
				return "danger";
		}
		return "";
	}

	/**
	 * Rerurns condition string
	 *
	 * @param condition: number
	 */
	getItemConditionString(condition: number = 0): string {
		switch (condition) {
			case 0:
				return "New";
			case 1:
				return "Used";
		}
		return "";
	}

	/**
	 * Returns CSS Class by condition
	 *
	 * @param condition: number
	 */
	getItemCssClassByCondition(condition: number = 0): string {
		switch (condition) {
			case 0:
				return "accent";
			case 1:
				return "primary";
		}
		return "";
	}

	// Convert Unit + Price To Product

	getDescrProductType(condition: number = 0): string {
		var titles: string = "";
		const _productType = find(
			this.productType,
			(occu: PO_ProductType) => occu.id === condition
		);
		if (_productType) {
			titles = _productType.descr;
		}

		return titles;
	}

	convertNumberToCurrencyVND(price: number = 0): string {
		return price.toLocaleString("it-IT", {
			style: "currency",
			currency: "VND",
		});
	}

	getDescrUnit(condition: number = 0): string {
		var titles: string = "";
		const _unitType = find(
			this.unitData,
			(occu: SI_Unit) => occu.id === condition
		);
		if (_unitType) {
			titles = _unitType.unitName;
		}

		return titles;
	}
}
