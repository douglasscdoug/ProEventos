import { Component } from '@angular/core';
import { TituloComponent } from "@app/shared/titulo/titulo.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-parceiros',
  imports: [TituloComponent, RouterOutlet],
  templateUrl: './parceiros.component.html',
  styleUrl: './parceiros.component.scss'
})
export class ParceirosComponent {
}
