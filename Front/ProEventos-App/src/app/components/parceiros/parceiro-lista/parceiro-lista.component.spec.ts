import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceiroListaComponent } from './parceiro-lista.component';

describe('ParceiroListaComponent', () => {
  let component: ParceiroListaComponent;
  let fixture: ComponentFixture<ParceiroListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParceiroListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParceiroListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
