import { Component, Input, OnChanges } from '@angular/core';
import { DashboardEventosMes } from '@app/models/dashboard';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-eventos-por-mes',
  imports: [],
  templateUrl: './dashboard-eventos-por-mes.component.html',
  styleUrl: './dashboard-eventos-por-mes.component.scss'
})
export class DashboardEventosPorMesComponent implements OnChanges{
  @Input()
  dados: DashboardEventosMes[] = [];

  chart?: Chart;

  ngOnChanges(): void {
    if (this.dados.length > 0) {
      this.criarGrafico();
    }
  }

  private criarGrafico(): void {
    const labels = this.dados.map(item => this.formatarMes(item.mes, item.ano));

    const valores = this.dados.map(item => item.quantidade);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('eventosPorMes', {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Eventos',
          data: valores,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }

  private formatarMes(mes: number, ano: number): string {
    const meses = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ];

    return `${meses[mes - 1]}/${ano.toString().slice(-2)}`;
  }
}
