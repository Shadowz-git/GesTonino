import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../../navigation.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit {
  activeComponent: string = '';

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    // Ascolta lo stato attivo dal servizio
    this.navigationService.activeComponent$.subscribe(
      (component) => (this.activeComponent = component)
    );
  }

  setActiveComponent(component: string) {
    this.navigationService.setActiveComponent(component);
  }
}
