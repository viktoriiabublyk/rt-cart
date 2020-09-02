import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';

import { BasketComponent } from './basket.component';
import { Store, NgxsModule } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadBasket, BasketUpdateProductQuantity } from '../../basket.actions';
import { BasketStateModel } from '../../basket.state';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const SOME_DESIRED_STATE: BasketStateModel = {
  data: {},
  recommended: [],
  selectedProduct: 206,
  basket: null,
  productLines: null,
  products: [],
  // data: {
  //   110: {
  //     id: 110,
  //     quantity: 1
  //   }
  // },
};

const EXAMPLESTATE: BasketStateModel = SOME_DESIRED_STATE;

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        NgxsModule.forRoot(),
      ],
      declarations: [ BasketComponent ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    store.reset({basket: EXAMPLESTATE});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action on ngOnInit lifecycle', fakeAsync(() => {
    tick();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(LoadBasket));
  }));

  it('should be default state', fakeAsync(() => {
    tick();
    const state = store.snapshot();

    expect(store.dispatch).toHaveBeenCalled();
    expect(state.basket).toEqual(SOME_DESIRED_STATE);
  }));

  it('should dispatch when basket item was updated', fakeAsync(() => {
    tick();
    component.updateQuantity(100, 3);
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(BasketUpdateProductQuantity));
  }));

  it('should dispatch when basket item was removed', fakeAsync(() => {
    tick();
    component.removeItem(100);
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(BasketUpdateProductQuantity));
  }));

});
