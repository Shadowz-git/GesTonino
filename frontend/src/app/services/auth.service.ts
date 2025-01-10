import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUril = 'http://localhost:8080/api/auth/login'; // Modifica l'URL se necessario
  private registerUrl = 'http://localhost:8080/api/auth/register'; // Modifica l'URL se necessario

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    const payload = { email, password };
    return this.http.post<boolean>(this.loginUril, payload);
  }

  register(email: string, password: string): Observable<boolean> {
    const payload = { email, password };
    return this.http.post<boolean>(this.registerUrl, payload);
  }
}
