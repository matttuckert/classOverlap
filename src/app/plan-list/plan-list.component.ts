import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPlan } from './plan'

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {

  private url: string = "assets/mock-data/plans.json";
  public plans = [];
  public selectedPlan = null;

  constructor(private http: HttpClient) { }

  ngOnInit() { 
    this.getPlans();
  }

  getPlans() {
    return this.http.get<IPlan[]>(this.url)
      .subscribe(data => this.plans = data);
  }

  selectPlan(plan) {
    this.selectedPlan = plan.shortName;
  }

  clear() {
    this.selectedPlan = null;
  }

  getSelectedPlan() {
    return this.selectedPlan();
  }

}
