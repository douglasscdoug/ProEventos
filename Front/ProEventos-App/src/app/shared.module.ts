import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot()
  ],
  exports: [
    CommonModule,
    ModalModule,
    CollapseModule
  ]
})
export class SharedModule { }