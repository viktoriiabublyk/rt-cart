// import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { NgxsModule, Store, StateContext, Actions } from '@ngxs/store';
// import { BasketState, BasketStateModel } from './basket.state';
// import {
//     LoadBasket, BasketLoadProductLinesList, AddToBasket,
//     BasketUpdateProductQuantity, LoadRecommended, LoadRecommendedSuccess, ClearingRecommended } from './basket.actions';
// import { of, Observable } from 'rxjs';
// import { LoadProperty } from '../catalog/container/details/details.actions';
// import { ProductStateModel } from '../catalog/state/product.state';
// import { BasketService } from './service/basket.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { PRODUCT } from '../catalog/state/product.state.spec';
// import { filter } from 'rxjs/operators';

// class MockStateContext<T> implements StateContext<T> {
//     sets = [];
//     patches = [];

//     constructor(private _STATE) {}

//     getState() {
//         return this._STATE as T;
//     }
//     /**
//      * Reset the state to a new value.
//      */
//     setState(state) {
//         this.sets.push(state);
//         this._STATE = state;
//     }
//     /**
//      * Patch the existing state with the provided value.
//      */
//     patchState(partial: any) {
//         this.patches.push(partial);
//         this._STATE = {
//             ...this._STATE,
//             ...partial
//         };
//     }
//     /**
//      * Dispatch a new action and return the dispatched observable.
//      */
//     dispatch(actions: any | any[]) {
//         return of() as Observable<void>;
//     }
// }
// export const SOME_DESIRED_BASKET_STATE: BasketStateModel = {
//     data: [PRODUCT],
//     selectedProduct: 209,
//     recommended: [],
//     basket: null,
//     productlines: null,
//     products: {},
// };
// const EXAMPLE_BASKET_STATE: BasketStateModel = SOME_DESIRED_BASKET_STATE;
// describe('basket state spec', () => {
//     let store: Store;
//     let state: BasketState;
//     let service: BasketService;
//     let ctx: StateContext<BasketStateModel>;
//     let ctxCatalog: StateContext<ProductStateModel>;
//     let actions$: Actions;
//     let dispatched = [];
//     const ids = [209, 116, 110, 206];
//     const emptyState = {
//         data: {},
//         selectedProduct: null,
//         recommended: []
//     };
//     const basketFakeState = {
//         data: {
//             100: {
//                 id: 100,
//                 quantity: 2,
//             },
//             204: {
//                 id: 204,
//                 quantity: 3,
//             },
//             209: {
//                 id: 209,
//                 quantity: 1,
//             },
//         },
//     };

//     beforeEach(async(() => {
//       TestBed.configureTestingModule({
//         imports: [NgxsModule.forRoot([BasketState]), HttpClientTestingModule],
//         providers: [
//             BasketService
//         ]
//       }).compileComponents();

//       store = TestBed.get(Store);
//       store.reset({basket: EXAMPLE_BASKET_STATE});
//       service = TestBed.get(BasketService);

//       state = new BasketState(store, service);
//       actions$ = TestBed.get(Actions);
//       dispatched = [];
//       actions$.pipe(
//       filter(x => x.status === 'DISPATCHED')
//     ).subscribe(x => dispatched.push(x.action));
//     }));

//     it ('should add new item to basket state data property', () => {
//         spyOn(store, 'dispatch');
//         ctx = new MockStateContext(state) as StateContext<BasketStateModel>;
//         state.onAddToBasket(ctx, new AddToBasket(100, 2));
//         expect(ctx.getState().data).toEqual({ 100: { id: 100, quantity: 2 }});
//     });

//     it('should return empty basket', () => {
//         spyOn(store, 'dispatch');
//         ctx = new MockStateContext(emptyState) as StateContext<BasketStateModel>;

//         state.onAddToBasket(ctx, new AddToBasket(100, 0));
//         state.onAddToBasket(ctx, new AddToBasket(204, -10));
//         state.onAddToBasket(ctx, new AddToBasket(209, 0.5));

//         const basket = ctx.getState().data;
//         expect(basket).toEqual({});
//     });

