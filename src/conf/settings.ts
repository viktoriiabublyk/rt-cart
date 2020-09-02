import { Product } from 'src/app/catalog/models/product.model';

import { has } from 'lodash';
import { Injectable } from '@angular/core';
import { CoreSettings } from './coreSettings';
import { Category, CategoryData } from 'src/app/catalog/models/category.model';

@Injectable()
export class Settings extends CoreSettings {
  TITLE_DEFAULT = 'RT Cart';
  TITLE_SEPARATOR = ' | ';

  PAGE_LENGHT = 30;
  DELAY_TIME = 600;

  LOGIN_URL = '/auth/login/';
  LOGIN_REDIRECT_URL = '/catalogue/';
  LOGOUT_REDIRECT_URL = '/';

  ACCOUNT_EMAIL_VERIFICATION = 'mandatory';
  ACCOUNT_CONFIRM_EMAIL_ON_GET = true;
  ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = null;
  ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = null;
  ACCOUNT_LOGOUT_REDIRECT_URL = '/';

  TIME_ZONE = 'UTC';

  isNumber(obj) {
    return !isNaN(parseFloat(obj));
  }

  formatProductUrl(product: Product): string {
    return product ? `${product.slug}_${product.id}` : '';
  }
  // formatProductUrlReviews(param): string {
  //   return param ? `${param}/reviews` : '';
  // }
  formatCategoryUrl(category: Category): string {
    return category ? `${category.data.slug}_${category.id}` : '';
  }
  formatBreadscrumbUrl(item: CategoryData): string {
    return item ? `${item.slug}_${item.id}` : '';
  }

  extractProducIdFromUr(url: string) {
    return url.split('_')[1];
  }

  setTitle(data) {
    return has(data, 'title') ? data.title : 'Static page';
    // if (has(data, 'title')) {
    //   return data.title;
    // }
    // return 'Static page';
  }

  formatTitle(parts: void | string | string[]): string {
    if (!parts) {
      return this.TITLE_DEFAULT;
    }
    if (!Array.isArray(parts)){
      parts = [parts];
    }
    let preparedString = '';
    parts.forEach(someStr => {
      preparedString += `${someStr} ${this.TITLE_SEPARATOR} `;
    });
    return `${preparedString} ${this.TITLE_DEFAULT}`;
  }
// Nokia | Phones | Megashop
// Nokia => Phones => Megashop

//   formatProductUrl = (product: Product) => {
//     return product.id;
//   }

// }
}
