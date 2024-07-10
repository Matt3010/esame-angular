import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {RicaricaService} from "../../../_services/ricarica.service";

@Component({
  selector: 'app-api5',
  templateUrl: './api5.component.html',
  styleUrls: ['./api5.component.scss']
})
export class Api5Component {

  richiestaID = new FormControl(null, [Validators.required])

  constructor(
    private fb: FormBuilder,
    private RichiesteService: RicaricaService
  ) {
  }

  delete() {
      this.RichiesteService.api5((+this.richiestaID.value!))
  }

}
