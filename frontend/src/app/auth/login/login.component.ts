import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink
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
    private router: Router,
    private notificationService: NotificationService
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response) {
          this.notificationService.addNotification({
            title: 'Successo!',
            message: 'Login effettuato con successo!',
            type: 'success'
          })
          this.authService.setSession(response.token);
          this.authService.setUser(response.user, response.user_id);
          this.authService.setActivity(response.activity_id, response.activity_name);

          this.router.navigate(['/gestionale']);
        } else {
        }
      },
      error: () => {
        this.notificationService.addNotification({
          title: 'Errore',
          message: 'Si è verificato un errore durante il login. Riprova più tardi.',
          type: 'error'
        })
        this.errorMessage = 'Errore durante il login. Riprova più tardi.';
      }
    });
  }
}
