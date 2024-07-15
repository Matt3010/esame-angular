import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EsameService {


  APIURL;

  offerte$ = new BehaviorSubject<any>(null)
  offerteFilterd$ = new BehaviorSubject<any>(null)


  constructor(
    private http: HttpClient,
  ) {
    this.APIURL = environment.APIURL + '/offerte';
    this.api1Esame();
  }

  api1Esame(request?: { maxRichieste: number }) {
    this.http.post(this.APIURL + '/api1', request).subscribe((res: any) => {
      this.offerte$.next(res.data);
      console.log(res);
    }, (err: HttpErrorResponse) => {
      if (err.status === 500) {
        alert(err.error.error)
      }
    })
  }

  api2Esame(request: any) {
    this.http.post(this.APIURL + '/api2', request).subscribe((res: any) => {
      alert('Offerta inserita con successo');
      this.api1Esame();
    }, (err: HttpErrorResponse) => {
      if (err.status === 500) {
        alert(err.error.error)
      } else if (err.status === 422) {
        alert(err.error.message)
      }
    })
  }

  api3Esame(request: any) {
    this.http.post(this.APIURL + '/api3', request).subscribe((res: any) => {
      alert('Offerta modificata con successo');
      this.api1Esame();
    }, (err: HttpErrorResponse) => {
      if (err.status === 500) {
        alert(err.error.error)
      } else if (err.status === 422) {
        alert(err.error.message)
      } else if (err.status === 404) {
        alert('Offerta non trovata, controlla l\' ID');
      }
    })
  }

  api4Esame(request: any) {
    this.http.delete(this.APIURL + '/api4/' + request,).subscribe((res: any) => {
      alert('Offerta eliminata con successo');
      this.api1Esame();
    }, (err: HttpErrorResponse) => {
      if (err.status === 500) {
        alert(err.error.error)
      } else if (err.status === 422) {
        alert(err.message)
      } else if (err.status === 404) {
        alert('Offerta non trovata, controlla l\' ID');
      }
    })
  }


  api5Esame(request: any) {
    this.http.post(this.APIURL + '/api5/', request).subscribe((res: any) => {
      this.offerteFilterd$.next(res.data);
    }, (err: HttpErrorResponse) => {
      if (err.status === 500) {
        alert(err.error.error)
      } else if (err.status === 422) {
        alert(err.error.message)
      }
    })
  }

}
