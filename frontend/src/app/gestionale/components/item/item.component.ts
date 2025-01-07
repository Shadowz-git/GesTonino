import { Component, Input, Output, EventEmitter } from '@angular/core';
import {EditProductDialogComponent} from '../edit-product-dialog/edit-product-dialog.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  imports: [
    EditProductDialogComponent,
    NgIf
  ],
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() product: any;
  @Output() delete = new EventEmitter<string>();

  showEditDialog = false;

  openEditDialog() {
    this.showEditDialog = true; // Mostra il dialog
  }

  closeEditDialog() {
    this.showEditDialog = false; // Chiudi il dialog
  }

  saveEdit(updatedProduct: any) {
    // Salva le modifiche al prodotto
    this.product = { ...updatedProduct }; // Aggiorna il prodotto locale
    this.closeEditDialog();
  }
}
