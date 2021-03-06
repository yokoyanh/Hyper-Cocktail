import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ZipcodeService {

    constructor(private jsonp: Jsonp) { }

    /**
     * 郵便番号から住所を取得するためのJSONを返す関数。取得先はフリーのサービス。
     */
    requestAddress(zipcode: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('zipcode', zipcode);
        params.set('callback', 'JSONP_CALLBACK'); // JSONPの時の定型文

        return this.jsonp // ここが関数へのreturn
            .get('http://zipcloud.ibsnet.co.jp/api/search', { search: params })
            .pipe(
                map(
                    response => {
                        return response.json() || {};
                    }
                ),
                catchError(
                    error => {
                        return throwError(error.statusText);
                    }
                )
            );
    }
}
