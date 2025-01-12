import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/item.model';
import {CurrencyPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  imports: [
    CurrencyPipe,
    FormsModule
  ],
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() item!: Item;
  @Output() edit = new EventEmitter<Item>();

  onEdit() {
    this.edit.emit(this.item);
  }
}
