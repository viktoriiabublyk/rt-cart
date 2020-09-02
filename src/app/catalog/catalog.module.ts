import { NgModule } from '@angular/core';
import { CatalogComponent } from './container/catalog.component';
import { DetailsComponent } from './container/details/details.component';
import { NgxsModule } from '@ngxs/store';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './container/list/list.component';
import { RouteModule } from './route.module';
import { ProductComponent } from './components/product/product.component';
import { BasketModule } from '../basket/basket.module';
import { CategoryComponent } from './components/category/category.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { RtFormsModule } from '../rt-forms/rt-forms.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReviewComponent } from './components/review/review.component';
import { CustomerReviewsComponent } from './components/customer-reviews/customer-reviews.component';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule  } from '@covalent/core/steps';
import { CovalentLoadingModule, TdLoadingService } from '@covalent/core/loading';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { CovalentPagingModule } from '@covalent/core/paging';
import { ReviewState } from './state/review.state';
import { ProductState } from './state/product.state';
import { CategoryState } from './state/category.state';
// import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgImageSliderModule } from 'ng-image-slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPageScrollModule } from 'ngx-page-scroll';

@NgModule({
  imports: [
  BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouteModule,
    NgxsModule.forFeature([
      ProductState,
      ReviewState,
      CategoryState
    ]),
    RouterModule,
    BasketModule,
    MatMenuModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatOptionModule,
    RtFormsModule,
    ReactiveFormsModule,
    FormsModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentHttpModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    CovalentPagingModule,
    CovalentLoadingModule,
    // NgxImageZoomModule,
    NgImageSliderModule,
    NgxPageScrollModule

  ],
  declarations: [CatalogComponent, DetailsComponent, ListComponent, ProductComponent,
     CategoryComponent, AddReviewComponent, ReviewComponent, CustomerReviewsComponent],
  exports: [ProductComponent, CategoryComponent],
  providers: [
    TdLoadingService,
  ]
})
export class CatalogModule { }
