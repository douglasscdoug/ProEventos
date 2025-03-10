import { Component, OnInit } from '@angular/core';
import { TituloComponent } from "../../shared/titulo/titulo.component";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [TituloComponent]
})
export class PerfilComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
