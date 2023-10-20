import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';
import { APIRequestBody } from 'src/app/demo/components/utilities/interfaces/apiRequestBody';

@Injectable()
export class SchedulerService {
    

    constructor(private http: HttpClient, private authService: MsalService) { }

    isAdmin: boolean = false;

    menuItems: any = [
      // {
      //     label: 'Home',
      //     items: [
      //         { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
      //     ]
      // },
      {
          label: 'Menu',
          items:[
              { label: 'Excel Upload', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/excelprocessor'] },
          ]
      },
  ];
    
    setAccessToken()
    {
      this.authService.acquireTokenSilent(environment.OAUTH_SCOPE).subscribe((result) => {
        const accessToken = result.accessToken;
        console.log("accessToken: " + accessToken);
        sessionStorage.setItem("accessToken", accessToken);
      });
    }

    private getHttpOptions(): any {
      const headers = new HttpHeaders({
        Authorization: 'Bearer '
      });
  
      return { headers };
    }
    genericFetch(collection: string, filter: any, update: any): Observable<any>
    {
      const body: APIRequestBody = {
        collection: collection,
        filter: filter,
        update: update,
        limit: 10000,
        document: {}
      };
      const url =  environment.baseAPIUrl + 'getRecords' ;
      console.log(body);
      return this.http.post(url, body, this.getHttpOptions()).pipe(
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
    }

    genericUpdate(collection: string, filter: any, update: any): Observable<any>
    {
      const body: APIRequestBody = {
        collection: collection,
        filter: filter,
        update: update,
        limit: 10000,
        document: {}
      };
      const url =  environment.baseAPIUrl + 'updateRecord' ;
      console.log(body);
      return this.http.post(url, body, this.getHttpOptions()).pipe(
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
    }

}
