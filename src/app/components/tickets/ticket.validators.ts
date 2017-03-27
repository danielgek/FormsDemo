import { AbstractControl, FormArray } from '@angular/forms';

export class TicketValidators {
  static checkTicketCount(control: AbstractControl) {
    if ((control.get('currentTickets') as FormArray).length > 4 ) {
        return { tooManyTickets: true };
    }
    return null;
  }
}
