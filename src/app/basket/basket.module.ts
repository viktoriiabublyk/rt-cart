import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketMiniComponent } from './components/basket-mini/basket-mini.component';
import { BasketComponent } from './container/basket/basket.component';
import { BasketState } from './basket.state';
import { NgxsModule } from '@ngxs/store';
import { RouterModule } from '@angular/router';
import { AddComponent } from './container/add/add.component';
import { ButtonAddComponent } from './container/button-add/button-add.component';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { Settings } from 'src/conf/settings';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LayoutBasketWrapperComponent} from '../layout/basket/layout-basket-wrapper/layout-basket-wrapper.component';
import {LayoutBasketTableComponent} from '../layout/basket/layout-basket-table/layout-basket-table.component';
import {LayoutBasketFormCheckoutQuantityComponent} from '../layout/basket/layout-basket-form-checkout-quantity/layout-basket-form-checkout-quantity.component';
import {RtFormsModule} from '../rt-forms/rt-forms.module';
import {LayoutBasketFormComponent} from '../layout/basket/layout-basket-form/layout-basket-form.component';
import {LayoutBasketTotalsTableComponent} from '../layout/basket/layout-basket-totals-table/layout-basket-totals-table.component';
import {LayoutBasketTotalsWrapperComponent} from '../layout/basket/layout-basket-totals-wrapper/layout-basket-totals-wrapper.component';
import {LayoutBasketMiniComponent} from '../layout/basket/layout-basket-mini/layout-basket-mini.component';
import {LayoutBasketButtonComponent} from '../layout/basket/layout-basket-button/layout-basket-button.component';
import {LayoutBasketAddWrapperComponent} from '../layout/basket/layout-basket-add-wrapper/layout-basket-add-wrapper.component';
import {LayoutBasketAddPreviewComponent} from '../layout/basket/layout-basket-add-preview/layout-basket-add-preview.component';
import {LayoutBasketAddAvailableToBuyComponent} from '../layout/basket/layout-basket-add-available-to-buy/layout-basket-add-available-to-buy.component';
import {LayoutBasketAddBRecommendedComponent} from '../layout/basket/layout-basket-add-b-recommended/layout-basket-add-b-recommended.component';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxsModule.forFeature([
            BasketState,
        ]),
        NgxsRouterPluginModule.forRoot(),
        RouterModule,
        RtFormsModule,
    ],
    exports: [
        BasketMiniComponent,
        ButtonAddComponent,
        LayoutBasketWrapperComponent,
        LayoutBasketTableComponent
    ],
    declarations: [
        BasketMiniComponent,
        BasketComponent,
        AddComponent,
        ButtonAddComponent,
        LayoutBasketWrapperComponent,
        LayoutBasketTableComponent,
        LayoutBasketFormComponent,
        LayoutBasketFormCheckoutQuantityComponent,
        LayoutBasketTotalsTableComponent,
        LayoutBasketTotalsWrapperComponent,
        LayoutBasketMiniComponent,
        LayoutBasketButtonComponent,
        LayoutBasketAddWrapperComponent,
        LayoutBasketAddPreviewComponent,
        LayoutBasketAddAvailableToBuyComponent,
        LayoutBasketAddBRecommendedComponent

    ],
    providers: [ Settings ],
})
export class BasketModule { }
