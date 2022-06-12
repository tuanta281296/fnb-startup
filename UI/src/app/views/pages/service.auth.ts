import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthServiceApp {
    index = 0;
    constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {}

    getDataSelect(value: any, apiUrl) : Observable<any[]> {
        var url = this.baseUrl + apiUrl;
            return this.http.get<typeof value[]>(url).pipe(
                map((any: any[]) => {
                    this.index = 0;
                    if (any.length <= 0) {
                        return null;
                    }
                    any.forEach(element => {
                        element.index = this.index + 1;
                        this.index++;
                    });
                    
                    return any;
                }));
    }
}

export class Change<T> {
    type: 'insert' | 'update' | 'remove';

    key: any;

    data: Partial<T>;
}