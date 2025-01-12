import {Component, OnInit} from '@angular/core';
import { Item } from '../models/item.model';
import {HeaderInventoryComponent} from '../components/header-inventory/header-inventory.component';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {EditProductDialogComponent} from '../components/edit-product-dialog/edit-product-dialog.component';
import {AddProductDialogComponent} from '../components/add-product-dialog/add-product-dialog.component';
import {FilterService} from '../../services/filter.service';

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

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    // Carica gli item e imposta la paginazione
    this.items = [
      { id: 1, code: 'A101', name: 'Prodotto 1', category: 'Categoria 1', quantity: 10, price: 25.5, discount: 5 },
      { id: 2, code: 'B202', name: 'Prodotto 2', category: 'Categoria 2', quantity: 5, price: 15, discount: 10 },
      // Altri item...
    ]; // Simula il fetch
    this.filteredItems = [...this.items];
    this.selectedItemsCount = this.filteredItems.length;
    this.updatePagination();
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

  toggleSelectAll(): void {
    if (this.selectedItems.size === this.filteredItems.length) {
      this.selectedItems.clear();
    } else {
      this.filteredItems.forEach(item => this.selectedItems.add(item.id));
    }
  }

  toggleSelection(itemId: number): void {
    if (this.selectedItems.has(itemId)) {
      this.selectedItems.delete(itemId);
    } else {
      this.selectedItems.add(itemId);
    }
  }

  deleteSelected(): void {
    this.items = this.items.filter(item => !this.selectedItems.has(item.id));
    this.filteredItems = [...this.items];
    this.selectedItems.clear();
    this.updatePagination();
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

  onEditItem(itemId: number): void {
    this.editingItem = this.items.find(item => item.id === itemId) || null;
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

