import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {InputBlockRadioComponent} from '../input-block-radio/input-block-radio.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rt-input-block-radio-with-content',
  templateUrl: './input-block-radio-vertical-with-content.component.html',
  styleUrls: ['./input-block-radio-vertical-with-content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputBlockRadioVerticalWithContentComponent extends InputBlockRadioComponent implements OnInit {

  @Input() selected: string;
  @Input() readonly;
  @Input() disabled = false;

  protected _choices = [];
  options = [];
  optionDirectDict = {};
  optionDict = {};
  selectedValue: string;
  dirty = false;

  @Input()
  set choices(choices) {
    this._choices = choices;
    this.setOptions();
  }

  get choices() {
    return this._choices;
  }

  ngOnInit() {
    const ctrl = this.form.get(this.name);

    if (ctrl) {
      ctrl.valueChanges.subscribe(key => {
        this.selectKey(key);
        this.dirty = ctrl.dirty || !!key;
      });
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
  selectKey(key) {
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

  }

  changeButton(e) {
  }

  trackByFn(index) {
    return index;
  }
}
