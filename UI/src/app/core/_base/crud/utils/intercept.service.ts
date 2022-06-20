// Angular
import { Injectable } from "@angular/core";
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse,
} from "@angular/common/http";
// RxJS
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {
	// intercept request and add token
	private returnUrl: string;
	constructor(private router: Router) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// tslint:disable-next-line:no-debugger
		// modify request
		// request = request.clone({
		// 	setHeaders: {
		// 		Authorization: `Bearer ${localStorage.getItem('accessToken')}`
		// 	}
		// });
		// console.log('----request----');
		// console.log(request);
		// console.log('--- end of request---');

		return next.handle(request).pipe(
			tap(
				(event) => {
					if (event instanceof HttpResponse) {
						// console.log('all looks good');
						// http response status code
						// console.log(event.status);
					}
				},
				(error) => {
					// http response status code
					// console.log('----response----');
					// console.error('status code:');
					// tslint:disable-next-line:no-debugger
					console.error(error.status);
					console.error(error.message);
					// console.log('--- end of response---');

					if (error.status === 401 || error.status === 403) {
						//navigate /delete cookies or whatever
						localStorage.removeItem(
							"authce9d77b308c149d5992a80073637e4d5"
						);
						this.router.navigate(["/auth/login"], {
							queryParams: { returnUrl: this.returnUrl },
						});

						// if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
						return of(error.message); // or EMPTY may be appropriate here
					}
				}
			)
		);
	}
}
