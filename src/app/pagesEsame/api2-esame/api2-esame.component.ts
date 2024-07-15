import {EsameService} from "../../../_services/esame.service";
import {Component} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { isValid, parseISO } from 'date-fns';

@Component({
  selector: 'app-api2-esame',
  templateUrl: './api2-esame.component.html',
  styleUrls: ['./api2-esame.component.scss']
})
export class Api2EsameComponent {
  nuovaOffertaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private esameService: EsameService
  ) {

    this.nuovaOffertaForm = this.fb.group({
      titolo: ['', [Validators.required, Validators.minLength(1)]],
      descrizioneBreve: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      dataInserimento: ['', [Validators.required, this.dateValidator()]], // Aggiunta del validatore per data
      retribuzioneLorda: ['', [Validators.required, this.onlyNumbersValidator()]]
    });

  }


  onSubmit() {
    if(this.nuovaOffertaForm.valid) {
      this.esameService.api2Esame(this.nuovaOffertaForm.value)
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.nuovaOffertaForm.get(controlName);
    return !!control?.invalid && !!control?.dirty;
  }

  onlyNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^\d+(\.\d+)?$/.test(control.value);
      return valid ? null : { 'onlyNumbers': true };
    };
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; // Null se il campo è vuoto (gestito da Validators.required)
      }
      if (!isValid(parseISO(control.value))) {
        return { 'invalidDate': true }; // Ritorna errore se la data non è valida
      }
      return null; // Ritorna null se la data è valida
    };
  }


}
