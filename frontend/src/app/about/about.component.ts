import { Component } from '@angular/core';
import {HeaderComponent} from '../layout/header/header.component';
import {NgOptimizedImage} from '@angular/common';
import {FooterComponent} from '../layout/footer/footer.component';

@Component({
  selector: 'app-about',
  imports: [
    HeaderComponent,
    NgOptimizedImage,
    FooterComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
