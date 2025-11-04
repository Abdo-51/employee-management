import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class languageService {

   constructor(private translate: TranslateService) {
    
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    this.setLanguage('en');  // Default language
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    document.dir = lang === 'ar' ? 'rtl' : 'ltr'; 

    document.body.classList.remove('rtl', 'ltr');
    document.body.classList.add(lang === 'ar' ? 'rtl' : 'ltr');
  }

  get currentLanguage() {
    return this.translate.currentLang;
  }
}
