import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import {Activity} from './product.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: L.Map| any;
  private markers: L.Marker[] = [];
  private range: number = 50;
  private lat: number = 0;
  private lng: number = 0;
  private zoom: number = 12;

  constructor() { }

  initializeMap(containerId: string, lat: number, lng: number, zoom: number): void {
    this.lat = lat;
    this.lng = lng;
    this.zoom = zoom;
    this.map = L.map(containerId, {
      center: [lat, lng],
      zoom: zoom,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      boxZoom: false,
      doubleClickZoom: false,
    });

    // Layer della mappa (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  // Restituisce l'istanza della mappa
  getMap(): L.Map {
    return this.map;
  }

  // Centra la mappa in una posizione specifica
  setCenter(lat: number, lng: number): void {
    this.lat = lat;
    this.lng = lng;
    if (this.map) {
      this.map.setView([lat, lng], this.map.getZoom());
    }
  }

  setZoom(zoom: number): void {
    this.zoom = zoom;
    if (this.map) {
      this.map.setView([this.lat, this.lng], zoom);
    }
  }

  addExistentMarker(marker: L.Marker | any): void {
    this.markers.push(marker);
  }

  updateMarkers(activities: Activity[]): void {
    // Rimuovi tutti i marker esistenti
    this.removeMarkers();

    // Aggiungi i nuovi marker per ogni attività
    activities.forEach((activity: Activity) => {
      const customDivIcon = L.divIcon({
        className: 'custom-div-icon',
        html: this.createMarkerHtml(activity.filteredProductCount, activity.name),
        iconSize: [200, 50],
        iconAnchor: [100, 25] // Centro del marker
      })

      const marker = L.marker([activity.lat, activity.lng], {icon: customDivIcon});

      // Aggiungi un popup con il nome dell'attività e il numero di prodotti filtrati
      marker.bindPopup(
        `<strong>${activity.name}</strong><br>Prodotti: ${activity.filteredProductCount}`
      );


      marker.addTo(this.map)
      this.markers.push(marker);
    });
  }


  // Aggiungi un marker alla mappa
  addMarker(lat: number, lng: number): L.Marker {
    const marker = L.marker([lat, lng]).addTo(this.map);
    this.markers.push(marker);
    return marker;
  }

  removeMarker(marker: L.Marker): void {
    this.markers.splice(this.markers.indexOf(marker), 1);
  }

  // Rimuove tutti i marker dalla mappa
  removeMarkers(): void {
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });
    this.markers = [];
  }

  // Funzione per generare il codice HTML del marker
  createMarkerHtml(products: number, name: string): string {
    const backgroundColor = this.getBackgroundColor(products);

    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 70" class="relative" width="200" height="70">
      <!-- Rettangolo del marker -->
      <rect x="0" y="0" width="200" height="60" rx="10" ry="10" fill="${backgroundColor}" />

      <!-- Numero di prodotti -->
      <text x="10" y="30" font-family="Arial" font-size="20" fill="white" font-weight="bold">${products}</text>

      <!-- Nome dell'attività -->
      <text x="50" y="30" font-family="Arial" font-size="16" fill="white">${name}</text>

      <!-- Freccia in basso (triangolo) -->
      <polygon points="90,60 100,70 110,60" fill="${backgroundColor}" />
    </svg>
  `;
  }

  // Funzione per determinare il colore di sfondo in base al numero di prodotti
  getBackgroundColor(products: number): string {
    if (products === 1) {
      return '#3b82f6';  // Blu per 1 prodotto
    } else if (products <= 5) {
      return '#eab308';  // Giallo per 2-5 prodotti
    } else {
      return '#22c55e';  // Verde per più di 5 prodotti
    }
  }

  // Abilita le opzioni (quando si apre il dialogo)
  enableMapInteractions(): void {
    this.map.zoomControl = true;
    this.map.dragging = true;
    this.map.scrollWheelZoom = true;
    this.map.doubleClickZoom = true;
    this.map.boxZoom = true;
  }

  // Disabilita le opzioni (quando si chiude il dialogo)
  disableMapInteractions(): void {
    this.map.zoomControl = false;
    this.map.dragging = false;
    this.map.scrollWheelZoom = false;
    this.map.doubleClickZoom = false;
    this.map.boxZoom = false;
  }
}
