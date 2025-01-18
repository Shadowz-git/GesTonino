import { Component } from '@angular/core';
import {DashboardchartComponent} from '../components/dashboardchart/dashboardchart.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardchartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  email: string | null=localStorage.getItem('user');
  activityName: string|null=localStorage.getItem('activity_name');
}
