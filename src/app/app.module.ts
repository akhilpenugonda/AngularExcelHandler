import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { SchedulerService } from './demo/service/product.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {
    IPublicClientApplication,
    PublicClientApplication,
    BrowserCacheLocation,
    LogLevel,
    InteractionType,
  } from '@azure/msal-browser';
  import {
    MSAL_INSTANCE,
    MSAL_INTERCEPTOR_CONFIG,
    MsalInterceptorConfiguration,
    MSAL_GUARD_CONFIG,
    MsalGuardConfiguration,
    MsalBroadcastService,
    MsalService,
    MsalGuard,
    MsalRedirectComponent,
    MsalModule,
    MsalInterceptor,
  } from '@azure/msal-angular';
import { AuthInterceptor } from './demo/middlewares/auth-interceptor';
import { environment } from 'src/environments/environment';
const GRAPH_ENDPOINT = environment.GRAPH_ENDPOINT;

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.CLIENT_ID,//Peerislands AD
      authority: environment.IDENTITY_METADATA + environment.OAUTH_TENANT_ID,
      redirectUri: environment.OAUTH_REDIRECT_URI,
      
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(GRAPH_ENDPOINT, ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
  };
}
@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        BrowserModule,
        HttpClientModule,
        MsalModule
    ],
    providers: [
        EventService, IconService, NodeService,
        PhotoService, SchedulerService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true,
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
          },
          {
            provide: MSAL_INSTANCE,
            useFactory: MSALInstanceFactory,
          },
          {
            provide: MSAL_GUARD_CONFIG,
            useFactory: MSALGuardConfigFactory,
          },
          {
            provide: MSAL_INTERCEPTOR_CONFIG,
            useFactory: MSALInterceptorConfigFactory,
          },
          MsalService,
          MsalGuard,
          MsalBroadcastService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
