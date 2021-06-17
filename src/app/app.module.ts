import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClosureDatesV3Component } from './components/closure-dates-v3/closure-dates-v3.component';

@NgModule({
  declarations: [
    AppComponent,
    ClosureDatesV3Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
