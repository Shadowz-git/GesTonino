import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  registerForm!: FormGroup; // Usa "!" per indicare che verrà inizializzato in ngOnInit()

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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
      console.log(email);
      const password= this.registerForm.get('password')?.value;
      this.authService.register(email, password).subscribe(
        response => {
          alert('Registrazione completata! Ora puoi accedere.');
          this.router.navigate(['/auth/login']);
        },
        error => {
          alert('Errore durante la registrazione: ' + error.error.message);
        }
      );
    }
  }
}
