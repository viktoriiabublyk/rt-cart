import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBlockSelectComponent } from './input-block-select.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('InputBlockSelectComponent', () => {
  let component: InputBlockSelectComponent;
  let fixture: ComponentFixture<InputBlockSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputBlockSelectComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatOptionModule,
        MatButtonModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBlockSelectComponent);
    component = fixture.componentInstance;
    component.name = 'NAME';
    component.model = {NAME: 'xxx', EDITABLEFIELDS: ['NAME']};
    component.errors = {NAME: ''};
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
