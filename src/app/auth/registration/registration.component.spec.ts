import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { Store, NgxsModule } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputBlockComponent } from '../../rt-forms/input-block/input-block.component';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../auth.actions';
import { Settings } from '../../../conf/settings';
import { BrowserModule } from '@angular/platform-browser';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
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
        BrowserModule,
        BrowserAnimationsModule,
      ],
      declarations: [ RegistrationComponent, InputBlockComponent ],
      providers: [
        {provide: AuthService},
        {provide: Settings}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(RegistrationComponent);
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

  it('should called register', () => {
    component.performSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(RegisterUser));
  });

  // it('should called register and form is valid', () => {
  //   component.form = fb.group({
  //     username: ['superuser'],
  //     email: ['superuser@example.com'],
  //     password1: ['test', Validators.required],
  //     password2: ['test', Validators.required],
  //   });
  //   component.performSubmit();
  //   expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(RegisterUser));
  // });

  // it('should called register and form is invalid', () => {
  //   spyOn(component, 'updateValidationMessages');
  //   component.form = fb.group({
  //     username: ['superuser', Validators.required],
  //     email: ['',  Validators.required],
  //     password1: ['test', Validators.required],
  //     password2: ['', Validators.required],
  //   });
  //   component.performSubmit();
  //   expect(component.updateValidationMessages).toHaveBeenCalled();
  // });

});
