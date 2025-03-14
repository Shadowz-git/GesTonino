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
    this.mapService.initializeMap('map', this.latitude, this.longitude, 12);
  }

  private updateMapView(): void {
    if (this.mapService.getMap()) {
      this.mapService.setCenter(this.latitude, this.longitude);
      this.mapService.setZoom(this.mapService.getZoomLevel(this.range))
    }
  }

  private updateMarkers(): void {
    // Passa l'array di attività al MapService per aggiungere i marker
    this.mapService.updateMarkers(this.activities);
  }
}
