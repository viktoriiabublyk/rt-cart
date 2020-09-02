import { async, ComponentFixture, TestBed, tick, fakeAsync, inject } from '@angular/core/testing';

import { ButtonAddComponent } from './button-add.component';
import { NgxsModule, Store } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';
import { AddToBasket } from '../../basket.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AddComponent } from '../add/add.component';

describe('ButtonAddComponent', () => {
  let component: ButtonAddComponent;
  let fixture: ComponentFixture<ButtonAddComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot(),
      ],
      declarations: [ ButtonAddComponent ],
      providers: [
        {
          provide: Router,
          useValue: {navigate: () => {}},
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(ButtonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch AddToBasket action 209', inject([Router], (router: Router) => {
    component.productId = 209;
    component.addToBasket(component.productId);
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(AddToBasket));
    spyOn(router, 'navigate');
  }));

});
