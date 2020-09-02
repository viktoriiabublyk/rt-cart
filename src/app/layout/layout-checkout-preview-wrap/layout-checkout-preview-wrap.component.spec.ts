import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCheckoutPreviewWrapComponent } from './layout-checkout-preview-wrap.component';

describe('LayoutCheckoutPreviewWrapComponent', () => {
  let component: LayoutCheckoutPreviewWrapComponent;
  let fixture: ComponentFixture<LayoutCheckoutPreviewWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCheckoutPreviewWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCheckoutPreviewWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
