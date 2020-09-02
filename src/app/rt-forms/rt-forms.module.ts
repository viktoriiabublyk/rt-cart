import { NgxMaskModule } from 'ngx-mask';
import { InputBlockMaskComponent } from './input-block-mask/input-block-mask.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ValidationService} from './validation.service';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {InputBlockComponent} from './input-block/input-block.component';
import {InputBlockSelectComponent} from './input-block-select/input-block-select.component';
import {InputBlockTextareaComponent} from './input-block-textarea/input-block-textarea.component';
import { InputBlockCheckboxComponent } from './input-block-checkbox/input-block-checkbox.component';
import {ResponseProcessorService} from './response-processor.service';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { SearchBlockComponent } from './search-block/search-block.component';
import { InputBlockRadioComponent } from './input-block-radio/input-block-radio.component';
import { InputBlockRadioVerticalWithContentComponent } from './input-block-radio-vertical-with-content/input-block-radio-vertical-with-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPageScrollModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatButtonModule,
    MatSelectModule,
    NgxMaskModule.forRoot(),
    MatRadioModule,
  ],
  exports: [
    InputBlockComponent,
    InputBlockSelectComponent,
    InputBlockTextareaComponent,
    InputBlockCheckboxComponent,
    StarRatingComponent,
    SearchBlockComponent,
    InputBlockMaskComponent,
    InputBlockRadioComponent,
    InputBlockRadioVerticalWithContentComponent,
  ],
  declarations: [
    InputBlockComponent,
    InputBlockSelectComponent,
    InputBlockTextareaComponent,
    InputBlockCheckboxComponent,
    StarRatingComponent,
    SearchBlockComponent,
    InputBlockMaskComponent,
    InputBlockRadioComponent,
    InputBlockRadioVerticalWithContentComponent,
  ],
  providers: [
    ValidationService,
    ResponseProcessorService
  ]
})
export class RtFormsModule { }
