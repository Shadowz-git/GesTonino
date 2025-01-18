import { Component, EventEmitter, Output, Input } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Product, ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-header-inventory',
  templateUrl: './header-inventory.component.html',
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./header-inventory.component.css']
})

// TODO: Stile fatto bene dei bottoni e css
export class HeaderInventoryComponent {

  @Input() searchQuery: string = '';// Query di ricerca passata dal parent
  @Input() selectedCount: number = 0; // Conteggio degli items selezionati
  @Input() isAllSelected: boolean = false; // Indica se tutti gli items sono selezionati
  @Input() itemsPerPage: number = 10; // Numero di items per pagina (valore di default)
  @Input() itemsPerPageOptions: number[] = [5, 10, 20, 50]; // Opzioni per gli items per pagina
  @Input() products: Product[] = [];

  @Output() search = new EventEmitter<string>(); // Emette la query di ricerca
  @Output() selectAll = new EventEmitter<void>(); // Emette il comando per selezionare/deselezionare tutti gli items
  @Output() deleteSelected = new EventEmitter<void>(); // Emette il comando per eliminare gli items selezionati
  @Output() itemsPerPageChange = new EventEmitter<number>(); // Emette il comando per cambiare gli items per pagina
  @Output() addProduct = new EventEmitter<void>(); // Emette il comando per aggiungere un nuovo prodotto

  constructor(private productService: ProductService) { }

  // Metodo per inviare la ricerca
  onSearch(event: any) {
    this.search.emit(this.searchQuery);
  }

  // Metodo per inviare la selezione/deselezione di tutti gli items
  toggleSelectAll() {
    this.selectAll.emit();
  }


  // Metodo per gestire il cambio del numero di items per pagina
  onItemsPerPageChange(event: any) {
    this.itemsPerPageChange.emit(this.itemsPerPage);
  }

  // Metodo per aggiungere un nuovo prodotto
  onAddProduct() {
    this.addProduct.emit();
  }
}
