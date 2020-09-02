import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AddToBasket } from '../../basket.actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import {BasketState} from '../../basket.state';

@Component({
  selector: 'app-button-add',
  templateUrl: './button-add.component.html',
  styleUrls: ['./button-add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonAddComponent implements OnInit {

  @Select(BasketState.getLoadingStatus) loadingStatus$: Observable<boolean>;

  constructor(
    private store: Store,
    ) { }

  @Input() productId: number;
  @Input() productName: string;


  ngOnInit() {
  }

  addToBasket(quantity = 1) {
    this.store.dispatch(new AddToBasket(this.productId, quantity, this.productName));
  }
}
