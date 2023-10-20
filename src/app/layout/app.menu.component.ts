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
        
    }
}
