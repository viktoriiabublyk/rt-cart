import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBlockTextareaComponent } from './input-block-textarea.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('InputBlockTextareaComponent', () => {
  let component: InputBlockTextareaComponent;
  let fixture: ComponentFixture<InputBlockTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputBlockTextareaComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [ NO_ERRORS_SCHEMA ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBlockTextareaComponent);
    component = fixture.componentInstance;
    component = fixture.componentInstance;
    component.name = 'NAME';
    component.model = {NAME: 'xxx', EDITABLEFIELDS: ['NAME']};
    component.errors = {NAME: ''};
    component.preview = false;
    component.form = new FormGroup({NAME: new FormControl()});
    component.fields = {
      NAME: {
        label: '',
        validators: [],
        messages: {}
      }
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
