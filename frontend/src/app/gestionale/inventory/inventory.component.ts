import { Component } from '@angular/core';
import {ItemComponent} from '../components/item/item.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-inventory',
  imports: [
    ItemComponent,
    NgForOf
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  products = [
    {name: 'Prodotto 1', quantity: 5, description: 'Descrizione prodotto 1', price: 20.00, code: '12345'},
    {name: 'Prodotto 2', quantity: 10, description: 'Descrizione prodotto 2', price: 15.00, code: '67890'},
    // Aggiungi altri prodotti qui
  ];

  onDelete(productCode: string) {
    this.products = this.products.filter(p => p.code !== productCode);
  }
}
