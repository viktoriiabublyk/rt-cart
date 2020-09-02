import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputBlockComponent} from '../input-block/input-block.component';
import { tap, filter, map, debounceTime } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rt-input-block-mask',
  templateUrl: './input-block-mask.component.html',
  styleUrls: ['./input-block-mask.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputBlockMaskComponent extends InputBlockComponent implements OnInit {

  @Input() label = '';
  @Input() name: string;
  @Input() editables: string[];
  @Input() preview = false;
  @Input() form: FormGroup;
  @Input() model: any;
  @Input() fields: object;
  @Input() errors: object;
  @Input() maxLength: number;
  @Input() required: boolean;
  @Input() prefix = '';
  @Input() sufix = '';
  @Input() mask: string;
  @Input() readonly = false;
  @Input() showMaskTyped = false;
  @Input() hint: string;

  protected _disabled = false;

  @Input()
  set disabled(disabled) {
    this.setDisabled(disabled);
  }

  get disabled(): boolean {
    return this._disabled;
  }

  /**
   *
   * @param input correction of value because a mask with phone number is lag from reactive form
   */
  keyUp(input) {
    if (!this.readonly) {
      let inputValue = input.target.value;
      const currentValue = this.form.get(this.name);
      inputValue = inputValue === '(___)___-____' ? '' : inputValue;

      if (currentValue !== inputValue) {
        if (inputValue === '') {
          this.form.get(this.name).setValue(inputValue);
        }
      }
    }
  }

  ngOnInit() {
    if (!this.form || !this.form.controls || !this.form.controls[this.name]) {
      return;
    }
    const ctrl = this.form.get(this.name);
    if (this.disabled && !ctrl.disabled) {
      this.form.controls[this.name].disable();
    }

  }

}
