import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAddressFormComponent } from './shipping-address-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RtFormsModule } from './../../../rt-forms/rt-forms.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ShippingAddressFormComponent', () => {
  let component: ShippingAddressFormComponent;
  let fixture: ComponentFixture<ShippingAddressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingAddressFormComponent ],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RtFormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
