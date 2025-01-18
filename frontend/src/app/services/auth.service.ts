import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';


  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    });
  }

  // Metodo per memorizzare il token JWT (una volta ricevuto dal server)
  setSession(token: string) {
    localStorage.setItem('jwt_token', token);
  }

  // Metodo per ottenere il token JWT
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  // Metodo per rimuovere il token (logout)
  removeSession() {
    localStorage.removeItem('jwt_token');
  }

  register(email: string, password: string): Observable<boolean> {
    const payload = { email, password };
    return this.http.post<boolean>(`${this.apiUrl}/register`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  isAuthenticated(): boolean {
    return !!(localStorage.getItem('jwt_token') || this.getCookie('jwt_token'));
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }
}
