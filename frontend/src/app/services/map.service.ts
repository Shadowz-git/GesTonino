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
      <div class="flex items-center justify-between ${backgroundColor} text-white p-2 rounded-md shadow-lg">
        <span class="font-bold text-lg">${products}</span>
        <span class="ml-2 text-sm">${name}</span>
      </div>
    `;
  }

  // Funzione per determinare il colore di sfondo in base al numero di prodotti
  getBackgroundColor(products: number): string {
    if (products === 1) {
      return 'bg-blue-500';  // Blu per 1 prodotto
    } else if (products <= 5) {
      return 'bg-yellow-500';  // Giallo per 2-5 prodotti
    } else {
      return 'bg-green-500';  // Verde per più di 5 prodotti
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
