import { Injectable } from '@angular/core';
import { Item } from '../gestionale/models/item.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  applyAdvancedFilters(items: Item[], query: string): Item[] {
    if (!query.trim()) return items; // Se la query è vuota, restituisci tutti gli articoli.

    // Controlla se la query contiene filtri avanzati
    const filters = this.parseQuery(query);

    if (Object.keys(filters).length > 0) {
      // Se ci sono filtri avanzati, applicali
      return items.filter(item => this.itemMatchesFilters(item, filters));
    } else {
      // Se non ci sono filtri avanzati, esegui una ricerca per nome o codice.
      return this.searchItems(items, query);
    }
  }

  private parseQuery(query: string): { [key: string]: string } {
    const filters: { [key: string]: string } = {};
    const regex = /(\w+):\s*([\w<>:]+|"[^"]*")/g;
    let match;

    while ((match = regex.exec(query)) !== null) {
      const key = match[1];
      let value = match[2];
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1); // Rimuove le virgolette
      }
      filters[key] = value;
    }

    return filters;
  }

  private itemMatchesFilters(item: Item, filters: { [key: string]: string }): boolean {
    for (const key in filters) {
      const value = filters[key];

      switch (key) {
        case 'code':
          if (!item.code.includes(value)) return false;
          break;
        case 'name':
          if (!item.name.toLowerCase().includes(value.toLowerCase())) return false;
          break;
        case 'price':
          if (!this.matchesNumberFilter(item.price, value)) return false;
          break;
        case 'quantity':
          if (!this.matchesNumberFilter(item.quantity, value)) return false;
          break;
        default:
          break;
      }
    }
    return true;
  }

  private matchesNumberFilter(fieldValue: number, filterValue: string): boolean {
    if (filterValue.startsWith('<')) {
      const limit = parseFloat(filterValue.slice(1));
      return fieldValue < limit;
    } else if (filterValue.startsWith('>')) {
      const limit = parseFloat(filterValue.slice(1));
      return fieldValue > limit;
    } else if (filterValue.startsWith('=')) {
      const limit = parseFloat(filterValue.slice(1));
      return fieldValue === limit;
    } else {
      return fieldValue === parseFloat(filterValue);
    }
  }

  // Metodo per eseguire una ricerca di tipo "contains" per nome o codice
  private searchItems(items: Item[], query: string): Item[] {
    return items.filter(item => {
      const lowerCaseQuery = query.toLowerCase();
      return (
        item.name.toLowerCase().includes(lowerCaseQuery) ||
        item.code.toLowerCase().includes(lowerCaseQuery)
      );
    });
  }
}
