import {Component, OnInit} from '@angular/core';
import {RicaricaService} from "../../../_services/ricarica.service";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-api1',
  templateUrl: './api1.component.html',
  styleUrls: ['./api1.component.scss']
})
export class Api1Component implements OnInit {

  maxRichieste: FormControl = new FormControl(undefined);
  richieste$ = this.RichiesteService.richieste$;

  constructor(
    private RichiesteService: RicaricaService
  ) {
  }

  ngOnInit() {
    this.updateRichieste();

    this.maxRichieste.valueChanges
      .pipe(debounceTime(300))
      .subscribe((res: any) => {
      this.updateRichieste();
    })
  }

  updateRichieste() {
    this.RichiesteService.api1(this.maxRichieste.value === null || undefined ? undefined : this.maxRichieste.value);
  }
}
