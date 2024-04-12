import { CategoryValue } from '../enum/CategoryEnum';

export class Category {
  private _category: CategoryValue;

  constructor(category: CategoryValue) {
    // logicをここに書く
    this._category = category;
  }

  static createFromEnum(category: CategoryValue): Category {
    return new Category(category);
  }

  static createFromString(category: string): Category {
    return new Category(category as CategoryValue);
  }

  get value(): CategoryValue {
    return this._category;
  }
}
