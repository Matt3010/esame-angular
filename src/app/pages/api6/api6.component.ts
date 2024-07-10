import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { RicaricaService } from "../../../_services/ricarica.service";
import { debounceTime } from "rxjs";

@Component({
  selector: 'app-api6',
  templateUrl: './api6.component.html',
  styleUrls: ['./api6.component.scss']
})
export class Api6Component implements OnInit {

  maxRichieste: FormControl = new FormControl(undefined);
  dataMin: FormControl;
  dataMax: FormControl;

  richieste$ = this.RichiesteService.richieste$;

  constructor(
    private RichiesteService: RicaricaService
  ) {
    const oggi = new Date().toISOString().split('T')[0]; // Ottieni la data di oggi in formato 'yyyy-mm-dd'
    this.dataMin = new FormControl(oggi);
    this.dataMax = new FormControl(oggi);
  }

  ngOnInit() {
    this.updateRichieste();

    this.maxRichieste.valueChanges
      .pipe(debounceTime(300))
      .subscribe((res: any) => {
        this.updateRichieste();
      });

    this.dataMin.valueChanges
      .pipe(debounceTime(300))
      .subscribe((res: any) => {
        this.updateRichieste();
      });

    this.dataMax.valueChanges
      .pipe(debounceTime(300))
      .subscribe((res: any) => {
        this.updateRichieste();
      });
  }

  updateRichieste() {
    const maxRichiesteValue = this.maxRichieste.value === null || this.maxRichieste.value === undefined ? undefined : this.maxRichieste.value;
    const dataMinValue = this.dataMin.value === null || this.dataMin.value === undefined ? undefined : this.dataMin.value;
    const dataMaxValue = this.dataMax.value === null || this.dataMax.value === undefined ? undefined : this.dataMax.value;
     this.RichiesteService.api6( dataMinValue, dataMaxValue, maxRichiesteValue);
  }
}
