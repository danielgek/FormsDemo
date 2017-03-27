import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-current-tickets',
  templateUrl: './current-tickets.component.html',
  styleUrls: ['./current-tickets.component.css']
})
export class CurrentTicketsComponent implements OnInit {

  @Input() parentForm: FormGroup;

  total = 0;

  constructor() { }

  ngOnInit() {
    
  }

  currentTickets() {
    return (this.parentForm.get('currentTickets') as FormArray).controls;
  }

  onTicketRemove(index) {
    (this.parentForm.get('currentTickets') as FormArray).removeAt(index);
  }


}
