import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraVentaComponent } from './genera-venta.component';

describe('GeneraVentaComponent', () => {
  let component: GeneraVentaComponent;
  let fixture: ComponentFixture<GeneraVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneraVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneraVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
