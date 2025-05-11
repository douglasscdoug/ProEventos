import { Component, OnInit } from '@angular/core';
import { TituloComponent } from '../../shared/titulo/titulo.component';
import { PalestranteListaComponent } from "./palestrante-lista/palestrante-lista.component";

@Component({
  selector: 'app-palestrantes',
  templateUrl: './palestrantes.component.html',
  styleUrls: ['./palestrantes.component.scss'],
  imports: [TituloComponent, PalestranteListaComponent]
})
export class PalestrantesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
