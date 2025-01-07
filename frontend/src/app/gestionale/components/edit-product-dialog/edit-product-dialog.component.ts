import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent {
  @Input() product: any;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  updatedProduct: any;

  ngOnInit() {
    // Copia del prodotto per evitare modifiche dirette all'originale
    this.updatedProduct = { ...this.product };
  }

  onCancel() {
    this.cancel.emit();
  }

  onSave() {
    this.save.emit(this.updatedProduct);
  }
}
