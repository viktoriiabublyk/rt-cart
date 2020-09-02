import {AbstractControl, Validators} from '@angular/forms';


export function isEmptyInputValue(value) {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

export const zipCodeMask = [/\d/, /\d/, /\d/, /\d/, /\d/];

export class RtValidators {

  static spaces(control: AbstractControl): {[key: string]: boolean} {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    const regex = /^\S+( [\S]+)*$/i;

    const v: string = control.value;
    return regex.test(v) ? null : {spaces: true};
  }

  static required(control: AbstractControl): {[key: string]: boolean} {
    let rv = Validators.required(control);
    if (!rv) {
      const val = control.value;
      if (typeof val === 'string' && val.trim().length === 0) {
        rv = {required: true};
      }
    }
    return rv;
  }

  static ip(control: AbstractControl): {[key: string]: boolean} {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    const pattern = '(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}'
      + '([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])';
    const regex = new RegExp(`^${pattern}$`);

    const v: string = control.value;
    return regex.test(v) ? null : {ip: true};
  }

  static alphaNumeric(control: AbstractControl): {[key: string]: boolean} {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    const regex = /^[A-Za-z0-9]*$/;


    const v: string = control.value;
    return regex.test(v) ? null : {alphaNumeric: true};
  }

  static int(control: AbstractControl): {[key: string]: boolean} {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    const pattern = '(\\d*)';
    const regex = new RegExp(`^${pattern}$`);

    const v: string = control.value;
    return regex.test(v) ? null : {int: true};
  }
  static number(control: AbstractControl): {[key: string]: boolean} {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    const pattern = '[1-9][0-9]*';
    const regex = new RegExp(`^${pattern}$`);

    const v: string = control.value;
    return regex.test(v) || v === '0' ? null : {number: true};
  }

  static url(control: AbstractControl): {[key: string]: boolean} {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    const pattern = 'http(s)?://\\S+';
    const regex = new RegExp(`^${pattern}$`);
    const v: string = control.value;
    return regex.test(v) ? null : {url: true};
  }

  /*
    Checks amount of non-empty form groups in form array
  */
  static minLengthNonEmpty(min: number) {
    return (c: AbstractControl): {[key: string]: any} => {
      let nonEmptyNumber = 0;
      for (const v of c.value) {
        if (Object.keys(v).length > 0) {
          ++nonEmptyNumber;
        }
      }
      if (nonEmptyNumber >= min) {
        return null;
      }

      return { minLengthCustom: {valid: false }};
    };
  }

  static money(ctrl: AbstractControl): {[key: string]: boolean} {
    if (isEmptyInputValue(ctrl.value)) {
      return null;
    }
    const pattern = '\\s*\\$?[\\s0-9,.]+';
    const regex = new RegExp(`^${pattern}$`);
    const v: string = ctrl.value;
    return regex.test(v) ? null : {money: true};
  }

  static date(ctrl: AbstractControl): {[key: string]: boolean} {
    if (isEmptyInputValue(ctrl.value)) {
      return null;
    }
    const v: string = ctrl.value;
    return /^\d{2}\/\d{2}\/\d{4}$/.test(v) ? null : {date: true};
  }

}
