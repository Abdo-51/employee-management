import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = signal<any>(null);
  readonly user = computed(() => this._user());

  private baseUrl = 'http://localhost:3000'; // json-server

  constructor(private http: HttpClient) { 
    const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this._user.set(JSON.parse(storedUser));
      }
  }

  signup(data : any ){
    return this.http.post<any>(`${this.baseUrl}/users`, data);
  }
 login(data: any) {
  return this.http
    .get<any[]>(`${this.baseUrl}/users?email=${data.email}&password=${data.password}`)
    .pipe(
      map((users) => {
        if (users.length > 0) {
          const user = users[0];
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('JWT', 'fake-jwt-token');
          this._user.set(user);
          return user;
        } else {
          throw new Error('Invalid credentials');
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => new Error('Invalid email or password'));
      })
    );
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
