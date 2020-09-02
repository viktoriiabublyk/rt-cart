import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingMethodComponent } from './shipping-method.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ShippingMethodComponent', () => {
  let component: ShippingMethodComponent;
  let fixture: ComponentFixture<ShippingMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingMethodComponent ],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot(),
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
