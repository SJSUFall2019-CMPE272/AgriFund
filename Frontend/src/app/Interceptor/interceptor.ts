import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (sessionStorage.getItem("X-XSRF-TOKEN")) {
            request = request.clone({
                setHeaders: {
                    "X-XSRF-TOKEN": sessionStorage.getItem("X-XSRF-TOKEN"),
                    "XSRF-TOKEN": sessionStorage.getItem("XSRF-TOKEN"),
                    "ep-accountname": request.url.split("/")[4],
                    "ep-userInfo": sessionStorage.getItem("ep-userInfo"),
                    "ep-appname": request.url.split("/")[5],
                    "is-external-call": "true"
                }
            });
        } else {
            request = request.clone({
                setHeaders: {
                    "is-external-call": "true"
                }
            });
        }

        return next.handle(request);
    }
}