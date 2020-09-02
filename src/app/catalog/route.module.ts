import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './container/catalog.component';
import { HomeComponent } from '../home/home.component';

const parentModuleRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'catalogue',
    component: CatalogComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(parentModuleRoutes)
  ],
  declarations: []
})
export class RouteModule { }
