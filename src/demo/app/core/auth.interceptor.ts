import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public static readonly withCredentialsSites = ['api.nb.no', 'api.dev.nb.no'];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const withCredentials = this.useWithCredentials(req.url);
    const authReq = req.clone({ withCredentials: withCredentials });
    return next.handle(authReq);
  }

  private useWithCredentials(url: string): boolean {
    return AuthInterceptor.withCredentialsSites.some(s => url.indexOf(s) !== -1);
  }
}
