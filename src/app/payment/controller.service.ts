import { CoreModuleConfig } from './payment-controller.module';
import { Injectable, Optional } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class ControllerService {

  config;
  constructor(@Optional() config: CoreModuleConfig) {
    console.log(config);

    if (config) {
      this.config = config;
    }
  }

  getConfig() {
    if (this.config) {
      console.log(this.config);
      return this.config;
    }
  }
};