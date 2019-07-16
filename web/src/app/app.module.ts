// top level module - no sub-modules, this module contains all components
import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatSelectModule, MatToolbarModule, MatCardModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatInputModule, MatSortModule } from '@angular/material';
import { AppComponent } from './app.component';
import { SelectionComponent } from './selection/selection.component';
import { OverlapsComponent } from './overlaps/overlaps.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  // component declarations
  declarations: [
    AppComponent,
    OverlapsComponent,
    AboutComponent,
    HomeComponent,
    SelectionComponent
  ],
  // load dialog component
  entryComponents: [SelectionComponent],
  // modules to import
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    ReactiveFormsModule
  ],
  // services
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
