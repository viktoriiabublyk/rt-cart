import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EditprofileComponent } from './editprofile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../auth/auth.service';
import { Store, NgxsModule } from '@ngxs/store';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputBlockComponent } from '../../rt-forms/input-block/input-block.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Settings } from '../../../conf/settings';
import {UpdateUser} from "../../auth";

describe('EditprofileComponent', () => {
  let component: EditprofileComponent;
  let fixture: ComponentFixture<EditprofileComponent>;
  let store;
  let formBuilder: FormBuilder;
  beforeAll(() => {
    formBuilder = new FormBuilder();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        NgxsModule.forRoot(),
        HttpClientTestingModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [ EditprofileComponent, InputBlockComponent ],
      providers: [
        FormBuilder,
        {provide: AuthService},
        {provide: Settings},
        {provide: FormBuilder, useValue: formBuilder }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(EditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called onInit', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.form).toBeDefined();
  });

  it('should called onDestroy', () => {
    component.ngOnDestroy();
    fixture.detectChanges();
  });

  it('should called register and form is valid', () => {
    spyOn(component, 'updateValidationMessages');
    component.form = formBuilder.group({
      first_name: ['First'],
      last_name: ['Second'],
      username: ['superuser'],
    });
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(UpdateUser));
  });

  it('should called register and form is invalid', () => {
    spyOn(component, 'updateValidationMessages');
    component.form = formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['superuser'],
    });
    component.onSubmit();
    expect(component.updateValidationMessages).toHaveBeenCalled();
    // expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(ClearMessages));
  });

});
