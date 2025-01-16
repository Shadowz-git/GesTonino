import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org';

  constructor(private http: HttpClient) {}

  /**
   * Ottieni il nome della città a partire da coordinate geografiche.
   * @param lat Latitudine
   * @param lng Longitudine
   * @returns Observable<string> Nome della città
   */
  getCityFromCoordinates(lat: number, lng: number): Observable<string> {
    const url = `${this.NOMINATIM_API_URL}/reverse?format=json&lat=${lat}&lon=${lng}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        if (response && response.address) {
          return (
            response.address.city ||
            response.address.town ||
            response.address.village ||
            response.address.hamlet ||
            'Località sconosciuta'
          );
        }
        return 'Località sconosciuta';
      })
    );
  }

  /**
   * Ottieni le coordinate geografiche (latitudine e longitudine) a partire dal nome di una città.
   * @param cityName Nome della città
   * @returns Observable<{lat: number; lng: number}> Coordinate della città
   */
  getCoordinatesFromCity(cityName: string): Observable<{ lat: number; lng: number }> {
    const url = `${this.NOMINATIM_API_URL}/search?format=json&q=${encodeURIComponent(cityName)}`;

    return this.http.get<any[]>(url).pipe(
      map((response: any) => {
        if (response && response.length > 0) {
          const location = response[0];
          return {
            lat: parseFloat(location.lat),
            lng: parseFloat(location.lon),
          };
        }
        throw new Error('Località non trovata');
      })
    );
  }
}
