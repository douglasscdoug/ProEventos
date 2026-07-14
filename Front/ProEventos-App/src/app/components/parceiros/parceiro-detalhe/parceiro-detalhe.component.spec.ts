import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceiroDetalheComponent } from './parceiro-detalhe.component';

describe('ParceiroDetalheComponent', () => {
  let component: ParceiroDetalheComponent;
  let fixture: ComponentFixture<ParceiroDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParceiroDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParceiroDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
