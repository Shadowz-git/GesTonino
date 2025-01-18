import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response) {
          alert('Login effettuato con successo!');
          this.authService.setSession(response.token);
          this.authService.setUser(response.user, response.user_id);
          this.authService.setActivity(response.activity_id, response.activity_name);

          this.router.navigate(['/gestionale']);
        } else {
          console.log("No");
        }
      },
      error: () => {
        this.errorMessage = 'Errore durante il login. Riprova più tardi.';
      }
    });
  }
}
