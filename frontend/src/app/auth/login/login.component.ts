import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (success) => {
        if (success) {
          alert('Login effettuato con successo!');
          // Puoi reindirizzare a un'altra pagina, ad esempio:
          // this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Credenziali non valide!';
        }
      },
      error: () => {
        this.errorMessage = 'Errore durante il login. Riprova più tardi.';
      }
    });
  }
}
