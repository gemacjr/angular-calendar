import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosureDatesV3Component } from './closure-dates-v3.component';

describe('ClosureDatesV3Component', () => {
  let component: ClosureDatesV3Component;
  let fixture: ComponentFixture<ClosureDatesV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosureDatesV3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosureDatesV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
