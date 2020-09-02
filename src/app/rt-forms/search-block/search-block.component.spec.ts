import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBlockComponent } from './search-block.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Settings} from "../../../conf/settings";
import {Searching} from "../../catalog/state/product.action";

describe('SearchBlockComponent', () => {
  let component: SearchBlockComponent;
  let fixture: ComponentFixture<SearchBlockComponent>;
  let store: Store;
  let formBuilder: FormBuilder;
  beforeAll(() => {
    formBuilder = new FormBuilder();
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        NgxsModule.forRoot(),
        HttpClientTestingModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      declarations: [ SearchBlockComponent ],
      providers: [
        FormBuilder,
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
    fixture = TestBed.createComponent(SearchBlockComponent);
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

  it('should called addReview when form is valid', () => {
    component.form = formBuilder.group({
      search: ['super book', Validators.required],
    });
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(Searching));
  });

  it('should called addReview when form is invalid', () => {
    spyOn(component, 'updateValidationMessages');
    component.form = formBuilder.group({
      search: [null, Validators.required],
    });
    component.onSubmit();
    expect(component.updateValidationMessages).toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalledWith(jasmine.any(Searching));

  });
});
