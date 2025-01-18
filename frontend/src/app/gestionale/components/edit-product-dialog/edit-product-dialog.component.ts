import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../../services/product.service';

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

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // Copia del prodotto per evitare modifiche dirette all'originale
    this.updatedProduct = { ...this.product };
  }

  onCancel() {
    this.cancel.emit();
  }

  onSave() {
    const code = this.updatedProduct.code;
    const activityId:string|null = localStorage.getItem("activity_id"); // Assicurati che activity_id sia presente nel prodotto
    console.log("ActivityId:",activityId);
    this.productService.updateProduct(code, activityId, this.updatedProduct).subscribe({
      next: (response) => {
        this.save.emit(this.updatedProduct); // Emetti l'evento save con il prodotto aggiornato
      },
      error: (error) => {
        console.error('Errore durante l\'aggiornamento del prodotto', error);
      }
    });
  }
}
