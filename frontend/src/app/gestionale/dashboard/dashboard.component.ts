import {Component, OnInit} from '@angular/core';
import {DashboardchartComponent} from '../components/dashboardchart/dashboardchart.component';
import {CounterService} from '../../services/counter.service';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardchartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  email: string | null=localStorage.getItem('user');
  activityName: string|null=localStorage.getItem('activity_name');
  counter: number = 0;
  lowStockCount: number = 0; // Prodotti con quantità < 5
  outOfStockCount: number = 0; // Prodotti con quantità = 0
  totalProduct: number = 0;
  totalPrice: number = 0;

  constructor(private counterService: CounterService,
              private productService: ProductService) {}

  ngOnInit() {
    this.counter=this.counterService.loadCounter();
    this.loadProductCounts();
  }

  loadProductCounts(): void {
    this.productService.getProductCounts().subscribe({
      next: (counts) => {
        this.lowStockCount = counts.lowStockCount; // Aggiorna il conteggio dei prodotti con quantità < 5
        this.outOfStockCount = counts.outOfStockCount; // Aggiorna il conteggio dei prodotti con quantità = 0
      },
      error: (err) => {
        // console.error('Errore nel caricamento dei conteggi dei prodotti:', err);
      },
    });

    this.productService.getTotalProdAndTotalPrice().subscribe({
      next: (total) => {
        this.totalProduct = total.totalProd;
        this.totalPrice = total.totalPrice;
      },
      error: (err) => {
        // console.error('Errore nel caricamento del totale dei prodotti');
      }
    })
  }


}
