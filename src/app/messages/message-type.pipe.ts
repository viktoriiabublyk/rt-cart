import { Pipe, PipeTransform } from '@angular/core';
import { MessageType } from './messages.state';

@Pipe({
  name: 'messageType'
})
export class MessageTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let resultString = 'alert';
    if ( value === MessageType.ERROR) {
      resultString += ' alert-danger';
    }
    if ( value === MessageType.SUCCESS) {
      resultString += ' alert-success';
    }
    if ( value === MessageType.DEBUG) {
      resultString += ' alert-dark';
    }
    if ( value === MessageType.INFO) {
      resultString += ' alert-info';
    }
    if ( value === MessageType.WARNING) {
      resultString += ' alert-warning';
    }
    return resultString;
  }

}
