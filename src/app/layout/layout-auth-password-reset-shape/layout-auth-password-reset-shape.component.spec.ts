import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAuthPasswordResetShapeComponent } from './layout-auth-password-reset-shape.component';

describe('LayoutAuthPasswordResetShapeComponent', () => {
  let component: LayoutAuthPasswordResetShapeComponent;
  let fixture: ComponentFixture<LayoutAuthPasswordResetShapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutAuthPasswordResetShapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAuthPasswordResetShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
