import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rt-input-block',
  templateUrl: './input-block.component.html',
  styleUrls: ['./input-block.component.css'],
})
export class InputBlockComponent implements OnInit, OnChanges {

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
  @Input() type: string;
  @Input() placeholder: string;
  @Input() readonly = false;
  @Input() tabindex = 0;

  @Input() globalError = false;

  protected _DISABLED = false;

  @Input()
  set disabled(_DISABLED) {
    this.setDisabled(_DISABLED);
  }

  get disabled(): boolean {
    return this._DISABLED;
  }

  editable = true;
  protected innerValue = '';
  private labelTop = false;
  private focused = false;

  @Input() preprocess: (val: string) => string = (val) => val;

  constructor(public _EREF: ElementRef, protected cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.initValue();
    if (!this.label && this.fields && this.name) {
      this.label = this.fields[this.name].label;
    }
  }

  ngOnChanges() {
    this.cd.detectChanges();
  }

  protected initValue() {
    if (this.editable) {
      const element = this.form.get(this.name);
      if (element) {
        this.setInnerValue(element.value);
        this.form.get(this.name).valueChanges.subscribe(value => this.setInnerValue(value));
      }
    }
  }

  protected setDisabled(_DISABLED) {
    this._DISABLED = _DISABLED;
    if (!this.form || !this.form.controls || !this.form.controls[this.name]) {
      return;
    }
    if (_DISABLED) {
      this.form.controls[this.name].disable();
    } else {
      this.form.controls[this.name].enable();
    }
  }

  setInnerValue(value) {
    this.innerValue = value;
    this.labelTop = !!value;
  }

  onBlur() {
    if (!this.innerValue) {
      this.labelTop = false;
    }
    this.focused = false;
  }

  onFocus() {
    this.labelTop = true;
    this.focused = true;
  }

  /**
   * @deprecated
   */
  focusInput() {
  }
  
  hasRequiredValidator() {
    if (this.required === false || this.required === true) {
      return this.required;
    }
    if (this.fields && this.fields[this.name]) {
      return this.fields[this.name].validators.indexOf(Validators.required) !== -1;
    }
    return true;
  }
}
