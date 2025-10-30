import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { languageService } from './shared/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , NavbarComponent],
templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'employee-management';
  router = inject(Router);
  lang = inject(languageService);


  constructor() {
    this.lang.setLanguage(this.lang.currentLanguage);
  }

  setLang(lang: string) {
    this.lang.setLanguage(lang);
  }
}
