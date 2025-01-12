import { Component, Output, EventEmitter } from '@angular/core';
import {Item} from '../../models/item.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent {
  newProduct: Item = {
    id: Date.now(), // ID generato temporaneamente
    code: '',
    name: '',
    category: '',
    quantity: 0,
    price: 0,
    discount: 0,
  };

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Item>();

  onCancel() {
    this.cancel.emit();
  }

  onSave() {
    this.save.emit(this.newProduct);
  }
}
