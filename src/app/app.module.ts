import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { Api1Component } from './pages/api1/api1.component';
import { Api2Component } from './pages/api2/api2.component';
import { Api3Component } from './pages/api3/api3.component';
import { Api4Component } from './pages/api4/api4.component';
import { Api5Component } from './pages/api5/api5.component';
import { Api6Component } from './pages/api6/api6.component';
import { Api7Component } from './pages/api7/api7.component';
import { Api8Component } from './pages/api8/api8.component';
import { AutiCardComponent } from './components/auti-card/auti-card.component';
import { Api1EsameComponent } from './pagesEsame/api1-esame/api1-esame.component';
import { Api2EsameComponent } from './pagesEsame/api2-esame/api2-esame.component';
import { Api3EsameComponent } from './pagesEsame/api3-esame/api3-esame.component';
import { Api4EsameComponent } from './pagesEsame/api4-esame/api4-esame.component';
import { Api5EsameComponent } from './pagesEsame/api5-esame/api5-esame.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Api1Component,
    Api2Component,
    Api3Component,
    Api4Component,
    Api5Component,
    Api6Component,
    Api7Component,
    Api8Component,
    AutiCardComponent,
    Api1EsameComponent,
    Api2EsameComponent,
    Api3EsameComponent,
    Api4EsameComponent,
    Api5EsameComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
