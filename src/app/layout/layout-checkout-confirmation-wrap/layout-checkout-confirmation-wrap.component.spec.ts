import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCheckoutConfirmationWrapComponent } from './layout-checkout-confirmation-wrap.component';

describe('LayoutCheckoutConfirmationWrapComponent', () => {
  let component: LayoutCheckoutConfirmationWrapComponent;
  let fixture: ComponentFixture<LayoutCheckoutConfirmationWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCheckoutConfirmationWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCheckoutConfirmationWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
