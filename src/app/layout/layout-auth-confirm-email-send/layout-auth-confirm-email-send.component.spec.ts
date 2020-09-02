import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAuthConfirmEmailSendComponent } from './layout-auth-confirm-email-send.component';

describe('LayoutAuthConfirmEmailSendComponent', () => {
  let component: LayoutAuthConfirmEmailSendComponent;
  let fixture: ComponentFixture<LayoutAuthConfirmEmailSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutAuthConfirmEmailSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAuthConfirmEmailSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
