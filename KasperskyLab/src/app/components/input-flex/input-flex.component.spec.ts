import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFlexComponent } from './input-flex.component';

describe('InputFlexComponent', () => {
  let component: InputFlexComponent;
  let fixture: ComponentFixture<InputFlexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFlexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFlexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
