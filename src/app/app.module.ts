import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClientModule, HttpHandler, XhrFactory, ɵinterceptingHandler } from '@angular/common/http';
import { BrowserXhr, Http, HttpModule, ReadyState, RequestOptions, XHRBackend, XSRFStrategy } from '@angular/http';


import { AppComponent } from './app.component';
import { LogincomponentComponent } from './components/logincomponent/logincomponent.component';
import { ListaFacturasComponent } from './components/lista-facturas/lista-facturas.component';

import { UserGuard } from './guards/user.guard';
import { routing, appRoutingProviders }  from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    LogincomponentComponent,
    ListaFacturasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders, UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
