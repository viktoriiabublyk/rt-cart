import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotVerifiedComponent } from './not-verified.component';
import { Store, NgxsModule } from '@ngxs/store';
import { Settings } from './../../../conf/settings';

describe('NotVerifiedComponent', () => {
  let component: NotVerifiedComponent;
  let fixture: ComponentFixture<NotVerifiedComponent>;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotVerifiedComponent],
      imports: [ NgxsModule.forRoot() ],
      providers: [
        {provide: Settings},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(NotVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
