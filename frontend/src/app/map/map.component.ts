import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {Product, Activity} from '../services/product.service';
import {MapService} from '../services/map.service';



@Component({
  selector: 'app-map',
  imports: [
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements OnChanges, OnInit {
  @Input() latitude: number = 39.3333; // Latitudine iniziale
  @Input() longitude: number = 16.2333; // Longitudine iniziale
  @Input() range: number = 50; // Range in km
  @Input() searchResults: Product[] = []; // Risultati della ricerca
  @Input() activities: Activity[] = [];

  constructor(private mapService: MapService) {
  }

  ngOnInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['latitude'] || changes['longitude'] || changes['range']) {
      this.updateMapView();
    }

    if (changes['activities']) {
      this.updateMarkers();
    }
  }

  private initMap(): void {
    this.mapService.initializeMap('map', this.latitude, this.longitude, 12)
  }

  private updateMapView(): void {
    if (this.mapService.getMap()) {
      this.mapService.setCenter(this.latitude, this.longitude);
      this.mapService.setZoom(this.getZoomLevel())
    }
  }

  private updateMarkers(): void {
    this.mapService.removeMarkers();

    this.activities.forEach((activity: Activity) => {
      const marker = L.marker([activity.lat, activity.lng]);

      // Pop-up con nome dell'attività e numero di prodotti filtrati
      marker.bindPopup(
        `<strong>${activity.name}</strong><br>Prodotti: ${activity.filteredProductCount}`
      );

      this.mapService.addExistentMarker(marker);
    });
  }

  private getZoomLevel(): number {
    // Converte il range in un livello di zoom approssimativo
    if (this.range <= 5) return 16;
    if (this.range <= 10) return 15;
    if (this.range <= 30) return 14;
    if (this.range <= 50) return 12;
    if (this.range <= 100) return 10;
    return 8;
  }
}
