import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCheckoutNavComponent } from './layout-checkout-nav.component';

describe('CheckoutNavComponent', () => {
  let component: LayoutCheckoutNavComponent;
  let fixture: ComponentFixture<LayoutCheckoutNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCheckoutNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCheckoutNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
