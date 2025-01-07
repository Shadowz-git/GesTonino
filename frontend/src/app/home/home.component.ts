import { Component } from '@angular/core';
import {HeaderComponent} from '../layout/header/header.component';
import {MapComponent} from '../map/map.component';
import {LoginComponent} from '../auth/login/login.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    MapComponent,
    LoginComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
