import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { SchedulerService} from '../../app/demo/service/product.service'

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private service: SchedulerService) { }

    ngOnInit() {
        this.model = this.service.menuItems;
        // [
        //     {
        //         label: 'Home',
        //         items: [
        //             { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
        //         ]
        //     },
        //     {
        //         label: 'Menu',
        //         items:[
        //             { label: 'Scheduler', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/scheduler'] },
        //             { label: 'New Hire Scheduler', icon: 'pi pi-fw pi-user', routerLink: ['/uikit/newHireScheduler'] },
        //             { label: 'Meetings', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/meetingsView'] },
        //         ]
        //     },
        // ];

        // if(this.service.isSuperUser)
        // {
        //     this.model[1].items.push({ label: 'Configuration', icon: 'pi pi-fw pi-cog', routerLink: ['/uikit/configuration']});
        // }

    }
}
