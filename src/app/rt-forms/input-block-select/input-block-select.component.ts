import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  ChangeDetectorRef,
  OnChanges
} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {InputBlockComponent} from '../input-block/input-block.component';
import {DocumentClickHandler} from '../../utils/document-click-handler';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rt-input-block-select',
  templateUrl: './input-block-select.component.html',
  styleUrls: ['./input-block-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputBlockSelectComponent extends InputBlockComponent implements OnInit, OnDestroy {

  @Input() label = '';
  @Input() name: string;
  @Input() editables: string[];
  @Input() preview = false;
  @Input() form: FormGroup;
  @Input() model: any;
  @Input() fields: object;
  @Input() errors: object;
  @Input() showPlaceholder = false;
  @Input() selected: string;
  @Input() show: string;

  protected _CHOICES = [];
  options = [];
  optionDirectDict = {};
  optionDict = {};
  selectedValue: string;

  @Input()
  set choices(choices) {
    this._CHOICES = choices;
    this.setOptions();
  }

  get choices() {
    return this._CHOICES;
  }

  @Input()
  set disabled(disabled) {
    this.setDisabled(disabled);
  }

  get disabled(): boolean {
    return this.disabled;
  }

  public scrollbarOptions: any;
  public isAlive = true;

  @HostBinding('class.opened') opened = false;
  constructor(public _EREF: ElementRef, protected ref: ChangeDetectorRef) {
    super(_EREF, ref);
    DocumentClickHandler.addHandler({
      component: this,
      handler: (e) => {
        if (!this._EREF.nativeElement.contains(e.target) && this.opened) {
          this.opened = false;
          this.ref.detectChanges();
        }
      }
    });
  }

  protected initValue() {
    const element = this.form.get(this.name);
    if (element) {
      this.setInnerValue(this.optionDirectDict[element.value]);
      this.form.get(this.name).valueChanges.subscribe(value => {
        this.setInnerValue(this.optionDirectDict[value]);
        this.selectKey(value);
      });
    }
  }

  protected setOptions() {
    this.optionDict = {};
    this.options = [];
    if (!this._CHOICES) {
      return;
    }
    for (const opt of this._CHOICES) {
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

  selectOption(option) {
    const key = this.optionDict[option];
    this.selected = key;
    this.selectedValue = option;
    this.form.controls[this.name].setValue(key);
    this.form.controls[this.name].markAsDirty();

    // this.modelChange.emit(option[this.select]);
    this.opened = false;
  }

  openDropDown() {
    if (this.form.controls[this.name].disabled) {
      return;
    }
    this.opened = true;
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  closeDropDown() {
    if (this.form.controls[this.name].enabled) {
      this.opened = false;
    }
  }

  keyDown(event) {
    if (this.form.controls[this.name].disabled) {
      return;
    }
    switch (event.key) {
      case 'Tab':
        this.closeDropDown();
        break;
      case 'Enter':
      case 'ArrowDown':
      case 'ArrowUp':
        this.openDropDown();
        break;
      case 'Escape':
        this.closeDropDown();
        break;
      default:
        event.preventDefault();
    }
  }
  hasRequiredValidator() {
    if (this.fields && this.fields[this.name]) {
      return this.fields[this.name].validators.indexOf(Validators.required) !== -1;
    }
    return false;
  }
  trackByFn(index) {
    return index;
  }
}
