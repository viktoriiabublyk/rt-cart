import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputBlockComponent} from '../input-block/input-block.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rt-input-block-radio',
  templateUrl: './input-block-radio.component.html',
  styleUrls: ['./input-block-radio.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputBlockRadioComponent extends InputBlockComponent implements OnInit {

  @Input() label = '';
  @Input() name: string;
  @Input() editables: string[]; // ?
  @Input() preview = false;
  @Input() form: FormGroup;
  @Input() model: any; // ?
  @Input() fields: object; // ?
  @Input() errors: object = {};
  @Input() options = [];
  @Input() dsDisabled = [];
  @Input() selected: string;
  @Input() disabled = false;
  @Input() inLineLabel = false;
  @Input() readonly = false;

  protected _choices = [];
  optionDirectDict = {};
  optionDict = {};
  selectedValue: string;
  dirty = false;

  @Input()
  set choices(choices) {
    this._choices = choices;
    this.setOptions();
  }

  get type() {
    return this.inLineLabel ? 'row' : 'column';
  }

  get choices() {
    return this._choices;
  }

  ngOnInit() {
    super.ngOnInit();
    const ctrl = this.form.get(this.name);
    if (ctrl) {
      ctrl.valueChanges.subscribe(val => this.dirty = ctrl.dirty || val);
      if (this.disabled && !ctrl.disabled) {
        this.form.controls[this.name].disable();
      }
    }
  }

  protected setOptions() {
    this.optionDict = {};
    this.options = [];
    if (!this._choices) {
      return;
    }
    for (const opt of this._choices) {
      const key = opt[0];
      const val = opt[1];

      this.options.push(val);
      this.optionDict[val] = key;
      this.optionDirectDict[key] = val;
    }

    if (this.selected) {
      this.selectedValue = this.optionDirectDict[this.selected];
    }
  }

  selectKey(key) { // ?
    const option = this.optionDirectDict[key];
    this.selected = key;
    this.selectedValue = option;
  }


  selectOption (option) {
    if (this.readonly) {
      return;
    }
    const key = this.optionDict[option];
    this.selected = key;
    this.selectedValue = option;
    this.form.controls[this.name].setValue(this.selected);
   // this.model[this.name].selectedValue(this.selected);
    // this.form.controls[this.name].setValue(key);
   // this.form.controls[this.name].markAsDirty();

    // this.model.emit(option[this.selected]);

  }


  isClickable(val) {
    return this.dsDisabled.indexOf(val) === -1;
  }

  trackByFn(index) {
    return index;
  }
}
