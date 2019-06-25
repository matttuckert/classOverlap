// main component of application, responsible for displaying child components and transferring data between child components
import { Component, OnInit } from '@angular/core';
import { SelectionComponent } from '../selection/selection.component';
import { MatDialog } from '@angular/material';
import { IPlan } from 'src/model/plan';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // title to display
  title: string = 'Class Overlap';

  // constructs the home component, no values to initialize
  constructor(public dialog: MatDialog) { }

  // initialization logic for home component, nothing to do
  ngOnInit() { }

  // opens the dialog when user clicks "Select Plans"
  openDialog(): void {
    this.dialog.open(SelectionComponent, {
      disableClose: true
    });
  }
}
