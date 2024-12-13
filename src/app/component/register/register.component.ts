import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    name: ['', Validators.required],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;

    const registerData = this.registerForm.value;

    this.authService.register(registerData).subscribe(
      (response) => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao registrar. Tente novamente.';
      }
    );
  }

  onGoToLogin() {
    this.router.navigate(['/login']);
  }
}
