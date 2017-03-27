import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Ticket } from '../ticket';
import { TicketValidators } from '../ticket.validators';

@Component({
  selector: 'app-component-form',
  templateUrl: './component-form.component.html',
  styleUrls: ['./component-form.component.css']
})
export class ComponentFormComponent implements OnInit {



  formGroup: FormGroup;

  hotels = [
    { id: 0, name: 'Rock Hotel', price : 1000},
    { id: 1, name: 'Top Hotel', price : 2000},
    { id: 2, name: 'Lisbon Hotel', price : 3000},
    { id: 3, name: 'Another Hotel', price : 4000},
    { id: 4, name: 'Ams Hotel', price : 5000}
  ];

  total = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      ticket: this.fb.group({
        name: ['', Validators.required],
        hotel: ['', Validators.required],
        returnTrip: [false, Validators.required],
        car: [false, Validators.required]
      }),
      currentTickets: this.fb.array([
        this.createTicketFormGroup({ name: 'Jon', hotel: 3, returnTrip: false, car: false }),
        this.createTicketFormGroup({ name: 'Martha', hotel: 2, returnTrip: true, car: false })
      ])
    }, { validator: TicketValidators.checkTicketCount });

    this.calcTotalCost();
    this.formGroup.valueChanges.subscribe(() => {
      this.calcTotalCost();
    });
  }

  calcTotalCost() {
    this.total = 0;
      (this.formGroup.get('currentTickets') as FormArray).controls
        .map(control => control.value)
        .forEach((value: Ticket) => {
          const tripValue = 500;
          const carPrice = value.car ? 2500 : 0;
          const returnTrip = value.returnTrip ? 500 : 0;
          this.total += tripValue + this.getHotelById(value.hotel).price + carPrice + returnTrip;

        });
  }

  createTicketFormGroup(tiket: Ticket) {
    return this.fb.group({
      name: [tiket.name],
      hotel: [tiket.hotel],
      returnTrip: [tiket.returnTrip || false],
      car: [tiket.car || false]
    });
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }

  onAddTicket() {
    const ticketsArray = this.formGroup.get('currentTickets') as FormArray;
    ticketsArray.push(this.createTicketFormGroup(this.formGroup.get('ticket').value));
    this.formGroup.get('ticket').reset({returnTrip: false, car: false});
  }

  checkErrors(field: string) {
    return !this.formGroup.get(`ticket.${field}`).hasError('required') ||
    !this.formGroup.get(`ticket.${field}`).touched;
  }

  getHotelById(id): {id: number, name: string, price: number} {
    return this.hotels.find(hotel => hotel.id === parseInt(id));
  }
}
