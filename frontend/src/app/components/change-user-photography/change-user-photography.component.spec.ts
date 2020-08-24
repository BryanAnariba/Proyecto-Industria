import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserPhotographyComponent } from './change-user-photography.component';

describe('ChangeUserPhotographyComponent', () => {
  let component: ChangeUserPhotographyComponent;
  let fixture: ComponentFixture<ChangeUserPhotographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeUserPhotographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserPhotographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
