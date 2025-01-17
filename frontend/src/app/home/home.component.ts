import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../layout/header/header.component';
import {MapComponent} from '../map/map.component';
import {LoginComponent} from '../auth/login/login.component';
import {FooterComponent} from "../layout/footer/footer.component";
import {ProductResearchComponent} from './product-research/product-research.component';
import {LocationService} from '../services/location.service';
import {Activity, Product, ProductFilters, ProductService} from '../services/product.service';
import {MatDialog} from '@angular/material/dialog';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    ProductResearchComponent,
    CurrencyPipe,
    NgIf,
    MapComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // Dati per la ricerca
  city: string = 'Quattromiglia, CS';
  lat: number = 39.3333; // Latitudine iniziale
  lng: number = 16.2333; // Longitudine iniziale
  range: number = 50; // Range in km
  productQuery: string = ''; // Query di ricerca prodotto
  filters: ProductFilters = {}; // Filtri applicati

  // Risultati
  results: Product[] = []; // Prodotti trovati
  activities: Activity[] = []; // Attività aggregate per la mappa
  private citySubject = new Subject<string>();

  constructor(
    private locationService: LocationService,
    private productService: ProductService,
    private dialog: MatDialog
  ) {
    //Visto che veniva eseguita una query per ogni carattere
    //digitato, usando questo metodo la query viene eseguita una
    //volta terminata la parola.
    this.citySubject.pipe(
      debounceTime(300), // Aspetta 300ms dopo l'ultimo input prima di procedere
      distinctUntilChanged() // Ignora se il valore non è cambiato rispetto all'ultimo
    ).subscribe(newCity => {
      this.locationService.getCoordinatesFromCity(newCity).subscribe({
        next: ({ lat, lng }) => {
          this.lat = lat;
          this.lng = lng;
        },
        error: () => {
          console.error('Errore nel recupero delle coordinate dalla città');
        },
      });
    });
  }

  ngOnInit(): void {
    // Inizializzazione (se necessario) eseguita al caricamento della Home
    this.fetchInitialCoordinates();
  }

  /**
   * Recupera le coordinate iniziali basate sulla città predefinita.
   */
  fetchInitialCoordinates() {
    this.locationService.getCoordinatesFromCity(this.city).subscribe({
      next: (coords) => {
        this.lat = coords.lat;
        this.lng = coords.lng;
      },
      error: () => {
        console.error('Errore nel recupero delle coordinate iniziali');
      },
    });
  }

  /**
   * Recupera il nome della città che stai cercando.
   */
  onCityChange(newCity: string) {
    this.city = newCity;
    this.citySubject.next(newCity); // Emetti il nuovo valore nel Subject
  }

  /**
   * Aggiorna il range selezionato dall'utente.
   */
  onRangeChange(newRange: number) {
    this.range = newRange;
  }

  /**
   * Aggiorna la query di ricerca.
   */
  onProductSearchChange(query: string) {
    this.productQuery = query;
  }

  /**
   * Aggiorna i filtri applicati.
   */
  onFiltersChange(updatedFilters: any) {
    this.filters = updatedFilters;
  }

  /**
   * Esegue la ricerca dei prodotti utilizzando i parametri attuali.
   */
  onSearch() {
    this.productService
      .searchProducts(
        this.productQuery,
        this.lat,
        this.lng,
        this.range,
        this.filters.category || [],
        this.filters.priceRange || { min: -1, max: -1 }
      )
      .subscribe({
        next: (response: Product[]) => {
          this.results = response;
          this.aggregateBusinessesFromProducts(response);
        },
        error: () => {
          console.error('Errore nella ricerca dei prodotti');
        },
      });
  }

  /**
   * Aggrega i prodotti per attività per visualizzarli sulla mappa.
   */
  private aggregateBusinessesFromProducts(products: Product[]) {
    const activitiesMap: { [key: string]: Activity } = {};

    products.forEach((product) => {
      // @ts-ignore
      if (!activitiesMap[product.activityId]) {
        // @ts-ignore
        activitiesMap[product.activityId] = {
          name: product.activityName,
          lat: product.activityLat,
          lng: product.activityLng,
          filteredProductCount: 0,
        };
      }
      // @ts-ignore
      activitiesMap[product.activityId].filteredProductCount++;
    });

    this.activities = Object.values(activitiesMap);
  }

  public viewDetails(product: Product) {
    console.log(product);
  }
}
