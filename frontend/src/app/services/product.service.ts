import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  code: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  discount: number;
  activityId?: string;
  activityName?: string;
  activityLat?: number;
  activityLng?: number;
}

export interface ProductFilters {
  category?: string[];
  priceRange?: { min: number; max: number };
}

export interface Activity {
  name: string;
  lat: number;
  lng: number;
  filteredProductCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products'; // URL del backend

  constructor(private http: HttpClient) {}


  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/getAllProducts`);
  }

  /**
   * Cerca i prodotti in base ai criteri di ricerca.
   * @param query Nome del prodotto da cercare
   * @param lat Latitudine del punto di ricerca
   * @param lng Longitudine del punto di ricerca
   * @param radius Raggio di ricerca in km
   * @param categories Array di categorie da filtrare
   * @param priceRange Oggetto con `min` e `max` per il range di prezzo
   * @returns Observable con i prodotti trovati
   */
  searchProducts(
    query: string,
    lat: number,
    lng: number,
    radius: number,
    categories: string[],
    priceRange: { min: number; max: number }
  ): Observable<any> {
    let params = new HttpParams();

    // Aggiunge i parametri alla richiesta
    if (query) params = params.set('query', query);
    if (lat) params = params.set('lat', lat.toString());
    if (lng) params = params.set('lng', lng.toString());
    if (radius) params = params.set('radius', radius.toString());
    if (categories && categories.length > 0) {
      params = params.set('categories', categories.join(','));
    }
    if (priceRange) {
      if (priceRange.min !== undefined && priceRange.min !== -1) {
        params = params.set('minPrice', priceRange.min.toString());
      }
      if (priceRange.max !== undefined && priceRange.max !== -1) {
        params = params.set('maxPrice', priceRange.max.toString());
      }
    }

    // Esegue la richiesta HTTP GET al backend
    return this.http.get(`${this.apiUrl}/searchProducts`, { params });
  }
}
