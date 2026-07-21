import { Component, Input } from '@angular/core';
import { DashboardProximoEvento } from '@app/models/dashboard';
import { DateTimeFormatPipe } from "../../../helpers/DateTimeFormat.pipe";

@Component({
  selector: 'app-dashboard-proximos-eventos',
  imports: [DateTimeFormatPipe],
  templateUrl: './dashboard-proximos-eventos.component.html',
  styleUrl: './dashboard-proximos-eventos.component.scss'
})
export class DashboardProximosEventosComponent {
  @Input()
  eventos: DashboardProximoEvento[] = [];
}
