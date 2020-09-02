
import { Category } from '../models/category.model';

export class LoadCategory {
  static type = '[CATEGORY] LoadCategory';
}
export class LoadCategorySuccess {
  static type = '[CATEGORY] LoadCategorySuccess';
  constructor(public data: Category[] ) {}
}
export class SetCurrentCategory {
  static type = '[CATEGORY] SetCurrentCategory';
  constructor(public id: number) {}
}
export class RemoveCurrentCategory {
  static type = '[CATEGORY] RemoveCurrentCategory';
}
