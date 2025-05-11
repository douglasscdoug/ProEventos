import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot()
  ],
  exports: [
    CommonModule,
    ModalModule,
    CollapseModule
  ]
})
export class SharedModule { }