import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEventosPorMesComponent } from './dashboard-eventos-por-mes.component';

describe('DashboardEventosPorMesComponent', () => {
  let component: DashboardEventosPorMesComponent;
  let fixture: ComponentFixture<DashboardEventosPorMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEventosPorMesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEventosPorMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
