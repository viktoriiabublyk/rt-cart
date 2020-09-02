import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAuthConfirmEmailComponent } from './layout-auth-confirm-email.component';

describe('LayoutAuthConfirmEmailComponent', () => {
  let component: LayoutAuthConfirmEmailComponent;
  let fixture: ComponentFixture<LayoutAuthConfirmEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutAuthConfirmEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAuthConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
