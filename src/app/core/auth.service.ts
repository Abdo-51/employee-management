import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = signal<any>(null);
  readonly user = computed(() => this._user());

  private baseUrl = 'https://localhost:3000'; // json-server

  constructor(private http: HttpClient) { }

  signup(data : any ){
    return this.http.post<any>(`${this.baseUrl}/users`, data);
  }
  login(data : any ){
    return this.http.get<any[]>(`${this.baseUrl}/users?email=${data.email}&password=${data.password}`).
    pipe(tap(users => {
      if (users.length) {
        localStorage.setItem('user', JSON.stringify(users));
        localStorage.setItem('JWT', 'token');
        this._user.set(users);
      }else{
        throw new Error('Invalid credentials');
      }
    }))
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('JWT');
    this._user.set(null);
  }

  isLoggedIn(){
    return !!localStorage.getItem('JWT');
  }

}
