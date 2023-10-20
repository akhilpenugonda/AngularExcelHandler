import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Appointment, Product } from 'src/app/demo/api/product';
import { DataView } from 'primeng/dataview';
import { SessionService } from 'src/app/demo/service/session.service';
import { HelperMethods } from '../../utilities/helpers/helpers';
import { Table } from 'primeng/table';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}
@Component({
  templateUrl: './inputdemo.component.html',
  providers: [ConfirmationService, MessageService, SessionService, HelperMethods]
})
export class InputDemoComponent implements OnInit, OnChanges {

  profile!: ProfileType;

  selectedCountryAdvanced: any[] = [];

  valColor = '#424242';

  valRadio: string = '';

  valCheck: string[] = [];

  valCheck2: boolean = false;

  valSwitch: boolean = false;

  selectedMultiBT: any[] = [];

  selectedMulti: any[] = [];

  appointments: Appointment[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  constructor(
) { }

  ngOnInit() {
  }

  ngOnChanges() {
  }


  selectedState: any = null;

  compareTwoTimesM() { }

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
  }

  getFirstDayOfNextMonth() {
    const currentDate = new Date();

    const nextMonth = currentDate.getMonth() + 1;

    const firstDayOfNextMonth = new Date(currentDate.getFullYear(), nextMonth, 1);

    return firstDayOfNextMonth;
  }

  getLastDayOfNextMonth() {
    const currentDate = new Date();

    const nextMonth = currentDate.getMonth() + 1;

    const firstDayOfNextMonth = new Date(currentDate.getFullYear(), nextMonth, 1);

    const lastDayOfCurrentMonth = new Date(firstDayOfNextMonth.getTime() - 1);

    const lastDayOfNextMonth = new Date(lastDayOfCurrentMonth.getFullYear(), lastDayOfCurrentMonth.getMonth() + 2, 0);

    return lastDayOfNextMonth;
  }

  getLastDayOfCurrentMonth() {
    const currentDate = new Date();

    const nextMonth = currentDate.getMonth() + 1;

    const firstDayOfNextMonth = new Date(currentDate.getFullYear(), nextMonth, 1);

    const lastDayOfCurrentMonth = new Date(firstDayOfNextMonth.getTime() - 1);

    return lastDayOfCurrentMonth;
  }

  getFirstDayOfCurrentMonth() {
    const currentDate = new Date();

    const thisMonth = currentDate.getMonth();

    const firstDayOfNextMonth = new Date(currentDate.getFullYear(), thisMonth, 1);

    return firstDayOfNextMonth;
  }

  onGlobalFilterBts(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
