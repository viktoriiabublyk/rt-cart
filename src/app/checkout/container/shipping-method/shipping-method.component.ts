import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { SaveShippingMethod, SetWizardStep } from '../../state/checkout.actions';

@Component({
  selector: 'app-shipping-method',
  templateUrl: './shipping-method.component.html',
  styleUrls: ['./shipping-method.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShippingMethodComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new SetWizardStep(2));
  }

  continue() {
    this.store.dispatch(new SaveShippingMethod(false));
  }
}
