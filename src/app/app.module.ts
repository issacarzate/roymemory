import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClientModule, HttpHandler, XhrFactory, ɵinterceptingHandler } from '@angular/common/http';
import { BrowserXhr, Http, HttpModule, ReadyState, RequestOptions, XHRBackend, XSRFStrategy } from '@angular/http';


import { AppComponent } from './app.component';
import { LogincomponentComponent } from './components/logincomponent/logincomponent.component';


@NgModule({
  declarations: [
    AppComponent,
    LogincomponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
