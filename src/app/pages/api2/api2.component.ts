import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {RicaricaService} from "../../../_services/ricarica.service";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-api2',
  templateUrl: './api2.component.html',
  styleUrls: ['./api2.component.scss']
})
export class Api2Component {

  CognomeNomeRichiedente: FormControl = new FormControl(undefined);
  richieste$ = this.RichiesteService.richieste$;

  constructor(
    private RichiesteService: RicaricaService
  ) {
  }

  ngOnInit() {
    this.updateRichieste();

    this.CognomeNomeRichiedente.valueChanges
      .pipe(debounceTime(300))
      .subscribe((res: any) => {
        this.updateRichieste();
      })
  }

  updateRichieste() {
    this.RichiesteService.api2(this.CognomeNomeRichiedente.value === null || undefined ? undefined : this.CognomeNomeRichiedente.value);
  }
}