//     it('should dispatch BasketLoadProduct when was dispatched BasketLoadProducts actions', () => {
//         spyOn(store, 'dispatch');
//         ctx = new MockStateContext(state) as StateContext<BasketStateModel>;
//         state.onBasketLoadProducts(ctx, new LoadBasket(ids));
//         expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(BasketLoadProductLinesList));
//     });

//     it('should dispatch LoadProperty when was dispatched BasketLoadProduct actions', () => {
//         spyOn(store, 'dispatch');
//         ctx = new MockStateContext(state) as StateContext<BasketStateModel>;
//         state.onBasketLoadProduct(ctx, new BasketLoadProductLinesList(112));
//         expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(LoadProperty));
//     });

//     it('should update basket quantity for single item', () => {
//         spyOn(store, 'dispatch');
//         ctx = new MockStateContext(state) as StateContext<BasketStateModel>;
//         state.onBasketUpdateProductQuantity(ctx, new BasketUpdateProductQuantity(100, 2));
//         expect(ctx.getState().data).toEqual({ 100: { id: 100, quantity: 2 }});
//     });

//     it('should remove single item from basket', () => {
//         spyOn(store, 'dispatch');
//         ctx = new MockStateContext(state) as StateContext<BasketStateModel>;
//         state.onBasketUpdateProductQuantity(ctx, new BasketUpdateProductQuantity(100, 0));
//         expect(ctx.getState().data).toEqual({});
//     });

//     it('should return data from getBasketItemsIds selector', async(() => {
//         spyOn(store, 'dispatch');
//         ctx = new MockStateContext(basketFakeState) as StateContext<BasketStateModel>;
//         const dataFromSelector = BasketState.getBasketItemsIds(ctx.getState());
//         expect(dataFromSelector).toEqual([100, 204, 209]);
//     }));

//     it('should get all Basket data from getBasketData selector', () => {
//         spyOn(store, 'dispatch');
//         ctx = new MockStateContext(basketFakeState) as StateContext<BasketStateModel>;
//         ctxCatalog = new MockStateContext(state) as StateContext<ProductStateModel>;
//         const basketData = BasketState.getBasketData(ctx.getState(), ctxCatalog.getState());
//         expect(basketData).toBeTruthy();
//     });

//     it('should getBasketTotalPrice selector return 0 when CatalogState.products empty', () => {
//         spyOn(store, 'dispatch');
//         ctx = new MockStateContext(basketFakeState) as StateContext<BasketStateModel>;
//         ctxCatalog = new MockStateContext(state) as StateContext<ProductStateModel>;
//         const basketTotalPrice = BasketState.getBasketTotalPrice(ctx.getState(), ctxCatalog.getState());
//         expect(basketTotalPrice).toBe(0);
//     });

//     it('should dispatch LoadRecommended', fakeAsync(() => {
//         spyOn(service, 'getRtProductProperty').and.returnValue(of([PRODUCT]));
//         store = TestBed.get(Store);
//         spyOn(store, 'dispatch');
//         store.dispatch(new LoadRecommended());
//         tick();
//         expect(store.dispatch).toHaveBeenCalled();
//         expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(LoadRecommended));

//     }));

//     it('should test the action load and load success', fakeAsync(() => {
//         spyOn(service, 'getRtProductProperty').and.returnValue(of([PRODUCT]));
//         store.dispatch(new LoadRecommendedSuccess([PRODUCT]));
//         tick();
//         expect(dispatched.length).toEqual(1);
//         expect(dispatched[0] instanceof LoadRecommendedSuccess ).toBeTruthy();
//         expect(dispatched[0].data).toEqual([PRODUCT]);
//     }));

//     it('should test the action load recommended success', fakeAsync(() => {
//         store = TestBed.get(Store);
//         spyOn(store, 'dispatch');
//         store.dispatch(new LoadRecommendedSuccess([PRODUCT]));
//         tick();
//         ctx.patchState({ recommended: [PRODUCT]});
//         expect(ctx.patches[0].recommended).toEqual([PRODUCT]);
//     }));

//   });
