import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store, NgxsModule } from '@ngxs/store';
import { InputBlockComponent } from '../../rt-forms/input-block/input-block.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../auth.service';
import { Settings } from '../../../conf/settings';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginWithEmailAndPassword } from '../auth.actions';
import { BrowserModule } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
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
        MatFormFieldModule,
        NgxsModule.forRoot(),
        HttpClientTestingModule,
        MatInputModule,
        BrowserModule,
        BrowserAnimationsModule,
      ],
      declarations: [LoginComponent, InputBlockComponent],
      providers: [
        {provide: AuthService},
        {provide: Settings, useValue: '/'},

      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(LoginComponent);
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

  it('should called login', () => {
    component.performSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(LoginWithEmailAndPassword));
  });

  // it('should called login and form is valid', () => {
  //   component.form = fb.group({
  //     email: ['superuser@example.com', Validators.required],
  //     password: ['test', Validators.required],
  //   });
  //   component.performSubmit();
  //   expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(LoginWithEmailAndPassword));
  // });

  // it('should called login and form is invalid', () => {
  //   spyOn(component, 'updateValidationMessages');
  //   component.form = fb.group({
  //     email: ['',  Validators.required],
  //     password: ['', Validators.required],
  //   });
  //   component.performSubmit();
  //   expect(component.updateValidationMessages).toHaveBeenCalled();
  // });
});
