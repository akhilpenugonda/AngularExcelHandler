import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-instructions-popup',
    templateUrl: './instructionsPopup.component.html',
    providers: [MessageService]

})
export class InstructionsPopupComponent implements OnInit{
    
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {}

  @Input() display = false;

  @Input() name: string = '';

  @Input() email: string = '';

  @Input() popupType: string = 'instructions';

  @Output() close = new EventEmitter<string>();

  @Input() instructions: any;

  closePopup() {
    this.close.emit();
  }

  ngOnInit(){
  }

}
