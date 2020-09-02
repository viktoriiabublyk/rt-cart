import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBlockMaskComponent } from './input-block-mask.component';
import { FormsModule, ReactiveFormsModule, FormGroup, NgModel, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpTestingController } from '@angular/common/http/testing';
import { MockComponent } from 'ng2-mock-component';
import { By } from '@angular/platform-browser';
import { NgxMaskModule } from 'ngx-mask';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

xdescribe('InputBlockMaskComponent', () => {
  let component: InputBlockMaskComponent;
  let fixture: ComponentFixture<InputBlockMaskComponent>;
  const options =  {
    'prefix' : '',
    'mask' : '000 00 00',
    'dropSpecialCharacters' : false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputBlockMaskComponent,
        // MockComponent({selector: 'input' }),
        // MockComponent({selector: 'input', inputs: ['prefix', 'mask', 'dropSpecialCharacters'], outputs: ['', '000-000', 'false']}),
      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(options),
      ],
      providers: [
        HttpTestingController,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBlockMaskComponent);
    component = fixture.componentInstance;
    // component
    // component.prefix = 'str';
    // component.mask = '000-000-000';
    // component.errors = { 'name': {}};
    // component.form.controls = {
    //   'name' : {
    //     'value' : '',
    //     []
    //   }
    // }
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

    component.ngOnInit();
    fixture.detectChanges();
  });


  // it('checkbox is checked if value is true', async(() => {
  //   component.prefix = 'str';
  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     const inEl = fixture.debugElement.query(By.css('#simpleInput'));
  //     expect(inEl.nativeElement.checked).toBe(true);
  //   });
  // }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
