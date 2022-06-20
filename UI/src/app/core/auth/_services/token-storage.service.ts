import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class TokenStorageService {
	constructor() {}

	signOut(): void {
		localStorage.clear();
	}

	public saveRefreshToken(token: string): void {
		localStorage.removeItem(environment.refreshTokenKey);
		localStorage.setItem(environment.refreshTokenKey, token);
	}

	public getRefreshToken(): string | null {
		return localStorage.getItem(environment.refreshTokenKey);
	}

	public getToken(): string | null {
		return localStorage.getItem(environment.authTokenKey);
	}

	public saveToken(token: string): void {
		localStorage.removeItem(environment.authTokenKey);
		localStorage.setItem(environment.authTokenKey, token);
	}
}
