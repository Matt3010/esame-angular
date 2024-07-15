import {Component} from '@angular/core';
import {AbstractControl, FormControl, ValidatorFn, Validators} from "@angular/forms";
import {EsameService} from "../../../_services/esame.service";

@Component({
  selector: 'app-api4-esame',
  templateUrl: './api4-esame.component.html',
  styleUrls: ['./api4-esame.component.scss']
})
export class Api4EsameComponent {

  constructor(
    private esameService: EsameService,
  ) {
  }

  offertaLavoroID: FormControl = new FormControl(undefined, [Validators.min(0), this.onlyIntegerValidator()]);

  onlyIntegerValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^\d+$/.test(control.value);
      return valid ? null : {'onlyInteger': true};
    };
  }

  delete() {
    if(this.offertaLavoroID.valid) {
      this.esameService.api4Esame(this.offertaLavoroID.value)
    }
  }

  isInvalid(): boolean {
    const control = this.offertaLavoroID;
    return !!control?.invalid && !!control?.dirty;
  }

}
