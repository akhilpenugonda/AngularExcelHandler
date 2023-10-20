import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private accessToken: string | undefined;

  constructor(private authService: MsalService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.accessToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.accessToken)
      });
      return next.handle(authReq);
    } else {
      return from(this.authService.acquireTokenSilent(environment.OAUTH_SCOPE)).pipe(
        switchMap(token => {
          this.accessToken = token.accessToken;
          const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + this.accessToken)
          });
          return next.handle(authReq);
        })
      );
    }
  }
}