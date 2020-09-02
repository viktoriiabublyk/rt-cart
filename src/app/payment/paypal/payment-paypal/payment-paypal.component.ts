import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';
import { BasketProductLinesList, PurchaseUnit } from '../../../basket/models/basket';
import { SaveConfirmationInfo } from '../../../checkout/state/checkout.actions';
import { Store } from '@ngxs/store';

// const paypal;

@Component({
  selector: 'app-payment-paypal',
  templateUrl: './payment-paypal.component.html',
  styleUrls: ['./payment-paypal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentPaypalComponent implements OnInit {

  @ViewChild('paypal') paypalElement: ElementRef;

  _data: PurchaseUnit[];
  @Input() set units(data: PurchaseUnit[]) {
    console.log(data)
    this.setUnits(data);
  }

  get units() {
    return this._data;
  }
  constructor(private store: Store) {}

  public payPalConfig?: IPayPalConfig;

  ngOnInit(): void {
    this.initConfig();
  }


  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',
        createOrderOnClient: (data) => <ICreateOrderRequest> {
          intent: 'CAPTURE',
          purchase_units: this.units,
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'checkout',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.store.dispatch(new SaveConfirmationInfo(data));
            // this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            // this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            // this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            // this.resetStatus();
        }
    };
  }

  // Creating orders on server

  // private initConfig(): void {
  //   console.log(this.units, this.units[0].items);
  //   this.payPalConfig = {
  //     currency: 'EUR',
  //     clientId: 'sb',
  //     createOrderOnServer: (data) => fetch('/v2/checkout/orders', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8'
  //       },
  //       body: JSON.stringify(this.units)
  //     })
  //       .then((res) => res.json())
  //       .then((order) => order.orderID),
  //     onApprove: (data, actions) => {
  //       console.log('onApprove - transaction was approved, but not authorized', data, actions);
  //       actions.order.get().then(details => {
  //         console.log('onApprove - you can get full order details inside onApprove: ', details);
  //       });

  //     },
  //     onClientAuthorization: (data) => {
  //       console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
  //       // this.showSuccess = true;
  //     },
  //     onCancel: (data, actions) => {
  //       console.log('OnCancel', data, actions);
  //       // this.showCancel = true;

  //     },
  //     onError: err => {
  //       console.log('OnError', err);
  //       // this.showError = true;
  //     },
  //     onClick: (data, actions) => {
  //       console.log('onClick', data, actions);
  //       // this.resetStatus();
  //     }
  //   };
  // }

  setUnits(data) {
    if (data) {
      this._data = data;
    }
  }

}
