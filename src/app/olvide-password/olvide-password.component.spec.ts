import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidePasswordComponent } from './olvide-password.component';

describe('OlvidePasswordComponent', () => {
  let component: OlvidePasswordComponent;
  let fixture: ComponentFixture<OlvidePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlvidePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvidePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
