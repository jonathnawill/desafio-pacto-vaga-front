import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInZoom', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translate(-50%, -30%)',
        })
      ),
      transition(':enter, :leave', [animate('800ms')]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  tokenExpiredNotif: boolean = false;

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  errorMessage: string | null = null;
  isLoading: boolean = false;

  onGoToRegister(): void {
    this.router.navigate(['/register']);
  }

  onLogin(): void {
    this.errorMessage = null;
    this.isLoading = true;

    const username = this.loginForm.get('username')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(username, password).subscribe(
      (response) => {
        localStorage.setItem('userId', JSON.stringify(response.id));
        localStorage.setItem('name', JSON.stringify(response.name))
        localStorage.setItem('username', response.username);
        const token = response.token;
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', response.userRole);

        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      },
      (e) => {
        if (e.error && typeof e.error === 'string') {
          this.errorMessage = e.error;
        } else if (e.error && e.error.message) {
          this.errorMessage = e.error.message;
        } else {
          this.errorMessage = 'Ocorreu um erro desconhecido';
        }

        this.isLoading = false;
      }
    );
  }
}
