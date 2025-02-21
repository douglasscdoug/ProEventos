import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventosComponent } from "./eventos/eventos.component";
import { PalestrantesComponent } from "./palestrantes/palestrantes.component";
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EventosComponent, PalestrantesComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ProEventos-App';
}
