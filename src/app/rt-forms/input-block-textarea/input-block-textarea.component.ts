import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputBlockComponent} from '../input-block/input-block.component';

@Component({
   // tslint:disable-next-line:component-selector
  selector: 'rt-input-block-textarea',
  templateUrl: './input-block-textarea.component.html',
  styleUrls: ['./input-block-textarea.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputBlockTextareaComponent extends InputBlockComponent implements OnInit {

  @Input() label = '';
  @Input() name: string;
  @Input() editables: string[];
  @Input() preview = false;
  @Input() form: FormGroup;
  @Input() model: any;
  @Input() fields: object;
  @Input() errors: object;
  @Input() hint: string;
}
