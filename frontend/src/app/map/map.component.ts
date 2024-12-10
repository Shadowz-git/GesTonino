import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements OnInit {
  private map: L.Map | undefined;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Crea la mappa
    this.map = L.map('map', {
      center: [39.35661,16.2406215], // Latitudine e longitudine iniziali
      zoom: 16,
      zoomControl: false
    });

    // Aggiungi un livello tile (es. OpenStreetMap)
    L.tileLayer('https://api.maptiler.com/maps/bright-v2/{z}/{x}/{y}.png?key=3Hge8kPqBdsue4YlJEmA', {
      maxZoom: 16,
      attribution: 'GesTonino',
      minZoom: 16,
    }).addTo(this.map);
  }
}
