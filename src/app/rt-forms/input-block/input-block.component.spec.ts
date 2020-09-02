import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBlockComponent } from './input-block.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('InputBlockComponent', () => {
  let component: InputBlockComponent;
  let fixture: ComponentFixture<InputBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MatIconModule,
         MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
      declarations: [ InputBlockComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBlockComponent);
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
