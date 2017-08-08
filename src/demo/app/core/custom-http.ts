import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, ConnectionBackend, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return super.get(url, this.addWithCredentialsOption(url, options)).retry(2).delay(100);
  }

  private addWithCredentialsOption(url: string, options: RequestOptionsArgs): RequestOptionsArgs {
    const currentOptions: RequestOptionsArgs = options ? options : {};

    if (url.indexOf('.nb.no') !== -1) {
      currentOptions.withCredentials = true;
    }
    return currentOptions;
  }

}
