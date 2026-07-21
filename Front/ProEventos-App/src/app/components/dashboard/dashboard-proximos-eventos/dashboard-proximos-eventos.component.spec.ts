import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProximosEventosComponent } from './dashboard-proximos-eventos.component';

describe('DashboardProximosEventosComponent', () => {
  let component: DashboardProximosEventosComponent;
  let fixture: ComponentFixture<DashboardProximosEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProximosEventosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProximosEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
