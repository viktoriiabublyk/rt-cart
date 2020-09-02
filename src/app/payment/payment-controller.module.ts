import { PaymentPaypalModule } from './paypal/payment-paypal.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentControllerComponent } from './payment-controller/payment-controller.component';
import { ControllerModule } from '././controller';
import { ControllerService } from './controller.service';
import { NgxsModule } from '@ngxs/store';
import { BasketState } from '../basket/basket.state';


export interface CoreModuleConfig {
  module: string[];
}

export let CONFIG: CoreModuleConfig = {module: []};

@NgModule({
  declarations: [PaymentControllerComponent],
  imports: [
    CommonModule,
    // ControllerModule.forRoot([PaymentPaypalModule]),
    PaymentPaypalModule,
    NgxsModule.forFeature([BasketState]),
  ],
  exports: [
    PaymentControllerComponent,
  ],
})


export class PaymentControllerModule {
  /**
   * Root module factory
   */
  static forRoot(conf: CoreModuleConfig): ModuleWithProviders<PaymentControllerModule> {
    // console.log(conf)
    return {
      ngModule: PaymentControllerModule,
      providers: [{provide: ControllerService, useValue: conf}]
    };
  }
 }
// export class PaymentControllerModule {}


