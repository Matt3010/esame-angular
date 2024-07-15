import { Component } from '@angular/core';
import {EsameService} from "../../../_services/esame.service";
import {AbstractControl, FormControl, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-api5-esame',
  templateUrl: './api5-esame.component.html',
  styleUrls: ['./api5-esame.component.scss']
})
export class Api5EsameComponent {

  offerteFilterd$ = this.esameService.offerteFilterd$;

  constructor(
    private esameService: EsameService,
  ) {
    this.doQuery();
  }

  searchText: FormControl = new FormControl(undefined, []);
  limit: FormControl = new FormControl(0, [Validators.min(0), this.onlyIntegerValidator()]);

  onlyIntegerValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^\d+$/.test(control.value);
      return valid ? null : {'onlyInteger': true};
    };
  }

  isInvalid(type:number): boolean {
    if( type=== 1) {
      const control = this.limit;
      return !!control?.invalid && !!control?.dirty;
    } else {
      const control = this.searchText;
      return !!control?.invalid && !!control?.dirty;
    }
  }

  doQuery() {
    this.offerteFilterd$.next(null)
    this.esameService.api5Esame({limit: this.limit.value, searchText: this.searchText.value})
  }

}
