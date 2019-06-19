// top level module - no sub-modules, this module contains all components
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PlanListComponent } from './plan-list/plan-list.component';
import { OverlapsComponent } from './overlaps/overlaps.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  // component declarations
  declarations: [
    AppComponent,
    PlanListComponent,
    OverlapsComponent,
    AboutComponent,
    HomeComponent,
  ],
  // modules to import
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  // no services
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
