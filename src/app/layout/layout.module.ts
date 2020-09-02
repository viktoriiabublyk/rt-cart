import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BasketModule } from '../basket/basket.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { RtFormsModule } from '../rt-forms/rt-forms.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LayoutBasketWrapperComponent} from './basket/layout-basket-wrapper/layout-basket-wrapper.component';
import {LayoutBasketTableComponent} from './basket/layout-basket-table/layout-basket-table.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    BasketModule,
    RtFormsModule,
  ],
  declarations: [
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
  ],
  exports: [
    LayoutComponent,
  ]
})
export class LayoutModule { }
