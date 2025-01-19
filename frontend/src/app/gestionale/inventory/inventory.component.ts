import {Component, OnInit} from '@angular/core';
import { Item } from '../models/item.model';
import {HeaderInventoryComponent} from '../components/header-inventory/header-inventory.component';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {EditProductDialogComponent} from '../components/edit-product-dialog/edit-product-dialog.component';
import {AddProductDialogComponent} from '../components/add-product-dialog/add-product-dialog.component';
import {FilterService} from '../../services/filter.service';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  imports: [
    HeaderInventoryComponent,
    FormsModule,
    NgForOf,
    CurrencyPipe,
    EditProductDialogComponent,
    AddProductDialogComponent,
    NgIf
  ],
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  items: Item[] = []; // Lista completa degli item
  filteredItems: Item[] = []; // Lista filtrata
  paginatedItems: Item[] = []; // Elementi per pagina
  selectedItems: Set<number> = new Set<number>(); // ID degli item selezionati
  selectedItemsCount: number = 0;
  currentPage = 1; // Pagina corrente
  itemsPerPage = 10; // Elementi per pagina
  totalPages = 1; // Numero totale di pagine

  searchQuery = ''; // Query di ricerca
  editingItem: Item | null = null; // Item in modifica
  addingItem = false; // Stato per aggiunta prodotto

  constructor(private filterService: FilterService, private productService: ProductService,) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    console.log("Sono in loaditems");
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        // Aggiungi la proprietà `selected` a ogni prodotto
        this.items = products.map(product => ({ ...product, selected: false }));
        console.log("items", this.items, "products", products);
        this.filteredItems = [...this.items];
        this.selectedItemsCount = this.filteredItems.length;
        this.updatePagination();
      },
      error: (err) => {
        console.error('Errore nel caricare gli item:', err);
      }
    });
  }

  updatePagination(): void {
    // Aggiorna la lista paginata
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.filteredItems.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  onItemsPerPageChange(newItemsPerPage: number): void {
    this.itemsPerPage = newItemsPerPage;
    this.currentPage = 1;
    this.updatePagination();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.filteredItems = this.filterService.applyAdvancedFilters(this.items, query);
    this.currentPage = 1;
    this.updatePagination();
  }

  toggleSelection(item: Item): void {
    item.selected = !item.selected;
    this.updateSelectedCount();
  }

  toggleSelectAll(): void {
    const allSelected = this.filteredItems.every(item => item.selected);
    this.filteredItems.forEach(item => item.selected = !allSelected);
    this.updateSelectedCount();
  }

  updateSelectedCount(): void {
    this.selectedItemsCount = this.filteredItems.filter(item => item.selected).length;
  }
  deleteSelected(): void {
    // Ottieni i prodotti selezionati
    const selectedProducts = this.filteredItems.filter(item => item.selected);

    console.log('Prodotti selezionati:', selectedProducts); // Debug

    if (selectedProducts.length === 0) {
      console.error('Nessun prodotto selezionato');
      return;
    }

    const selectedCodes = selectedProducts.map(product => product.code);

    console.log('Codici dei prodotti selezionati:', selectedCodes); // Debug

    const activityId = localStorage.getItem("activity_id");

    if (!activityId) {
      console.error('activityId non è definito');
      return;
    }

    this.productService.deleteProductsByCodesAndActivityId(selectedCodes, activityId).subscribe({
      next: () => {
        console.log('Prodotti eliminati con successo');
        this.loadItems();
      },
      error: (error) => {
        console.error('Errore durante l\'eliminazione dei prodotti', error);
      }
    });
  }

  addItem(): void {
    this.addingItem = true;
  }

  onSaveAdd(newItem: Item): void {
    this.items.push(newItem);
    this.filteredItems = [...this.items];
    this.addingItem = false;
    this.updatePagination();
  }

  onCancelAdd(): void {
    this.addingItem = false;
  }

  onEditItem(itemCode: string): void {
    this.editingItem = this.items.find(item => item.code === itemCode) || null;
  }

  onSaveEdit(updatedItem: Item): void {
    const index = this.items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = updatedItem;
      this.filteredItems = [...this.items];
    }
    this.editingItem = null;
    this.updatePagination();
  }

  onCancelEdit(): void {
    this.editingItem = null;
  }

  get isAllSelected(): boolean {
    return this.selectedItems.size === this.filteredItems.length;
  }
}

