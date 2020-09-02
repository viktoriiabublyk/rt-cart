import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'wizard'
})
export class WizardPipe implements PipeTransform {

  transform(value: number, searchKey: number): string {
    let resultString = '';
    if (value > searchKey) {
      resultString += 'visited';
    }
    if (value < searchKey) {
      resultString += 'disabled';
    }
    if (value === searchKey) {
      resultString += 'active';
    }
    return resultString;
  }

}
