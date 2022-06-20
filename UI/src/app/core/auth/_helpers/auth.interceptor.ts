import {
	HTTP_INTERCEPTORS,
	HttpEvent,
	HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
} from "@angular/common/http";
import { TokenStorageService } from "../_services/token-storage.service";
import { AuthService } from "../_services/auth.service";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, filter, switchMap, take } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";

const TOKEN_HEADER_KEY = "Authorization"; // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private returnUrl: string;
	constructor(private router: Router) {}

	private handleAuthError(err: HttpErrorResponse): Observable<any> {
		//handle your auth error or rethrow
		if (err.status === 401 || err.status === 403) {
			//navigate /delete cookies or whatever
			localStorage.removeItem(environment.authTokenKey);
			this.router.navigate(["/auth/login"], {
				queryParams: { returnUrl: this.returnUrl },
			});

			// if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
			return of(err.message); // or EMPTY may be appropriate here
		}
		return throwError(err);
	}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// Clone the request to add the new header.
		const userToken = localStorage.getItem(environment.authTokenKey);
		const authReq = req.clone({
			headers: req.headers.set(environment.authTokenKey, userToken),
		});
		// catch the error, make specific functions for catching specific errors and you can chain through them with more catch operators
		return next
			.handle(authReq)
			.pipe(catchError((x) => this.handleAuthError(x))); //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70
	}
}

export const authInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
