import { Component, OnInit, HostBinding, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, Validators, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class StarRatingComponent implements ControlValueAccessor {
  // rating = 0;
  @Input() label = '';
  @Input() name: string;
  @Input() score: number;
  @Input() form: FormGroup;
  @Input() fields: object;
  @Input() errors: object;
  @Input() min: number;
  @Input() required: boolean;
  @Input() rating: number;
  @Input() disabledComp: boolean;
  stars: boolean[] = Array(5).fill(true);
  @Input() smallStar: boolean;
  @Input() disabled = false;
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 1 : 1;
  }

  // Function to call when the rating changes.
  onChange = (rating: number) => {
  }

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {
  }


  get value(): number {
    if (!this.disabled) {
    return this.stars.reduce((total, starred) => {
      return total + (starred ? 1 : 0);
    }, 0);
    }
  }
  rate(rating: number) {
    if (!this.disabled) {
      this.writeValue(rating);
    }
  }

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(rating: number): void {
    if (!this.disabled) {
      this.stars = this.stars.map((_, i) => rating > i);
      this.onChange(this.value);
    }

  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;


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
