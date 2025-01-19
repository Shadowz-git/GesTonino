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
  selected: boolean;
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
    // Recupera activityId dal localStorage o usa una stringa vuota come fallback
    const activityId = localStorage.getItem("activity_id") || "";

    // Crea HttpParams per passare activityId come query parameter
    const params = new HttpParams().set('activity_id', activityId);

    // Effettua la richiesta HTTP con i params
    return this.http.get<Product[]>(`${this.apiUrl}/getAllProducts`, { params });
  }

  updateProduct(code: string, activityId: string|null, product: any): Observable<any> {
    const url = `${this.apiUrl}/editProduct?code=${code}&activityId=${activityId}`;
    console.log("URL: ",url);
    return this.http.put(url, product);
  }

  getProductCounts(): Observable<{ lowStockCount: number; outOfStockCount: number }> {
    // Recupera activityId dal localStorage o usa una stringa vuota come fallback
    const activityId = localStorage.getItem("activity_id") || "";

    // Crea HttpParams per passare activityId come query parameter
    const params = new HttpParams().set('activity_id', activityId);

    return this.http.get<{ lowStockCount: number; outOfStockCount: number }>(
      `${this.apiUrl}/getProductCounts`, { params });
  }


  deleteProductsByCodesAndActivityId(codes: string[], activityId: string | null): Observable<void> {
    const url = `${this.apiUrl}/deleteProducts?codes=${codes.join(',')}&activityId=${activityId}`;
    return this.http.delete<void>(url);
  }

  /**
   * Cerca i prodotti in base ai criteri di ricerca.
   * @param query Nome del prodotto da cercare
   * @param lat Latitudine del punto di ricerca
   * @param lng Longitudine del punto di ricerca
   * @param radius Raggio di ricerca in km
   * @param priceRange Oggetto con `min` e `max` per il range di prezzo
   * @returns Observable con i prodotti trovati
   */
  searchProducts(
    query: string,
    lat: number,
    lng: number,
    radius: number,
    priceRange: { min: number; max: number }
  ): Observable<any> {
    let params = new HttpParams();

    // Aggiunge i parametri alla richiesta
    if (query) params = params.set('query', query);
    if (lat) params = params.set('lat', lat.toString());
    if (lng) params = params.set('lng', lng.toString());
    if (radius) params = params.set('radius', radius.toString());
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

  getTotalProdAndTotalPrice(): Observable<any>{
    let params = new HttpParams();
    params=params.set('activity_id', localStorage.getItem("activity_id") || "");
    return this.http.get(`${this.apiUrl}/getTotalProdAndTotalPrice`, { params });
  }

}
