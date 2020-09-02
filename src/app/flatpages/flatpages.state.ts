import { NgxsOnInit, StateContext, State, Store, Action, Selector } from '@ngxs/store';
import { FlatpagesService } from './service/flatpages.service';
import { LoadFlatpages, LoadFlatpagesData, LoadFlatpagesSuccess, LoadFlatpagesFail } from './flatpages.action';
import { Injectable } from '@angular/core';

export class FlatpagesStateModel {
    pages: {
        [title: string]: {
            title?: string;
            url?: string;
            content?: string;
        },
    };
    currentPage: string;
}

@State<FlatpagesStateModel>({
  name: 'flatpages',
  defaults: {
    pages: {
      404: {
        title: '404 - Not found',
        url: '404',
        content: 'Page was not found',
      }
    },
    currentPage: '',
  }
})
@Injectable()
export class FlatpagesState implements NgxsOnInit {
  constructor(private store: Store, private flatpagesService: FlatpagesService) { }

  @Selector()
  static getCurrentFlatpage(state: FlatpagesStateModel) {
    return state.pages[state.currentPage];
  }
  ngxsOnInit(ctx: StateContext<FlatpagesStateModel>) { }


  @Action(LoadFlatpages)
  flatPageActivate(ctx: StateContext<FlatpagesStateModel>, { page }: LoadFlatpages) {
    const state = ctx.getState();
    if (!state.pages[page]) {
      ctx.dispatch(new LoadFlatpagesData(page));
    } else {
      ctx.patchState({
        currentPage: page,
      });
    }
  }

  @Action(LoadFlatpagesData)
  handlerForLoadFlatpages(ctx: StateContext<FlatpagesStateModel>, { page }: LoadFlatpages) {
    return this.flatpagesService.getSingleFlatPage(page).subscribe(
      data => ctx.dispatch(new LoadFlatpagesSuccess(data, page)),
      error => ctx.dispatch(new LoadFlatpagesFail(error)),
    );
  }

  @Action(LoadFlatpagesSuccess)
  LoadFlatpagesSuccess(ctx: StateContext<FlatpagesStateModel>, { dataset, page }: LoadFlatpagesSuccess) {
    const state = ctx.getState();
    const result = { [page]: { ...dataset } };

    ctx.patchState({
      pages: { ...state.pages, ...result },
      currentPage: page,
    });
  }

}
