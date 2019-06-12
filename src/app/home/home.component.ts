import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { PlanListComponent } from '../plan-list/plan-list.component';
import { IPlan } from '../plan-list/plan';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'ClassOverlap';
  selectedPlans: IPlan[];
  hidden = true;
  @ViewChildren(PlanListComponent) comps: QueryList<PlanListComponent>

  constructor() { }

  clear() {
    this.comps.forEach(comp => comp.clear())
    this.setHidden(true);
  }

  run() {
    // run selected plans
   this.setHidden(false);
  }

  getSelectedPlans() {
    this.comps.forEach((comp) => {
      let plan = comp.getSelectedPlan();
      if (plan) {
        this.selectedPlans.push(plan);
      }
    })
    return this.selectedPlans;
  }

  setHidden(bool) {
    this.hidden = bool;
  }

  ngOnInit() {
    
  }

}
