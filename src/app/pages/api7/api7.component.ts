import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {RicaricaService} from "../../../_services/ricarica.service";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-api7',
  templateUrl: './api7.component.html',
  styleUrls: ['./api7.component.scss']
})
export class Api7Component {
  dataMin: FormControl;
  dataMax: FormControl;

  text$ = this.RichiesteService.text$;

  constructor(
    private RichiesteService: RicaricaService
  ) {
    const oggi = new Date().toISOString().split('T')[0]; // Ottieni la data di oggi in formato 'yyyy-mm-dd'
    this.dataMin = new FormControl(oggi);
    this.dataMax = new FormControl(oggi);
  }

  ngOnInit() {
    this.updateRichieste();

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
     const dataMinValue = this.dataMin.value === null || this.dataMin.value === undefined ? undefined : this.dataMin.value;
    const dataMaxValue = this.dataMax.value === null || this.dataMax.value === undefined ? undefined : this.dataMax.value;
    this.RichiesteService.api7(dataMinValue, dataMaxValue);
  }
}
