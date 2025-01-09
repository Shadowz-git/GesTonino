import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4200/api/auth/login'; // Modifica l'URL se necessario

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const payload = { username, password };
    return this.http.post<boolean>(this.apiUrl, payload);
  }
}
