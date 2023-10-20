import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { SchedulerService } from 'src/app/demo/service/product.service';
import { environment } from 'src/environments/environment';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  providers: [MessageService]

})

export class ConfigurationComponent implements OnInit {



  @ViewChild('filter') filter!: ElementRef;

  constructor(private messageService: MessageService, private service: SchedulerService) { 
  }

  @Input() display = false;

  @Output() close = new EventEmitter<string>();

  @Input() instructions: any;


  closePopup() {
    this.close.emit();
  }

  ngOnInit() {
    console.log('Inside ConfigurationComponent ngOnInit()');

  }

}
