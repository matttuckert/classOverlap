// dialog component responsible for getting plans from database and keeping track of a selected plan
import { Component, OnInit } from '@angular/core';
import { IPlan } from '../../model/plan'
import { AppService } from '../app.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  // list of all plans
  plans: IPlan[] = [];
  // selected plan 1, initially null
  selection1: IPlan = null;
  // selected plan 2, initially null
  selection2: IPlan = null;

  // constructs a plan list component
  // injects the MatDialogRef service
  // injects the AppService service
  constructor(private service: AppService, public dialogRef: MatDialogRef<SelectionComponent>) { }

  // initialization logic
  // gets plans
  ngOnInit() { 
    this.service.getPlans().subscribe(data => this.plans = data);
  }

  // closes the dialog and sends data to onSaved variable which updates all subscribers
  // called when user clicks "save"
  save() {
    this.dialogRef.close();
    this.service.onSaved.next([this.selection1, this.selection2]);
  }

}
