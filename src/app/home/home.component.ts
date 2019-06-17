// main component of application, responsible for displaying child components and transferring data between child components
import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { PlanListComponent } from '../plan-list/plan-list.component';
import { IPlan } from '../plan-list/plan';
import { OverlapsComponent } from '../overlaps/overlaps.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // title to display
  title: string = 'Class Overlap';
  // boolean to decide whether to display overlaps component, overlaps component is initially hidden
  hidden: boolean = true;
  // keeps track of child plan list components
  @ViewChildren(PlanListComponent) private planListComps: QueryList<PlanListComponent>;
  // keeps track of child overlaps component
  @ViewChild(OverlapsComponent) private overlapComp: OverlapsComponent;

  // constructs the home component, no values to initialize
  constructor() { }

  // hides the overlaps components and clears selected plans from plan list component
  // called based off user input
  clear(): void {
    this.setHidden(true);
    this.planListComps.forEach(comp => comp.clear());
  }

  // shows the overlaps component and gets the overlaps through the overlaps child component
  // called based off user input
  run(): void {
    this.setHidden(false);
    this.overlapComp.getOverlaps(this.getSelectedPlans());
  }

  // gets the selected plans from the plan list components and returns an array of all non-null selected plans
  getSelectedPlans(): IPlan[] {
    let selectedPlans: IPlan[] = [];
    this.planListComps.forEach((comp) => {
      let plan = comp.getSelectedPlan();
      if (plan) {
        selectedPlans.push(plan);
      }
    })
    return selectedPlans;
  }

  // sets the hidden property for the overlaps component
  setHidden(bool: boolean): void {
    this.hidden = bool;
  }

  // initialization logic for home component, nothing to do
  ngOnInit() { }

}
