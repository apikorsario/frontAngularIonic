import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handle(req, next));
    }

    private async handle(req: HttpRequest<any>, next: HttpHandler) {
        var token = (await Storage.get({key : "token"})).value || null;
        if (token) {
            let clone = req.clone({
                setHeaders: {
                    Accept: "application/json",
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(clone).toPromise();
        }
        return next.handle(req).toPromise();
    }

}