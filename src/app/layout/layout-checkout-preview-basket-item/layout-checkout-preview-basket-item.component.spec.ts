import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCheckoutPreviewBasketItemComponent } from './layout-checkout-preview-basket-item.component';

describe('CheckoutPreviewBasketItemComponent', () => {
  let component: LayoutCheckoutPreviewBasketItemComponent;
  let fixture: ComponentFixture<LayoutCheckoutPreviewBasketItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCheckoutPreviewBasketItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCheckoutPreviewBasketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
