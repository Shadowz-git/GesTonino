import { Injectable } from '@angular/core';
import * as L from 'leaflet';

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
