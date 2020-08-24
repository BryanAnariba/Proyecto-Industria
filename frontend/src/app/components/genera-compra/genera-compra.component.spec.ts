import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraCompraComponent } from './genera-compra.component';

describe('GeneraCompraComponent', () => {
  let component: GeneraCompraComponent;
  let fixture: ComponentFixture<GeneraCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneraCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneraCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
