import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAuthPasswordResetCoverComponent } from './layout-auth-password-reset-cover.component';

describe('LayoutAuthPasswordResetCoverComponent', () => {
  let component: LayoutAuthPasswordResetCoverComponent;
  let fixture: ComponentFixture<LayoutAuthPasswordResetCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutAuthPasswordResetCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAuthPasswordResetCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
