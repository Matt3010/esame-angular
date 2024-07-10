import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RicaricaService} from "../../../_services/ricarica.service";

@Component({
  selector: 'app-api4',
  templateUrl: './api4.component.html',
  styleUrls: ['./api4.component.scss']
})
export class Api4Component {


  nuovaRichiestaForm: FormGroup;
  richiestaID = new FormControl(null)

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
    if (this.richiestaID.value !== null) {
      this.RichiesteService.api4(this.nuovaRichiestaForm.value, +this.richiestaID.value)
    } else {
      alert('L\' è obbligatorio per modificare un elemento')
    }
  }


  isInvalid(controlName: string): boolean {
    const control = this.nuovaRichiestaForm.get(controlName);
    return !!control?.invalid && !!control?.dirty;
  }


}
