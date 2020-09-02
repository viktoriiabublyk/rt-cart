import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationOfPaymentComponent } from './confirmation-of-payment.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';

describe('ConfirmationOfPaymentComponent', () => {
  let component: ConfirmationOfPaymentComponent;
  let fixture: ComponentFixture<ConfirmationOfPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationOfPaymentComponent ],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationOfPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
