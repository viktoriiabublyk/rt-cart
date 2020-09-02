import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBlockCheckboxComponent } from './input-block-checkbox.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

describe('InputBlockCheckboxComponent', () => {
  let component: InputBlockCheckboxComponent;
  let fixture: ComponentFixture<InputBlockCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ InputBlockCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBlockCheckboxComponent);
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
