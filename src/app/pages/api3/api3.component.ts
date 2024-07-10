import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RicaricaService} from "../../../_services/ricarica.service";

@Component({
  selector: 'app-api3',
  templateUrl: './api3.component.html',
  styleUrls: ['./api3.component.scss']
})
export class Api3Component {

  nuovaRichiestaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private RichiesteService: RicaricaService
  ) {
    this.nuovaRichiestaForm = this.fb.group({
      CognomeNomeRichiedente: ['', Validators.required],
      DataInserimentoRichiesta: ['', Validators.required],
      Importo: ['', Validators.required],
      NumeroRate: ['', [Validators.required, Validators.pattern('^(6|12|18|24|48|60)$')]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.RichiesteService.api3(this.nuovaRichiestaForm.value)
  }


  isInvalid(controlName: string): boolean {
    const control = this.nuovaRichiestaForm.get(controlName);
    return !!control?.invalid && !!control?.dirty;
  }


}
