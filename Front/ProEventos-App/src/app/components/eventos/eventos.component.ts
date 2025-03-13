import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { TituloComponent } from "../../shared/titulo/titulo.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    CollapseModule,
    FormsModule,
    TooltipModule,
    ModalModule,
    ToastrModule,
    TituloComponent,
    RouterOutlet
],
  providers:[BsModalService]
})
export class EventosComponent implements OnInit{
  
  ngOnInit(): void {
    
  }
}
