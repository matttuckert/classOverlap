import { Component, OnInit } from '@angular/core';
import { IPlan } from '../plan-list/plan';

// component responsible for getting and displaying the overlapping courses
@Component({
  selector: 'app-overlaps',
  templateUrl: './overlaps.component.html',
  styleUrls: ['./overlaps.component.css']
})
export class OverlapsComponent implements OnInit {

  // constructs the overlaps component, no values to initialize
  constructor() { }

  // initialization logic, nothing to do
  ngOnInit() { }

  // gets overlapping courses of the plan list passed as a parameter
  getOverlaps(plans: IPlan[]) {
    // not yet implemented
  }

}
