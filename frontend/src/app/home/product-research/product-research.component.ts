import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductFilterDialogComponent} from '../product-filter-dialog/product-filter-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ProductFilters} from '../../services/product.service';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-product-research',
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
  ],
  templateUrl: './product-research.component.html',
  styleUrl: './product-research.component.css'
})
export class ProductResearchComponent {
  @Input() city: string = '';
  @Input() lat: number = 0;
  @Input() lng: number = 0;
  @Input() range: number = 50;
  @Input() productQuery: string = '';
  @Input() filters: ProductFilters = {};
  @Input() itemFindedCount: number = 0;

  @Output() cityChange = new EventEmitter<string>();
  @Output() rangeChange = new EventEmitter<number>();
  @Output() productSearchChange = new EventEmitter<string>();
  @Output() filtersChange = new EventEmitter<any>();
  @Output() search = new EventEmitter<void>();

  constructor(private dialog: MatDialog) { }

  // Metodo per gestire il cambio della città
  onCityChange(newCity: string) {
    this.city = newCity;
    this.cityChange.emit(this.city); // Comunica il cambiamento al componente genitore
  }

  // Metodo per gestire il cambio del range
  onRangeChange(newRange: number) {
    this.range = newRange;
    this.rangeChange.emit(this.range); // Comunica il cambiamento al componente genitore
  }

  // Metodo per gestire la modifica della query di ricerca
  onSearchQueryChange(query: string) {
    this.productQuery = query;
    this.productSearchChange.emit(this.productQuery); // Comunica il cambiamento al componente genitore
  }

  // Apertura del dialog per i filtri avanzati
  openFilterDialog() {
    const dialogRef = this.dialog.open(ProductFilterDialogComponent, {
      width: '400px',
      data: this.filters,
    });

    dialogRef.afterClosed().subscribe((updatedFilters: any) => {
      if (updatedFilters) {
        this.filters = updatedFilters;
        this.filtersChange.emit(this.filters); // Comunica i filtri al componente genitore
      }
    });
  }

  // Metodo per inviare l'evento di ricerca al componente genitore
  onSearch() {
    this.search.emit();
  }
}
