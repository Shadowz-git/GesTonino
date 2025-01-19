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

  constructor(
    private dialogRef: MatDialogRef<ProductFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categories: string[] }
  ) {}

  ngOnInit(): void {
  }

  clearFilters(): void {
    this.priceRange = { min: 0, max: 0 };
  }

  applyFilters(): void {
    this.dialogRef.close({
      priceRange: this.priceRange
    });
  }
}
