import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPaypalComponent } from './payment-paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxsModule } from '@ngxs/store';

describe('PaymentPaypalComponent', () => {
  let component: PaymentPaypalComponent;
  let fixture: ComponentFixture<PaymentPaypalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentPaypalComponent ],
      imports: [
        NgxPayPalModule,
        NgxsModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
