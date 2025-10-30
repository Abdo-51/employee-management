import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { languageService } from '../../shared/language.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule , TranslateModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private _user = signal<any>(null);
  readonly user = computed(() => this._user());

  router = inject(Router);
  auth = inject(AuthService);
  lang = inject(languageService);

  setLang(lang: string) {
    this.lang.setLanguage(lang);
  }

  logout() {
    localStorage.removeItem('JWT');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
