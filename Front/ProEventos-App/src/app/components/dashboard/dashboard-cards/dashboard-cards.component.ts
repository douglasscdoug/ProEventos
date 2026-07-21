import { Component, Input } from '@angular/core';
import { DashboardCards } from '@app/models/dashboard';

@Component({
  selector: 'app-dashboard-cards',
  imports: [],
  templateUrl: './dashboard-cards.component.html',
  styleUrl: './dashboard-cards.component.scss'
})
export class DashboardCardsComponent {
  @Input()
  cards?: DashboardCards;
}
