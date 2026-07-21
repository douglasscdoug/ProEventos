import { Component, inject, OnInit } from '@angular/core';
import { Dashboard } from '@app/models/dashboard';
import { DashboardService } from '@app/services/dashboard.service';
import { TituloComponent } from "@app/shared/titulo/titulo.component";
import { DashboardCardsComponent } from "./dashboard-cards/dashboard-cards.component";
import { DashboardEventosPorMesComponent } from "./dashboard-eventos-por-mes/dashboard-eventos-por-mes.component";
import { DashboardProximosEventosComponent } from './dashboard-proximos-eventos/dashboard-proximos-eventos.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [TituloComponent, DashboardCardsComponent, DashboardEventosPorMesComponent, DashboardProximosEventosComponent]
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  public dashboard?: Dashboard;

  ngOnInit() {
    this.dashboardService.getDashboard().subscribe({
      next: (res) => {
        this.dashboard = res;
      }
    })
  }

}