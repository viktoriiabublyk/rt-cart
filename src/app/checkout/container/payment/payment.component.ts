import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { SavePaymentDetails, SetWizardStep } from '../../state/checkout.actions';
import { ControllerService } from '../../../payment/controller.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent implements OnInit {

  constructor(private store: Store, private controller: ControllerService) { }

  ngOnInit() {
    this.store.dispatch(new SetWizardStep(3));
  }

  continue() {
    this.store.dispatch(new SavePaymentDetails(false));
  }
}
