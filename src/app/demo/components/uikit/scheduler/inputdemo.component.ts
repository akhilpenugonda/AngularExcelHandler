import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Appointment, Product } from 'src/app/demo/api/product';
import { DataView } from 'primeng/dataview';
import { SessionService } from 'src/app/demo/service/session.service';
import { HelperMethods } from '../../utilities/helpers/helpers';
import { Table } from 'primeng/table';
import * as XLSX from 'xlsx';


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

  sortOrder: number = 0;

  sortField: string = '';

  uploadedFiles: any[] = [];

  sourceColumns!: Product[];

  targetColumns!: Product[];

  groupedData: any[] = [];

  constructor(
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
) { }

  ngOnInit() {
    this.cdr.markForCheck();
    this.targetColumns = [];
  }

  ngOnChanges() {
  }


  selectedState: any = null;

  tableData:any[] = [];



  onUpload(event: any) {
    for (const file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
}

onFileUploaded(event: any) {
  /* wire up file reader */
  for (const file of event.files) {
      this.uploadedFiles.push(file);
      //     const target: DataTransfer = <DataTransfer>(event.target);
      // if (target.files.length !== 1) {
      //   throw new Error('Cannot use multiple files');
      // }
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e: any) => {
          /* create workbook */
          const binarystr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

          /* selected the first sheet */
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];

          /* save data */
          //this.tableData = XLSX.utils.sheet_to_json(ws); 
          const sheetData = XLSX.utils.sheet_to_json(ws);
          const columnNames = Object.keys(sheetData[0] as any);
          let id = 1;
          this.tableData = sheetData.map((data: any) => {
            const record: any = {};
            record["id"] = id++;
            columnNames.forEach((columnName: string) => {
              record[columnName] = data[columnName];
            });
            return record;
          });

          const columnList = columnNames.map((columnName: string) => {
            return { name: columnName };
          });
          this.sourceColumns = columnList;
      };
  }
}

  groupByChoosenColumns(){
    const groupedData: any[] = [];
    const groupedDataMap: any = {};
    this.tableData.forEach((data: any) => {
      const key = this.targetColumns.map((column: any) => data[column.name]).join("-");
      if(groupedDataMap[key]){
        groupedDataMap[key].push(data);
      }else{
        groupedDataMap[key] = [data];
      }
    });
    Object.keys(groupedDataMap).forEach((key: string) => {
      const data = groupedDataMap[key];
      groupedData.push(data);
    });
    this.groupedData = groupedData;
    this.generateExcelSheets();
    return groupedData;
  }

  generateExcelSheets(){
    let wb = XLSX.utils.book_new();
    this.groupedData.forEach((data: any) => {
      wb = XLSX.utils.book_new();
      let sheetName = this.targetColumns.map((column: any) => data[0][column.name]).join("-");
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
      XLSX.writeFile(wb, sheetName+ ".xlsx");
    });
  }
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
