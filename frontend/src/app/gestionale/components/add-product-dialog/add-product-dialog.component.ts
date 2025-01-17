import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {Item} from '../../models/item.model';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NgForOf} from '@angular/common';
import {CounterService} from '../../../services/counter.service';
import {NotificationService} from '../../../services/notification.service';

//TODO: Validare il form

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrls: ['./add-product-dialog.component.css']
})


export class AddProductDialogComponent implements OnInit {
  productForm: FormGroup;
  categories: any[] = []; // Popolato con l'API delle categorie
  activities: any[] = []; // Popolato con l'API delle attività


  constructor(private fb: FormBuilder, private http: HttpClient, private counterService: CounterService, private notificationService: NotificationService) {
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
    this.counterService.loadCounter();
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
      this.counterService.incrementCounter();
      const productData = {
        id: "",
        name: this.productForm.value.name,
        code: Date.now(),
        price: this.productForm.value.price,
        quantity: this.productForm.value.quantity,
        discount: this.productForm.value.discount || 0, // Imposta 0 se non specificato
        category: { id: this.productForm.value.category }, // Associa la categoria per ID
        activity: { id: localStorage.getItem("activity_id") }, // Associa l'attività per ID
      };

      // Log dei dati per debug
      this.http.post('http://localhost:8080/api/products/addProduct', productData).subscribe({
        next: () =>{
          this.notificationService.addNotification({
            title: 'Prodotto Aggiunto',
            message: '',
            type: 'success'
          })
          this.productAdded.emit();
        },
        error: (err) => {
          this.notificationService.addNotification({
            title: 'Errore',
            message: 'Errore nell\'aggiunta del prodotto',
            type: 'error'
          })
        },
      });
    }
  }
}
