import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [
    CommonModule,
    ModalModule
  ]
})
export class SharedModule { }