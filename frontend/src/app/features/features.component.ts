import { Component } from '@angular/core';
import {HeaderComponent} from '../layout/header/header.component';
import {FooterComponent} from '../layout/footer/footer.component';

@Component({
  selector: 'app-features',
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {

}
