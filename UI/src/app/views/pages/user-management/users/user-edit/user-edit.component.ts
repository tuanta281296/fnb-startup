// Angular
import {
	Component,
	OnInit,
	OnDestroy,
	Input,
	Inject,
	Output,
	EventEmitter,
	ChangeDetectorRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// RxJS
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
// NGRX
import { Store, select } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { AppState } from "../../../../../core/reducers";
// Layout
import {
	SubheaderService,
	LayoutConfigService,
} from "../../../../../core/_base/layout";
import {
	LayoutUtilsService,
	MessageType,
} from "../../../../../core/_base/crud";
// Services and Models
import {
	User,
	UserUpdated,
	Address,
	Occupation,
	selectHasUsersInStore,
	selectUserById,
	UserOnServerCreated,
	selectLastCreatedUserId,
	selectUsersActionLoading,
	Branch,
	District,
} from "../../../../../core/auth";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { finalize, map, tap } from "rxjs/operators";
import { AuthServiceApp } from "../../../../pages/service.auth";
// LODASH
import { each, find } from "lodash";

@Component({
	selector: "kt-user-edit",
	styleUrls: ["./user-edit.component.scss"],
	templateUrl: "./user-edit.component.html",
})
export class UserEditComponent implements OnInit, OnDestroy {
	// Public properties
	user: User;
	userId$: Observable<number>;
	oldUser: User;
	selectedTab: number = 0;
	loading$: Observable<boolean>;
	rolesSubject = new BehaviorSubject<number[]>([]);
	addressSubject = new BehaviorSubject<Address>(new Address());
	userForm: FormGroup;
	hasFormErrors: boolean = false;
	// Private properties
	private subscriptions: Subscription[] = [];

	// File Upload
	@Input() requiredFileType: string;
	fileName = "";
	uploadProgress: number;
	uploadSub: Subscription;
	imagePath: any;
	locationImage: string = this.baseUrl + "Images/Users/";
	clock_tick: string;

	// ds combobox
	occupations: Occupation[];
	branch: Observable<any[]>;
	defaultSelect: string;
	districts: District[] = [];

	/**
	 * Component constructor
	 *
	 * @param activatedRoute: ActivatedRoute
	 * @param router: Router
	 * @param userFB: FormBuilder
	 * @param subheaderService: SubheaderService
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param store: Store<AppState>
	 * @param layoutConfigService: LayoutConfigService
	 */
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private userFB: FormBuilder,
		private subheaderService: SubheaderService,
		private layoutUtilsService: LayoutUtilsService,
		private store: Store<AppState>,
		private layoutConfigService: LayoutConfigService,
		private http: HttpClient,
		@Inject("BASE_URL") private baseUrl: string,
		private cdRef: ChangeDetectorRef,
		private auth: AuthServiceApp
	) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.loading$ = this.store.pipe(select(selectUsersActionLoading));
		this.auth
			.getDataSelect(Occupation, "api/users/occupation")
			.subscribe((res) => {
				if (res) {
					this.occupations = res;
					this.defaultSelect = res[0].occupation;
				}
				const routeSubscription = this.activatedRoute.params.subscribe(
					(params) => {
						this.clock_tick = Math.random().toString();
						const id = params["id"];
						if (id && id > 0) {
							this.store
								.pipe(select(selectUserById(id)))
								.subscribe((res) => {
									if (res) {
										this.user = res;
										this.rolesSubject.next(this.user.roles);
										this.addressSubject.next(
											this.user.address
										);
										this.oldUser = Object.assign(
											{},
											this.user
										);
										this.imagePath = this.user.pic;
										this.initUser();
									}
								});
						} else {
							this.user = new User();
							this.user.clear();
							this.user.pic =
								this.baseUrl + "Images/Users/default.jpg";
							this.user.occupation = this.defaultSelect;
							this.rolesSubject.next(this.user.roles);
							this.addressSubject.next(this.user.address);
							this.oldUser = Object.assign({}, this.user);
							this.imagePath = this.user.pic;
							this.initUser();
						}
					}
				);
				this.subscriptions.push(routeSubscription);
			});
		// this.getAllOccupations();
	}

	ngOnDestroy() {
		this.subscriptions.forEach((sb) => sb.unsubscribe());
	}

	/**
	 * Init user
	 */
	initUser() {
		this.createForm();
		if (!this.user.id) {
			this.subheaderService.setTitle("Create user");
			this.subheaderService.setBreadcrumbs([
				{ title: "User Management", page: `user-management` },
				{ title: "Users", page: `user-management/users` },
				{ title: "Create user", page: `user-management/users/add` },
			]);
			return;
		}
		this.subheaderService.setTitle("Edit user");
		this.subheaderService.setBreadcrumbs([
			{ title: "User Management", page: `user-management` },
			{ title: "Users", page: `user-management/users` },
			{
				title: "Edit user",
				page: `user-management/users/edit`,
				queryParams: { id: this.user.id },
			},
		]);
	}

	/**
	 * Create form
	 */
	createForm() {
		this.userForm = this.userFB.group({
			username: [this.user.username, Validators.required],
			fullname: [this.user.fullname, Validators.required],
			email: [
				this.user.email,
				Validators.compose([Validators.required, Validators.email]),
			],
			phone: [this.user.phone, Validators.required],
			branchID: [this.user.branchID, Validators.required],
			occupation: [
				this.user.occupation,
				Validators.compose([Validators.required]),
			],
		});

		this.branch = this.auth.getDataSelect(Branch, "api/branch");
		this.branch.subscribe((res) => {
			this.userForm.controls.branchID.patchValue(this.user.branchID);
		});
		this.auth
			.getDataSelect(District, "api/masterdata/districts")
			.subscribe((res) => {
				this.districts = res;
			});
	}

	/**
	 * Redirect to list
	 *
	 */
	goBackWithId() {
		const url = `/user-management/users`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Refresh user
	 *
	 * @param isNew: boolean
	 * @param id: number
	 */
	refreshUser(isNew: boolean = false, id = 0) {
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute });
			return;
		}

		url = `/user-management/users/edit/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Reset
	 */
	reset() {
		this.user = Object.assign({}, this.oldUser);
		this.createForm();
		this.hasFormErrors = false;
		this.userForm.markAsPristine();
		this.userForm.markAsUntouched();
		this.userForm.updateValueAndValidity();
	}

	/**
	 * Save data
	 *
	 * @param withBack: boolean
	 */
	onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.userForm.controls;
		/** check form */
		if (this.userForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}

		const editedUser = this.prepareUser();

		if (editedUser.id > 0) {
			this.updateUser(editedUser, withBack);
			return;
		}

		this.addUser(editedUser, withBack);
	}

	/**
	 * Returns prepared data for save
	 */
	prepareUser(): User {
		const controls = this.userForm.controls;
		const _user = new User();
		_user.clear();
		_user.roles = this.rolesSubject.value;
		_user.address = this.addressSubject.value;
		_user.accessToken = this.user.accessToken;
		_user.refreshToken = this.user.refreshToken;
		_user.pic = this.imagePath;
		_user.id = this.user.id;
		_user.username = controls["username"].value;
		_user.email = controls["email"].value;
		_user.fullname = controls["fullname"].value;
		_user.occupation = controls["occupation"].value;
		_user.phone = controls["phone"].value;
		_user.branchID = controls["branchID"].value;
		_user.password = this.user.password;
		return _user;
	}

	/**
	 * Add User
	 *
	 * @param _user: User
	 * @param withBack: boolean
	 */
	addUser(_user: User, withBack: boolean = false) {
		this.store.dispatch(new UserOnServerCreated({ user: _user }));
		const addSubscription = this.store
			.pipe(select(selectLastCreatedUserId))
			.subscribe((newId) => {
				const message = `New user successfully has been added.`;
				this.layoutUtilsService.showActionNotification(
					message,
					MessageType.Create,
					5000,
					true,
					true
				);
				if (newId) {
					if (withBack) {
						this.goBackWithId();
					} else {
						this.refreshUser(true, newId);
					}
				}
			});
		this.subscriptions.push(addSubscription);
	}

	/**
	 * Update user
	 *
	 * @param _user: User
	 * @param withBack: boolean
	 */
	updateUser(_user: User, withBack: boolean = false) {
		// Update User
		// tslint:disable-next-line:prefer-const

		const updatedUser: Update<User> = {
			id: _user.id,
			changes: _user,
		};
		this.store.dispatch(
			new UserUpdated({ partialUser: updatedUser, user: _user })
		);
		const message = `User successfully has been saved.`;
		this.layoutUtilsService.showActionNotification(
			message,
			MessageType.Update,
			5000,
			true,
			true
		);
		if (withBack) {
			this.goBackWithId();
		} else {
			this.refreshUser(false);
		}
	}

	/**
	 * Returns component title
	 */
	getComponentTitle() {
		let result = "Create user";
		if (!this.user || !this.user.id) {
			return result;
		}

		result = `Edit user - ${this.user.fullname}`;
		return result;
	}

	getRouterLink() {
		if (this.user) {
			return "['../..']";
		}

		return "['../']";
	}

	/**
	 * Close Alert
	 *
	 * @param $event: Event
	 */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	//#region File Upload Event
	onFileSelected(event) {
		const file: File = event.target.files[0];

		if (file) {
			this.fileName = "Image-User" + this.user.id;
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
				.post(this.baseUrl + "api/users/upload-image", formData, {
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
					this.cdRef.detectChanges();
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

	getDistrictStr(branch: Branch): string {
		var titles: string = "";
		const _occu = find(
			this.districts,
			(occu: District) =>
				occu.id === branch.disctrict && occu.cityId == branch.city
		);
		if (_occu) {
			titles = _occu.descr;
		}

		return titles;
	}
	//#endregion
}
