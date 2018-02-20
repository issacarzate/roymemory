import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClientModule, HttpHandler, XhrFactory, ɵinterceptingHandler } from '@angular/common/http';
import { BrowserXhr, Http, HttpModule, ReadyState, RequestOptions, XHRBackend, XSRFStrategy } from '@angular/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';


import { AppComponent } from './app.component';
import { LogincomponentComponent } from './components/logincomponent/logincomponent.component';
import { ListaFacturasComponent } from './components/lista-facturas/lista-facturas.component';

import { UserGuard } from './guards/user.guard';
import { routing, appRoutingProviders }  from './app.routing';
import { PrimeraVezComponent } from './components/primera-vez/primera-vez.component';
import { OlvidePasswordComponent } from './olvide-password/olvide-password.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { DialogOverviewExampleComponent } from './dialog-overview-example/dialog-overview-example.component';
import {CdkTableModule} from '@angular/cdk/table';
import { ForgottenComponent } from './forgotten/forgotten.component';


@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,]
})
export class DemoMaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    LogincomponentComponent,
    ListaFacturasComponent,
    PrimeraVezComponent,
    DialogOverviewExampleComponent,
    OlvidePasswordComponent,
    ForgottenComponent
    ],
    entryComponents: [
    DialogOverviewExampleComponent,
    OlvidePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    routing,
    NgbModule.forRoot(),
    BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, DemoMaterialModule
  ],
  providers: [appRoutingProviders, UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
