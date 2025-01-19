import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-product-filter-dialog',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './product-filter-dialog.component.html',
  styleUrl: './product-filter-dialog.component.css'
})
export class ProductFilterDialogComponent implements OnInit {
  priceRange = { min: 0, max: 0 };
  categories: { name: string; selected: boolean }[] = [];

  constructor(
    private dialogRef: MatDialogRef<ProductFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categories: string[] }
  ) {}

  ngOnInit(): void {
    // Inizializza le categorie
    this.categories = this.data.categories.map((name) => ({
      name,
      selected: false,
    }));
  }

  clearFilters(): void {
    this.priceRange = { min: 0, max: 0 };
    this.categories.forEach((category) => (category.selected = false));
  }

  applyFilters(): void {
    const selectedCategories = this.categories
      .filter((category) => category.selected)
      .map((category) => category.name);

    this.dialogRef.close({
      priceRange: this.priceRange,
      categories: selectedCategories,
    });
  }
}
