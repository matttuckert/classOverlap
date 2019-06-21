// top level module - no sub-modules, this module contains all components
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatSelectModule, MatGridListModule, MatToolbarModule, MatListModule, MatCardModule } from '@angular/material';
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
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule
  ],
  // no services
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
