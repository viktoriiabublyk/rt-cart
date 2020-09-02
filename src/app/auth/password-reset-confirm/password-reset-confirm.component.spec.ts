import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetConfirmComponent } from './password-reset-confirm.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputBlockComponent } from '../../rt-forms/input-block/input-block.component';
import { AuthService } from '../auth.service';
import { ResetPasswordConfirm } from '../auth.actions';
import { Token } from '../auth.model';

describe('PasswordResetConfirmComponent', () => {
  let component: PasswordResetConfirmComponent;
  let fixture: ComponentFixture<PasswordResetConfirmComponent>;
  let store;
  let fb;

  beforeAll(() => {
    fb = new FormBuilder();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        NgxsModule.forRoot(),
        HttpClientTestingModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [ PasswordResetConfirmComponent, InputBlockComponent ],
      providers: [
        {provide: AuthService},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(PasswordResetConfirmComponent);
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

  it('should called send form', () => {
    component.performSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(ResetPasswordConfirm));
  });

  // it('should called send and form is valid', () => {
  //   component.uid = 'MQ';
  //   component.form = fb.group({
  //     new_password1: ['test', Validators.required],
  //     new_password2: ['test', Validators.required],
  //   });
  //   component.performSubmit();
  //   expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(ResetPasswordConfirm));
  // });

  // it('should called send and form is invalid', () => {
  //   spyOn(component, 'updateValidationMessages');
  //   component.form = fb.group({
  //     new_password1: ['test', Validators.required],
  //     new_password2: ['', Validators.required],
  //   });
  //   component.performSubmit();
  //   expect(component.updateValidationMessages).toHaveBeenCalled();
  // });

});
