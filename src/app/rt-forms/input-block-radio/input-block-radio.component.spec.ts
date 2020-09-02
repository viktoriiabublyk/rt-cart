import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBlockRadioComponent } from './input-block-radio.component';
import {FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';

xdescribe('InputBlockRadioComponent', () => {
  let component: InputBlockRadioComponent;
  let fixture: ComponentFixture<InputBlockRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputBlockRadioComponent ],
      imports: [FormsModule, ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBlockRadioComponent);
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

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
