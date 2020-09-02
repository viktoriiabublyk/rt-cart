import {
  Component, OnInit, OnDestroy, ViewChild,
  AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy
} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Product, ImageArray } from '../../models/product.model';
import { LoadProduct, RecentViewed } from './details.actions';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Navigate } from '@ngxs/router-plugin';
import { filter } from 'rxjs/operators';
import { Review } from '../../models/reviews.model';
import { IPageChangeEvent, TdPagingBarComponent } from '@covalent/core/paging';
import { ProductState } from '../../state/product.state';
import { ReviewState } from '../../state/review.state';
import {
  SetCurrentReviewPage, LoadReviews, SetLastPage, RemoveCurrentReview,
  SetCurrentReview, RemoveAddStatus
} from '../../state/review.action';
import { SetCurrentCategory } from '../../state/category.action';
import { NgImageSliderComponent } from 'ng-image-slider';
import { SetSelectedImage, RemoveSelectedImage } from '../../state/product.action';
import {RtScrollService} from "../../../rt-scroll/rt-scroll.service";
import {loadContent, loading} from "../../../app.animations";
import {Settings} from "../../../../conf/settings";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  animations: [loading, loadContent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  eventLinks: IPageChangeEvent;
  maxPage: number;
  rating: number;
  countReviews: number;
  length: number;
  showReviewForm = false;
  first = false;
  addFormParam = 'add';
  reviewsParam = 'reviews';
  param: string;
  addFormShow: string;
  reviewId: number;
  isCustomize = false;
  addStatus: boolean;
  @ViewChildren(TdPagingBarComponent) pagingBarLinks: QueryList<TdPagingBarComponent>;
  @ViewChild(TdPagingBarComponent) pagingBarLink: TdPagingBarComponent;
  @ViewChild('nav') slider: NgImageSliderComponent;

  constructor(
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private store: Store,
    private titleService: Title,
    public settings: Settings,
    private scroll: RtScrollService,
  ) {
    this.first = false;
  }

  @Select(state => state.product.dict[state.product.currentElement]) product$: Observable<Product>;
  @Select(ProductState.getRecentlyViewed) recentViewed$: Observable<Product[]>;
  @Select(ProductState.isImageLoadFail) isImageLoadFail$: Observable<boolean>;
  @Select(ProductState.isImageLoading) isImageLoading$: Observable<boolean>;
  @Select(ProductState.isImageLoaded) isImageLoaded$: Observable<boolean>;
  @Select(ReviewState.getCountByItemKey) countReviews$: Observable<number>;
  @Select(ReviewState.getAllReviewsByKey) reviewsList$: Observable<Review[]>;
  @Select(state => state.review.currentReview) currentReview$: Observable<number>;
  @Select(state => state.review.addStatus) addStatus$: Observable<boolean>;
  @Select(ProductState.getImageForSlider) imageArray$: Observable<ImageArray[]>;
  @Select(ProductState.getSelectedThumbImage) selectedThumbImage$: Observable<string>;
  @Select(ProductState.getSelectedFullImage) selectedFullImage$: Observable<string>;


  private subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.route.params.subscribe(
        params => {
          this.param = params.titleWithId;
          this.addFormShow = params.add;
          if (params.titleWithId) {
            const id = params.titleWithId.split('_')[1]; // #FIXME move it to config file
            // this.scroll.toClass('row.start');
            this.store.dispatch(new RemoveSelectedImage());
            this.store.dispatch(new LoadProduct(id));
            this.store.dispatch(new RecentViewed(id));
            this.store.dispatch(new SetCurrentReview(null));
            this.store.dispatch(new LoadReviews(1));
          }
          if (this.addFormShow === 'add') {
            this.showReviewForm = true;
            this.store.dispatch(new SetCurrentReviewPage(1, null));
            if (this.reviewId) {
              this.store.dispatch(new RemoveCurrentReview());
            }
            this.scroll.toClass('addReviewForm');
          }
        }
      ));

    this.subscriptions.add(
      this.currentReview$.subscribe(data => {
        this.reviewId = data;
      })
    );
    this.subscriptions.add(
      this.product$.subscribe(data => {
        if (data) {
          this.titleService.setTitle(this.settings.formatTitle(data.title));
        }
      })
    );
    this.subscriptions.add(
      this.product$.pipe(filter(x => !!x)).subscribe(data => {
        this.rating = data.rating;
      })
    );
    this.subscriptions.add(
      this.countReviews$.pipe(filter(x => !!x)).subscribe(data => {
        this.countReviews = data;
        this.maxPage =
          this.countReviews % this.settings.PAGE_LENGHT === 0
            ? this.countReviews / this.settings.PAGE_LENGHT
            : (this.countReviews - (this.countReviews % this.settings.PAGE_LENGHT)) / this.settings.PAGE_LENGHT + 1;
        this.store.dispatch(new SetLastPage(this.maxPage));

        if (data === 1) {
          this.first = true;
        } else {
          this.first = false;
        }
      })
    );
    this.subscriptions.add(
      this.addStatus$.subscribe(status => {
        this.addStatus = status;
      })
    );
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
    if (this.slider && !this.isCustomize) {
      this.customizeSlider();
    }
  }
  ngAfterViewInit() {
    this.subscriptions.add(
      this.pagingBarLinks.changes.subscribe((comps: QueryList<TdPagingBarComponent>) => {
        if (this.pagingBarLink && this.addStatus && this.maxPage) {
          this.pagingBarLink.navigateToPage(this.maxPage);
          this.store.dispatch(new RemoveAddStatus());
          this.scroll.toClass('td-paging-bar');
        }
      })
    );
  }

  changeLinks(event: IPageChangeEvent): void {
    this.eventLinks = event;

    if (this.eventLinks.page) {
      this.store.dispatch(new SetCurrentReviewPage(this.eventLinks.page, null));
    }
  }
  choiseBreadscrum(data) {
    this.store.dispatch([
      new SetCurrentCategory(data.id),
      new Navigate(['/catalogue/category/', `${data.slug}_${data.id}`])
    ]);

  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  removeCurrentReview() {
    this.store.dispatch(new SetCurrentReviewPage(1, null));
    if (this.reviewId) {
      this.store.dispatch(new RemoveCurrentReview());
    }
  }
  scrollToAddForm() {
    this.scroll.toClass('addReviewForm');
  }

  setFirstPageReviews(item) {
    this.store.dispatch([
      new SetCurrentReviewPage(1, null),
      new Navigate(['/catalogue/', `${item.slug}_${item.id}`])
    ]);
  }
  cancelViewForm(e: boolean) {
    this.showReviewForm = e;
  }
  setSelectedImage(event) {
    this.store.dispatch(new SetSelectedImage(event));
  }
  customizeSlider() {
      this.slider.sliderMain.nativeElement.style.left = '0px';
      this.slider.sliderMain.nativeElement.parentElement.style.padding = '0';
      this.slider.sliderMain.nativeElement.children[1].style.left = '0px';
      this.slider.sliderMain.nativeElement.children[2].style.right = '0px';
      this.slider.sliderMain.nativeElement.children[1].style.textDecoration = 'none';
      this.slider.sliderMain.nativeElement.children[2].style.textDecoration = 'none';
      this.slider.sliderMain.nativeElement.children[1].style.userSelect = 'none';
      this.slider.sliderMain.nativeElement.children[2].style.userSelect = 'none';
      this.slider.imageDiv.nativeElement.style.userSelect = 'none';
      this.slider.imageDiv.nativeElement.children[0].style.userSelect = 'none';
      this.isCustomize = true;
  }
  trackByFn(index) {
    return index;
  }
}
