import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/container/catalog.component';
import { DetailsComponent } from './catalog/container/details/details.component';
import { ListComponent } from './catalog/container/list/list.component';
import { FlatpagesComponent } from './flatpages/flatpages/flatpages.component';
import { HomeComponent } from './home/home.component';
import { BasketComponent } from './basket/container/basket/basket.component';
import { AddComponent } from './basket/container/add/add.component';
import { CustomerReviewsComponent } from './catalog/components/customer-reviews/customer-reviews.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,  data: {animation: 'HomePage'}
  },
  {
    path: 'catalogue',
    component: CatalogComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: ':category/:nameCatWithID',
        component: ListComponent,
      },
      {
        path: ':titleWithId',
        component: DetailsComponent,
      },
      {
        path: ':titleWithId/review/:add',
        component: DetailsComponent,
      },
      {
        path: ':titleWithId/all/:reviews',
        component: CustomerReviewsComponent,
      },
      {
        path: ':titleWithId/:reviews/:id',
        component: CustomerReviewsComponent,
      },
      {
        path: '**',
        component: ListComponent,
      },

    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule),
  },

  {
    path: 'basket',
    component: BasketComponent, data: {animation: 'BasketPage'}
  },
  {
    path: 'basket/add/:id',
    component: AddComponent,
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
  },
  {
    path: 'page/:flatpage',
    component: FlatpagesComponent, data: {animation: 'AboutPage'}
  },

  {
    path: '**',
    component: FlatpagesComponent,
  },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
