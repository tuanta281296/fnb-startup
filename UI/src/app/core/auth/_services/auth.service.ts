import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User } from "../_models/user.model";
import { Permission } from "../_models/permission.model";
import { Role } from "../_models/role.model";
import { catchError, map } from "rxjs/operators";
import {
	QueryParamsModel,
	QueryResultsModel,
	HttpUtilsService,
} from "../../_base/crud";
import { environment } from "../../../../environments/environment";
import { Router } from "@angular/router";
import { mergeMap } from "rxjs/operators";
import { Occupation } from "../_models/occupation.model";
import { Branch } from "../_models/branch.model";

const API_USERS_URL = "api/users";
const API_PERMISSION_URL = "api/roles/permissions";
const API_ROLES_URL = "api/roles";
const API_BRANCH_URL = "api/branch";

@Injectable()
export class AuthService {
	constructor(
		private http: HttpClient,
		private httpUtils: HttpUtilsService,
		@Inject("BASE_URL") private baseUrl: string
	) {}
	// Authentication/Authorization
	login(email: string, password: string): Observable<User> {
		return this.http.post<User>(this.baseUrl + API_USERS_URL + "/login", {
			email,
			password,
		});
	}

	getUserByToken(): Observable<User> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			}),
		};
		return this.http.get<User>(this.baseUrl + API_USERS_URL, httpOptions);
	}

	register(user: User): Observable<any> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set("Content-Type", "application/json");
		return this.http
			.post<User>(this.baseUrl + API_USERS_URL, user, {
				headers: httpHeaders,
			})
			.pipe(
				map((res: User) => {
					return res;
				}),
				catchError((err) => {
					return null;
				})
			);
	}

	refreshToken(token: string) {
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
			}),
		};

		return this.http.post(
			this.baseUrl + API_USERS_URL + "refreshtoken",
			{
				refreshToken: token,
			},
			httpOptions
		);
	}

	/*
	 * Submit forgot password request
	 *
	 * @param {string} email
	 * @returns {Observable<any>}
	 */
	public requestPassword(email: string): Observable<any> {
		return this.http
			.get(this.baseUrl + API_USERS_URL + "/forgot?=" + email)
			.pipe(catchError(this.handleError("forgot-password", [])));
	}

	getAllUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.baseUrl + API_USERS_URL);
	}

	getUserById(userId: number): Observable<User> {
		return this.http.get<User>(this.baseUrl + API_USERS_URL + `/${userId}`);
	}

	// DELETE => delete the user from the server
	deleteUser(userId: number) {
		const userToken = localStorage.getItem(environment.authTokenKey);
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			}),
		};
		const url = `${this.baseUrl + API_USERS_URL}/${userId}`;
		return this.http.delete(url, httpOptions);
	}

	// UPDATE => PUT: update the user on the server
	updateUser(_user: User): Observable<any> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			}),
		};
		return this.http.put(this.baseUrl + API_USERS_URL, _user, httpOptions);
	}

	// CREATE =>  POST: add a new user to the server
	createUser(user: User): Observable<User> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			}),
		};
		return this.http.post<User>(
			this.baseUrl + API_USERS_URL,
			user,
			httpOptions
		);
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			}),
		};
		return this.http.post<QueryResultsModel>(
			this.baseUrl + API_USERS_URL + "/findUsers",
			queryParams,
			httpOptions
		);
	}

	// Permission
	getAllPermissions(): Observable<Permission[]> {
		return this.http.get<Permission[]>(this.baseUrl + API_PERMISSION_URL);
	}

	getRolePermissions(roleId: number): Observable<Permission[]> {
		return this.http.get<Permission[]>(
			this.baseUrl + API_PERMISSION_URL + "/getRolePermission?=" + roleId
		);
	}

	// Roles
	getAllRoles(): Observable<Role[]> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			}),
		};
		return this.http.get<Role[]>(this.baseUrl + API_ROLES_URL, httpOptions);
	}

	getRoleById(roleId: number): Observable<Role> {
		return this.http.get<Role>(API_ROLES_URL + `/${roleId}`);
	}

	// CREATE =>  POST: add a new role to the server
	createRole(role: Role): Observable<Role> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			}),
		};
		return this.http.post<Role>(
			this.baseUrl + API_ROLES_URL,
			role,
			httpOptions
		);
	}

	// UPDATE => PUT: update the role on the server
	updateRole(role: Role): Observable<any> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			}),
		};
		return this.http.put(this.baseUrl + API_ROLES_URL, role, httpOptions);
	}

	// DELETE => delete the role from the server
	deleteRole(roleId: number): Observable<Role> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			}),
		};
		const url = `${this.baseUrl + API_ROLES_URL}/${roleId}`;
		return this.http.delete<Role>(url, httpOptions);
	}

	// Check Role Before deletion
	isRoleAssignedToUsers(roleId: number): Observable<boolean> {
		return this.http.get<boolean>(
			API_ROLES_URL + "/checkIsRollAssignedToUser?roleId=" + roleId
		);
	}

	findRoles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls
		const httpHeaders = new HttpHeaders();
		httpHeaders.set("Content-Type", "application/json");
		return this.http.post<QueryResultsModel>(
			this.baseUrl + API_ROLES_URL + "/findRoles",
			queryParams,
			{ headers: httpHeaders }
		);
	}

	getAllBranch(): Observable<Branch[]> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			}),
		};
		return this.http.get<Branch[]>(
			this.baseUrl + API_BRANCH_URL,
			httpOptions
		);
	}

	findBranches(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls
		const httpHeaders = new HttpHeaders();
		httpHeaders.set("Content-Type", "application/json");
		return this.http.post<QueryResultsModel>(
			this.baseUrl + API_BRANCH_URL + "/findBranches",
			queryParams,
			{ headers: httpHeaders }
		);
	}

	updateBranch(branch: Branch): Observable<any> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			}),
		};
		return this.http.put(
			this.baseUrl + API_BRANCH_URL,
			branch,
			httpOptions
		);
	}

	createBranch(branch: Branch): Observable<any> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			}),
		};
		return this.http.post(
			this.baseUrl + API_BRANCH_URL,
			branch,
			httpOptions
		);
	}

	deleteBranch(idBranch: number) {
		const userToken = localStorage.getItem(environment.authTokenKey);
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			}),
		};
		const url = `${this.baseUrl + API_BRANCH_URL}/${idBranch}`;
		return this.http.delete(url, httpOptions);
	}

	/*
	 * Handle Http operation that failed.
	 * Let the app continue.
	 *
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = "operation", result?: any) {
		return (error: any): Observable<any> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result);
		};
	}

	getDataSelect(value: any, apiUrl): Observable<any[]> {
		var url = this.baseUrl + apiUrl;
		return this.http.get<typeof value[]>(url);
	}
}
