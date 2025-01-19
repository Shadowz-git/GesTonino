import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../../layout/footer/footer.component';

@Component({
  selector: 'app-auth',
  imports: [
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
