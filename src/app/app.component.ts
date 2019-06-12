import { Component, ViewChildren, QueryList } from '@angular/core';
import { PlanListComponent } from './plan-list/plan-list.component';
import { IPlan } from './plan-list/plan';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClassOverlap';
  selectedPlans: IPlan[];
  hidden = true;
  @ViewChildren(PlanListComponent) comps: QueryList<PlanListComponent>

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

  setHidden(bool: boolean) {
    this.hidden = bool;
  }

}
