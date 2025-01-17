import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private apiUrl = 'http://localhost:8080/api/activities/createActivity';  // Sostituisci con l'URL del tuo API endpoint

  constructor(private http: HttpClient) {}

  // Funzione per inviare i dati al backend
  addActivity(data: {
    address: string;
    cap: string;
    latitude: number;
    name: string;
    user: number;
    longitude: number
  }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
