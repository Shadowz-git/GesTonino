import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { HttpClient } from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css'],
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ]
})
export class EditProductDialogComponent implements OnInit {
  @Input() product: any; // Input che potrebbe essere undefined
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  categories: any[] = []; // Popolato con l'API delle categorie
  editForm: FormGroup;

  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private fb: FormBuilder,
    private notificationService: NotificationService,
  ) {
    // Inizializza il form con valori predefiniti
    this.editForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      code: [{ value: '', disabled: true }],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      discount: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      category: ['', Validators.required],
      activity: [''],
    });
  }

  ngOnInit() {
    //console.log("Prodotto ricevuto:", this.product); // Debug

    if (!this.product) {
      this.notificationService.addNotification({
        title: 'Attenzione',
        message: 'Il prodotto non è completamente definito',
        type: 'warning',
      })
      return;
    }

    // Aggiorna i valori del form con i dati del prodotto
    this.editForm.patchValue({
      id: this.product.id || null,
      name: this.product.name || '',
      code: this.product.code || '',
      price: this.product.price || 0,
      quantity: this.product.quantity || 0,
      discount: this.product.discount || 0,
      category: this.product.category?.id || '', // Usa l'operatore di optional chaining
      activity: localStorage.getItem('activity_id') || '',
    });

    // console.log("idcategoria: ", this.product.category?.id); // Debug
    // console.log("Form inizializzato:", this.editForm.value); // Debug

    // Carica le categorie
    this.loadCategories();
  }

  loadCategories() {
    this.http.get('http://localhost:8080/api/categories').subscribe((data: any) => {
      this.categories = data;
      // console.log('Categorie caricate:', data);
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  @Output() productUpdated = new EventEmitter<void>();
  onSave() {
    if (this.editForm.valid) {
      const productData = {
        ...this.editForm.value,
        category: { id: this.editForm.value.category },
        activity: { id: localStorage.getItem('activity_id') },
      };
      const codeProd = this.editForm.getRawValue();
      const activityId: string | null = localStorage.getItem('activity_id');

      // Invia i dati al backend
      this.productService.updateProduct(codeProd.code, activityId, productData).subscribe({
        next: (response) => {
          this.save.emit(this.editForm.getRawValue());
          this.productUpdated.emit();
          this.notificationService.addNotification({
            title: 'Prodotto aggiornato',
            message: '',
            type: 'success',
          })
        },
        error: (error) => {
          this.notificationService.addNotification({
            title: 'Errore',
            message: 'Errore durante l\'aggiornamento del prodotto',
            type: 'error'
          })
        },
      });
    } else {
        this.editForm.markAllAsTouched();
        return;
    }
  }
}
