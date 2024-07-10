import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RicaricaService {

  APIURL;

  richieste$ = new BehaviorSubject<any>(null)
  text$ = new BehaviorSubject<string>('')


  constructor(
    private http: HttpClient,
  ) {
    this.APIURL = environment.APIURL + '/richieste'
  }

  api1(maxRichieste?: number) {
    let url = `${this.APIURL}/api1`;
    if (maxRichieste !== undefined) {
      url += `/${maxRichieste}`;
    }

    this.http.get(url).subscribe((res: any) => {
      this.richieste$.next(res.data);
    });
  }

  api2(CognomeNomeRichiedente?: number) {
    let url = `${this.APIURL}/api2`;
    if (CognomeNomeRichiedente !== undefined) {
      url += `/${CognomeNomeRichiedente}`;
    }
    this.http.get(url).subscribe((res: any) => {
      this.richieste$.next(res.data);
    });
  }


  api3(newRichiesta: any) {
    this.http.post(this.APIURL + '/api3', newRichiesta).subscribe((res: any) => {
      this.api1();
      alert('Nuova richiesta inserita con successo')
    }, (err: any) => {
      alert('Errore nell\' inserimento della nuova richiesta. Controllare il server')
    })
  }

  api4(modificaRichiesta: any, richiestaID: number) {
    this.http.post(this.APIURL + '/api4', {...modificaRichiesta, richiestaID: richiestaID}).subscribe((res: any) => {
      this.api1();
      alert('Richiesta aggiornata con successo')
    }, (err: any) => {
      if (err.status === 404) {
        alert('Richiesta non trovata')
      } else if (err.status === 500) {
        alert('Errore durante il salvataggio della richiesta')
      } else {
        alert('Errore dal server')
      }
    })
  }

  api5(richiestaID: number) {
    this.http.post(this.APIURL + '/api5', {richiestaID: richiestaID}).subscribe((res: any) => {
      this.api1();
      alert('Richiesta cancellata con successo')
    }, (err: any) => {
      if (err.status === 404) {
        alert('Richiesta non trovata')
      } else if (err.status === 500) {
        alert('Errore durante la cancellazione della richiesta')
      } else {
        alert('Errore dal server')
      }
    })
  }

  api6(DataMin: any, DataMax: any, maxRichieste?: number) {
    this.http.post(this.APIURL + '/api6', {
      DataMax: DataMax,
      DataMin: DataMin,
      maxRichieste: maxRichieste
    }).subscribe((res: any) => {
      this.richieste$.next(res.data);
    });
  }


  api7(DataMin: any, DataMax: any) {
    this.http.post(this.APIURL + '/api7', {
      DataMax: DataMax,
      DataMin: DataMin,
     }).subscribe((res: any) => {
      this.text$.next(res.sommaImporti);
    });
  }


  api8(DataMin: any, DataMax: any) {
    this.http.post(this.APIURL + '/api8', {
      DataMax: DataMax,
      DataMin: DataMin,
     }).subscribe((res: any) => {
      this.text$.next(res.mediaRate);
    });
  }

}
