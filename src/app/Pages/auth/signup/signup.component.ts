import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './signup.component.html',
styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
   fb = inject(FormBuilder);
   auth = inject(AuthService);
   router = inject(Router);

  isLoading = signal(false);
  errorMsg = signal('');


  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
     if (this.form.value.password !== this.form.value.confirmPassword) {
      this.errorMsg.set('Passwords do not match');
      return;
    }
    this.isLoading.set(true);
    this.auth.signup(this.form.value).subscribe({
      next: () => {
        this.isLoading.set(false);
        alert('Account created successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMsg.set('Signup failed. Please try again.');
      },
    });
  }
}
