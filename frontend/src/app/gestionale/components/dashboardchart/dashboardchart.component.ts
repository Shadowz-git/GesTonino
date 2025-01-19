import { Component } from '@angular/core';
import {
  ChartConfiguration,
  ChartOptions,
  ChartType,
  Chart } from 'chart.js';

// Importa e registra i componenti di Chart.js
import { LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import {BaseChartDirective} from "ng2-charts";
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

@Component({
  selector: 'app-dashboardchart',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './dashboardchart.component.html',
  styleUrl: './dashboardchart.component.css'
})
export class DashboardchartComponent {
  // Dati e configurazioni del grafico
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Vendite',
        fill: true,
        tension: 0.4,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
      },
    ],
    labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug'],
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  public lineChartType: ChartType = 'line';
}
