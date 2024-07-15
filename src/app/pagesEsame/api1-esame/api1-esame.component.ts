import {Component} from '@angular/core';
import {EsameService} from "../../../_services/esame.service";
import {AbstractControl, FormControl, ValidatorFn, Validators} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-api1-esame',
  templateUrl: './api1-esame.component.html',
  styleUrls: ['./api1-esame.component.scss']
})
export class Api1EsameComponent {

  offerte$ = this.esameService.offerte$;
  maxRichieste: FormControl = new FormControl(0, [Validators.min(0), this.onlyIntegerValidator()]);

  constructor(
    private esameService: EsameService
  ) {
    this.maxRichieste.valueChanges.pipe(debounceTime(400)).subscribe((res: number) => {
      if (this.maxRichieste.valid) {
        this.offerte$.next(null);
        esameService.api1Esame({maxRichieste: res})
      } else {
        this.offerte$.next(null);
      }
    })
  }

  onlyIntegerValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^\d+$/.test(control.value);
      return valid ? null : {'onlyInteger': true};
    };
  }

  isInvalid(): boolean {
    const control = this.maxRichieste;
    return !!control?.invalid && !!control?.dirty;
  }


}
