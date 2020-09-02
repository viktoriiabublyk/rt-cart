import {Category, CategoryData} from '../models/category.model';
import { State, Action, StateContext, Selector, NgxsOnInit, Store } from '@ngxs/store';
import { SetCurrentCategory, RemoveCurrentCategory, LoadCategory, LoadCategorySuccess } from './category.action';
import { LoadProductsByIdCategory, AfterRemoveCategory, RemoveSearchingParam } from './product.action';
import { CategoryService } from '../services/category.service';
import { Injectable } from '@angular/core';
import {BackendError} from "../../messages/messages.actions";


export class CategoryStateModel {
  categories: Category[];
  categoryDict: {
    [id: number]: CategoryData
  };
  breadscrumbs: {
    [id: number]: number[],
  };
  currentCategory: number;
}

@State<CategoryStateModel>({
  name: 'category',
  defaults: {
    categories: null,
    categoryDict: {},
    breadscrumbs: {},
    currentCategory: null,
  },
})
@Injectable()
export class CategoryState implements NgxsOnInit {
  constructor(
    private store: Store,
    private categoryService: CategoryService,
  ) { }

  @Selector()
  static getCurrentCategory(state: CategoryStateModel) {
    return state.currentCategory;
  }

  @Selector()
  static getCategories(state: CategoryStateModel) {
    return state.categories;
  }

  @Selector()
  static getPathDataById(state: CategoryStateModel) {
    const currentPath = state.breadscrumbs[state.currentCategory];
    return currentPath.map(p => ({ ...state.categoryDict[p], id : p }));
  }

  ngxsOnInit(ctx: StateContext<CategoryStateModel>) {

  }

  @Action(LoadCategory)
  onLoadCategory(ctx: StateContext<CategoryStateModel>) {
    if (!ctx.getState().categories) {
      this.categoryService.getCategoriesList().subscribe(
        data => ctx.dispatch(new LoadCategorySuccess(data)),
        err => ctx.dispatch(new BackendError(err)),
      );

    }

  }

  @Action(LoadCategorySuccess)
  onLoadCategorySuccess(ctx: StateContext<CategoryStateModel>, { data }: LoadCategorySuccess) {

    const catDict = {};
    const catBreadcrum = {};
    function findPathCat(inputData, path = []) {
      inputData.forEach(category => {
        catDict[category.id] = category.data;
        if (!category.path) {
          category.path = [category.id];
        }
        if (path) {
          category.path = path.concat(category.path);
          category[category.id] = category.path;
          catBreadcrum[category.id] = category.path;
        }
        if (category.children) {
          findPathCat(category.children, category.path);
        }
      });
    }
    findPathCat(data);
    ctx.patchState({
      categories: data,
      categoryDict: catDict,
      breadscrumbs: catBreadcrum
    });
  }

  @Action(SetCurrentCategory)
  onSetCurrentCategory(ctx: StateContext<CategoryStateModel>, { id }: SetCurrentCategory) {
    if (ctx.getState().currentCategory !== id) {
    ctx.patchState({
      currentCategory: id,
    });
    ctx.dispatch(new RemoveSearchingParam());
    ctx.dispatch(new LoadProductsByIdCategory(id));
   }
  }

  @Action(RemoveCurrentCategory)
  onRemoveCurrentCategory(ctx: StateContext<CategoryStateModel>) {
    if (ctx.getState().currentCategory) {
      ctx.patchState({
        currentCategory:  null,
      });
      this.store.dispatch(new AfterRemoveCategory());
    } else {
    this.store.dispatch(new RemoveSearchingParam());
    }
  }
}
