// component responsible for displaying information about the application
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  message: string = "ABOUT THIS APP";

  // constructs the component, no values to initialize
  constructor() { }

  // initialization logic, nothing to do
  ngOnInit() { }

}
