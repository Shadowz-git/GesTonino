import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../components/navbar/navbar.component';

@Component({
  selector: 'app-gestionale',
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './gestionale.component.html',
  styleUrl: './gestionale.component.css'
})
export class GestionaleComponent {

}
