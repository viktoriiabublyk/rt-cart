import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentControllerComponent } from './payment-controller.component';
import { PaymentPaypalModule } from './../paypal/payment-paypal.module';

describe('PaymentControllerComponent', () => {
  let component: PaymentControllerComponent;
  let fixture: ComponentFixture<PaymentControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentControllerComponent ],
      imports: [
        PaymentPaypalModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
