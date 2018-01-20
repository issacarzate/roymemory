import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeraVezComponent } from './primera-vez.component';

describe('PrimeraVezComponent', () => {
  let component: PrimeraVezComponent;
  let fixture: ComponentFixture<PrimeraVezComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeraVezComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeraVezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
