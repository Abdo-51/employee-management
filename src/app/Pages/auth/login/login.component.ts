import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule, RouterLink, CommonModule ,ReactiveFormsModule  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  isLoading = signal(false);
  errorMsg = signal('');

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
 onSubmit() {
  console.log(this.loginForm.value);
  console.log(this.loginForm.valid);

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.isLoading.set(true);

  this.auth.login(this.loginForm.value).subscribe({
    next: () => {
      this.isLoading.set(false);
      this.router.navigate(['/dashboard']);
    },
    error: () => {
      this.isLoading.set(false);
      this.errorMsg.set('Login failed. Please check your credentials.');
    },
  });
}

}
