import {Component} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {EsameService} from "../../../_services/esame.service";
import {isValid, parseISO} from "date-fns";

@Component({
  selector: 'app-api3-esame',
  templateUrl: './api3-esame.component.html',
  styleUrls: ['./api3-esame.component.scss']
})
export class Api3EsameComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private esameService: EsameService
  ) {

    this.editForm = this.fb.group({
      offertaLavoroID: ['', [Validators.required, this.onlyIntegerValidator()]],
      titolo: ['', [Validators.required, Validators.minLength(1)]],
      descrizioneBreve: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      dataInserimento: ['', [Validators.required, this.dateValidator()]], // Aggiunta del validatore per data
      retribuzioneLorda: ['', [Validators.required, this.onlyNumbersValidator()]]
    });
  }


  onSubmit() {
    if (this.editForm.valid) {
      this.esameService.api3Esame(this.editForm.value)
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.editForm.get(controlName);
    return !!control?.invalid && !!control?.dirty;
  }

  onlyNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^\d+(\.\d+)?$/.test(control.value);
      return valid ? null : {'onlyNumbers': true};
    };
  }

  onlyIntegerValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^\d+$/.test(control.value);
      return valid ? null : { 'onlyInteger': true };
    };
  }
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; // Null se il campo è vuoto (gestito da Validators.required)
      }
      if (!isValid(parseISO(control.value))) {
        return {'invalidDate': true}; // Ritorna errore se la data non è valida
      }
      return null; // Ritorna null se la data è valida
    };
  }

}
