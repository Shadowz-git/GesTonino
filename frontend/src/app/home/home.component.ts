import { Component } from '@angular/core';
import {HeaderComponent} from '../layout/header/header.component';
import {MapComponent} from '../map/map.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    MapComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
