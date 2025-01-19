import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {Item} from '../../models/item.model';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ProductService, Product } from '../../../services/product.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./add-product-dialog.component.css']
})


export class AddProductDialogComponent implements OnInit {
  productForm: FormGroup;
  categories: any[] = []; // Popolato con l'API delle categorie
  activities: any[] = []; // Popolato con l'API delle attività


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      id:Date.now(),
      name: "",
      code: "",
      price: 0,
      quantity: 0,
      discount: 0,
      category: "",
      activity: "",
    });
  }

  @Output() productAdded = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Item>();

  ngOnInit() {
    this.loadCategories();
    this.loadActivities();
  }

  loadCategories() {
    this.http.get('http://localhost:8080/api/categories').subscribe((data: any) => {
      this.categories = data;
    });
  }

  loadActivities() {
    this.http.get('http://localhost:8080/api/activities').subscribe((data: any) => {
      this.activities = data;
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  onSave() {
    if (this.productForm.valid) {
      const productData = {
        id: "",
        name: this.productForm.value.name,
        code: Date.now(),
        price: this.productForm.value.price,
        quantity: this.productForm.value.quantity,
        discount: this.productForm.value.discount || 0, // Imposta 0 se non specificato
        category: { id: 1 }, // Associa la categoria per ID
        activity: { id: 1 }, // Associa l'attività per ID
      };

      // Log dei dati per debug
      console.log('Dati inviati al backend:', productData);
      this.http.post('http://localhost:8080/api/products/addProduct', productData).subscribe({
        next: () =>{
          alert('Prodotto aggiunto con successo!')
          this.productAdded.emit();
        },
        error: (err) => {
          console.error(err);
          alert('Errore nell\'aggiunta del prodotto');
        },
      });
      console.log("SOno qua");
    }
  }
}
