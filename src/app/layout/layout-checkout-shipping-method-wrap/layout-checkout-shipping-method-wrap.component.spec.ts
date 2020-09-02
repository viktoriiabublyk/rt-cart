import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCheckoutShippingMethodWrapComponent } from './layout-checkout-shipping-method-wrap.component';

describe('LayoutCheckoutShippingMethodWrapComponent', () => {
  let component: LayoutCheckoutShippingMethodWrapComponent;
  let fixture: ComponentFixture<LayoutCheckoutShippingMethodWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCheckoutShippingMethodWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCheckoutShippingMethodWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
