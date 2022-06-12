// Angular
import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	OnDestroy,
	Inject,
} from "@angular/core";
import { Router } from "@angular/router";
// RxJS
import { Observable } from "rxjs";
// NGRX
import { Store, select } from "@ngrx/store";
// AppState
import { AppState } from "../../../core/reducers";
// Auth
import { Permission } from "../../../core/auth";
import { HttpClient } from "@angular/common/http";
// import { JwtHelperService } from "@auth0/angular-jwt";

const userManagementPermissionId: number = 2;
@Component({
	selector: "kt-user-management",
	templateUrl: "./user-management.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementComponent implements OnInit {
	// Public properties
	// hasUserAccess$: Observable<boolean>;
	currentUserPermission$: Observable<Permission[]>;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 * @param router: Router
	 */
	constructor(
		private store: Store<AppState>,
		private router: Router,
		@Inject("BASE_URL") private baseUrl: string,
		private http: HttpClient // private jwtHelper: JwtHelperService
	) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		// if (this.jwtHelper.isTokenExpired(token)) {
		// 	// token expired
		// } else {
		// 	// token valid
		// }
		// this.currentUserPermission$ = this.store.pipe(select(currentUserPermissions));
		// this.currentUserPermission$.subscribe(permissions => {
		// 	if (permissions && permissions.length > 0) {
		// 		this.hasUserAccess$ =
		// 			this.store.pipe(select(checkHasUserPermission(userManagementPermissionId)));
		// 		this.hasUserAccess$.subscribe(res => {
		// 			if (!res) {
		// 				this.router.navigateByUrl('/error/403');
		// 			}
		// 		});
		// 	}
		// });
	}
}
