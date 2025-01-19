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
      dragging: true,
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

    // Impostiamo una larghezza fissa per il rettangolo
    const rectWidth = 200;

    // Funzione che avvolge il testo su più righe
    const wrapText = (text: string, maxWidth: number, fontSize: number): string => {
      const words = text.split(' ');
      let lines = [];
      let currentLine = '';

      const getTextWidth = (line: string) => {
        const canvas = document.createElement('canvas');
        const context: CanvasRenderingContext2D | any = canvas.getContext('2d');
        context.font = `${fontSize}px Arial`;
        return context.measureText(line).width;
      };

      words.forEach(word => {
        const newLine = currentLine ? `${currentLine} ${word}` : word;
        if (getTextWidth(newLine) < maxWidth) {
          currentLine = newLine;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      });

      if (currentLine) {
        lines.push(currentLine);
      }

      return lines.map((line, index) => `<tspan x="50" y="${30 + index * fontSize}" font-family="Arial" font-size="${fontSize}" fill="white">${line}</tspan>`).join('');
    };

    // Ora utilizziamo la funzione wrapText per il nome dell'attività
    const wrappedName = wrapText(name, rectWidth - 60, 16); // Considera il margine laterale di 60px

    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${rectWidth} 70" width="${rectWidth}" height="70">
      <!-- Rettangolo del marker con il colore di sfondo -->
      <rect x="0" y="0" width="${rectWidth}" height="60" rx="10" ry="10" fill="${backgroundColor}" />

      <!-- Numero di prodotti -->
      <text x="10" y="30" font-family="Arial" font-size="20" fill="white" font-weight="bold">${products}</text>

      <!-- Nome dell'attività con text wrapping -->
      <text>
        ${wrappedName}
      </text>

      <!-- Freccia in basso (triangolo) -->
      <polygon points="90,60 100,70 110,60" fill="${backgroundColor}"/>
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

  getZoomLevel(range: number): number {
    this.range = range;
    // Converte il range in un livello di zoom approssimativo
    if (this.range <= 5) return 16;
    if (this.range <= 10) return 15;
    if (this.range <= 30) return 14;
    if (this.range <= 50) return 12;
    if (this.range <= 100) return 10;
    return 8;
  }
}
