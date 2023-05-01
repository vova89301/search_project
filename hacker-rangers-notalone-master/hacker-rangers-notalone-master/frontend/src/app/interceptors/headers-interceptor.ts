import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  private yamlUrls: string[] = [
    "/workflow/Info"
  ];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.yamlUrls.some(substring => request.url.includes(substring))){
      const modified = request.clone({
        setHeaders: { "Accept": "application/json", }
      });
      return next.handle(modified);
    }

    return next.handle(request);
  }
}
