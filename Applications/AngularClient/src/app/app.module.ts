import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';  
import { HttpErrorHandler } from '../Services/GlobalErrorHandler';
import { LoadingService } from '../Services/loadingService';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoadingService, multi: true }, { provide: ErrorHandler, useClass: HttpErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
