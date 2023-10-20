import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SchedulerService } from 'src/app/demo/service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SessionService } from 'src/app/demo/service/session.service';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
  providers: [SessionService]
})

export class LoginComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];

  password!: string;

  email!: string;

  message = '';
  isIframe = false;
  loginDisplay = false;


  private readonly _destroying$ = new Subject<void>();

  constructor(public layoutService: LayoutService, private service: SchedulerService, private router: Router,
    private sessionService: SessionService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService) { }


  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
  }
  setValueInSession(key: any, value: any) {
    this.sessionService.setValue(key, value);
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  login() {
    this.authService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
      .subscribe((response: AuthenticationResult) => {
        this.authService.instance.setActiveAccount(response.account);
        console.log(response);
      
        this.router.navigate(['/uikit/scheduler']);
          this.setAccessToken();
      });   
   }
   
  setCache(response: any, isCustom: boolean, customEmail: string)
  {
    
  }

  setAccessToken()
  {
    this.authService.acquireTokenSilent(environment.OAUTH_SCOPE).subscribe((result) => {
      const accessToken = result.accessToken;
      console.log("accessToken: " + accessToken);
      this.setValueInSession("accessToken", accessToken);
    });
  }

  logout() {
    this.authService.logoutPopup()
        .subscribe((res) => {
          this.router.navigate(['/auth/login']);
        });

  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
