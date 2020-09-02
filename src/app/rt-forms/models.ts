import {ValidatorFn} from '@angular/forms';


export interface FormErrors {
  [key: string]: string;
}

export interface FormFields {
  [key: string]: ValidatorFn|ValidatorFn[];
}

export interface ValidationMessages {
  [key: string]: {[key: string]: string };
}
