import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from "../components/layout/sidebar/sidebar.component";
import {DashboardComponent} from '../dashboard/dashboard.component';
import {NgSwitch, NgSwitchCase} from '@angular/common';
import {InventoryComponent} from '../inventory/inventory.component';
import {NavigationService} from '../navigation.service';

@Component({
  selector: 'app-gestionale',
  imports: [
    RouterOutlet,
    SidebarComponent,
    DashboardComponent,
    NgSwitch,
    InventoryComponent,
    NgSwitchCase,
  ],
  templateUrl: './gestionale.component.html',
  styleUrl: './gestionale.component.css'
})
export class GestionaleComponent implements OnInit {
  activeComponent: string = 'dashboard';

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    this.navigationService.activeComponent$.subscribe(
      (component) => (this.activeComponent = component)
    );
  }
}
