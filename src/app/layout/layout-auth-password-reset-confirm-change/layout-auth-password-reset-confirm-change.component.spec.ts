import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAuthPasswordResetConfirmChangeComponent } from './layout-auth-password-reset-confirm-change.component';

describe('LayoutAuthPasswordResetConfirmChangeComponent', () => {
  let component: LayoutAuthPasswordResetConfirmChangeComponent;
  let fixture: ComponentFixture<LayoutAuthPasswordResetConfirmChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutAuthPasswordResetConfirmChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAuthPasswordResetConfirmChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
