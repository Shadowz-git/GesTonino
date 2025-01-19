import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  registerForm!: FormGroup; // Usa "!" per indicare che verrà inizializzato in ngOnInit()

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const email= this.registerForm.get('email')?.value;
      const password= this.registerForm.get('password')?.value;
      this.authService.register(email, password).subscribe(
        response => {
          this.notificationService.addNotification({
            title: 'Registrazione Completata!',
            message: 'Ora puoi accedere.',
            type: 'success',
          })
          this.router.navigate(['/auth/login']);
        },
        error => {
          this.notificationService.addNotification({
            title: 'Errore durante la registrazione.',
            message: error.error.message,
            type: 'error',
          })
        }
      );
    }
  }
}
