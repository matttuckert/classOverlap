// component responsible for getting plans from database and keeping track of a selected plan
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPlan } from '../../model/plan'

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {

  // url to database, currently points to mock data
  private url: string = "assets/mock-data/plans.json";
  // list of all plans
  plans: IPlan[] = [];
  // selected plan, initially null
  selectedPlan: IPlan = null;

  // constructs a plan list component
  // intializes the HttpClient object
  constructor(private http: HttpClient) { }

  // initialization logic
  // gets plans
  ngOnInit() { 
    this.getPlans();
  }

  // gets the plans from database with http get request and stores the data in plans variable
  getPlans(): void {
    this.http.get<IPlan[]>(this.url)
      .subscribe(data => this.plans = data);
  }

  // // sets the selected plan
  // // this method is called based off user input
  // selectPlan(plan: IPlan): void {
  //   this.selectedPlan = plan;
  // }

  // clears the selected plan
  clear():void  {
    this.selectedPlan = null;
  }

  // gets the selected plan
  getSelectedPlan(): IPlan {
    return this.selectedPlan;
  }

}
