import { Component, OnInit } from '@angular/core';
import { TituloComponent } from "../../shared/titulo/titulo.component";

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css'],
  imports: [TituloComponent]
})
export class ContatosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
