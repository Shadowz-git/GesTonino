import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from "../components/layout/sidebar/sidebar.component";

@Component({
  selector: 'app-gestionale',
  imports: [
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './gestionale.component.html',
  styleUrl: './gestionale.component.css'
})
export class GestionaleComponent {
}
