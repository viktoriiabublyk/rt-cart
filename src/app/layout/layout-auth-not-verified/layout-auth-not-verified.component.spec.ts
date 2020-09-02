import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAuthNotVerifiedComponent } from './layout-auth-not-verified.component';

describe('LayoutAuthNotVerifiedComponent', () => {
  let component: LayoutAuthNotVerifiedComponent;
  let fixture: ComponentFixture<LayoutAuthNotVerifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutAuthNotVerifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAuthNotVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
