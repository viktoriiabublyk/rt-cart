import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBlockRadioVerticalWithContentComponent } from './input-block-radio-vertical-with-content.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

xdescribe('InputBlockRadioVerticalComponent', () => {
  let component: InputBlockRadioVerticalWithContentComponent;
  let fixture: ComponentFixture<InputBlockRadioVerticalWithContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputBlockRadioVerticalWithContentComponent, ],
      imports: [FormsModule, ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBlockRadioVerticalWithContentComponent);
    component = fixture.componentInstance;
    component.name = 'NAME';
    component.model = {'NAME': 'xxx', 'EDITABLEFIELDS': ['NAME']};
    component.errors = {'NAME': ''};
    component.form = new FormGroup({'NAME': new FormControl()});
    component.fields = {
      'NAME': {
        label: '',
        validators: [],
        messages: {}
      }
    };
    component.options = ['xxx', 'yyy'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
