import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'scheduler', data: { breadcrumb: 'Scheduler' }, loadChildren: () => import('./scheduler/inputdemo.module').then(m => m.InputDemoModule) },
        { path: 'configuration', data: { breadcrumb: 'Configuration' }, loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
