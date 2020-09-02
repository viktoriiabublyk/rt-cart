import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetComponent } from './password-reset.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, EmailValidator, Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../auth.service';
import { InputBlockComponent } from '../../rt-forms/input-block/input-block.component';
import { ResetPassword } from '../auth.actions';


describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;
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
      declarations: [ PasswordResetComponent, InputBlockComponent],
      providers: [
        {provide: AuthService},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(PasswordResetComponent);
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
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(ResetPassword));
  });

  // it('should called send and form is valid', () => {
  //   component.form = fb.group({
  //     email: ['test@test.com', Validators.required],
  //   });
  //   component.performSubmit();
  //   expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(ResetPassword));
  // });

  // it('should called send and form is invalid', () => {
  //   component.form = fb.group({
  //     email: ['', Validators.required],
  //   });
  //   component.performSubmit();
  //   expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(ResetPassword));
  // });
});
